import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Personal training, group classes, nutrition coaching, and more with Marksila254 in Nairobi. Professional fitness services tailored to your goals.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Training Services | Marksila254',
    description:
      'Personal training, group classes, nutrition coaching, and more — professional fitness services tailored to your goals.',
    url: '/services',
  },
};

export default function Page() {
  return <ServicesClient />;
}
