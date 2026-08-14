import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductAccordion } from '../components/product/ProductAccordion';
import { ProductCard } from '../components/common/ProductCard';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, ChevronRight, CreditCard } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedStrap, setSelectedStrap] = useState<string>('');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || '');
      setSelectedStrap(product.strapMaterial);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-32 text-center text-[#171717]">
        <h2>Timepiece not found</h2>
        <Link to="/shop" className="text-[#B8924A] hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const currentColor = selectedColor || product.colors[0];

  // Related products from same collection
  const relatedProducts = PRODUCTS.filter(
    (p) => p.collection === product.collection && p.id !== product.id
  ).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity, currentColor, selectedStrap);
    navigate('/checkout');
  };

  const installmentAmount = (product.price / 4).toFixed(2);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-24 text-[#171717] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 mb-8">
          <Link to="/" className="hover:text-[#171717] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <Link to="/shop" className="hover:text-[#171717] transition-colors">
            Watches
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-300" />
          <span className="text-[#B8924A] truncate">{product.name}</span>
        </nav>

        {/* Top Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Buying Information */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium">
                  {product.collection} Collection
                </span>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest">
                  REF: {product.id.toUpperCase()}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light tracking-wide mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-[#B8924A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B8924A]" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#171717]">{product.rating}</span>
                <span className="text-xs text-stone-400">({product.reviewCount} Patron Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-light text-[#171717] font-serif">
                  ${product.price.toLocaleString()} USD
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-stone-400 line-through">
                    ${product.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Installments info */}
              <div className="flex items-center gap-2 text-xs text-stone-600 bg-white p-3 border border-[#e5e0d8] shadow-sm">
                <CreditCard className="w-4 h-4 text-[#B8924A] shrink-0" />
                <span>
                  Or 4 interest-free payments of <strong className="text-[#171717]">${installmentAmount}</strong> with Concierge Installments.
                </span>
              </div>
            </div>

            {/* Description Short */}
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs uppercase font-medium tracking-wider text-stone-500">
                  Dial Variation: <span className="text-[#171717] font-semibold">{currentColor}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs font-medium border transition-all ${
                        currentColor === color
                          ? 'border-[#B8924A] bg-[#B8924A]/10 text-[#171717]'
                          : 'border-[#e5e0d8] text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="block text-xs uppercase font-medium tracking-wider text-stone-500">
                Quantity
              </label>
              <div className="flex items-center w-36 border border-[#e5e0d8] bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 py-2.5 text-stone-500 hover:text-[#171717] transition-colors"
                >
                  -
                </button>
                <span className="flex-1 text-center text-xs font-semibold text-[#171717]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 py-2.5 text-stone-500 hover:text-[#171717] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#e5e0d8]">
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(product, quantity, currentColor, selectedStrap)}
                  className="flex-1 py-4 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border transition-colors ${
                    inWishlist
                      ? 'border-[#B8924A] bg-[#B8924A]/10 text-[#B8924A]'
                      : 'border-[#e5e0d8] hover:border-stone-400 text-stone-600'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#B8924A]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 bg-[#171717] hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-[0.2em] border border-transparent transition-all shadow-sm"
              >
                Instant Express Checkout
              </button>
            </div>

            {/* Key Trust Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-4 text-[10px] uppercase tracking-wider text-stone-500 border-t border-[#e5e0d8] text-center">
              <div className="p-3 bg-white border border-[#e5e0d8] shadow-sm space-y-1">
                <Truck className="w-4 h-4 text-[#B8924A] mx-auto" />
                <span className="block">Free Insured Courier</span>
              </div>
              <div className="p-3 bg-white border border-[#e5e0d8] shadow-sm space-y-1">
                <ShieldCheck className="w-4 h-4 text-[#B8924A] mx-auto" />
                <span className="block">5-Year Swiss Warranty</span>
              </div>
              <div className="p-3 bg-white border border-[#e5e0d8] shadow-sm space-y-1">
                <RotateCcw className="w-4 h-4 text-[#B8924A] mx-auto" />
                <span className="block">30-Day Concierge Return</span>
              </div>
            </div>

            {/* Accordion Specs */}
            <ProductAccordion product={product} />
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-28 pt-16 border-t border-[#e5e0d8] space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
                Complementary Timepieces
              </span>
              <h3 className="font-serif text-3xl text-[#171717] font-light">YOU MAY ALSO ADMIRE</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
