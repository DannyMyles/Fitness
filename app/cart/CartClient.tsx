'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  ShoppingCart, Trash2, Plus, Minus,
  Truck, Shield, CreditCard, ArrowLeft,
  ChevronRight, CheckCircle, Loader2, AlertCircle
} from 'lucide-react';
import { useCartStore } from '@/app/lib/cartStore';
import { orderService } from '@/app/api_services/orderService';
import { CreateOrderResponse } from '@/types/commerce';

const steps = ['Cart', 'Shipping', 'Payment', 'Confirm'];

export default function CartClient() {
  const router = useRouter();
  const { status } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<CreateOrderResponse | null>(null);

  const lines = useCartStore((s) => s.lines);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const clearCart = useCartStore((s) => s.clear);
  const subtotal = useCartStore((s) => s.subtotal());
  const hasHydrated = useCartStore((s) => s.hasHydrated);

  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;

  const handleProceedToCheckout = () => {
    if (status !== 'authenticated') {
      router.push('/login?callbackUrl=%2Fcart');
      return;
    }
    setCurrentStep(1);
  };

  const placeOrder = async () => {
    setIsPlacingOrder(true);
    setOrderError('');
    try {
      const result = await orderService.createOrder({
        customerName: shippingInfo.name,
        customerEmail: shippingInfo.email,
        customerPhone: shippingInfo.phone,
        shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}${shippingInfo.notes ? ` (${shippingInfo.notes})` : ''}`,
        items: lines.map((l) => ({
          productId: l.productId,
          quantity: l.quantity,
          size: l.size,
          color: l.color,
        })),
      });
      setConfirmedOrder(result);
      clearCart();
      setCurrentStep(3);
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : 'Could not place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="pt-8 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-fitness-dark text-center">
            Shopping <span className="text-fitness-primary">Cart</span>
          </h1>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center gap-2 ${
                  index <= currentStep ? 'text-fitness-primary' : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    index < currentStep
                      ? 'bg-fitness-primary text-white'
                      : index === currentStep
                        ? 'bg-fitness-primary/20 text-fitness-primary border-2 border-fitness-primary'
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {index < currentStep ? <CheckCircle size={18} /> : index + 1}
                  </div>
                  <span className="hidden sm:inline font-medium">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight size={20} className="text-gray-300 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 0 ? (
                !hasHydrated ? (
                  <div className="bg-white rounded-xl shadow-card p-12 text-center">
                    <Loader2 size={32} className="mx-auto animate-spin text-gray-300 mb-4" />
                  </div>
                ) : lines.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-card p-12 text-center">
                    <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                    <h2 className="text-xl font-bold text-fitness-dark mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Browse the shop to add some Mark 254 gear.</p>
                    <Link href="/shop" className="btn-fitness">
                      Go to Shop
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-card overflow-hidden">
                    <div className="p-6 border-b">
                      <h2 className="text-xl font-bold text-fitness-dark">Your Items</h2>
                    </div>

                    <div className="divide-y">
                      {lines.map((item) => (
                        <div key={`${item.productId}-${item.size}-${item.color}`} className="p-6 flex gap-4">
                          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain p-1.5"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-semibold text-fitness-dark">{item.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {[item.color, item.size].filter(Boolean).join(' / ') || 'Standard'}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(item.productId, item.size, item.color)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setQuantity(item.productId, item.quantity - 1, item.size, item.color)}
                                  className="p-1 border rounded hover:bg-gray-100"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="w-10 text-center font-medium">{item.quantity}</span>
                                <button
                                  onClick={() => setQuantity(item.productId, item.quantity + 1, item.size, item.color)}
                                  className="p-1 border rounded hover:bg-gray-100"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              <div className="text-lg font-bold text-fitness-primary">
                                KES {(item.price * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 border-t bg-gray-50">
                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-fitness-primary font-medium hover:text-fitness-primary-dark transition-colors"
                      >
                        <ArrowLeft size={18} />
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                )
              ) : currentStep === 1 ? (
                <div className="bg-white rounded-xl shadow-card p-6">
                  <h2 className="text-xl font-bold text-fitness-dark mb-6">Shipping Information</h2>

                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setCurrentStep(2);
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.name}
                          onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                          placeholder="+254 701 437 959"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                        placeholder="Street address, apartment, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                        placeholder="Nairobi"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
                      <textarea
                        value={shippingInfo.notes}
                        onChange={(e) => setShippingInfo({...shippingInfo, notes: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                        rows={3}
                        placeholder="Special delivery instructions..."
                      />
                    </div>

                    <button type="submit" className="w-full btn-fitness py-4">
                      Continue to Payment
                    </button>
                  </form>
                </div>
              ) : currentStep === 2 ? (
                <div className="bg-white rounded-xl shadow-card p-6">
                  <h2 className="text-xl font-bold text-fitness-dark mb-6">Payment Method</h2>

                  <div className="space-y-4">
                    <div className="border-2 border-fitness-primary rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <CreditCard size={24} className="text-fitness-primary" />
                        <div>
                          <p className="font-semibold text-gray-900">M-Pesa</p>
                          <p className="text-sm text-gray-600">
                            An STK push prompt will be simulated to {shippingInfo.phone || 'your phone'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {orderError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                        <AlertCircle size={20} className="text-red-500" />
                        <p className="text-sm text-red-600">{orderError}</p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={placeOrder}
                      disabled={isPlacingOrder}
                      className="w-full btn-fitness py-4 mt-6 flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isPlacingOrder ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Sending M-Pesa STK push…
                        </>
                      ) : (
                        `Pay KES ${total.toLocaleString()}`
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      disabled={isPlacingOrder}
                      className="w-full py-4 text-gray-600 hover:text-fitness-primary transition-colors"
                    >
                      Back to Shipping
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-card p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-fitness-dark mb-4">Order Received!</h2>
                  <p className="text-gray-600 mb-2">
                    {confirmedOrder?.payment.message ?? 'Thank you for your order.'}
                  </p>
                  <p className="text-sm text-gray-500 mb-8">
                    Order #: {confirmedOrder?.order.orderNumber}
                  </p>
                  <Link href="/shop" className="btn-fitness">
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {currentStep === 0 && hasHydrated && lines.length > 0 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-card p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-fitness-dark mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">KES {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `KES ${shipping}`
                        )}
                      </span>
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold text-fitness-primary">KES {total.toLocaleString()}</span>
                    </div>
                  </div>

                  {subtotal < 5000 && (
                    <div className="bg-fitness-primary/10 rounded-lg p-4 mb-6">
                      <p className="text-sm text-fitness-primary font-medium">
                        Add KES {(5000 - subtotal).toLocaleString()} more for free delivery!
                      </p>
                      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-fitness-primary rounded-full transition-all"
                          style={{ width: `${(subtotal / 5000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full btn-fitness py-4"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="mt-6 flex items-center justify-center gap-4 text-gray-400">
                    <Truck size={20} />
                    <Shield size={20} />
                    <CreditCard size={20} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
