import type { Metadata } from 'next';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Official Mark 254 Active Wear — apparel, drinkware, and training gear. Shop t-shirts, hoodies, joggers, bottles, and more.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Mark 254 Shop | Marksila254',
    description: 'Official Mark 254 Active Wear — apparel, drinkware, and training gear.',
    url: '/shop',
  },
};

export default function Page() {
  return <ShopClient />;
}
