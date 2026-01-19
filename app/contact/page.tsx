'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, Mail, MapPin, Clock, Send, 
  Facebook, Twitter, Instagram, Linkedin,
  MessageCircle, Calendar, ChevronRight,
  CheckCircle, ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+254 700 000 000', '+254 711 111 111'],
      link: 'tel:+254700000000',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@marksila254.com', 'bookings@marksila254.com'],
      link: 'mailto:info@marksila254.com',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: ['Nairobi, Kenya'],
      link: '#',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 6:00 AM - 9:00 PM', 'Sunday: 8:00 AM - 2:00 PM'],
      link: '#',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const services = [
    'Personal Training',
    'Group Classes',
    'Online Training',
    'Nutrition Coaching',
    'Weight Loss Program',
    'Muscle Building',
    'Corporate Fitness',
    'Other'
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1552674605-469523254d4d?w=1920')"
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
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-fitness-primary/20 to-fitness-accent/20 border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm mb-6">
              <MessageCircle size={18} />
              <span>Get In Touch</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to <span className="text-gradient-primary">Transform</span>?
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              Contact me today and let's discuss how I can help you achieve your fitness goals.
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

      {/* Contact Info Cards */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <a 
                key={index}
                href={info.link}
                className="bg-white rounded-2xl p-6 shadow-fitness hover:shadow-fitness-lg transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <info.icon size={28} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-to-br from-fitness-light via-white to-fitness-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-card hover:shadow-fitness transition-all duration-500">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 badge mb-3">
                  <Send size={16} />
                  <span>Send a Message</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Let's Start Your <span className="text-gradient-primary">Journey</span>
                </h2>
                <p className="text-gray-600 mt-2">Fill out the form below and I'll get back to you within 24 hours.</p>
              </div>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-fitness-primary to-fitness-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="form-input"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="form-input"
                        placeholder="+254 700 000 000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="form-input"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="form-input"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="form-input resize-none"
                      rows={4}
                      placeholder="Tell me about your fitness goals..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Quick Contact Options */}
              <div className="bg-gradient-to-br from-fitness-primary via-fitness-primaryDark to-fitness-accent rounded-3xl p-8 text-white relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-6">Quick Contact Options</h3>
                  <div className="space-y-4">
                    <a 
                      href="https://wa.me/254700000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:translate-x-2"
                    >
                      <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center shadow-fitness">
                        <MessageCircle size={24} />
                      </div>
                      <div>
                        <p className="font-semibold">WhatsApp</p>
                        <p className="text-sm text-white/80">Get instant response</p>
                      </div>
                      <ArrowRight size={20} className="ml-auto" />
                    </a>
                    <Link 
                      href="/events"
                      className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:translate-x-2"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-fitness-accent to-fitness-accentDark rounded-xl flex items-center justify-center shadow-fitness">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <p className="font-semibold">Book a Session</p>
                        <p className="text-sm text-white/80">Schedule your first training</p>
                      </div>
                      <ArrowRight size={20} className="ml-auto" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl p-8 shadow-card hover:shadow-fitness transition-all duration-500">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Follow Me</h3>
                <p className="text-gray-600 mb-6">
                  Stay updated with fitness tips, workout videos, and special offers.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: Instagram, color: 'from-pink-500 to-purple-600', href: '#' },
                    { icon: Facebook, color: 'from-blue-600 to-blue-700', href: '#' },
                    { icon: Twitter, color: 'from-sky-400 to-sky-500', href: '#' },
                    { icon: Linkedin, color: 'from-blue-700 to-blue-800', href: '#' },
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-white hover:shadow-fitness-lg transition-all duration-300 hover:-translate-y-1`}
                    >
                      <social.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:border-fitness-primary/20 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-fitness-primary/20 to-fitness-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ChevronRight size={24} className="text-fitness-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Have Questions?</h3>
                    <p className="text-gray-600 mb-4">
                      Check out our frequently asked questions to find quick answers to common inquiries.
                    </p>
                    <Link 
                      href="/faq"
                      className="inline-flex items-center gap-2 text-fitness-primary font-medium hover:text-fitness-primaryDark transition-colors"
                    >
                      View FAQ
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 badge mb-4">
            <MapPin size={16} />
            <span>Visit My Studio</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Come See Me <span className="text-gradient-mixed">In Person</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Visit my fitness studio for a consultation or to learn more about my training programs.
          </p>
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl h-80 flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-fitness-primary/5 to-fitness-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-fitness-primary to-fitness-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-fitness-lg transform transition-all duration-500 group-hover:scale-110">
                <MapPin size={36} className="text-white" />
              </div>
              <p className="text-gray-600 mb-4">Nairobi, Kenya</p>
              <span className="inline-flex items-center gap-2 text-fitness-primary font-medium">
                Open in Google Maps
                <ArrowRight size={18} />
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

