'use client';
import { useRef, useState, type ChangeEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { galleryApi, sessionExpired } from '@/lib/gallery-admin/client';
import { canPublish, movePhoto, type Album, type Photo } from '@/lib/gallery-admin/types';
import AlbumForm from './AlbumForm';
import PhotoPreview from './PhotoPreview';
import UploadQueue, { type ResumeUpload } from './UploadQueue';
import ConfirmDialog from './ConfirmDialog';

export default function AlbumEditor({ initialAlbum }: { initialAlbum: Album }) {
  const router = useRouter(); const [album, setAlbum] = useState(initialAlbum); const current = useRef(initialAlbum);
  const [selected, setSelected] = useState(initialAlbum.photos.filter((photo) => photo.status === 'PROCESSED').map((photo) => photo.id));
  const [busy, setBusy] = useState(false); const [uploadBusy, setUploadBusy] = useState(false); const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  const [pendingQueue, setPendingQueue] = useState(0);
  const [dialog, setDialog] = useState<'publish' | 'archive' | null>(null); const [resume, setResume] = useState<ResumeUpload>();
  const [previewVersion, setPreviewVersion] = useState(0); const dragged = useRef<string | null>(null);
  const readOnly = album.status === 'ARCHIVED'; const blocked = busy || uploadBusy;
  const expired = () => router.replace('/gallery-admin/login?expired=1');
  function accept(value: Album) {
    const previouslyProcessed = new Set(current.current.photos.filter((photo) => photo.status === 'PROCESSED').map((photo) => photo.id));
    setSelected((previous) => value.photos.filter((photo) => photo.status === 'PROCESSED' && (previous.includes(photo.id) || !previouslyProcessed.has(photo.id))).map((photo) => photo.id));
    current.current = value; setAlbum(value); setPreviewVersion((version) => version + 1);
  }
  async function reload() { accept(await galleryApi<Album>(`albums/${album.id}`)); }
  async function action(work: () => Promise<void>, message: string) {
    if (blocked) return; setBusy(true); setError(''); setNotice('');
    try { await work(); setNotice(message); }
    catch (failure) { if (sessionExpired(failure)) expired(); else setError(failure instanceof Error ? failure.message : 'The action could not be completed.'); }
    finally { setBusy(false); }
  }
  async function order(photoId: string, position: number) {
    const previous = current.current; const photos = movePhoto(previous.photos, photoId, position);
    if (photos === previous.photos) return;
    await action(async () => {
      setAlbum({ ...previous, photos });
      try { await galleryApi(`albums/${album.id}/photos/order`, 'PUT', { photoIds: photos.map((photo) => photo.id) }); await reload(); }
      catch (failure) { setAlbum(previous); throw failure; }
    }, 'Photo order saved.');
  }
  function resumeFile(photo: Photo, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (file) setResume({ id: crypto.randomUUID(), file, photo }); event.target.value = '';
  }
  const cover = album.photos.find((photo) => photo.isCover);
  return <main id="gallery-admin-main" className="ga-main"><Link className="ga-link" href="/gallery-admin">← All albums</Link>
    <div className="ga-page-heading"><div><p className="ga-eyebrow">Album workspace</p><h1>{album.title}</h1><span className={`ga-badge ga-${album.status.toLowerCase()}`}>{album.status}</span></div><div className="ga-row-actions">
      <button className="ga-button" disabled={blocked} onClick={() => action(reload, 'Album refreshed.')}>Refresh</button>
      {album.status === 'DRAFT' && <button className="ga-button ga-primary" disabled={blocked || pendingQueue > 0 || !canPublish(album, selected)} onClick={() => setDialog('publish')}>Review publication</button>}
      {album.status === 'PUBLISHED' && <><Link className="ga-button" href={`/gallery`}>Public gallery</Link><button className="ga-button" disabled={blocked} onClick={() => setDialog('archive')}>Archive album</button></>}
    </div></div>
    {error && <p role="alert" className="ga-error ga-panel">{error}</p>}{notice && <p role="status" className="ga-notice">{notice}</p>}
    <section className="ga-panel ga-details"><h2>Album details</h2><AlbumForm album={album} disabled={blocked} onSave={async (fields) => {
      setBusy(true);
      try { accept(await galleryApi<Album>(`albums/${album.id}`, 'PATCH', fields)); setNotice('Album details saved.'); }
      catch (failure) { if (sessionExpired(failure)) expired(); throw failure; }
      finally { setBusy(false); }
    }} /></section>
    {album.status === 'DRAFT' && <UploadQueue album={album} resume={resume} onRefresh={reload} onBusy={setUploadBusy} onPending={setPendingQueue} onExpired={expired} />}
    {pendingQueue > 0 && <p className="ga-notice">Finish or dismiss queued uploads before reviewing publication.</p>}
    <section aria-labelledby="ga-photos-title"><div className="ga-section-heading"><div><h2 id="ga-photos-title">Photographs <span className="ga-muted">({album.photos.length})</span></h2>
      <p className="ga-muted" id="ga-order-help">{readOnly ? 'Historical photos are retained.' : 'Drag photographs to reorder, or use the move buttons.'}</p></div>
      {album.status === 'DRAFT' && <span className="ga-muted">{selected.length} selected for publication</span>}</div>
      {album.status === 'DRAFT' && <p className="ga-notice">Select processed photographs and one cover. Unselected photographs remain private. Storage availability is checked again when publishing.</p>}
      {!album.photos.length ? <div className="ga-empty">No photographs yet. Add your first batch above.</div> : <div className="ga-photo-grid">{album.photos.map((photo, index) => <article key={photo.id} className="ga-panel ga-photo-card" aria-label={`Photograph ${photo.filename}`} draggable={!readOnly && !blocked}
        aria-describedby="ga-order-help" onDragStart={(event) => { dragged.current = photo.id; event.dataTransfer.setData('text/x-dmc-photo-id', photo.id); event.dataTransfer.effectAllowed = 'move'; }}
        onDragEnd={() => { dragged.current = null; }} onDragOver={(event) => { if (dragged.current) event.preventDefault(); }}
        onDrop={(event) => { if (dragged.current && !readOnly && !blocked) { event.preventDefault(); const id = dragged.current; dragged.current = null; void order(id, index); } }}>
        <PhotoPreview key={`${photo.id}-${previewVersion}`} photo={photo} /><div className="ga-card-content"><div className="ga-photo-name"><strong>{photo.filename}</strong>{photo.isCover && <span className="ga-badge ga-draft">Cover</span>}</div>
          <span className={`ga-badge ga-${photo.status.toLowerCase()}`}>{photo.status}</span>
          {photo.processingError && <p className="ga-error">{photo.processingError === 'INVALID_IMAGE' ? 'This image could not be decoded. Upload a corrected file.' : 'Processing failed. Retry or contact an administrator.'}</p>}
          {album.status === 'DRAFT' && <label className="ga-checkbox"><input type="checkbox" checked={selected.includes(photo.id)} disabled={photo.status !== 'PROCESSED' || blocked} onChange={(event) => setSelected((previous) => event.target.checked ? [...previous, photo.id] : previous.filter((id) => id !== photo.id))} />Include {photo.filename} in publication</label>}
          {!readOnly && <div className="ga-photo-actions">
            <button className="ga-button" aria-label={`Move ${photo.filename} earlier`} disabled={blocked || index === 0} onClick={() => order(photo.id, index - 1)}>← Move</button>
            <button className="ga-button" aria-label={`Move ${photo.filename} later`} disabled={blocked || index === album.photos.length - 1} onClick={() => order(photo.id, index + 1)}>Move →</button>
            {photo.status === 'PROCESSED' && <button className="ga-button" disabled={blocked || photo.isCover || (album.status === 'PUBLISHED' && !photo.imageUrl)} onClick={() => action(async () => { await galleryApi(`albums/${album.id}/cover`, 'PUT', { photoId: photo.id }); await reload(); }, 'Cover updated.')}>Set cover</button>}
            {album.status === 'DRAFT' && ['UPLOADED', 'FAILED'].includes(photo.status) && <button className="ga-button" disabled={blocked} onClick={() => action(async () => { await galleryApi(`photos/${photo.id}/process`, 'POST', {}); await reload(); }, 'Photograph processed.')}>Retry processing</button>}
            {album.status === 'DRAFT' && photo.status === 'PENDING' && photo.uploadRequestId && <label className={`ga-button ${blocked ? 'ga-disabled' : ''}`}>Resume upload<input className="ga-sr-only" type="file" accept="image/jpeg,image/png,image/webp" disabled={blocked} aria-label={`Resume upload for ${photo.filename}`} onChange={(event) => resumeFile(photo, event)} /></label>}
          </div>}
        </div></article>)}</div>}
    </section>
    {dialog && <ConfirmDialog title={dialog === 'publish' ? 'Publish this album?' : 'Archive this album?'} confirmLabel={dialog === 'publish' ? 'Publish album' : 'Archive album'} busy={busy} onClose={() => setDialog(null)} onConfirm={() => action(async () => {
      if (dialog === 'publish' && !canPublish(current.current, selected)) throw new Error('Check the processed selection and cover before publishing.');
      const value = await galleryApi<Album>(`albums/${album.id}/${dialog}`, 'POST', dialog === 'publish' ? { photoIds: selected } : {});
      accept(value); setDialog(null);
    }, dialog === 'publish' ? 'Album published.' : 'Album archived.')}>
      {dialog === 'publish' ? <><p>{selected.length} processed photographs will become publicly accessible. {album.photos.length - selected.length} unselected photographs will remain private.</p><p>Cover: <strong>{cover?.filename}</strong></p><PhotoPreview photo={cover} /></> : <p>The album will disappear from the public API. Historical image links and objects will remain available.</p>}
      {error && <p className="ga-error" role="alert">{error}</p>}
    </ConfirmDialog>}
  </main>;
}
