import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldAlert, ArrowRight } from 'lucide-react';

export const SpecialEdition: React.FC = () => {
  // Live Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white relative border-t border-[#e5e0d8] overflow-hidden">
      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B8924A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#FAF9F6] border border-[#B8924A]/30 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-lg">
          {/* Left Column: Watch Image */}
          <div className="lg:col-span-6 relative aspect-square bg-[#F5F2EC] overflow-hidden border border-[#e5e0d8] group">
            <img
              src="https://images.unsplash.com/photo-1517463944645-a773bc2a1387?q=80&w=1200&auto=format&fit=crop"
              alt="THE HERITAGE 01 Special Edition"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 bg-[#B8924A] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 shadow-sm">
              LIMITED EDITION
            </div>
          </div>

          {/* Right Column: Details & Live Timer */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B8924A] font-semibold">
              <ShieldAlert className="w-4 h-4" />
              <span>Only 250 Pieces Worldwide</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#171717] tracking-wide">
              THE HERITAGE 01
            </h2>

            <p className="text-sm text-stone-600 font-light leading-relaxed">
              Featuring our hand-finished skeletonized Tourbillon caliber housed inside Grade 5 Titanium. Individually numbered from 001/250 to 250/250 with hand-engraved caseback.
            </p>

            {/* Limited Stock Gauge */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium tracking-wider">
                <span className="text-stone-500">Vault Availability</span>
                <span className="text-[#B8924A]">18 Pieces Remaining</span>
              </div>
              <div className="w-full h-2 bg-[#e5e0d8] overflow-hidden border border-[#d8d3c9]">
                <div className="h-full bg-gradient-to-r from-[#B8924A] to-[#D2B06A] w-[14%]" />
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="pt-2">
              <span className="text-xs uppercase font-medium tracking-widest text-stone-500 block mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B8924A]" />
                <span>Allocation Window Closes In:</span>
              </span>
              <div className="grid grid-cols-4 gap-3 text-center max-w-md">
                <div className="p-3 bg-white border border-[#e5e0d8] shadow-sm">
                  <div className="font-serif text-2xl font-light text-[#171717]">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-stone-500 mt-1">Days</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e0d8] shadow-sm">
                  <div className="font-serif text-2xl font-light text-[#171717]">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-stone-500 mt-1">Hours</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e0d8] shadow-sm">
                  <div className="font-serif text-2xl font-light text-[#171717]">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-stone-500 mt-1">Mins</div>
                </div>
                <div className="p-3 bg-white border border-[#e5e0d8] shadow-sm">
                  <div className="font-serif text-2xl font-light text-[#B8924A]">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-stone-500 mt-1">Secs</div>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-stone-500 block">Price</span>
                <span className="text-3xl font-light text-[#171717] font-serif">$12,500 USD</span>
              </div>

              <Link
                to="/product/aurelis-eclipse-tourbillon"
                className="px-8 py-4 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group shadow-md"
              >
                <span>Explore Edition</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
