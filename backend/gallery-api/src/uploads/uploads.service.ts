import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, PayloadTooLargeException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import type { AdminRole } from '../generated/prisma/enums';
import type { Photo } from '../generated/prisma/client';
import { CreateUploadDto, MAX_UPLOAD_BYTES } from './dto/create-upload.dto';
import { StagingStorageService, UPLOAD_EXPIRY_SECONDS } from './staging-storage.service';

export type UploadAdmin = { id: string; role: AdminRole };
const extensions = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' } as const;

@Injectable()
export class UploadsService {
  constructor(private readonly prisma: PrismaService, private readonly storage: StagingStorageService) {}

  private authorize(album: { status: string; createdById: string } | null, admin: UploadAdmin) {
    if (!album) throw new NotFoundException('Album not found');
    if (admin.role !== 'SUPER_ADMIN' && album.createdById !== admin.id) {
      throw new ForbiddenException('This album is managed by another administrator');
    }
    if (album.status !== 'DRAFT') throw new ConflictException('Only draft albums accept uploads');
  }

  async create(albumId: string, dto: CreateUploadDto, admin: UploadAdmin) {
    const filenameExtension = dto.filename.split('.').pop()?.toLowerCase();
    const extension = extensions[dto.mimeType];
    if (!extension || dto.filename !== dto.filename.trim() || dto.filename.startsWith('.') ||
        !(filenameExtension === extension || (extension === 'jpg' && filenameExtension === 'jpeg'))) {
      throw new BadRequestException('Filename extension must match the image content type');
    }
    const album = await this.prisma.album.findUnique({ where: { id: albumId } });
    this.authorize(album, admin);
    const resume = async (photo: Photo) => {
      if (photo.albumId !== albumId || photo.filename !== dto.filename || photo.mimeType !== dto.mimeType || photo.sizeBytes !== dto.sizeBytes ||
          photo.s3Key !== `uploads/${albumId}/${photo.id}.${extension}`) {
        throw new ConflictException('Upload request identity does not match the original request');
      }
      if (photo.status !== 'PENDING') return { photoId: photo.id, status: photo.status };
      return { photoId: photo.id, status: photo.status, method: 'PUT', expiresIn: UPLOAD_EXPIRY_SECONDS,
        uploadUrl: await this.storage.presign(photo.s3Key, photo.mimeType),
        headers: { 'Content-Type': photo.mimeType, 'If-None-Match': '*' } };
    };
    if (dto.requestId) {
      const previous = await this.prisma.photo.findUnique({ where: { uploadRequestId: dto.requestId } });
      if (previous) return resume(previous);
    }
    const photoId = randomUUID();
    const key = `uploads/${albumId}/${photoId}.${extension}`;
    const uploadUrl = await this.storage.presign(key, dto.mimeType);

    // Serialize album state checks with publication/deletion updates, without
    // holding a database transaction open during AWS credential resolution.
    const concurrent = await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "Album" WHERE "id" = ${albumId} FOR UPDATE`;
      this.authorize(await tx.album.findUnique({ where: { id: albumId } }), admin);
      if (dto.requestId) {
        const previous = await tx.photo.findUnique({ where: { uploadRequestId: dto.requestId } });
        if (previous) return previous;
      }
      await tx.photo.create({ data: {
        id: photoId, albumId, s3Key: key, filename: dto.filename,
        mimeType: dto.mimeType, sizeBytes: dto.sizeBytes, status: 'PENDING',
        ...(dto.requestId ? { uploadRequestId: dto.requestId } : {}),
      } });
      return null;
    });
    if (concurrent) return resume(concurrent);
    return {
      photoId, status: 'PENDING', uploadUrl, method: 'PUT', expiresIn: UPLOAD_EXPIRY_SECONDS,
      headers: { 'Content-Type': dto.mimeType, 'If-None-Match': '*' },
    };
  }

  async complete(photoId: string, admin: UploadAdmin) {
    const photo = await this.prisma.photo.findUnique({ where: { id: photoId }, include: { album: true } });
    if (!photo) throw new NotFoundException('Photo not found');
    this.authorize(photo.album, admin);
    const extension = extensions[photo.mimeType as keyof typeof extensions];
    if (!extension || photo.s3Key !== `uploads/${photo.albumId}/${photo.id}.${extension}`) {
      throw new ConflictException('Photo is not a managed staging upload');
    }
    if (photo.status === 'UPLOADED') return { photoId, status: 'UPLOADED' };
    if (photo.status !== 'PENDING') throw new ConflictException('Photo cannot be completed in its current state');

    const object = await this.storage.head(photo.s3Key);
    const size = object.ContentLength;
    if (typeof size !== 'number' || size < 1 || !Number.isSafeInteger(size)) {
      throw new BadRequestException('Uploaded object has an invalid size');
    }
    if (size > MAX_UPLOAD_BYTES) throw new PayloadTooLargeException('Uploaded image exceeds 10 MiB');
    if (size !== photo.sizeBytes || object.ContentType !== photo.mimeType) {
      throw new BadRequestException('Uploaded size or content type does not match the request');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "Album" WHERE "id" = ${photo.albumId} FOR UPDATE`;
      const current = await tx.photo.findUnique({ where: { id: photoId }, include: { album: true } });
      if (!current) throw new NotFoundException('Photo not found');
      this.authorize(current.album, admin);
      if (current.status === 'UPLOADED') return;
      if (current.status !== 'PENDING' || current.s3Key !== photo.s3Key || current.sizeBytes !== size || current.mimeType !== object.ContentType) {
        throw new ConflictException('Upload changed during verification; retry the request');
      }
      const updated = await tx.photo.updateMany({
        where: { id: photoId, status: 'PENDING', album: { status: 'DRAFT' } },
        data: { status: 'UPLOADED', sizeBytes: size },
      });
      if (updated.count !== 1) throw new ConflictException('Upload changed during verification; retry the request');
    });
    return { photoId, status: 'UPLOADED' };
  }
}
