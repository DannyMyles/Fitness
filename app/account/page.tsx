import type { Metadata } from 'next';
import AccountClient from './AccountClient';

export const metadata: Metadata = {
  title: 'My Account',
  description: 'View your Mark 254 Active Wear orders and event tickets.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AccountClient />;
}
