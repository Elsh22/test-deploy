import { GalleryApiError } from './client';
import { isUuid } from './types';

export type UploadGrant = { photoId: string; status: string; uploadUrl?: string; method?: string; headers?: Record<string, string> };
export type UploadTask = {
  id: string; requestId: string; albumId: string; name: string; mimeType: string; sizeBytes: number; file?: File;
  photoId?: string; completed?: boolean; phase: 'queued' | 'requesting' | 'uploading' | 'completing' | 'processing' | 'processed' | 'error';
  progress: number; error?: string;
};
export type UploadTransport = {
  api: <T>(path: string, method?: string, body?: unknown) => Promise<T>;
  put: (url: string, file: File, headers: Record<string, string>, progress: (value: number) => void, signal?: AbortSignal) => Promise<void>;
};
export function validatePhotoFile(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const allowed: Record<string, string[]> = { 'image/jpeg': ['jpg', 'jpeg'], 'image/png': ['png'], 'image/webp': ['webp'] };
  if (!allowed[file.type]?.includes(extension || '') || !/^[^\\/\u0000-\u001f\u007f]+$/.test(file.name) || file.name.startsWith('.') || file.name.trim() !== file.name || file.name.length > 180) return 'Choose a JPEG, PNG, or WebP with a matching filename.';
  if (file.size < 1 || file.size > 10 * 1024 * 1024) return 'Each photograph must be between 1 byte and 10 MiB.';
  return null;
}
export function validateUploadGrant(grant: UploadGrant, task: UploadTask) {
  const url = new URL(grant.uploadUrl || '');
  const extension = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' } as Record<string, string>)[task.mimeType];
  if (!isUuid(grant.photoId) || grant.method !== 'PUT' || url.protocol !== 'https:' ||
      url.hostname !== 'dmc-gallery-staging-2026.s3.us-east-2.amazonaws.com' || url.username || url.password || url.port || url.hash ||
      url.pathname !== `/uploads/${task.albumId}/${grant.photoId}.${extension}` ||
      Object.keys(grant.headers || {}).length !== 2 || grant.headers?.['Content-Type'] !== task.mimeType || grant.headers?.['If-None-Match'] !== '*') {
    throw new Error('The upload destination could not be verified. Refresh and retry.');
  }
  return { url: url.href, headers: grant.headers };
}
export class UploadTransferError extends Error {
  constructor(public status: number) { super('S3 upload could not be confirmed. Retry to check its saved state.'); }
}
export function directPut(url: string, file: File, headers: Record<string, string>, progress: (value: number) => void, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest(); xhr.open('PUT', url); xhr.withCredentials = false; xhr.timeout = 180_000;
    Object.entries(headers).forEach(([name, value]) => xhr.setRequestHeader(name, value));
    const abort = () => xhr.abort();
    const finish = (error?: Error) => { signal?.removeEventListener('abort', abort); error ? reject(error) : resolve(); };
    xhr.upload.onprogress = (event) => { if (event.lengthComputable) progress(Math.round(event.loaded / event.total * 100)); };
    xhr.onload = () => finish(xhr.status >= 200 && xhr.status < 300 ? undefined : new UploadTransferError(xhr.status));
    xhr.onerror = xhr.ontimeout = () => finish(new UploadTransferError(0));
    xhr.onabort = () => finish(new Error('Upload interrupted. Retry to resume safely.'));
    signal?.addEventListener('abort', abort, { once: true });
    if (signal?.aborted) { finish(new Error('Upload interrupted.')); return; }
    xhr.send(file);
  });
}
export async function runPhotoUpload(initial: UploadTask, transport: UploadTransport,
  update: (task: UploadTask) => void, signal?: AbortSignal): Promise<UploadTask> {
  let task: UploadTask = { ...initial, error: undefined };
  const save = (patch: Partial<UploadTask>) => { task = { ...task, ...patch }; update(task); };
  const complete = async () => { save({ phase: 'completing' }); await transport.api(`photos/${task.photoId}/complete`, 'POST', {}); save({ completed: true, file: undefined }); };
  try {
    if (task.photoId && !task.completed) {
      try { await complete(); }
      catch (error) { if (!(error instanceof GalleryApiError && error.status === 409)) throw error; }
    }
    if (!task.completed) {
      if (!task.file) throw new Error('Select the original file to resume this upload.');
      const invalid = validatePhotoFile(task.file); if (invalid) throw new Error(invalid);
      save({ phase: 'requesting' });
      const grant = await transport.api<UploadGrant>(`albums/${task.albumId}/uploads`, 'POST', {
        filename: task.name, mimeType: task.mimeType, sizeBytes: task.sizeBytes, requestId: task.requestId,
      });
      if (!isUuid(grant.photoId)) throw new Error('The upload response could not be verified.');
      save({ photoId: grant.photoId });
      if (['UPLOADED', 'FAILED', 'PROCESSED'].includes(grant.status)) {
        save({ completed: true, file: undefined });
        if (grant.status === 'PROCESSED') { save({ phase: 'processed', progress: 100, file: undefined }); return task; }
      } else {
        const target = validateUploadGrant(grant, task);
        save({ phase: 'uploading', progress: 0 });
        try { await transport.put(target.url, task.file!, target.headers, (progress) => save({ progress }), signal); }
        catch (error) { if (!(error instanceof UploadTransferError && error.status === 412)) throw error; }
        await complete();
      }
    }
    save({ phase: 'processing', progress: 100 });
    await transport.api(`photos/${task.photoId}/process`, 'POST', {});
    save({ phase: 'processed', file: undefined });
    return task;
  } catch (error) {
    save({ phase: 'error', error: error instanceof GalleryApiError || error instanceof UploadTransferError ? error.message :
      error instanceof Error && !/fetch|network/i.test(error.message) ? error.message : 'The upload was interrupted. Retry to continue safely.' });
    if (error instanceof GalleryApiError && error.status === 401) throw error;
    return task;
  }
}
