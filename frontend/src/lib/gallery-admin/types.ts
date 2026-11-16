export type Admin = { id: string; email: string; role: 'ADMIN' | 'SUPER_ADMIN' };
export type Photo = {
  id: string; filename: string; mimeType: string; sizeBytes: number | null; uploadRequestId: string | null;
  status: 'PENDING' | 'UPLOADED' | 'PROCESSED' | 'FAILED'; width: number | null; height: number | null;
  sortOrder: number; isCover: boolean; processingError: string | null; imageUrl: string | null; thumbnailUrl: string | null;
};
export type Album = {
  id: string; title: string; slug: string; description: string | null; eventDate: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'; createdById: string; publishedAt: string | null;
  createdAt: string; updatedAt: string; photos: Photo[];
};
export const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
export function canPublish(album: Album, selected: string[]) {
  return album.status === 'DRAFT' && selected.length > 0 && selected.length <= 100 && new Set(selected).size === selected.length &&
    selected.every((id) => album.photos.some((photo) => photo.id === id && photo.status === 'PROCESSED')) &&
    album.photos.filter((photo) => photo.isCover).length === 1 &&
    album.photos.some((photo) => photo.isCover && selected.includes(photo.id) && photo.status === 'PROCESSED');
}
export function movePhoto<T extends { id: string }>(photos: T[], id: string, target: number) {
  const index = photos.findIndex((photo) => photo.id === id);
  if (index < 0 || target < 0 || target >= photos.length) return photos;
  const copy = [...photos]; const [photo] = copy.splice(index, 1); copy.splice(target, 0, photo); return copy;
}
