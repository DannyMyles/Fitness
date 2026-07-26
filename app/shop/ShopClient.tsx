'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart, Heart, Plus, Minus,
  Truck, Shield, RefreshCw,
  Dumbbell, Loader2, ArrowUpRight, Search, AlertCircle
} from 'lucide-react';
import { productService } from '@/app/api_services/productService';
import { useCartStore } from '@/app/lib/cartStore';
import { Category, Product } from '@/types/commerce';
import EmptyState from '@/components/ui/EmptyState';

const heroTiles = [
  { src: '/images/mark254/tshirts/tshirts_01.png', rotate: '-rotate-3', z: 'z-20' },
  { src: '/images/mark254/hoodies_pullover/hoodies_pullover_02.png', rotate: 'rotate-2', z: 'z-10' },
  { src: '/images/mark254/bottles/bottles_04.png', rotate: '-rotate-2', z: 'z-0' },
];

export default function ShopClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const lines = useCartStore((s) => s.lines);
  const addItem = useCartStore((s) => s.addItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const subtotal = useCartStore((s) => s.subtotal());
  const cartCount = useCartStore((s) => s.count());
  const hasHydrated = useCartStore((s) => s.hasHydrated);

  useEffect(() => {
    productService
      .getCategories()
      .then(setCategories)
      .catch(() => setError('Could not load categories.'));
  }, []);

  const fetchProducts = () => {
    setIsLoading(true);
    setError('');
    productService
      .getProducts({ category: activeCategory, search: searchQuery })
      .then(setProducts)
      .catch(() => setError('Could not load products. Is the commerce API running?'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    setError('');
    const timeout = setTimeout(fetchProducts, 250); // debounce search typing
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, searchQuery]);

  const quantityInCart = useMemo(() => {
    const map = new Map<number, number>();
    // Cart is localStorage-backed — treat it as empty until hydration
    // completes so the first client render always matches SSR output.
    if (!hasHydrated) return map;
    for (const line of lines) {
      map.set(line.productId, (map.get(line.productId) ?? 0) + line.quantity);
    }
    return map;
  }, [lines, hasHydrated]);

  const productsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images[0] ? `${typeof window !== 'undefined' ? window.location.origin : ''}${product.images[0]}` : undefined,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'KES',
          price: product.price,
          availability: product.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        },
      },
    })),
  };

  return (
    <div className="pt-0">
      {products.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
        />
      )}
      {/* Hero Section — bento panel */}
      <section className="bg-gray-50 pt-8 pb-4 md:pt-12">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-fitness-primary via-fitness-primary-dark to-fitness-dark px-6 py-14 md:px-16 md:py-20">
            <div className="absolute inset-0 opacity-10 bg-pattern-dots" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white mb-6">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  New Collection
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-5">
                  Mark 254<br />Active Wear
                </h1>
                <p className="text-lg text-white/80 max-w-lg leading-relaxed">
                  Apparel, drinkware, and training gear built for the way you train. Your body, your rules.
                </p>
              </div>
              <div className="lg:col-span-5 relative h-56 md:h-64">
                {heroTiles.map((tile, i) => (
                  <div
                    key={tile.src}
                    className={`absolute ${tile.z} ${tile.rotate} w-36 h-44 md:w-44 md:h-52 rounded-2xl overflow-hidden shadow-2xl bg-white border-4 border-white/10`}
                    style={{ left: `${i * 26}%`, top: i % 2 ? '10%' : '0' }}
                  >
                    <Image src={tile.src} alt="" fill className="object-contain p-2" sizes="200px" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 bg-white rounded-2xl p-4">
              <div className="w-11 h-11 bg-fitness-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Truck size={22} className="text-fitness-primary" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Free Delivery</p>
                <p className="text-xs text-gray-500">Orders over KES 5,000</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-2xl p-4">
              <div className="w-11 h-11 bg-fitness-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield size={22} className="text-fitness-accent" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Quality Guaranteed</p>
                <p className="text-xs text-gray-500">Premium products</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-2xl p-4">
              <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <RefreshCw size={22} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-2xl p-4">
              <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Dumbbell size={22} className="text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Expert Curated</p>
                <p className="text-xs text-gray-500">Trainer approved</p>
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
              <div className="bg-white rounded-3xl p-6 shadow-card sticky top-24">
                <div className="mb-6 relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-fitness-primary focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveCategory('All')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === 'All'
                          ? 'bg-fitness-primary text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      All ({categories.reduce((sum, c) => sum + c.productCount, 0)})
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.slug}
                        onClick={() => setActiveCategory(category.slug)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          activeCategory === category.slug
                            ? 'bg-fitness-primary text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {category.name} ({category.productCount})
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
                  {isLoading ? 'Loading products…' : `Showing ${products.length} products`}
                </p>
              </div>

              {error ? (
                <EmptyState
                  icon={AlertCircle}
                  title="Couldn't load products"
                  description={error}
                  action={{ label: 'Try Again', icon: RefreshCw, onClick: fetchProducts }}
                />
              ) : isLoading ? (
                <div className="flex items-center justify-center py-24 text-gray-400">
                  <Loader2 className="animate-spin" size={32} />
                </div>
              ) : products.length === 0 ? (
                searchQuery || activeCategory !== 'All' ? (
                  <EmptyState
                    icon={Search}
                    title="No products match your search"
                    description="Try a different search term or category."
                    action={{
                      label: 'Clear Filters',
                      onClick: () => {
                        setSearchQuery('');
                        setActiveCategory('All');
                      },
                    }}
                  />
                ) : (
                  <EmptyState
                    icon={Dumbbell}
                    title="No products yet"
                    description="New Mark 254 gear is on the way — check back soon."
                  />
                )
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => {
                    const inCart = quantityInCart.get(product.id) ?? 0;
                    return (
                      <div key={product.id} className="card-fitness overflow-hidden group">
                        <Link href={`/shop/${product.slug}`} className="relative h-56 overflow-hidden bg-gray-100 block">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                          />
                          {product.isNew && (
                            <div className="absolute top-3 left-3 bg-fitness-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                              New
                            </div>
                          )}
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-semibold">Out of Stock</span>
                            </div>
                          )}
                          <button
                            onClick={(e) => e.preventDefault()}
                            className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                          >
                            <Heart size={18} className="text-gray-600" />
                          </button>
                        </Link>

                        <div className="p-5">
                          <p className="text-sm text-fitness-primary mb-1">{product.category?.name}</p>
                          <Link href={`/shop/${product.slug}`}>
                            <h3 className="font-bold text-gray-900 mb-2 hover:text-fitness-primary transition-colors">{product.name}</h3>
                          </Link>
                          <p className="text-sm text-gray-800 mb-3 line-clamp-2">{product.description}</p>

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xl font-bold text-fitness-primary">
                              KES {product.price.toLocaleString()}
                            </span>
                          </div>

                          {inCart > 0 ? (
                            <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                              <button
                                onClick={() => setQuantity(product.id, inCart - 1)}
                                className="p-1 hover:text-fitness-primary transition-colors"
                              >
                                <Minus size={18} />
                              </button>
                              <span className="font-semibold">{inCart}</span>
                              <button
                                onClick={() => addItem(product, 1)}
                                className="p-1 hover:text-fitness-primary transition-colors"
                              >
                                <Plus size={18} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addItem(product, 1)}
                              disabled={!product.inStock}
                              className="w-full btn-fitness flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <ShoppingCart size={18} />
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cart Button */}
      {hasHydrated && cartCount > 0 && (
        <Link
          href="/cart"
          className="fixed bottom-24 right-6 z-40 bg-fitness-primary text-white px-6 py-3 rounded-full shadow-fitness-lg flex items-center gap-2 hover:bg-fitness-primary-dark transition-colors"
        >
          <ShoppingCart size={20} />
          <span className="font-semibold">{cartCount} items</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
            KES {subtotal.toLocaleString()}
          </span>
        </Link>
      )}
    </div>
  );
}
