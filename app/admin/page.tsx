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
    case 'completed': return 'status-badge status-badge-completed';
    case 'pending': return 'status-badge status-badge-pending';
    case 'processing': return 'status-badge status-badge-processing';
    case 'cancelled': return 'status-badge status-badge-cancelled';
    default: return 'status-badge status-badge-inactive';
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add New
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="admin-stats-card">
            <div className={`stat-icon bg-gradient-to-br ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className={`stat-change ${stat.change.startsWith('+') ? 'stat-change-positive' : 'stat-change-negative'}`}>
                {stat.change.startsWith('+') ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders - 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-card overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <a href="/admin/orders" className="text-[#FF6B35] text-sm font-medium hover:underline">
              View All
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-medium text-gray-900">{order.id}</td>
                    <td className="text-gray-700">{order.customer}</td>
                    <td className="text-gray-700">{order.product}</td>
                    <td className="font-semibold text-[#FF6B35]">KES {order.amount.toLocaleString()}</td>
                    <td>
                      <span className={getStatusColor(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-[#FF6B35] transition-colors">
                          <EyeIcon size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-[#FF6B35] transition-colors">
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
            <h2 className="text-lg font-bold text-gray-900">Upcoming Events</h2>
            <a href="/admin/events" className="text-[#FF6B35] text-sm font-medium hover:underline">
              View All
            </a>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                  <span className="text-xs bg-[#FF6B35]/10 text-[#FF6B35] px-2 py-1 rounded-full font-medium">
                    {event.registered}/{event.spots} spots
                  </span>
                </div>
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF6B35] rounded-full transition-all duration-300"
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
          <h2 className="text-lg font-bold text-gray-900">Top Selling Products</h2>
          <a href="/admin/products" className="text-[#FF6B35] text-sm font-medium hover:underline">
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.id}>
                  <td className="font-medium text-gray-900">{product.name}</td>
                  <td className="text-gray-700">{product.sales}</td>
                  <td className="font-semibold text-[#FF6B35]">KES {product.revenue.toLocaleString()}</td>
                  <td className="w-32">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#FF6B35] rounded-full transition-all duration-300"
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

