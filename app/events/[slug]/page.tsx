import type { Metadata } from 'next';
import EventDetailClient from './EventDetailClient';
import { EventItem } from '@/app/api_services/eventService';

interface Props {
  params: Promise<{ slug: string }>;
}

// generateMetadata runs server-side with no browser origin to resolve a
// relative URL against, so it can't go through app/lib/api.ts (built for
// client-side use — relative fetch URLs, NextAuth session lookups). Hit the
// backend directly with an absolute URL instead, same as next.config.js's
// rewrites and app/sitemap.ts already do for other server-side data needs.
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/events/${slug}`, { cache: 'no-store' });
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
