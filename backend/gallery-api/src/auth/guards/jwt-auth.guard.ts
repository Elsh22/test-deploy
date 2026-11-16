
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';
import { SecurityService, tokenHash } from '../security.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly security: SecurityService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<
      Request & { admin?: any }
    >();

    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authentication required',
      );
    }

    const token = authorization.slice(7);
    let payload: { sub: string; exp: number; iat: number };
    try {
      if (token.length > 8192) throw new Error('Invalid token');
      payload = await this.jwtService.verifyAsync(token, {
        issuer: 'dmc-gallery-api',
        audience: 'dmc-gallery-admin',
        algorithms: ['HS256'],
      });

      const now = Math.floor(Date.now() / 1000);
      if (typeof payload.sub !== 'string' || !payload.sub || payload.sub.length > 100 ||
          !Number.isSafeInteger(payload.exp) || !Number.isSafeInteger(payload.iat) ||
          payload.exp <= now || payload.iat > now || payload.exp <= payload.iat || payload.exp - payload.iat > 900) {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
    let admin;
    try {
      const revoked = await this.prisma.revokedAccessToken.findUnique({ where: { tokenHash: tokenHash(token) } });
      if (revoked) throw new UnauthorizedException('Invalid or expired access token');
      admin = await this.prisma.adminUser.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
        },
      });

    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new ServiceUnavailableException('Authentication is temporarily unavailable');
    }
    if (!admin?.isActive) throw new UnauthorizedException('Invalid or expired access token');
    // Bound expensive operations independently; authenticated reads have a separate quota.
    const action = request.method === 'GET' ? 'read' :
      /\/process\/?$/.test(request.path) ? 'process' : /\/publish\/?$/.test(request.path) ? 'publish' : 'write';
    // Logout must remain available after an administrator exhausts a work quota.
    if (request.path !== '/api/auth/logout' && request.path !== '/api/auth/logout/') {
      await this.security.consume(`admin-${action}`, admin.id, { read: 180, process: 30, publish: 4, write: 120 }[action], 60);
    }
    request.admin = admin;
    return true;
  }
}
