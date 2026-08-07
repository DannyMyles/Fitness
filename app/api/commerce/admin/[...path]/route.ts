import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/app/lib/auth';

// Proxies admin-only commerce requests (product/category CRUD, order list/status
// updates) to the separate mark254-commerce-api backend, attaching the
// server-only ADMIN key. This keeps that shared secret out of browser JS —
// the client only ever talks to this same-origin route, gated by the
// existing NextAuth admin session.
const COMMERCE_API_URL = process.env.COMMERCE_API_URL || 'http://localhost:4000';
const COMMERCE_ADMIN_KEY = process.env.COMMERCE_ADMIN_KEY || '';

async function proxy(req: NextRequest, path: string[]) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const targetUrl = `${COMMERCE_API_URL}/api/${path.join('/')}${req.nextUrl.search}`;
  const hasBody = !['GET', 'HEAD', 'DELETE'].includes(req.method);
  // Multipart bodies (product image uploads) must be forwarded as FormData
  // with no explicit Content-Type — fetch sets the correct multipart
  // boundary itself. Everything else keeps going through as JSON, unchanged.
  const isMultipart = (req.headers.get('content-type') || '').startsWith('multipart/form-data');

  const response = await fetch(targetUrl, {
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
