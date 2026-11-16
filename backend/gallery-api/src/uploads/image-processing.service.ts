import { ConflictException, ForbiddenException, HttpException, Injectable, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { StagingStorageService } from './staging-storage.service';
import { SharpImageService } from './sharp-image.service';
import { MAX_UPLOAD_BYTES } from './dto/create-upload.dto';
import type { UploadAdmin } from './uploads.service';

@Injectable()
export class ImageProcessingService {
  private active = false;
  private readonly logger = new Logger(ImageProcessingService.name);
  constructor(private readonly prisma: PrismaService, private readonly storage: StagingStorageService,
    private readonly images: SharpImageService) {}

  async process(photoId: string, admin: UploadAdmin) {
    // No unbounded queue of compressed images or native decoding work in memory.
    if (this.active) throw new ServiceUnavailableException('Image processor is busy; retry shortly');
    this.active = true;
    try {
      const outcome = await this.prisma.$transaction(async (tx) => {
        const [lock] = await tx.$queryRaw<Array<{ locked: boolean }>>`
          SELECT pg_try_advisory_xact_lock(hashtextextended(${photoId}, 0)) AS locked`;
        if (!lock?.locked) throw new ConflictException('Photo is already being processed');
        const initial = await tx.photo.findUnique({ where: { id: photoId } });
        if (!initial) throw new NotFoundException('Photo not found');
        // Same album-first row-lock order used by upload completion. These locks
        // protect eligibility and the photo until outputs and metadata are ready.
        await tx.$queryRaw`SELECT "id" FROM "Album" WHERE "id" = ${initial.albumId} FOR UPDATE`;
        await tx.$queryRaw`SELECT "id" FROM "Photo" WHERE "id" = ${photoId} FOR UPDATE`;
        const photo = await tx.photo.findUnique({ where: { id: photoId }, include: { album: true } });
        if (!photo) throw new NotFoundException('Photo not found');
        if (admin.role !== 'SUPER_ADMIN' && photo.album.createdById !== admin.id) {
          throw new ForbiddenException('This album is managed by another administrator');
        }
        if (photo.album.status !== 'DRAFT') throw new ConflictException('Only draft albums can be processed');
        const result = () => ({ photoId, status: 'PROCESSED', width: photo.width, height: photo.height });
        if (photo.status === 'PROCESSED') {
          if (!photo.processedKey || !photo.thumbnailKey) throw new ConflictException('Processed outputs are unavailable');
          return { result: result(), error: null };
        }
        if (!['UPLOADED', 'FAILED'].includes(photo.status)) throw new ConflictException('Complete the upload before processing');
        const extensions: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
        const attemptedKeys: string[] = [];
        try {
          if (!extensions[photo.mimeType] || photo.s3Key !== `uploads/${photo.albumId}/${photo.id}.${extensions[photo.mimeType]}` ||
              !photo.sizeBytes || photo.sizeBytes > MAX_UPLOAD_BYTES) {
            throw new ConflictException('Photo does not have an eligible verified source');
          }
          const source = await this.storage.readSource(photo.s3Key, photo.sizeBytes, photo.mimeType);
          const { full, thumbnail } = await this.images.render(source, photo.mimeType);
          const prefix = `processed/${photo.albumId}/${photo.id}/${randomUUID()}`;
          const processedKey = `${prefix}/full.webp`;
          const thumbnailKey = `${prefix}/thumbnail.webp`;
          // Include attempted writes: S3 may store an object before a connection fails.
          attemptedKeys.push(processedKey);
          await this.storage.writeProcessed(processedKey, full.data);
          attemptedKeys.push(thumbnailKey);
          await this.storage.writeProcessed(thumbnailKey, thumbnail.data);
          await tx.photo.update({ where: { id: photoId }, data: {
            status: 'PROCESSED', processedKey, thumbnailKey,
            processedSizeBytes: full.data.length, thumbnailSizeBytes: thumbnail.data.length,
            width: full.info.width, height: full.info.height, processedAt: new Date(), processingError: null,
          } });
          return { result: { photoId, status: 'PROCESSED', width: full.info.width, height: full.info.height }, error: null };
        } catch (error) {
          if (attemptedKeys.length) {
            let cleaned = false;
            try { cleaned = await this.storage.cleanupProcessed(attemptedKeys); } catch { /* Record FAILED even if cleanup is unavailable. */ }
            if (!cleaned) this.logger.warn('Some incomplete image outputs require operator cleanup');
          }
          const safeError = error instanceof HttpException ? error : new ServiceUnavailableException('Image processing could not be completed');
          const code = safeError.getStatus() === 413 ? 'SOURCE_LIMIT_EXCEEDED' :
            safeError.getStatus() === 422 ? 'INVALID_IMAGE' : 'PROCESSING_FAILED';
          await tx.photo.update({ where: { id: photoId }, data: {
            status: 'FAILED', processingError: code, processedKey: null, thumbnailKey: null,
            processedSizeBytes: null, thumbnailSizeBytes: null, processedAt: null,
          } });
          // Return the error so FAILED commits before the HTTP error is raised.
          return { result: null, error: safeError };
        }
      }, { maxWait: 5_000, timeout: 120_000 });
      if (outcome.error) throw outcome.error;
      return outcome.result;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      // A failed/ambiguous DB commit must not trigger deletion of outputs that
      // may already be referenced by a committed PROCESSED record.
      throw new ServiceUnavailableException('Image processing could not be completed; retry later');
    } finally {
      this.active = false;
    }
  }
}
