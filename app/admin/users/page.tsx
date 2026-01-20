'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Shield,
  CheckCircle,
  XCircle,
  Edit, 
  Trash2, 
  Eye,
  MoreVertical,
  Download,
  AlertCircle,
  RefreshCw,
  User as UserIcon,
  Loader2
} from 'lucide-react'
import { User, userService } from '@/app/api_services/userService'

export default function UsersManagementPage() {
  const router = useRouter()
  const { data: session, status: authStatus } = useSession()
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'role' | 'status'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  
  // Data states
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  // Check authentication status
  useEffect(() => {
    // Wait for auth to be determined
    if (authStatus === 'loading') {
      setIsAuthLoading(true)
      return
    }

    // If not authenticated, redirect to login
    if (authStatus === 'unauthenticated') {
      setIsAuthLoading(false)
      setError('You are not logged in. Please log in to access this page.')
      router.push('/login?callbackUrl=/admin/users')
      return
    }

    // Authenticated - proceed with fetching
    setIsAuthLoading(false)
  }, [authStatus, router])

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    // Don't fetch if still loading auth
    if (isAuthLoading || authStatus !== 'authenticated') {
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await userService.getAllUsers()
      setUsers(response.users)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users')
      console.error('Error fetching users:', err)
      
      // Check if it's an auth error
      if (err.message?.includes('No authentication token') || 
          err.message?.includes('Session expired') ||
          err.message?.includes('log in')) {
        // Sign out and redirect to login
        signOut({ callbackUrl: '/login' })
      }
    } finally {
      setLoading(false)
    }
  }, [isAuthLoading, authStatus])

  // Initial fetch after auth is ready
  useEffect(() => {
    if (!isAuthLoading && authStatus === 'authenticated') {
      fetchUsers()
    }
  }, [isAuthLoading, authStatus, fetchUsers])

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = 
        filter === 'all' || 
        (filter === 'active' && user.isActive) ||
        (filter === 'inactive' && !user.isActive)
      
      const matchesRole = roleFilter === 'all' || user.role === roleFilter
      
      return matchesSearch && matchesStatus && matchesRole
    })
    .sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case 'role':
          comparison = a.role.localeCompare(b.role)
          break
        case 'status':
          comparison = (a.isActive === b.isActive) ? 0 : a.isActive ? 1 : -1
          break
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(user => user._id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, id])
    } else {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id))
    }
  }

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      await userService.deleteUser(id)
      setUsers(users.filter(u => u._id !== id))
      setSelectedUsers(selectedUsers.filter(userId => userId !== id))
    } catch (err: any) {
      alert(err.message || 'Failed to delete user')
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) return
    if (!confirm(`Are you sure you want to delete ${selectedUsers.length} selected users?`)) return
    
    try {
      await Promise.all(selectedUsers.map(id => userService.deleteUser(id)))
      setUsers(users.filter(u => !selectedUsers.includes(u._id)))
      setSelectedUsers([])
    } catch (err: any) {
      alert(err.message || 'Failed to delete users')
    }
  }

  const handleToggleStatus = async (id: string) => {
    const user = users.find(u => u._id === id)
    if (!user) return
    
    try {
      const updatedUser = await userService.updateUser(id, { 
        isActive: !user.isActive 
      })
      setUsers(users.map(u => 
        u._id === id ? { ...u, ...updatedUser.user } : u
      ))
    } catch (err: any) {
      alert(err.message || 'Failed to update user status')
    }
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'status-badge status-badge-active' : 'status-badge status-badge-inactive'
  }

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-gray-400" />
    )
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800'
      case 'editor': return 'bg-blue-100 text-blue-800'
      case 'viewer': return 'bg-gray-100 text-gray-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  // Calculate stats
  const stats = {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    inactive: users.filter(u => !u.isActive).length,
    admins: users.filter(u => u.role === 'admin').length,
    regularUsers: users.filter(u => u.role === 'user').length
  }

  // Export users to CSV
  const handleExport = () => {
    const headers = ['Name', 'Username', 'Email', 'Role', 'Status', 'Created At']
    const rows = filteredUsers.map(user => [
      user.name,
      user.username,
      user.email,
      user.role,
      user.isActive ? 'Active' : 'Inactive',
      userService.formatDate(user.createdAt)
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Show auth loading state
  if (isAuthLoading || authStatus === 'loading') {
    return (
      <div className="space-y-6 p-4">
        <div className="bg-white rounded-xl shadow-adventure border border-gray-200 p-12 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-accent-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-gray-600">Manage and organize system users</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <Link
            href="/admin/users/create"
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add User
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="adventure-card bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
            <button
              onClick={fetchUsers}
              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="admin-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.inactive}</p>
            </div>
            <div className="p-3 bg-gray-200 rounded-lg">
              <XCircle className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.admins}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Regular Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.regularUsers}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <UserIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="adventure-card bg-accent-50 border-accent-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-accent-100 rounded-lg flex items-center justify-center">
                <span className="text-accent-700 font-medium">{selectedUsers.length}</span>
              </div>
              <p className="text-accent-700 font-medium">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const userId = selectedUsers[0]
                  const user = users.find(u => u._id === userId)
                  if (user) handleToggleStatus(userId)
                }}
                className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
              >
                Toggle Status
              </button>
              <button
                onClick={handleDeleteSelected}
                className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users by name, email, or username..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [sort, order] = e.target.value.split('-')
              setSortBy(sort as any)
              setSortOrder(order as any)
            }}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          >
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
            <option value="date-desc">Sort by Newest</option>
            <option value="date-asc">Sort by Oldest</option>
            <option value="role-asc">Sort by Role</option>
            <option value="status-asc">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow-adventure border border-gray-200 p-12 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-accent-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      )}

      {/* Users Table */}
      {!loading && (
        <div className="bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden">
          {filteredUsers.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="admin-table">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 w-12">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="h-4 w-4 text-[#FF6B35] focus:ring-[#FF6B35] rounded"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joined</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-32">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user._id)}
                            onChange={(e) => handleSelectUser(user._id, e.target.checked)}
                            className="h-4 w-4 text-[#FF6B35] focus:ring-[#FF6B35] rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={userService.getAvatarUrl(user)}
                              alt={user.name}
                              className="h-10 w-10 rounded-full bg-gray-200"
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {user.name}
                                {user.isActive && (
                                  <span className="ml-2 inline-flex items-center text-xs text-green-600 font-medium">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verified
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-gray-500">@{user.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <a 
                              href={`mailto:${user.email}`}
                              className="text-sm text-gray-700 hover:text-[#FF6B35] transition-colors"
                            >
                              {user.email}
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                            {userService.getRoleDisplayName(user.role)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleStatus(user._id)}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(user.isActive)}`}
                          >
                            {getStatusIcon(user.isActive)}
                            {userService.getStatusDisplayName(user.isActive)}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {userService.formatDate(user.createdAt)}
                          </div>
                          {user.lastLogin && (
                            <div className="text-xs text-gray-500">
                              Last: {userService.formatLastLogin(user.lastLogin)}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Link
                              href={`/admin/users/${user._id}`}
                              className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                              title="View Profile"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            
                            <Link
                              href={`/admin/users/edit/${user._id}`}
                              className="p-2 hover:bg-orange-100 rounded-lg transition-colors text-[#FF6B35]"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                    <span className="font-medium">{filteredUsers.length}</span> users
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      Previous
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 rounded-lg bg-accent-50 text-accent-700 border-accent-200">
                      1
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <UserIcon className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">
                {searchQuery || filter !== 'all' || roleFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by creating a new user'}
              </p>
              {(!searchQuery && filter === 'all' && roleFilter === 'all') && (
                <Link
                  href="/admin/users/create"
                  className="btn-adventure inline-flex items-center gap-2 mt-4"
                >
                  <Plus className="h-5 w-5" />
                  Add User
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

