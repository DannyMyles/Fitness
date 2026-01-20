'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, Mail, MapPin, 
  Facebook, Twitter, Linkedin, Instagram, 
  Dumbbell, Heart, Clock, ShoppingBag, Users,
  ArrowRight, Send, Zap
} from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'from-blue-600 to-blue-700', label: 'Facebook' },
    { icon: Twitter, href: '#', color: 'from-sky-400 to-sky-500', label: 'Twitter' },
    { icon: Linkedin, href: '#', color: 'from-blue-700 to-blue-800', label: 'LinkedIn' },
    { icon: Instagram, href: '#', color: 'from-pink-500 to-purple-600', label: 'Instagram' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Me', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    { name: 'Personal Training', href: '/services/personal-training' },
    { name: 'Group Classes', href: '/services/group-classes' },
    { name: 'Online Training', href: '/services/online-training' },
    { name: 'Nutrition Coaching', href: '/services/nutrition-coaching' },
    { name: 'Fitness Shop', href: '/shop' },
  ];

  return (
    <footer className="bg-gradient-to-br from-fitness-dark via-fitness-secondary to-fitness-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-fitness-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fitness-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-fitness-primary to-fitness-primaryDark rounded-2xl shadow-fitness">
                <Dumbbell size={28} className="text-white" />
              </div>
              <div>
                <Image
                    src="/images/mark_logo.jpg"
                    alt="Marksila 254"
                    width={88}
                    height={88}
                    className="inline-block ml-1 -mt-1"
                  />
              </div>
            </div>
            <p className="text-gray-200 leading-relaxed">
              Transforming lives through expert fitness training, nutrition guidance, and personalized workout programs tailored to your goals.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-fitness ${social.color}`}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-fitness-primary to-fitness-accent rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-200 hover:text-fitness-primary transition-all duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-fitness-primary" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-fitness-accent to-fitness-primary rounded-full"></span>
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.href} 
                    className="text-gray-200 hover:text-fitness-accent transition-all duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-fitness-accent" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-fitness-primary to-fitness-accent rounded-full"></span>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-2 bg-fitness-primary/20 rounded-lg mt-1">
                  <Phone size={18} className="text-fitness-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href="tel:+254700000000" className="hover:text-fitness-primary transition-colors">
                    +254 700 000 000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 bg-fitness-accent/20 rounded-lg mt-1">
                  <Mail size={18} className="text-fitness-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:info@marksila254.com" className="hover:text-fitness-accent transition-colors">
                    info@marksila254.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 bg-fitness-primary/20 rounded-lg mt-1">
                  <MapPin size={18} className="text-fitness-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-medium">Nairobi, Kenya</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 bg-fitness-accent/20 rounded-lg mt-1">
                  <Clock size={18} className="text-fitness-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Working Hours</p>
                  <p className="font-medium">6:00 AM - 9:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="relative overflow-hidden bg-gradient-to-r from-fitness-primary/20 via-fitness-primary/10 to-fitness-accent/20 rounded-3xl p-8 mb-12">
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-fitness-primary/20 text-fitness-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                <Zap size={14} />
                <span>Stay Fit & Updated</span>
              </div>
              <h4 className="text-2xl font-bold mb-2">Join Our Fitness Community</h4>
              <p className="text-gray-200">Subscribe for fitness tips, nutrition guides, and exclusive offers.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fitness-primary focus:border-transparent transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="btn-primary whitespace-nowrap flex items-center gap-2 px-6 py-3.5"
              >
                {subscribed ? (
                  <>
                    <span className="text-lg">✓</span>
                    Subscribed
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>© {currentYear} Marksila254. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-fitness-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-fitness-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-fitness-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

