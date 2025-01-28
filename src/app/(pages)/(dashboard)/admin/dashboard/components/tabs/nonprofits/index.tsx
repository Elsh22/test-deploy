// components/tabs/nonprofits/index.tsx
'use client';
import { useState, useEffect } from 'react';
import { DMCNonProfit, FilterState, ApiResponse } from '../../../utils/types';
import { api } from '../../../utils/api';
import NonProfitList from './NonProfitList';
import Pagination from '../../shared/Pagination';
import ExportButton from '../../actions/ExportButton';
import { Users, GraduationCap, Clock, Briefcase } from 'lucide-react';

interface NonProfitsTabProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

export default function NonProfitsTab({ filters, onFilterChange }: NonProfitsTabProps) {
  const [nonprofits, setNonprofits] = useState<DMCNonProfit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  // Stats for the overview cards
  const [stats, setStats] = useState({
    total: 0,
    pendingReview: 0,
    experiencedApplicants: 0,
    availableFullTime: 0,
  });

  // Load nonprofits data
  useEffect(() => {
    const loadNonprofits = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response: ApiResponse<DMCNonProfit[]> = await api.fetchSubmissions('nonprofits', filters);
        
        if (response.success && response.data) {
          setNonprofits(response.data);
          if (response.pagination) {
            setPagination(response.pagination);
          }

          setStats({
            total: response.pagination?.total || 0,
            pendingReview: response.data.filter(app => !app.seen).length,
            experiencedApplicants: response.data.filter(app => app.yearsOfExperience > 5).length,
            availableFullTime: response.data.filter(app => app.availabilityPerWeek === '10+').length,
          });
        }
      } catch (err) {
        console.error('Error loading nonprofits:', err);
        setError(err instanceof Error ? err.message : 'Failed to load non-profit applications');
      } finally {
        setIsLoading(false);
      }
    };

    loadNonprofits();
  }, [filters]);

  // Handle marking application as seen
  const handleMarkSeen = async (id: string) => {
    try {
      await api.markAsSeen('nonprofits', id);
      const updatedNonprofits = nonprofits.map(nonprofit =>
        nonprofit._id === id ? { ...nonprofit, seen: true } : nonprofit
      );
      setNonprofits(updatedNonprofits);
      setStats(prev => ({
        ...prev,
        pendingReview: prev.pendingReview - 1
      }));
    } catch (err) {
      console.error('Error marking nonprofit as seen:', err);
      setError('Failed to update application status');
    }
  };

  // Handle resume download
  const handleDownloadResume = async (fileId: string, name: string) => {
    try {
      const blob = await api.downloadResume(fileId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name}_resume.pdf`; // or use the original file extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading resume:', err);
      setError('Failed to download resume');
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
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <Users className="h-5 w-5" />
            <h3 className="font-medium">Total Applications</h3>
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            <Clock className="h-5 w-5" />
            <h3 className="font-medium">Pending Review</h3>
          </div>
          <p className="text-2xl font-bold">{stats.pendingReview}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-purple-500 mb-2">
            <Briefcase className="h-5 w-5" />
            <h3 className="font-medium">Experienced (5y+)</h3>
          </div>
          <p className="text-2xl font-bold">{stats.experiencedApplicants}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-green-500 mb-2">
            <GraduationCap className="h-5 w-5" />
            <h3 className="font-medium">Full Availability</h3>
          </div>
          <p className="text-2xl font-bold">{stats.availableFullTime}</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {pagination.total} total applications
        </div>
        
        {nonprofits.length > 0 && (
          <div className="flex gap-2">
            <ExportButton
              emails={nonprofits.map(app => app.email)}
              filename="nonprofit_applicants_export"
            />
          </div>
        )}
      </div>

      {/* Applications List */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : nonprofits.length > 0 ? (
        <NonProfitList 
          nonprofits={nonprofits} 
          onMarkSeen={handleMarkSeen} 
          onDownloadResume={handleDownloadResume}
        />
      ) : (
        <div className="text-center py-8 text-gray-500">
          No applications found
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