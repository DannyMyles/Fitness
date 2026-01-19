'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, ChevronRight, Star } from 'lucide-react';

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
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
    description: 'Start your day with an intense high-intensity interval training session.',
    trainer: 'Marksila254'
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
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
    description: 'Learn proper form and techniques for maximum muscle growth.',
    trainer: 'Marksila254'
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
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600',
    description: 'Join our 8-week comprehensive weight loss program with nutrition and training.',
    trainer: 'Marksila254'
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
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
    description: 'Improve flexibility and recovery with our relaxing yoga session.',
    trainer: 'Guest Trainer'
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
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600',
    description: 'Learn the fundamentals of nutrition for fitness and health.',
    trainer: 'Marksila254'
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
    image: 'https://images.unsplash.com/photo-1535743686920-55e4145369b9?w=600',
    description: 'Train outdoors with bodyweight exercises in nature.',
    trainer: 'Marksila254'
  }
];

const upcomingHighlights = [
  { month: 'March', count: 4 },
  { month: 'April', count: 6 },
  { month: 'May', count: 8 },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const isUpcoming = (dateStr: string) => {
    return new Date(dateStr) >= new Date();
  };

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark/90 to-fitness-primary/70"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Fitness <span className="text-fitness-accent">Events</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Join our upcoming training sessions, workshops, and fitness events. 
              Reserve your spot and be part of the community.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {upcomingHighlights.map((item, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-fitness-primary">{item.count}</div>
                <div className="text-gray-600">Events in {item.month}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-fitness-dark mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't miss out on these exciting fitness opportunities. Limited spots available!
            </p>
          </div>

          <div className="space-y-6">
            {events.filter(e => isUpcoming(e.date)).map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="relative h-48 md:h-auto">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:col-span-2 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-fitness-dark mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-fitness-primary">KES {event.price}</div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-fitness-primary" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-fitness-primary" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-fitness-primary" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-fitness-primary" />
                        {event.spots}/{event.maxSpots} spots left
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-fitness-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-fitness-primary font-medium text-sm">
                            {event.trainer.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">by {event.trainer}</span>
                      </div>
                      <Link 
                        href={`/events/${event.id}`}
                        className="flex items-center gap-2 text-fitness-primary font-medium hover:text-fitness-primaryDark transition-colors"
                      >
                        Register Now
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Events Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-fitness-dark mb-6">
              Host Your Own Event
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Looking to organize a corporate fitness event, private training session, or special workshop? 
              I can customize an experience for your group.
            </p>
            <Link href="/contact" className="btn-fitness">
              Contact for Custom Events
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-fitness-primary to-fitness-primaryDark text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Calendar size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Never Miss an Event
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Subscribe to get notified about new events, early bird discounts, and exclusive access.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-fitness-dark focus:outline-none focus:ring-2 focus:ring-fitness-accent"
              />
              <button
                type="submit"
                className="btn-accent whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

