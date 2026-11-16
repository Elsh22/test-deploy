require('dotenv/config');
const { randomUUID } = require('node:crypto');
const { PrismaService } = require('../src/prisma/prisma.service');
const { SecurityService, tokenHash } = require('../src/auth/security.service');

// Opt in explicitly. Tests roll back ALL fixture writes; they never DELETE records.
const integration = process.env.GALLERY_SECURITY_DB_TEST === '1' ? describe : describe.skip;
integration('Security controls with local PostgreSQL (rollback-only)', () => {
  let prisma;
  beforeAll(() => {
    const url = new URL(process.env.DATABASE_URL);
    if (!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) throw new Error('Security DB tests require a loopback database');
    prisma = new PrismaService();
  });
  afterAll(async () => { if (prisma) await prisma.$disconnect(); });
  it('serializes competing rate increments, enforces quota, and leaves no fixture rows', async () => {
    const identity = randomUUID(), id = tokenHash(`audit-test:${identity}`);
    const rollback = new Error('ROLLBACK_AUDIT_FIXTURES');
    try {
      await prisma.$transaction(async tx => {
        const security = new SecurityService(tx);
        await Promise.all(Array.from({ length: 8 }, () => security.consume('audit-test', identity, 8, 900)));
        await expect(security.consume('audit-test', identity, 8, 900)).rejects.toMatchObject({ status: 429 });
        expect((await tx.securityRateBucket.findUnique({ where: { id } })).count).toBe(9);
        // Expired windows reset rather than continuing the previous count.
        await tx.securityRateBucket.update({ where: { id }, data: { windowStart: new Date(0) } });
        await security.consume('audit-test', identity, 8, 900);
        expect((await tx.securityRateBucket.findUnique({ where: { id } })).count).toBe(1);
        throw rollback;
      });
    } catch (error) { if (error !== rollback) throw error; }
    expect(await prisma.securityRateBucket.findUnique({ where: { id } })).toBeNull();
  });
  it.each(['album:', ''])('excludes another database session from advisory workflow lock %s', async prefix => {
    const key = prefix + randomUUID();
    await prisma.$transaction(async first => {
      const [held] = await first.$queryRaw`SELECT pg_try_advisory_xact_lock(hashtextextended(${key}, 0)) AS locked`;
      expect(held.locked).toBe(true);
      await prisma.$transaction(async second => {
        const [contended] = await second.$queryRaw`SELECT pg_try_advisory_xact_lock(hashtextextended(${key}, 0)) AS locked`;
        expect(contended.locked).toBe(false);
      });
    });
    await prisma.$transaction(async next => {
      const [released] = await next.$queryRaw`SELECT pg_try_advisory_xact_lock(hashtextextended(${key}, 0)) AS locked`;
      expect(released.locked).toBe(true);
    });
  });
});
