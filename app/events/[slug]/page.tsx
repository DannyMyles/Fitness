import type { Metadata } from 'next';
import EventDetailClient from './EventDetailClient';
import { EventItem } from '@/app/api_services/eventService';
import { backendFetch } from '@/app/lib/backend';

interface Props {
  params: Promise<{ slug: string }>;
}

// generateMetadata runs server-side, so it calls the backend directly via
// backendFetch (absolute URL + this app's X-App-Key) rather than app/lib/api.ts.

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await backendFetch(`/api/v1/events/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Event not found');
    const { event } = (await res.json()) as { event: EventItem };
    return {
      title: event.title,
      description: event.description,
      alternates: { canonical: `/events/${slug}` },
      openGraph: {
        title: `${event.title} | Marksila254`,
        description: event.description,
        url: `/events/${slug}`,
        images: event.image ? [{ url: event.image }] : undefined,
      },
    };
  } catch {
    return { title: 'Event' };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <EventDetailClient slug={slug} />;
}
