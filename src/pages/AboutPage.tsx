import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Cpu, Leaf } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-24 text-[#171717] font-sans">
      {/* Editorial Hero Header */}
      <section className="relative py-20 bg-white border-b border-[#e5e0d8] overflow-hidden text-center shadow-sm">
        <div className="max-w-4xl mx-auto px-4 space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#B8924A] font-semibold block">
            Genève • Depuis 1888
          </span>

          <h1 className="font-serif text-4xl sm:text-7xl text-[#171717] font-light tracking-wide leading-tight">
            THE HOUSE OF <span className="text-gold-gradient italic">AURELIS</span>
          </h1>

          <div className="w-16 h-[1px] bg-[#B8924A] mx-auto my-4" />

          <p className="text-base sm:text-lg text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            Crafting enduring mechanical icons at the intersection of Swiss tradition, architectural minimalism, and advanced metallurgy.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {/* Section 1: Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
              1. Our Genesis & Story
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#171717] font-light leading-tight">
              ROOTED IN HOROLOGICAL INTEGRITY.
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed">
              Founded in 1888 along the shores of Lake Geneva, AURELIS began as a secret guild of master horologists dedicated to micro-precision timing instruments for maritime navigation.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Over a century later, our independent manufacture remains unyielding in its commitment. We refuse mass production, maintaining an intentionally restricted annual output to ensure every timepiece receives hundreds of hours of personal hand-finishing.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-4/3 w-full bg-[#F5F2EC] border border-[#e5e0d8] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop"
                alt="AURELIS Workshop"
                className="w-full h-full object-cover filter contrast-105"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Craftsmanship & Materials */}
        <div id="craftsmanship" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:flex-row-reverse">
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
              2. Swiss Craftsmanship & Materials
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#171717] font-light leading-tight">
              METALLURGY & SKELETONIZED CALIBERS.
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed">
              We machine our cases from aerospace Grade 5 Titanium, 316L surgical stainless steel, and solid 18k gold alloys. Sapphire crystals are cut using diamond tools and treated with double-sided anti-reflective coatings.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#e5e0d8] text-xs">
              <div>
                <h4 className="font-semibold text-[#171717] uppercase tracking-wider mb-1">COSC Certification</h4>
                <p className="text-stone-500 font-light">Tested across 5 positions and 3 temperatures over 15 consecutive days.</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#171717] uppercase tracking-wider mb-1">Hand-Anglage Finish</h4>
                <p className="text-stone-500 font-light">Beveled edge chamfering executed under binocular microscopes.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <div className="aspect-4/3 w-full bg-[#F5F2EC] border border-[#e5e0d8] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1517463944645-a773bc2a1387?q=80&w=1200&auto=format&fit=crop"
                alt="Swiss Mechanical Precision"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Brand Values Grid */}
        <div className="bg-white border border-[#e5e0d8] p-8 sm:p-16 space-y-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-semibold block">
              Our Core Creed
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light">THE AURELIS PILLARS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 p-6 bg-[#FAF9F6] border border-[#e5e0d8]">
              <Cpu className="w-8 h-8 text-[#B8924A] mx-auto" />
              <h3 className="font-serif text-xl text-[#171717]">MICRO-PRECISION</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Tolerances measured in fractions of a micron for friction-free energy transmission.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#FAF9F6] border border-[#e5e0d8]">
              <Compass className="w-8 h-8 text-[#B8924A] mx-auto" />
              <h3 className="font-serif text-xl text-[#171717]">ARCHITECTURAL FORM</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Clean geometric lines and uncluttered dials that emphasize pure proportion.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#FAF9F6] border border-[#e5e0d8]">
              <Leaf className="w-8 h-8 text-[#B8924A] mx-auto" />
              <h3 className="font-serif text-xl text-[#171717]">ETHICAL HOROLOGY</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                100% recycled metals, conflict-free gold sourcing, and zero single-use plastics.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center space-y-6 pt-12">
          <h2 className="font-serif text-3xl sm:text-5xl text-[#171717] font-light">
            EXPERIENCE AURELIS FIRSTHAND
          </h2>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Book a private appointment at one of our international salons or browse our complete vault online.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md"
          >
            Explore Watches Catalog
          </Link>
        </div>
      </div>
    </div>
  );
};
