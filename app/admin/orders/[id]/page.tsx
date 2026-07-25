'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { orderService } from '@/app/api_services/orderService'
import { Order, OrderStatus, PaymentStatus } from '@/types/commerce'

const ORDER_STATUSES: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']
const PAYMENT_STATUSES: PaymentStatus[] = ['pending', 'paid', 'failed']

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const load = () => {
    setLoading(true)
    orderService.admin
      .getOrder(Number(params.id))
      .then(setOrder)
      .catch((err) => {
        toast.error(err.message || 'Order not found')
        router.push('/admin/orders')
      })
      .finally(() => setLoading(false))
  }

  useEffect(load, [params.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const updateStatus = async (data: { status?: OrderStatus; paymentStatus?: PaymentStatus }) => {
    if (!order) return
    setUpdating(true)
    try {
      const updated = await orderService.admin.updateStatus(order.id, data)
      setOrder(updated)
      toast.success('Order updated')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update order')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="h-8 w-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!order) return null

  return (
    <div className="space-y-6 p-4">
      <Link href="/admin/orders" className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700">
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{order.orderNumber}</h1>
          <p className="mt-1 text-gray-600">Placed {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-adventure border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Items</h2>
            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {[item.color, item.size].filter(Boolean).join(' / ') || 'Standard'} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-gray-900">KES {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="pt-4 mt-4 border-t flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-fitness-primary">KES {order.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-adventure border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Customer</h2>
            <p className="text-gray-900">{order.customerName}</p>
            <p className="text-gray-600">{order.customerEmail}</p>
            <p className="text-gray-600">{order.customerPhone}</p>
            <p className="text-gray-600 mt-2">{order.shippingAddress}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-adventure border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Order Status</h2>
            <select
              value={order.status}
              disabled={updating}
              onChange={(e) => updateStatus({ status: e.target.value as OrderStatus })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 mb-4"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <h2 className="font-bold text-gray-900 mb-2 mt-4">Payment Status</h2>
            <select
              value={order.paymentStatus}
              disabled={updating}
              onChange={(e) => updateStatus({ paymentStatus: e.target.value as PaymentStatus })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
            >
              {PAYMENT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {order.paymentRef && (
              <p className="text-xs text-gray-500 mt-3">Payment ref: {order.paymentRef}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
