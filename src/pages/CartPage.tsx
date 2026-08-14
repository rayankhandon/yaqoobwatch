import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Heart, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    toggleWishlist,
    isInWishlist,
    addToast,
  } = useShop();

  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'AURELIS10' || code === 'WELCOME') {
      setDiscountPercent(10);
      addToast('10% VIP Patron Discount applied to your order.', 'success');
    } else if (code === 'HERITAGE15') {
      setDiscountPercent(15);
      addToast('15% Heritage Privé Discount applied!', 'success');
    } else {
      addToast('Invalid promotional code. Try "AURELIS10"', 'error');
    }
  };

  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.05; // 5% tax
  const finalTotal = cartSubtotal - discountAmount + estimatedTax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-24 flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-[#B8924A]/10 border border-[#B8924A]/20 flex items-center justify-center text-[#B8924A] mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block mb-2">
          Your Vault
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] font-light mb-4">
          Your watch collection starts here.
        </h1>
        <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed mb-8">
          You currently have no timepieces in your shopping bag. Explore our haute horlogerie masterworks and build your personal legacy.
        </p>

        <Link
          to="/shop"
          className="px-8 py-4 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-md"
        >
          <span>Explore All Watches</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-24 text-[#171717] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="pb-8 border-b border-[#e5e0d8] mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
              Shopping Bag
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] font-light">YOUR SELECTION</h1>
          </div>
          <span className="text-xs text-stone-500 font-light">
            {cart.length} unique timepiece model{cart.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => {
              const inWishlist = isInWishlist(item.product.id);
              return (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="bg-white border border-[#e5e0d8] p-6 flex flex-col sm:flex-row gap-6 relative shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-full sm:w-32 aspect-square bg-[#F5F2EC] shrink-0 border border-[#e5e0d8] overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#B8924A]">
                            {item.product.collection}
                          </span>
                          <h3 className="font-serif text-xl text-[#171717] font-normal">
                            <Link
                              to={`/product/${item.product.id}`}
                              className="hover:text-[#B8924A] transition-colors"
                            >
                              {item.product.name}
                            </Link>
                          </h3>
                        </div>

                        <span className="text-lg font-light text-[#171717] font-serif">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-xs text-stone-500 space-y-1 mt-2">
                        <p>Dial Variation: <span className="text-[#171717] font-semibold">{item.selectedColor || item.product.colors[0]}</span></p>
                        <p>Strap: <span className="text-[#171717] font-semibold">{item.selectedStrap || item.product.strapMaterial}</span></p>
                        <p>Guarantee: <span className="text-[#B8924A]">5-Year Swiss Warranty Included</span></p>
                      </div>
                    </div>

                    {/* Actions & Quantity */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#e5e0d8]">
                      <div className="flex items-center gap-4 text-xs">
                        <button
                          onClick={() => toggleWishlist(item.product)}
                          className={`flex items-center gap-1.5 transition-colors ${
                            inWishlist ? 'text-[#B8924A]' : 'text-stone-500 hover:text-[#171717]'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-[#B8924A]' : ''}`} />
                          <span>{inWishlist ? 'Saved in Wishlist' : 'Move to Wishlist'}</span>
                        </button>

                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="flex items-center gap-1.5 text-stone-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>

                      {/* Quantity control */}
                      <div className="flex items-center border border-[#e5e0d8] bg-[#FAF9F6] text-xs">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.quantity - 1, item.selectedColor)
                          }
                          className="w-8 py-1 text-stone-500 hover:text-[#171717]"
                        >
                          -
                        </button>
                        <span className="px-3 text-[#171717] font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.quantity + 1, item.selectedColor)
                          }
                          className="w-8 py-1 text-stone-500 hover:text-[#171717]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-4 flex justify-between items-center text-xs">
              <Link to="/shop" className="text-stone-500 hover:text-[#B8924A] transition-colors">
                ← Continue Browsing Timepieces
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#e5e0d8] p-6 space-y-6 shadow-sm">
              <h3 className="font-serif text-xl text-[#171717] font-light pb-4 border-b border-[#e5e0d8]">
                SUMMARY
              </h3>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="block text-xs uppercase tracking-wider text-stone-500 font-medium">
                  Promotional / Patron Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. AURELIS10"
                    className="flex-1 bg-[#FAF9F6] border border-[#e5e0d8] text-[#171717] text-xs px-3 py-2 uppercase font-mono focus:outline-none focus:border-[#B8924A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-800 hover:bg-[#B8924A] text-white text-xs uppercase font-medium transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {discountPercent > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 pt-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{discountPercent}% Patron discount active</span>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs pt-4 border-t border-[#e5e0d8]">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span className="text-[#171717] font-medium">${cartSubtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>VIP Patron Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-500">
                  <span>Insured Express Shipping</span>
                  <span className="text-[#B8924A] font-medium">COMPLIMENTARY</span>
                </div>

                <div className="flex justify-between text-stone-500">
                  <span>Estimated Tax (5%)</span>
                  <span className="text-[#171717] font-medium">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#171717] pt-4 border-t border-[#e5e0d8]">
                  <span>Total Order Amount</span>
                  <span className="text-[#B8924A] font-serif text-xl">
                    ${finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8924A]" />
                <span>Encrypted 256-Bit Bank Level Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
