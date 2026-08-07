// orderService.ts — talks to the mark254-commerce-api backend.
// Checkout (createOrder) requires the customer to be logged in on the
// frontend (see CartClient's checkout gate) — it goes through the same-origin
// authenticated api.ts client so the order gets associated with their
// account. The backend route itself still supports guest checkout via
// optionalAuth. Listing/updating orders (admin) goes through the separate
// admin-key proxy — see app/api/commerce/admin/[...path]/route.ts.

import { CreateOrderInput, CreateOrderResponse, Order, OrderPaymentStatus, OrderStatus, PaymentStatus } from '@/types/commerce';
import { api } from '../lib/api';

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const orderService = {
  createOrder: async (input: CreateOrderInput): Promise<CreateOrderResponse> => {
    return api.protected.orders.create(input) as Promise<CreateOrderResponse>;
  },

  getMine: async (): Promise<Order[]> => {
    return api.protected.orders.mine() as Promise<Order[]>;
  },

  getPaymentStatus: async (id: number): Promise<OrderPaymentStatus> => {
    return api.protected.orders.status(id) as Promise<OrderPaymentStatus>;
  },

  retryPayment: async (id: number): Promise<CreateOrderResponse> => {
    return api.protected.orders.retry(id) as Promise<CreateOrderResponse>;
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

    exportCsv: async (): Promise<Blob> => {
      const res = await fetch('/api/commerce/admin/orders/export', { cache: 'no-store' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed with status ${res.status}`);
      }
      return res.blob();
    },
  },
};
