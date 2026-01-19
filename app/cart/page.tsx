'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, Trash2, Plus, Minus, 
  Truck, Shield, CreditCard, ArrowLeft,
  MapPin, Phone, Mail, Clock, Send,
  ChevronRight, CheckCircle
} from 'lucide-react';

const cartItems = [
  {
    id: 1,
    name: 'Premium Protein Powder',
    price: 3500,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=200',
    variant: 'Chocolate'
  },
  {
    id: 3,
    name: 'Resistance Bands Set',
    price: 1200,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=200',
    variant: 'Standard'
  }
];

const steps = ['Cart', 'Shipping', 'Payment', 'Confirm'];

export default function CartPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;

  const updateQuantity = (id: number, delta: number) => {
    // In real app, this would update state
    console.log('Update quantity', id, delta);
  };

  const removeItem = (id: number) => {
    // In real app, this would remove item
    console.log('Remove item', id);
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
                <div className="bg-white rounded-xl shadow-card overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-fitness-dark">Your Items</h2>
                  </div>
                  
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 flex gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-fitness-dark">{item.name}</h3>
                              <p className="text-sm text-gray-500">{item.variant}</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 border rounded hover:bg-gray-100"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-10 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
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
                      className="inline-flex items-center gap-2 text-fitness-primary font-medium hover:text-fitness-primaryDark transition-colors"
                    >
                      <ArrowLeft size={18} />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              ) : currentStep === 1 ? (
                <div className="bg-white rounded-xl shadow-card p-6">
                  <h2 className="text-xl font-bold text-fitness-dark mb-6">Shipping Information</h2>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
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
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                          placeholder="+254 700 000 000"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
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
                    
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full btn-fitness py-4"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              ) : currentStep === 2 ? (
                <div className="bg-white rounded-xl shadow-card p-6">
                  <h2 className="text-xl font-bold text-fitness-dark mb-6">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-fitness-primary rounded-xl p-4 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard size={24} className="text-fitness-primary" />
                        <div>
                          <p className="font-semibold">M-Pesa</p>
                          <p className="text-sm text-gray-500">Pay via M-Pesa mobile money</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-fitness-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <CreditCard size={24} className="text-gray-600" />
                        <div>
                          <p className="font-semibold">Credit/Debit Card</p>
                          <p className="text-sm text-gray-500">Visa, Mastercard</p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="w-full btn-fitness py-4 mt-6"
                    >
                      Pay KES {total.toLocaleString()}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
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
                  <h2 className="text-2xl font-bold text-fitness-dark mb-4">Order Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your order. You will receive a confirmation message shortly.
                  </p>
                  <p className="text-sm text-gray-500 mb-8">
                    Order #: MK254-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                  <Link href="/" className="btn-fitness">
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {currentStep === 0 && (
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
                    onClick={() => setCurrentStep(1)}
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

