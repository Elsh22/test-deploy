import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import type { Response, Request } from 'express';
import { randomUUID } from 'node:crypto';

@Catch()
export class SecurityExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('GalleryRequest');
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const parserError = exception as { type?: string } | null;
    const parserStatus = parserError?.type === 'entity.too.large' ? 413 : parserError?.type === 'entity.parse.failed' ? 400 : null;
    const status = exception instanceof HttpException ? exception.getStatus() : parserStatus ?? 500;
    const requestId = randomUUID();
    const body = exception instanceof HttpException ? exception.getResponse() : null;
    if (status === 429) response.setHeader('Retry-After', String(typeof body === 'object' && body && 'retryAfter' in body ? body.retryAfter : 60));
    // Never log request bodies, tokens, SQL, AWS errors, object keys, or credentials.
    if (status >= 500) this.logger.error(`request=${requestId} status=${status}`);
    response.status(status).json({ statusCode: status, message: parserStatus ? 'Send a valid JSON body within 32 KiB' : status >= 500 ? 'Gallery service is temporarily unavailable' :
      typeof body === 'object' && body && 'message' in body ? body.message : typeof body === 'string' ? body : 'Request rejected', requestId });
  }
}

export function securityHeaders(_request: Request, response: Response, next: () => void) {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('Cache-Control', 'no-store');
  next();
}
