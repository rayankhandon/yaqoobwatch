import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, CheckCircle2, CreditCard, Smartphone, Truck } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, clearCart, addToast } = useShop();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'wire'>('card');
  const [deliveryOption, setDeliveryOption] = useState<'express' | 'armored'>('express');
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form Fields State
  const [form, setForm] = useState({
    email: 'collector@aurelis.com',
    firstName: 'Julian',
    lastName: 'Vance',
    address: '740 Park Avenue, Apt 14B',
    city: 'New York',
    state: 'NY',
    zip: '10021',
    country: 'United States',
    cardNumber: '4532 •••• •••• 8892',
    expDate: '08/29',
    cvv: '921',
  });

  const deliveryCost = deliveryOption === 'armored' ? 150 : 0;
  const tax = cartSubtotal * 0.05;
  const total = cartSubtotal + deliveryCost + tax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.firstName || !form.address) {
      addToast('Please complete all required shipping fields.', 'error');
      return;
    }

    const generatedId = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsOrderConfirmed(true);
    clearCart();
    addToast('Your order has been officially registered.', 'success');
  };

  if (isOrderConfirmed) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-24 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white border border-[#B8924A]/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#B8924A]/10 border border-[#B8924A] flex items-center justify-center mx-auto text-[#B8924A]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-[#B8924A] font-medium block">
            Genève Vault Registration Confirmed
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light">
            THANK YOU FOR YOUR PATRONAGE
          </h1>

          <div className="p-4 bg-[#FAF9F6] border border-[#e5e0d8] text-xs text-stone-700 space-y-1">
            <p>
              Order Identifier: <strong className="text-[#B8924A] font-mono">{orderId}</strong>
            </p>
            <p>A confirmation email with real-time GPS tracking has been sent to {form.email}.</p>
          </div>

          <p className="text-xs text-stone-600 font-light leading-relaxed">
            Your watch is currently undergoing final timing calibration and white-glove packaging in our vault. Scheduled delivery: <strong>3 Business Days</strong>.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/account"
              className="px-6 py-3 bg-[#FAF9F6] hover:bg-stone-200 text-[#171717] text-xs font-semibold uppercase tracking-wider border border-[#e5e0d8] transition-colors"
            >
              View Order in Dashboard
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              Return to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-32 text-center text-[#171717] space-y-4">
        <h2 className="font-serif text-2xl">Your bag is empty</h2>
        <Link to="/shop" className="text-xs uppercase text-[#B8924A] tracking-widest font-semibold">
          Explore Watches →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-24 text-[#171717] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-8 border-b border-[#e5e0d8] mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
            Express Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] font-light">SECURE ORDER</h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form Columns */}
          <div className="lg:col-span-7 space-y-10">
            {/* Section 1: Contact Information */}
            <div className="space-y-4 bg-white p-6 border border-[#e5e0d8] shadow-sm">
              <h3 className="font-serif text-xl text-[#171717] font-light border-b border-[#e5e0d8] pb-3 flex items-center justify-between">
                <span>1. CONTACT INFORMATION</span>
                <Lock className="w-4 h-4 text-[#B8924A]" />
              </h3>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider text-stone-500 font-medium">
                  Email Address for Receipt & Tracking
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-[#e5e0d8] text-[#171717] text-xs px-4 py-3 focus:outline-none focus:border-[#B8924A]"
                />
              </div>
            </div>

            {/* Section 2: Shipping Address */}
            <div className="space-y-4 bg-white p-6 border border-[#e5e0d8] shadow-sm">
              <h3 className="font-serif text-xl text-[#171717] font-light border-b border-[#e5e0d8] pb-3">
                2. SHIPPING DESTINATION
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider text-stone-500">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#e5e0d8] text-[#171717] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B8924A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider text-stone-500">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#e5e0d8] text-[#171717] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B8924A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-stone-500">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-[#e5e0d8] text-[#171717] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B8924A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider text-stone-500">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#e5e0d8] text-[#171717] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B8924A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider text-stone-500">
                    State / Province
                  </label>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#e5e0d8] text-[#171717] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B8924A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider text-stone-500">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#e5e0d8] text-[#171717] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B8924A]"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Delivery Options */}
            <div className="space-y-4 bg-white p-6 border border-[#e5e0d8] shadow-sm">
              <h3 className="font-serif text-xl text-[#171717] font-light border-b border-[#e5e0d8] pb-3">
                3. DELIVERY SERVICE
              </h3>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryOption('express')}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                    deliveryOption === 'express'
                      ? 'border-[#B8924A] bg-[#B8924A]/10'
                      : 'border-[#e5e0d8] hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#B8924A]" />
                    <div>
                      <h4 className="text-xs font-semibold text-[#171717]">Insured Express Courier</h4>
                      <p className="text-[11px] text-stone-500">2-3 Business Days • Direct Signature Required</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#B8924A] font-medium">COMPLIMENTARY</span>
                </label>

                <label
                  onClick={() => setDeliveryOption('armored')}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                    deliveryOption === 'armored'
                      ? 'border-[#B8924A] bg-[#B8924A]/10'
                      : 'border-[#e5e0d8] hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#B8924A]" />
                    <div>
                      <h4 className="text-xs font-semibold text-[#171717]">Armored Security Transport</h4>
                      <p className="text-[11px] text-stone-500">Next Day Hand-Delivery by Armed Courier</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#171717] font-medium">$150 USD</span>
                </label>
              </div>
            </div>

            {/* Section 4: Payment Method */}
            <div className="space-y-4 bg-white p-6 border border-[#e5e0d8] shadow-sm">
              <h3 className="font-serif text-xl text-[#171717] font-light border-b border-[#e5e0d8] pb-3">
                4. PAYMENT METHOD
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border flex flex-col items-center gap-1.5 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-[#B8924A] bg-[#B8924A]/10 text-[#171717]'
                      : 'border-[#e5e0d8] text-stone-500'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#B8924A]" />
                  <span className="text-[10px] font-semibold uppercase">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3 border flex flex-col items-center gap-1.5 transition-colors ${
                    paymentMethod === 'applepay'
                      ? 'border-[#B8924A] bg-[#B8924A]/10 text-[#171717]'
                      : 'border-[#e5e0d8] text-stone-500'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-[#B8924A]" />
                  <span className="text-[10px] font-semibold uppercase">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire')}
                  className={`p-3 border flex flex-col items-center gap-1.5 transition-colors ${
                    paymentMethod === 'wire'
                      ? 'border-[#B8924A] bg-[#B8924A]/10 text-[#171717]'
                      : 'border-[#e5e0d8] text-stone-500'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-[#B8924A]" />
                  <span className="text-[10px] font-semibold uppercase">Bank Wire</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={form.cardNumber}
                      onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#e5e0d8] text-[#171717] text-xs px-3 py-2.5 font-mono focus:outline-none focus:border-[#B8924A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        value={form.expDate}
                        onChange={(e) => setForm({ ...form, expDate: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-[#e5e0d8] text-[#171717] text-xs px-3 py-2.5 font-mono focus:outline-none focus:border-[#B8924A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-500 mb-1">
                        Security Code (CVV)
                      </label>
                      <input
                        type="password"
                        required
                        value={form.cvv}
                        onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-[#e5e0d8] text-[#171717] text-xs px-3 py-2.5 font-mono focus:outline-none focus:border-[#B8924A]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'applepay' && (
                <div className="p-4 bg-[#FAF9F6] border border-[#e5e0d8] text-center text-xs text-stone-600">
                  Touch ID or Face ID verification will be requested upon submitting order.
                </div>
              )}

              {paymentMethod === 'wire' && (
                <div className="p-4 bg-[#FAF9F6] border border-[#e5e0d8] text-xs text-stone-600 space-y-1">
                  <p>Wire transfer instruction details will be issued upon order confirmation.</p>
                  <p className="text-[10px] text-[#B8924A] font-semibold">2% Wire Transfer Privilege Discount Applied</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#e5e0d8] p-6 space-y-6 sticky top-28 shadow-sm">
              <h3 className="font-serif text-xl text-[#171717] font-light pb-3 border-b border-[#e5e0d8]">
                ORDER SUMMARY
              </h3>

              {/* Items Preview */}
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-12 h-12 bg-[#F5F2EC] object-cover border border-[#e5e0d8] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs text-[#171717] truncate font-medium">{item.product.name}</h4>
                      <span className="text-[10px] text-stone-500">Qty: {item.quantity}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#171717]">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs pt-4 border-t border-[#e5e0d8]">
                <div className="flex justify-between text-stone-500">
                  <span>Merchandise Subtotal</span>
                  <span className="text-[#171717] font-medium">${cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Delivery Service</span>
                  <span className="text-[#171717] font-medium">
                    {deliveryOption === 'armored' ? '$150 USD' : 'COMPLIMENTARY'}
                  </span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Sales Tax & Import Duties</span>
                  <span className="text-[#171717] font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#171717] pt-4 border-t border-[#e5e0d8]">
                  <span>Final Authorization</span>
                  <span className="text-[#B8924A] font-serif text-xl">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md"
              >
                Complete Purchase & Authorize
              </button>

              <div className="text-[10px] uppercase tracking-widest text-stone-400 text-center space-y-1">
                <p>30-Day Money-Back Guarantee</p>
                <p>Protected by Swiss Escrow Protocol</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
