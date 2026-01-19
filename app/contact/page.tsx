'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, Mail, MapPin, Clock, Send, 
  Facebook, Twitter, Instagram, Linkedin,
  MessageCircle, Calendar, ChevronRight
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
      link: 'tel:+254700000000'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@marksila254.com', 'bookings@marksila254.com'],
      link: 'mailto:info@marksila254.com'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: ['Nairobi, Kenya'],
      link: '#'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 6:00 AM - 9:00 PM', 'Sunday: 8:00 AM - 2:00 PM'],
      link: '#'
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
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark/90 to-fitness-primary/70"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get In <span className="text-fitness-accent">Touch</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Ready to start your fitness journey? Contact me today and let's discuss how I can help you achieve your goals.
            </p>
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
                className="bg-white rounded-xl p-6 shadow-fitness hover:shadow-fitness-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-fitness-primary to-fitness-primaryDark rounded-xl flex items-center justify-center mb-4">
                  <info.icon size={28} className="text-white" />
                </div>
                <h3 className="font-semibold text-fitness-dark mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-fitness-dark mb-2">Send a Message</h2>
              <p className="text-gray-600 mb-6">Fill out the form below and I'll get back to you within 24 hours.</p>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-fitness-dark mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-fitness"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                        placeholder="+254 700 000 000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                      rows={4}
                      placeholder="Tell me about your fitness goals..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-fitness py-4 flex items-center justify-center gap-2"
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
              <div className="bg-gradient-to-r from-fitness-primary to-fitness-primaryDark rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Quick Contact Options</h3>
                <div className="space-y-4">
                  <a 
                    href="https://wa.me/254700000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center">
                      <MessageCircle size={24} />
                    </div>
                    <div>
                      <p className="font-semibold">WhatsApp</p>
                      <p className="text-sm text-white/80">Get instant response</p>
                    </div>
                  </a>
                  <Link 
                    href="/events"
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <div className="w-12 h-12 bg-fitness-accent rounded-xl flex items-center justify-center">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="font-semibold">Book a Session</p>
                      <p className="text-sm text-white/80">Schedule your first training</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-8 shadow-card">
                <h3 className="text-xl font-bold text-fitness-dark mb-6">Follow Me</h3>
                <p className="text-gray-600 mb-6">
                  Stay updated with fitness tips, workout videos, and special offers on social media.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center hover:shadow-fitness-lg transition-all hover:-translate-y-1"
                  >
                    <Instagram size={24} className="text-white" />
                  </a>
                  <a 
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:shadow-fitness-lg transition-all hover:-translate-y-1"
                  >
                    <Facebook size={24} className="text-white" />
                  </a>
                  <a 
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center hover:shadow-fitness-lg transition-all hover:-translate-y-1"
                  >
                    <Twitter size={24} className="text-white" />
                  </a>
                  <a 
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl flex items-center justify-center hover:shadow-fitness-lg transition-all hover:-translate-y-1"
                  >
                    <Linkedin size={24} className="text-white" />
                  </a>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-white rounded-2xl p-8 shadow-card">
                <h3 className="text-xl font-bold text-fitness-dark mb-4">Have Questions?</h3>
                <p className="text-gray-600 mb-4">
                  Check out our frequently asked questions to find quick answers to common inquiries.
                </p>
                <Link 
                  href="/faq"
                  className="inline-flex items-center gap-2 text-fitness-primary font-medium hover:text-fitness-primaryDark transition-colors"
                >
                  View FAQ
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-fitness-dark mb-4">
            Visit My Studio
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Come see me at my fitness studio for a consultation or to learn more about my training programs.
          </p>
          <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="mx-auto mb-4 text-fitness-primary" />
              <p className="text-gray-600">Map loading...</p>
              <a 
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-fitness-primary font-medium hover:text-fitness-primaryDark"
              >
                Open in Google Maps
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

