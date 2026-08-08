'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Phone, Mail, MapPin,
  Facebook, Instagram,
  Dumbbell, Heart, Clock, ShoppingBag, Users,
  ArrowRight, Send, Zap, Sparkles, CheckCircle,
  Calendar, Award, Target, Shield
} from 'lucide-react';
import { FaTiktok } from 'react-icons/fa6';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { newsletterService } from '@/app/api_services/newsletterService';

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
  { name: 'Refund & Returns', href: '/refund-policy' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');
  const [isHovered, setIsHovered] = useState(-1);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || subscribing) return;
    setSubscribing(true);
    setSubscribeError('');
    try {
      await newsletterService.subscribe(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err: any) {
      setSubscribeError(err?.message || 'Could not subscribe right now. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  const socialLinks = [
    { icon: FaTiktok, href: 'https://www.tiktok.com/@marksila254?_r=1&_t=ZS-98iPIkCwmXc', color: 'from-gray-800 to-black', label: 'TikTok' },
    { icon: Instagram, href: 'https://www.instagram.com/marksila254?igsh=MXIwZHl6dWFqZWZibA%3D%3D&utm_source=qr', color: 'from-pink-500 to-purple-500', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/share/14icQAkqW4y/?mibextid=wwXIfr', color: 'from-blue-500 to-blue-600', label: 'Facebook' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Me', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    { name: 'Personal Training', href: '/services' },
    { name: 'Group Classes', href: '/services' },
    { name: 'Online Training', href: '/services' },
    { name: 'Nutrition Coaching', href: '/services' },
    { name: 'Fitness Shop', href: '/shop' },
  ];

  const features = [
    { icon: Target, text: 'Certified Trainer', count: '2' },
    { icon: Award, text: 'Happy Clients', count: '100+' },
    { icon: Calendar, text: 'Classes/Month', count: '50+' },
    { icon: Shield, text: 'Success Rate', count: '98%' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gray-50 text-gray-700 border-t border-gray-100">
      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-fitness-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fitness-primary-dark/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-6 h-6 rounded-full bg-fitness-primary/20 animate-float"></div>
      <div className="absolute top-20 right-20 w-8 h-8 rounded-full bg-fitness-accent/20 animate-float-delayed"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Newsletter Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-card p-8 mb-16"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-fitness-primary/5 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-fitness-primary/5 rounded-full translate-x-16 translate-y-16"></div>

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-fitness-primary/10 text-fitness-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Sparkles size={16} />
                <span>Exclusive Content</span>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-fitness-dark">
                Transform Your Fitness Journey
              </h3>
              <p className="text-gray-600 max-w-xl">
                Join our community of fitness enthusiasts. Get weekly workout plans, nutrition tips, and exclusive discounts delivered to your inbox.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={subscribing}
                    className="w-full sm:w-80 px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-fitness-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fitness-primary focus:border-transparent transition-all duration-300 disabled:opacity-60"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={subscribing}
                  className="btn-primary group relative overflow-hidden disabled:opacity-70"
                >
                  <span className="relative flex items-center gap-2">
                    {subscribed ? (
                      <>
                        <CheckCircle size={20} />
                        <span>Subscribed!</span>
                      </>
                    ) : subscribing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Subscribe Now</span>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
              {subscribeError && (
                <p className="text-sm text-red-500 mt-2">{subscribeError}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 lg:col-span-2"
          >
            <div className="flex items-center gap-4">
              <div>
                <Image
                  src="/images/logo.svg"
                  alt="Marksila 254"
                  width={180}
                  height={146}
                  className="h-20 w-auto inline-block"
                />
                <p className="text-sm text-gray-500 mt-1">Love Your Body</p>
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed max-w-md">
              Transforming lives through expert fitness training, nutrition guidance, and personalized workout programs tailored to your goals.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-3 rounded-xl bg-white border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <feature.icon size={16} className="text-fitness-primary" />
                    <span className="text-sm text-gray-600">{feature.text}</span>
                  </div>
                  <div className="text-xl font-bold mt-1 text-fitness-dark">{feature.count}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold relative text-fitness-dark">
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-fitness-primary rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(-1)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-all duration-300 group"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isHovered === index ? 'bg-fitness-primary' : 'bg-gray-300'} transition-all duration-300`}></div>
                    <span className="text-gray-600 group-hover:text-fitness-dark group-hover:translate-x-1 transition-all duration-300">
                      {link.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold relative text-fitness-dark">
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-fitness-primary-dark rounded-full"></span>
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  onMouseEnter={() => setIsHovered(index + 10)}
                  onMouseLeave={() => setIsHovered(-1)}
                >
                  <Link
                    href={service.href}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-all duration-300 group"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isHovered === index + 10 ? 'bg-fitness-primary' : 'bg-gray-300'} transition-all duration-300`}></div>
                    <span className="text-gray-600 group-hover:text-fitness-dark group-hover:translate-x-1 transition-all duration-300">
                      {service.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold relative text-fitness-dark">
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-fitness-primary rounded-full"></span>
              Connect With Us
            </h4>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:border-fitness-primary/50 shadow-sm transition-all duration-300">
                <div className="p-2 bg-fitness-primary/10 rounded-lg shrink-0">
                  <Phone size={18} className="text-fitness-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500">Call Us</p>
                  <a href="tel:+254700000000" className="font-medium text-fitness-dark hover:text-fitness-primary transition-colors">
                    +254 701 437 959
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:border-fitness-accent/50 shadow-sm transition-all duration-300">
                <div className="p-2 bg-fitness-accent/10 rounded-lg shrink-0">
                  <Mail size={18} className="text-fitness-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500">Email Us</p>
                  <a href="mailto:markotundo777@gmail.com" className="font-medium text-fitness-dark hover:text-fitness-accent transition-colors break-all">
                    markotundo777@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-500 mb-3">Follow Our Journey</p>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white transition-all duration-300 hover:shadow-lg ${social.color}`}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-200 pt-8 space-y-6"
        >
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 hover:text-fitness-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              <p>© {currentYear} <span className="text-fitness-dark font-semibold">Marksila254</span>. All rights reserved.</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>in Nairobi</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;