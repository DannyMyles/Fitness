'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Calendar,
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  Shield,
  ChevronLeft,
  ChevronRight,
  Home,
  Award,
  UserPlus,
  PlusSquare,
  LogOut,
  User
} from 'lucide-react'
import Image from 'next/image'

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/admin', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Blog Posts', 
    href: '/admin/blog', 
    icon: FileText,
    children: [
      { name: 'All Posts', href: '/admin/blog' },
      { name: 'Add New', href: '/admin/blog/create' },
    ]
  },

  { 
    name: 'Testimonials', 
    href: '/admin/testimonials', 
    icon: MessageSquare,
    children: [
      { name: 'All Testimonials', href: '/admin/testimonials' },
      { name: 'Add New', href: '/admin/testimonials/create' },
      { name: 'Featured', href: '/admin/testimonials?filter=featured' },
    ]
  },
  { 
    name: 'Users', 
    href: '/admin/users', 
    icon: Users,
    children: [
      { name: 'All Users', href: '/admin/users' },
      { name: 'Add New', href: '/admin/users/create' },
      // { name: 'Roles', href: '/admin/users/roles' },
    ]
  },
  // { 
  //   name: 'Settings', 
  //   href: '/admin/settings', 
  //   icon: Settings,
  //   children: [
  //     { name: 'General', href: '/admin/settings' },
  //     { name: 'Email', href: '/admin/settings/email' },
  //     { name: 'Notifications', href: '/admin/settings/notifications' },
  //   ]
  // },
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const toggleExpand = (name: string) => {
    if (expandedItems.includes(name)) {
      setExpandedItems(expandedItems.filter(item => item !== name))
    } else {
      setExpandedItems([...expandedItems, name])
    }
  }

  const isItemActive = (href: string, children?: Array<{href: string}>) => {
    if (pathname === href || pathname.startsWith(href + '/')) {
      return true
    }
    
    if (children) {
      return children.some(child => 
        pathname === child.href || pathname.startsWith(child.href + '/')
      )
    }
    
    return false
  }

  // Get user data from session
  const user = session?.user
  const userName = user?.name || 'Admin'
  const userEmail = user?.email || 'admin@istc.co.ke'
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <>
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } shadow-adventure z-50`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
            {!collapsed ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 bg-accent-800 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-adventure">
                  <Image
                    src="/istclogo.png" 
                    alt="ISTC Logo" 
                    width={88}
                    height={88}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 text-sm">ISTC Admin</h1>
                  <p className="text-xs text-gray-500">International Safety Training Centre</p>
                </div>
              </div>
            ) : (
              <div className="w-10 h-5 bg-[#008DB8] rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-white" />
                <Image
                    src="/istclogo.png" 
                    alt="ISTC Logo" 
                    width={88}
                    height={88}
                    className="object-contain"
                  />
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${
                collapsed ? 'mx-auto' : ''
              }`}
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navigation.map((item) => {
            const hasChildren = item.children && item.children.length > 0
            const isActive = isItemActive(item.href, item.children)
            const isExpanded = expandedItems.includes(item.name)
            
            return (
              <div key={item.name} className="mb-1">
                {hasChildren && !collapsed ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.name)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg mb-1 transition-all ${
                        isActive
                          ? 'bg-[#008DB8] text-white shadow-adventure'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                      <ChevronRight 
                        className={`h-4 w-4 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        } ${isActive ? 'text-white' : 'text-gray-400'}`}
                      />
                    </button>
                    
                    {isExpanded && (
                      <div className="ml-9 space-y-1 mt-1">
                        {item.children!.map((child) => {
                          const isChildActive = pathname === child.href || pathname.startsWith(child.href + '/')
                          return (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                                isChildActive
                                  ? 'bg-blue-50 text-[#008DB8] font-medium'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              <div className={`h-1 w-1 rounded-full ${
                                isChildActive ? 'bg-[#008DB8]' : 'bg-gray-300'
                              }`} />
                              {child.name}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? 'bg-[#008DB8] text-white shadow-adventure'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                    {!collapsed && (
                      <span className="font-medium text-sm">{item.name}</span>
                    )}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>

        {/* Quick Actions - Only show when not collapsed */}
        {!collapsed && (
          <div className="p-3 border-t border-gray-200 mt-4">
            <div className="mb-2 px-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Quick Actions</p>
            </div>
            <div className="space-y-1">
              <Link
                href="/admin/blog/create"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
              >
                <PlusSquare className="h-4 w-4 text-yellow-500" />
                <span>New Blog Post</span>
              </Link>

              <Link
                href="/admin/users/create"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
              >
                <PlusSquare className="h-4 w-4 text-yellow-500" />
                <span>Add User</span>
              </Link>
            </div>
          </div>
        )}

        {/* User Profile & Back to Home - Bottom section */}
        <div className="absolute bottom-0 w-full p-3 border-t border-gray-200 bg-white">
          {/* Back to Home */}
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors mb-2 ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <Home className="h-5 w-5 text-gray-600" />
            {!collapsed && (
              <span className="font-medium text-sm">Back to Website</span>
            )}
          </Link>
          
          {/* User Profile - Dynamic based on session */}
          {!collapsed ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full"
              >
                <div className="h-8 w-8 bg-[#008DB8] rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {userInitials}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                </div>
                <Settings className="h-4 w-4 text-gray-500" />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-adventure-lg border border-accent-100 overflow-hidden">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-accent-100">
                        <p className="text-xs text-gray-500 uppercase">Account</p>
                      </div>
                      <Link
                        href="/admin/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4 text-gray-500" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="h-4 w-4 text-gray-500" />
                        <span>Settings</span>
                      </Link>
                      <div className="border-t border-accent-100 my-2"></div>
                      <button
                        onClick={() => signOut({ callbackUrl: window.location.origin })}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: window.location.origin })}
              className="flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors w-full text-red-600"
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Sidebar overlay for mobile (hidden on desktop) */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  )
}
