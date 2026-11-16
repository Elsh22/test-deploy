import { Test } from '@nestjs/testing';
import { ConflictException, Logger, ServiceUnavailableException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImageProcessingService } from './image-processing.service';
import { SharpImageService } from './sharp-image.service';
import { StagingStorageService } from './staging-storage.service';
import sharp from 'sharp';

const photoId = 'd1b35a86-7842-46ba-8f70-213b115c3cb9';
const albumId = 'd6e989b8-3913-43cc-90cb-39825fa2c022';
const admin = { id: 'owner', role: 'ADMIN' as const };
const photo = { id: photoId, albumId, status: 'UPLOADED', s3Key: `uploads/${albumId}/${photoId}.webp`,
  mimeType: 'image/webp', sizeBytes: 42, album: { id: albumId, status: 'DRAFT', createdById: 'owner' },
  processedKey: null, thumbnailKey: null, width: null, height: null };
const output = { full: { data: Buffer.from('full'), info: { width: 1920, height: 960 } },
  thumbnail: { data: Buffer.from('thumb'), info: { width: 480, height: 240 } } };

describe('ImageProcessingService', () => {
  let service: ImageProcessingService;
  const tx = { photo: { findUnique: jest.fn(), update: jest.fn() }, $queryRaw: jest.fn() };
  const prisma = { $transaction: jest.fn() };
  const storage = { readSource: jest.fn(), writeProcessed: jest.fn(), cleanupProcessed: jest.fn() };
  const images = { render: jest.fn() };
  beforeEach(async () => {
    jest.resetAllMocks();
    tx.$queryRaw.mockResolvedValue([{ locked: true }]);
    tx.photo.findUnique.mockResolvedValue(photo);
    prisma.$transaction.mockImplementation((work) => work(tx));
    storage.readSource.mockResolvedValue(Buffer.alloc(42));
    storage.writeProcessed.mockResolvedValue(undefined);
    storage.cleanupProcessed.mockResolvedValue(true);
    images.render.mockResolvedValue(output);
    const module = await Test.createTestingModule({ providers: [ImageProcessingService,
      { provide: PrismaService, useValue: prisma }, { provide: StagingStorageService, useValue: storage },
      { provide: SharpImageService, useValue: images },
    ] }).compile();
    service = module.get(ImageProcessingService);
  });
  it('preserves source metadata, writes both outputs, then commits PROCESSED', async () => {
    const writes: string[] = [];
    storage.writeProcessed.mockImplementation(async () => { writes.push('put'); });
    tx.photo.update.mockImplementation(async () => { expect(writes).toHaveLength(2); });
    await expect(service.process(photoId, admin)).resolves.toEqual({ photoId, status: 'PROCESSED', width: 1920, height: 960 });
    const update = tx.photo.update.mock.calls[0][0].data;
    expect(update).toMatchObject({ status: 'PROCESSED', processedSizeBytes: 4, thumbnailSizeBytes: 5,
      width: 1920, height: 960, processingError: null });
    expect(update.processedKey).toMatch(new RegExp(`^processed/${albumId}/${photoId}/[a-f0-9-]+/full.webp$`));
    expect(update.thumbnailKey).toBe(update.processedKey.replace('/full.webp', '/thumbnail.webp'));
    expect(update).not.toHaveProperty('s3Key');
    expect(update).not.toHaveProperty('albumId');
    expect(update).not.toHaveProperty('filename');
    expect(update).not.toHaveProperty('mimeType');
    expect(update).not.toHaveProperty('sizeBytes');
  });
  it('processes real image bytes through the complete orchestration flow', async () => {
    const source = await sharp({ create: { width: 200, height: 100, channels: 3, background: '#facc15' } }).webp().toBuffer();
    storage.readSource.mockResolvedValue(source);
    const real = new ImageProcessingService(prisma as unknown as PrismaService,
      storage as unknown as StagingStorageService, new SharpImageService());
    await expect(real.process(photoId, admin)).resolves.toMatchObject({ status: 'PROCESSED', width: 200, height: 100 });
    for (const [, data] of storage.writeProcessed.mock.calls) {
      expect(await sharp(data).metadata()).toMatchObject({ format: 'webp', width: 200, height: 100 });
    }
  });
  it.each(['PENDING'])('rejects %s without changing metadata', async (status) => {
    tx.photo.findUnique.mockResolvedValue({ ...photo, status });
    await expect(service.process(photoId, admin)).rejects.toBeInstanceOf(ConflictException);
    expect(storage.readSource).not.toHaveBeenCalled();
    expect(tx.photo.update).not.toHaveBeenCalled();
  });
  it('rejects missing photos and unauthorized administrators', async () => {
    tx.photo.findUnique.mockResolvedValue(null);
    await expect(service.process(photoId, admin)).rejects.toMatchObject({ status: 404 });
    tx.photo.findUnique.mockResolvedValue(photo);
    await expect(service.process(photoId, { ...admin, id: 'other' })).rejects.toMatchObject({ status: 403 });
    expect(storage.readSource).not.toHaveBeenCalled();
  });
  it('permits SUPER_ADMIN and rejects non-draft albums', async () => {
    await expect(service.process(photoId, { id: 'super', role: 'SUPER_ADMIN' })).resolves.toMatchObject({ status: 'PROCESSED' });
    tx.photo.findUnique.mockResolvedValue({ ...photo, album: { ...photo.album, status: 'PUBLISHED' } });
    await expect(service.process(photoId, admin)).rejects.toMatchObject({ status: 409 });
  });
  it('returns an already processed result without fetching or writing S3', async () => {
    tx.photo.findUnique.mockResolvedValue({ ...photo, status: 'PROCESSED', processedKey: 'private/full', thumbnailKey: 'private/thumb' });
    const result = await service.process(photoId, admin);
    expect(result).not.toHaveProperty('processedKey');
    expect(storage.readSource).not.toHaveBeenCalled();
    expect(tx.photo.update).not.toHaveBeenCalled();
  });
  it('rejects duplicate work owned by another API instance', async () => {
    tx.$queryRaw.mockResolvedValueOnce([{ locked: false }]);
    await expect(service.process(photoId, admin)).rejects.toBeInstanceOf(ConflictException);
    expect(storage.readSource).not.toHaveBeenCalled();
  });
  it('bounds native work and rejects a concurrent request within the same process', async () => {
    let release!: (value: typeof output) => void;
    images.render.mockImplementationOnce(() => new Promise((resolve) => { release = resolve; }));
    const first = service.process(photoId, admin);
    while (!release) await new Promise((resolve) => setImmediate(resolve));
    await expect(service.process(photoId, admin)).rejects.toBeInstanceOf(ServiceUnavailableException);
    release(output);
    await first;
  });
  it('records FAILED for decoder errors and permits a corrected retry', async () => {
    images.render.mockRejectedValueOnce(new UnprocessableEntityException('Image could not be safely decoded'));
    await expect(service.process(photoId, admin)).rejects.toMatchObject({ status: 422 });
    expect(tx.photo.update).toHaveBeenLastCalledWith({ where: { id: photoId }, data: expect.objectContaining({ status: 'FAILED', processingError: 'INVALID_IMAGE' }) });
    tx.photo.findUnique.mockResolvedValue({ ...photo, status: 'FAILED' });
    await expect(service.process(photoId, admin)).resolves.toMatchObject({ status: 'PROCESSED' });
  });
  it.each([1, 2])('cleans attempted keys and records FAILED if output write %i fails', async (writeNumber) => {
    if (writeNumber === 2) storage.writeProcessed.mockResolvedValueOnce(undefined);
    storage.writeProcessed.mockRejectedValueOnce(new ServiceUnavailableException('Processed image could not be stored'));
    await expect(service.process(photoId, admin)).rejects.toMatchObject({ status: 503 });
    expect(storage.cleanupProcessed.mock.calls[0][0]).toHaveLength(writeNumber);
    expect(tx.photo.update).toHaveBeenLastCalledWith({ where: { id: photoId }, data: expect.objectContaining({ status: 'FAILED', processedKey: null, thumbnailKey: null }) });
  });
  it('records failure even when best-effort cleanup itself fails', async () => {
    const warn = jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
    storage.writeProcessed.mockRejectedValueOnce(new ServiceUnavailableException());
    storage.cleanupProcessed.mockRejectedValueOnce(new Error('raw AWS details'));
    await expect(service.process(photoId, admin)).rejects.toMatchObject({ status: 503 });
    expect(tx.photo.update).toHaveBeenCalledWith({ where: { id: photoId }, data: expect.objectContaining({ status: 'FAILED' }) });
    warn.mockRestore();
  });
  it('records FAILED when source retrieval fails, without writing outputs', async () => {
    storage.readSource.mockRejectedValueOnce(new ServiceUnavailableException('Source image could not be retrieved'));
    await expect(service.process(photoId, admin)).rejects.toMatchObject({ status: 503 });
    expect(tx.photo.update).toHaveBeenCalledWith({ where: { id: photoId }, data: expect.objectContaining({ status: 'FAILED' }) });
    expect(storage.writeProcessed).not.toHaveBeenCalled();
  });
  it('does not delete outputs on an ambiguous database commit failure', async () => {
    prisma.$transaction.mockImplementationOnce(async (work) => { await work(tx); throw new Error('private DB internals'); });
    await expect(service.process(photoId, admin)).rejects.toThrow('retry later');
    expect(storage.cleanupProcessed).not.toHaveBeenCalled();
  });
});
