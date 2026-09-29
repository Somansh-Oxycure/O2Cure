import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // 1. Redirect www to non-www
  const host = request.headers.get('host') || '';
  if (host.startsWith('www.')) {
    const nonWwwHost = host.replace(/^www\./, '');
    url.host = nonWwwHost;
    return NextResponse.redirect(url, 308);
  }
  
  // 2. Check if it's one of our targeted image paths
  if (
    url.pathname.toLowerCase().startsWith('/client_logos/') || 
    url.pathname.toLowerCase().startsWith('/client-logos/')
  ) {
    const originalPathname = url.pathname;
    
    // Convert to lowercase
    let newPathname = originalPathname.toLowerCase();
    
    // Change directory from /client_logos/ to /client-logos/
    newPathname = newPathname.replace(/^\/client_logos\//, '/client-logos/');
    
    // Extract filename to handle underscores and extension replacements safely
    const parts = newPathname.split('/');
    let filename = parts.pop() || '';
    
    if (filename) {
      // Replace underscores with hyphens in the filename
      filename = filename.replace(/_/g, '-');
      
      // Replace old extensions with .webp
      filename = filename.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      parts.push(filename);
      newPathname = parts.join('/');
    }

    // If the path was changed, redirect
    if (newPathname !== originalPathname) {
      url.pathname = newPathname;
      return NextResponse.redirect(url, 308); // 308 Permanent Redirect for SEO
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images etc that don't need www redirect checks)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // We explicitly include the client logos path for the image redirect since we excluded images above
    '/client_logos/:path*',
    '/client-logos/:path*'
  ],
};
