import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Globe, Share2, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#24221F] border-t border-[#383430] text-stone-300 font-sans pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.25em] text-[#FAF9F6]">AURELIS</span>
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#B8924A] mt-0.5 font-medium">
                GENÈVE • EST. 1888
              </p>
            </Link>
            <p className="text-sm font-light text-stone-300 max-w-sm leading-relaxed">
              "Precision. Character. Timeless."
              <br />
              High-end luxury timepieces engineered with uncompromising Swiss precision, tailored for those who value understated distinction.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-white/10 text-[#FAF9F6] hover:bg-[#B8924A] hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="Global Salons"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-white/10 text-[#FAF9F6] hover:bg-[#B8924A] hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-white/10 text-[#FAF9F6] hover:bg-[#B8924A] hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="Compass"
              >
                <Compass className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full bg-white/10 text-[#FAF9F6] hover:bg-[#B8924A] hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="Gazette Mail"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-[0.2em] text-[#FAF9F6]">Shop</h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <Link to="/shop" className="hover:text-[#B8924A] transition-colors">
                  All Watches
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=new" className="hover:text-[#B8924A] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop?filter=bestsellers" className="hover:text-[#B8924A] transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-[#B8924A] transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-[0.2em] text-[#FAF9F6]">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <a href="#contact" onClick={(e) => e.preventDefault()} className="hover:text-[#B8924A] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#shipping" onClick={(e) => e.preventDefault()} className="hover:text-[#B8924A] transition-colors">
                  Complimentary Shipping
                </a>
              </li>
              <li>
                <a href="#returns" onClick={(e) => e.preventDefault()} className="hover:text-[#B8924A] transition-colors">
                  30-Day Concierge Returns
                </a>
              </li>
              <li>
                <a href="#warranty" onClick={(e) => e.preventDefault()} className="hover:text-[#B8924A] transition-colors">
                  5-Year International Warranty
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => e.preventDefault()} className="hover:text-[#B8924A] transition-colors">
                  Watch Care & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-[0.2em] text-[#FAF9F6]">About</h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <Link to="/about" className="hover:text-[#B8924A] transition-colors">
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link to="/about#craftsmanship" className="hover:text-[#B8924A] transition-colors">
                  Swiss Craftsmanship
                </Link>
              </li>
              <li>
                <Link to="/about#journal" className="hover:text-[#B8924A] transition-colors">
                  Horology Journal
                </Link>
              </li>
              <li>
                <a href="#boutiques" onClick={(e) => e.preventDefault()} className="hover:text-[#B8924A] transition-colors">
                  Global Boutiques
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-400 font-light">
          <p>© {new Date().getFullYear()} AURELIS GENÈVE S.A. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#FAF9F6] transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#FAF9F6] transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" onClick={(e) => e.preventDefault()} className="hover:text-[#FAF9F6] transition-colors">
              Cookie Preferences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
