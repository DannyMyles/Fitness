'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Plus, Dumbbell, Users, Heart, Star, Sun, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const bentoCards = [
  { icon: Dumbbell, label: 'Personal\nTraining', bg: 'bg-fitness-primary/10' },
  { icon: Users, label: 'Group\nClasses', bg: 'bg-gray-100' },
  { icon: Heart, label: 'Nutrition\nCoaching', bg: 'bg-fitness-accent/10' },
];

const floatingBadges = ['Motivation', 'Nutrition', 'Strength'];

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative bg-gray-50 pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-5 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Left column */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-fitness-accent animate-pulse" />
                Professional Fitness Training in Nairobi
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-fitness-dark leading-[1.05]">
                <span className="block">
                  Train Hard,{' '}
                  <span className="inline-flex -space-x-3 align-middle mx-1">
                    {['/images/021.JPG', '/images/009.jpg', '/images/027.JPG'].map((src, i) => (
                      <span
                        key={src}
                        className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-50 overflow-hidden shadow-md"
                        style={{ zIndex: 3 - i }}
                      >
                        <Image src={src} alt="" fill className="object-cover" />
                      </span>
                    ))}
                  </span>{' '}
                  Live Strong.
                </span>
                <span className="block text-fitness-primary">
                  Your Body,{' '}
                  <span className="relative inline-block w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-50 overflow-hidden shadow-md align-middle mx-1">
                    <Image src="/images/026.JPG" alt="" fill className="object-cover" />
                  </span>{' '}
                  Your Rules.
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
                Personalized training programs, expert nutrition planning, and unwavering
                motivation — everything you need to transform your fitness, on your terms.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary rounded-full! flex items-center gap-2">
                  Start Training
                  <ArrowUpRight size={20} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-fitness-dark border-2 border-gray-200 hover:border-fitness-primary hover:text-fitness-primary transition-colors"
                >
                  View Services
                </Link>
              </div>
            </div>

            {/* Bento service cards */}
            <div className="grid grid-cols-3 gap-4">
              {bentoCards.map((card) => (
                <Link
                  key={card.label}
                  href="/services"
                  className={`group relative ${card.bg} rounded-3xl p-5 flex flex-col justify-between min-h-[140px] hover:-translate-y-1 transition-transform duration-300`}
                >
                  <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm self-end group-hover:bg-fitness-primary group-hover:text-white transition-colors">
                    <ArrowUpRight size={16} />
                  </span>
                  <span className="font-bold text-fitness-dark leading-snug whitespace-pre-line">
                    {card.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Wide stat card */}
            <div className="relative bg-fitness-primary/5 rounded-3xl overflow-hidden flex-1 min-h-[280px] flex">
              <div className="w-2/5 p-6 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-4">Client Rating</p>
                  <div className="flex flex-col gap-2">
                    {[100, 85, 92, 70, 96, 60, 80].map((w, i) => (
                      <div key={i} className="h-1.5 rounded-full bg-fitness-primary/20" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-white px-3 py-2 rounded-full shadow-sm w-fit">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-fitness-dark">4.9 / 5</span>
                </div>
              </div>
              <div className="w-3/5 relative bg-fitness-dark">
                <Image
                  src="/images/004.JPG"
                  alt="Group HIIT session"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '50% 15%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fitness-dark/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-fitness-dark shadow-sm">
                  HIIT Session
                </div>
              </div>
            </div>
          </div>

          {/* Right column — big feature panel */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[560px] bg-gradient-to-br from-fitness-primary via-fitness-primary-dark to-fitness-dark">
              <Image
                src="/images/026.JPG"
                alt="Marksila254 training"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fitness-dark/70 via-transparent to-transparent pointer-events-none" />

              {/* Top badge */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <div className="bg-white px-4 py-2.5 rounded-full text-sm font-semibold text-fitness-dark shadow-lg">
                  Special Training Program
                </div>
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg flex-shrink-0">
                  <Sun size={18} className="text-fitness-primary" />
                </div>
              </div>

              {/* Annotation callout */}
              <div className="absolute top-[38%] left-6 hidden sm:flex items-center gap-2">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-fitness-dark shadow-lg border border-white/50">
                  10 Years Experience
                </div>
                <div className="w-16 h-px bg-white/60" />
                <div className="w-2 h-2 rounded-full bg-white shadow" />
              </div>

              {/* Floating pill badges */}
              <div className="absolute bottom-32 right-5 flex flex-col items-end gap-2.5">
                {floatingBadges.map((label, i) => (
                  <div key={label} className={`flex items-center gap-2 ${i % 2 ? 'flex-row-reverse' : ''}`}>
                    <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-fitness-dark shadow-lg">
                      {label}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-fitness-dark/80 backdrop-blur-sm flex items-center justify-center text-white flex-shrink-0">
                      <Plus size={14} />
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom stat card */}
              <div className="absolute bottom-5 left-5 right-5 bg-white rounded-2xl p-5 shadow-xl">
                <p className="text-2xl font-bold text-fitness-dark">100+</p>
                <p className="text-sm text-gray-500 mb-3">Clients Trained</p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {['A', 'J', 'S'].map((letter) => (
                      <div
                        key={letter}
                        className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br from-fitness-primary to-fitness-primary-dark flex items-center justify-center text-xs font-bold text-white"
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-500">100+ happy clients</span>
                </div>
              </div>
            </div>

            {/* Scroll down button, sits on the seam between columns */}
            <div className="hidden lg:flex absolute -left-9 bottom-8 w-16 h-16 rounded-full bg-white shadow-xl items-center justify-center flex-col z-10">
              <ChevronDown size={18} className="text-fitness-primary animate-bounce-slow" />
              <span className="text-[9px] font-semibold text-gray-500 mt-0.5">Scroll</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
