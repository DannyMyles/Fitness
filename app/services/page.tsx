'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Dumbbell, Heart, Zap, Clock, Users, Award, 
  ChevronRight, CheckCircle, Star, ArrowRight,
  ArrowLeft
} from 'lucide-react';

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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 text-sm text-gray-600 transition-all duration-300"
                        style={{ 
                          transform: hoveredCard === index ? 'translateX(5px)' : 'translateX(0)',
                          opacity: hoveredCard === index ? 1 : 0.7
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
              
              <p className="text-gray-600 mb-8 leading-relaxed">
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
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${
                    index === 0 ? 'from-fitness-primary to-fitness-accent' : 
                    index === 1 ? 'from-fitness-accent to-teal-500' : 
                    index === 2 ? 'from-teal-500 to-cyan-500' : 
                    'from-cyan-500 to-fitness-primary'
                  } opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-fitness-primary to-fitness-accent text-white text-2xl font-bold rounded-full flex items-center justify-center shadow-fitness transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    {item.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                
                {/* Arrow connector for desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%]">
                    <ArrowRight size={24} className="text-fitness-primary/30" />
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
    </div>
  );
}

