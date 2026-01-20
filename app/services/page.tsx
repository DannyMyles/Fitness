'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Dumbbell, Heart, Zap, Clock, Users, Award, 
  ChevronRight, CheckCircle, Star, ArrowRight,
  ArrowLeft, Quote
} from 'lucide-react';

// Testimonials Data
const testimonials = [
  {
    text: "Training with Mark transformed my life. I lost 30kg in 6 months and gained confidence I never knew I had. His personalized approach and constant motivation made all the difference.",
    name: "Sarah Wanjiku",
    role: "Software Engineer",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    achievement: "-30kg Lost"
  },
  {
    text: "The best investment I made in my health. Mark's nutrition guidance complemented his training perfectly. I've never felt stronger or more energetic.",
    name: "James Muthomi",
    role: "Business Owner",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    achievement: "+15kg Muscle"
  },
  {
    text: "Group classes are incredibly motivating! The energy in every session is infectious. I've made great friends while getting fit together.",
    name: "Emily Njeri",
    role: "Marketing Manager",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    achievement: "6 Months Strong"
  }
];

const services = [
  {
    icon: Dumbbell,
    title: 'Personal Training',
    description: 'One-on-one customized training sessions tailored to your specific goals, fitness level, and schedule.',
    features: ['Custom workout plans', 'Progress tracking', 'Technique guidance', 'Motivation & accountability'],
    price: 'From KES 2,000/session',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
    color: 'from-orange-500 to-red-500',
    popular: false
  },
  {
    icon: Users,
    title: 'Group Classes',
    description: 'Energetic group workouts designed to push you harder while enjoying the camaraderie of fellow fitness enthusiasts.',
    features: ['HIIT sessions', 'Strength training', 'Cardio workouts', 'Team motivation'],
    price: 'From KES 500/session',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
    color: 'from-teal-500 to-cyan-500',
    popular: true
  },
  {
    icon: Heart,
    title: 'Nutrition Coaching',
    description: 'Comprehensive nutrition guidance and meal planning to fuel your body and support your fitness goals.',
    features: ['Personalized meal plans', 'Macro calculations', 'Food education', 'Habit formation'],
    price: 'From KES 3,000/month',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600',
    color: 'from-green-500 to-emerald-500',
    popular: false
  },
  {
    icon: Zap,
    title: 'Online Training',
    description: 'Professional training programs you can follow from anywhere, with virtual support and guidance.',
    features: ['Video workouts', 'Weekly check-ins', 'App support', 'Flexible scheduling'],
    price: 'From KES 5,000/month',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=600',
    color: 'from-purple-500 to-pink-500',
    popular: false
  },
  {
    icon: Award,
    title: 'Weight Loss Program',
    description: 'Structured programs designed to help you lose weight safely and sustainably through training and nutrition.',
    features: ['Body composition analysis', 'Calorie guidance', 'Exercise programming', 'Lifestyle coaching'],
    price: 'From KES 15,000/month',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
    color: 'from-blue-500 to-indigo-500',
    popular: false
  },
  {
    icon: Clock,
    title: 'Muscle Building',
    description: 'Hypertrophy-focused training programs to help you build lean muscle mass and increase strength.',
    features: ['Progressive overload', 'Split routines', 'Recovery protocols', 'Supplement guidance'],
    price: 'From KES 18,000/month',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
    color: 'from-yellow-500 to-orange-500',
    popular: false
  }
];

const benefits = [
  'Certified & experienced trainer',
  'Personalized approach for every client',
  'Modern training techniques',
  'Flexible scheduling options',
  'Online & in-person sessions',
  'Ongoing support & motivation'
];

const processSteps = [
  { step: '01', title: 'Consultation', description: 'Free initial consultation to discuss your goals and assess your needs.' },
  { step: '02', title: 'Custom Plan', description: 'Receive a personalized training and nutrition plan tailored to you.' },
  { step: '03', title: 'Training', description: 'Begin your training program with ongoing support and adjustments.' },
  { step: '04', title: 'Results', description: 'Achieve your goals and maintain your new healthy lifestyle.' }
];

