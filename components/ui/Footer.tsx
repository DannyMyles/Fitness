'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, Mail, MapPin, 
  Facebook, Twitter, Linkedin, Instagram, 
  Dumbbell, Heart, Clock, ShoppingBag, Users,
  ArrowRight, Send, Zap, Sparkles, CheckCircle,
  Calendar, Award, Target, Shield
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(-1);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'from-blue-500 to-blue-600', label: 'Facebook' },
    { icon: Twitter, href: '#', color: 'from-sky-400 to-sky-500', label: 'Twitter' },
    { icon: Linkedin, href: '#', color: 'from-blue-600 to-blue-700', label: 'LinkedIn' },
    { icon: Instagram, href: '#', color: 'from-pink-500 to-purple-500', label: 'Instagram' },
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

  const features = [
    { icon: Target, text: 'Certified Trainer', count: '5+' },
    { icon: Award, text: 'Happy Clients', count: '200+' },
    { icon: Calendar, text: 'Classes/Month', count: '50+' },
    { icon: Shield, text: 'Success Rate', count: '98%' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fitness-primary/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-fitness-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fitness-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-6 h-6 rounded-full bg-fitness-primary/30 animate-float"></div>
      <div className="absolute top-20 right-20 w-8 h-8 rounded-full bg-fitness-accent/30 animate-float-delayed"></div>
      <div className="absolute bottom-20 left-1/3 w-4 h-4 rounded-full bg-white/20 animate-float"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Newsletter Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-800 p-8 mb-16"
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-fitness-primary/10 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-fitness-accent/10 rounded-full translate-x-16 translate-y-16"></div>
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-fitness-primary to-fitness-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Sparkles size={16} />
                <span>Exclusive Content</span>
              </div>
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                Transform Your Fitness Journey
              </h3>
              <p className="text-gray-300 max-w-xl">
                Join our community of fitness enthusiasts. Get weekly workout plans, nutrition tips, and exclusive discounts delivered to your inbox.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full sm:w-80 px-5 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fitness-primary focus:border-transparent transition-all duration-300"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn-primary group relative overflow-hidden"
              >
                <span className="relative flex items-center gap-2">
                  {subscribed ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Subscribed!</span>
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
                  src="/images/017.PNG"
                  alt="Marksila 254"
                  width={100}
                  height={100}
                  className="inline-block"
                />
                <p className="text-sm text-gray-400 mt-1">Love Your Body</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              Transforming lives through expert fitness training, nutrition guidance, and personalized workout programs tailored to your goals.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <feature.icon size={16} className="text-fitness-primary" />
                    <span className="text-sm text-gray-300">{feature.text}</span>
                  </div>
                  <div className="text-xl font-bold mt-1">{feature.count}</div>
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
            <h4 className="text-lg font-semibold relative">
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-fitness-primary to-fitness-accent rounded-full"></span>
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
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${isHovered === index ? 'from-fitness-primary to-fitness-accent' : 'from-gray-600 to-gray-600'} transition-all duration-300`}></div>
                    <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
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
            <h4 className="text-lg font-semibold relative">
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-fitness-accent to-fitness-primary rounded-full"></span>
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
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${isHovered === index + 10 ? 'from-fitness-primary to-fitness-accent' : 'from-gray-600 to-gray-600'} transition-all duration-300`}></div>
                    <span className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
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
            <h4 className="text-lg font-semibold relative">
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-fitness-primary to-fitness-accent rounded-full"></span>
              Connect With Us
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-800 hover:border-fitness-primary/50 transition-all duration-300">
                <div className="p-2 bg-fitness-primary/20 rounded-lg">
                  <Phone size={18} className="text-fitness-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Call Us</p>
                  <a href="tel:+254700000000" className="font-medium hover:text-fitness-primary transition-colors">
                    +254 701 437 959
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-800 hover:border-fitness-accent/50 transition-all duration-300">
                <div className="p-2 bg-fitness-accent/20 rounded-lg">
                  <Mail size={18} className="text-fitness-accent" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email Us</p>
                  <a href="mailto:markotundo777@gmail.com" className="font-medium hover:text-fitness-accent transition-colors">
                    markotundo777@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Follow Our Journey</p>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 hover:shadow-lg ${social.color}`}
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
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-sm">
              <p>© {currentYear} <span className="text-white font-semibold">Marksila254</span>. All rights reserved.</p>
            </div>
            
            <div className="flex items-center gap-8 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors hover:underline">
                Terms & Conditions
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors hover:underline">
                Sitemap
              </Link>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-400">
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