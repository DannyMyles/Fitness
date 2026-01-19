'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Award, Users, Clock, Star, Dumbbell, Heart, Zap, ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStat, setActiveStat] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    // Animate stats sequentially
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % 3);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const stats = [
    { 
      value: '500+', 
      label: 'Clients Transformed',
      icon: Users,
      color: 'from-orange-500 to-red-500'
    },
    { 
      value: '10+', 
      label: 'Years Experience', 
      icon: Award,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      value: '4.9', 
      label: 'Client Rating', 
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      suffix: '★'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-fitness-light via-white to-fitness-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-pattern-dots"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-fitness-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-fitness-accent/5 to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 animate-float">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 backdrop-blur-sm shadow-fitness flex items-center justify-center">
          <Dumbbell size={32} className="text-fitness-primary" />
        </div>
      </div>
      <div className="absolute bottom-32 left-10 animate-float-delayed">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fitness-accent/20 to-fitness-primary/20 backdrop-blur-sm shadow-accent flex items-center justify-center">
          <Heart size={28} className="text-fitness-accent" />
        </div>
      </div>
      <div className="absolute top-1/3 left-1/4 animate-bounce-slow">
        <div className="w-3 h-3 rounded-full bg-fitness-primary/40"></div>
      </div>
      <div className="absolute bottom-20 right-1/4 animate-bounce-slow" style={{ animationDelay: '1s' }}>
        <div className="w-4 h-4 rounded-full bg-fitness-accent/40"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-5'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-fitness-primary/10 to-fitness-accent/10 text-fitness-primary px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-fitness-primary/20">
              <Zap size={16} className="animate-pulse" />
              <span>Professional Fitness Training</span>
              <ChevronRight size={16} />
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              <span className="block animate-on-scroll opacity-100 translate-y-0" style={{ animationDelay: '0.1s' }}>
                Transform Your
              </span>
              <span className="block animate-on-scroll opacity-100 translate-y-0 text-gradient-mixed" style={{ animationDelay: '0.2s' }}>
                Fitness Journey
              </span>
              <span className="block animate-on-scroll opacity-100 translate-y-0 text-fitness-primary" style={{ animationDelay: '0.3s' }}>
                With Expert Guidance
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed animate-on-scroll opacity-100 translate-y-0" style={{ animationDelay: '0.4s' }}>
              Personalized training programs, nutrition planning, and motivation to help you achieve your health and fitness goals. Start your transformation today!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll opacity-100 translate-y-0" style={{ animationDelay: '0.5s' }}>
              <Link 
                href="/contact" 
                className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4 group"
              >
                <Zap size={20} className="group-hover:animate-pulse" />
                Start Training
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/services" 
                className="btn-secondary flex items-center justify-center gap-2 text-lg px-8 py-4 group"
              >
                <Play size={20} />
                View Services
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200 animate-on-scroll opacity-100 translate-y-0" style={{ animationDelay: '0.6s' }}>
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-4 rounded-2xl transition-all duration-500 cursor-pointer ${
                    activeStat === index 
                      ? 'bg-gradient-to-br from-fitness-primary/10 to-fitness-accent/10 scale-105' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-3`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">
                    {stat.value}{stat.suffix || '+'}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Modern card design */}
          <div className={`relative mt-8 lg:mt-0 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            
            {/* Main image card */}
            <div className="card-modern overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=1000&fit=crop"
                  alt="Fitness Training"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
                
                {/* Floating info cards */}
                <div className="absolute top-6 right-6 glass rounded-2xl p-4 shadow-fitness transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-fitness-primary to-fitness-primaryDark rounded-xl">
                      <Users size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Group Classes</div>
                      <div className="text-sm text-gray-600">Daily Sessions</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 glass rounded-2xl p-4 shadow-fitness transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-fitness-accent to-fitness-accentDark rounded-xl">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Flexible Hours</div>
                      <div className="text-sm text-gray-600">6AM - 9PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Certification badge */}
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-fitness-primary to-fitness-accent text-white rounded-2xl p-5 shadow-fitness-lg transform hover:scale-105 transition-all duration-300 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Award size={28} />
                </div>
                <div>
                  <div className="font-bold text-xl">Certified</div>
                  <div className="text-sm text-white/90">Personal Trainer</div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-fitness-primary/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-gradient-to-b from-fitness-primary to-fitness-accent rounded-full animate-scroll-indicator"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

