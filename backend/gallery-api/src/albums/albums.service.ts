import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '../generated/prisma/client';
import { publishedImageUrl } from './published-images';

const publicSelect = {
  id: true, title: true, slug: true, description: true, eventDate: true, status: true, publishedAt: true,
  photos: {
    where: { status: 'PROCESSED' as const, publishedKey: { not: null }, publishedThumbnailKey: { not: null } },
    orderBy: [{ sortOrder: 'asc' as const }, { id: 'asc' as const }],
    select: { id: true, width: true, height: true, sortOrder: true, isCover: true, status: true,
      publishedKey: true, publishedThumbnailKey: true },
  },
} satisfies Prisma.AlbumSelect;
type PublicAlbum = Prisma.AlbumGetPayload<{ select: typeof publicSelect }>;

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  private view(album: PublicAlbum) {
    if (album.status !== 'PUBLISHED' || !album.publishedAt) return null;
    const photos = album.photos.flatMap((photo) => {
      if (photo.status !== 'PROCESSED') return [];
      const imageUrl = publishedImageUrl(photo.publishedKey, album.id, photo.id, 'full');
      const thumbnailUrl = publishedImageUrl(photo.publishedThumbnailKey, album.id, photo.id, 'thumbnail');
      if (!imageUrl || !thumbnailUrl || photo.publishedKey!.split('/')[2] !== photo.publishedThumbnailKey!.split('/')[2]) return [];
      return [{ id: photo.id, width: photo.width, height: photo.height, sortOrder: photo.sortOrder,
        isCover: photo.isCover, status: photo.status, mimeType: 'image/webp', imageUrl, thumbnailUrl }];
    });
    const covers = photos.filter((photo) => photo.isCover);
    if (!photos.length || covers.length !== 1) return null;
    return { id: album.id, title: album.title, slug: album.slug, description: album.description,
      eventDate: album.eventDate, status: album.status, publishedAt: album.publishedAt,
      coverPhotoId: covers[0].id, photos };
  }

  async findAll() {
    const albums = await this.prisma.album.findMany({ where: { status: 'PUBLISHED' }, select: publicSelect,
      orderBy: { publishedAt: 'desc' } });
    return albums.map((album) => this.view(album)).filter((album) => album !== null);
  }

  async findOne(slug: string) {
    const album = await this.prisma.album.findFirst({ where: { slug, status: 'PUBLISHED' }, select: publicSelect });
    return album ? this.view(album) : null;
  }
}
