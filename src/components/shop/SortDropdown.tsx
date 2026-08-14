import React from 'react';
import type { FilterState } from '../../types';
import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  sortBy: FilterState['sortBy'];
  onChange: (sort: FilterState['sortBy']) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, onChange }) => {
  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-stone-500">Sort By:</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onChange(e.target.value as FilterState['sortBy'])}
            className="appearance-none bg-[#FAF9F6] border border-[#e5e0d8] hover:border-[#B8924A]/40 text-[#171717] text-xs uppercase font-medium tracking-wider py-2 pl-4 pr-9 cursor-pointer focus:outline-none focus:border-[#B8924A] shadow-sm"
          >
            <option value="featured">Featured Selection</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
          <ChevronDown className="w-4 h-4 text-[#B8924A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
