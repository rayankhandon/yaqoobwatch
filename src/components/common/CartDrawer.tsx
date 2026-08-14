import React from 'react';
import { useShop } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartItemCount,
  } = useShop();

  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCartDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF9F6] border-l border-[#e5e0d8] shadow-2xl flex flex-col justify-between animate-slide-right">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#e5e0d8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B8924A]" />
            <h3 className="font-serif text-xl tracking-wide text-[#171717]">Your Selection</h3>
            <span className="text-xs font-sans text-stone-500 bg-[#FAF9F6] border border-[#e5e0d8] px-2 py-0.5 rounded">
              ({cartItemCount})
            </span>
          </div>
          <button
            onClick={closeCartDrawer}
            className="p-2 text-stone-400 hover:text-[#171717] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-[#B8924A]/10 border border-[#B8924A]/20 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8 text-[#B8924A]" />
              </div>
              <p className="font-serif text-xl text-[#171717]">Your watch collection starts here.</p>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                Explore our signature timepieces and add extraordinary craft to your personal vault.
              </p>
              <button
                onClick={() => {
                  closeCartDrawer();
                  navigate('/shop');
                }}
                className="mt-4 px-6 py-3 bg-[#B8924A] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#A37F3B] transition-colors shadow-sm"
              >
                Explore Watches
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="flex gap-4 p-4 bg-white border border-[#e5e0d8] shadow-sm relative group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-[#F5F2EC] shrink-0 overflow-hidden border border-[#e5e0d8]">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-base font-normal text-[#171717] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#B8924A] mt-0.5 font-medium">
                      Dial: {item.selectedColor || item.product.colors[0]}
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#e5e0d8] bg-[#FAF9F6] text-xs">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedColor
                          )
                        }
                        className="w-7 py-1 text-stone-500 hover:text-[#171717]"
                      >
                        -
                      </button>
                      <span className="px-2 text-[#171717] font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.selectedColor
                          )
                        }
                        className="w-7 py-1 text-stone-500 hover:text-[#171717]"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-[#171717]">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#e5e0d8] space-y-4 shadow-md">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="text-[#171717] font-medium">${cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Insured Express Delivery</span>
                <span className="text-[#B8924A] font-medium">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#171717] pt-2 border-t border-[#e5e0d8]">
                <span>Estimated Total</span>
                <span className="text-[#B8924A] text-base">
                  ${cartSubtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  closeCartDrawer();
                  navigate('/cart');
                }}
                className="py-3 bg-[#FAF9F6] hover:bg-stone-200 text-[#171717] text-xs uppercase font-medium tracking-wider border border-[#e5e0d8] transition-colors text-center"
              >
                View Cart
              </button>
              <button
                onClick={() => {
                  closeCartDrawer();
                  navigate('/checkout');
                }}
                className="py-3 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs uppercase font-semibold tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8924A]" />
              <span>Includes 5-Year Global Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
