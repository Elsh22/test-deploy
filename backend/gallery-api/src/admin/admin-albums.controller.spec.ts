import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminAlbumsController } from './admin-albums.controller';
import { AdminAlbumsService } from './admin-albums.service';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityService } from '../auth/security.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

const id = 'd6e989b8-3913-43cc-90cb-39825fa2c022';
const photo = 'd1b35a86-7842-46ba-8f70-213b115c3cb9';
const routes: Array<[string, string, object]> = [
  ['GET', '', {}], ['GET', `/${id}`, {}], ['POST', '', { title: 'New album', slug: 'new-album' }],
  ['PATCH', `/${id}`, { title: 'New title' }], ['PUT', `/${id}/photos/order`, { photoIds: [photo] }],
  ['PUT', `/${id}/cover`, { photoId: photo }], ['POST', `/${id}/publish`, {}], ['POST', `/${id}/archive`, {}],
];

describe('AdminAlbumsController authentication and validation', () => {
  let app: INestApplication, base: string;
  const service = { create: jest.fn(), findAll: jest.fn(), findOne: jest.fn(), update: jest.fn(), reorder: jest.fn(), cover: jest.fn(), publish: jest.fn(), archive: jest.fn() };
  const jwt = { verifyAsync: jest.fn() }, adminUser = { findUnique: jest.fn() };
  beforeAll(async () => {
    const module = await Test.createTestingModule({ controllers: [AdminAlbumsController], providers: [
      { provide: AdminAlbumsService, useValue: service }, { provide: PrismaService, useValue: { adminUser, revokedAccessToken: { findUnique: async () => null } } },
      { provide: SecurityService, useValue: { consume: async () => undefined } }, { provide: JwtService, useValue: jwt }, JwtAuthGuard, RolesGuard,
    ] }).compile();
    app = module.createNestApplication({ logger: false });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.listen(0, '127.0.0.1'); base = await app.getUrl();
  });
  beforeEach(() => {
    jest.resetAllMocks(); jwt.verifyAsync.mockResolvedValue({ sub: 'owner', role: 'ADMIN', iat: Math.floor(Date.now()/1000), exp: Math.floor(Date.now()/1000)+900 });
    adminUser.findUnique.mockResolvedValue({ id: 'owner', role: 'ADMIN', isActive: true });
    Object.values(service).forEach((method) => method.mockResolvedValue({ ok: true }));
  });
  afterAll(async () => app.close());
  function request(method: string, path: string, body: object, auth = true) {
    return fetch(`${base}/api/admin/albums${path}`, { method, headers: { 'Content-Type': 'application/json',
      ...(auth ? { Authorization: 'Bearer unit-test' } : {}) }, ...(method !== 'GET' ? { body: JSON.stringify(body) } : {}) });
  }
  it.each(routes)('requires JWT for %s %s', async (method, path, body) => {
    expect((await request(method, path, body, false)).status).toBe(401);
  });
  it.each(routes)('requires administrator role for %s %s', async (method, path, body) => {
    adminUser.findUnique.mockResolvedValue({ id: 'owner', role: 'VIEWER', isActive: true });
    expect((await request(method, path, body)).status).toBe(403);
  });
  it.each(routes)('allows authorized access to %s %s', async (method, path, body) => {
    expect((await request(method, path, body)).status).toBe(method === 'POST' && path === '' ? 201 : 200);
  });
  it('passes the authenticated principal and supports SUPER_ADMIN', async () => {
    adminUser.findUnique.mockResolvedValue({ id: 'super', role: 'SUPER_ADMIN', isActive: true });
    expect((await request('POST', `/${id}/publish`, {})).status).toBe(200);
    expect(service.publish).toHaveBeenCalledWith(id, {}, expect.objectContaining({ id: 'super', role: 'SUPER_ADMIN' }));
  });
  it.each([
    ['PATCH', `/${id}`, { slug: '../private' }], ['PATCH', `/${id}`, { title: '  ' }],
    ['PATCH', `/${id}`, { title: null }], ['PATCH', `/${id}`, { slug: null }],
    ['PATCH', `/${id}`, { eventDate: '2026-02-30' }], ['PATCH', `/${id}`, { status: 'PUBLISHED' }],
    ['PUT', `/${id}/photos/order`, { photoIds: [photo, photo] }], ['PUT', `/${id}/cover`, { photoId: 'invalid' }],
    ['POST', `/${id}/publish`, { bucket: 'arbitrary' }], ['POST', `/${id}/publish`, { photoIds: [] }],
    ['POST', `/${id}/publish`, { photoIds: null }], ['POST', `/${id}/publish`, { photoIds: ['../key'] }],
    ['POST', '', { title: 'Album', slug: 'valid', createdById: 'another' }], ['GET', '/invalid', {}],
  ] as Array<[string, string, object]>)('rejects malformed input for %s %s: %j', async (method, path, body) => {
    expect((await request(method, path, body)).status).toBe(400);
  });
});
