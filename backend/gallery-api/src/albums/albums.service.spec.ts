import { Test } from '@nestjs/testing';
import { AlbumsService } from './albums.service';
import { PrismaService } from '../prisma/prisma.service';

const albumId = 'd6e989b8-3913-43cc-90cb-39825fa2c022';
const photoId = 'd1b35a86-7842-46ba-8f70-213b115c3cb9';
const attempt = '9e66b70a-e468-4b22-8d8e-447fd151ed48';
const key = `Events/${albumId}/${attempt}/${photoId}`;
const published = { id: albumId, title: 'Meeting', slug: 'meeting', status: 'PUBLISHED', publishedAt: new Date('2026-11-15T12:00:00Z'), photos: [
  { id: photoId, status: 'PROCESSED', isCover: true, sortOrder: 0, width: 1920, height: 960,
    publishedKey: `${key}/full.webp`, publishedThumbnailKey: `${key}/thumbnail.webp` },
] };

describe('AlbumsService public visibility', () => {
  let service: AlbumsService;
  const album = { findMany: jest.fn(), findFirst: jest.fn() };
  beforeEach(async () => {
    jest.resetAllMocks();
    const module = await Test.createTestingModule({ providers: [AlbumsService,
      { provide: PrismaService, useValue: { album } },
    ] }).compile();
    service = module.get(AlbumsService);
  });
  it('returns an empty list when no publication is ready', async () => {
    album.findMany.mockResolvedValue([]);
    await expect(service.findAll()).resolves.toEqual([]);
    expect(album.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { status: 'PUBLISHED' } }));
  });
  it('returns only server-generated CloudFront image/thumbnail URLs, without internal keys', async () => {
    album.findFirst.mockResolvedValue(published);
    const result = await service.findOne('meeting');
    expect(result!.photos[0]).toMatchObject({ imageUrl: `https://d6uqhuj15c85p.cloudfront.net/${key}/full.webp`,
      thumbnailUrl: `https://d6uqhuj15c85p.cloudfront.net/${key}/thumbnail.webp`, mimeType: 'image/webp' });
    expect(JSON.stringify(result)).not.toContain('publishedKey');
    expect(JSON.stringify(result)).not.toContain('processed/');
    const query = album.findFirst.mock.calls[0][0];
    expect(query.where).toEqual({ slug: 'meeting', status: 'PUBLISHED' });
    expect(query.select.photos.where).toEqual({ status: 'PROCESSED', publishedKey: { not: null }, publishedThumbnailKey: { not: null } });
    expect(query.select.photos.orderBy).toEqual([{ sortOrder: 'asc' }, { id: 'asc' }]);
    expect(query.select.photos.select).not.toHaveProperty('s3Key');
    expect(query.select.photos.select).not.toHaveProperty('processedKey');
  });
  it.each(['DRAFT', 'ARCHIVED'])('never exposes %s albums through listing or detail', async (status) => {
    album.findMany.mockResolvedValue([{ ...published, status }]);
    album.findFirst.mockResolvedValue({ ...published, status });
    await expect(service.findAll()).resolves.toEqual([]);
    await expect(service.findOne('meeting')).resolves.toBeNull();
  });
  it('hides pending/unselected photos and incomplete or malformed publications', async () => {
    const invisible = [{ ...published.photos[0], status: 'PENDING' },
      { ...published.photos[0], publishedKey: null },
      { ...published.photos[0], publishedKey: 'Events/../../private' }];
    album.findFirst.mockResolvedValue({ ...published, photos: invisible });
    await expect(service.findOne('meeting')).resolves.toBeNull();
    album.findFirst.mockResolvedValue({ ...published, photos: [...published.photos, ...invisible] });
    expect((await service.findOne('meeting'))!.photos).toHaveLength(1);
  });
  it('returns null for an unknown public slug', async () => {
    album.findFirst.mockResolvedValue(null);
    await expect(service.findOne('unknown')).resolves.toBeNull();
  });
  it('propagates database errors instead of inventing an empty listing', async () => {
    album.findFirst.mockRejectedValue(new Error('Database unavailable'));
    await expect(service.findOne('meeting')).rejects.toThrow('Database unavailable');
  });
});
