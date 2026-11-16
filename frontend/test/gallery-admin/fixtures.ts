import type { Album, Photo } from '../../src/lib/gallery-admin/types';
export const albumId = 'd6e989b8-3913-43cc-90cb-39825fa2c022';
export const one = 'd1b35a86-7842-46ba-8f70-213b115c3cb9';
export const two = '9e66b70a-e468-4b22-8d8e-447fd151ed48';
export function photo(id = one, overrides: Partial<Photo> = {}): Photo { return {
 id, filename: id === one ? 'one.webp' : 'two.webp', mimeType: 'image/webp', sizeBytes: 5, uploadRequestId: null,
 status: 'PROCESSED', width: 100, height: 50, sortOrder: 0, isCover: id === one, processingError: null, imageUrl: null, thumbnailUrl: null, ...overrides,
}; }
export function album(overrides: Partial<Album> = {}): Album { return {
 id: albumId, title: 'DMC Meeting', slug: 'dmc-meeting', description: 'An event', eventDate: null, status: 'DRAFT',
 createdById: 'owner', publishedAt: null, createdAt: '', updatedAt: '', photos: [photo(), photo(two)], ...overrides,
}; }
