import React from 'react';
import type { FilterState } from '../../types';
import { RotateCcw, Check } from 'lucide-react';

interface ProductFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  resultCount: number;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  setFilters,
  resetFilters,
  resultCount,
}) => {
  const collections = ['Chronograph', 'Automatic', 'Classic', 'Sport', 'Heritage', 'Limited'];
  const genders = ['Men', 'Women', 'Unisex'];
  const movements = ['Swiss Hand-Wound', 'Automatic Chronograph', 'In-House Automatic', 'Precision Quartz'];
  const caseMaterials = ['316L Stainless Steel', 'Grade 5 Titanium', '18k Champagne Gold', 'Black DLC Steel'];

  const toggleArrayFilter = (field: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const current = (prev[field] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  return (
    <div className="space-y-8 text-xs font-sans">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e5e0d8]">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717]">
          Refine Selection ({resultCount})
        </span>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-[11px] text-stone-500 hover:text-[#B8924A] transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Collection Filter */}
      <div className="space-y-3">
        <h4 className="text-[11px] uppercase tracking-widest font-semibold text-[#B8924A]">Collection</h4>
        <div className="space-y-2">
          {collections.map((col) => {
            const checked = filters.collection.includes(col);
            return (
              <label
                key={col}
                className="flex items-center gap-3 cursor-pointer group text-stone-700 hover:text-[#171717]"
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                    checked ? 'bg-[#B8924A] border-[#B8924A] text-white' : 'border-[#d8d3c9] group-hover:border-stone-400'
                  }`}
                  onClick={() => toggleArrayFilter('collection', col)}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span onClick={() => toggleArrayFilter('collection', col)}>{col}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="space-y-3 pt-4 border-t border-[#e5e0d8]">
        <h4 className="text-[11px] uppercase tracking-widest font-semibold text-[#B8924A]">Gender / Fit</h4>
        <div className="space-y-2">
          {genders.map((g) => {
            const checked = filters.gender.includes(g);
            return (
              <label
                key={g}
                className="flex items-center gap-3 cursor-pointer group text-stone-700 hover:text-[#171717]"
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                    checked ? 'bg-[#B8924A] border-[#B8924A] text-white' : 'border-[#d8d3c9] group-hover:border-stone-400'
                  }`}
                  onClick={() => toggleArrayFilter('gender', g)}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span onClick={() => toggleArrayFilter('gender', g)}>{g}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-4 border-t border-[#e5e0d8]">
        <div className="flex justify-between items-center">
          <h4 className="text-[11px] uppercase tracking-widest font-semibold text-[#B8924A]">Max Price</h4>
          <span className="text-[#171717] font-semibold">${filters.priceRange[1].toLocaleString()}</span>
        </div>
        <input
          type="range"
          min={1000}
          max={15000}
          step={500}
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], Number(e.target.value)],
            }))
          }
          className="w-full accent-[#B8924A] bg-[#e5e0d8] h-1.5 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400">
          <span>$1,000</span>
          <span>$15,000</span>
        </div>
      </div>

      {/* Movement Filter */}
      <div className="space-y-3 pt-4 border-t border-[#e5e0d8]">
        <h4 className="text-[11px] uppercase tracking-widest font-semibold text-[#B8924A]">Caliber / Movement</h4>
        <div className="space-y-2">
          {movements.map((mov) => {
            const checked = filters.movement.includes(mov);
            return (
              <label
                key={mov}
                className="flex items-center gap-3 cursor-pointer group text-stone-700 hover:text-[#171717]"
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                    checked ? 'bg-[#B8924A] border-[#B8924A] text-white' : 'border-[#d8d3c9] group-hover:border-stone-400'
                  }`}
                  onClick={() => toggleArrayFilter('movement', mov)}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span onClick={() => toggleArrayFilter('movement', mov)}>{mov}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Case Material */}
      <div className="space-y-3 pt-4 border-t border-[#e5e0d8]">
        <h4 className="text-[11px] uppercase tracking-widest font-semibold text-[#B8924A]">Case Material</h4>
        <div className="space-y-2">
          {caseMaterials.map((mat) => {
            const checked = filters.caseMaterial.includes(mat);
            return (
              <label
                key={mat}
                className="flex items-center gap-3 cursor-pointer group text-stone-700 hover:text-[#171717]"
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                    checked ? 'bg-[#B8924A] border-[#B8924A] text-white' : 'border-[#d8d3c9] group-hover:border-stone-400'
                  }`}
                  onClick={() => toggleArrayFilter('caseMaterial', mat)}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span onClick={() => toggleArrayFilter('caseMaterial', mat)}>{mat}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
