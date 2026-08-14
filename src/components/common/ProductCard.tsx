import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div
      className="group relative flex flex-col bg-white border border-[#e5e0d8] hover:border-[#B8924A]/40 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/5 w-full bg-[#F5F2EC] overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.compareAtPrice && (
            <span className="bg-[#B8924A] text-white text-[10px] uppercase font-semibold tracking-widest px-2.5 py-1 shadow-sm">
              Sale
            </span>
          )}
          {product.newArrival && !product.compareAtPrice && (
            <span className="bg-[#FAF9F6] text-[#242424] border border-[#d8d3c9] text-[10px] uppercase font-medium tracking-widest px-2.5 py-1 shadow-sm">
              New
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] uppercase tracking-widest px-2 py-0.5">
              Only {product.stock} Left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-300 ${
            inWishlist
              ? 'bg-[#B8924A] text-white shadow-md scale-105'
              : 'bg-white/80 text-stone-700 hover:bg-white hover:text-[#B8924A] shadow-sm backdrop-blur-md border border-stone-200/50'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Primary & Secondary Images */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={isHovered ? secondaryImage : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Hover Quick View & Quick Add Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white/95 via-white/80 to-transparent flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={() => openQuickView(product)}
            className="flex-1 py-2.5 bg-[#171717] hover:bg-[#B8924A] text-white text-xs uppercase font-medium tracking-wider border border-transparent transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A15A]" />
            <span>Quick View</span>
          </button>

          <button
            onClick={() => addToCart(product, 1)}
            className="p-2.5 bg-[#B8924A] hover:bg-[#A37F3B] text-white transition-colors flex items-center justify-center shadow-sm"
            title="Add to Bag"
            aria-label="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#B8924A] font-medium mb-1">
          <span>AURELIS</span>
          <span className="text-stone-400 font-sans tracking-normal">{product.collection}</span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="font-serif text-lg font-normal text-[#171717] hover:text-[#B8924A] transition-colors line-clamp-1 mb-2"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3 text-xs text-stone-500">
          <div className="flex items-center text-[#B8924A]">
            <Star className="w-3.5 h-3.5 fill-[#B8924A]" />
          </div>
          <span className="font-semibold text-[#171717]">{product.rating}</span>
          <span className="text-stone-400">({product.reviewCount})</span>
        </div>

        {/* Price & Details */}
        <div className="mt-auto pt-3 border-t border-[#e5e0d8] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-medium text-[#171717]">
              ${product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-stone-400 line-through">
                ${product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          <span className="text-[10px] uppercase font-medium tracking-widest text-stone-400">
            {product.caseSize} • {product.movement.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
};
