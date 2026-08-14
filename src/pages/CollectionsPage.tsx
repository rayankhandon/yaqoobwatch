import React from 'react';
import { COLLECTIONS_DATA } from '../data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-24 text-[#171717] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center py-12 border-b border-[#e5e0d8] mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-semibold block">
            The Horology Vault
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#171717] font-light tracking-wide">
            COLLECTION DISCOVERY
          </h1>
          <p className="text-xs text-stone-600 font-light max-w-xl mx-auto leading-relaxed">
            Each collection embodies a distinct horological discipline—from high-complication chronographs to timeless dress watches.
          </p>
        </div>

        {/* Collections Stack */}
        <div className="space-y-16">
          {COLLECTIONS_DATA.map((col, index) => (
            <div
              key={col.id}
              className={`bg-white border border-[#e5e0d8] shadow-sm hover:shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Box */}
              <div
                className={`lg:col-span-7 aspect-16/9 lg:aspect-4/3 w-full bg-[#F5F2EC] overflow-hidden relative group ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-[#B8924A] border border-[#e5e0d8] font-medium shadow-sm">
                  {col.count} Master Models
                </div>
              </div>

              {/* Text Information */}
              <div
                className={`lg:col-span-5 p-8 sm:p-12 space-y-4 ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
                  AURELIS {col.name}
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light">
                  {col.tagline}
                </h2>

                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-4">
                  <Link
                    to={`/shop?collection=${encodeURIComponent(col.name)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-widest transition-all group shadow-sm"
                  >
                    <span>View {col.name} Timepieces</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
