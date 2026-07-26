'use client';

import { useState, useEffect } from 'react';
import { Target, Users, Award, Clock, CheckCircle, Dumbbell, Heart, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import CtaSection from '@/components/ui/CtaSection';

export default function AboutClient() {
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
        clients: Math.min(prev.clients + 2, 100),
        years: Math.min(prev.years + 0.2, 10),
        certifications: Math.min(prev.certifications + 0.1, 2),
        success: Math.min(prev.success + 2, 98)
      }));
    }, stepDuration);

    setTimeout(() => clearInterval(interval), duration);
  };

  const stats = [
    { icon: Users, key: 'clients' as const, label: 'Clients Transformed', suffix: '+' },
    { icon: Clock, key: 'years' as const, label: 'Years Experience', suffix: '' },
    { icon: Award, key: 'certifications' as const, label: 'Certifications', suffix: '' },
    { icon: Target, key: 'success' as const, label: 'Success Rate', suffix: '%' }
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
    <div className="pt-0">
      {/* Hero Section */}
      <PageHero
        badge="Certified Personal Trainer"
        badgeIcon={Award}
        title="About Marksila254"
        subtitle="Passionate about helping people transform their lives through fitness, proper nutrition, and sustainable lifestyle changes."
      />

      {/* Stats Section */}
      <section id="stats-section" className="py-16 bg-gradient-to-br from-fitness-light via-white to-fitness-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-soft hover:shadow-fitness transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-fitness-primary/20 to-fitness-primary-dark/20 flex items-center justify-center`}>
                  <stat.icon size={28} className="text-fitness-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {Math.round(animatedStats[stat.key])}
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
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-fitness-primary to-fitness-primary-dark text-white rounded-2xl p-6 shadow-fitness-lg transform hover:scale-105 transition-all duration-500 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Award size={28} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">10</div>
                    <div className="text-sm text-white/90">Years Experience</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-fitness-primary/20 to-fitness-primary-dark/20 rounded-full blur-2xl"></div>
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

              <div className="pt-4">
                <Link href="/services" className="btn-primary inline-flex items-center gap-2">
                  Explore My Services
                  <ArrowRight size={20} />
                </Link>
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

      <CtaSection
        title="Ready to Start Your Transformation?"
        subtitle="Let's work together to achieve your fitness goals and create a healthier, stronger you."
        primary={{ label: 'Get Started Today', href: '/contact' }}
        secondary={{ label: 'View Services', href: '/services' }}
      />
    </div>
  );
}

