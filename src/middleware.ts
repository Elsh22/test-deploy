import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const publicPaths = ['/', '/gallery', '/ITCommittee', '/ACACommittee', '/CommCommittee', '/ProfCommittee', '/SocCommittee', '/Denied'];
const privatePaths = ['/Image', '/chats', '/contacts', '/register', '/login'];
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Your secret from the NextAuth configuration
  const secret = process.env.NEXTAUTH_SECRET;

  // Try to get the token if present
  const token = await getToken({ req: request, secret });

  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // If the path is private and there's no token, redirect to login
  if (privatePaths.includes(path) && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Optional: If the user is authenticated and tries to access public paths, redirect them to a default private path
  // if (publicPaths.includes(path) && token) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  // Allow the request to continue as is if none of the above conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    ...publicPaths, // Spread in the public paths
    ...privatePaths, // Spread in the private paths
  ],
};