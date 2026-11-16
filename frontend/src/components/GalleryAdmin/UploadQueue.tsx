'use client';
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { galleryApi, sessionExpired } from '@/lib/gallery-admin/client';
import { directPut, runPhotoUpload, validatePhotoFile, type UploadTask } from '@/lib/gallery-admin/upload';
import type { Album, Photo } from '@/lib/gallery-admin/types';

export type ResumeUpload = { id: string; photo: Photo; file: File };
const phaseLabels = { queued: 'Queued', requesting: 'Preparing upload', uploading: 'Uploading', completing: 'Verifying upload', processing: 'Optimizing image', processed: 'Ready', error: 'Needs attention' };
export default function UploadQueue({ album, resume, onRefresh, onBusy, onPending, onExpired }: {
  album: Album; resume?: ResumeUpload; onRefresh: () => Promise<void>; onBusy: (busy: boolean) => void; onPending?: (count: number) => void; onExpired: () => void;
}) {
  const [items, setItems] = useState<UploadTask[]>([]); const [running, setRunning] = useState(false); const [error, setError] = useState('');
  const controller = useRef<AbortController>(); const mounted = useRef(true); const handledResume = useRef('');
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; controller.current?.abort(); }; }, []);
  useEffect(() => { onPending?.(items.filter((item) => item.phase !== 'processed').length); }, [items, onPending]);
  useEffect(() => {
    if (!resume || handledResume.current === resume.id) return; handledResume.current = resume.id;
    const { file, photo } = resume; const invalid = validatePhotoFile(file);
    if (invalid || file.name !== photo.filename || file.type !== photo.mimeType || file.size !== photo.sizeBytes || !photo.uploadRequestId) {
      setError(invalid || 'Resume with the original filename, type, and size.'); return;
    }
    const remaining = items.filter((item) => item.photoId !== photo.id && item.requestId !== photo.uploadRequestId);
    if (remaining.filter((item) => item.phase !== 'processed').length >= 20) { setError('Finish or remove queued items before adding another batch.'); return; }
    setError(''); setItems([...remaining, { id: crypto.randomUUID(), requestId: photo.uploadRequestId!, albumId: album.id,
      name: file.name, mimeType: file.type, sizeBytes: file.size, file, photoId: photo.id, phase: 'queued', progress: 0 }]);
  }, [resume, album.id, items]);
  function add(files: File[]) {
    if (running) return;
    if (files.length > 20 || items.filter((item) => item.phase !== 'processed').length + files.length > 20) { setError('Select up to 20 photographs per batch. Finish or remove queued items first.'); return; }
    const errors: string[] = []; const added: UploadTask[] = [];
    for (const file of files) {
      const invalid = validatePhotoFile(file);
      if (invalid) { errors.push(`${file.name}: ${invalid}`); continue; }
      if (items.some((item) => item.name === file.name && item.sizeBytes === file.size) || added.some((item) => item.name === file.name && item.sizeBytes === file.size)) { errors.push(`${file.name} is already in this batch.`); continue; }
      if (album.photos.some((photo) => photo.status === 'PENDING' && photo.filename === file.name && photo.sizeBytes === file.size)) { errors.push(`${file.name} has a pending upload. Use Resume upload on its photo card.`); continue; }
      added.push({ id: crypto.randomUUID(), requestId: crypto.randomUUID(), albumId: album.id, file,
        name: file.name, mimeType: file.type, sizeBytes: file.size, phase: 'queued', progress: 0 });
    }
    setItems((previous) => [...previous, ...added]); setError(errors.join(' '));
  }
  async function run(batch: UploadTask[]) {
    if (running || !batch.length) return; setRunning(true); onBusy(true); setError(''); controller.current = new AbortController();
    try {
      for (const item of batch) {
        if (!mounted.current) break;
        await runPhotoUpload(item, { api: galleryApi, put: directPut }, (updated) => {
          if (mounted.current) setItems((previous) => previous.map((row) => row.id === item.id ? updated : row));
        }, controller.current.signal);
        if (mounted.current) await onRefresh();
      }
    } catch (failure) { if (sessionExpired(failure)) onExpired(); else if (mounted.current) setError('The batch was paused. Retry individual photographs to continue.'); }
    finally { if (mounted.current) { setRunning(false); onBusy(false); } }
  }
  function select(event: ChangeEvent<HTMLInputElement>) { add(Array.from(event.target.files || [])); event.target.value = ''; }
  function drop(event: DragEvent) { event.preventDefault(); add(Array.from(event.dataTransfer.files)); }
  return <section className="ga-panel ga-upload" aria-labelledby="ga-upload-title"><div className="ga-section-heading"><div><h2 id="ga-upload-title">Add photographs</h2><p className="ga-muted">Up to 20 JPEG, PNG, or WebP files. Maximum 10 MiB each.</p></div>
    <button className="ga-button ga-primary" disabled={running || !items.some((item) => item.phase === 'queued')} onClick={() => run(items.filter((item) => item.phase === 'queued'))}>{running ? 'Uploading and processing…' : 'Upload queued photos'}</button></div>
    <label className="ga-dropzone" onDragOver={(event) => event.preventDefault()} onDrop={drop}><input className="ga-sr-only" type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={running} onChange={select} /><strong>Choose photographs or drop them here</strong><span>Files upload directly to private storage and are processed one at a time.</span></label>
    {error && <p role="alert" className="ga-error">{error}</p>}
    {items.length > 0 && <ul className="ga-queue">{items.map((item) => <li key={item.id}><div className="ga-queue-detail"><strong>{item.name}</strong><span className="ga-muted">{phaseLabels[item.phase]}</span>
      {item.phase === 'uploading' && <progress value={item.progress} max={100} aria-label={`Upload progress for ${item.name}`} />}
      {item.error && <p role="alert" className="ga-error">{item.error}</p>}</div><div className="ga-row-actions">
      {item.phase === 'error' && <button className="ga-button" disabled={running} onClick={() => run([item])}>Retry {item.name}</button>}
      <button className="ga-button" aria-label={`Remove ${item.name} from queue`} disabled={running} onClick={() => setItems((previous) => previous.filter((row) => row.id !== item.id))}>Dismiss</button>
    </div></li>)}</ul>}
  </section>;
}
