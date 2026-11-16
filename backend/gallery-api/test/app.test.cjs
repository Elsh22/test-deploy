const { Test } = require('@nestjs/testing');
const { AppModule } = require('../src/app.module');
const { PrismaService } = require('../src/prisma/prisma.service');
const { ConfigService } = require('@nestjs/config');

describe('Public album HTTP API', () => {
  let app;
  let url;
  const album = { findMany: jest.fn(), findFirst: jest.fn() };

  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(ConfigService).useValue({ getOrThrow: () => 'unit-test-only-jwt-secret-at-least-32-bytes' })
      .overrideProvider(PrismaService).useValue({ album }).compile();
    app = module.createNestApplication({ logger: false });
    await app.listen(0, '127.0.0.1');
    url = await app.getUrl();
  });
  beforeEach(() => jest.resetAllMocks());
  afterAll(async () => { if (app) await app.close(); });

  it('serves health without requiring a database', async () => {
    const response = await fetch(`${url}/health`);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: 'ok', service: 'dmc-gallery-api' });
  });

  it('returns an empty array for an empty public listing', async () => {
    album.findMany.mockResolvedValue([]);
    const response = await fetch(`${url}/api/albums`);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([]);
  });

  it('returns an album with only processed photographs', async () => {
    const albumId = 'd6e989b8-3913-43cc-90cb-39825fa2c022';
    const photoId = 'd1b35a86-7842-46ba-8f70-213b115c3cb9';
    const prefix = 'Events/' + albumId + '/9e66b70a-e468-4b22-8d8e-447fd151ed48/' + photoId;
    const published = { id: albumId, title: 'Published', slug: 'published', status: 'PUBLISHED', publishedAt: new Date('2026-11-15T12:00:00Z'), photos: [
      { id: photoId, status: 'PROCESSED', isCover: true, sortOrder: 0, publishedKey: prefix + '/full.webp', publishedThumbnailKey: prefix + '/thumbnail.webp' },
    ] };
    album.findFirst.mockResolvedValue(published);
    const response = await fetch(`${url}/api/albums/published`);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.photos[0].imageUrl).toBe('https://d6uqhuj15c85p.cloudfront.net/' + prefix + '/full.webp');
    expect(body.photos[0]).not.toHaveProperty('publishedKey');
    expect(album.findFirst).toHaveBeenCalledWith(expect.objectContaining({ where: { slug: 'published', status: 'PUBLISHED' } }));
  });

  it('supports the trailing-slash listing route', async () => {
    album.findMany.mockResolvedValue([]);
    expect((await fetch(url + '/api/albums/')).status).toBe(200);
  });

  it('returns 404 for an archived album', async () => {
    album.findFirst.mockResolvedValue(null);
    expect((await fetch(url + '/api/albums/archived')).status).toBe(404);
  });

  it('returns 404 when a public album cannot be found', async () => {
    album.findFirst.mockResolvedValue(null);
    expect((await fetch(`${url}/api/albums/unknown`)).status).toBe(404);
  });

  it('returns a sanitized 500 response for database failures', async () => {
    album.findMany.mockRejectedValue(new Error('Sensitive database failure details'));
    const response = await fetch(`${url}/api/albums`);
    expect(response.status).toBe(500);
    expect(JSON.stringify(await response.json())).not.toContain('Sensitive database failure details');
  });
});
