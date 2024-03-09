import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/', '/gallery', '/ITCommittee', '/ACACommittee', '/CommCommittee', '/ProfCommittee', '/SocCommittee', '/Denied', '/scholarship'];
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  // Optional: If the user is authenticated and tries to access public paths, redirect them to a default private path
  // if (publicPaths.includes(path) && token) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }
  // comment: if (token) {
  // Allow the request to continue as is if none of the above conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/api/:path*',
    '/ITCommittee',
    '/ACACommittee',
    '/CommCommittee',
    '/ProfCommittee',
    '/SocCommittee',
    '/gallery',
    '/Denied',
    '/scholarship'
  ],
};