import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, isQuickViewOpen, closeQuickView, addToCart, toggleWishlist, isInWishlist } =
    useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const currentColor = selectedColor || quickViewProduct.colors[0];

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, currentColor);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] border border-[#B8924A]/30 shadow-2xl overflow-hidden z-10 animate-fade-in my-auto">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-stone-600 hover:text-[#171717] transition-colors bg-white/80 backdrop-blur-md rounded-full border border-stone-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Images */}
          <div className="p-6 bg-[#F5F2EC] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e5e0d8]">
            <div className="relative aspect-square w-full bg-white overflow-hidden mb-4 border border-[#e5e0d8]">
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Thumbnail row */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 shrink-0 border transition-all ${
                      activeImageIndex === idx ? 'border-[#B8924A] shadow-sm' : 'border-[#e5e0d8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Summary */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 bg-white">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#B8924A] font-medium mb-1">
                {quickViewProduct.collection} Collection
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal mb-2">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#B8924A]">
                  <Star className="w-4 h-4 fill-[#B8924A]" />
                </div>
                <span className="text-xs font-semibold text-[#171717]">{quickViewProduct.rating}</span>
                <span className="text-xs text-stone-400">({quickViewProduct.reviewCount} Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-semibold text-[#171717]">
                  ${quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.compareAtPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ${quickViewProduct.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-6 font-light line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Color Options */}
              {quickViewProduct.colors.length > 0 && (
                <div className="mb-6">
                  <span className="block text-xs uppercase font-medium tracking-wider text-stone-500 mb-2.5">
                    Select Dial Color: <span className="text-[#171717] font-semibold">{currentColor}</span>
                  </span>
                  <div className="flex gap-2.5">
                    {quickViewProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs font-medium border transition-all ${
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
              <div className="mb-6">
                <span className="block text-xs uppercase font-medium tracking-wider text-stone-500 mb-2">
                  Quantity
                </span>
                <div className="flex items-center w-32 border border-[#e5e0d8] bg-[#FAF9F6]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 py-2 text-stone-500 hover:text-[#171717] transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-xs font-semibold text-[#171717]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 py-2 text-stone-500 hover:text-[#171717] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#e5e0d8]">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`p-3.5 border transition-colors ${
                    inWishlist
                      ? 'border-[#B8924A] bg-[#B8924A]/10 text-[#B8924A]'
                      : 'border-[#e5e0d8] hover:border-stone-400 text-stone-600'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#B8924A]' : ''}`} />
                </button>
              </div>

              <Link
                to={`/product/${quickViewProduct.id}`}
                onClick={closeQuickView}
                className="block text-center text-xs uppercase tracking-widest text-stone-500 hover:text-[#B8924A] transition-colors py-1"
              >
                View Complete Watch Details & Specifications →
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 text-[10px] uppercase tracking-wider text-stone-500 pt-2 border-t border-[#e5e0d8]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#B8924A]" />
                <span>Express Insured Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8924A]" />
                <span>5-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
