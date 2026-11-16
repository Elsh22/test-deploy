import { Injectable, OnModuleDestroy, ServiceUnavailableException, ConflictException, HttpException, PayloadTooLargeException, UnprocessableEntityException } from '@nestjs/common';
import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { Readable } from 'node:stream';
import { MAX_UPLOAD_BYTES } from './dto/create-upload.dto';

export const STAGING_BUCKET = 'dmc-gallery-staging-2026';
export const UPLOAD_EXPIRY_SECONDS = 300;

@Injectable()
export class StagingStorageService implements OnModuleDestroy {
  private readonly client = new S3Client({
    region: 'us-east-2',
    requestChecksumCalculation: 'WHEN_REQUIRED',
  });

  async presign(key: string, mimeType: string) {
    try {
      return await getSignedUrl(this.client, new PutObjectCommand({
        Bucket: STAGING_BUCKET,
        Key: key,
        ContentType: mimeType,
        IfNoneMatch: '*',
      }), {
        expiresIn: UPLOAD_EXPIRY_SECONDS,
        signableHeaders: new Set(['content-type', 'if-none-match']),
      });
    } catch {
      throw new ServiceUnavailableException('Upload signing is temporarily unavailable');
    }
  }

  async head(key: string) {
    try {
      return await this.client.send(new HeadObjectCommand({ Bucket: STAGING_BUCKET, Key: key }));
    } catch (error: unknown) {
      const awsError = error as { name?: string; $metadata?: { httpStatusCode?: number } };
      if (awsError.$metadata?.httpStatusCode === 404 || ['NotFound', 'NoSuchKey'].includes(awsError.name ?? '')) {
        throw new ConflictException('Upload not found; upload the file before completing');
      }
      throw new ServiceUnavailableException('Upload verification is temporarily unavailable');
    }
  }

  onModuleDestroy() {
    this.client.destroy();
  }

  async readSource(key: string, expectedSize: number, expectedMime: string): Promise<Buffer> {
    let stream: Readable | undefined;
    let downloadTimer: NodeJS.Timeout | undefined;
    try {
      const object = await this.client.send(new GetObjectCommand({ Bucket: STAGING_BUCKET, Key: key }),
        { abortSignal: AbortSignal.timeout(15_000) });
      stream = object.Body as Readable | undefined;
      if (stream) downloadTimer = setTimeout(() => stream?.destroy(new Error('Source download timed out')), 15_000);
      if ((object.ContentLength ?? 0) > MAX_UPLOAD_BYTES) throw new PayloadTooLargeException('Source image exceeds the permitted byte limit');
      if (!stream || object.ContentLength !== expectedSize || object.ContentType !== expectedMime) {
        throw new UnprocessableEntityException('Source image no longer matches its verified upload');
      }
      const chunks: Buffer[] = [];
      let size = 0;
      for await (const chunk of stream) {
        const buffer = Buffer.from(chunk as Uint8Array);
        size += buffer.length;
        if (size > MAX_UPLOAD_BYTES) throw new PayloadTooLargeException('Source image exceeds the permitted byte limit');
        chunks.push(buffer);
      }
      if (size !== expectedSize || size === 0) throw new UnprocessableEntityException('Source image is incomplete');
      return Buffer.concat(chunks, size);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new ServiceUnavailableException('Source image could not be retrieved');
    } finally {
      clearTimeout(downloadTimer);
      stream?.destroy();
    }
  }

  async writeProcessed(key: string, body: Buffer) {
    try {
      await this.client.send(new PutObjectCommand({ Bucket: STAGING_BUCKET, Key: key,
        Body: body, ContentType: 'image/webp', IfNoneMatch: '*', CacheControl: 'private, no-store' }),
      { abortSignal: AbortSignal.timeout(15_000) });
    } catch {
      throw new ServiceUnavailableException('Processed image could not be stored');
    }
  }

  async cleanupProcessed(keys: string[]): Promise<boolean> {
    const results = await Promise.allSettled(keys.map(async (Key) => this.client.send(
      new DeleteObjectCommand({ Bucket: STAGING_BUCKET, Key }), { abortSignal: AbortSignal.timeout(10_000) },
    )));
    return results.every((result) => result.status === 'fulfilled');
  }
}
