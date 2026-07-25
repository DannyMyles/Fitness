'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  ArrowLeft,
  Save,
  ListChecks,
  Image as ImageIcon,
  Settings,
  Eye,
  AlertCircle,
  Plus,
  X,
  Sparkles,
  Loader2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { CreateTrainingRequest, trainingService } from '@/app/api_services/trainingService'

const iconOptions = ['Dumbbell', 'Heart', 'Zap', 'Clock', 'Users', 'Award', 'Star', 'CheckCircle']
const colorOptions = [
  { label: 'Orange / Red', value: 'from-orange-500 to-red-500' },
  { label: 'Brand Orange', value: 'from-fitness-primary-dark to-fitness-primary' },
  { label: 'Green / Emerald', value: 'from-green-500 to-emerald-500' },
  { label: 'Purple / Pink', value: 'from-purple-500 to-pink-500' },
  { label: 'Blue / Indigo', value: 'from-blue-500 to-indigo-500' },
  { label: 'Yellow / Orange', value: 'from-yellow-500 to-orange-500' },
]

export default function EditServicePage() {
  const router = useRouter()
  const params = useParams()
  const trainingId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<CreateTrainingRequest>({
    title: '',
    description: '',
    features: [''],
    price: '',
    image: '',
    icon: iconOptions[0],
    color: colorOptions[0].value,
    popular: false,
    order: 0,
    published: true,
  })

  useEffect(() => {
    fetchTraining()
  }, [trainingId])

  const fetchTraining = async () => {
    try {
      setLoading(true)
      const training = await trainingService.getTrainingById(trainingId)
      setFormData({
        title: training.title,
        description: training.description,
        features: training.features?.length ? training.features : [''],
        price: training.price,
        image: training.image,
        icon: training.icon || iconOptions[0],
        color: training.color || colorOptions[0].value,
        popular: training.popular,
        order: training.order ?? 0,
        published: training.published !== false,
      })
    } catch (err: any) {
      console.error('Error fetching service:', err)
      setError(err.message || 'Failed to load service')
      toast.error('Failed to load service')
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    if (!formData.title.trim()) throw new Error('Title is required')
    if (!formData.description.trim()) throw new Error('Description is required')
    if (!formData.price.trim()) throw new Error('Price is required')
    if (!formData.image.trim()) throw new Error('Image URL is required')
    if (formData.features.filter((f) => f.trim()).length === 0) {
      throw new Error('At least one feature is required')
    }
    if ((formData.order ?? 0) < 0) throw new Error('Order cannot be negative')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      validateForm()
      const payload: CreateTrainingRequest = {
        ...formData,
        features: formData.features.map((f) => f.trim()).filter(Boolean),
      }
      await trainingService.updateTraining(trainingId, payload)
      toast.success('Service updated successfully!')
      router.push('/admin/services')
    } catch (err: any) {
      console.error('Error updating service:', err)
      setError(err.message || 'Failed to update service')
      toast.error(err.message || 'Failed to update service')
    } finally {
      setSaving(false)
    }
  }

  const updateFeature = (index: number, value: string) => {
    const next = [...formData.features]
    next[index] = value
    setFormData({ ...formData, features: next })
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] })
  }

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) })
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500">
        <Loader2 size={32} className="animate-spin mb-4 text-accent-500" />
        <p>Loading service...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-accent-50 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-accent-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Service</h1>
            <p className="mt-1 text-gray-600">Update this training program</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="btn-adventure flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save className="h-5 w-5" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="adventure-card bg-red-50 border-red-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <span className="p-2 bg-blue-50 rounded-lg">
                <ListChecks className="h-5 w-5 text-blue-600" />
              </span>
              Service Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <span className="p-2 bg-accent-50 rounded-lg">
                <ListChecks className="h-5 w-5 text-accent-600" />
              </span>
              Features
            </h3>

            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 text-sm text-accent-600 hover:text-accent-700 font-medium"
              >
                <Plus className="h-4 w-4" />
                Add feature
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <span className="p-2 bg-purple-50 rounded-lg">
                <ImageIcon className="h-5 w-5 text-purple-600" />
              </span>
              Image
            </h3>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              required
            />
            {formData.image && (
              <div className="mt-4 h-40 rounded-lg bg-cover bg-center border border-gray-200" style={{ backgroundImage: `url(${formData.image})` }} />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Appearance */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  {colorOptions.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <div className={`mt-3 h-8 rounded-lg bg-gradient-to-br ${formData.color}`} />
              </div>
            </div>
          </div>

          {/* Publication Settings */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-400" />
              Publication Settings
            </h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Mark as Popular</span>
                </div>
                <Sparkles className={`h-4 w-4 ${formData.popular ? 'text-accent-600' : 'text-gray-300'}`} />
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="h-4 w-4 text-accent-500 focus:ring-accent-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Published</span>
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="adventure-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5 text-gray-400" />
              Preview
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900">{formData.title || 'Service Title'}</p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {formData.description || 'Service description will appear here...'}
              </p>
              <p className="text-sm font-bold text-fitness-primary mt-3">{formData.price || 'Price'}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
