// orderService.ts — talks to the mark254-commerce-api backend.
// Checkout (createOrder) is a public, unauthenticated endpoint (guest
// checkout). Listing/updating orders is admin-only and goes through the
// same-origin proxy — see app/api/commerce/admin/[...path]/route.ts.

import { CreateOrderInput, CreateOrderResponse, Order, OrderStatus, PaymentStatus } from '@/types/commerce';

const COMMERCE_API_URL = process.env.NEXT_PUBLIC_COMMERCE_API_URL || 'http://localhost:4000';

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const orderService = {
  createOrder: async (input: CreateOrderInput): Promise<CreateOrderResponse> => {
    const res = await fetch(`${COMMERCE_API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    return handle<CreateOrderResponse>(res);
  },

  admin: {
    getOrders: async (): Promise<Order[]> => {
      const res = await fetch('/api/commerce/admin/orders', { cache: 'no-store' });
      return handle<Order[]>(res);
    },

    getOrder: async (id: number): Promise<Order> => {
      const res = await fetch(`/api/commerce/admin/orders/${id}`, { cache: 'no-store' });
      return handle<Order>(res);
    },

    updateStatus: async (
      id: number,
      data: { status?: OrderStatus; paymentStatus?: PaymentStatus }
    ): Promise<Order> => {
      const res = await fetch(`/api/commerce/admin/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handle<Order>(res);
    },
  },
};
