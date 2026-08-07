'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import EventRegistrationModal from '@/components/events/EventRegistrationModal';
import { eventService, EventItem } from '@/app/api_services/eventService';

export default function EventDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { status } = useSession();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [registering, setRegistering] = useState(false);

  const fetchEvent = () => {
    setIsLoading(true);
    setError('');
    eventService
      .getEventBySlug(slug)
      .then(setEvent)
      .catch(() => setError('This event could not be found.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const handleRegisterClick = () => {
    if (status !== 'authenticated') {
      router.push(`/login?callbackUrl=/events/${slug}`);
      return;
    }
    setRegistering(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-fitness-primary" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-fitness-dark mb-2">Event Not Found</h1>
        <p className="text-gray-600 mb-6">{error || 'This event could not be found.'}</p>
        <Link href="/events" className="btn-fitness">Back to Events</Link>
      </div>
    );
  }

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    location: { '@type': 'Place', name: event.location, address: 'Nairobi, Kenya' },
    description: event.description,
    offers: {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'KES',
      availability: event.spotsRemaining > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    },
    performer: event.trainers.map((name) => ({ '@type': 'Person', name })),
  };

  return (
    <div className="pt-0 pb-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      {registering && (
        <EventRegistrationModal event={event} onClose={() => setRegistering(false)} onRegistered={fetchEvent} />
      )}

      {/* Hero image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-10">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium mb-4 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Events
            </Link>
            {event.popular && (
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-fitness-primary to-fitness-primary-dark text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                <Sparkles size={12} />
                Popular
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white max-w-3xl">{event.title}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">About This Event</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{event.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {event.trainers.length > 1 ? 'Trainers' : 'Trainer'}
              </h2>
              <div className="flex flex-wrap gap-3">
                {event.trainers.map((trainer) => (
                  <div key={trainer} className="flex items-center gap-2 bg-gray-50 rounded-full pl-1.5 pr-4 py-1.5">
                    <div className="w-8 h-8 bg-gradient-to-br from-fitness-primary to-fitness-primary-dark rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white font-medium text-xs">
                        {trainer.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{trainer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4 sticky top-24">
              <div className="text-2xl font-bold text-fitness-primary">
                {event.price > 0 ? `KES ${event.price.toLocaleString()}` : 'Free'}
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-fitness-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Calendar size={14} className="text-fitness-primary" />
                  </div>
                  {eventService.formatDate(event.date)}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-fitness-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock size={14} className="text-fitness-primary" />
                  </div>
                  {event.time}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-fitness-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-fitness-primary" />
                  </div>
                  {event.location}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-fitness-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Users size={14} className="text-fitness-primary" />
                  </div>
                  {event.spotsRemaining > 0 ? `${event.spotsRemaining}/${event.maxSpots} spots left` : 'Fully booked'}
                </div>
              </div>

              <button
                onClick={handleRegisterClick}
                disabled={event.spotsRemaining <= 0}
                className="w-full btn-fitness disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {event.spotsRemaining <= 0 ? 'Fully Booked' : 'Register for This Event'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
