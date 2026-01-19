'use client'

import { Plus, Upload, Download, Settings, Users, Bell, Shield, RefreshCw } from 'lucide-react'
import { useState } from 'react'

const quickActions = [
  {
    title: 'Create New Post',
    description: 'Write a blog article',
    icon: Plus,
    color: 'bg-yellow-500',
    href: '/admin/blog/create',
  },
  {
    title: 'User Management',
    description: 'Manage user roles',
    icon: Users,
    color: 'bg-purple-500',
    href: '/admin/users',
  },
  {
    title: 'Testimonial Management',
    description: 'Manage testimonials',
    icon: Bell,
    color: 'bg-blue-500',
    href: '/admin/testimonials',
  },
]

export default function QuickActions() {
  const [syncing, setSyncing] = useState(false)

  const handleSync = () => {
    setSyncing(true)
    // Simulate sync operation
    setTimeout(() => setSyncing(false), 2000)
  }

  return (
    <div className="adventure-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-600 mt-1">Common tasks and shortcuts</p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="btn-adventure flex items-center gap-2 px-3 py-2 text-sm font-medium disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <a
              key={action.title}
              href={action.href}
              className="group p-4 bg-gray-50 rounded-lg hover:bg-white hover:shadow-adventure transition-all duration-200 border border-gray-200 hover:border-accent-200"
            >
              <div className="flex items-center gap-3">
                <div className={`${action.color} p-2 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{action.title}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">{action.description}</p>
                </div>
              </div>
            </a>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-accent-50 to-blue-50 rounded-lg border border-accent-100">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-accent-500" />
          <div className="flex-1">
            <p className="font-medium text-gray-900 text-sm">Security Status</p>
            <p className="text-xs text-gray-600 mt-1">All systems secure</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}