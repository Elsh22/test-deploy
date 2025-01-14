"use client";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12 space-x-2">
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === i + 1
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {i + 1}
        </button>
      ))}
      
      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;