'use client';

import { useState, useEffect } from 'react';
import { Play, Award, Users, Clock, Star, Dumbbell, Heart, Zap, ChevronRight, ArrowRight, TrendingUp, Target, Flame } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
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
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    },
    { 
      value: '10+', 
      label: 'Years Experience', 
      icon: Award,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    { 
      value: '4.9', 
      label: 'Client Rating', 
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      suffix: '★'
    }
  ];

  const features = [
    { icon: Target, label: 'Personalized Plans', color: 'from-fitness-primary to-orange-500' },
    { icon: Flame, label: 'Expert Trainers', color: 'from-fitness-accent to-green-500' },
    { icon: Clock, label: 'Flexible Schedule', color: 'from-blue-500 to-indigo-500' },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50">
      
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-orange-200/40 to-transparent blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-[30%] right-[-15%] w-[45%] h-[45%] rounded-full bg-gradient-to-bl from-green-200/40 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-blue-200/30 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-pattern-dots"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-fitness-primary/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-fitness-accent/5 to-transparent"></div>
      </div>

      {/* Floating Elements with enhanced animations */}
      <div className="absolute top-16 right-12 animate-float">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-fitness-primary/30 to-fitness-accent/30 rounded-2xl blur-xl"></div>
          <div className="relative w-22 h-22 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl shadow-fitness-lg border border-white/50 flex items-center justify-center">
            <Dumbbell size={40} className="text-fitness-primary" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-40 left-8 animate-float-delayed">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-fitness-accent/30 to-fitness-primary/30 rounded-2xl blur-xl"></div>
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl shadow-accent border border-white/50 flex items-center justify-center">
            <Heart size={36} className="text-fitness-accent" />
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 left-8 animate-bounce-slow">
        <div className="w-4 h-4 rounded-full bg-fitness-primary/50 shadow-lg shadow-fitness-primary/50"></div>
      </div>
      
      <div className="absolute bottom-32 right-16 animate-bounce-slow" style={{ animationDelay: '1s' }}>
        <div className="w-5 h-5 rounded-full bg-fitness-accent/50 shadow-lg shadow-fitness-accent/50"></div>
      </div>
      
      <div className="absolute top-1/4 right-1/3 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
        <div className="w-3 h-3 rounded-full bg-orange-400/40"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-5'}`}>
              
              {/* Enhanced Badge with glow */}
              <div className="inline-flex animate-on-scroll">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-fitness-primary to-fitness-accent rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative inline-flex items-center gap-3 bg-gradient-to-r from-fitness-primary/15 to-fitness-accent/15 text-fitness-primary px-6 py-3 rounded-full text-sm font-bold backdrop-blur-md border border-fitness-primary/30">
                    <Zap size={18} className="animate-pulse" />
                    <span>Professional Fitness Training</span>
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
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

              {/* Description with better typography */}
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed animate-on-scroll opacity-100 translate-y-0" style={{ animationDelay: '0.3s' }}>
                Personalized training programs, expert nutrition planning, and unwavering motivation to help you achieve your health and fitness goals. Start your transformation today!
              </p>

              {/* Feature highlights */}
              <div className="flex flex-wrap gap-4 animate-on-scroll opacity-100 translate-y-0" style={{ animationDelay: '0.35s' }}>
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${feature.color}`}>
                      <feature.icon size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll opacity-100 translate-y-0 pt-2" style={{ animationDelay: '0.4s' }}>
                <Link 
                  href="/contact" 
                  className="group relative btn-primary flex items-center justify-center gap-2.5 text-lg px-10 py-4.5 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    <Zap size={22} className="group-hover:animate-pulse" />
                    Start Training
                    <ArrowRight size={22} className="transition-transform group-hover:translate-x-1.5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-fitness-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  href="/services" 
                  className="btn-secondary flex items-center justify-center gap-2.5 text-lg px-10 py-4.5 group"
                >
                  <Play size={22} className="group-hover:scale-110 transition-transform" />
                  View Services
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/60 animate-on-scroll opacity-100 translate-y-0" style={{ animationDelay: '0.5s' }}>
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    onMouseEnter={() => setHoveredStat(index)}
                    onMouseLeave={() => setHoveredStat(null)}
                    className={`group relative p-5 rounded-2xl transition-all duration-500 cursor-pointer ${
                      hoveredStat === index 
                        ? 'bg-white shadow-fitness-lg scale-105' 
                        : 'bg-white/60 hover:bg-white hover:shadow-fitness'
                    }`}
                  >
                    {/* Gradient accent on hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="relative">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon size={24} className="text-white" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-gray-900 flex items-baseline gap-0.5">
                        <span className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                          {stat.value}
                        </span>
                        <span className="text-sm text-fitness-primary font-bold">{stat.suffix || '+'}</span>
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-4 pt-4 animate-on-scroll opacity-100 translate-y-0" style={{ animationDelay: '0.6s' }}>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 shadow-md">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-900">500+</span>
                  <span className="text-gray-600"> happy clients</span>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 ml-1">4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced card design */}
          <div className="lg:col-span-5 xl:col-span-5 relative">
            <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 rounded-3xl blur-xl"></div>
              
              {/* Main image card */}
              <div className="relative card-modern overflow-hidden transform hover:scale-[1.02] transition-transform duration-500 rounded-2xl shadow-fitness-lg">
                <div className="relative h-[350px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/027.JPG"
                    alt="Fitness Training"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-gray-900/10 to-transparent"></div>
                  
                  {/* Enhanced floating info cards */}
                  <div className="absolute top-5 right-5 glass-dark rounded-2xl p-4 shadow-fitness-lg transform hover:scale-105 transition-all duration-300 animate-bounce-slow">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-fitness-primary to-fitness-primaryDark rounded-xl shadow-lg">
                        <Users size={22} className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">Group Classes</div>
                        <div className="text-sm text-gray-300">Daily Sessions</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-5 left-5 glass-dark rounded-2xl p-4 shadow-fitness-lg transform hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-fitness-accent to-fitness-accentDark rounded-xl shadow-lg">
                        <Clock size={22} className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">Flexible Hours</div>
                        <div className="text-sm text-gray-300">6AM - 9PM</div>
                      </div>
                    </div>
                  </div>

                  {/* Stats overlay */}
                  <div className="absolute bottom-5 right-5 glass-dark rounded-2xl p-4 transform hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.7s' }}>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                        <TrendingUp size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">98%</div>
                        <div className="text-xs text-gray-300">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Certification badge */}
              <div className="absolute -bottom-5 -left-5 bg-gradient-to-br from-fitness-primary to-fitness-accent text-white rounded-2xl p-5 shadow-fitness-lg transform hover:scale-105 transition-all duration-300 animate-bounce-slow z-20">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Award size={32} />
                  </div>
                  <div>
                    <div className="font-bold text-xl">Certified</div>
                    <div className="text-sm text-white/90">Personal Trainer</div>
                  </div>
                </div>
              </div>

              {/* Achievement badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-fitness-lg transform hover:scale-105 transition-all duration-300 z-20">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                    <Target size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Best in Class</div>
                    <div className="text-xs text-gray-500">2024 Award</div>
                  </div>
                </div>
              </div>

              {/* Decorative gradient orb */}
              <div className="absolute -z-10 top-1/2 -right-16 w-32 h-32 bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Scroll to explore</span>
          <div className="w-7 h-11 border-2 border-fitness-primary/40 rounded-full flex items-start justify-center p-1.5 bg-white/50 backdrop-blur-sm">
            <div className="w-1.5 h-3 bg-gradient-to-b from-fitness-primary to-fitness-accent rounded-full animate-scroll-indicator"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

