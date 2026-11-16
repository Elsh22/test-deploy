import 'server-only';
import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import type { Admin } from './types';

export const sessionCookie = () => process.env.NODE_ENV === 'production' ? '__Host-dmc-gallery-admin' : 'dmc-gallery-admin';
export const cookieOptions = () => ({ httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/' });

export function apiBaseUrl() {
  const url = new URL(process.env.GALLERY_API_BASE_URL || 'http://127.0.0.1:4000');
  if (url.username || url.password || url.search || url.hash ||
      (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)))) {
    throw new Error('Invalid Gallery API server configuration');
  }
  return url.href.replace(/\/$/, '');
}
export function tokenLifetime(token: string) {
  try {
    if (token.length > 8192 || token.split('.').length !== 3) return 0;
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
    return Number.isSafeInteger(payload.exp) ? Math.max(0, Math.min(900, payload.exp - Math.floor(Date.now() / 1000))) : 0;
  } catch { return 0; }
}
export async function backendFetch(path: string, token?: string, init: RequestInit = {}) {
  return fetch(`${apiBaseUrl()}/api/${path}`, { ...init, cache: 'no-store', redirect: 'error',
    signal: AbortSignal.timeout(210_000), headers: { 'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
}
export async function requireGalleryAdmin(): Promise<Admin> {
  const token = (await cookies()).get(sessionCookie())?.value;
  if (!token) redirect('/gallery-admin/login');
  if (tokenLifetime(token) < 1) redirect('/gallery-admin/login?expired=1');
  const response = await backendFetch('admin/me', token);
  if (response.status === 401) redirect('/gallery-admin/login?expired=1');
  if (!response.ok) throw new Error('Gallery administration is temporarily unavailable.');
  const admin: Admin = await response.json();
  if (!['ADMIN', 'SUPER_ADMIN'].includes(admin.role)) redirect('/gallery-admin/login');
  return admin;
}
export async function galleryServerData<T>(path: string): Promise<T> {
  await requireGalleryAdmin();
  const response = await backendFetch(`admin/${path}`, (await cookies()).get(sessionCookie())?.value);
  if (response.status === 401) redirect('/gallery-admin/login?expired=1');
  if (response.status === 403 || response.status === 404) notFound();
  if (!response.ok) throw new Error('Gallery data is temporarily unavailable.');
  return response.json();
}
