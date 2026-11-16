
import {
  Injectable,
  UnauthorizedException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { randomUUID, randomBytes } from 'node:crypto';
import { SecurityService, tokenHash } from './security.service';

@Injectable()
export class AuthService {
  private dummyHash?: Promise<string>;
  private verifying = 0;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly security: SecurityService,
  ) {}

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();
    await this.security.consume('login', email, 8, 900);
    if (this.verifying >= 2) throw new ServiceUnavailableException('Authentication is temporarily busy');
    this.verifying++;
    try {
      // Unknown and disabled accounts still perform Argon2 verification.
      this.dummyHash ??= argon2.hash(randomBytes(32));
      const dummy = await this.dummyHash;
  
      const admin = await this.prisma.adminUser.findUnique({
        where: { email },
      });
  
      const passwordValid = await argon2.verify(
        admin?.passwordHash ?? dummy,
        dto.password,
      );
  
      if (!passwordValid || !admin?.isActive) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const accessToken = await this.jwtService.signAsync({
        sub: admin.id,
        role: admin.role,
      }, { jwtid: randomUUID() });
  
      return {
        accessToken,
        tokenType: 'Bearer',
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
        },
      };
    } finally { this.verifying--; }
  }

  async logout(token: string) {
    const payload = this.jwtService.decode<{ exp: number }>(token);
    await this.prisma.revokedAccessToken.upsert({
      where: { tokenHash: tokenHash(token) },
      create: { tokenHash: tokenHash(token), expiresAt: new Date(payload.exp * 1000) },
      update: {},
    });
    return { ok: true };
  }
}
