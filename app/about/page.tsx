import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Marksila254 — a certified personal trainer with over 10 years of experience helping clients in Nairobi transform their lives through fitness, nutrition, and sustainable lifestyle changes.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Marksila254 | Certified Personal Trainer',
    description:
      'Certified personal trainer with over 10 years of experience helping clients in Nairobi achieve their health and wellness goals.',
    url: '/about',
  },
};

export default function Page() {
  return <AboutClient />;
}
