import React from 'react';
import { MOCK_REVIEWS } from '../../data/products';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#F2EFE8] relative border-t border-[#e5e0d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Rating Summary */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
            Collector Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#171717] tracking-wide">
            PATRON TESTIMONIALS
          </h2>

          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="flex text-[#B8924A]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#B8924A]" />
              ))}
            </div>
            <span className="text-sm font-semibold text-[#171717]">4.94 / 5.0 Rating</span>
            <span className="text-xs text-stone-500">Based on 340+ verified patrons</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-8 bg-white border border-[#e5e0d8] hover:border-[#B8924A]/40 shadow-sm hover:shadow-md transition-all duration-300 relative space-y-4 flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-stone-200 pointer-events-none" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#B8924A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B8924A]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <h4 className="font-serif text-lg text-[#171717] font-normal">{rev.title}</h4>
                <p className="text-xs text-stone-700 font-light leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#e5e0d8] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#171717] block">{rev.author}</span>
                  {rev.productName && (
                    <span className="text-[10px] text-[#B8924A] uppercase tracking-wider block mt-0.5">
                      Owner of {rev.productName}
                    </span>
                  )}
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified Purchase</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
