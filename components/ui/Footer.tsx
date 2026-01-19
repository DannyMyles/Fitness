'use client';

import Link from 'next/link';
import { 
  Phone, Mail, MapPin, 
  Facebook, Twitter, Linkedin, Instagram, 
  Dumbbell, Heart, Clock, ShoppingBag, Users
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-fitness-dark to-fitness-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-fitness-primary to-fitness-primaryDark rounded-xl">
                <Dumbbell size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  Marksila<span className="text-fitness-primary">254</span>
                </h3>
                <p className="text-gray-400 text-sm">Professional Fitness Trainer</p>
              </div>
            </div>
            <p className="text-gray-300">
              Transforming lives through expert fitness training, nutrition guidance, and personalized workout programs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-fitness-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-fitness-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-fitness-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-fitness-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-fitness-accent transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-fitness-accent rounded-full"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-fitness-accent transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-fitness-accent rounded-full"></span>
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-fitness-accent transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-fitness-accent rounded-full"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-fitness-accent transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-fitness-accent rounded-full"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-fitness-accent transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-fitness-accent rounded-full"></span>
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-fitness-accent transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-fitness-accent rounded-full"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/personal-training" className="text-gray-300 hover:text-fitness-accent transition-colors flex items-center gap-2">
                  <Heart size={16} />
                  Personal Training
                </Link>
              </li>
              <li>
                <Link href="/services/group-classes" className="text-gray-300 hover:text-fitness-accent transition-colors flex items-center gap-2">
                  <Users size={16} />
                  Group Classes
                </Link>
              </li>
              <li>
                <Link href="/services/online-training" className="text-gray-300 hover:text-fitness-accent transition-colors flex items-center gap-2">
                  <Dumbbell size={16} />
                  Online Training
                </Link>
              </li>
              <li>
                <Link href="/services/nutrition-coaching" className="text-gray-300 hover:text-fitness-accent transition-colors flex items-center gap-2">
                  <Heart size={16} />
                  Nutrition Coaching
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-fitness-accent transition-colors flex items-center gap-2">
                  <ShoppingBag size={16} />
                  Fitness Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-fitness-accent" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href="tel:+254700000000" className="hover:text-fitness-accent transition-colors">
                    +254 700 000 000
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-fitness-accent" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:info@marksila254.com" className="hover:text-fitness-accent transition-colors">
                    info@marksila254.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-fitness-accent mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-medium">
                    Nairobi, Kenya
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-fitness-accent" />
                <div>
                  <p className="text-sm text-gray-400">Working Hours</p>
                  <p className="font-medium">
                    6:00 AM - 9:00 PM
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-white/10 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold mb-2">Stay Fit & Updated</h4>
              <p className="text-gray-300">Subscribe for fitness tips, nutrition guides, and exclusive offers.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fitness-accent w-full md:w-64"
              />
              <button
                type="submit"
                className="btn-fitness whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              <p>© {currentYear} Marksila254. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-fitness-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-fitness-accent transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-fitness-accent transition-colors">
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

