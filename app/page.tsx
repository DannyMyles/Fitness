'use client';

import { useState, useEffect, useRef } from 'react';
import Hero from "@/components/ui/Hero";
import Image from "next/image";
import Link from "next/link";
import { 
  Dumbbell, Heart, Zap, Clock, Users, Award, 
  ChevronRight, ArrowRight, Star, Play, Quote,
  CheckCircle, ArrowLeft, ArrowRight as ArrowRightIcon
} from 'lucide-react';

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Weight Loss Client",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    text: "Marksila254 transformed my life! I lost 30kg in 6 months with personalized training and nutrition guidance. The support and motivation kept me going even on tough days.",
    achievement: "-30kg Lost"
  },
  {
    id: 2,
    name: "James K.",
    role: "Muscle Building",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
    text: "The best personal trainer in Nairobi! Customized programs that actually work. I've gained significant muscle mass and improved my overall strength dramatically.",
    achievement: "+15kg Muscle"
  },
  {
    id: 3,
    name: "Emily R.",
    role: "Fitness Enthusiast",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 5,
    text: "Amazing energy and expertise! The group classes are incredibly motivating. I've never felt stronger or more confident in my fitness journey.",
    achievement: "Marathon Ready"
  }
];

// Gallery images
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop", alt: "Fitness Training" },
  { src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop", alt: "Weight Training" },
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", alt: "Personal Training" },
  { src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop", alt: "HIIT Workout" },
];

// Features data
const features = [
  {
    icon: Dumbbell,
    title: "Modern Equipment",
    description: "State-of-the-art fitness equipment for optimal training results",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Heart,
    title: "Personalized Plans",
    description: "Customized workout and nutrition plans tailored to your goals",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Zap,
    title: "Online Support",
    description: "24/7 virtual support and guidance for your fitness journey",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Training sessions available early morning to late evening",
    color: "from-teal-500 to-cyan-500"
  }
];

// Process steps
const processSteps = [
  { step: "01", title: "Consultation", description: "Free initial consultation to discuss your goals and assess your needs" },
  { step: "02", title: "Custom Plan", description: "Receive a personalized training and nutrition plan tailored to you" },
  { step: "03", title: "Training", description: "Begin your training program with ongoing support and adjustments" },
  { step: "04", title: "Results", description: "Achieve your goals and maintain your new healthy lifestyle" }
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge mb-4">
              <Zap size={16} />
              <span>Why Choose Me</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Transform With <span className="text-gradient-mixed">Expert Guidance</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional fitness training with personalized attention to help you achieve your health and wellness goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="feature-card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-gradient-to-br from-fitness-light via-white to-fitness-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-fitness-lg">
                <Image
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=1000&fit=crop"
                  alt="Fitness Trainer"
                  width={600}
                  height={750}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-fitness-primary to-fitness-accent text-white rounded-2xl p-6 shadow-fitness-lg animate-bounce-slow">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm">Years Experience</div>
              </div>
              
              {/* Stats Badge */}
              <div className="absolute -top-6 -left-6 glass rounded-2xl p-5 shadow-fitness">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 rounded-xl flex items-center justify-center">
                    <Users size={28} className="text-fitness-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Clients</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 badge">
                <Award size={16} />
                <span>Certified Personal Trainer</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                About <span className="text-gradient-primary">Marksila254</span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Passionate about helping people transform their lives through fitness, proper nutrition, and sustainable lifestyle changes. With over 10 years of experience, I've helped hundreds of clients achieve their health and wellness goals.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                My approach combines scientific training principles with practical nutrition guidance to create sustainable lifestyle changes that last a lifetime.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: CheckCircle, text: "Certified Trainer" },
                  { icon: CheckCircle, text: "Personalized Approach" },
                  { icon: CheckCircle, text: "Online Support" },
                  { icon: CheckCircle, text: "Flexible Scheduling" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-fitness-primary to-fitness-accent rounded-full flex items-center justify-center">
                      <item.icon size={14} className="text-white" />
                    </div>
                    <span className="font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link 
                  href="/about"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Learn More About Me
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge mb-4">
              <Zap size={16} />
              <span>What I Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Training <span className="text-gradient-accent">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional fitness services tailored to help you achieve your health and wellness goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Dumbbell,
                title: "Personal Training",
                description: "One-on-one customized training sessions tailored to your specific goals",
                price: "From KES 2,000/session",
                color: "from-orange-500 to-red-500",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600"
              },
              {
                icon: Users,
                title: "Group Classes",
                description: "Energetic group workouts with camaraderie and team motivation",
                price: "From KES 500/session",
                color: "from-teal-500 to-cyan-500",
                image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600"
              },
              {
                icon: Heart,
                title: "Nutrition Coaching",
                description: "Comprehensive nutrition guidance and meal planning for optimal results",
                price: "From KES 3,000/month",
                color: "from-green-500 to-emerald-500",
                image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600"
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="service-card group"
              >
                <div className="relative h-56 overflow-hidden service-card-image">
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
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-gradient-primary font-bold">{service.price}</span>
                    <Link 
                      href="/services"
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

          <div className="text-center mt-12">
            <Link 
              href="/services"
              className="btn-secondary inline-flex items-center gap-2"
            >
              View All Services
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge mb-4">
              <Zap size={16} />
              <span>How It Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Start Your <span className="text-gradient-mixed">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to begin your fitness transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <div 
                key={index}
                className="relative text-center group"
              >
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${index === 0 ? 'from-fitness-primary to-fitness-accent' : index === 1 ? 'from-fitness-accent to-teal-500' : index === 2 ? 'from-teal-500 to-cyan-500' : 'from-cyan-500 to-fitness-primary'} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-fitness-primary to-fitness-accent text-white text-2xl font-bold rounded-full flex items-center justify-center shadow-fitness transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                
                {/* Arrow connector for desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%]">
                    <ArrowRightIcon size={24} className="text-fitness-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-fitness-dark via-fitness-secondary to-fitness-dark relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm mb-4">
              <Star size={16} className="text-yellow-400" />
              <span>Client Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              What <span className="text-gradient-primary">Clients Say</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Real stories from real people who transformed their lives.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12">
              {/* Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ArrowRightIcon size={20} />
              </button>

              {/* Testimonial Content */}
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <Quote size={48} className="text-fitness-primary/50" />
                </div>
                
                <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                <div className="flex items-center justify-center gap-6">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-fitness-primary"
                  />
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="font-bold text-white text-lg">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-400 text-sm">{testimonials[currentTestimonial].role}</div>
                  </div>
                  <div className="ml-4 bg-gradient-to-br from-fitness-primary to-fitness-accent text-white px-4 py-2 rounded-xl font-bold text-sm">
                    {testimonials[currentTestimonial].achievement}
                  </div>
                </div>
              </div>

              {/* Dots Navigation */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentTestimonial(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-gradient-to-r from-fitness-primary to-fitness-accent w-8' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge mb-4">
              <Zap size={16} />
              <span>Gallery</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Training <span className="text-gradient-primary">Moments</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Glimpses of fitness sessions and client transformations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className={`relative overflow-hidden rounded-2xl group ${
                  index === 0 || index === 3 ? 'md:col-span-2' : ''
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 md:h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/gallery"
              className="btn-primary inline-flex items-center gap-2"
            >
              View Full Gallery
              <ArrowRight size={20} />
            </Link>
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
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Start your fitness journey today with professional guidance and personalized training programs designed just for you.
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
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

