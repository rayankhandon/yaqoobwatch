import React, { useState } from 'react';
import type { UserOrder } from '../types';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, CreditCard, Bell, LogOut, CheckCircle2, Truck, ExternalLink } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { wishlistCount, addToast } = useShop();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'payments' | 'preferences'>('orders');

  const mockOrders: UserOrder[] = [
    {
      id: 'AUR-894210',
      date: 'July 14, 2026',
      status: 'Delivered',
      total: 3450,
      items: [
        {
          productName: 'AURELIS Heritage 01',
          productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
          quantity: 1,
          price: 3450,
        },
      ],
      trackingNumber: 'CH-SWISS-8890214X',
    },
    {
      id: 'AUR-721094',
      date: 'May 29, 2026',
      status: 'Delivered',
      total: 1200,
      items: [
        {
          productName: 'AURELIS Chronograph X',
          productImage: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop',
          quantity: 1,
          price: 1200,
        },
      ],
      trackingNumber: 'CH-SWISS-7710923A',
    },
  ];

  const handleLogout = () => {
    addToast('You have been logged out of your account.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-24 text-[#171717] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Account Header */}
        <div className="bg-white border border-[#e5e0d8] shadow-sm p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#B8924A]/10 border border-[#B8924A] flex items-center justify-center text-[#B8924A] font-serif text-2xl font-semibold">
              JV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl text-[#171717] font-normal">Julian Vance</h1>
                <span className="bg-[#B8924A] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                  VIP Patron
                </span>
              </div>
              <p className="text-xs text-stone-500">julian.vance@aurelis-patrons.com • Member since 2023</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-[#e5e0d8] text-xs uppercase font-medium text-stone-600 hover:text-[#171717] hover:border-red-500/50 transition-colors bg-[#FAF9F6]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-1 bg-white p-3 border border-[#e5e0d8] shadow-sm h-fit">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase font-medium tracking-wider transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#B8924A] text-white font-semibold'
                  : 'text-stone-600 hover:text-[#171717] hover:bg-[#FAF9F6]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order Vault ({mockOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase font-medium tracking-wider transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#B8924A] text-white font-semibold'
                  : 'text-stone-600 hover:text-[#171717] hover:bg-[#FAF9F6]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Details</span>
            </button>

            <Link
              to="/wishlist"
              className="w-full flex items-center justify-between px-4 py-3 text-xs uppercase font-medium tracking-wider text-stone-600 hover:text-[#171717] hover:bg-[#FAF9F6] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-[#B8924A]" />
                <span>Wishlist</span>
              </div>
              <span className="text-[10px] bg-[#FAF9F6] border border-[#e5e0d8] px-2 py-0.5 text-stone-700">{wishlistCount}</span>
            </Link>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase font-medium tracking-wider transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-[#B8924A] text-white font-semibold'
                  : 'text-stone-600 hover:text-[#171717] hover:bg-[#FAF9F6]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase font-medium tracking-wider transition-colors ${
                activeTab === 'payments'
                  ? 'bg-[#B8924A] text-white font-semibold'
                  : 'text-stone-600 hover:text-[#171717] hover:bg-[#FAF9F6]'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Payment Methods</span>
            </button>

            <button
              onClick={() => setActiveTab('preferences')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase font-medium tracking-wider transition-colors ${
                activeTab === 'preferences'
                  ? 'bg-[#B8924A] text-white font-semibold'
                  : 'text-stone-600 hover:text-[#171717] hover:bg-[#FAF9F6]'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Preferences</span>
            </button>
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-8 border border-[#e5e0d8] shadow-sm">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#e5e0d8] pb-4">
                  <h3 className="font-serif text-2xl text-[#171717] font-light">PURCHASE HISTORY</h3>
                  <span className="text-xs text-stone-500">2 Executed Orders</span>
                </div>

                <div className="space-y-6">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="bg-[#FAF9F6] border border-[#e5e0d8] p-6 space-y-4 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-4 text-xs pb-4 border-b border-[#e5e0d8]">
                        <div>
                          <span className="text-stone-400 uppercase tracking-widest block text-[10px]">
                            Order Number
                          </span>
                          <span className="font-mono font-medium text-[#171717]">{order.id}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 uppercase tracking-widest block text-[10px]">
                            Date Placed
                          </span>
                          <span className="text-stone-600">{order.date}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 uppercase tracking-widest block text-[10px]">
                            Total Authorization
                          </span>
                          <span className="font-serif text-[#171717] font-semibold">
                            ${order.total.toLocaleString()} USD
                          </span>
                        </div>
                        <div>
                          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{order.status}</span>
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center">
                          <img
                            src={item.productImage}
                            alt=""
                            className="w-16 h-16 object-cover bg-white border border-[#e5e0d8] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-base text-[#171717]">{item.productName}</h4>
                            <span className="text-xs text-stone-500">Qty: {item.quantity} • Includes 5-Year Guarantee</span>
                          </div>
                          <span className="text-xs font-semibold text-[#171717]">
                            ${item.price.toLocaleString()}
                          </span>
                        </div>
                      ))}

                      <div className="pt-3 border-t border-[#e5e0d8] flex items-center justify-between text-xs text-stone-500">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#B8924A]" />
                          <span>Tracking: <strong className="text-[#171717] font-mono">{order.trackingNumber}</strong></span>
                        </div>
                        <a
                          href="#track"
                          onClick={(e) => {
                            e.preventDefault();
                            addToast('Tracking status: Package delivered to concierge.', 'info');
                          }}
                          className="text-[#B8924A] hover:underline flex items-center gap-1 font-medium"
                        >
                          <span>Live Tracking</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-[#171717] font-light border-b border-[#e5e0d8] pb-4">
                  PERSONAL PROFILE
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-stone-500 uppercase tracking-widest block text-[10px] mb-1">First Name</label>
                    <input type="text" value="Julian" readOnly className="w-full bg-[#FAF9F6] border border-[#e5e0d8] p-3 text-[#171717]" />
                  </div>
                  <div>
                    <label className="text-stone-500 uppercase tracking-widest block text-[10px] mb-1">Last Name</label>
                    <input type="text" value="Vance" readOnly className="w-full bg-[#FAF9F6] border border-[#e5e0d8] p-3 text-[#171717]" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-stone-500 uppercase tracking-widest block text-[10px] mb-1">Email Address</label>
                    <input type="email" value="julian.vance@aurelis-patrons.com" readOnly className="w-full bg-[#FAF9F6] border border-[#e5e0d8] p-3 text-[#171717]" />
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-[#171717] font-light border-b border-[#e5e0d8] pb-4">
                  SAVED ADDRESSES
                </h3>
                <div className="p-6 bg-[#FAF9F6] border border-[#B8924A]/40 space-y-2 text-xs shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#B8924A] uppercase tracking-widest font-semibold">Primary Vault Residence</span>
                    <span className="bg-[#B8924A] text-white text-[9px] font-bold px-2 py-0.5">DEFAULT</span>
                  </div>
                  <p className="text-[#171717] font-medium text-sm">Julian Vance</p>
                  <p className="text-stone-600">740 Park Avenue, Apt 14B</p>
                  <p className="text-stone-600">New York, NY 10021</p>
                  <p className="text-stone-600">United States</p>
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-[#171717] font-light border-b border-[#e5e0d8] pb-4">
                  SAVED CARDS
                </h3>
                <div className="p-6 bg-[#FAF9F6] border border-[#e5e0d8] flex justify-between items-center text-xs shadow-sm">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-6 h-6 text-[#B8924A]" />
                    <div>
                      <p className="text-[#171717] font-mono font-semibold">•••• •••• •••• 8892</p>
                      <p className="text-stone-500">Exp 08/29 • Premium Black Card</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 font-semibold">
                    VERIFIED
                  </span>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl text-[#171717] font-light border-b border-[#e5e0d8] pb-4">
                  COMMUNICATION PREFERENCES
                </h3>
                <div className="space-y-4 text-xs">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-[#B8924A]" />
                    <span className="text-stone-700">Receive Private Pre-Order invitations for Limited Editions</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-[#B8924A]" />
                    <span className="text-stone-700">AURELIS Monthly Horology Gazette & Technical Papers</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
