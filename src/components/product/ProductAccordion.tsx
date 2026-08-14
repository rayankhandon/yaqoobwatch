import React, { useState } from 'react';
import type { Product } from '../../types';
import { ChevronDown, Truck, RotateCcw } from 'lucide-react';

interface ProductAccordionProps {
  product: Product;
}

export const ProductAccordion: React.FC<ProductAccordionProps> = ({ product }) => {
  const [openSection, setOpenSection] = useState<string | null>('specs');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="space-y-4 pt-8 border-t border-[#e5e0d8] text-xs">
      {/* Specifications Accordion */}
      <div className="border border-[#e5e0d8] bg-white shadow-sm">
        <button
          onClick={() => toggleSection('specs')}
          className="w-full p-4 flex items-center justify-between font-serif text-base text-[#171717] text-left font-light hover:text-[#B8924A] transition-colors"
        >
          <span>Watch Specifications & Movement</span>
          <ChevronDown
            className={`w-4 h-4 text-[#B8924A] transition-transform duration-300 ${
              openSection === 'specs' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSection === 'specs' && (
          <div className="p-4 pt-0 border-t border-[#e5e0d8] space-y-3 text-stone-700 animate-fade-in">
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Movement Caliber</span>
                <span className="font-medium text-[#171717]">{product.movement}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Case Diameter</span>
                <span className="font-medium text-[#171717]">{product.caseSize}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Case Material</span>
                <span className="font-medium text-[#171717]">{product.caseMaterial}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Strap / Bracelet</span>
                <span className="font-medium text-[#171717]">{product.strapMaterial}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Water Resistance</span>
                <span className="font-medium text-[#171717]">{product.waterResistance}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Glass Crystal</span>
                <span className="font-medium text-[#171717]">Anti-Reflective Sapphire</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Materials & Craftsmanship */}
      <div className="border border-[#e5e0d8] bg-white shadow-sm">
        <button
          onClick={() => toggleSection('materials')}
          className="w-full p-4 flex items-center justify-between font-serif text-base text-[#171717] text-left font-light hover:text-[#B8924A] transition-colors"
        >
          <span>Materials & Swiss Craftsmanship</span>
          <ChevronDown
            className={`w-4 h-4 text-[#B8924A] transition-transform duration-300 ${
              openSection === 'materials' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSection === 'materials' && (
          <div className="p-4 pt-0 border-t border-[#e5e0d8] space-y-2 text-stone-700 animate-fade-in font-light leading-relaxed">
            <p>
              {product.materials}. Every component undergoes micro-polishing, satin finishing, and stringent pressure testing in our Genève workshop to guarantee longevity and scratch resistance.
            </p>
          </div>
        )}
      </div>

      {/* Guarantee & Warranty */}
      <div className="border border-[#e5e0d8] bg-white shadow-sm">
        <button
          onClick={() => toggleSection('warranty')}
          className="w-full p-4 flex items-center justify-between font-serif text-base text-[#171717] text-left font-light hover:text-[#B8924A] transition-colors"
        >
          <span>5-Year Global Guarantee</span>
          <ChevronDown
            className={`w-4 h-4 text-[#B8924A] transition-transform duration-300 ${
              openSection === 'warranty' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSection === 'warranty' && (
          <div className="p-4 pt-0 border-t border-[#e5e0d8] space-y-2 text-stone-700 animate-fade-in font-light leading-relaxed">
            <p>
              Your timepiece is covered under the comprehensive {product.warranty}. Includes coverage for movement precision, water resistance seals, and structural integrity. Serviceable at any authorized AURELIS boutique worldwide.
            </p>
          </div>
        )}
      </div>

      {/* Shipping & Returns */}
      <div className="border border-[#e5e0d8] bg-white shadow-sm">
        <button
          onClick={() => toggleSection('shipping')}
          className="w-full p-4 flex items-center justify-between font-serif text-base text-[#171717] text-left font-light hover:text-[#B8924A] transition-colors"
        >
          <span>Complimentary Delivery & Returns</span>
          <ChevronDown
            className={`w-4 h-4 text-[#B8924A] transition-transform duration-300 ${
              openSection === 'shipping' ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSection === 'shipping' && (
          <div className="p-4 pt-0 border-t border-[#e5e0d8] space-y-3 text-stone-700 animate-fade-in font-light leading-relaxed">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#B8924A] shrink-0 mt-0.5" />
              <span>Complimentary insured courier delivery worldwide (2–4 business days with signature requirement).</span>
            </div>
            <div className="flex items-start gap-2.5">
              <RotateCcw className="w-4 h-4 text-[#B8924A] shrink-0 mt-0.5" />
              <span>30-day trial period. Free returns with prepaid pickup label in original wooden vault box.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
