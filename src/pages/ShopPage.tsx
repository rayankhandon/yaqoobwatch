import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import type { FilterState } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { ProductFilter } from '../components/shop/ProductFilter';
import { SortDropdown } from '../components/shop/SortDropdown';
import { FilterDrawer } from '../components/shop/FilterDrawer';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const location = useLocation();

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    collection: [],
    gender: [],
    priceRange: [0, 15000],
    movement: [],
    caseMaterial: [],
    strapMaterial: [],
    availability: 'all',
    sortBy: 'featured',
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync URL search params with state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const collectionParam = params.get('collection');
    const genderParam = params.get('gender');
    const filterParam = params.get('filter');

    if (collectionParam) {
      setFilters((prev) => ({ ...prev, collection: [collectionParam] }));
    }
    if (genderParam) {
      setFilters((prev) => ({ ...prev, gender: [genderParam] }));
    }
    if (filterParam === 'new') {
      setFilters((prev) => ({ ...prev, sortBy: 'newest' }));
    }
  }, [location.search]);

  const resetFilters = () => {
    setFilters({
      search: '',
      collection: [],
      gender: [],
      priceRange: [0, 15000],
      movement: [],
      caseMaterial: [],
      strapMaterial: [],
      availability: 'all',
      sortBy: 'featured',
    });
  };

  // Filter and Sort calculation
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search term
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q)
      );
    }

    // Collection filter
    if (filters.collection.length > 0) {
      result = result.filter((p) => filters.collection.includes(p.collection));
    }

    // Gender filter
    if (filters.gender.length > 0) {
      result = result.filter((p) => filters.gender.includes(p.gender));
    }

    // Price range
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Movement filter
    if (filters.movement.length > 0) {
      result = result.filter((p) =>
        filters.movement.some((m) => p.movement.toLowerCase().includes(m.toLowerCase()))
      );
    }

    // Case material filter
    if (filters.caseMaterial.length > 0) {
      result = result.filter((p) =>
        filters.caseMaterial.some((mat) => p.caseMaterial.toLowerCase().includes(mat.toLowerCase()))
      );
    }

    // Sorting
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Title */}
        <div className="text-center py-12 border-b border-[#e5e0d8] mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B8924A] font-medium block">
            Genève Timepieces
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#171717] font-light tracking-wide">
            THE WATCH COLLECTION
          </h1>
          <p className="text-xs text-stone-600 font-light max-w-xl mx-auto leading-relaxed">
            Discover our complete range of automatic chronographs, minimalist classics, and limited edition tourbillons.
          </p>
        </div>

        {/* Toolbar: Search input, Mobile Filter toggle, Sort Dropdown */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 border border-[#e5e0d8] shadow-sm">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              placeholder="Search catalog..."
              className="w-full bg-[#FAF9F6] border border-[#e5e0d8] text-[#171717] placeholder-stone-400 text-xs py-2.5 pl-9 pr-4 focus:outline-none focus:border-[#B8924A]"
            />
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#FAF9F6] border border-[#e5e0d8] text-xs uppercase font-medium text-[#171717]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#B8924A]" />
              <span>Filters</span>
            </button>

            {/* Sort Selector */}
            <SortDropdown
              sortBy={filters.sortBy}
              onChange={(sortBy) => setFilters((prev) => ({ ...prev, sortBy }))}
            />
          </div>
        </div>

        {/* Catalog Main Layout (Sidebar + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-1 bg-white p-6 border border-[#e5e0d8] shadow-sm h-fit">
            <ProductFilter
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              resultCount={filteredProducts.length}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white border border-[#e5e0d8] p-8 space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#B8924A]/10 flex items-center justify-center mx-auto text-[#B8924A]">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#171717] font-light">No timepieces found</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  We could not find any watches matching your exact filter combination. Try resetting your criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#B8924A] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#A37F3B] transition-colors mt-2 shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        resultCount={filteredProducts.length}
      />
    </div>
  );
};
