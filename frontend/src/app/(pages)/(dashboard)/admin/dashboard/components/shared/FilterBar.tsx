'use client';
// components/shared/FilterBar.tsx
import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { FilterState, SubmissionType } from '../../utils/types';
import { getSortOptions } from '../../utils/helpers';

interface FilterBarProps {
  type: SubmissionType;
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

export default function FilterBar({ type, filters, onFilterChange }: FilterBarProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const sortOptions = getSortOptions(type);

  const resetFilters = () => {
    onFilterChange({
      seen: false,
      search: '',
      dateFrom: '',
      dateTo: '',
      sortBy: 'date',
      sortOrder: 'desc',
      page: 1
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Basic Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Seen/Unseen Filter */}
        <select
          value={filters.seen?.toString() ?? ''}
          onChange={(e) => onFilterChange({ 
            seen: e.target.value === '' ? null : e.target.value === 'true',
            page: 1 
          })}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="false">Unseen</option>
          <option value="true">Seen</option>
          <option value="">All</option>
        </select>

        {/* Sort */}
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value })}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              Sort by {option.label}
            </option>
          ))}
        </select>

        {/* Sort Order Toggle */}
        <button
          onClick={() => onFilterChange({ 
            sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
          })}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          {filters.sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
        </button>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          <Filter className="h-4 w-4" />
          Advanced
        </button>

        {/* Reset Filters */}
        {(filters.search || filters.seen !== false || filters.dateFrom || filters.dateTo) && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
          >
            <X className="h-4 w-4" />
            Reset
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">From:</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onFilterChange({ dateFrom: e.target.value, page: 1 })}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">To:</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => onFilterChange({ dateTo: e.target.value, page: 1 })}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}