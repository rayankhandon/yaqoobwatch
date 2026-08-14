import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Sparkles } from 'lucide-react';
import heroVideo from '../../assets/videos/submariner-film.webm';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#FAF9F6]">
      {/* Background Bright Luxury Video & Light Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-100 opacity-90 filter contrast-110 saturate-90"
        >
          <source src={heroVideo} type="video/webm" />
        </video>
        {/* Subtle, dramatically reduced overlay so watch video is vibrant and clearly visible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(15, 15, 15, 0.25) 0%, rgba(15, 15, 15, 0.10) 45%, rgba(15, 15, 15, 0.35) 100%)',
          }}
        />
        {/* Warm bottom gradient fade into section background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/40 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 animate-fade-in">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/30 border border-white/30 text-[11px] uppercase font-medium tracking-[0.25em] text-[#E6CA65] backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#B8924A]" />
          <span>Haute Horlogerie • Genève</span>
        </div>

        {/* Large Editorial Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-[#FAF9F6] tracking-wider leading-none drop-shadow-md">
          TIME, <span className="text-gold-gradient italic font-normal drop-shadow-md">REFINED.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#F5F2EC] font-light leading-relaxed tracking-wide drop-shadow-sm">
          Exceptional timepieces crafted for those who value Swiss precision, character, and timeless design.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-4 bg-[#B8924A] hover:bg-[#A37F3B] text-[#171717] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-black/10 hover:scale-105 flex items-center justify-center gap-3 group"
          >
            <span>Explore Watches</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/collections"
            className="w-full sm:w-auto px-8 py-4 bg-black/25 hover:bg-black/40 text-white text-xs font-medium uppercase tracking-[0.2em] border border-white/40 hover:border-[#B8924A] transition-all duration-300 backdrop-blur-md"
          >
            Discover the Collection
          </Link>
        </div>

        {/* Key Brand Values Row */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-[#FAF9F6] text-xs uppercase tracking-widest bg-black/25 border border-white/20 backdrop-blur-md py-4 px-8 rounded-full max-w-3xl mx-auto drop-shadow-sm">
          <div className="flex items-center justify-center gap-2.5">
            <Shield className="w-4 h-4 text-[#B8924A]" />
            <span>5-Year Swiss Guarantee</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Award className="w-4 h-4 text-[#B8924A]" />
            <span>In-House Calibers</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#B8924A]" />
            <span>Complimentary Insured Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};
