import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'men' | 'women' | 'automatic'>('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'men') return p.gender === 'Men' || p.gender === 'Unisex';
    if (activeTab === 'women') return p.gender === 'Women' || p.gender === 'Unisex';
    if (activeTab === 'automatic') return p.collection === 'Automatic' || p.movement.includes('Automatic');
    return true;
  }).slice(0, 8);

  return (
    <section className="py-24 bg-[#F2EFE8] relative border-t border-[#e5e0d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
              Most Coveted Timepieces
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#171717] tracking-wide">
              BEST SELLERS
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1 border border-[#e5e0d8] p-1 bg-white shadow-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs uppercase font-medium tracking-wider transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#B8924A] text-white font-semibold'
                  : 'text-stone-600 hover:text-[#171717]'
              }`}
            >
              All Models
            </button>
            <button
              onClick={() => setActiveTab('men')}
              className={`px-4 py-2 text-xs uppercase font-medium tracking-wider transition-colors ${
                activeTab === 'men'
                  ? 'bg-[#B8924A] text-white font-semibold'
                  : 'text-stone-600 hover:text-[#171717]'
              }`}
            >
              Men's
            </button>
            <button
              onClick={() => setActiveTab('women')}
              className={`px-4 py-2 text-xs uppercase font-medium tracking-wider transition-colors ${
                activeTab === 'women'
                  ? 'bg-[#B8924A] text-white font-semibold'
                  : 'text-stone-600 hover:text-[#171717]'
              }`}
            >
              Women's
            </button>
            <button
              onClick={() => setActiveTab('automatic')}
              className={`px-4 py-2 text-xs uppercase font-medium tracking-wider transition-colors ${
                activeTab === 'automatic'
                  ? 'bg-[#B8924A] text-white font-semibold'
                  : 'text-stone-600 hover:text-[#171717]'
              }`}
            >
              Automatic
            </button>
          </div>
        </div>

        {/* Product Grid (8 products) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Shop CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-[#B8924A] text-[#171717] hover:text-white text-xs font-semibold uppercase tracking-[0.2em] border border-[#B8924A] transition-all duration-300 shadow-sm group"
          >
            <span>Explore Full Catalog ({PRODUCTS.length} Watches)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
