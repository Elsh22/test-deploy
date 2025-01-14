"use client";
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory 
}: CategoryFilterProps) => {
  return (
    <div className="flex items-center space-x-4 overflow-x-auto pb-2 w-full md:w-auto">
      <Filter className="w-5 h-5 flex-shrink-0" />
      <div className="flex gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;