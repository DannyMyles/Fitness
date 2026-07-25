'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import ProductForm, { ProductFormValues } from '@/components/admin/ProductForm'
import { productService } from '@/app/api_services/productService'

export default function CreateProductPage() {
  const router = useRouter()

  const handleSubmit = async (values: ProductFormValues) => {
    await productService.admin.createProduct(values)
    toast.success('Product created')
    router.push('/admin/products')
  }

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">New Product</h1>
        <p className="mt-1 text-gray-600">Add a product to the Mark 254 shop</p>
      </div>
      <ProductForm onSubmit={handleSubmit} submitLabel="Create Product" />
    </div>
  )
}
