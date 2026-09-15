import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Check if it's one of our targeted image paths
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
    // Intercept these routes
    '/client_logos/:path*',
    '/client-logos/:path*'
  ],
};
