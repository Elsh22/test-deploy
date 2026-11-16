import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { StagingStorageService } from './staging-storage.service';
import { PhotoPreviewService } from './photo-preview.service';
const id = 'd1b35a86-7842-46ba-8f70-213b115c3cb9';
const albumId = 'd6e989b8-3913-43cc-90cb-39825fa2c022';
const key = `processed/${albumId}/${id}/9e66b70a-e468-4b22-8d8e-447fd151ed48/thumbnail.webp`;
const owner = { id: 'owner', role: 'ADMIN' as const };
describe('PhotoPreviewService', () => {
  let service: PhotoPreviewService;
  const photo = { findUnique: jest.fn() }, storage = { readSource: jest.fn() };
  beforeEach(async () => {
    jest.resetAllMocks();
    photo.findUnique.mockResolvedValue({ id, albumId, status: 'PROCESSED', thumbnailKey: key, thumbnailSizeBytes: 10, album: { createdById: owner.id } });
    storage.readSource.mockResolvedValue(Buffer.from('webp'));
    const module = await Test.createTestingModule({ providers: [PhotoPreviewService,
      { provide: PrismaService, useValue: { photo } }, { provide: StagingStorageService, useValue: storage },
    ] }).compile(); service = module.get(PhotoPreviewService);
  });
  it('streams only the owner-authorized processed thumbnail', async () => {
    await expect(service.thumbnail(id, owner)).resolves.toEqual(Buffer.from('webp'));
    expect(storage.readSource).toHaveBeenCalledWith(key, 10, 'image/webp');
  });
  it('denies another ADMIN and permits SUPER_ADMIN', async () => {
    await expect(service.thumbnail(id, { id: 'other', role: 'ADMIN' })).rejects.toMatchObject({ status: 403 });
    expect(storage.readSource).not.toHaveBeenCalled();
    await expect(service.thumbnail(id, { id: 'super', role: 'SUPER_ADMIN' })).resolves.toBeInstanceOf(Buffer);
  });
  it('rejects unknown or unprocessed photos without reading S3', async () => {
    photo.findUnique.mockResolvedValueOnce(null);
    await expect(service.thumbnail(id, owner)).rejects.toMatchObject({ status: 404 });
    photo.findUnique.mockResolvedValueOnce({ id, albumId, status: 'PENDING', album: { createdById: 'owner' } });
    await expect(service.thumbnail(id, owner)).rejects.toMatchObject({ status: 409 });
    expect(storage.readSource).not.toHaveBeenCalled();
  });
});
