import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from './security.service';
import * as argon2 from 'argon2';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        { provide: SecurityService, useValue: { consume: jest.fn() } },
        { provide: PrismaService, useValue: { adminUser: { findUnique: jest.fn() } } },
        { provide: JwtService, useValue: { signAsync: jest.fn() } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('uses the same credential failure for missing, disabled, and incorrect-password accounts', async () => {
    const passwordHash = await argon2.hash('unit-test-password');
    for (const account of [null, { id: 'owner', isActive: false, passwordHash }, { id: 'owner', isActive: true, passwordHash }]) {
      const prisma = { adminUser: { findUnique: jest.fn().mockResolvedValue(account) } };
      const signAsync = jest.fn();
      const auth = new AuthService(prisma as unknown as PrismaService, { signAsync } as unknown as JwtService,
        { consume: async () => undefined } as unknown as SecurityService);
      await expect(auth.login({ email: 'unit@example.test', password: 'incorrect-password' })).rejects.toMatchObject({
        status: 401, message: 'Invalid credentials',
      });
      expect(signAsync).not.toHaveBeenCalled();
    }
  });
});
