import { ConflictException, Injectable, OnModuleDestroy, ServiceUnavailableException } from '@nestjs/common';
import { CopyObjectCommand, DeleteObjectCommand, HeadObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const PUBLISHED_BUCKET = 'dmc-website-gallery-2026';
export const PRIVATE_BUCKET = 'dmc-gallery-staging-2026';

@Injectable()
export class PublicationStorageService implements OnModuleDestroy {
  private readonly client = new S3Client({ region: 'us-east-2' });

  async source(key: string, size: number) {
    try {
      const object = await this.client.send(new HeadObjectCommand({ Bucket: PRIVATE_BUCKET, Key: key }),
        { abortSignal: AbortSignal.timeout(15_000) });
      if (object.ContentType !== 'image/webp' || object.ContentLength !== size || size < 1 || !object.ETag) {
        throw new ConflictException('Optimized image metadata does not match the processed record');
      }
      return object.ETag;
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      if ((error as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode === 404) {
        throw new ConflictException('A required optimized image is missing');
      }
      throw new ServiceUnavailableException('Optimized image verification is unavailable');
    }
  }

  async transfer(source: string, destination: string, size: number, etag: string) {
    try {
      const copied = await this.client.send(new CopyObjectCommand({ Bucket: PUBLISHED_BUCKET, Key: destination,
        CopySource: `${PRIVATE_BUCKET}/${source.split('/').map(encodeURIComponent).join('/')}`,
        CopySourceIfMatch: etag, MetadataDirective: 'REPLACE', TaggingDirective: 'REPLACE',
        ContentType: 'image/webp', CacheControl: 'public, max-age=31536000, immutable',
      }), { abortSignal: AbortSignal.timeout(15_000) });
      if (!copied.CopyObjectResult?.ETag) throw new Error('Copy not confirmed');
      const verified = await this.client.send(new HeadObjectCommand({ Bucket: PUBLISHED_BUCKET, Key: destination,
        IfMatch: copied.CopyObjectResult.ETag }), { abortSignal: AbortSignal.timeout(15_000) });
      if (verified.ContentLength !== size || verified.ContentType !== 'image/webp') throw new Error('Destination not verified');
    } catch {
      throw new ServiceUnavailableException('Publication transfer could not be verified');
    }
  }

  async cleanup(keys: string[]) {
    const results = await Promise.allSettled(keys.map(async (Key) => this.client.send(
      new DeleteObjectCommand({ Bucket: PUBLISHED_BUCKET, Key }), { abortSignal: AbortSignal.timeout(10_000) },
    )));
    return results.every((result) => result.status === 'fulfilled');
  }

  onModuleDestroy() { this.client.destroy(); }
}
