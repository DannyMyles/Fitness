'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, Mail, Clock, Zap, User,
  Dumbbell, Menu, X
} from 'lucide-react';
import { usePathname } from 'next/navigation';

type NavItem = {
  name: string;
  href: string;
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Events', href: '/events' },
      { name: 'Shop', href: '/shop' },
      { name: 'Contact', href: '/contact' },
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-fitness-dark via-fitness-secondary to-fitness-dark text-gray-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-fitness-primary/20 to-fitness-accent/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center py-2 text-sm">
            <div className="hidden md:flex flex-wrap items-center gap-x-6 gap-y-2 mb-2 md:mb-0">
              <div className="flex items-center gap-2 group">
                <div className="p-1.5 bg-fitness-primary/20 rounded-lg group-hover:bg-fitness-primary/30 transition-colors">
                  <Phone size={14} className="text-fitness-primary" />
                </div>
                <a 
                  href="tel:+254700000000"
                  className="hover:text-fitness-primary transition-colors duration-300"
                >
                  +254 700 000 000
                </a>
              </div>
              <div className="hidden md:block h-4 w-px bg-white/20"></div>
              <div className="flex items-center gap-2 group">
                <div className="p-1.5 bg-fitness-accent/20 rounded-lg group-hover:bg-fitness-accent/30 transition-colors">
                  <Mail size={14} className="text-fitness-accent" />
                </div>
                <a 
                  href="mailto:info@marksila254.com"
                  className="hover:text-fitness-accent transition-colors duration-300"
                >
                  info@marksila254.com
                </a>
              </div>
              <div className="hidden md:block h-4 w-px bg-white/20"></div>
              <div className="flex items-center gap-2 text-fitness-accent font-medium">
                <div className="relative">
                  <Clock size={14} />
                  <span className="absolute inset-0 animate-pulse bg-fitness-accent rounded-full opacity-50"></span>
                </div>
                Available 6AM - 9PM
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm hover:text-fitness-primary transition-all duration-300 hover:scale-105"
              >
                <div className="p-1.5 bg-white/10 rounded-lg">
                  <User size={14} />
                </div>
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-fitness' 
            : 'bg-white shadow-soft'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-fitness-primary to-fitness-primaryDark rounded-xl group-hover:scale-110 transition-transform duration-500">
                  <Dumbbell size={24} className="text-white" />
                </div>
                <div className="absolute inset-0 bg-fitness-primary/30 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              </div>
              <div className="flex flex-col">
                  <Image
                    src="/images/mark_logo.jpg"
                    alt="Marksila 254"
                    width={88}
                    height={88}
                    className="inline-block ml-1 -mt-1"
                  />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-3 font-medium transition-all duration-300 relative ${
                    isActiveLink(item.href)
                      ? 'text-fitness-primary'
                      : 'text-gray-800 hover:text-fitness-primary'
                  }`}
                >
                  <span className="relative">
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-fitness-primary to-fitness-accent transition-all duration-300 ${
                      isActiveLink(item.href) ? 'w-full' : 'w-0 hover:w-full'
                    }`}></span>
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/shop"
                className="relative p-2.5 text-gray-700 hover:text-fitness-primary transition-all duration-300 hover:scale-110 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-fitness-primary to-fitness-accent text-white text-xs rounded-full flex items-center justify-center font-bold shadow-fitness">0</span>
              </Link>
              <Link
                href="/contact"
                className="btn-primary flex items-center gap-2 hover:shadow-fitness-lg transform hover:-translate-y-1"
              >
                <Zap size={18} />
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-fitness-dark animate-rotate" />
              ) : (
                <Menu size={24} className="text-fitness-dark" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 animate-slide-down">
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Navigation */}
              <div className="space-y-1">
                {navigation.main.map((item) => (
                  <div key={item.name} className="border-b border-gray-100 last:border-0">
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center justify-between py-4 font-semibold transition-all duration-300 ${
                        isActiveLink(item.href) ? 'text-fitness-primary' : 'text-gray-800 hover:text-fitness-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-6 space-y-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <Zap size={20} />
                  Get Started
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navigation;

