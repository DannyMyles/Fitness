import { NextResponse, type NextRequest } from 'next/server';

/**
 * Forwards this site's backend paths to the shared API and stamps them with
 * this app's key (see app/lib/backend.ts). Any X-App-Key a browser sends is
 * overwritten, so requests through this origin always act as `fitness`.
 *
 * `/api/auth/*` (NextAuth) and `/api/commerce/*` (admin proxy) are this
 * app's own route handlers and are deliberately not matched.
 */
const BACKEND_URL = (process.env.BACKEND_URL || 'http://localhost:4000').replace(/\/+$/, '');
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY || 'fitness';

export function proxy(req: NextRequest) {
  const target = new URL(`${req.nextUrl.pathname}${req.nextUrl.search}`, BACKEND_URL);
  const headers = new Headers(req.headers);
  headers.set('x-app-key', APP_KEY);
  headers.delete('x-admin-key');
  return NextResponse.rewrite(target, { request: { headers } });
}

export const config = {
  matcher: ['/api/v1/:path*', '/api/orders/:path*', '/api/products/:path*', '/api/categories/:path*', '/uploads/:path*'],
};
