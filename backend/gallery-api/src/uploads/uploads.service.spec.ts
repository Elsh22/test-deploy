import { Test } from '@nestjs/testing';
import { BadRequestException, ConflictException, ForbiddenException, NotFoundException, PayloadTooLargeException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadsService } from './uploads.service';
import { StagingStorageService } from './staging-storage.service';
import { MAX_UPLOAD_BYTES } from './dto/create-upload.dto';

const albumId = 'd6e989b8-3913-43cc-90cb-39825fa2c022';
const photoId = 'd1b35a86-7842-46ba-8f70-213b115c3cb9';
const admin = { id: 'owner', role: 'ADMIN' as const };
const draft = { id: albumId, createdById: admin.id, status: 'DRAFT' };
const dto = { filename: 'event.webp', mimeType: 'image/webp' as const, sizeBytes: 42 };
const pending = { id: photoId, albumId, album: draft, s3Key: `uploads/${albumId}/${photoId}.webp`, ...dto, status: 'PENDING' };

describe('UploadsService', () => {
  let service: UploadsService;
  const prisma = {
    album: { findUnique: jest.fn() },
    photo: { findUnique: jest.fn(), create: jest.fn(), updateMany: jest.fn() },
    $transaction: jest.fn(), $queryRaw: jest.fn(),
  };
  const storage = { presign: jest.fn(), head: jest.fn() };
  beforeEach(async () => {
    jest.resetAllMocks();
    prisma.album.findUnique.mockResolvedValue(draft);
    prisma.photo.findUnique.mockResolvedValue(pending);
    prisma.photo.updateMany.mockResolvedValue({ count: 1 });
    prisma.$transaction.mockImplementation((work) => work(prisma));
    storage.presign.mockResolvedValue('https://staging.example.test/signed');
    storage.head.mockResolvedValue({ ContentLength: 42, ContentType: 'image/webp' });
    const module = await Test.createTestingModule({ providers: [UploadsService,
      { provide: PrismaService, useValue: prisma }, { provide: StagingStorageService, useValue: storage },
    ] }).compile();
    service = module.get(UploadsService);
  });

  it('rejects a nonexistent album before signing', async () => {
    prisma.album.findUnique.mockResolvedValue(null);
    await expect(service.create(albumId, dto, admin)).rejects.toBeInstanceOf(NotFoundException);
    expect(storage.presign).not.toHaveBeenCalled();
  });
  it.each(['PUBLISHED', 'ARCHIVED'])('rejects %s albums', async (status) => {
    prisma.album.findUnique.mockResolvedValue({ ...draft, status });
    await expect(service.create(albumId, dto, admin)).rejects.toBeInstanceOf(ConflictException);
  });
  it('rejects another administrator for creation and completion', async () => {
    const other = { ...admin, id: 'someone-else' };
    await expect(service.create(albumId, dto, other)).rejects.toBeInstanceOf(ForbiddenException);
    await expect(service.complete(photoId, other)).rejects.toBeInstanceOf(ForbiddenException);
    expect(storage.head).not.toHaveBeenCalled();
  });
  it('allows an explicitly privileged SUPER_ADMIN', async () => {
    await expect(service.create(albumId, dto, { id: 'super', role: 'SUPER_ADMIN' })).resolves.toMatchObject({ status: 'PENDING' });
  });
  it('rejects extension and MIME mismatches', async () => {
    await expect(service.create(albumId, { ...dto, filename: 'event.png' }, admin)).rejects.toBeInstanceOf(BadRequestException);
  });
  it.each([
    ['event.jpg', 'image/jpeg', 'jpg'],
    ['event.jpeg', 'image/jpeg', 'jpg'],
    ['event.png', 'image/png', 'png'],
  ] as const)('accepts %s with its matching MIME type', async (filename, mimeType, extension) => {
    const result = await service.create(albumId, { ...dto, filename, mimeType }, admin);
    expect(storage.presign).toHaveBeenCalledWith(`uploads/${albumId}/${result.photoId}.${extension}`, mimeType);
  });
  it('creates a new pending photo and returns exact PUT headers and expiry', async () => {
    const result = await service.create(albumId, dto, admin);
    expect(result).toMatchObject({ status: 'PENDING', method: 'PUT', expiresIn: 300,
      headers: { 'Content-Type': 'image/webp', 'If-None-Match': '*' } });
    expect(result.photoId).toMatch(/^[0-9a-f-]{36}$/);
    expect(storage.presign).toHaveBeenCalledWith(`uploads/${albumId}/${result.photoId}.webp`, 'image/webp');
    expect(prisma.photo.create).toHaveBeenCalledWith({ data: {
      id: result.photoId, albumId, s3Key: `uploads/${albumId}/${result.photoId}.webp`, ...dto, status: 'PENDING',
    } });
    expect(result).not.toHaveProperty('cloudFrontUrl');
  });
  it('does not insert metadata if signing fails', async () => {
    storage.presign.mockRejectedValue(new Error('signing unavailable'));
    await expect(service.create(albumId, dto, admin)).rejects.toThrow();
    expect(prisma.photo.create).not.toHaveBeenCalled();
  });
  it('reuses an upload request identity without creating a duplicate photograph', async () => {
    const result = await service.create(albumId, { ...dto, requestId: photoId }, admin);
    expect(result.photoId).toBe(photoId);
    expect(prisma.photo.findUnique).toHaveBeenCalledWith({ where: { uploadRequestId: photoId } });
    expect(prisma.photo.create).not.toHaveBeenCalled();
    expect(storage.presign).toHaveBeenCalledWith(pending.s3Key, pending.mimeType);
  });
  it('rejects an identity reused for different file metadata or another album', async () => {
    await expect(service.create(albumId, { ...dto, filename: 'different.webp', requestId: photoId }, admin)).rejects.toMatchObject({ status: 409 });
    prisma.photo.findUnique.mockResolvedValue({ ...pending, albumId: 'another' });
    await expect(service.create(albumId, { ...dto, requestId: photoId }, admin)).rejects.toMatchObject({ status: 409 });
  });
  it('resumes a concurrent matching request after acquiring the album lock', async () => {
    prisma.photo.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce(pending);
    const result = await service.create(albumId, { ...dto, requestId: photoId }, admin);
    expect(result.photoId).toBe(photoId); expect(prisma.photo.create).not.toHaveBeenCalled();
  });
  it('reports an already uploaded request without issuing another PUT URL', async () => {
    prisma.photo.findUnique.mockResolvedValue({ ...pending, status: 'UPLOADED' });
    await expect(service.create(albumId, { ...dto, requestId: photoId }, admin)).resolves.toEqual({ photoId, status: 'UPLOADED' });
    expect(storage.presign).not.toHaveBeenCalled();
  });
  it('rechecks album status inside the metadata transaction', async () => {
    prisma.album.findUnique.mockResolvedValueOnce(draft).mockResolvedValueOnce({ ...draft, status: 'PUBLISHED' });
    await expect(service.create(albumId, dto, admin)).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.photo.create).not.toHaveBeenCalled();
  });
  it('rejects missing photos', async () => {
    prisma.photo.findUnique.mockResolvedValue(null);
    await expect(service.complete(photoId, admin)).rejects.toBeInstanceOf(NotFoundException);
  });
  it('rejects missing S3 uploads without updating metadata', async () => {
    storage.head.mockRejectedValue(new ConflictException('Upload not found'));
    await expect(service.complete(photoId, admin)).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.photo.updateMany).not.toHaveBeenCalled();
  });
  it.each([
    { ContentLength: 0, ContentType: 'image/webp' },
    { ContentLength: 43, ContentType: 'image/webp' },
    { ContentLength: 42, ContentType: 'image/png' },
    { ContentType: 'image/webp' },
  ])('rejects invalid actual object metadata %j', async (object) => {
    storage.head.mockResolvedValue(object);
    await expect(service.complete(photoId, admin)).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.photo.updateMany).not.toHaveBeenCalled();
  });
  it('rejects oversized actual objects even if the declaration was small', async () => {
    storage.head.mockResolvedValue({ ContentLength: MAX_UPLOAD_BYTES + 1, ContentType: 'image/webp' });
    await expect(service.complete(photoId, admin)).rejects.toBeInstanceOf(PayloadTooLargeException);
  });
  it('marks a verified upload UPLOADED, never PROCESSED', async () => {
    await expect(service.complete(photoId, admin)).resolves.toEqual({ photoId, status: 'UPLOADED' });
    expect(prisma.photo.updateMany).toHaveBeenCalledWith({
      where: { id: photoId, status: 'PENDING', album: { status: 'DRAFT' } },
      data: { status: 'UPLOADED', sizeBytes: 42 },
    });
  });
  it('returns the same result on repeated completion without issuing another S3 request', async () => {
    prisma.photo.findUnique.mockResolvedValue({ ...pending, status: 'UPLOADED' });
    await expect(service.complete(photoId, admin)).resolves.toEqual({ photoId, status: 'UPLOADED' });
    expect(storage.head).not.toHaveBeenCalled();
    expect(prisma.photo.updateMany).not.toHaveBeenCalled();
  });
  it('handles two concurrent completion attempts safely', async () => {
    prisma.photo.findUnique.mockResolvedValueOnce(pending).mockResolvedValueOnce({ ...pending, status: 'UPLOADED' });
    await expect(service.complete(photoId, admin)).resolves.toEqual({ photoId, status: 'UPLOADED' });
    expect(prisma.photo.updateMany).not.toHaveBeenCalled();
  });
  it('rejects a state transition that races completion', async () => {
    prisma.photo.updateMany.mockResolvedValue({ count: 0 });
    await expect(service.complete(photoId, admin)).rejects.toBeInstanceOf(ConflictException);
  });
  it('rejects an album published while S3 verification was in flight', async () => {
    prisma.photo.findUnique.mockResolvedValueOnce(pending).mockResolvedValueOnce({
      ...pending, album: { ...draft, status: 'PUBLISHED' },
    });
    await expect(service.complete(photoId, admin)).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.photo.updateMany).not.toHaveBeenCalled();
  });
  it('rejects completing a published album', async () => {
    prisma.photo.findUnique.mockResolvedValue({ ...pending, album: { ...draft, status: 'PUBLISHED' } });
    await expect(service.complete(photoId, admin)).rejects.toBeInstanceOf(ConflictException);
  });
  it('rejects processed photos and unexpected object keys', async () => {
    prisma.photo.findUnique.mockResolvedValueOnce({ ...pending, status: 'PROCESSED' });
    await expect(service.complete(photoId, admin)).rejects.toBeInstanceOf(ConflictException);
    prisma.photo.findUnique.mockResolvedValueOnce({ ...pending, s3Key: 'other/key' });
    await expect(service.complete(photoId, admin)).rejects.toBeInstanceOf(ConflictException);
    expect(storage.head).not.toHaveBeenCalled();
  });
});
