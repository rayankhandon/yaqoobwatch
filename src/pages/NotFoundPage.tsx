import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-24 flex items-center justify-center text-center px-4">
      <div className="max-w-md w-full bg-white border border-[#e5e0d8] p-8 sm:p-12 space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-[#B8924A]/10 border border-[#B8924A]/20 flex items-center justify-center text-[#B8924A] mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8924A] font-medium block">
          404 • Page Not Found
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-light">
          LOST IN TIME
        </h1>

        <p className="text-xs text-stone-600 font-light leading-relaxed">
          The requested page or timepiece address could not be located in our archives.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-[#B8924A] hover:bg-[#A37F3B] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
