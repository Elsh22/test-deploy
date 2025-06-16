"use client";
import { Search, Filter } from 'lucide-react';

interface SearchAndFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchAndFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}: SearchAndFilterProps) => {
  return (
    <section className="py-12 px-4 bg-dmc-pearl">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dmc-slate-gray w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-dmc-silver rounded-dmc focus:outline-none focus:ring-2 focus:ring-dmc-gold focus:border-dmc-gold transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center space-x-4 overflow-x-auto pb-2 w-full md:w-auto">
            <Filter className="w-5 h-5 flex-shrink-0 text-dmc-warm-brown" />
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-dmc-gold text-dmc-black shadow-dmc-gold'
                      : 'bg-dmc-white text-dmc-slate-gray hover:bg-dmc-light-gold border border-dmc-silver'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchAndFilter;