import { Test } from '@nestjs/testing';
import { JwtModule, JwtService, type JwtSignOptions } from '@nestjs/jwt';
import { INestApplication } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminController } from '../admin/admin.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SecurityService, tokenHash } from './security.service';
import * as argon2 from 'argon2';

describe('Authentication security HTTP integration (real signed JWTs)', () => {
  let app: INestApplication, base: string, jwt: JwtService;
  let revoked: Set<string>;
  const admin = { id: 'owner', email: 'admin@example.test', role: 'ADMIN', isActive: true };
  const prisma = { adminUser: { findUnique: jest.fn() }, revokedAccessToken: {
    findUnique: jest.fn(), upsert: jest.fn(),
  }, $queryRaw: jest.fn() };
  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [JwtModule.register({
      secret: 'unit-test-secret-with-at-least-32-bytes', signOptions: {
        issuer: 'dmc-gallery-api', audience: 'dmc-gallery-admin', expiresIn: '15m',
      },
    })], controllers: [AuthController, AdminController], providers: [AuthService, SecurityService,
      { provide: PrismaService, useValue: prisma },
    ] }).compile();
    app = module.createNestApplication({ logger: false });
    await app.listen(0, '127.0.0.1'); base = await app.getUrl(); jwt = module.get(JwtService);
  });
  beforeEach(() => {
    jest.clearAllMocks(); revoked = new Set();
    prisma.adminUser.findUnique.mockResolvedValue(admin);
    prisma.revokedAccessToken.findUnique.mockImplementation(async ({ where }) => revoked.has(where.tokenHash) ? {} : null);
    prisma.revokedAccessToken.upsert.mockImplementation(async ({ create }) => { revoked.add(create.tokenHash); return create; });
    prisma.$queryRaw.mockResolvedValue([{ count: 1 }]);
  });
  afterAll(async () => app.close());
  const get = (token?: string) => fetch(`${base}/api/admin/me`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  it('requires authentication and accepts a valid signed, bounded token', async () => {
    expect((await get()).status).toBe(401);
    expect((await get(jwt.sign({ sub: admin.id }))).status).toBe(200);
  });
  it.each([
    { audience: 'other' }, { issuer: 'other' }, { expiresIn: '-1s' }, { expiresIn: '1h' },
  ])('rejects wrong claims: %j', async options => {
    expect((await get(jwt.sign({ sub: admin.id }, options as JwtSignOptions))).status).toBe(401);
  });
  it('rejects signatures from another secret, missing expiry, and missing issued-at', async () => {
    expect((await get(jwt.sign({ sub: admin.id }, { secret: 'wrong' }))).status).toBe(401);
    const raw = new JwtService({ secret: 'unit-test-secret-with-at-least-32-bytes' });
    expect((await get(raw.sign({ sub: admin.id }, { issuer: 'dmc-gallery-api', audience: 'dmc-gallery-admin' }))).status).toBe(401);
    expect((await get(jwt.sign({ sub: admin.id }, { noTimestamp: true }))).status).toBe(401);
  });
  it('revokes logout tokens across subsequent requests, storing only a SHA256 digest', async () => {
    const token = jwt.sign({ sub: admin.id });
    expect((await get(token)).status).toBe(200);
    expect((await fetch(`${base}/api/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })).status).toBe(200);
    expect(revoked.has(tokenHash(token))).toBe(true); expect(revoked.has(token)).toBe(false);
    expect((await get(token)).status).toBe(401);
  });
  it('uses database roles and active state instead of signed stale privileges', async () => {
    prisma.adminUser.findUnique.mockResolvedValue({ ...admin, role: 'VIEWER' });
    expect((await get(jwt.sign({ sub: admin.id, role: 'SUPER_ADMIN' }))).status).toBe(403);
    prisma.adminUser.findUnique.mockResolvedValue({ ...admin, isActive: false });
    expect((await get(jwt.sign({ sub: admin.id }))).status).toBe(401);
  });
  it('requires administrator authorization on logout and permits logout after quota exhaustion', async () => {
    expect((await fetch(`${base}/api/auth/logout`, { method: 'POST' })).status).toBe(401);
    const token = jwt.sign({ sub: admin.id });
    prisma.adminUser.findUnique.mockResolvedValueOnce({ ...admin, role: 'VIEWER' });
    expect((await fetch(`${base}/api/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })).status).toBe(403);
    prisma.$queryRaw.mockResolvedValue([{ count: 999 }]);
    expect((await fetch(`${base}/api/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })).status).toBe(200);
    expect(revoked.has(tokenHash(token))).toBe(true);
  });
  it('fails closed when revocation storage is unavailable', async () => {
    prisma.revokedAccessToken.findUnique.mockRejectedValueOnce(new Error('private postgres credentials'));
    const response = await get(jwt.sign({ sub: admin.id }));
    expect(response.status).toBe(503); expect(await response.text()).not.toContain('postgres');
  });
  it('enforces the login attempt quota before password hashing or user lookup', async () => {
    prisma.$queryRaw.mockResolvedValueOnce([{ count: 9 }]);
    const response = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: admin.email, password: 'wrong-password' }) });
    expect(response.status).toBe(429); expect(prisma.adminUser.findUnique).not.toHaveBeenCalled();
  });
  it('assigns a unique JWT id to each successful login', async () => {
    const hash = await argon2.hash('unit-test-password');
    prisma.adminUser.findUnique.mockResolvedValue({ ...admin, passwordHash: hash });
    const login = async () => {
      const response = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: admin.email, password: 'unit-test-password' }) });
      expect(response.status).toBe(200); return (await response.json() as { accessToken: string }).accessToken;
    };
    const first = await login(), second = await login();
    expect(first).not.toBe(second); expect(jwt.decode(first).jti).not.toBe(jwt.decode(second).jti);
  });
});

describe('Distributed rate limiter', () => {
  it('uses bound values and fails closed when the database cannot count attempts', async () => {
    const prisma = { $queryRaw: jest.fn().mockResolvedValue([{ count: 9 }]) };
    const service = new SecurityService(prisma as unknown as PrismaService);
    await expect(service.consume('login', "a' OR 1=1", 8, 900)).rejects.toMatchObject({ status: 429 });
    expect(prisma.$queryRaw.mock.calls[0][1]).toMatch(/^[a-f0-9]{64}$/);
    prisma.$queryRaw.mockRejectedValueOnce(new Error('SQL secrets'));
    await expect(service.consume('login', 'a', 8, 900)).rejects.toMatchObject({ status: 503 });
  });
});
