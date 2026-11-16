'use client';
import { useState, type FormEvent } from 'react';
import type { Album } from '@/lib/gallery-admin/types';
export type AlbumFields = { title: string; description: string | null; eventDate: string | null; slug?: string };
export default function AlbumForm({ album, onSave, disabled = false }: { album?: Album; onSave: (fields: AlbumFields) => Promise<void>; disabled?: boolean }) {
  const [title, setTitle] = useState(album?.title || ''); const [slug, setSlug] = useState(album?.slug || '');
  const [description, setDescription] = useState(album?.description || ''); const [date, setDate] = useState(album?.eventDate?.slice(0, 10) || '');
  const [slugEdited, setSlugEdited] = useState(Boolean(album)); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const archived = album?.status === 'ARCHIVED'; const editableSlug = !album || album.status === 'DRAFT';
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try { await onSave({ title: title.trim(), description: description || null, eventDate: date || null, ...(editableSlug ? { slug } : {}) }); }
    catch (failure) { setError(failure instanceof Error ? failure.message : 'Album could not be saved.'); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="ga-form"><fieldset disabled={busy || disabled || archived}>
    <legend className="ga-sr-only">Album details</legend>
    <label>Title<input required minLength={3} maxLength={150} value={title} onChange={(event) => {
      setTitle(event.target.value); if (!slugEdited) setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 120));
    }} /></label>
    <div className="ga-fields"><label>Album slug<input required maxLength={120} pattern="[a-z0-9]+(-[a-z0-9]+)*" value={slug} disabled={!editableSlug} onChange={(event) => { setSlugEdited(true); setSlug(event.target.value); }} /><span className="ga-hint">{editableSlug ? 'Lowercase letters, numbers, and hyphens.' : 'Slugs stay fixed after publication.'}</span></label>
      <label>Event date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label></div>
    <label>Description<textarea rows={4} maxLength={2000} value={description} onChange={(event) => setDescription(event.target.value)} /></label>
    {!archived && <button className="ga-button ga-primary" disabled={title.trim().length < 3}>{busy ? 'Saving…' : album ? 'Save details' : 'Create album'}</button>}
  </fieldset>{archived && <p className="ga-muted">Archived albums are read-only.</p>}{error && <p role="alert" className="ga-error">{error}</p>}</form>;
}
