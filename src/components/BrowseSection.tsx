import React, { useState, useMemo } from 'react';
import { Search, X, SlidersHorizontal, PackageSearch, Sparkles } from 'lucide-react';
import { RentalItem, Category } from '../types.ts';
import { ItemCard } from './ItemCard.tsx';

interface BrowseSectionProps {
  items: RentalItem[];
  onViewDetails: (item: RentalItem) => void;
  onRentNow: (item: RentalItem) => void;
  onOpenListForm: () => void;
}

const CATEGORIES: Category[] = [
  'All',
  'Electronics',
  'Tools',
  'Cameras',
  'Accessories',
  'Sports',
  'Home & Kitchen',
];

export const BrowseSection: React.FC<BrowseSectionProps> = ({
  items,
  onViewDetails,
  onRentNow,
  onOpenListForm,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'distance'>('recommended');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-high') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      return b.rating - a.rating;
    });
  }, [items, selectedCategory, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('recommended');
  };

  return (
    <section id="browse" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 bg-slate-900/80 backdrop-blur-xl px-4 py-1.5 rounded-full mb-3.5 border border-blue-500/30 shadow-lg shadow-blue-950/40">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Community Inventory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
            Browse Verified Items Near You
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Find high-quality gear for your next weekend project, shoot, or trip without the retail price tag.
          </p>
        </div>

        {/* Large Search Box */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative flex items-center">
            <div className="absolute left-4.5 pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for? (e.g. DSLR Camera, Drill, Tent, Projector)"
              className="w-full pl-12 pr-12 py-4 text-base sm:text-lg bg-slate-900/70 backdrop-blur-2xl hover:bg-slate-900/80 focus:bg-slate-900/90 text-white placeholder:text-slate-400 rounded-2xl border border-white/15 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none shadow-2xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4.5 py-2 text-sm font-semibold rounded-xl transition-all duration-150 whitespace-nowrap cursor-pointer backdrop-blur-xl ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                    : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Status Bar: Count & Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-white font-bold">{filteredItems.length}</strong> items
              {selectedCategory !== 'All' && <span> in <strong className="text-blue-300 font-semibold">{selectedCategory}</strong></span>}
              {searchQuery && <span> matching &ldquo;<span className="text-cyan-300 font-medium">{searchQuery}</span>&rdquo;</span>}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold text-white bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400"
            >
              <option value="recommended" className="bg-slate-900 text-white">Top Rated (Recommended)</option>
              <option value="price-low" className="bg-slate-900 text-white">Price: Low to High</option>
              <option value="price-high" className="bg-slate-900 text-white">Price: High to Low</option>
              <option value="distance" className="bg-slate-900 text-white">Nearest Distance</option>
            </select>
          </div>
        </div>

        {/* Item Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onViewDetails={onViewDetails}
                onRentNow={onRentNow}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 max-w-md mx-auto bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-dashed border-white/20">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
              <PackageSearch className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No items match your search</h3>
            <p className="mt-1 text-sm text-slate-400">
              Try adjusting your search terms, choosing &ldquo;All&rdquo; categories, or list this item yourself!
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-xs font-semibold text-slate-200 bg-white/10 border border-white/15 rounded-xl hover:bg-white/15 shadow-sm"
              >
                Reset Filters
              </button>
              <button
                onClick={onOpenListForm}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-md shadow-blue-600/30"
              >
                List Item on ShareGrid
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
