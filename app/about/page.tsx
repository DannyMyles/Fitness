'use client';

import { useState, useEffect } from 'react';
import { Shield, Target, Users, Globe, Award, Clock, CheckCircle, Dumbbell, Heart, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    clients: 0,
    years: 0,
    certifications: 0,
    success: 0
  });

  useEffect(() => {
    setIsLoaded(true);

    // Animate stats on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        clients: Math.min(prev.clients + 9, 500),
        years: Math.min(prev.years + 0.2, 10),
        certifications: Math.min(prev.certifications + 1, 50),
        success: Math.min(prev.success + 2, 98)
      }));
    }, stepDuration);

    setTimeout(() => clearInterval(interval), duration);
  };

  const stats = [
    { icon: Users, value: 500, label: 'Clients Transformed', suffix: '+' },
    { icon: Clock, value: 10, label: 'Years Experience', suffix: '+' },
    { icon: Award, value: 50, label: 'Certifications', suffix: '+' },
    { icon: Target, value: 98, label: 'Success Rate', suffix: '%' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Client-First',
      description: 'Every program is tailored to your unique goals, fitness level, and lifestyle.'
    },
    {
      icon: Target,
      title: 'Results Driven',
      description: 'We focus on measurable progress and sustainable results, not quick fixes.'
    },
    {
      icon: Dumbbell,
      title: 'Expert Knowledge',
      description: 'Certified training with up-to-date techniques in fitness and nutrition.'
    },
    {
      icon: Zap,
      title: 'Energy & Passion',
      description: 'Bringing enthusiasm and motivation to every session we conduct.'
    }
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/images/006.JPG')"
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
              <Award size={18} />
              <span>Certified Personal Trainer</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              About <span className="text-gradient-primary">Marksila254</span>
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              Passionate about helping people transform their lives through fitness, 
              proper nutrition, and sustainable lifestyle changes.
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
      <section id="stats-section" className="py-16 bg-gradient-to-br from-fitness-light via-white to-fitness-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-soft hover:shadow-fitness transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 flex items-center justify-center`}>
                  <stat.icon size={28} className="text-fitness-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {Math.round(animatedStats.clients)}
                  {stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-fitness-lg">
                <Image
                  src="/images/026.JPG"
                  alt="Fitness Trainer"
                  width={600}
                  height={750}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-fitness-primary to-fitness-accent text-white rounded-2xl p-6 shadow-fitness-lg transform hover:scale-105 transition-all duration-500 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Award size={28} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">10+</div>
                    <div className="text-sm text-white/90">Years Experience</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 rounded-full blur-2xl"></div>
            </div>

            <div className={`space-y-6 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="inline-flex items-center gap-2 badge">
                <Zap size={16} />
                <span>My Fitness Journey</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Transforming Lives Through <span className="text-gradient-mixed">Fitness</span>
              </h2>
              
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <p>
                  I started my fitness journey over a decade ago, driven by a personal transformation 
                  that changed my life. What began as a personal quest for better health quickly 
                  turned into a passion for helping others achieve their goals.
                </p>
                <p>
                  Through years of dedicated study, certification, and hands-on experience, I've 
                  developed training methodologies that deliver real results. My approach combines 
                  scientific training principles with practical nutrition guidance to create 
                  sustainable lifestyle changes.
                </p>
                <p>
                  Whether you're looking to lose weight, build muscle, improve athletic performance, 
                  or simply feel more energetic, I'm here to guide you every step of the way.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {values.map((value, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-br hover:from-fitness-primary/5 hover:to-fitness-accent/5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-fitness-primary to-fitness-accent rounded-lg flex items-center justify-center mt-0.5">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{value.title}</h4>
                      <p className="text-sm text-gray-800">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-fitness-light via-white to-fitness-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge mb-4">
              <Zap size={16} />
              <span>What I Stand For</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core <span className="text-gradient-mixed">Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My core values guide every training session and every client interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="feature-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                  index === 0 ? 'from-orange-500 to-red-500' :
                  index === 1 ? 'from-green-500 to-emerald-500' :
                  index === 2 ? 'from-blue-500 to-indigo-500' :
                  'from-yellow-500 to-orange-500'
                } flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-800">{value.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-6">
              Ready to Start Your Transformation?
            </h2>
            <p className="text-xl text-gray-500 mb-8">
              Let's work together to achieve your fitness goals and create a healthier, stronger you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-fitness-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-fitness-lg"
              >
                Get Started Today
              </Link>
              <Link 
                href="/services" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

