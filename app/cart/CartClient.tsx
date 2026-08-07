'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  ShoppingCart, Trash2, Plus, Minus,
  Truck, Shield, CreditCard, ArrowLeft,
  ChevronRight, CheckCircle, Loader2, AlertCircle, XCircle, RefreshCw
} from 'lucide-react';
import { useCartStore } from '@/app/lib/cartStore';
import { orderService } from '@/app/api_services/orderService';
import { usePaymentPolling } from '@/app/lib/usePaymentPolling';
import { CreateOrderResponse, OrderPaymentStatus } from '@/types/commerce';

const steps = ['Cart', 'Shipping', 'Payment', 'Confirm'];
const PHONE_REGEX = /^\+?[0-9\s-]{7,20}$/;

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
  const [shippingError, setShippingError] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<CreateOrderResponse | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const orderIdRef = useRef<number | null>(null);

  const pollPayment = usePaymentPolling<OrderPaymentStatus>({
    checkFn: () => orderService.getPaymentStatus(orderIdRef.current!),
    isSuccess: (r) => r.paymentStatus === 'paid',
    isFailed: (r) => r.paymentStatus === 'failed',
  });

  const lines = useCartStore((s) => s.lines);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const clearCart = useCartStore((s) => s.clear);
  const subtotal = useCartStore((s) => s.subtotal());
  const hasHydrated = useCartStore((s) => s.hasHydrated);

  const total = subtotal;

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
      orderIdRef.current = result.order.id;
      clearCart();
      setCurrentStep(3);
      pollPayment.start();
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : 'Could not place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const retryPayment = async () => {
    if (!confirmedOrder) return;
    setIsRetrying(true);
    setOrderError('');
    try {
      const result = await orderService.retryPayment(confirmedOrder.order.id);
      setConfirmedOrder(result);
      pollPayment.start();
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : 'Could not retry payment. Please try again.');
    } finally {
      setIsRetrying(false);
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
                      setShippingError('');
                      if (!PHONE_REGEX.test(shippingInfo.phone.trim())) {
                        setShippingError('Please enter a valid phone number');
                        return;
                      }
                      setCurrentStep(2);
                    }}
                  >
                    {shippingError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                        <AlertCircle size={20} className="text-red-500 shrink-0" />
                        <p className="text-sm text-red-600">{shippingError}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          maxLength={100}
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
                          maxLength={20}
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
                        maxLength={255}
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
                        maxLength={400}
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
                        maxLength={100}
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                        placeholder="Nairobi"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
                      <textarea
                        maxLength={500}
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
                            An STK push prompt will be sent to {shippingInfo.phone || 'your phone'}
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
              ) : pollPayment.phase === 'success' ? (
                <div className="bg-white rounded-xl shadow-card p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-fitness-dark mb-4">Payment Received!</h2>
                  <p className="text-gray-600 mb-2">Thank you for your order — we're getting it ready.</p>
                  <p className="text-sm text-gray-500 mb-8">
                    Order #: {confirmedOrder?.order.orderNumber}
                  </p>
                  <Link href="/shop" className="btn-fitness">
                    Continue Shopping
                  </Link>
                </div>
              ) : pollPayment.phase === 'failed' || pollPayment.phase === 'timeout' ? (
                <div className="bg-white rounded-xl shadow-card p-8 text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle size={40} className="text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-fitness-dark mb-4">
                    {pollPayment.phase === 'timeout' ? 'Payment Not Confirmed' : 'Payment Failed'}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {pollPayment.phase === 'timeout'
                      ? "We didn't receive a confirmation in time. If you already paid, it may still go through — otherwise, try again."
                      : (pollPayment.lastResult?.paymentFailureReason ??
                        'The M-Pesa payment was cancelled or declined. Your order is saved — you can retry payment below.')}
                  </p>
                  <p className="text-sm text-gray-500 mb-8">
                    Order #: {confirmedOrder?.order.orderNumber}
                  </p>
                  {orderError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 mb-6 text-left">
                      <AlertCircle size={20} className="text-red-500 shrink-0" />
                      <p className="text-sm text-red-600">{orderError}</p>
                    </div>
                  )}
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={retryPayment}
                      disabled={isRetrying}
                      className="btn-fitness flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isRetrying ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Sending M-Pesa STK push…
                        </>
                      ) : (
                        <>
                          <RefreshCw size={18} />
                          Retry Payment
                        </>
                      )}
                    </button>
                    <Link href="/shop" className="text-gray-600 hover:text-fitness-primary transition-colors">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-card p-8 text-center">
                  <div className="w-20 h-20 bg-fitness-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Loader2 size={40} className="text-fitness-primary animate-spin" />
                  </div>
                  <h2 className="text-2xl font-bold text-fitness-dark mb-4">Check Your Phone</h2>
                  <p className="text-gray-600 mb-2">
                    {confirmedOrder?.payment.message ?? 'Enter your M-Pesa PIN to complete payment.'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Order #: {confirmedOrder?.order.orderNumber}
                  </p>
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
                      <span className="font-medium text-green-600">FREE</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold text-fitness-primary">KES {total.toLocaleString()}</span>
                    </div>
                  </div>

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
