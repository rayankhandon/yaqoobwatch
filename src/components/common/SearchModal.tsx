import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { Link } from 'react-router-dom';
import { Search, X, TrendingUp, ChevronRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(['Heritage', 'Chronograph X', 'Automatic']);

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularTags = ['Chronograph', 'Automatic', 'Gold', 'Titanium', 'Limited', 'Sport'];

  const searchResults = searchTerm.trim()
    ? PRODUCTS.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.collection.toLowerCase().includes(query) ||
          p.movement.toLowerCase().includes(query) ||
          p.materials.toLowerCase().includes(query)
        );
      })
    : [];

  const handleSelectSearch = (term: string) => {
    setSearchTerm(term);
    if (!recentSearches.includes(term)) {
      setRecentSearches((prev) => [term, ...prev.slice(0, 4)]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] border border-[#B8924A]/30 shadow-2xl z-10 animate-fade-in">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#e5e0d8] px-6 py-4 bg-white">
          <Search className="w-5 h-5 text-[#B8924A] mr-4 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search AURELIS watches, collections, movements..."
            className="w-full bg-transparent text-[#171717] font-sans text-base placeholder-stone-400 focus:outline-none"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-stone-400 hover:text-[#171717] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-2 text-stone-400 hover:text-[#171717] transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Default State: Popular & Recent */}
          {!searchTerm.trim() && (
            <div className="space-y-6">
              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B8924A] font-medium mb-3">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Popular Collections</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSelectSearch(tag)}
                      className="px-3.5 py-1.5 bg-white border border-[#e5e0d8] hover:border-[#B8924A]/50 text-xs text-stone-700 hover:text-[#B8924A] transition-colors shadow-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-3">
                    Recent Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSelectSearch(term)}
                        className="px-3 py-1 bg-stone-200/60 text-xs text-stone-600 hover:text-[#171717] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Search Results State */}
          {searchTerm.trim() && (
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-[#e5e0d8] mb-4">
                <span>
                  Found <strong className="text-[#171717]">{searchResults.length}</strong> timepieces for "
                  {searchTerm}"
                </span>
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <p className="text-sm text-stone-600">No timepieces matching "{searchTerm}"</p>
                  <p className="text-xs text-stone-400">
                    Try searching for "Chronograph", "Automatic", "Heritage", or "Titanium".
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 p-3 bg-white hover:bg-[#FAF9F6] border border-[#e5e0d8] hover:border-[#B8924A]/40 transition-all shadow-sm group"
                    >
                      <div className="w-14 h-14 bg-[#F5F2EC] shrink-0 overflow-hidden border border-[#e5e0d8]">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-[#B8924A]">
                          {product.collection}
                        </div>
                        <div className="font-serif text-sm text-[#171717] truncate font-normal">
                          {product.name}
                        </div>
                        <div className="text-xs text-stone-400">
                          {product.caseSize} • {product.movement.split(' ')[0]}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-semibold text-[#171717]">
                          ${product.price.toLocaleString()}
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#B8924A] ml-auto mt-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
