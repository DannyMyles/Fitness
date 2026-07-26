'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, Trash2, RefreshCw, X, Mail, Download } from 'lucide-react'
import toast from 'react-hot-toast'
import { newsletterService, NewsletterSubscriber } from '@/app/api_services/newsletterService'
import EmptyState from '@/components/ui/EmptyState'
import { useDocumentTitle } from '@/app/lib/useDocumentTitle'

export default function NewsletterManagementPage() {
  useDocumentTitle('Newsletter')
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [subscriberToDelete, setSubscriberToDelete] = useState<NewsletterSubscriber | null>(null)
  const [deleting, setDeleting] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowDeleteModal(false)
      }
    }
    if (showDeleteModal) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDeleteModal])

  const fetchSubscribers = async () => {
    try {
      setLoading(true)
      const data = await newsletterService.admin.getAll()
      setSubscribers(data)
    } catch (error: any) {
      toast.error(error.message || 'Failed to load subscribers')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchSubscribers()
  }

  const handleDeleteClick = (subscriber: NewsletterSubscriber) => {
    setSubscriberToDelete(subscriber)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!subscriberToDelete) return
    setDeleting(true)
    try {
      await newsletterService.admin.delete(subscriberToDelete.id)
      toast.success('Subscriber removed')
      setSubscribers((prev) => prev.filter((s) => s.id !== subscriberToDelete.id))
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove subscriber')
    } finally {
      setDeleting(false)
      setShowDeleteModal(false)
      setSubscriberToDelete(null)
    }
  }

  const handleExport = () => {
    const headers = ['Email', 'Subscribed At']
    const rows = filtered.map((s) => [s.email, newsletterService.formatDate(s.createdAt)])
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filtered = subscribers.filter((s) => s.email.toLowerCase().includes(searchQuery.toLowerCase()))

  if (loading) {
    return (
      <div className="space-y-6 p-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter</h1>
          <p className="mt-1 text-gray-600">Manage newsletter subscribers</p>
        </div>
        <div className="bg-white rounded-xl shadow-adventure border border-gray-200 p-8">
          <div className="flex justify-center items-center h-64">
            <div className="h-8 w-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Confirm Removal</h3>
              <button onClick={() => setShowDeleteModal(false)} className="p-2 hover:bg-gray-100 rounded-lg" disabled={deleting}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              {subscriberToDelete && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{subscriberToDelete.email}</p>
                </div>
              )}
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </div>
                  <p className="text-sm text-red-700">This subscriber will be permanently removed from the list.</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-lg font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deleting ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter</h1>
          <p className="mt-1 text-gray-600">Manage newsletter subscribers</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`h-5 w-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleExport}
            disabled={filtered.length === 0}
            className="btn-primary flex items-center gap-2 w-fit disabled:opacity-50"
          >
            <Download className="h-5 w-5" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="admin-card w-fit min-w-[220px]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Subscribers</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{subscribers.length}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by email..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-adventure border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          subscribers.length === 0 ? (
            <EmptyState
              icon={Mail}
              title="No subscribers yet"
              description="Emails collected from the newsletter signup form will show up here."
            />
          ) : (
            <EmptyState
              icon={Search}
              title="No subscribers match your search"
              description="Try a different search term."
              action={{ label: 'Clear Search', onClick: () => setSearchQuery('') }}
            />
          )
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subscribed</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{subscriber.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{newsletterService.formatDate(subscriber.createdAt)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteClick(subscriber)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
