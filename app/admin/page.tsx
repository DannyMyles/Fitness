'use client';

import { 
  LayoutDashboard, Users, ShoppingBag, ShoppingCart, Calendar, 
  Image, Settings, TrendingUp, DollarSign, Eye, 
  ArrowUp, ArrowDown, Plus, Search, MoreVertical,
  Edit, Trash2, Eye as EyeIcon
} from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'from-blue-500 to-blue-600' },
  { label: 'Total Orders', value: '456', change: '+8%', icon: ShoppingCart, color: 'from-green-500 to-green-600' },
  { label: 'Revenue', value: 'KES 125K', change: '+15%', icon: DollarSign, color: 'from-purple-500 to-purple-600' },
  { label: 'Page Views', value: '5.2K', change: '+23%', icon: Eye, color: 'from-orange-500 to-orange-600' },
];

const recentOrders = [
  { id: 'MK001', customer: 'John Doe', product: 'Protein Powder', amount: 3500, status: 'completed', date: '2024-03-10' },
  { id: 'MK002', customer: 'Jane Smith', product: 'Training Guide', amount: 2000, status: 'pending', date: '2024-03-09' },
  { id: 'MK003', customer: 'Mike Johnson', product: 'Resistance Bands', amount: 1200, status: 'completed', date: '2024-03-09' },
  { id: 'MK004', customer: 'Sarah Williams', product: 'Yoga Mat', amount: 2500, status: 'processing', date: '2024-03-08' },
  { id: 'MK005', customer: 'Tom Brown', product: 'Pre-Workout', amount: 2800, status: 'completed', date: '2024-03-08' },
];

const upcomingEvents = [
  { id: 1, title: 'Morning HIIT Bootcamp', date: '2024-03-15', spots: 15, registered: 5 },
  { id: 2, title: 'Strength Workshop', date: '2024-03-16', spots: 8, registered: 3 },
  { id: 3, title: 'Weight Loss Challenge', date: '2024-03-20', spots: 25, registered: 12 },
];

const topProducts = [
  { id: 1, name: 'Premium Protein Powder', sales: 234, revenue: 819000 },
  { id: 2, name: 'Fitness Guide - 8 Week Program', sales: 189, revenue: 378000 },
  { id: 3, name: 'Pre-Workout Supplement', sales: 156, revenue: 436800 },
  { id: 4, name: 'Yoga Mat Premium', sales: 98, revenue: 245000 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-700';
    case 'pending': return 'bg-yellow-100 text-yellow-700';
    case 'processing': return 'bg-blue-100 text-blue-700';
    case 'cancelled': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-fitness-dark">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="btn-fitness flex items-center gap-2">
          <Plus size={20} />
          Add New
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change.startsWith('+') ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-fitness-dark">{stat.value}</div>
            <div className="text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders - 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold text-fitness-dark">Recent Orders</h2>
            <a href="/admin/orders" className="text-fitness-primary text-sm font-medium hover:underline">
              View All
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-fitness-dark">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                    <td className="px-6 py-4 text-sm font-medium text-fitness-primary">KES {order.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:text-fitness-primary transition-colors">
                          <EyeIcon size={16} />
                        </button>
                        <button className="p-1 hover:text-fitness-primary transition-colors">
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold text-fitness-dark">Upcoming Events</h2>
            <a href="/admin/events" className="text-fitness-primary text-sm font-medium hover:underline">
              View All
            </a>
          </div>
          <div className="divide-y">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-fitness-dark">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                  <span className="text-xs bg-fitness-primary/10 text-fitness-primary px-2 py-1 rounded-full">
                    {event.registered}/{event.spots} spots
                  </span>
                </div>
                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-fitness-primary rounded-full"
                    style={{ width: `${(event.registered / event.spots) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold text-fitness-dark">Top Selling Products</h2>
          <a href="/admin/products" className="text-fitness-primary text-sm font-medium hover:underline">
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-fitness-dark">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.sales}</td>
                  <td className="px-6 py-4 text-sm font-medium text-fitness-primary">KES {product.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 w-32">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-fitness-primary rounded-full"
                        style={{ width: `${(product.sales / topProducts[0].sales) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

