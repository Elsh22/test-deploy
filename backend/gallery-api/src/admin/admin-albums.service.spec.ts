import { Test } from '@nestjs/testing';
import { Logger, ServiceUnavailableException } from '@nestjs/common';
import { AdminAlbumsService } from './admin-albums.service';
import { PublicationStorageService } from './publication-storage.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAlbumDto } from './dto/manage-album.dto';

const albumId = 'd6e989b8-3913-43cc-90cb-39825fa2c022';
const one = 'd1b35a86-7842-46ba-8f70-213b115c3cb9';
const two = '9e66b70a-e468-4b22-8d8e-447fd151ed48';
const processed = '87e179bb-69de-4c13-a58e-c212c0349575';
const admin = { id: 'owner', role: 'ADMIN' as const };
function fixturePhoto(id: string, isCover: boolean) { return {
  id, albumId, status: 'PROCESSED', filename: 'meeting.webp', mimeType: 'image/webp', width: 1000, height: 500,
  processedKey: `processed/${albumId}/${id}/${processed}/full.webp`, thumbnailKey: `processed/${albumId}/${id}/${processed}/thumbnail.webp`,
  processedSizeBytes: 100, thumbnailSizeBytes: 40, publishedKey: null, publishedThumbnailKey: null, isCover, sortOrder: 0,
}; }
function fixture() { return { id: albumId, title: 'DMC Meeting', slug: 'dmc-meeting', status: 'DRAFT',
  createdById: admin.id, publishedAt: null, photos: [fixturePhoto(one, true), fixturePhoto(two, false)] }; }

