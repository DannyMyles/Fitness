'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, Clock, MapPin, Users, ChevronRight, Star, 
  Zap, CheckCircle, Award, ArrowRight, ArrowLeft, Quote,
  Heart, Shield, Target, DollarSign
} from 'lucide-react';

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

// Testimonials for events page
const testimonials = [
  {
    text: "The HIIT bootcamp was exactly what I needed to jumpstart my fitness journey. Mark's energy is contagious!",
    name: "Sarah Wanjiku",
    role: "Software Engineer",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    achievement: "Lost 10kg"
  },
  {
    text: "Attending the strength workshop was a game-changer. My form improved dramatically and I've gained noticeable muscle.",
    name: "James Muthomi",
    role: "Business Owner",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    achievement: "+8kg Muscle"
  },
  {
    text: "The weight loss challenge transformed not just my body but my entire mindset. Best decision I ever made!",
    name: "Emily Njeri",
    role: "Marketing Manager",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    achievement: "-25kg Lost"
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

const benefits = [
  'Certified & experienced trainer',
  'Small group sizes for attention',
  'Professional guidance throughout',
  'All fitness levels welcome',
  'Quality equipment provided',
  'Fun & motivating atmosphere'
];

export default function EventsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/images/018.JPG')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark/95 via-fitness-dark/80 to-fitness-dark/60"></div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-fitness-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-fitness-accent/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-fitness-primary/20 to-fitness-accent/20 border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm mb-6">
              <Calendar size={18} />
              <span>Upcoming Sessions</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Fitness <span className="text-gradient-primary">Events</span>
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              Join our upcoming training sessions, workshops, and fitness events. 
              Reserve your spot and be part of the community.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-3 bg-gradient-to-b from-fitness-primary to-fitness-accent rounded-full animate-scroll-indicator"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-fitness-light via-white to-fitness-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {upcomingHighlights.map((item, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-soft hover:shadow-fitness transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 flex items-center justify-center">
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
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-fitness-primary to-fitness-accent flex items-center justify-center shadow-fitness">
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
            {events.filter(e => isUpcoming(e.date)).map((event, index) => (
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
                    <span className="bg-gradient-to-r from-fitness-primary to-fitness-accent text-white text-xs font-bold px-3 py-1 rounded-full">
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
                    <div className="bg-gradient-to-br from-fitness-primary to-fitness-accent text-white px-4 py-2 rounded-xl font-bold shadow-fitness">
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
                      <div className="w-10 h-10 bg-gradient-to-br from-fitness-primary to-fitness-accent rounded-full flex items-center justify-center">
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
                      href={`/events/${event.id}`}
                      className="flex items-center gap-1 text-fitness-primary font-medium hover:text-fitness-primaryDark transition-colors"
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

      {/* Why Book Events With Me */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-fitness-lg">
                <img
                  src="/images/026.JPG"
                  alt="Fitness Training"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-fitness-primary to-fitness-accent text-white rounded-2xl p-6 shadow-fitness-lg animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Star size={28} className="text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm text-white/90">Happy Clients</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 rounded-full blur-2xl"></div>
            </div>

            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="inline-flex items-center gap-2 badge mb-4">
                <Award size={16} />
                <span>Why Choose Me</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Join Events Led by an <span className="text-gradient-mixed">Expert</span>
              </h2>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                With years of experience and hundreds of satisfied clients, I bring expertise, 
                passion, and personalized attention to every event I host.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-fitness-primary/5 hover:to-fitness-accent/5 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-fitness-primary to-fitness-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                  Contact for Custom Events
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background with Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/images/002.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-fitness-dark/95 via-fitness-dark/90 to-fitness-primaryDark/80"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 left-20 w-72 h-72 bg-fitness-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-fitness-accent/15 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-fitness-primary/10 to-fitness-accent/10 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm mb-6 border border-white/20">
              <Star size={18} className="text-yellow-400 fill-yellow-400" />
              <span>Client Testimonials</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              What <span className="text-gradient-primary">Clients Say</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Real stories from people who attended our events.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Testimonial Card */}
            <div className="relative group">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-fitness-primary via-fitness-accent to-fitness-primary rounded-3xl opacity-30 blur-xl animate-pulse-glow"></div>
              
              {/* Main Card */}
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-fitness-lg">
                {/* Decorative Corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-fitness-primary/50 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-fitness-accent/50 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-fitness-accent/50 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-fitness-primary/50 rounded-br-lg"></div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-fitness-primary/5 to-fitness-accent/5 rounded-3xl pointer-events-none"></div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevTestimonial}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-fitness-primary hover:to-fitness-accent hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 group-hover:shadow-fitness"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-fitness-primary hover:to-fitness-accent hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 group-hover:shadow-fitness"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={20} />
                </button>

                {/* Testimonial Content */}
                <div className="text-center">
                  {/* Quote Icon with Glow */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="absolute inset-0 bg-fitness-primary/30 rounded-full blur-xl"></div>
                    <div className="relative p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                      <Quote size={40} className="text-fitness-primary relative z-10" />
                    </div>
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-medium">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  
                  {/* Client Info */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    {/* Avatar with Ring */}
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-fitness-primary to-fitness-accent rounded-full blur-md opacity-70"></div>
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="relative w-20 h-20 rounded-full object-cover border-2 border-white shadow-lg"
                      />
                    </div>
                    
                    {/* Name and Role */}
                    <div className="text-center md:text-left">
                      <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="font-bold text-white text-xl">{testimonials[currentTestimonial].name}</div>
                      <div className="text-gray-400 text-sm">{testimonials[currentTestimonial].role}</div>
                    </div>
                    
                    {/* Achievement Badge */}
                    <div className="ml-0 md:ml-4 relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-fitness-primary to-fitness-accent rounded-xl blur-md opacity-70"></div>
                      <div className="relative bg-gradient-to-br from-fitness-primary to-fitness-accent text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg">
                        {testimonials[currentTestimonial].achievement}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-3 mt-10">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`relative h-3 rounded-full transition-all duration-500 ${
                        index === currentTestimonial 
                          ? 'w-12 bg-gradient-to-r from-fitness-primary to-fitness-accent' 
                          : 'w-3 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    >
                      {index === currentTestimonial && (
                        <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Events CTA */}
      <section className="py-20 bg-gradient-to-br from-fitness-primary via-fitness-primaryDark to-fitness-accent relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20  px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm mb-6 border border-white/20">
              <Heart size={18} />
              <span>Custom Events</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Host Your Own Event
            </h2>
            <p className="text-xl mb-8">
              Looking to organize a corporate fitness event, private training session, or special workshop? 
              I can customize an experience for your group.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-fitness-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-fitness-lg">
              Contact for Custom Events
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-fitness-light via-white to-fitness-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Glassmorphism Card */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-fitness-lg border border-white/50 overflow-hidden">
              {/* Decorative Gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-fitness-primary/10 to-fitness-accent/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-fitness-accent/10 to-fitness-primary/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-fitness-primary to-fitness-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-fitness-lg transform hover:scale-110 transition-transform duration-500">
                  <Calendar size={40} className="" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Never Miss an <span className="text-gradient-primary">Event</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                  Subscribe to get notified about new events, early bird discounts, and exclusive access.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:border-fitness-primary focus:outline-none focus:ring-4 focus:ring-fitness-primary/10 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="btn-accent whitespace-nowrap px-8 py-4"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

