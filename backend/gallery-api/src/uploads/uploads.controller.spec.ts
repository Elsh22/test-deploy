import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityService } from '../auth/security.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MAX_UPLOAD_BYTES } from './dto/create-upload.dto';
import { ImageProcessingService } from './image-processing.service';
import { PhotoPreviewService } from './photo-preview.service';

const albumId = 'd6e989b8-3913-43cc-90cb-39825fa2c022';
const photoId = 'd1b35a86-7842-46ba-8f70-213b115c3cb9';
const dto = { filename: 'event.webp', mimeType: 'image/webp', sizeBytes: 42 };

describe('UploadsController HTTP authorization and validation', () => {
  let app: INestApplication;
  let base: string;
  const uploads = { create: jest.fn(), complete: jest.fn() };
  const processing = { process: jest.fn() };
  const previews = { thumbnail: jest.fn() };
  const adminUser = { findUnique: jest.fn() };
  const jwt = { verifyAsync: jest.fn() };
  beforeAll(async () => {
    const module = await Test.createTestingModule({ controllers: [UploadsController], providers: [
      { provide: UploadsService, useValue: uploads },
      { provide: ImageProcessingService, useValue: processing },
      { provide: PhotoPreviewService, useValue: previews },
      { provide: PrismaService, useValue: { adminUser, revokedAccessToken: { findUnique: async () => null } } },
      { provide: SecurityService, useValue: { consume: async () => undefined } }, { provide: JwtService, useValue: jwt }, JwtAuthGuard, RolesGuard,
    ] }).compile();
    app = module.createNestApplication({ logger: false });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.listen(0, '127.0.0.1');
    base = await app.getUrl();
  });
  beforeEach(() => {
    jest.resetAllMocks();
    jwt.verifyAsync.mockResolvedValue({ sub: 'owner', role: 'ADMIN', iat: Math.floor(Date.now()/1000), exp: Math.floor(Date.now()/1000)+900 });
    adminUser.findUnique.mockResolvedValue({ id: 'owner', role: 'ADMIN', isActive: true });
    uploads.create.mockResolvedValue({ photoId, status: 'PENDING' });
    uploads.complete.mockResolvedValue({ photoId, status: 'UPLOADED' });
    processing.process.mockResolvedValue({ photoId, status: 'PROCESSED', width: 100, height: 100 });
    previews.thumbnail.mockResolvedValue(Buffer.from('webp'));
  });
  afterAll(async () => { await app.close(); });
  function post(path: string, body: unknown = {}, authorization: string | null = 'Bearer test-token') {
    return fetch(`${base}/api/admin/${path}`, { method: 'POST', headers: {
      'Content-Type': 'application/json', ...(authorization ? { Authorization: authorization } : {}),
    }, body: JSON.stringify(body) });
  }
  it.each([`albums/${albumId}/uploads`, `photos/${photoId}/complete`, `photos/${photoId}/process`])('requires authentication on %s', async (path) => {
    expect((await post(path, dto, null)).status).toBe(401);
  });
  it('rejects invalid JWTs', async () => {
    jwt.verifyAsync.mockRejectedValue(new Error('bad token'));
    expect((await post(`albums/${albumId}/uploads`, dto)).status).toBe(401);
    expect(uploads.create).not.toHaveBeenCalled();
  });
  it.each([`albums/${albumId}/uploads`, `photos/${photoId}/complete`, `photos/${photoId}/process`])('enforces roles on %s', async (path) => {
    adminUser.findUnique.mockResolvedValue({ id: 'owner', role: 'VIEWER', isActive: true });
    expect((await post(path, dto)).status).toBe(403);
  });
  it('rejects inactive administrators', async () => {
    adminUser.findUnique.mockResolvedValue({ id: 'owner', role: 'ADMIN', isActive: false });
    expect((await post(`albums/${albumId}/uploads`, dto)).status).toBe(401);
  });
  it.each(['ADMIN', 'SUPER_ADMIN'])('allows the %s role and passes the database principal', async (role) => {
    adminUser.findUnique.mockResolvedValue({ id: 'owner', role, isActive: true });
    const response = await post(`albums/${albumId}/uploads`, dto);
    expect(response.status).toBe(201);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(uploads.create).toHaveBeenCalledWith(albumId, dto, { id: 'owner', role, isActive: true });
  });
  it.each(['albums/invalid/uploads', 'photos/invalid/complete', 'photos/invalid/process'])('rejects invalid UUIDs: %s', async (path) => {
    expect((await post(path, dto)).status).toBe(400);
  });
  it.each([
    {}, { ...dto, mimeType: 'image/gif' }, { ...dto, mimeType: 'text/html' },
    { ...dto, filename: '../event.webp' }, { ...dto, filename: 'bad\u0000.webp' },
    { ...dto, sizeBytes: MAX_UPLOAD_BYTES + 1 }, { ...dto, sizeBytes: 0 },
    { ...dto, sizeBytes: -1 }, { ...dto, sizeBytes: 1.5 }, { ...dto, sizeBytes: '42' },
    { ...dto, key: 'arbitrary/key' }, { ...dto, bucket: 'other-bucket' },
  ])('rejects malformed upload metadata %j', async (body) => {
    expect((await post(`albums/${albumId}/uploads`, body)).status).toBe(400);
    expect(uploads.create).not.toHaveBeenCalled();
  });
  it('routes authorized completion to the service', async () => {
    const response = await post(`photos/${photoId}/complete`);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ photoId, status: 'UPLOADED' });
    expect(uploads.complete).toHaveBeenCalledWith(photoId, expect.objectContaining({ id: 'owner' }));
  });
  it.each(['ADMIN', 'SUPER_ADMIN'])('allows authorized processing by %s without returning storage paths', async (role) => {
    adminUser.findUnique.mockResolvedValue({ id: 'owner', role, isActive: true });
    const response = await post(`photos/${photoId}/process`);
    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(await response.json()).toEqual({ photoId, status: 'PROCESSED', width: 100, height: 100 });
    expect(processing.process).toHaveBeenCalledWith(photoId, expect.objectContaining({ id: 'owner', role }));
  });
  it('requires JWT and role authorization for private previews', async () => {
    expect((await fetch(`${base}/api/admin/photos/${photoId}/preview`)).status).toBe(401);
    adminUser.findUnique.mockResolvedValue({ id: 'owner', role: 'VIEWER', isActive: true });
    expect((await fetch(`${base}/api/admin/photos/${photoId}/preview`, { headers: { Authorization: 'Bearer test-token' } })).status).toBe(403);
  });
  it('streams private WebP thumbnails without returning an object URL', async () => {
    const response = await fetch(`${base}/api/admin/photos/${photoId}/preview`, { headers: { Authorization: 'Bearer test-token' } });
    expect(response.status).toBe(200); expect(response.headers.get('content-type')).toContain('image/webp');
    expect(response.headers.get('cache-control')).toBe('private, no-store');
    expect(await response.text()).toBe('webp');
  });
});
