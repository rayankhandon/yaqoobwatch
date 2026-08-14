import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cartItemCount,
    wishlistCount,
    openSearch,
    openCartDrawer,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect for header compact state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, setIsMobileMenuOpen]);

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: 'New Arrivals', path: '/shop?filter=new' },
    { name: 'Watches', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: "Men's", path: '/shop?gender=Men' },
    { name: "Women's", path: '/shop?gender=Women' },
    { name: 'About', path: '/about' },
  ];

  // Dynamic header styles depending on scroll and home page state
  const isLightBackground = isScrolled || !isHomePage;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
          isLightBackground
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-[#e5e0d8] py-3 shadow-md shadow-black/5'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isLightBackground ? 'text-[#171717] hover:text-[#B8924A]' : 'text-white hover:text-[#E6CA65]'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left / Logo */}
          <div className="flex items-center">
            <Link to="/" className="group flex flex-col items-start focus:outline-none">
              <span
                className={`font-serif text-2xl sm:text-3xl font-light tracking-[0.25em] transition-colors ${
                  isLightBackground
                    ? 'text-[#171717] group-hover:text-[#B8924A]'
                    : 'text-white group-hover:text-[#E6CA65]'
                }`}
              >
                AURELIS
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-[#B8924A] -mt-1 font-medium hidden sm:block">
                GENÈVE • 1888
              </span>
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs uppercase font-medium tracking-[0.18em] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B8924A] hover:after:w-full after:transition-all after:duration-300 ${
                  isLightBackground
                    ? 'text-[#242424] hover:text-[#B8924A]'
                    : 'text-[#FAF9F6] hover:text-[#E6CA65]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons (Desktop & Mobile) */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Button */}
            <button
              onClick={openSearch}
              className={`p-2 transition-colors ${
                isLightBackground
                  ? 'text-[#242424] hover:text-[#B8924A]'
                  : 'text-[#FAF9F6] hover:text-[#E6CA65]'
              }`}
              aria-label="Search watches"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <Link
              to="/account"
              className={`hidden sm:block p-2 transition-colors ${
                isLightBackground
                  ? 'text-[#242424] hover:text-[#B8924A]'
                  : 'text-[#FAF9F6] hover:text-[#E6CA65]'
              }`}
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Icon with count */}
            <Link
              to="/wishlist"
              className={`hidden sm:block relative p-2 transition-colors ${
                isLightBackground
                  ? 'text-[#242424] hover:text-[#B8924A]'
                  : 'text-[#FAF9F6] hover:text-[#E6CA65]'
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B8924A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button with count */}
            <button
              onClick={openCartDrawer}
              className={`relative p-2 transition-colors ${
                isLightBackground
                  ? 'text-[#242424] hover:text-[#B8924A]'
                  : 'text-[#FAF9F6] hover:text-[#E6CA65]'
              }`}
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B8924A] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF9F6] border-r border-[#e5e0d8] p-6 flex flex-col justify-between shadow-2xl animate-slide-right">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#e5e0d8]">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="font-serif text-2xl tracking-[0.2em] text-[#171717]">AURELIS</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-[#171717]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-sm uppercase font-medium tracking-widest text-[#242424] hover:text-[#B8924A] transition-colors py-2 border-b border-[#e5e0d8]/60"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Footer Links */}
            <div className="pt-6 border-t border-[#e5e0d8] flex flex-col gap-4">
              <Link
                to="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-xs uppercase font-medium tracking-wider text-[#242424] hover:text-[#B8924A]"
              >
                <User className="w-4 h-4 text-[#B8924A]" />
                <span>My Account</span>
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between text-xs uppercase font-medium tracking-wider text-[#242424] hover:text-[#B8924A]"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-[#B8924A]" />
                  <span>Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="bg-[#B8924A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 pt-2">
                © AURELIS GENÈVE. TIME, REFINED.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
