// components/tabs/chapters/index.tsx
'use client';
import { useState, useEffect } from 'react';
import { ChapterApplication, FilterState, ApiResponse } from '../../../utils/types';
import { api } from '../../../utils/api';
import ChapterList from './ChapterList';
import Pagination from '../../shared/Pagination';
import ExportButton from '../../actions/ExportButton';
import { Building } from 'lucide-react';

interface ChaptersTabProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

export default function ChaptersTab({ filters, onFilterChange }: ChaptersTabProps) {
  const [chapters, setChapters] = useState<ChapterApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  // Load chapters data
  useEffect(() => {
    const loadChapters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response: ApiResponse<ChapterApplication[]> = await api.fetchSubmissions('chapters', filters);
        
        if (response.success && response.data) {
          setChapters(response.data);
          if (response.pagination) {
            setPagination(response.pagination);
          }
        }
      } catch (err) {
        console.error('Error loading chapters:', err);
        setError(err instanceof Error ? err.message : 'Failed to load chapter applications');
      } finally {
        setIsLoading(false);
      }
    };

    loadChapters();
  }, [filters]);

  // Handle marking chapter as seen
  const handleMarkSeen = async (id: string) => {
    try {
      await api.markAsSeen('chapters', id);
      const updatedChapters = chapters.map(chapter =>
        chapter._id === id ? { ...chapter, seen: true } : chapter
      );
      setChapters(updatedChapters);
    } catch (err) {
      console.error('Error marking chapter as seen:', err);
      setError('Failed to update chapter status');
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <Building className="h-5 w-5" />
            <h3 className="font-medium">Total Applications</h3>
          </div>
          <p className="text-2xl font-bold">{pagination.total}</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {pagination.total} total applications
        </div>
        
        {chapters.length > 0 && (
          <ExportButton
            emails={chapters.map(chapter => chapter.primaryContact)}
            filename="chapter_contacts_export"
          />
        )}
      </div>

      {/* Chapters List */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : chapters.length > 0 ? (
        <ChapterList chapters={chapters} onMarkSeen={handleMarkSeen} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          No chapter applications found
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={(page) => onFilterChange({ page })}
      />
    </div>
  );
}