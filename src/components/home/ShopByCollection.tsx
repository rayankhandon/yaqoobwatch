import React from 'react';
import { COLLECTIONS_DATA } from '../../data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ShopByCollection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative border-t border-[#e5e0d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
            Explore Horology
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#171717] tracking-wide">
            SHOP BY COLLECTION
          </h2>
          <div className="w-12 h-[1px] bg-[#B8924A] mx-auto my-4" />
          <p className="text-sm text-stone-600 font-light">
            From high-frequency automatic chronographs to minimalist dress watch icons.
          </p>
        </div>

        {/* Collection Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTIONS_DATA.slice(0, 5).map((col, index) => (
            <div
              key={col.id}
              className={`group relative overflow-hidden bg-[#FAF9F6] border border-[#e5e0d8] hover:border-[#B8924A]/50 transition-all duration-700 aspect-4/5 shadow-sm hover:shadow-xl ${
                index === 0 ? 'lg:col-span-2 lg:aspect-16/9' : ''
              }`}
            >
              {/* Background Image */}
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                loading="lazy"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              {/* Content Box */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-left space-y-3">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#E6CA65] font-medium">
                  {col.count} Timepieces
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-white font-light tracking-wide">
                  {col.name}
                </h3>
                <p className="text-xs text-stone-200 font-light max-w-md line-clamp-2 leading-relaxed opacity-90">
                  {col.description}
                </p>

                <div className="pt-2">
                  <Link
                    to={`/shop?collection=${encodeURIComponent(col.name)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md group/btn"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
