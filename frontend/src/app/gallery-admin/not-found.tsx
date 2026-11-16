import Link from 'next/link';
export default function GalleryAdminNotFound() {
  return <main className="ga-main"><h1>Album not available</h1><p>You may not have access, or the album may no longer exist.</p><Link className="ga-button" href="/gallery-admin">Return to albums</Link></main>;
}
