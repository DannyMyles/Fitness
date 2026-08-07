'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Calendar, Clock, MapPin, Users,
  Zap, ArrowRight, Heart, Loader2, AlertCircle, RefreshCw
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import CtaSection from '@/components/ui/CtaSection';
import EmptyState from '@/components/ui/EmptyState';
import EventRegistrationModal from '@/components/events/EventRegistrationModal';
import { eventService, EventItem } from '@/app/api_services/eventService';

const processSteps = [
  { step: '01', title: 'Choose Event', description: 'Browse our upcoming events and select one that fits your goals.' },
  { step: '02', title: 'Register', description: 'Click the Register button and fill in your details to secure your spot.' },
  { step: '03', title: 'Payment', description: 'Complete payment securely to confirm your registration.' },
  { step: '04', title: 'Attend', description: 'Show up ready to sweat and transform!' }
];

export default function EventsClient() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const [registeringEvent, setRegisteringEvent] = useState<EventItem | null>(null);

  const fetchEvents = () => {
    setIsLoading(true);
    setError('');
    eventService
      .getAllEvents({ upcoming: true })
      .then((res) => setEvents(res.events))
      .catch(() => setError('Could not load events. Please try again shortly.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const eventsThisMonth = events.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;
  const eventsNextMonth = events.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === nextMonth.getFullYear() && d.getMonth() === nextMonth.getMonth();
  }).length;
  const upcomingHighlights = [
    { month: 'This Month', count: eventsThisMonth },
    { month: 'Next Month', count: eventsNextMonth },
  ];

  const handleRegisterClick = (event: EventItem) => {
    if (status !== 'authenticated') {
      router.push('/login?callbackUrl=/events');
      return;
    }
    setRegisteringEvent(event);
  };

  const eventsJsonLd = events.map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    location: {
      '@type': 'Place',
      name: event.location,
      address: 'Nairobi, Kenya',
    },
    description: event.description,
    offers: {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'KES',
      availability: event.spotsRemaining > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    },
    performer: event.trainers.map((name) => ({
      '@type': 'Person',
      name,
    })),
  }));

  return (
    <div className="pt-0">
      {eventsJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
        />
      )}

      {registeringEvent && (
        <EventRegistrationModal
          event={registeringEvent}
          onClose={() => setRegisteringEvent(null)}
          onRegistered={fetchEvents}
        />
      )}

      {/* Hero Section */}
      <PageHero
        badge="Upcoming Sessions"
        badgeIcon={Calendar}
        title="Fitness Events"
        subtitle="Join our upcoming training sessions, workshops, and fitness events. Reserve your spot and be part of the community."
      />
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-fitness-light via-white to-fitness-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {upcomingHighlights.map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-soft hover:shadow-fitness transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-fitness-primary/20 to-fitness-primary-dark/20 flex items-center justify-center">
                  <Calendar size={28} className="text-fitness-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {item.count}
                </div>
                <div className="text-gray-600">Events {item.month}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Book Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge mb-4">
              <Zap size={16} />
              <span>Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to <span className="text-gradient-mixed">Book</span> an Event
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Booking your spot is easy. Follow these simple steps to secure your place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <div key={index} className="relative text-center group">
                <div className="relative bg-gray-50 rounded-3xl p-8 transition-all duration-500 group-hover:bg-white group-hover:shadow-fitness-lg group-hover:-translate-y-2">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-full border-3 border-dashed border-fitness-primary/30 animate-rotate"></div>
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-fitness-primary to-fitness-primary-dark flex items-center justify-center shadow-fitness">
                      <span className="text-2xl font-bold text-white drop-shadow-lg">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{item.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[calc(100%+1rem)] text-fitness-primary">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 bg-gradient-to-br from-fitness-light via-white to-fitness-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge mb-4">
              <Calendar size={16} />
              <span>Reserve Your Spot</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming <span className="text-gradient-mixed">Events</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't miss out on these exciting fitness opportunities. Limited spots available!
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <Loader2 size={32} className="animate-spin mb-4 text-fitness-primary" />
              <p>Loading events...</p>
            </div>
          ) : error ? (
            <EmptyState
              icon={AlertCircle}
              title="Couldn't load events"
              description={error}
              action={{ label: 'Try Again', icon: RefreshCw, onClick: fetchEvents }}
            />
          ) : events.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No upcoming events right now"
              description="Check back soon — new sessions and workshops are added regularly."
              action={{ label: 'Get in Touch', href: '/contact' }}
            />
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`service-card group ${hoveredCard === event.id ? 'ring-2 ring-fitness-primary' : ''}`}
                onMouseEnter={() => setHoveredCard(event.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {event.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-fitness-primary to-fitness-primary-dark text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}

                <Link href={`/events/${event.slug}`} className="relative h-52 overflow-hidden service-card-image block">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-br from-fitness-primary to-fitness-primary-dark text-white px-4 py-2 rounded-xl font-bold shadow-fitness">
                      {event.price > 0 ? `KES ${event.price.toLocaleString()}` : 'Free'}
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    <Link href={`/events/${event.slug}`} className="hover:text-fitness-primary transition-colors">
                      {event.title}
                    </Link>
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-800">
                      <div className="w-6 h-6 bg-fitness-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar size={12} className="text-fitness-primary" />
                      </div>
                      {eventService.formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-800">
                      <div className="w-6 h-6 bg-fitness-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock size={12} className="text-fitness-primary" />
                      </div>
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-800">
                      <div className="w-6 h-6 bg-fitness-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin size={12} className="text-fitness-primary" />
                      </div>
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-800">
                      <div className="w-6 h-6 bg-fitness-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users size={12} className="text-fitness-primary" />
                      </div>
                      {event.spotsRemaining > 0 ? `${event.spotsRemaining}/${event.maxSpots} spots left` : 'Fully booked'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-fitness-primary to-fitness-primary-dark rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {event.trainers[0]?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        {event.trainers.length > 1 && (
                          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-fitness-primary">
                            +{event.trainers.length - 1}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">{event.trainers.length > 1 ? 'Trainers' : 'Trainer'}</p>
                        <p className="text-sm font-medium text-gray-700 truncate">{event.trainers.join(', ')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRegisterClick(event)}
                      disabled={event.spotsRemaining <= 0}
                      className="flex items-center gap-1 text-fitness-primary font-medium hover:text-fitness-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {event.spotsRemaining <= 0 ? 'Full' : 'Register'}
                      {event.spotsRemaining > 0 && (
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      <CtaSection
        badge="Custom Events"
        badgeIcon={Heart}
        title="Host Your Own Event"
        subtitle="Looking to organize a corporate fitness event, private training session, or special workshop? I can customize an experience for your group."
        primary={{ label: 'Contact for Custom Events', href: '/contact' }}
      />
    </div>
  );
}
