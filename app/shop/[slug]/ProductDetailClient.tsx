'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart, Minus, Plus, X, ChevronLeft, ChevronRight,
  Loader2, AlertCircle, Check, ArrowLeft, ZoomIn
} from 'lucide-react';
import { productService } from '@/app/api_services/productService';
import { useCartStore } from '@/app/lib/cartStore';
import { getColorSwatch } from '@/app/lib/colorSwatches';
import { ProductDetail } from '@/types/commerce';

export default function ProductDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError('');
    productService
      .getProduct(slug)
      .then((p) => {
        setProduct(p);
        setSelectedImage(0);
      })
      .catch(() => setError('This product could not be found.'))
      .finally(() => setIsLoading(false));
  }, [slug]);

  const handleAddToCart = (goToCart: boolean) => {
    if (!product) return;
    if (product.colors.length > 0 && !selectedColor) {
      setValidationError('Please select a color.');
      return;
    }
    if (product.sizes.length > 0 && !selectedSize) {
      setValidationError('Please select a size.');
      return;
    }
    setValidationError('');
    addItem(product, quantity, selectedSize, selectedColor);

    if (goToCart) {
      router.push('/cart');
      return;
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const productJsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images[0]
          ? `${typeof window !== 'undefined' ? window.location.origin : ''}${product.images[0]}`
          : undefined,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'KES',
          price: product.price,
          availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
      }
    : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-400">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <AlertCircle size={40} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-600 mb-6">{error || 'Product not found.'}</p>
        <Link href="/shop" className="btn-fitness inline-flex items-center gap-2">
          <ArrowLeft size={18} />
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-0 bg-gray-50">
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X size={24} />
          </button>
          {product.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedImage((i) => (i - 1 + product.images.length) % product.images.length); }}
                className="absolute left-4 md:left-8 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedImage((i) => (i + 1) % product.images.length); }}
                className="absolute right-4 md:right-8 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/shop" className="hover:text-fitness-primary transition-colors">Shop</Link>
          {product.category && (
            <>
              <span>/</span>
              <span>{product.category.name}</span>
            </>
          )}
          <span>/</span>
          <span className="text-gray-800 font-medium truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div
              className="relative h-80 md:h-[28rem] bg-white rounded-3xl overflow-hidden shadow-card cursor-zoom-in group"
              onClick={() => setIsLightboxOpen(true)}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-6"
              />
              <div className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={18} className="text-gray-600" />
              </div>
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold">Out of Stock</span>
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, index) => (
                  <button
                    key={img + index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-white border-2 transition-colors ${
                      selectedImage === index ? 'border-fitness-primary' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.category && (
              <p className="text-sm font-semibold text-fitness-primary mb-2">{product.category.name}</p>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
            <p className="text-2xl font-bold text-fitness-primary mb-5">
              KES {product.price.toLocaleString()}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

            {/* Color swatches */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Color{selectedColor ? `: ${selectedColor}` : ''}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => { setSelectedColor(color); setValidationError(''); }}
                      title={color}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        selectedColor === color ? 'border-fitness-primary scale-110' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: getColorSwatch(color) }}
                      >
                        {selectedColor === color && (
                          <Check size={14} className={color === 'White' ? 'text-gray-800' : 'text-white'} />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size picker */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Size{selectedSize ? `: ${selectedSize}` : ''}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setValidationError(''); }}
                      className={`min-w-[3rem] px-4 py-2 rounded-xl text-sm font-medium border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-fitness-primary bg-fitness-primary/10 text-fitness-primary'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Quantity</h3>
              <div className="inline-flex items-center gap-4 bg-white rounded-xl p-2 shadow-card">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 hover:text-fitness-primary transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="font-semibold w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 hover:text-fitness-primary transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {validationError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-600">
                <AlertCircle size={16} />
                {validationError}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleAddToCart(false)}
                disabled={!product.inStock}
                className="flex-1 btn-fitness flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {justAdded ? (
                  <>
                    <Check size={18} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => handleAddToCart(true)}
                disabled={!product.inStock}
                className="flex-1 px-6 py-3 rounded-xl font-semibold border-2 border-fitness-primary text-fitness-primary hover:bg-fitness-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related products */}
        {product.related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {product.related.map((related) => (
                <Link
                  key={related.id}
                  href={`/shop/${related.slug}`}
                  className="card-fitness overflow-hidden group"
                >
                  <div className="relative h-40 bg-gray-100 overflow-hidden">
                    <img
                      src={related.images[0]}
                      alt={related.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{related.name}</h3>
                    <p className="text-fitness-primary font-bold text-sm">KES {related.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