describe('AdminAlbumsService management and publication', () => {
  let service: AdminAlbumsService;
  let current: any;
  const tx = { album: { findUnique: jest.fn(), update: jest.fn() }, photo: { update: jest.fn(), updateMany: jest.fn() }, $queryRaw: jest.fn() };
  const prisma = { $transaction: jest.fn(), album: { findMany: jest.fn(), findUnique: jest.fn(), create: jest.fn() } };
  const storage = { source: jest.fn(), transfer: jest.fn(), cleanup: jest.fn() };
  beforeEach(async () => {
    jest.resetAllMocks(); current = fixture();
    tx.$queryRaw.mockResolvedValue([{ locked: true }]);
    tx.album.findUnique.mockImplementation(async () => current);
    tx.album.update.mockImplementation(async ({ data }) => { current = { ...current, ...data }; return current; });
    tx.photo.update.mockImplementation(async ({ where, data }) => {
      Object.assign(current.photos.find((photo: any) => photo.id === where.id), data); return {};
    });
    tx.photo.updateMany.mockImplementation(async ({ data }) => { current.photos.forEach((photo: any) => Object.assign(photo, data)); return { count: current.photos.length }; });
    prisma.$transaction.mockImplementation(async (work) => work(tx));
    prisma.album.findUnique.mockImplementation(async () => current);
    prisma.album.findMany.mockResolvedValue([current]);
    storage.source.mockResolvedValue('"source-etag"'); storage.transfer.mockResolvedValue(undefined); storage.cleanup.mockResolvedValue(true);
    const module = await Test.createTestingModule({ providers: [AdminAlbumsService,
      { provide: PrismaService, useValue: prisma }, { provide: PublicationStorageService, useValue: storage },
    ] }).compile(); service = module.get(AdminAlbumsService);
  });
  it('scopes ADMIN listing to ownership and allows SUPER_ADMIN to list all', async () => {
    await service.findAll(admin);
    expect(prisma.album.findMany.mock.calls[0][0].where).toEqual({ createdById: admin.id });
    await service.findAll({ id: 'super', role: 'SUPER_ADMIN' });
    expect(prisma.album.findMany.mock.calls[1][0].where).toEqual({});
  });
  it('denies another administrator for every operation', async () => {
    const other = { id: 'other', role: 'ADMIN' as const };
    for (const run of [() => service.findOne(albumId, other), () => service.update(albumId, { title: 'Edit' }, other),
      () => service.reorder(albumId, [one, two], other), () => service.cover(albumId, one, other),
      () => service.publish(albumId, {}, other), () => service.archive(albumId, other)]) {
      await expect(run()).rejects.toMatchObject({ status: 403 });
    }
    expect(storage.transfer).not.toHaveBeenCalled();
  });
  it('returns 404 for a nonexistent album', async () => {
    current = null;
    await expect(service.publish(albumId, {}, admin)).rejects.toMatchObject({ status: 404 });
  });
  it('updates draft metadata, permits null clearing, and freezes published slugs', async () => {
    await service.update(albumId, { title: '  Updated  ', slug: 'new-slug', description: null, eventDate: null }, admin);
    expect(current).toMatchObject({ title: 'Updated', slug: 'new-slug', description: null, eventDate: null });
    current.status = 'PUBLISHED';
    await expect(service.update(albumId, { slug: 'different' }, admin)).rejects.toMatchObject({ status: 409 });
    await expect(service.update(albumId, { title: 'Updated again' }, admin)).resolves.toMatchObject({ title: 'Updated again' });
    current.status = 'ARCHIVED';
    await expect(service.update(albumId, { title: 'Edit' }, admin)).rejects.toMatchObject({ status: 409 });
  });
  it('maps duplicate slugs to 409 without exposing database details', async () => {
    tx.album.update.mockRejectedValueOnce({ code: 'P2002', message: 'private database details' });
    await expect(service.update(albumId, { slug: 'duplicate' }, admin)).rejects.toMatchObject({ status: 409 });
  });
  it('rejects empty transformed update DTOs rather than silently updating timestamps', async () => {
    await expect(service.update(albumId, new UpdateAlbumDto(), admin)).rejects.toMatchObject({ status: 400 });
  });
  it('reorders an exact permutation only', async () => {
    await service.reorder(albumId, [two, one], admin);
    expect(current.photos.map((photo: any) => photo.sortOrder)).toEqual([1, 0]);
    for (const ids of [[one], [one, one], [one, processed]]) await expect(service.reorder(albumId, ids, admin)).rejects.toMatchObject({ status: 400 });
  });
  it('selects exactly one processed cover, rejecting unrelated/unprocessed photos', async () => {
    await service.cover(albumId, two, admin);
    expect(current.photos.filter((photo: any) => photo.isCover).map((photo: any) => photo.id)).toEqual([two]);
    await expect(service.cover(albumId, processed, admin)).rejects.toMatchObject({ status: 400 });
    current.photos[0].status = 'PENDING';
    await expect(service.cover(albumId, one, admin)).rejects.toMatchObject({ status: 400 });
  });
  it('publishes only after every source and destination is verified', async () => {
    storage.transfer.mockImplementation(async () => { expect(tx.album.update).not.toHaveBeenCalled(); expect(current.status).toBe('DRAFT'); });
    const result = await service.publish(albumId, {}, admin);
    expect(storage.source).toHaveBeenCalledTimes(4); expect(storage.transfer).toHaveBeenCalledTimes(4);
    expect(result).toMatchObject({ status: 'PUBLISHED', publishedAt: expect.any(Date) });
    expect(result.photos[0].imageUrl).toMatch(/^https:\/\/d6uqhuj15c85p.cloudfront.net\/Events\//);
    expect(current.photos[0].publishedKey).toContain(`/Events/`.slice(1));
    expect(tx.photo.update.mock.calls.every(([query]) => !('status' in query.data))).toBe(true);
    expect(JSON.stringify(result)).not.toContain('processed/');
  });
  it('allows a selected processed subset and keeps all unselected images private', async () => {
    current.photos[1].status = 'PENDING';
    await service.publish(albumId, { photoIds: [one] }, admin);
    expect(storage.transfer).toHaveBeenCalledTimes(2);
    expect(current.photos[1].publishedKey).toBeNull();
  });
  it.each(['PENDING', 'UPLOADED', 'FAILED'])('rejects selected %s photos before copying anything', async (status) => {
    current.photos[1].status = status;
    await expect(service.publish(albumId, {}, admin)).rejects.toMatchObject({ status: 409 });
    expect(storage.transfer).not.toHaveBeenCalled();
  });
  it('rejects empty albums, unrelated selections, and invalid cover configurations', async () => {
    current.photos = [];
    await expect(service.publish(albumId, {}, admin)).rejects.toMatchObject({ status: 400 });
    current = fixture();
    await expect(service.publish(albumId, { photoIds: [processed] }, admin)).rejects.toMatchObject({ status: 400 });
    current.photos[0].isCover = false;
    await expect(service.publish(albumId, {}, admin)).rejects.toMatchObject({ status: 409 });
    current.photos[0].isCover = true; current.photos[1].isCover = true;
    await expect(service.publish(albumId, {}, admin)).rejects.toMatchObject({ status: 409 });
  });
  it('rejects missing optimized metadata and missing S3 objects', async () => {
    current.photos[0].thumbnailKey = null;
    await expect(service.publish(albumId, {}, admin)).rejects.toMatchObject({ status: 409 });
    current = fixture(); storage.source.mockRejectedValueOnce(new ServiceUnavailableException('Source unavailable'));
    await expect(service.publish(albumId, {}, admin)).rejects.toMatchObject({ status: 503 });
    expect(storage.transfer).not.toHaveBeenCalled();
  });
  it('cleans up partial transfers and leaves the album draft for retry', async () => {
    storage.transfer.mockResolvedValueOnce(undefined).mockRejectedValueOnce(new ServiceUnavailableException('Copy failed'));
    await expect(service.publish(albumId, {}, admin)).rejects.toMatchObject({ status: 503 });
    expect(storage.cleanup.mock.calls[0][0]).toHaveLength(2); expect(current.status).toBe('DRAFT');
    expect(tx.album.update).not.toHaveBeenCalled();
    await expect(service.publish(albumId, {}, admin)).resolves.toMatchObject({ status: 'PUBLISHED' });
  });
  it('does not mask transfer failures if cleanup fails', async () => {
    const warn = jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
    storage.transfer.mockRejectedValueOnce(new ServiceUnavailableException('Copy failed'));
    storage.cleanup.mockRejectedValueOnce(new Error('cleanup denied'));
    await expect(service.publish(albumId, {}, admin)).rejects.toThrow('Copy failed');
    expect(current.status).toBe('DRAFT'); warn.mockRestore();
  });
  it('makes repeated publication idempotent and rejects a changed selection', async () => {
    const first = await service.publish(albumId, {}, admin);
    const repeated = await service.publish(albumId, {}, admin);
    expect(repeated).toEqual(first); expect(storage.transfer).toHaveBeenCalledTimes(4);
    await expect(service.publish(albumId, { photoIds: [one] }, admin)).rejects.toMatchObject({ status: 409 });
  });
  it('rejects competing publication across API instances', async () => {
    tx.$queryRaw.mockResolvedValueOnce([{ locked: false }]);
    await expect(service.publish(albumId, {}, admin)).rejects.toMatchObject({ status: 409 });
    expect(storage.source).not.toHaveBeenCalled();
  });
  it('bounds concurrent publication requests in one process', async () => {
    let release!: (value: string) => void;
    storage.source.mockImplementationOnce(() => new Promise((resolve) => { release = resolve; }));
    const first = service.publish(albumId, {}, admin);
    while (!release) await new Promise((resolve) => setImmediate(resolve));
    await expect(service.publish(albumId, {}, admin)).rejects.toMatchObject({ status: 503 });
    release('"etag"'); await first;
  });
  it('keeps outputs after an ambiguous database commit and allows an idempotent retry', async () => {
    prisma.$transaction.mockImplementationOnce(async (work) => { await work(tx); throw new Error('connection lost during commit'); });
    await expect(service.publish(albumId, {}, admin)).rejects.toMatchObject({ status: 503 });
    expect(storage.cleanup).not.toHaveBeenCalled();
    await expect(service.publish(albumId, {}, admin)).resolves.toMatchObject({ status: 'PUBLISHED' });
  });
  it('archives idempotently without deleting historical S3 objects or publication metadata', async () => {
    await service.publish(albumId, {}, admin);
    const originalDate = current.publishedAt, originalKey = current.photos[0].publishedKey;
    await expect(service.archive(albumId, admin)).resolves.toMatchObject({ status: 'ARCHIVED' });
    await expect(service.archive(albumId, admin)).resolves.toMatchObject({ status: 'ARCHIVED' });
    expect(current.publishedAt).toBe(originalDate); expect(current.photos[0].publishedKey).toBe(originalKey);
    expect(storage.cleanup).not.toHaveBeenCalled();
    await expect(service.publish(albumId, {}, admin)).rejects.toMatchObject({ status: 409 });
  });
  it('does not archive drafts or select an unpublished image as a published cover', async () => {
    await expect(service.archive(albumId, admin)).rejects.toMatchObject({ status: 409 });
    await service.publish(albumId, { photoIds: [one] }, admin);
    await expect(service.cover(albumId, two, admin)).rejects.toMatchObject({ status: 400 });
  });
});
