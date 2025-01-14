// components/tabs/partnerships/index.tsx
'use client';
import { useState, useEffect } from 'react';
import { Partnership, FilterState, ApiResponse } from '../../../utils/types';
import { api } from '../../../utils/api';
import PartnershipList from './PartnershipList';
import Pagination from '../../shared/Pagination';
import ExportButton from '../../actions/ExportButton';
import { Handshake, Building2, PieChart, Users } from 'lucide-react';

interface PartnershipsTabProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

export default function PartnershipsTab({ filters, onFilterChange }: PartnershipsTabProps) {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  // Stats for the overview cards
  const [stats, setStats] = useState({
    total: 0,
    community: 0,
    financial: 0,
    pendingReview: 0
  });

  // Load partnerships data
  useEffect(() => {
    const loadPartnerships = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response: ApiResponse<Partnership[]> = await api.fetchSubmissions('partnerships', filters);
        
        if (response.success && response.data) {
          setPartnerships(response.data);
          if (response.pagination) {
            setPagination(response.pagination);
          }

          // Calculate partnership stats
          setStats({
            total: response.pagination?.total || 0,
            community: response.data.filter(p => p.partnershipInterest === 'community').length,
            financial: response.data.filter(p => p.partnershipInterest === 'financial').length,
            pendingReview: response.data.filter(p => !p.seen).length
          });
        }
      } catch (err) {
        console.error('Error loading partnerships:', err);
        setError(err instanceof Error ? err.message : 'Failed to load partnership requests');
      } finally {
        setIsLoading(false);
      }
    };

    loadPartnerships();
  }, [filters]);

  // Handle marking partnership as seen
  const handleMarkSeen = async (id: string) => {
    try {
      await api.markAsSeen('partnerships', id);
      const updatedPartnerships = partnerships.map(partnership =>
        partnership._id === id ? { ...partnership, seen: true } : partnership
      );
      setPartnerships(updatedPartnerships);
      setStats(prev => ({
        ...prev,
        pendingReview: prev.pendingReview - 1
      }));
    } catch (err) {
      console.error('Error marking partnership as seen:', err);
      setError('Failed to update partnership status');
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
            <Building2 className="h-5 w-5" />
            <h3 className="font-medium">Total Partners</h3>
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-purple-500 mb-2">
            <Users className="h-5 w-5" />
            <h3 className="font-medium">Community</h3>
          </div>
          <p className="text-2xl font-bold">{stats.community}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-green-500 mb-2">
            <PieChart className="h-5 w-5" />
            <h3 className="font-medium">Financial</h3>
          </div>
          <p className="text-2xl font-bold">{stats.financial}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            <Handshake className="h-5 w-5" />
            <h3 className="font-medium">Pending Review</h3>
          </div>
          <p className="text-2xl font-bold">{stats.pendingReview}</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {pagination.total} total partnership requests
        </div>
        
        {partnerships.length > 0 && (
          <div className="flex gap-2">
            <ExportButton
              emails={partnerships.map(p => p.email)}
              filename="partnership_contacts_export"
            />
          </div>
        )}
      </div>

      {/* Partnerships List */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : partnerships.length > 0 ? (
        <PartnershipList partnerships={partnerships} onMarkSeen={handleMarkSeen} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          No partnership requests found
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