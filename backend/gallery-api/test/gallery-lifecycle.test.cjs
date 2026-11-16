const { Test } = require('@nestjs/testing');
const { ConfigService } = require('@nestjs/config');
const { JwtService } = require('@nestjs/jwt');
const { ValidationPipe, ConflictException, ServiceUnavailableException } = require('@nestjs/common');
const sharp = require('sharp');
const { AppModule } = require('../src/app.module');
const { PrismaService } = require('../src/prisma/prisma.service');
const { StagingStorageService } = require('../src/uploads/staging-storage.service');
const { PublicationStorageService } = require('../src/admin/publication-storage.service');
const { randomUUID } = require('node:crypto');

// Integrates real HTTP guards/controllers, DTOs, workflow services, and Sharp.
// Persistence and AWS are deterministic fakes; no user records or AWS objects are changed.
describe('Gallery HTTP upload-to-publication lifecycle', () => {
  let app, base, jwt, album, photos, privateObjects, publishedObjects, failCopy;
  const owner = '869be1b9-f977-40b4-91b1-36a29f374068';
  const other = '3e0603ec-0915-419b-b23b-c4d8b9783d07';
  const view = () => album && ({ ...album, photos: photos.filter(p => p.albumId === album.id).sort((a,b) => a.sortOrder-b.sortOrder || a.id.localeCompare(b.id)) });
  const photoView = p => p && ({ ...p, album: view() });
  const matches = (p, where) => Object.entries(where).every(([key, value]) => key === 'album' ? album.status === value.status : p[key] === value);
  const prisma = {
    adminUser: { findUnique: async ({ where }) => ({ id: where.id, email: 'unit@example.test', role: 'ADMIN', isActive: true }) },
    revokedAccessToken: { findUnique: async () => null },
    $queryRaw: async () => [{ count: 1, locked: true }],
    album: {
      create: async ({ data }) => { album = { ...data, id: randomUUID(), createdAt: new Date(), publishedAt: null }; return view(); },
      findUnique: async ({ where }) => album?.id === where.id ? view() : null,
      findFirst: async ({ where }) => album?.slug === where.slug && album.status === where.status ? view() : null,
      findMany: async ({ where }) => album && (!where.status || album.status === where.status) ? [view()] : [],
      update: async ({ data }) => { Object.assign(album, data); return view(); },
    },
    photo: {
      create: async ({ data }) => { const photo = { sortOrder: 0, isCover: false, ...data }; photos.push(photo); return photo; },
      findUnique: async ({ where, include }) => {
        const p = photos.find(p => matches(p, where)); return include?.album ? photoView(p) : p ? { ...p } : null;
      },
      update: async ({ where, data }) => { const p = photos.find(p => p.id === where.id); Object.assign(p, data); return photoView(p); },
      updateMany: async ({ where, data }) => { const found = photos.filter(p => matches(p, where)); found.forEach(p => Object.assign(p, data)); return { count: found.length }; },
    },
    $transaction: async work => {
      const snapshot = structuredClone({ album, photos });
      try { return await work(prisma); } catch (error) { album = snapshot.album; photos = snapshot.photos; throw error; }
    },
  };
  const staging = {
    presign: jest.fn(async key => `https://unit.invalid/${key}`),
    head: async key => { const object = privateObjects.get(key); if (!object) throw new ConflictException('Upload not found'); return { ContentLength: object.length, ContentType: 'image/webp' }; },
    readSource: jest.fn(async key => privateObjects.get(key)),
    writeProcessed: async (key, bytes) => { privateObjects.set(key, bytes); },
    cleanupProcessed: async keys => { keys.forEach(key => privateObjects.delete(key)); return true; },
  };
  const publication = {
    source: async (key, size) => { if (privateObjects.get(key)?.length !== size) throw new ConflictException('Missing optimized image'); return 'etag'; },
    transfer: jest.fn(async (source, destination) => {
      publishedObjects.set(destination, privateObjects.get(source));
      if (failCopy) throw new ServiceUnavailableException('Transfer interrupted');
      expect(album.status).toBe('DRAFT');
    }),
    cleanup: async keys => { keys.forEach(key => publishedObjects.delete(key)); return true; },
  };
  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(ConfigService).useValue({ getOrThrow: () => 'unit-test-lifecycle-secret-at-least-32-bytes' })
      .overrideProvider(PrismaService).useValue(prisma)
      .overrideProvider(StagingStorageService).useValue(staging)
      .overrideProvider(PublicationStorageService).useValue(publication).compile();
    app = module.createNestApplication({ logger: false });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.listen(0, '127.0.0.1'); base = await app.getUrl(); jwt = module.get(JwtService);
  });
  beforeEach(() => { album = null; photos = []; privateObjects = new Map(); publishedObjects = new Map(); failCopy = false; jest.clearAllMocks(); });
  afterAll(async () => app.close());
  async function request(path, method = 'GET', body, user = owner) {
    return fetch(`${base}${path}`, { method, headers: { 'Content-Type': 'application/json',
      ...(user ? { Authorization: `Bearer ${jwt.sign({ sub: user })}` } : {}) },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}) });
  }
  async function setup() {
    const response = await request('/api/admin/albums', 'POST', { title: 'Integration meeting', slug: 'integration-meeting' });
    expect(response.status).toBe(201); return (await response.json()).id;
  }
  async function upload(id, filename = 'meeting.webp', bytes) {
    const source = bytes || await sharp({ create: { width: 640, height: 320, channels: 3, background: '#facc15' } }).webp().toBuffer();
    const dto = { filename, mimeType: 'image/webp', sizeBytes: source.length, requestId: randomUUID() };
    const grant = await request(`/api/admin/albums/${id}/uploads`, 'POST', dto);
    expect(grant.status).toBe(201); const body = await grant.json();
    const same = await request(`/api/admin/albums/${id}/uploads`, 'POST', dto);
    expect((await same.json()).photoId).toBe(body.photoId); expect(photos.filter(p => p.uploadRequestId === dto.requestId)).toHaveLength(1);
    return { id: body.photoId, source, key: photos.find(p => p.id === body.photoId).s3Key };
  }
  async function process(upload) {
    privateObjects.set(upload.key, upload.source);
    expect((await request(`/api/admin/photos/${upload.id}/complete`, 'POST')).status).toBe(200);
    expect((await request(`/api/admin/photos/${upload.id}/process`, 'POST')).status).toBe(200);
  }
  it('uploads two images, processes real pixels, orders, selects cover, publishes, retries, then archives', async () => {
    const id = await setup(); const first = await upload(id), second = await upload(id, 'second.webp');
    expect((await request('/api/albums', 'GET', undefined, null)).status).toBe(200);
    expect(await (await request('/api/albums')).json()).toEqual([]);
    for (const photo of [first, second]) await process(photo);
    expect((await request(`/api/admin/albums/${id}/photos/order`, 'PUT', { photoIds: [second.id, first.id] })).status).toBe(200);
    expect((await request(`/api/admin/albums/${id}/cover`, 'PUT', { photoId: second.id })).status).toBe(200);
    expect((await request(`/api/admin/albums/${id}/publish`, 'POST', {})).status).toBe(200);
    expect(publishedObjects.size).toBe(4);
    const publicResponse = await request('/api/albums/integration-meeting', 'GET', undefined, null);
    expect(publicResponse.status).toBe(200); const result = await publicResponse.json();
    expect(result.photos.map(p => p.id)).toEqual([second.id, first.id]); expect(result.coverPhotoId).toBe(second.id);
    for (const photo of result.photos) {
      const key = new URL(photo.imageUrl).pathname.slice(1);
      expect(key.startsWith('Events/')).toBe(true); expect(publishedObjects.has(key)).toBe(true);
      expect(await sharp(publishedObjects.get(key)).metadata()).toMatchObject({ format: 'webp', width: 640, height: 320 });
    }
    expect(JSON.stringify(result)).not.toMatch(/uploads\/|processed\//);
    expect((await request(`/api/admin/albums/${id}/publish`, 'POST', {})).status).toBe(200);
    expect(publication.transfer).toHaveBeenCalledTimes(4);
    expect((await request(`/api/admin/albums/${id}/archive`, 'POST')).status).toBe(200);
    expect(await (await request('/api/albums')).json()).toEqual([]);
    expect((await request('/api/albums/integration-meeting')).status).toBe(404); expect(publishedObjects.size).toBe(4);
  });
  it('recovers from missing upload and interrupted transfer without exposing a partial album', async () => {
    const id = await setup(), photo = await upload(id);
    expect((await request(`/api/admin/photos/${photo.id}/complete`, 'POST')).status).toBe(409);
    expect(photos[0].status).toBe('PENDING'); await process(photo);
    await request(`/api/admin/albums/${id}/cover`, 'PUT', { photoId: photo.id });
    failCopy = true;
    expect((await request(`/api/admin/albums/${id}/publish`, 'POST', {})).status).toBe(503);
    expect(album.status).toBe('DRAFT'); expect(photos[0].publishedKey).toBeFalsy(); expect(publishedObjects.size).toBe(0);
    expect((await request('/api/albums/integration-meeting')).status).toBe(404);
    failCopy = false; expect((await request(`/api/admin/albums/${id}/publish`, 'POST', {})).status).toBe(200);
    expect(photos).toHaveLength(1);
  });
  it('rejects IDOR attempts for upload completion, processing, previews, cover, and publication', async () => {
    const id = await setup(), photo = await upload(id);
    for (const [path, method, body] of [
      [`photos/${photo.id}/complete`, 'POST'], [`photos/${photo.id}/process`, 'POST'], [`photos/${photo.id}/preview`, 'GET'],
      [`albums/${id}/cover`, 'PUT', { photoId: photo.id }], [`albums/${id}/publish`, 'POST', {}],
    ]) expect((await request(`/api/admin/${path}`, method, body, other)).status).toBe(403);
    expect(photos[0].status).toBe('PENDING'); expect(privateObjects.size).toBe(0); expect(publishedObjects.size).toBe(0);
  });
  it('does not publish corrupt image bytes even when upload MIME and length match', async () => {
    const id = await setup(), photo = await upload(id, 'corrupt.webp', Buffer.from('RIFFxxxxWEBPnot-an-image'));
    privateObjects.set(photo.key, photo.source);
    expect((await request(`/api/admin/photos/${photo.id}/complete`, 'POST')).status).toBe(200);
    expect((await request(`/api/admin/photos/${photo.id}/process`, 'POST')).status).toBe(422);
    expect(photos[0].status).toBe('FAILED'); expect(photos[0].processingError).toBe('INVALID_IMAGE');
    expect((await request(`/api/admin/albums/${id}/publish`, 'POST', {})).status).toBe(409);
    expect(publishedObjects.size).toBe(0);
  });
});
