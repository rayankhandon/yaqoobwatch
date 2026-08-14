import React from 'react';
import type { FilterState } from '../../types';
import { ProductFilter } from './ProductFilter';
import { X, SlidersHorizontal } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  resultCount: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  resetFilters,
  resultCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF9F6] border-r border-[#e5e0d8] p-6 flex flex-col justify-between shadow-2xl animate-slide-right overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#e5e0d8] mb-6">
            <div className="flex items-center gap-2 text-[#171717]">
              <SlidersHorizontal className="w-4 h-4 text-[#B8924A]" />
              <span className="font-serif text-lg tracking-wide">Filter Watches</span>
            </div>
            <button onClick={onClose} className="p-2 text-stone-400 hover:text-[#171717]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <ProductFilter
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            resultCount={resultCount}
          />
        </div>

        <div className="pt-6 border-t border-[#e5e0d8] mt-8">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#B8924A] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#A37F3B] transition-colors shadow-sm"
          >
            Apply Filters ({resultCount} Items)
          </button>
        </div>
      </div>
    </div>
  );
};
