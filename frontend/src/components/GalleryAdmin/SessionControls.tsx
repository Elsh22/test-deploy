'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { galleryApi, sessionExpired, GalleryApiError } from '@/lib/gallery-admin/client';
export default function SessionControls({ email }: { email: string }) {
  const router = useRouter(); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  useEffect(() => {
    const check = () => galleryApi('session').catch((failure) => { if (sessionExpired(failure)) router.replace('/gallery-admin/login?expired=1'); });
    const interval = setInterval(check, 30_000);
    return () => clearInterval(interval);
  }, [router]);
  async function logout() {
    setBusy(true); setError('');
    try { await galleryApi('logout', 'POST', {}); router.replace('/gallery-admin/login'); router.refresh(); }
    catch (failure) { setError(failure instanceof GalleryApiError ? failure.message :
      'Sign-out could not be confirmed. The existing session may remain active until expiration.'); } finally { setBusy(false); }
  }
  return <div className="ga-session"><span className="ga-session-email">{email}</span><button className="ga-button" onClick={logout} disabled={busy}>Sign out</button>{error && <span role="alert">{error}</span>}</div>;
}