export default function ServicesPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
            backgroundImage: "url('https://images.unsplash.com/photo-1534258936925-c48947387603?w=1920')"
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
              <Zap size={18} />
              <span>Professional Services</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              My <span className="text-gradient-primary">Services</span>
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              Professional fitness services tailored to help you achieve your health and wellness goals.
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

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-fitness-light via-white to-fitness-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge mb-4">
              <Zap size={16} />
              <span>Training Programs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="text-gradient-mixed">Fitness Path</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from a variety of training options designed to fit your lifestyle and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`service-card group ${hoveredCard === index ? 'ring-2 ring-fitness-primary' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-fitness-primary to-fitness-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}
                
                <div className="relative h-52 overflow-hidden service-card-image">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent`}></div>
                  <div className={`absolute bottom-4 left-4 w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <service.icon size={28} className="text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 text-sm text-gray-700 transition-all duration-300"
                        style={{ 
                          transform: hoveredCard === index ? 'translateX(5px)' : 'translateX(0)',
                          opacity: hoveredCard === index ? 1 : 0.8
                        }}
                      >
                        <div className="w-5 h-5 bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle size={12} className="text-fitness-primary" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-gradient-primary font-bold">{service.price}</span>
                    <Link 
                      href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center gap-1 text-fitness-dark font-medium hover:text-fitness-primary transition-colors"
                    >
                      Learn More
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-fitness-lg">
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800"
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
                    <div className="text-3xl font-bold">4.9/5</div>
                    <div className="text-sm text-white/90">Client Rating</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 rounded-full blur-2xl"></div>
            </div>

            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="inline-flex items-center gap-2 badge mb-4">
                <Zap size={16} />
                <span>Why Train With Me</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Achieve More With <span className="text-gradient-mixed">Expert Guidance</span>
              </h2>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                With over 10 years of experience and hundreds of satisfied clients, I bring 
                expertise, passion, and personalized attention to every training session.
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
                  Start Your Journey
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-fitness-light via-white to-fitness-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge mb-4">
              <Zap size={16} />
              <span>How It Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Steps to <span className="text-gradient-mixed">Success</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Begin your fitness transformation in just four easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <div 
                key={index}
                className="relative text-center group"
              >
                {/* Step Card Container */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-fitness-lg hover:border-fitness-primary/30 transition-all duration-500">
                  {/* Gradient Glow Background */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                    index === 0 ? 'from-fitness-primary/10 to-fitness-accent/10' : 
                    index === 1 ? 'from-fitness-accent/10 to-teal-500/10' : 
                    index === 2 ? 'from-teal-500/10 to-cyan-500/10' : 
                    'from-cyan-500/10 to-fitness-primary/10'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Pulsing Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                    index === 0 ? 'from-fitness-primary to-fitness-accent' : 
                    index === 1 ? 'from-fitness-accent to-teal-500' : 
                    index === 2 ? 'from-teal-500 to-cyan-500' : 
                    'from-cyan-500 to-fitness-primary'
                  } opacity-5 blur-xl animate-pulse-glow`}></div>
                  
                  {/* Step Circle */}
                  <div className="relative inline-flex items-center justify-center w-28 h-28 mb-6">
                    {/* Outer Ring - Animated */}
                    <div className={`absolute inset-0 rounded-full border-2 border-dashed ${
                      index === 0 ? 'border-fitness-primary' : 
                      index === 1 ? 'border-fitness-accent' : 
                      index === 2 ? 'border-teal-500' : 
                      'border-cyan-500'
                    } opacity-40 animate-rotate`} style={{ animationDirection: 'reverse' }}></div>
                    
                    {/* Middle Glow Ring */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${
                      index === 0 ? 'from-fitness-primary to-fitness-accent' : 
                      index === 1 ? 'from-fitness-accent to-teal-500' : 
                      index === 2 ? 'from-teal-500 to-cyan-500' : 
                      'from-cyan-500 to-fitness-primary'
                    } opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-500`}></div>
                    
                    {/* Inner Circle with Number */}
                    <div className="relative w-24 h-24 bg-gradient-to-br from-white to-gray-50 text-white text-2xl font-bold rounded-full flex items-center justify-center shadow-fitness border-4 border-transparent bg-clip-border overflow-hidden">
                      {/* Gradient Background for Number */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${
                        index === 0 ? 'from-fitness-primary to-fitness-accent' : 
                        index === 1 ? 'from-fitness-accent to-teal-500' : 
                        index === 2 ? 'from-teal-500 to-cyan-500' : 
                        'from-cyan-500 to-fitness-primary'
                      }`}></div>
                      <span className="relative z-10 drop-shadow-md">{item.step}</span>
                    </div>
                    
                    {/* Sparkle Effect on Hover */}
                    <div className="absolute top-0 right-2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 shadow-lg"></div>
                    <div className="absolute bottom-2 left-0 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 delay-100 shadow-lg"></div>
                  </div>
                  
                  {/* Title with Gradient */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gradient-mixed transition-all duration-300">{item.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{item.description}</p>
                </div>
                
                {/* Arrow Connector for desktop - Enhanced visibility */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[105%] w-[calc(100%-2rem)]">
                    <div className="flex items-center">
                      <div className={`h-0.5 flex-1 bg-gradient-to-r ${
                        index === 0 ? 'from-fitness-primary to-fitness-accent' : 
                        index === 1 ? 'from-fitness-accent to-teal-500' : 
                        index === 2 ? 'from-teal-500 to-cyan-500' : 
                        'from-cyan-500 to-fitness-primary'
                      }`}></div>
                      <ArrowRight size={20} className={`${
                        index === 0 ? 'text-fitness-primary' : 
                        index === 1 ? 'text-fitness-accent' : 
                        index === 2 ? 'text-teal-500' : 
                        'text-cyan-500'
                      } flex-shrink-0 mx-2`} />
                      <div className={`h-0.5 flex-1 bg-gradient-to-r ${
                        index === 0 ? 'from-fitness-accent to-fitness-primary' : 
                        index === 1 ? 'from-teal-500 to-fitness-accent' : 
                        index === 2 ? 'from-cyan-500 to-teal-500' : 
                        'from-fitness-primary to-cyan-500'
                      }`}></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-fitness-primary via-fitness-primaryDark to-fitness-accent relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact me today to schedule your free consultation and start your journey.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-fitness-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-fitness-lg">
              Get Started
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background with Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920')"
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
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  text-gray-700 mb-4">
              What <span className="text-gradient-primary">Clients Say</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from real people who transformed their lives.
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
                      {/* Active dot inner glow */}
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
    </div>
  );
}

