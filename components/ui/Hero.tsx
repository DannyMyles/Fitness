'use client';

import { ArrowUpRight, Plus, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSite } from '@/components/site/SiteProvider';
import { useAverageRating } from '@/app/hooks/useAverageRating';

const BENTO_BG = ['bg-fitness-primary/10', 'bg-gray-100', 'bg-fitness-accent/10'];

const DEFAULT_BADGES = ['Motivation', 'Nutrition', 'Strength'];

const Hero = () => {
  const site = useSite();
  const hero = site.settings.hero ?? {};
  const stats = site.settings.stats ?? [];
  const floatingBadges = hero.perks?.length ? hero.perks.slice(0, 3) : DEFAULT_BADGES;
  const clientsStat = stats[0];
  const experienceStat = stats[1];
  const rating = useAverageRating();
  // Three services from Admin → Services (individual ones first).
  const bentoCards = [...(site.services ?? [])]
    .sort((a, b) => Number(a.audience === 'corporate') - Number(b.audience === 'corporate'))
    .slice(0, 3)
    .map((s, i) => ({ label: s.title, href: s.audience === 'corporate' ? '/corporate' : '/services', bg: BENTO_BG[i] }));

  return (
    <section className="relative bg-gray-50 pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 enter-up"
        >
          {/* Left column */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-fitness-accent animate-pulse" />
                {hero.eyebrow || 'Professional Fitness Training in Nairobi'}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-fitness-dark leading-[1.05]">
                <span className="block">
                  {hero.title || 'Train Hard, Live Strong.'}{' '}
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
                  </span>
                </span>
                <span className="block text-fitness-primary">
                  {hero.highlight || 'Your Body, Your Rules.'}{' '}
                  <span className="relative inline-block w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-50 overflow-hidden shadow-md align-middle mx-1">
                    <Image src="/images/026.JPG" alt="" fill className="object-cover" />
                  </span>
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
                {hero.subtitle ||
                  'Personalized training programs, expert nutrition planning, and unwavering motivation — everything you need to transform your fitness, on your terms.'}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={hero.primaryCtaUrl || '/contact'} className="btn-primary rounded-full! flex items-center gap-2">
                  {hero.primaryCtaLabel || 'Start Training'}
                  <ArrowUpRight size={20} />
                </Link>
                <Link
                  href={hero.secondaryCtaUrl || '/services'}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-fitness-dark border-2 border-gray-200 hover:border-fitness-primary hover:text-fitness-primary transition-colors"
                >
                  {hero.secondaryCtaLabel || 'View Services'}
                </Link>
              </div>
            </div>

            {/* Bento service cards */}
            {bentoCards.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {bentoCards.map((card) => (
                <Link
                  key={card.label}
                  href={card.href}
                  className={`group relative ${card.bg} rounded-3xl p-5 flex flex-col justify-between min-h-[140px] hover:-translate-y-1 transition-transform duration-300`}
                >
                  <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm self-end group-hover:bg-fitness-primary group-hover:text-white transition-colors">
                    <ArrowUpRight size={16} />
                  </span>
                  <span className="font-bold text-fitness-dark leading-snug">
                    {card.label}
                  </span>
                </Link>
              ))}
            </div>
            )}

            {/* Wide stat card */}
            <div className="relative bg-fitness-primary/5 rounded-3xl overflow-hidden flex-1 min-h-[280px] flex">
              <div className="w-full relative bg-fitness-dark">
                <Image
                  src="/images/004.JPG"
                  alt="Group HIIT session"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '50% 15%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fitness-dark/40 via-transparent to-transparent pointer-events-none" />
                {rating && (
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 bg-white px-3 py-2 rounded-full shadow-sm" title={`${rating.count} reviews`}>
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-fitness-dark">{rating.avg.toFixed(1)} / 5 · {rating.count} reviews</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column — big feature panel */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[560px] bg-gradient-to-br from-fitness-primary via-fitness-primary-dark to-fitness-dark">
              <Image
                src={hero.imageUrl || '/images/026.JPG'}
                alt={`${site.name} training`}
                unoptimized={/^https?:/.test(hero.imageUrl ?? '')}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fitness-dark/70 via-transparent to-transparent pointer-events-none" />

              {/* Annotation callout */}
              {experienceStat && (
              <div className="absolute top-[38%] left-6 hidden sm:flex items-center gap-2">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-fitness-dark shadow-lg border border-white/50">
                  {experienceStat.value} {experienceStat.label}
                </div>
                <div className="w-16 h-px bg-white/60" />
                <div className="w-2 h-2 rounded-full bg-white shadow" />
              </div>
              )}

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
              {clientsStat && (
              <div className="absolute bottom-5 left-5 right-5 bg-white rounded-2xl p-5 shadow-xl">
                <p className="text-2xl font-bold text-fitness-dark">{clientsStat.value}</p>
                <p className="text-sm text-gray-500 mb-3">{clientsStat.label}</p>
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
                  <span className="text-xs font-semibold text-gray-500">{site.tagline || 'Train with us'}</span>
                </div>
              </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
