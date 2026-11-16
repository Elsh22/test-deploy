export class GalleryApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export async function galleryApi<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(`/api/gallery-admin/${path}`, {
    method, credentials: 'same-origin', cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const value = await response.json().catch(() => null);
  if (!value || typeof value !== 'object') throw new GalleryApiError(response.ok ? 502 : response.status, 'The gallery response could not be read. Refresh and retry.');
  if (!response.ok) throw new GalleryApiError(response.status, typeof value.error === 'string' ? value.error : 'The request could not be completed.');
  return value;
}
export function sessionExpired(error: unknown) {
  return error instanceof GalleryApiError && error.status === 401;
}
export const previewUrl = (photoId: string) => `/api/gallery-admin/photos/${encodeURIComponent(photoId)}/preview`;
