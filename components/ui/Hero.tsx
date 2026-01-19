'use client';

import { Play, Award, Users, Clock, Star, Dumbbell, Heart, Zap, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-fitness">
      {/* Modern background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(${"#0BA154"} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-20 animate-float">
        <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm shadow-soft flex items-center justify-center">
          <Dumbbell size={24} className="text-accent" />
        </div>
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm shadow-soft flex items-center justify-center">
          <Heart size={24} className="text-accent" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content - Modern design */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-accent/10 text-accent px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm">
              <Zap size={16} className="text-accent" />
              <span>Professional Fitness Training</span>
              <ChevronRight size={16} />
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              <span className="block">Transform Your</span>
              <span className="block text-gradient">Fitness Journey</span>
              <span className="block text-accent">With Expert Guidance</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Personalized training programs, nutrition planning, and motivation to help you achieve your health and fitness goals. Start your transformation today!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                <Zap size={20} />
                Start Training
              </Link>
              <Link 
                href="/services" 
                className="btn-outline flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                <Play size={20} />
                View Services
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Clients Transformed</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-3xl font-bold text-gray-900">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star size={20} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-3xl font-bold text-gray-900">4.9</span>
                </div>
                <div className="text-sm text-gray-600">Client Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Modern card design */}
          <div className="relative mt-8 lg:mt-0">
            {/* Main image card */}
            <div className="card-modern overflow-hidden">
              <div className="relative h-[500px] rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=1000&fit=crop"
                  alt="Fitness Training"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>
                
                {/* Floating info cards */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-medium w-48">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Users size={20} className="text-accent" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Group Classes</div>
                      <div className="text-sm text-gray-600">Daily Sessions</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-medium w-48">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Clock size={20} className="text-accent" />
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
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-accent to-accent-dark text-white rounded-2xl p-5 shadow-accent">
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
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-accent rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;