'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, ShoppingBag, Calendar, 
  Image, Settings, LogOut, Menu, X, Dumbbell,
  TrendingUp, DollarSign, ShoppingCart, Eye
} from 'lucide-react';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: ShoppingBag, label: 'Products', href: '/admin/products' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: Calendar, label: 'Events', href: '/admin/events' },
  { icon: Image, label: 'Gallery', href: '/admin/gallery' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const stats = [
  { label: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'from-blue-500 to-blue-600' },
  { label: 'Total Orders', value: '456', change: '+8%', icon: ShoppingCart, color: 'from-green-500 to-green-600' },
  { label: 'Revenue', value: 'KES 125K', change: '+15%', icon: DollarSign, color: 'from-purple-500 to-purple-600' },
  { label: 'Page Views', value: '5.2K', change: '+23%', icon: Eye, color: 'from-orange-500 to-orange-600' },
];

const recentOrders = [
  { id: 'MK001', customer: 'John Doe', product: 'Protein Powder', amount: 3500, status: 'completed' },
  { id: 'MK002', customer: 'Jane Smith', product: 'Training Guide', amount: 2000, status: 'pending' },
  { id: 'MK003', customer: 'Mike Johnson', product: 'Resistance Bands', amount: 1200, status: 'completed' },
  { id: 'MK004', customer: 'Sarah Williams', product: 'Yoga Mat', amount: 2500, status: 'processing' },
];

const upcomingEvents = [
  { id: 1, title: 'Morning HIIT Bootcamp', date: '2024-03-15', spots: 15 },
  { id: 2, title: 'Strength Workshop', date: '2024-03-16', spots: 8 },
  { id: 3, title: 'Weight Loss Challenge', date: '2024-03-20', spots: 25 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-fitness-dark text-white z-50 transform transition-transform duration-300 lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-fitness-primary to-fitness-primaryDark rounded-lg flex items-center justify-center">
              <Dumbbell size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold">Marksila<span className="text-fitness-primary">Admin</span></span>
          </Link>
        </div>

        <nav className="mt-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  isActive 
                    ? 'bg-fitness-primary text-white border-l-4 border-fitness-accent' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon size={20} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
            <LogOut size={20} />
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              <div className="w-10 h-10 bg-fitness-primary rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

