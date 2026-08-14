import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Compass, ShieldCheck, Cpu } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF9F6] relative overflow-hidden border-t border-[#e5e0d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Imagery Stack */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/5 w-full overflow-hidden border border-[#e5e0d8] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1200&auto=format&fit=crop"
                alt="AURELIS Mechanical Craftsmanship"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Overlaid Floating Mini Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block p-6 bg-white border border-[#B8924A]/40 shadow-xl max-w-xs backdrop-blur-md">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8924A] font-medium block mb-1">
                GENÈVE ARCHIVES
              </span>
              <p className="font-serif text-lg text-[#171717] font-light">
                Over 130 years of horological precision and hand-finishing mastery.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
              The AURELIS Philosophy
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#171717] tracking-wide leading-tight">
              CRAFTED TO <span className="text-gold-gradient italic">OUTLAST TRENDS.</span>
            </h2>

            <div className="w-12 h-[1px] bg-[#B8924A]" />

            <p className="text-sm text-stone-700 font-light leading-relaxed">
              Founded on the belief that a timepiece should transcend fleeting fashions, AURELIS fuses vintage Swiss micro-engineering with avant-garde titanium and ceramic metallurgy.
            </p>

            <p className="text-sm text-stone-600 font-light leading-relaxed">
              Every watch undergoes over 500 hours of rigorous hand-assembly, thermal calibration, and pressure testing in our Genève workshop. From hand-bevelled bridges to double-domed sapphire crystals, no detail is ever compromised.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#e5e0d8]">
              <div className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-[#B8924A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-[#171717]">
                    Precision Engineering
                  </h4>
                  <p className="text-[11px] text-stone-500 font-light mt-0.5">
                    Calibers tuned to COSC chronometer specifications.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#B8924A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-[#171717]">
                    Noble Materials
                  </h4>
                  <p className="text-[11px] text-stone-500 font-light mt-0.5">
                    316L steel, Grade 5 titanium & 18k champagne gold.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#B8924A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-[#171717]">
                    Artisanal Detail
                  </h4>
                  <p className="text-[11px] text-stone-500 font-light mt-0.5">
                    Hand-polished chamfers & guilloché sunray dials.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Compass className="w-5 h-5 text-[#B8924A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase font-semibold tracking-wider text-[#171717]">
                    Timeless Design
                  </h4>
                  <p className="text-[11px] text-stone-500 font-light mt-0.5">
                    Proportions rooted in the golden mathematical ratio.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-md"
              >
                Discover Our Story & Atelier
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
