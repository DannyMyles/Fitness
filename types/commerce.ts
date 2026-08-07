// Types for the mark254-commerce-api backend (products/categories/orders).
// Mirrors the serialized shapes returned by that service — see
// mark254-commerce-api/src/routes/{products,categories,orders}.ts

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  productCount: number;
}

export interface ProductImageItem {
  url: string;
  color: string | null;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number; // KES
  images: string[];
  imageDetails: ProductImageItem[]; // parallel to images, carries an optional per-image color tag
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  isNew: boolean;
  category?: { id: number; name: string; slug: string };
  createdAt: string;
}

export interface ProductDetail extends Product {
  related: Product[];
}

export interface OrderItemInput {
  productId: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItemInput[];
}

export interface OrderItem {
  id: number;
  productId: number | null;
  name: string;
  price: number;
  quantity: number;
  size: string | null;
  color: string | null;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  paymentRef: string | null;
  // Raw Safaricom STK push result, kept for admin visibility into why a
  // payment failed (cancelled, insufficient funds, timed out, etc.).
  paymentResultCode: number | null;
  paymentResultDesc: string | null;
  // Full M-Pesa transaction detail, populated once a payment has a
  // paymentRef. phoneNumber/transactionAmount/transactionTime are only
  // filled in once a real STK callback lands (not via the query-poll
  // fallback), so they may be null even when paymentStatus is 'paid'.
  mpesa: {
    billReferenceNumber: string;
    phoneNumber: string | null;
    firstName: string;
    transactionAmount: number | null;
    transactionId: string | null;
    transactionType: string;
    transactionTime: string | null;
    businessShortCode: string;
  } | null;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderPaymentStatus {
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentFailureReason?: string;
}

export interface PaymentInitiation {
  status: PaymentStatus;
  reference: string;
  message: string;
}

export interface CreateOrderResponse {
  order: Order;
  payment: PaymentInitiation;
}
