'use client';

import { Shield, Target, Users, Globe, Award, Clock, CheckCircle, Dumbbell, Heart, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const stats = [
    { icon: Users, value: '500+', label: 'Clients Transformed' },
    { icon: Clock, value: '10+', label: 'Years Experience' },
    { icon: Award, value: '50+', label: 'Certifications' },
    { icon: Target, value: '98%', label: 'Success Rate' },
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
            backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark/90 to-fitness-dark/70"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-fitness-primary/20 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award size={16} />
              <span>Certified Personal Trainer</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              About <span className="text-fitness-accent">Marksila254</span>
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              Passionate about helping people transform their lives through fitness, 
              proper nutrition, and sustainable lifestyle changes.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-fitness-primary/10 rounded-2xl mb-4">
                  <stat.icon size={32} className="text-fitness-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-fitness-dark mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-fitness-lg">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=1000&fit=crop"
                    alt="Fitness Trainer"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-fitness-accent text-white rounded-2xl p-6 shadow-fitness-lg">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm">Years of Experience</div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-fitness-dark">
                My Fitness Journey
              </h2>
              <p className="text-gray-600 leading-relaxed">
                I started my fitness journey over a decade ago, driven by a personal transformation 
                that changed my life. What began as a personal quest for better health quickly 
                turned into a passion for helping others achieve their goals.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through years of dedicated study, certification, and hands-on experience, I've 
                developed training methodologies that deliver real results. My approach combines 
                scientific training principles with practical nutrition guidance to create 
                sustainable lifestyle changes.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you're looking to lose weight, build muscle, improve athletic performance, 
                or simply feel more energetic, I'm here to guide you every step of the way.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-fitness-primary/10 rounded-lg flex items-center justify-center mt-0.5">
                      <CheckCircle size={16} className="text-fitness-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-fitness-dark">{value.title}</h4>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fitness-dark mb-4">
              What I Stand For
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My core values guide every training session and every client interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-fitness p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-fitness-primary to-fitness-primaryDark rounded-2xl mb-4 mx-auto">
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-fitness-dark">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-fitness-primary to-fitness-primaryDark text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Transformation?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's work together to achieve your fitness goals and create a healthier, stronger you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-fitness-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started Today
              </Link>
              <Link 
                href="/services" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
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

