import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { backendFetch, cookieOptions, sessionCookie, tokenLifetime } from './server';
import { isUuid } from './types';

export function allowedRoute(method: string, parts: string[]): string | null {
  if (parts.length === 1 && parts[0] === 'session' && method === 'GET') return 'admin/me';
  if (parts[0] === 'albums') {
    if (parts.length === 1 && ['GET', 'POST'].includes(method)) return 'admin/albums';
    if (!parts[1] || !isUuid(parts[1])) return null;
    if (parts.length === 2 && ['GET', 'PATCH'].includes(method)) return `admin/albums/${parts[1]}`;
    if (parts.length === 3 && method === 'POST' && ['uploads', 'publish', 'archive'].includes(parts[2])) return `admin/albums/${parts[1]}/${parts[2]}`;
    if (parts.length === 3 && method === 'PUT' && parts[2] === 'cover') return `admin/albums/${parts[1]}/cover`;
    if (parts.length === 4 && method === 'PUT' && parts[2] === 'photos' && parts[3] === 'order') return `admin/albums/${parts[1]}/photos/order`;
  }
  if (parts[0] === 'photos' && parts.length === 3 && isUuid(parts[1]) &&
      ((method === 'GET' && parts[2] === 'preview') || (method === 'POST' && ['complete', 'process'].includes(parts[2])))) return `admin/photos/${parts[1]}/${parts[2]}`;
  return null;
}
function json(value: unknown, status = 200) {
  return NextResponse.json(value, { status, headers: { 'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff', 'Cross-Origin-Resource-Policy': 'same-origin' } });
}
export function errorMessage(status: number) {
  return ({ 400: 'Check the required fields, image metadata, or selection.', 401: 'Your administrator session expired. Sign in again.',
    403: 'You do not have permission to perform this operation.', 404: 'The album or photograph was not found.',
    409: 'The album or photo state has changed. Refresh and check the cover, selection, and processing status.',
    413: 'The image exceeds the permitted size or dimensions.', 422: 'The image could not be safely decoded. Choose a valid JPEG, PNG, or WebP.',
    429: 'Too many requests. Wait before trying again.', 503: 'Gallery storage or processing is unavailable. Retry later.' } as Record<number, string>)[status] || 'The gallery request could not be completed. Please retry.';
}
async function smallJson(request: NextRequest) {
  if (!/^application\/json(?:\s*;|\s*$)/i.test(request.headers.get('content-type') || '')) throw new Error('Invalid request');
  const reader = request.body?.getReader();
  if (!reader) return {};
  let text = ''; let length = 0; const decoder = new TextDecoder();
  try {
    for (;;) { const chunk = await reader.read(); if (chunk.done) break; length += chunk.value.length;
      if (length > 32_768) throw new Error('Request too large'); text += decoder.decode(chunk.value, { stream: true }); }
    text += decoder.decode(); const value = text ? JSON.parse(text) : {};
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid body');
    return value;
  } finally { await reader.cancel().catch(() => undefined); }
}
function mutationAllowed(request: NextRequest) {
  const expected = process.env.GALLERY_ADMIN_ORIGIN || (process.env.NODE_ENV !== 'production' ? request.nextUrl.origin : '');
  return Boolean(expected) && request.headers.get('origin') === expected && request.headers.get('sec-fetch-site') !== 'cross-site';
}
function clearSession(response: NextResponse) {
  response.cookies.set(sessionCookie(), '', { ...cookieOptions(), maxAge: 0 }); return response;
}
export async function galleryProxy(request: NextRequest, parts: string[]) {
  const method = request.method;
  if (method !== 'GET' && !mutationAllowed(request)) return json({ error: 'This request must come from the gallery website.' }, 403);
  if (parts.length === 1 && parts[0] === 'logout' && method === 'POST' && !request.nextUrl.search) {
    const token = request.cookies.get(sessionCookie())?.value;
    if (!token || tokenLifetime(token) < 1) return clearSession(json({ ok: true }));
    try {
      const response = await backendFetch('auth/logout', token, { method: 'POST' });
      return clearSession(response.ok || response.status === 401 ? json({ ok: true }) :
        json({ error: 'Browser session cleared. Server revocation could not be confirmed. The existing token expires within 15 minutes.' }, 503));
    } catch { return clearSession(json({ error: 'Browser session cleared. Server revocation could not be confirmed.' }, 503)); }
  }
  const login = parts.length === 1 && parts[0] === 'login' && method === 'POST';
  const path = login ? 'auth/login' : allowedRoute(method, parts);
  if (!path || request.nextUrl.search) return json({ error: 'Unsupported gallery operation.' }, 404);
  const token = request.cookies.get(sessionCookie())?.value;
  if (!login && (!token || tokenLifetime(token) < 1)) return clearSession(json({ error: errorMessage(401) }, 401));
  let body;
  if (method !== 'GET') {
    try { body = await smallJson(request); } catch { return json({ error: 'Send a small JSON request with valid fields.' }, 400); }
  }
  try {
    const response = await backendFetch(path, login ? undefined : token, { method, ...(body ? { body: JSON.stringify(body) } : {}) });
    if (!response.ok) {
      const result = json({ error: login && response.status === 401 ? 'Email or password is incorrect.' : errorMessage(response.status) }, response.status >= 400 && response.status < 600 ? response.status : 502);
      if (response.status === 429) {
        const retry = Number(response.headers.get('retry-after'));
        result.headers.set('Retry-After', String(Number.isInteger(retry) && retry > 0 && retry <= 900 ? retry : 60));
      }
      return response.status === 401 ? clearSession(result) : result;
    }
    if (login) {
      const value = await response.json();
      const seconds = typeof value.accessToken === 'string' ? tokenLifetime(value.accessToken) : 0;
      if (!seconds) return clearSession(json({ error: 'Authentication is temporarily unavailable.' }, 502));
      const verified = await backendFetch('admin/me', value.accessToken);
      if (!verified.ok) return clearSession(json({ error: errorMessage(verified.status) }, verified.status));
      const admin = await verified.json();
      if (!['ADMIN', 'SUPER_ADMIN'].includes(admin.role)) return clearSession(json({ error: errorMessage(403) }, 403));
      const result = json({ admin: { id: admin.id, email: admin.email, role: admin.role }, expiresIn: seconds });
      result.cookies.set(sessionCookie(), value.accessToken, { ...cookieOptions(), maxAge: seconds });
      return result;
    }
    if (parts[0] === 'photos' && parts[2] === 'preview') {
      if (!response.headers.get('content-type')?.startsWith('image/webp')) return json({ error: 'Preview unavailable.' }, 502);
      return new NextResponse(response.body, { headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff', 'Cross-Origin-Resource-Policy': 'same-origin' } });
    }
    return json(await response.json(), response.status);
  } catch { return json({ error: 'The gallery service is temporarily unavailable. Retry shortly.' }, 503); }
}
