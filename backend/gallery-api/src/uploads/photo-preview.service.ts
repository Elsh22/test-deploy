import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { isProcessedImageKey } from '../albums/published-images';
import { StagingStorageService } from './staging-storage.service';
import type { UploadAdmin } from './uploads.service';

@Injectable()
export class PhotoPreviewService {
  constructor(private readonly prisma: PrismaService, private readonly storage: StagingStorageService) {}
  async thumbnail(photoId: string, admin: UploadAdmin) {
    const photo = await this.prisma.photo.findUnique({ where: { id: photoId }, include: { album: true } });
    if (!photo) throw new NotFoundException('Photo not found');
    if (admin.role !== 'SUPER_ADMIN' && photo.album.createdById !== admin.id) throw new ForbiddenException('This album is managed by another administrator');
    if (photo.status !== 'PROCESSED' || !photo.thumbnailSizeBytes || photo.thumbnailSizeBytes < 1 ||
        !isProcessedImageKey(photo.thumbnailKey, photo.albumId, photo.id, 'thumbnail')) {
      throw new ConflictException('A processed thumbnail is not available');
    }
    return this.storage.readSource(photo.thumbnailKey!, photo.thumbnailSizeBytes, 'image/webp');
  }
}
