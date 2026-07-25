import type { Metadata } from 'next';
import EventsClient from './EventsClient';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Join upcoming training sessions, workshops, and fitness events with Marksila254 in Nairobi. Reserve your spot and be part of the community.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Fitness Events | Marksila254',
    description:
      'Join upcoming training sessions, workshops, and fitness events with Marksila254 in Nairobi.',
    url: '/events',
  },
};

export default function Page() {
  return <EventsClient />;
}
