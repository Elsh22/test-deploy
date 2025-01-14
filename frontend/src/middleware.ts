import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Static public paths
const staticPublicPaths = [
  '/',
  '/aboutus',
  '/unimembership',
  '/non_profitmembership',
  '/non_profitsignup',
  '/event',        // Event listing page
  '/blog',         // Blog listing page
  '/partnership',
  '/contactus',
  '/newchapter',
  '/resources',
  '/gallery',
  '/ITCommittee',
  '/ACACommittee',
  '/CommCommittee',
  '/ProfCommittee',
  '/SocCommittee',
  '/Denied',
  '/scholarship',
  '/admin/login'   // Making login page public
];

const PROTECTED_PATHS = [
  '/admin/dashboard',
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Handle dynamic routes
  const isDynamicPublicRoute = 
    path.startsWith('/blog/') || 
    path.startsWith('/event/') || 
    path.startsWith('/unimembership/');

  // Check if path is a protected dashboard route
  const isProtectedPath = PROTECTED_PATHS.some(protectedPath => 
    path.startsWith(protectedPath)
  );
  
  // Get authentication token
  const token = request.cookies.get('jwt')?.value || 
                request.headers.get('authorization')?.split(' ')[1];

  // Allow access to public paths and dynamic routes
  if (staticPublicPaths.includes(path) || isDynamicPublicRoute) {
    return NextResponse.next();
  }

  // Handle protected routes
  if (isProtectedPath) {
    if (!token) {
      // Redirect to login if no token present
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', path);
      return NextResponse.redirect(loginUrl);
    }
    
    try {
      // Here you could add additional token verification if needed
      return NextResponse.next();
    } catch (error) {
      // If token verification fails, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // For any other paths, redirect to homepage
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    
    // Include all static public paths
    '/',
    '/aboutus',
    '/unimembership',
    '/non_profitmembership',
    '/non_profitsignup',
    '/event',
    '/partnership',
    '/blog',
    '/contactus',
    '/newchapter',
    '/resources',
    '/gallery',
    '/ITCommittee',
    '/ACACommittee',
    '/CommCommittee',
    '/ProfCommittee',
    '/SocCommittee',
    '/Denied',
    '/scholarship',
    
    // Include dynamic routes
    '/unimembership/:path*',
    '/blog/:path*',
    '/event/:path*',

    
    // Include admin routes
    '/admin/:path*'
  ],
};