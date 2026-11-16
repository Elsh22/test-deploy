'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { galleryApi, sessionExpired } from '@/lib/gallery-admin/client';
import { isUuid, type Album } from '@/lib/gallery-admin/types';
import AlbumForm from './AlbumForm';
import PhotoPreview from './PhotoPreview';

export default function Dashboard({ albums }: { albums: Album[] }) {
  const router = useRouter(); const [filter, setFilter] = useState('ALL'); const [search, setSearch] = useState('');
  const visible = albums.filter((album) => (filter === 'ALL' || album.status === filter) && album.title.toLowerCase().includes(search.toLowerCase()));
  return <main id="gallery-admin-main" className="ga-main"><div className="ga-page-heading"><div><p className="ga-eyebrow">Gallery studio</p><h1>Your albums</h1><p className="ga-muted">Upload, curate, and publish DMC event photographs.</p></div>
    <button className="ga-button" onClick={() => router.refresh()}>Refresh albums</button></div>
    <details className="ga-panel ga-create"><summary className="ga-button ga-primary">Create album</summary><div className="ga-create-form"><h2>Start a new album</h2><AlbumForm onSave={async (fields) => {
      try { const created = await galleryApi<Album>('albums', 'POST', fields); if (!isUuid(created.id)) throw new Error('The album response could not be verified.'); router.push(`/gallery-admin/albums/${created.id}`); }
      catch (error) { if (sessionExpired(error)) router.replace('/gallery-admin/login?expired=1'); throw error; }
    }} /></div></details>
    <div className="ga-toolbar"><div className="ga-filters" aria-label="Album status filter">{['ALL', 'DRAFT', 'PUBLISHED', 'ARCHIVED'].map((status) => <button key={status} className="ga-button" aria-pressed={filter === status} onClick={() => setFilter(status)}>{status === 'ALL' ? 'All albums' : status.charAt(0) + status.slice(1).toLowerCase()}</button>)}</div>
      <label className="ga-search"><span className="ga-sr-only">Search albums</span><input type="search" placeholder="Search albums" value={search} onChange={(event) => setSearch(event.target.value)} /></label></div>
    {visible.length ? <div className="ga-album-grid">{visible.map((album) => <article key={album.id} className="ga-panel ga-album-card">
      <Link href={`/gallery-admin/albums/${album.id}`}><PhotoPreview photo={album.photos.find((photo) => photo.isCover)} /><div className="ga-card-content"><span className={`ga-badge ga-${album.status.toLowerCase()}`}>{album.status}</span><h2>{album.title}</h2><p className="ga-muted">{album.photos.length} photographs · {album.photos.filter((photo) => photo.status === 'PROCESSED').length} processed</p>
        <span className="ga-link">{album.status === 'ARCHIVED' ? 'View album' : 'Manage album'} <span aria-hidden="true">→</span></span></div></Link>
    </article>)}</div> : <div className="ga-empty"><h2>{albums.length ? 'No matching albums' : 'Your gallery starts here'}</h2><p className="ga-muted">{albums.length ? 'Try another status or search.' : 'Create an album, then add your event photographs.'}</p></div>}
  </main>;
}
