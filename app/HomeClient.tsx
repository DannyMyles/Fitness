'use client';

import { useState, useEffect, useRef } from 'react';
import Hero from "@/components/ui/Hero";
import CtaSection from "@/components/ui/CtaSection";
import Image from "next/image";
import Link from "next/link";
import {
  Dumbbell, Heart, Zap, Clock, Users, Award,
  ChevronRight, ArrowRight, Star, Play, Quote,
  ArrowLeft, ArrowRight as ArrowRightIcon, Loader2,
  AlertCircle, CheckCircle, Upload
} from 'lucide-react';
import { testimonialService, Testimonial } from '@/app/api_services/testimonialService';

// Gallery images
const galleryImages = [
  { src: "/images/004.JPG", alt: "Fitness Training" },
  { src: "/images/028.JPG", alt: "Weight Training" },
  { src: "/images/021.JPG", alt: "Personal Training" },
  { src: "/images/007.JPG", alt: "HIIT Workout" },
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
    color: "from-fitness-primary-dark to-fitness-primary"
  }
];

export default function HomeClient() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [tName, setTName] = useState('');
  const [tRole, setTRole] = useState('');
  const [tCompany, setTCompany] = useState('');
  const [tContent, setTContent] = useState('');
  const [tRating, setTRating] = useState(5);
  const [tPhoto, setTPhoto] = useState<File | null>(null);
  const [tPhotoPreview, setTPhotoPreview] = useState('');
  const [isSubmittingTestimonial, setIsSubmittingTestimonial] = useState(false);
  const [testimonialSubmitted, setTestimonialSubmitted] = useState(false);
  const [testimonialError, setTestimonialError] = useState('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setTestimonialError('Please choose an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setTestimonialError('Photo must be under 5MB.');
      return;
    }
    setTestimonialError('');
    setTPhoto(file);
    setTPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestimonialError('');
    if (!tName.trim() || !tRole.trim() || tContent.trim().length < 20) {
      setTestimonialError('Please fill in your name, role, and at least 20 characters about your experience.');
      return;
    }
    setIsSubmittingTestimonial(true);
    try {
      await testimonialService.submitTestimonial({
        name: tName,
        role: tRole,
        company: tCompany || undefined,
        content: tContent,
        rating: tRating,
        photoFile: tPhoto,
      });
      setTestimonialSubmitted(true);
    } catch (err: any) {
      setTestimonialError(err?.message || 'Could not submit your testimonial. Please try again.');
    } finally {
      setIsSubmittingTestimonial(false);
    }
  };

  useEffect(() => {
    testimonialService
      .getAllTestimonials()
      .then((res) => setTestimonials(testimonialService.getFeaturedForDisplay(res.testimonials)))
      .catch(() => setTestimonials([]))
      .finally(() => setIsLoadingTestimonials(false));
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      <Hero />

      {/* Features Section */}
      <section className="">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge mb-4">
              <Zap size={16} />
              <span>Why Choose Me</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Transform With <span className="text-gradient-mixed">Expert Guidance</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
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
                <p className="text-gray-700">{feature.description}</p>
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
                  src="/images/026.JPG"
                  alt="Fitness Trainer"
                  width={600}
                  height={750}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-fitness-primary to-fitness-primary-dark text-white rounded-2xl p-6 shadow-fitness-lg animate-bounce-slow">
                <div className="text-3xl font-bold">10</div>
                <div className="text-sm">Years Experience</div>
              </div>
              
              {/* Stats Badge */}
              <div className="absolute -top-6 -left-6 glass rounded-2xl p-5 shadow-fitness">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-fitness-primary/20 to-fitness-primary-dark/20 rounded-xl flex items-center justify-center">
                    <Users size={28} className="text-fitness-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">100+</div>
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
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Passionate about helping people transform their lives through fitness, proper nutrition, and sustainable lifestyle changes. With over 10 years of experience, I've helped hundreds of clients achieve their health and wellness goals.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                My approach combines scientific training principles with practical nutrition guidance to create sustainable lifestyle changes that last a lifetime.
              </p>

              <div className="pt-2">
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

      {/* Services Preview Section — compact teaser, full detail lives on /services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 badge mb-4">
                <Zap size={16} />
                <span>What I Offer</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Training <span className="text-gradient-accent">Services</span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: Dumbbell, title: 'Personal Training' },
                { icon: Users, title: 'Group Classes' },
                { icon: Heart, title: 'Nutrition Coaching' },
              ].map((service, index) => (
                <Link
                  key={index}
                  href="/services"
                  className="flex items-center gap-2 bg-white px-4 py-3 rounded-full shadow-sm hover:shadow-fitness hover:-translate-y-0.5 transition-all duration-300"
                >
                  <service.icon size={18} className="text-fitness-primary" />
                  <span className="font-medium text-gray-800 text-sm">{service.title}</span>
                </Link>
              ))}
            </div>

            <Link
              href="/services"
              className="btn-secondary inline-flex items-center gap-2 whitespace-nowrap"
            >
              View All Services
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {(isLoadingTestimonials || testimonials.length > 0) && (
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 badge mb-4">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span>Client Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What <span className="text-gradient-primary">Clients Say</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from real people who transformed their lives.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {isLoadingTestimonials ? (
              <div className="flex items-center justify-center py-16 text-gray-400">
                <Loader2 className="animate-spin" size={32} />
              </div>
            ) : (
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-card border border-gray-100">
              {/* Navigation Buttons */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
                    aria-label="Next testimonial"
                  >
                    <ArrowRightIcon size={20} />
                  </button>
                </>
              )}

              {/* Testimonial Content */}
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <Quote size={48} className="text-fitness-primary/40" />
                </div>

                <p className="text-xl md:text-2xl leading-relaxed mb-8 text-gray-800">
                  "{testimonials[currentTestimonial].content}"
                </p>

                <div className="flex items-center justify-center gap-6">
                  {testimonials[currentTestimonial].photoInfo?.hasPhoto ? (
                    <img
                      src={testimonialService.getPhotoUrl(testimonials[currentTestimonial])}
                      alt={testimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-fitness-primary flex-shrink-0"
                    />
                  ) : (
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-fitness-primary text-white font-bold text-lg flex-shrink-0"
                      style={{ backgroundColor: testimonials[currentTestimonial].avatarColor }}
                    >
                      {testimonials[currentTestimonial].image || testimonialService.getInitials(testimonials[currentTestimonial].name)}
                    </div>
                  )}
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="font-bold text-lg text-gray-900">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-500 text-sm">{testimonials[currentTestimonial].role}</div>
                  </div>
                  {testimonials[currentTestimonial].achievement && (
                    <div className="ml-4 bg-gradient-to-br from-fitness-primary to-fitness-primary-dark text-white px-4 py-2 rounded-xl font-bold text-sm">
                      {testimonials[currentTestimonial].achievement}
                    </div>
                  )}
                </div>
              </div>

              {/* Dots Navigation */}
              {testimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentTestimonial(index);
                      }}
                      className="p-2 flex items-center justify-center"
                      aria-label={`Go to testimonial ${index + 1}`}
                    >
                      <span
                        className={`h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? 'bg-gradient-to-r from-fitness-primary to-fitness-primary-dark w-8'
                            : 'w-3 bg-gray-200 hover:bg-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Share Your Experience — public testimonial submission, pending admin approval */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 badge mb-4">
                <Quote size={16} className="text-fitness-primary" />
                <span>Share Your Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trained With <span className="text-gradient-primary">Marksila254?</span>
              </h2>
              <p className="text-lg text-gray-600">
                Tell us about your experience — approved stories get featured above.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100">
              {testimonialSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-fitness-primary to-fitness-primary-dark rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your testimonial has been submitted and is pending review.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitTestimonial} className="space-y-5">
                  {testimonialError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                      <AlertCircle size={20} className="text-red-500 shrink-0" />
                      <p className="text-sm text-red-600">{testimonialError}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={tName}
                        onChange={(e) => setTName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role / Occupation</label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        value={tRole}
                        onChange={(e) => setTRole(e.target.value)}
                        placeholder="e.g. Client, Software Engineer"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company (optional)</label>
                    <input
                      type="text"
                      maxLength={100}
                      value={tCompany}
                      onChange={(e) => setTCompany(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setTRating(i + 1)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star className={`h-7 w-7 ${i < tRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Experience</label>
                    <textarea
                      required
                      minLength={20}
                      maxLength={500}
                      rows={4}
                      value={tContent}
                      onChange={(e) => setTContent(e.target.value)}
                      placeholder="Tell us how training with Marksila254 has helped you..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                    />
                    <p className="text-xs text-gray-400 mt-1">{tContent.length}/500 (min 20 characters)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photo (optional)</label>
                    <div className="flex items-center gap-4">
                      {tPhotoPreview && (
                        <img src={tPhotoPreview} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-fitness-primary" />
                      )}
                      <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-fitness-primary hover:text-fitness-primary transition-colors cursor-pointer">
                        <Upload size={16} />
                        {tPhoto ? 'Change Photo' : 'Upload Photo'}
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingTestimonial}
                    className="w-full btn-fitness py-4 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmittingTestimonial ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Testimonial'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section — compact teaser, full grid lives on /gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex gap-3 shrink-0">
              {galleryImages.slice(0, 3).map((image, index) => (
                <div key={index} className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover object-top" />
                </div>
              ))}
            </div>

            <div className="text-center lg:text-left flex-1">
              <div className="inline-flex items-center gap-2 badge mb-3">
                <Zap size={16} />
                <span>Gallery</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Training <span className="text-gradient-primary">Moments</span>
              </h2>
              <p className="text-gray-600">Glimpses of fitness sessions and client transformations.</p>
            </div>

            <Link
              href="/gallery"
              className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
            >
              View Full Gallery
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to Transform Your Life?"
        subtitle="Start your fitness journey today with professional guidance and personalized training programs designed just for you."
        primary={{ label: 'Get Started Today', href: '/contact' }}
        secondary={{ label: 'Explore Services', href: '/services' }}
      />
    </>
  );
}

