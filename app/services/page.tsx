'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Dumbbell, Heart, Zap, Clock, Users, Award, 
  ChevronRight, CheckCircle, Star, ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: Dumbbell,
    title: 'Personal Training',
    description: 'One-on-one customized training sessions tailored to your specific goals, fitness level, and schedule.',
    features: ['Custom workout plans', 'Progress tracking', 'Technique guidance', 'Motivation & accountability'],
    price: 'From KES 2,000/session',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Users,
    title: 'Group Classes',
    description: 'Energetic group workouts designed to push you harder while enjoying the camaraderie of fellow fitness enthusiasts.',
    features: ['HIIT sessions', 'Strength training', 'Cardio workouts', 'Team motivation'],
    price: 'From KES 500/session',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: Heart,
    title: 'Nutrition Coaching',
    description: 'Comprehensive nutrition guidance and meal planning to fuel your body and support your fitness goals.',
    features: ['Personalized meal plans', 'Macro calculations', 'Food education', 'Habit formation'],
    price: 'From KES 3,000/month',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Zap,
    title: 'Online Training',
    description: 'Professional training programs you can follow from anywhere, with virtual support and guidance.',
    features: ['Video workouts', 'Weekly check-ins', 'App support', 'Flexible scheduling'],
    price: 'From KES 5,000/month',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=600',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Award,
    title: 'Weight Loss Program',
    description: 'Structured programs designed to help you lose weight safely and sustainably through training and nutrition.',
    features: ['Body composition analysis', 'Calorie guidance', 'Exercise programming', 'Lifestyle coaching'],
    price: 'From KES 15,000/month',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: Clock,
    title: 'Muscle Building',
    description: 'Hypertrophy-focused training programs to help you build lean muscle mass and increase strength.',
    features: ['Progressive overload', 'Split routines', 'Recovery protocols', 'Supplement guidance'],
    price: 'From KES 18,000/month',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
    color: 'from-yellow-500 to-orange-500'
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

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

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
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark/90 to-fitness-primary/70"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              My <span className="text-fitness-accent">Services</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Professional fitness services tailored to help you achieve your health and wellness goals.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-fitness-dark mb-4">
              Training Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from a variety of training options designed to fit your lifestyle and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="card-fitness overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-fitness-dark/80 to-transparent`}></div>
                  <div className={`absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
                    <service.icon size={24} className="text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-fitness-dark mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-fitness-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-fitness-primary font-semibold">{service.price}</span>
                    <Link 
                      href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center gap-1 text-fitness-dark font-medium hover:text-fitness-primary transition-colors"
                    >
                      Learn More
                      <ArrowRight size={16} />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-fitness-lg">
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800"
                  alt="Fitness Training"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-fitness-accent text-white rounded-2xl p-6 shadow-fitness-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Star size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4.9/5</div>
                    <div className="text-sm">Client Rating</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-fitness-dark mb-6">
                Why Train With Me?
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                With over 10 years of experience and hundreds of satisfied clients, I bring 
                expertise, passion, and personalized attention to every training session.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-fitness-primary/10 rounded-lg flex items-center justify-center">
                      <CheckCircle size={18} className="text-fitness-primary" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/contact" className="btn-fitness">
                  Start Your Journey
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-fitness-dark mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to start your fitness transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'Free initial consultation to discuss your goals and assess your needs.' },
              { step: '02', title: 'Custom Plan', description: 'Receive a personalized training and nutrition plan tailored to you.' },
              { step: '03', title: 'Training', description: 'Begin your training program with ongoing support and adjustments.' },
              { step: '04', title: 'Results', description: 'Achieve your goals and maintain your new healthy lifestyle.' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-fitness-primary text-white text-2xl font-bold rounded-full mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-fitness-dark mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
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
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contact me today to schedule your free consultation and start your journey.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-fitness-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

