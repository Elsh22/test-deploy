// components/tabs/events/index.tsx
'use client';
import { useState, useEffect } from 'react';
import { EventSuggestion, FilterState, ApiResponse } from '../../../utils/types';
import { api } from '../../../utils/api';
import EventList from './EventsList';
import Pagination from '../../shared/Pagination';
import ExportButton from '../../actions/ExportButton';
import { Calendar, Users, Clock } from 'lucide-react';

interface EventsTabProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

export default function EventsTab({ filters, onFilterChange }: EventsTabProps) {
  const [events, setEvents] = useState<EventSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  // Stats for the overview cards
  const [stats, setStats] = useState({
    upcoming: 0,
    thisMonth: 0,
    pendingReview: 0
  });

  // Load events data
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response: ApiResponse<EventSuggestion[]> = await api.fetchSubmissions('events', filters);
        
        if (response.success && response.data) {
          setEvents(response.data);
          if (response.pagination) {
            setPagination(response.pagination);
          }

          // Calculate stats
          const now = new Date();
          const thisMonth = now.getMonth();
          const thisYear = now.getFullYear();

          setStats({
            upcoming: response.data.filter(event => new Date(event.proposedDate) > now).length,
            thisMonth: response.data.filter(event => {
              const eventDate = new Date(event.proposedDate);
              return eventDate.getMonth() === thisMonth && eventDate.getFullYear() === thisYear;
            }).length,
            pendingReview: response.data.filter(event => !event.seen).length
          });
        }
      } catch (err) {
        console.error('Error loading events:', err);
        setError(err instanceof Error ? err.message : 'Failed to load event suggestions');
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [filters]);

  // Handle marking event as seen
  const handleMarkSeen = async (id: string) => {
    try {
      await api.markAsSeen('events', id);
      const updatedEvents = events.map(event =>
        event._id === id ? { ...event, seen: true } : event
      );
      setEvents(updatedEvents);
      setStats(prev => ({
        ...prev,
        pendingReview: prev.pendingReview - 1
      }));
    } catch (err) {
      console.error('Error marking event as seen:', err);
      setError('Failed to update event status');
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-purple-500 mb-2">
            <Calendar className="h-5 w-5" />
            <h3 className="font-medium">Upcoming Events</h3>
          </div>
          <p className="text-2xl font-bold">{stats.upcoming}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-green-500 mb-2">
            <Clock className="h-5 w-5" />
            <h3 className="font-medium">This Month</h3>
          </div>
          <p className="text-2xl font-bold">{stats.thisMonth}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            <Users className="h-5 w-5" />
            <h3 className="font-medium">Pending Review</h3>
          </div>
          <p className="text-2xl font-bold">{stats.pendingReview}</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {pagination.total} total event suggestions
        </div>
        
        {events.length > 0 && (
          <div className="flex gap-2">
            <ExportButton
              emails={events.map(event => event.contactEmail)}
              filename="event_contacts_export"
            />
          </div>
        )}
      </div>

      {/* Events List */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : events.length > 0 ? (
        <EventList events={events} onMarkSeen={handleMarkSeen} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          No event suggestions found
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