'use client'

import { signOut } from 'next-auth/react'
import { Bell, User, LogOut, Search, Settings } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface AdminHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string
  }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  // Get user initials for avatar
  const getInitials = (name?: string | null) => {
    if (!name) return 'A'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Get display name
  const getDisplayName = () => {
    if (user?.name) return user.name
    if (user?.email) return user.email.split('@')[0]
    return 'Admin'
  }

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 border-accent-100 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in admin panel..."
                className="w-full pl-10 pr-4 py-2.5 bg-accent-50/50 border border-accent-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-accent-50 rounded-lg transition-colors group">
              <Bell className="h-5 w-5 text-accent-500 group-hover:text-accent-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent-50 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  {getInitials(user?.name)}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="font-semibold text-sm text-gray-900">{getDisplayName()}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role || 'Admin'}</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-adventure-lg border border-accent-100 opacity-100 visible transition-all duration-200 origin-top-right z-50">
                    <div className="p-2">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-accent-100">
                        <p className="font-semibold text-gray-900">{getDisplayName()}</p>
                        <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-100 text-accent-700 mt-1 capitalize">
                          {user?.role || 'Admin'}
                        </span>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          href="/admin/profile"
                          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent-50 transition-colors text-gray-700 hover:text-gray-900"
                          onClick={() => setShowDropdown(false)}
                        >
                          <User className="h-4 w-4 text-accent-500" />
                          <span>Your Profile</span>
                        </Link>
                        <Link
                          href="/admin/settings"
                          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent-50 transition-colors text-gray-700 hover:text-gray-900"
                          onClick={() => setShowDropdown(false)}
                        >
                          <Settings className="h-4 w-4 text-accent-500" />
                          <span>Settings</span>
                        </Link>
                      </div>
                      
                      {/* Divider */}
                      <div className="border-t border-accent-100 my-2"></div>
                      
                      {/* Logout */}
                      <div className="py-2">
                        <button
                          onClick={() => signOut({ callbackUrl: window.location.origin })}
                          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors w-full text-left text-red-600 hover:text-red-700"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}