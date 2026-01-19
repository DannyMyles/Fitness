'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Phone, ChevronDown, 
  Search, Mail, Clock, ChevronRight, User, LogOut, KeyRound,
  Dumbbell, Heart, Zap, Users
} from 'lucide-react';
import { usePathname } from 'next/navigation';

type NavItem = {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
};

type SubMenuItem = {
  name: string;
  href?: string;
  subitems?: NestedMenuItem[];
};

type NestedMenuItem = {
  name: string;
  href: string;
};

const hasSubitems = (item: SubMenuItem): item is SubMenuItem & { subitems: NestedMenuItem[] } => {
  return 'subitems' in item && Array.isArray((item as any).subitems);
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { 
        name: 'Services', 
        href: '/services',
        submenu: [
          { 
            name: 'Training Programs', 
            subitems: [
              { name: 'Personal Training', href: '/services/personal-training' },
              { name: 'Group Classes', href: '/services/group-classes' },
              { name: 'Online Training', href: '/services/online-training' },
              { name: 'Custom Programs', href: '/services/custom-programs' },
            ]
          },
          { 
            name: 'Nutrition', 
            subitems: [
              { name: 'Meal Planning', href: '/services/meal-planning' },
              { name: 'Nutrition Coaching', href: '/services/nutrition-coaching' },
              { name: 'Weight Management', href: '/services/weight-management' },
            ]
          },
          { name: 'All Services', href: '/services' },
        ]
      },
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-fitness-dark to-fitness-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center py-2 text-sm">
            <div className="hidden md:flex flex-wrap items-center gap-4 mb-2 md:mb-0">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-fitness-accent" />
                <a 
                  href="tel:+254700000000"
                  className="hover:text-fitness-accent transition-colors"
                >
                  +254 700 000 000
                </a>
              </div>
              <div className="hidden md:block h-4 w-px bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-fitness-accent" />
                <a 
                  href="mailto:info@marksila254.com"
                  className="hover:text-fitness-accent transition-colors"
                >
                  info@marksila254.com
                </a>
              </div>
              <div className="hidden md:block h-4 w-px bg-white/30"></div>
              <div className="flex items-center gap-2 text-fitness-accent font-medium">
                <Clock size={14} />
                Available 6AM - 9PM
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm hover:text-fitness-accent transition-colors"
              >
                <User size={14} />
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-fitness border-b border-gray-100' 
            : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-fitness-primary to-fitness-primaryDark rounded-xl group-hover:scale-105 transition-transform duration-300">
                <Dumbbell size={24} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-fitness-dark tracking-tight">
                  Marksila<span className="text-fitness-primary">254</span>
                </span>
                <span className="text-xs text-gray-500 -mt-1">Fitness Instructor</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.main.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <div className="group">
                      <button className={`flex items-center gap-1 px-4 py-3 font-medium transition-colors relative ${
                        isActiveLink(item.href)
                          ? 'text-fitness-primary'
                          : 'text-gray-700 hover:text-fitness-primary'
                      }`}>
                        {item.name}
                        <ChevronDown size={16} className={`group-hover:rotate-180 transition-transform ${
                          isActiveLink(item.href) ? 'text-fitness-primary' : 'text-gray-500'
                        }`} />
                      </button>
                      <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-xl shadow-fitness-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top z-50">
                        <div className="p-2">
                          {item.submenu.map((subItem) => (
                            hasSubitems(subItem) ? (
                              <div key={subItem.name} className="relative group/sub">
                                <div className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-fitness-primary/5 hover:text-fitness-primary rounded-lg transition-colors cursor-pointer">
                                  <span className="font-medium">{subItem.name}</span>
                                  <ChevronRight size={16} className="text-fitness-primary" />
                                </div>
                                <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-xl shadow-fitness-lg border border-gray-100 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 origin-left">
                                  <div className="p-2">
                                    {subItem.subitems?.map((nestedItem) => (
                                      <Link
                                        key={nestedItem.name}
                                        href={nestedItem.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                          isActiveLink(nestedItem.href)
                                            ? 'bg-fitness-primary/5 text-fitness-primary'
                                            : 'text-gray-700 hover:bg-fitness-primary/5 hover:text-fitness-primary'
                                        }`}
                                      >
                                        <span className="font-medium">{nestedItem.name}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Link
                                key={subItem.name}
                                href={subItem.href!}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                  isActiveLink(subItem.href!)
                                    ? 'bg-fitness-primary/5 text-fitness-primary'
                                    : 'text-gray-700 hover:bg-fitness-primary/5 hover:text-fitness-primary'
                                }`}
                              >
                                <span className="font-medium">{subItem.name}</span>
                              </Link>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-3 font-medium transition-colors ${
                        isActiveLink(item.href)
                          ? 'text-fitness-primary'
                          : 'text-gray-700 hover:text-fitness-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/shop"
                className="relative p-2 text-gray-700 hover:text-fitness-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-fitness-primary text-white text-xs rounded-full flex items-center justify-center">0</span>
              </Link>
              <Link
                href="/contact"
                className="btn-fitness"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-fitness-dark" />
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
                    {item.submenu ? (
                      <details className="group">
                        <summary className={`flex items-center justify-between py-4 font-semibold cursor-pointer list-none transition-colors ${
                          isActiveLink(item.href) ? 'text-fitness-primary' : 'text-gray-700'
                        }`}>
                          {item.name}
                          <ChevronDown size={20} className="group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="pb-4">
                          {item.submenu.map((subItem) => (
                            hasSubitems(subItem) ? (
                              <details key={subItem.name} className="group/sub ml-4">
                                <summary className="flex items-center justify-between py-3 px-4 cursor-pointer list-none text-gray-600">
                                  {subItem.name}
                                  <ChevronRight size={16} className="group-open/sub:rotate-90 transition-transform" />
                                </summary>
                                <div className="ml-4">
                                  {subItem.subitems?.map((nestedItem) => (
                                    <Link
                                      key={nestedItem.name}
                                      href={nestedItem.href}
                                      onClick={() => setIsMenuOpen(false)}
                                      className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-600 hover:bg-fitness-primary/5 hover:text-fitness-primary transition-colors"
                                    >
                                      {nestedItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </details>
                            ) : (
                              <Link
                                key={subItem.name}
                                href={subItem.href!}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
                                  isActiveLink(subItem.href!) 
                                    ? 'bg-fitness-primary/5 text-fitness-primary' 
                                    : 'text-gray-600 hover:bg-fitness-primary/5 hover:text-fitness-primary'
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            )
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between py-4 font-semibold transition-colors ${
                          isActiveLink(item.href) ? 'text-fitness-primary' : 'text-gray-700 hover:text-fitness-primary'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-6 space-y-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center btn-fitness"
                >
                  Get Started
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center btn-fitness-outline"
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

