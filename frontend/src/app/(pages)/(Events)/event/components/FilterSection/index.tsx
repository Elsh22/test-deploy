// components/FilterSection/index.tsx
import { Search, GraduationCap } from 'lucide-react';
import { FilterState } from '../../types/event';

interface FilterSectionProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  title: string;
}

const schools = ['all', 'VCU', 'JMU', 'ODU'];

const FilterSection = ({ filters, setFilters, title }: FilterSectionProps) => (
  <div className="mb-8 p-4 bg-gray-50 rounded-lg">
    <h3 className="text-xl font-bold mb-4">{title} Filters</h3>
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px] relative">
        <input
          type="text"
          placeholder="Search events..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
      <div className="flex flex-wrap gap-2">
        {schools.map((school) => (
          <button
            key={school}
            onClick={() => setFilters({ ...filters, school })}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 ${
              filters.school === school
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            {school.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default FilterSection;