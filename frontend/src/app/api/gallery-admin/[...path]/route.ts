import type { NextRequest } from 'next/server';
import { galleryProxy } from '@/lib/gallery-admin/proxy';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
function handle(request: NextRequest, { params }: { params: { path: string[] } }) { return galleryProxy(request, params.path); }
export { handle as GET, handle as POST, handle as PATCH, handle as PUT };
