'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Save, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { productService, ProductInput } from '@/app/api_services/productService'
import { Category, Product } from '@/types/commerce'

export type ProductFormValues = Required<ProductInput>

interface ProductFormProps {
  initial?: Product
  onSubmit: (values: ProductFormValues) => Promise<void>
  submitLabel: string
}

function toLines(value: string): string[] {
  return value
    .split(/\r?\n|,/)
    .map((v) => v.trim())
    .filter(Boolean)
}

export default function ProductForm({ initial, onSubmit, submitLabel }: ProductFormProps) {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [price, setPrice] = useState(initial?.price?.toString() ?? '')
  const [categoryId, setCategoryId] = useState(initial?.category?.id?.toString() ?? '')
  const [images, setImages] = useState((initial?.images ?? []).join('\n'))
  const [sizes, setSizes] = useState((initial?.sizes ?? []).join(', '))
  const [colors, setColors] = useState((initial?.colors ?? []).join(', '))
  const [inStock, setInStock] = useState(initial?.inStock ?? true)
  const [featured, setFeatured] = useState(initial?.featured ?? false)
  const [isNew, setIsNew] = useState(initial?.isNew ?? false)

  useEffect(() => {
    productService
      .getCategories()
      .then((cats) => {
        setCategories(cats)
        if (!categoryId && cats[0]) setCategoryId(cats[0].id.toString())
      })
      .catch(() => toast.error('Failed to load categories'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const imageList = toLines(images)
    if (!name || !description || !price || !categoryId || imageList.length === 0) {
      toast.error('Name, description, price, category, and at least one image are required')
      return
    }

    const priceValue = Number(price)
    if (!Number.isFinite(priceValue) || priceValue <= 0) {
      toast.error('Price must be a positive number')
      return
    }

    setSaving(true)
    try {
      await onSubmit({
        name,
        description,
        price: priceValue,
        categoryId: Number(categoryId),
        images: imageList,
        sizes: toLines(sizes),
        colors: toLines(colors),
        inStock,
        featured,
        isNew,
      })
    } catch (error: any) {
      toast.error(error.message || 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl shadow-adventure border border-gray-200 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={200}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
            placeholder="Mark 254 Performance Tee"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            maxLength={5000}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (KES)</label>
            <input
              type="number"
              min={0}
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <Link
                href="/admin/categories"
                target="_blank"
                className="text-xs text-accent-600 hover:text-accent-700 font-medium"
              >
                + Manage categories
              </Link>
            </div>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image paths (one per line — e.g. /images/mark254/tshirts/tshirts_01.png)
          </label>
          <textarea
            value={images}
            onChange={(e) => setImages(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 font-mono text-sm"
          />
          {toLines(images).length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {toLines(images).map((src) => (
                <img key={src} src={src} alt="" className="h-16 w-16 object-contain bg-gray-50 p-1 rounded-lg border" />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (comma separated)</label>
            <input
              type="text"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              placeholder="S, M, L, XL, XXL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Colors (comma separated)</label>
            <input
              type="text"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
              placeholder="Black, White"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm text-gray-700">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} className="w-4 h-4" />
            <span className="text-sm text-gray-700">New Arrival</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Cancel
        </button>
      </div>
    </form>
  )
}
