const { Test } = require('@nestjs/testing');
const { ConfigService } = require('@nestjs/config');
const { json } = require('express');
const { ValidationPipe } = require('@nestjs/common');
const { AppModule } = require('../src/app.module');
const { PrismaService } = require('../src/prisma/prisma.service');
const { securityHeaders } = require('../src/security-http');

describe('API transport limits and error sanitization', () => {
  let app, base;
  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(ConfigService).useValue({ getOrThrow: () => 'unit-test-only-secret-with-at-least-32-bytes' })
      .overrideProvider(PrismaService).useValue({ $queryRaw: async () => [{ count: 9 }],
        album: { findMany: async () => { throw new Error('private SQL and password'); } } }).compile();
    app = module.createNestApplication({ logger: false, bodyParser: false });
    app.getHttpAdapter().getInstance().disable('x-powered-by');
    app.use(securityHeaders); app.use(json({ limit: '32kb', strict: true }));
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.listen(0, '127.0.0.1'); base = await app.getUrl();
  });
  afterAll(async () => app.close());
  it('returns anti-sniffing, anti-framing and private cache headers', async () => {
    const response = await fetch(base + '/health');
    expect(response.status).toBe(200); expect(response.headers.get('x-powered-by')).toBeNull();
    expect(response.headers.get('x-content-type-options')).toBe('nosniff');
    expect(response.headers.get('x-frame-options')).toBe('DENY'); expect(response.headers.get('cache-control')).toBe('no-store');
  });
  it.each([['{"password":"do-not-echo-secret"', 400], [JSON.stringify({ data: 'x'.repeat(33000) }), 413]])('rejects invalid/oversized JSON without echoing the body', async (body, status) => {
    const response = await fetch(base + '/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    expect(response.status).toBe(status); expect(await response.text()).not.toContain('do-not-echo-secret');
  });
  it('hides internal failures and returns a correlation id', async () => {
    const response = await fetch(base + '/api/albums'); const result = await response.json();
    expect(response.status).toBe(500); expect(result.requestId).toMatch(/^[a-f0-9-]{36}$/); expect(JSON.stringify(result)).not.toMatch(/private|password|SQL/);
  });
  it('bounds login input before accessing the database or hashing', async () => {
    const response = await fetch(base + '/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'unit@example.test', password: 'x'.repeat(1025) }) });
    expect(response.status).toBe(400);
  });
  it('returns an explicit retry interval for exhausted login quotas', async () => {
    const response = await fetch(base + '/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'unit@example.test', password: 'incorrect-password' }) });
    expect(response.status).toBe(429); expect(response.headers.get('retry-after')).toBe('900');
  });
});
