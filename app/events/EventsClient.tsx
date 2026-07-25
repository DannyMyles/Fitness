'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar, Clock, MapPin, Users,
  Zap, ArrowRight, Heart
} from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import CtaSection from '@/components/ui/CtaSection';

const events = [
  {
    id: 1,
    title: 'Morning HIIT Bootcamp',
    date: '2024-03-15',
    time: '6:00 AM - 7:00 AM',
    location: 'Nairobi Fitness Center',
    spots: 15,
    maxSpots: 20,
    price: 500,
    image: '/images/012.jpeg',
    description: 'Start your day with an intense high-intensity interval training session.',
    trainer: 'Marksila254',
    popular: true
  },
  {
    id: 2,
    title: 'Weekend Strength Workshop',
    date: '2024-03-16',
    time: '9:00 AM - 11:00 AM',
    location: 'Power House Gym',
    spots: 8,
    maxSpots: 12,
    price: 1500,
    image: '/images/013.jpeg',
    description: 'Learn proper form and techniques for maximum muscle growth.',
    trainer: 'Marksila254',
    popular: true
  },
  {
    id: 3,
    title: 'Weight Loss Challenge Launch',
    date: '2024-03-20',
    time: '5:00 PM - 7:00 PM',
    location: 'Wellness Studio',
    spots: 25,
    maxSpots: 30,
    price: 5000,
    image: '/images/014.jpg',
    description: 'Join our 8-week comprehensive weight loss program with nutrition and training.',
    trainer: 'Marksila254',
    popular: true
  },
  {
    id: 4,
    title: 'Yoga & Stretch Session',
    date: '2024-03-22',
    time: '7:00 AM - 8:00 AM',
    location: 'Zen Studio',
    spots: 18,
    maxSpots: 20,
    price: 800,
    image: '/images/015.JPG',
    description: 'Improve flexibility and recovery with our relaxing yoga session.',
    trainer: 'Guest Trainer',
    popular: false
  },
  {
    id: 5,
    title: 'Nutrition Masterclass',
    date: '2024-03-25',
    time: '3:00 PM - 5:00 PM',
    location: 'Marksila254 Studio',
    spots: 12,
    maxSpots: 15,
    price: 2000,
    image: '/images/016.PNG',
    description: 'Learn the fundamentals of nutrition for fitness and health.',
    trainer: 'Marksila254',
    popular: false
  },
  {
    id: 6,
    title: 'Outdoor Bootcamp',
    date: '2024-03-30',
    time: '6:00 AM - 7:30 AM',
    location: 'Uhuru Park',
    spots: 20,
    maxSpots: 25,
    price: 600,
    image: '/images/017.PNG',
    description: 'Train outdoors with bodyweight exercises in nature.',
    trainer: 'Marksila254',
    popular: false
  }
];

const upcomingHighlights = [
  { month: 'March', count: 4 },
  { month: 'April', count: 6 },
  { month: 'May', count: 8 },
];

const processSteps = [
  { step: '01', title: 'Choose Event', description: 'Browse our upcoming events and select one that fits your goals.' },
  { step: '02', title: 'Register', description: 'Click the Register button and fill in your details to secure your spot.' },
  { step: '03', title: 'Payment', description: 'Complete payment securely to confirm your registration.' },
  { step: '04', title: 'Attend', description: 'Show up ready to sweat and transform!' }
];

export default function EventsClient() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Animate stats on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.5 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const isUpcoming = (dateStr: string) => {
    return new Date(dateStr) >= new Date();
  };

  const upcomingEvents = events.filter((e) => isUpcoming(e.date));
  const eventsJsonLd = upcomingEvents.map((event) => ({
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
      availability: 'https://schema.org/InStock',
    },
    performer: {
      '@type': 'Person',
      name: event.trainer,
    },
  }));

  return (
    <div className="pt-0">
      {eventsJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
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
                  {item.count}+
                </div>
                <div className="text-gray-600">Events in {item.month}</div>
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
              <div 
                key={index}
                className="relative text-center group animate-on-scroll"
              >
                {/* Step Card Container */}
                <div className="relative bg-gray-50 rounded-3xl p-8 transition-all duration-500 group-hover:bg-white group-hover:shadow-fitness-lg group-hover:-translate-y-2">
                  {/* Step Circle */}
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 group-hover:scale-110 transition-transform duration-500">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-3 border-dashed border-fitness-primary/30 animate-rotate"></div>
                    {/* Inner Circle */}
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-fitness-primary to-fitness-primary-dark flex items-center justify-center shadow-fitness">
                      <span className="text-2xl font-bold text-white drop-shadow-lg">{item.step}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{item.description}</p>
                </div>
                
                {/* Arrow Connector */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div 
                key={event.id}
                className={`service-card group ${hoveredCard === event.id ? 'ring-2 ring-fitness-primary' : ''}`}
                onMouseEnter={() => setHoveredCard(event.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Popular Badge */}
                {event.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-fitness-primary to-fitness-primary-dark text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}
                
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden service-card-image">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-br from-fitness-primary to-fitness-primary-dark text-white px-4 py-2 rounded-xl font-bold shadow-fitness">
                      KES {event.price}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-2">{event.description}</p>
                  
                  {/* Event Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-800">
                      <div className="w-6 h-6 bg-fitness-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar size={12} className="text-fitness-primary" />
                      </div>
                      {formatDate(event.date)}
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
                      {event.spots}/{event.maxSpots} spots left
                    </div>
                  </div>

                  {/* Trainer & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-fitness-primary to-fitness-primary-dark rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {event.trainer.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Trainer</p>
                        <p className="text-sm font-medium text-gray-700">{event.trainer}</p>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="flex items-center gap-1 text-fitness-primary font-medium hover:text-fitness-primary-dark transition-colors"
                    >
                      Register
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

