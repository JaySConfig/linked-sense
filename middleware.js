// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Skip auth for test routes
  const { pathname } = request.nextUrl;
  
  // List of public paths that should bypass authentication
  const publicPaths = [
    '/test',
    '/results',
    '/api/generate-strategy'
  ];
  
  // Check if the current path starts with any of the public paths
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  if (isPublicPath) {
    // Allow the request to proceed without authentication
    return NextResponse.next();
  }

  // For other routes, let your existing authentication logic handle it
  // The default behavior when returning nothing is to continue processing
}

export const config = {
  // Specify which routes this middleware should run on
  matcher: [
    '/test/:path*',
    '/results/:path*',
    '/api/generate-strategy',
    // Add your existing authenticated routes here
    '/dashboard/:path*'
  ],
};