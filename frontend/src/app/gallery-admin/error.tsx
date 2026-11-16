'use client';
export default function GalleryAdminError({ reset }: { reset: () => void }) {
  return <main className="ga-main"><h1>Gallery administration is unavailable</h1><p>The service could not load this page. Your changes have not been resubmitted.</p>
    <button className="ga-button" onClick={reset}>Try again</button> <a href="/gallery-admin/login">Sign in again</a></main>;
}
