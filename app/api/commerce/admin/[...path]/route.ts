import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/app/lib/auth';
import { backendFetch } from '@/app/lib/backend';

// Proxies admin-only commerce requests (product/category CRUD, order list/status
// updates) to the shared mark254-commerce-api backend, attaching this app's
// server-only admin key (COMMERCE_ADMIN_KEY — the `fitness` key, see the
// backend's `npm run app`). The key never reaches browser JS; the client only
// talks to this same-origin route, gated by the NextAuth admin session.
const COMMERCE_ADMIN_KEY = process.env.COMMERCE_ADMIN_KEY || '';

async function proxy(req: NextRequest, path: string[]) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const targetPath = `/api/${path.map(encodeURIComponent).join('/')}${req.nextUrl.search}`;
  const hasBody = !['GET', 'HEAD', 'DELETE'].includes(req.method);
  // Multipart bodies (product image uploads) must be forwarded as FormData
  // with no explicit Content-Type — fetch sets the correct multipart
  // boundary itself. Everything else keeps going through as JSON, unchanged.
  const isMultipart = (req.headers.get('content-type') || '').startsWith('multipart/form-data');

  const response = await backendFetch(targetPath, {
    cache: 'no-store',
    method: req.method,
    headers: {
      'x-admin-key': COMMERCE_ADMIN_KEY,
      ...(isMultipart ? {} : { 'Content-Type': 'application/json' }),
    },
    body: !hasBody ? undefined : isMultipart ? await req.formData() : await req.text(),
  });

  if (response.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  // CSV export (and any other non-JSON admin response) — stream it through
  // as-is with its original headers (Content-Type, Content-Disposition)
  // rather than forcing it through response.json(), which would throw.
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const body = await response.arrayBuffer();
    const headers = new Headers();
    headers.set('Content-Type', contentType || 'application/octet-stream');
    const disposition = response.headers.get('content-disposition');
    if (disposition) headers.set('Content-Disposition', disposition);
    return new NextResponse(body, { status: response.status, headers });
  }

  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await params).path);
}
export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await params).path);
}
export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await params).path);
}
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await params).path);
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, (await params).path);
}
