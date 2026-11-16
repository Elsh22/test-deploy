'use client';
/* eslint-disable @next/next/no-img-element -- Private images require browser cookies; Next image optimization cannot forward this session. */
import { useState } from 'react';
import { previewUrl } from '@/lib/gallery-admin/client';
import type { Photo } from '@/lib/gallery-admin/types';
export default function PhotoPreview({ photo }: { photo?: Photo }) {
  const [failed, setFailed] = useState(false);
  if (!photo || photo.status !== 'PROCESSED') return <div className="ga-preview ga-placeholder">{photo ? 'Awaiting processing' : 'No cover selected'}</div>;
  if (failed) return <div className="ga-preview ga-placeholder">Preview unavailable</div>;
  return <div className="ga-preview"><img src={photo.thumbnailUrl || previewUrl(photo.id)} alt={`Preview of ${photo.filename}`} loading="lazy" onError={() => setFailed(true)} /></div>;
}
