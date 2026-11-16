import { HttpException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';

export const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex');

@Injectable()
export class SecurityService {
  constructor(private readonly prisma: PrismaService) {}

  // PostgreSQL's single-statement upsert serializes concurrent callers across API instances.
  // Database time avoids application-clock differences. Never store emails or tokens here.
  async consume(scope: string, identity: string, limit: number, seconds: number) {
    const id = tokenHash(`${scope}:${identity}`);
    let rows: { count: number }[];
    try {
      rows = await this.prisma.$queryRaw<{ count: number }[]>`
        INSERT INTO "SecurityRateBucket" ("id", "windowStart", "count")
        VALUES (${id}, CURRENT_TIMESTAMP, 1)
        ON CONFLICT ("id") DO UPDATE SET
          "count" = CASE WHEN "SecurityRateBucket"."windowStart" <= CURRENT_TIMESTAMP - ${seconds} * INTERVAL '1 second'
            THEN 1 ELSE "SecurityRateBucket"."count" + 1 END,
          "windowStart" = CASE WHEN "SecurityRateBucket"."windowStart" <= CURRENT_TIMESTAMP - ${seconds} * INTERVAL '1 second'
            THEN CURRENT_TIMESTAMP ELSE "SecurityRateBucket"."windowStart" END
        RETURNING "count"`;
    } catch { throw new ServiceUnavailableException('Authentication is temporarily unavailable'); }
    if (rows[0].count > limit) {
      throw new HttpException({ statusCode: 429, message: 'Too many requests', retryAfter: seconds }, 429);
    }
  }
}
