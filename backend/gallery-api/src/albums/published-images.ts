export const CLOUDFRONT_ORIGIN = 'https://d6uqhuj15c85p.cloudfront.net';
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function publishedImageUrl(key: string | null, albumId: string, photoId: string, kind: 'full' | 'thumbnail') {
  if (!key) return null;
  const parts = key.split('/');
  if (parts.length !== 5 || parts[0] !== 'Events' || parts[1] !== albumId || parts[3] !== photoId ||
      ![parts[1], parts[2], parts[3]].every((part) => uuid.test(part)) || parts[4] !== `${kind}.webp`) return null;
  return `${CLOUDFRONT_ORIGIN}/${key}`;
}

export function isProcessedImageKey(key: string | null, albumId: string, photoId: string, kind: 'full' | 'thumbnail') {
  if (!key) return false;
  const parts = key.split('/');
  return parts.length === 5 && parts[0] === 'processed' && parts[1] === albumId && parts[2] === photoId &&
    [parts[1], parts[2], parts[3]].every((part) => uuid.test(part)) && parts[4] === `${kind}.webp`;
}
