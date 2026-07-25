import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description:
    'Explore moments from training sessions, client transformations, and fitness events with Marksila254 in Nairobi, Kenya.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Photo Gallery | Marksila254',
    description: 'Explore moments from training sessions, client transformations, and fitness events.',
    url: '/gallery',
  },
};

export default function Page() {
  return <GalleryClient />;
}
