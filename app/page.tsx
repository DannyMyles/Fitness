import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  description:
    'Professional personal training, group fitness classes, and nutrition coaching with Marksila254 in Nairobi, Kenya. Book a free consultation today.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Marksila254 | Professional Fitness Instructor & Personal Trainer',
    description:
      'Professional personal training, group fitness classes, and nutrition coaching with Marksila254 in Nairobi, Kenya.',
    url: '/',
  },
};

export default function Page() {
  return <HomeClient />;
}
