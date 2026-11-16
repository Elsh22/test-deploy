import { BadRequestException, ConflictException, ForbiddenException, HttpException, Injectable, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { PublishAlbumDto, UpdateAlbumDto } from './dto/manage-album.dto';
import { PublicationStorageService } from './publication-storage.service';
import { isProcessedImageKey, publishedImageUrl } from '../albums/published-images';
import type { UploadAdmin } from '../uploads/uploads.service';

type AlbumWithPhotos = Prisma.AlbumGetPayload<{ include: { photos: true } }>;
const photosInclude = { photos: { orderBy: [{ sortOrder: 'asc' as const }, { id: 'asc' as const }] } };

@Injectable()
export class AdminAlbumsService {
  private publishing = false;
  private readonly logger = new Logger(AdminAlbumsService.name);
  constructor(private readonly prisma: PrismaService, private readonly storage: PublicationStorageService) {}

  private authorize(album: AlbumWithPhotos | null, admin: UploadAdmin): asserts album is AlbumWithPhotos {
    if (!album) throw new NotFoundException('Album not found');
    if (admin.role !== 'SUPER_ADMIN' && album.createdById !== admin.id) throw new ForbiddenException('This album is managed by another administrator');
  }

  private view(album: AlbumWithPhotos) {
    return {
      id: album.id, title: album.title, slug: album.slug, description: album.description,
      eventDate: album.eventDate, status: album.status, createdById: album.createdById,
      createdAt: album.createdAt, updatedAt: album.updatedAt, publishedAt: album.publishedAt,
      photos: album.photos.map((photo) => ({
        id: photo.id, filename: photo.filename, mimeType: photo.mimeType, status: photo.status,
        sizeBytes: photo.sizeBytes, uploadRequestId: photo.uploadRequestId,
        width: photo.width, height: photo.height, sortOrder: photo.sortOrder, isCover: photo.isCover,
        processingError: photo.processingError,
        imageUrl: album.status === 'DRAFT' ? null : publishedImageUrl(photo.publishedKey, album.id, photo.id, 'full'),
        thumbnailUrl: album.status === 'DRAFT' ? null : publishedImageUrl(photo.publishedThumbnailKey, album.id, photo.id, 'thumbnail'),
      })),
    };
  }

  private failure(error: unknown): never {
    if (error instanceof HttpException) throw error;
    if ((error as { code?: string })?.code === 'P2002') throw new ConflictException('An album with this slug already exists');
    throw new ServiceUnavailableException('Album operation could not be completed; retry later');
  }

  private async change<T>(albumId: string, admin: UploadAdmin,
    work: (tx: Prisma.TransactionClient, album: AlbumWithPhotos) => Promise<T>): Promise<T> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const [lock] = await tx.$queryRaw<Array<{ locked: boolean }>>`
          SELECT pg_try_advisory_xact_lock(hashtextextended(${'album:' + albumId}, 0)) AS locked`;
        if (!lock?.locked) throw new ConflictException('Album is being modified; retry shortly');
        await tx.$queryRaw`SELECT "id" FROM "Album" WHERE "id" = ${albumId} FOR UPDATE`;
        const album = await tx.album.findUnique({ where: { id: albumId }, include: photosInclude });
        this.authorize(album, admin);
        return work(tx, album);
      }, { maxWait: 5_000, timeout: 180_000 });
    } catch (error) { this.failure(error); }
  }

  async create(dto: CreateAlbumDto, adminId: string) {
    try {
      return this.view(await this.prisma.album.create({ data: {
        title: dto.title.trim(), slug: dto.slug, description: dto.description,
        eventDate: dto.eventDate ? new Date(dto.eventDate) : null, status: 'DRAFT', createdById: adminId,
      }, include: photosInclude }));
    } catch (error) { this.failure(error); }
  }

  async findAll(admin: UploadAdmin) {
    const albums = await this.prisma.album.findMany({ where: admin.role === 'SUPER_ADMIN' ? {} : { createdById: admin.id },
      include: photosInclude, orderBy: { createdAt: 'desc' } });
    return albums.map((album) => this.view(album));
  }

  async findOne(albumId: string, admin: UploadAdmin) {
    const album = await this.prisma.album.findUnique({ where: { id: albumId }, include: photosInclude });
    this.authorize(album, admin);
    return this.view(album);
  }

  async update(albumId: string, dto: UpdateAlbumDto, admin: UploadAdmin) {
    if (!Object.values(dto).some((value) => value !== undefined)) throw new BadRequestException('Supply at least one album field');
    return this.change(albumId, admin, async (tx, album) => {
      if (album.status === 'ARCHIVED') throw new ConflictException('Archived albums are read-only');
      if (dto.slug !== undefined && dto.slug !== album.slug && album.status !== 'DRAFT') throw new ConflictException('Only draft album slugs may change');
      return this.view(await tx.album.update({ where: { id: albumId }, data: {
        ...(dto.title !== undefined ? { title: dto.title.trim() } : {}),
        ...(dto.slug !== undefined ? { slug: dto.slug } : {}),
        ...(dto.description !== undefined ? { description: dto.description } : {}),
        ...(dto.eventDate !== undefined ? { eventDate: dto.eventDate ? new Date(dto.eventDate) : null } : {}),
      }, include: photosInclude }));
    });
  }

  async reorder(albumId: string, photoIds: string[], admin: UploadAdmin) {
    return this.change(albumId, admin, async (tx, album) => {
      if (album.status === 'ARCHIVED') throw new ConflictException('Archived albums are read-only');
      if (!photoIds.length || new Set(photoIds).size !== photoIds.length || photoIds.length !== album.photos.length ||
          photoIds.some((id) => !album.photos.some((photo) => photo.id === id))) {
        throw new BadRequestException('Photo order must include every album photograph exactly once');
      }
      for (const [sortOrder, id] of photoIds.entries()) await tx.photo.update({ where: { id }, data: { sortOrder } });
      return { albumId, photoIds };
    });
  }

  async cover(albumId: string, photoId: string, admin: UploadAdmin) {
    return this.change(albumId, admin, async (tx, album) => {
      if (album.status === 'ARCHIVED') throw new ConflictException('Archived albums are read-only');
      const photo = album.photos.find((item) => item.id === photoId);
      if (!photo || photo.status !== 'PROCESSED' || (album.status === 'PUBLISHED' &&
          (!publishedImageUrl(photo.publishedKey, albumId, photoId, 'full') || !publishedImageUrl(photo.publishedThumbnailKey, albumId, photoId, 'thumbnail')))) {
        throw new BadRequestException('Cover must be a processed photograph included in this album publication');
      }
      await tx.photo.updateMany({ where: { albumId }, data: { isCover: false } });
      await tx.photo.update({ where: { id: photoId }, data: { isCover: true } });
      return { albumId, coverPhotoId: photoId };
    });
  }

  async publish(albumId: string, dto: PublishAlbumDto, admin: UploadAdmin) {
    if (this.publishing) throw new ServiceUnavailableException('Publisher is busy; retry shortly');
    this.publishing = true;
    try {
      return await this.change(albumId, admin, async (tx, album) => {
        if (album.status === 'PUBLISHED') {
          const published = album.photos.filter((photo) => photo.publishedKey && photo.publishedThumbnailKey);
          if (!album.publishedAt || !published.length || album.photos.filter((photo) => photo.isCover).length !== 1 ||
              published.filter((photo) => photo.isCover).length !== 1 ||
              album.photos.some((photo) => Boolean(photo.publishedKey) !== Boolean(photo.publishedThumbnailKey)) ||
              published.some((photo) => photo.status !== 'PROCESSED' ||
                !publishedImageUrl(photo.publishedKey, albumId, photo.id, 'full') ||
                !publishedImageUrl(photo.publishedThumbnailKey, albumId, photo.id, 'thumbnail') ||
                photo.publishedKey!.split('/')[2] !== photo.publishedThumbnailKey!.split('/')[2])) {
            throw new ConflictException('Existing publication metadata is incomplete');
          }
          const ids = published.map((photo) => photo.id);
          if (dto.photoIds && (dto.photoIds.length !== ids.length || dto.photoIds.some((id) => !ids.includes(id)))) {
            throw new ConflictException('This album was already published with a different selection');
          }
          return this.view(album);
        }
        if (album.status !== 'DRAFT') throw new ConflictException('Only draft albums can be published');
        if (album.title.trim().length < 3 || album.title.length > 150 || album.slug.length > 120 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(album.slug)) {
          throw new ConflictException('Album metadata is not valid for publication');
        }
        const ids = dto.photoIds ?? album.photos.map((photo) => photo.id);
        if (!ids.length || ids.length > 100 || new Set(ids).size !== ids.length) throw new BadRequestException('Select between one and 100 unique photographs');
        const selected = album.photos.filter((photo) => ids.includes(photo.id));
        if (selected.length !== ids.length) throw new BadRequestException('Publication selection contains unrelated photographs');
        if (album.photos.filter((photo) => photo.isCover).length !== 1 || selected.filter((photo) => photo.isCover).length !== 1) {
          throw new ConflictException('Select exactly one valid cover photograph before publishing');
        }
        for (const photo of selected) {
          if (photo.status !== 'PROCESSED' || !isProcessedImageKey(photo.processedKey, album.id, photo.id, 'full') ||
              !isProcessedImageKey(photo.thumbnailKey, album.id, photo.id, 'thumbnail') ||
              photo.processedKey!.split('/')[3] !== photo.thumbnailKey!.split('/')[3] ||
              !photo.processedSizeBytes || photo.processedSizeBytes < 1 || !photo.thumbnailSizeBytes || photo.thumbnailSizeBytes < 1 ||
              !photo.width || photo.width < 1 || !photo.height || photo.height < 1) {
            throw new ConflictException('Every selected photograph must have complete optimized image metadata');
          }
        }
        const prefix = `Events/${album.id}/${randomUUID()}`;
        const deadline = Date.now() + 120_000;
        const checkDeadline = () => { if (Date.now() > deadline) throw new ServiceUnavailableException('Publication deadline exceeded; retry later'); };
        const objects = selected.flatMap((photo) => [
          { photoId: photo.id, source: photo.processedKey!, key: `${prefix}/${photo.id}/full.webp`, size: photo.processedSizeBytes! },
          { photoId: photo.id, source: photo.thumbnailKey!, key: `${prefix}/${photo.id}/thumbnail.webp`, size: photo.thumbnailSizeBytes! },
        ]);
        const attempted: string[] = [];
        try {
          // Verify every source before exposing any copied object in the origin.
          const sources: Array<{ source: string; key: string; size: number; etag: string }> = [];
          for (const object of objects) {
            checkDeadline();
            sources.push({ ...object, etag: await this.storage.source(object.source, object.size) });
          }
          for (const object of sources) {
            checkDeadline();
            attempted.push(object.key);
            await this.storage.transfer(object.source, object.key, object.size, object.etag);
          }
          await tx.photo.updateMany({ where: { albumId }, data: { publishedKey: null, publishedThumbnailKey: null } });
          for (const photo of selected) {
            await tx.photo.update({ where: { id: photo.id }, data: {
              publishedKey: `${prefix}/${photo.id}/full.webp`, publishedThumbnailKey: `${prefix}/${photo.id}/thumbnail.webp`,
            } });
          }
          return this.view(await tx.album.update({ where: { id: albumId }, data: { status: 'PUBLISHED', publishedAt: new Date() }, include: photosInclude }));
        } catch (error) {
          if (attempted.length) {
            let cleaned = false;
            try { cleaned = await this.storage.cleanup(attempted); } catch { /* Preserve the original failure. */ }
            if (!cleaned) this.logger.warn('Uncommitted publication objects may require operator cleanup');
          }
          throw error;
        }
      });
    } finally { this.publishing = false; }
  }

  async archive(albumId: string, admin: UploadAdmin) {
    return this.change(albumId, admin, async (tx, album) => {
      if (album.status === 'ARCHIVED') return this.view(album);
      if (album.status !== 'PUBLISHED') throw new ConflictException('Only published albums can be archived');
      return this.view(await tx.album.update({ where: { id: albumId }, data: { status: 'ARCHIVED' }, include: photosInclude }));
    });
  }
}
