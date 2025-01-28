// components/ShowMoreButton/index.tsx
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FilterState } from '../../types/event';

interface ShowMoreButtonProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  totalCount: number;
  shownCount: number;
}

const ShowMoreButton = ({ 
  filters, 
  setFilters, 
  totalCount, 
  shownCount 
}: ShowMoreButtonProps) => {
  if (shownCount >= totalCount) return null;
  
  return (
    <button
      onClick={() => setFilters({ ...filters, showMore: !filters.showMore })}
      className="w-full mt-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
    >
      {filters.showMore ? (
        <>Show Less <ChevronUp className="w-4 h-4" /></>
      ) : (
        <>Show More ({totalCount - shownCount} more) <ChevronDown className="w-4 h-4" /></>
      )}
    </button>
  );
};

export default ShowMoreButton;