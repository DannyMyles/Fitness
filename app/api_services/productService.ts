// productService.ts — talks to the mark254-commerce-api backend.
// Public reads hit that API directly (no secrets involved). Admin
// mutations go through the same-origin /api/commerce/admin proxy so the
// shared admin key never reaches the browser — see
// app/api/commerce/admin/[...path]/route.ts.

import { Category, Product, ProductDetail } from '@/types/commerce';

const COMMERCE_API_URL = process.env.NEXT_PUBLIC_COMMERCE_API_URL || 'http://localhost:4000';

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  images: string[];
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  featured?: boolean;
  isNew?: boolean;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  featured?: boolean;
}

export const productService = {
  getCategories: async (): Promise<Category[]> => {
    const res = await fetch(`${COMMERCE_API_URL}/api/categories`, { cache: 'no-store' });
    return handle<Category[]>(res);
  },

  getProducts: async (filters: ProductFilters = {}): Promise<Product[]> => {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All') params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);
    if (filters.featured) params.set('featured', 'true');
    const query = params.toString();
    const res = await fetch(`${COMMERCE_API_URL}/api/products${query ? `?${query}` : ''}`, {
      cache: 'no-store',
    });
    return handle<Product[]>(res);
  },

  getProduct: async (slug: string): Promise<ProductDetail> => {
    const res = await fetch(`${COMMERCE_API_URL}/api/products/${slug}`, { cache: 'no-store' });
    return handle<ProductDetail>(res);
  },

  // Admin (routed through the Next.js server proxy, session-gated)
  admin: {
    createProduct: async (data: ProductInput): Promise<Product> => {
      const res = await fetch('/api/commerce/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handle<Product>(res);
    },

    updateProduct: async (id: number, data: Partial<ProductInput>): Promise<Product> => {
      const res = await fetch(`/api/commerce/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handle<Product>(res);
    },

    deleteProduct: async (id: number): Promise<void> => {
      const res = await fetch(`/api/commerce/admin/products/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed with status ${res.status}`);
      }
    },

    createCategory: async (data: { name: string; description?: string }): Promise<Category> => {
      const res = await fetch('/api/commerce/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handle<Category>(res);
    },
  },
};
