'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { galleryApi } from '@/lib/gallery-admin/client';

export default function LoginForm({ expired }: { expired: boolean }) {
  const router = useRouter(); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); setBusy(true); setError('');
    try {
      await galleryApi('login', 'POST', { email: data.get('email'), password: data.get('password') });
      form.reset(); router.replace('/gallery-admin'); router.refresh();
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Sign-in is temporarily unavailable.'); }
    finally { setBusy(false); }
  }
  return <form className="ga-panel ga-form" onSubmit={submit}>
    {expired && <p role="status" className="ga-notice">Your session ended. Sign in again to continue.</p>}
    <label>Email<input name="email" type="email" autoComplete="username" required maxLength={254} /></label>
    <label>Password<input name="password" type="password" autoComplete="current-password" required maxLength={128} /></label>
    {error && <p role="alert" className="ga-error">{error}</p>}
    <button className="ga-button ga-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    <a className="ga-muted" href="/gallery">Return to the public gallery</a>
  </form>;
}
