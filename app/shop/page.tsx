'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, Heart, Star, Plus, Minus, 
  Truck, Shield, RefreshCw,
  Dumbbell
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Premium Protein Powder',
    description: 'High-quality whey protein for muscle recovery and growth.',
    price: 3500,
    originalPrice: 4000,
    category: 'Supplements',
    image: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=600',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Marksila254 Branded T-Shirt',
    description: 'Comfortable cotton t-shirt with fitness motivation design.',
    price: 1500,
    originalPrice: null,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    badge: 'New'
  },
  {
    id: 3,
    name: 'Resistance Bands Set',
    description: 'Set of 5 resistance bands for home workouts.',
    price: 1200,
    originalPrice: 1500,
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600',
    rating: 4.7,
    reviews: 56,
    inStock: true,
    badge: null
  },
  {
    id: 4,
    name: 'Pre-Workout Supplement',
    description: 'Boost energy and focus before your training session.',
    price: 2800,
    originalPrice: 3200,
    category: 'Supplements',
    image: 'https://images.unsplash.com/photo-1574680096141-275d66c398cd?w=600',
    rating: 4.6,
    reviews: 78,
    inStock: true,
    badge: 'Popular'
  },
  {
    id: 5,
    name: 'Fitness Guide - 8 Week Program',
    description: 'Complete workout and nutrition guide for transformations.',
    price: 2000,
    originalPrice: null,
    category: 'Guides',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
    rating: 4.9,
    reviews: 203,
    inStock: true,
    badge: 'Bestseller'
  },
  {
    id: 6,
    name: 'Shaker Bottle',
    description: 'Leak-proof protein shaker with mixing ball.',
    price: 800,
    originalPrice: null,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1605266838658-2871276b2c9d?w=600',
    rating: 4.5,
    reviews: 45,
    inStock: true,
    badge: null
  },
  {
    id: 7,
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat for comfortable workouts.',
    price: 2500,
    originalPrice: 3000,
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600',
    rating: 4.8,
    reviews: 67,
    inStock: true,
    badge: 'Premium'
  },
  {
    id: 8,
    name: 'Compression Shorts',
    description: 'High-performance compression shorts for training.',
    price: 1800,
    originalPrice: null,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1552674605-469523254d4d?w=600',
    rating: 4.7,
    reviews: 92,
    inStock: true,
    badge: 'New'
  }
];

const categories = ['All', 'Supplements', 'Apparel', 'Equipment', 'Guides', 'Accessories'];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const product = products.find(p => p.id === Number(id));
    return total + (product?.price || 0) * qty;
  }, 0);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1920')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark/90 to-fitness-primary/70"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Fitness <span className="text-fitness-accent">Shop</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Quality fitness gear, supplements, and branded merchandise to support your training journey.
            </p>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-fitness-primary/10 rounded-xl flex items-center justify-center">
                <Truck size={24} className="text-fitness-primary" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Free Delivery</p>
                <p className="text-sm text-gray-600">Orders over KES 5,000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-fitness-accent/10 rounded-xl flex items-center justify-center">
                <Shield size={24} className="text-fitness-accent" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Quality Guaranteed</p>
                <p className="text-sm text-gray-600">Premium products</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <RefreshCw size={24} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Easy Returns</p>
                <p className="text-sm text-gray-600">30-day policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Dumbbell size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Expert Curated</p>
                <p className="text-sm text-gray-600">Trainer approved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl p-6 shadow-card sticky top-24">
                {/* Search */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary"
                  />
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          activeCategory === category
                            ? 'bg-fitness-primary text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-700">
                  Showing {filteredProducts.length} products
                </p>
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fitness-primary">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="card-fitness overflow-hidden group">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-fitness-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {product.badge}
                        </div>
                      )}
                      <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <Heart size={18} className="text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="p-5">
                      <p className="text-sm text-fitness-primary mb-1">{product.category}</p>
                      <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-800 mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center gap-1 mb-3">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-800">{product.rating}</span>
                        <span className="text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-fitness-primary">KES {product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                              KES {product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        {cart[product.id] ? (
                          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                            <button 
                              onClick={() => removeFromCart(product.id)}
                              className="p-1 hover:text-fitness-primary transition-colors"
                            >
                              <Minus size={18} />
                            </button>
                            <span className="font-semibold">{cart[product.id]}</span>
                            <button 
                              onClick={() => addToCart(product.id)}
                              className="p-1 hover:text-fitness-primary transition-colors"
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => addToCart(product.id)}
                            className="w-full btn-fitness flex items-center justify-center gap-2"
                          >
                            <ShoppingCart size={18} />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-fitness-lg z-50 transform transition-transform duration-300 ${cartCount > 0 ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold text-fitness-dark">Shopping Cart</h2>
            <button 
              onClick={() => setCart({})}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {Object.entries(cart).length === 0 ? (
              <p className="text-gray-600 text-center">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(cart).map(([id, qty]) => {
                  const product = products.find(p => p.id === Number(id));
                  if (!product) return null;
                  return (
                    <div key={id} className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-gray-700 font-semibold">KES {product.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => removeFromCart(product.id)}
                            className="p-1 border rounded hover:bg-gray-100"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm">{qty}</span>
                          <button 
                            onClick={() => addToCart(product.id)}
                            className="p-1 border rounded hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Subtotal</span>
              <span className="font-bold text-xl">KES {cartTotal.toLocaleString()}</span>
            </div>
            <Link 
              href="/cart"
              className="block w-full btn-fitness text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>

      {/* Cart Button */}
      {cartCount > 0 && (
        <button 
          className="fixed bottom-6 right-6 z-40 bg-fitness-primary text-white px-6 py-3 rounded-full shadow-fitness-lg flex items-center gap-2 hover:bg-fitness-primaryDark transition-colors"
          onClick={() => window.dispatchEvent(new CustomEvent('toggle-cart'))}
        >
          <ShoppingCart size={20} />
          <span className="font-semibold">{cartCount} items</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
            KES {cartTotal.toLocaleString()}
          </span>
        </button>
      )}
    </div>
  );
}

