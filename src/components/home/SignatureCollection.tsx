import React from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const SignatureCollection: React.FC = () => {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-24 bg-[#FAF9F6] relative border-t border-[#e5e0d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
              Curated Masterpieces
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#171717] tracking-wide">
              THE SIGNATURE COLLECTION
            </h2>
            <p className="text-sm text-stone-600 font-light max-w-xl">
              Distinctive timepieces designed to become part of your story.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#B8924A] hover:text-[#171717] transition-colors group self-start md:self-auto"
          >
            <span>View All Signature Models</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
