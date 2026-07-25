import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/commerce';

export interface CartLine {
  productId: number;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (productId: number, size?: string, color?: string) => void;
  setQuantity: (productId: number, quantity: number, size?: string, color?: string) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
}

function sameLine(a: CartLine, productId: number, size?: string, color?: string) {
  return a.productId === productId && a.size === size && a.color === color;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],

      addItem: (product, quantity = 1, size, color) => {
        set((state) => {
          const existing = state.lines.find((l) => sameLine(l, product.id, size, color));
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                sameLine(l, product.id, size, color) ? { ...l, quantity: l.quantity + quantity } : l
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0] ?? '',
                size,
                color,
                quantity,
              },
            ],
          };
        });
      },

      removeItem: (productId, size, color) => {
        set((state) => ({
          lines: state.lines.filter((l) => !sameLine(l, productId, size, color)),
        }));
      },

      setQuantity: (productId, quantity, size, color) => {
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => !sameLine(l, productId, size, color))
              : state.lines.map((l) => (sameLine(l, productId, size, color) ? { ...l, quantity } : l)),
        }));
      },

      clear: () => set({ lines: [] }),

      subtotal: () => get().lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
      count: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
    }),
    { name: 'mark254-cart' }
  )
);
