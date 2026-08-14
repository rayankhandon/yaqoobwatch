import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, wishlistCount } = useShop();

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-24 flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-[#B8924A]/10 border border-[#B8924A]/20 flex items-center justify-center text-[#B8924A] mb-6">
          <Heart className="w-10 h-10" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block mb-2">
          Your Saved Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] font-light mb-4">
          Your wishlist is currently empty.
        </h1>
        <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed mb-8">
          Save your favorite AURELIS timepieces as you explore our catalog to curate your dream horological collection.
        </p>

        <Link
          to="/shop"
          className="px-8 py-4 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-md"
        >
          <span>Discover Timepieces</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-24 text-[#171717] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 border-b border-[#e5e0d8] mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
              Curated Favorites
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] font-light">YOUR WISHLIST</h1>
          </div>
          <span className="text-xs text-stone-500 font-light">
            {wishlistCount} saved timepiece{wishlistCount > 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {wishlist.map((item) => (
            <ProductCard key={item.product.id} product={item.product} />
          ))}
        </div>
      </div>
    </div>
  );
};
