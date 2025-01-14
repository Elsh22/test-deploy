// src/app/(pages)/(dashboard)/admin/dashboard/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StatsOverview from './components/StatsOverview';
import TabNavigation, { MobileTabNavigation } from './components/TabNavigation';
import FilterBar from './components/shared/FilterBar';
import { api } from './utils/api';
import { DashboardStats, FilterState } from './utils/types';

// Tab Components
import ContactsTab from './components/tabs/contacts';
import ChaptersTab from './components/tabs/chapters';
import EventsTab from './components/tabs/events';
import PartnershipsTab from './components/tabs/partnerships';
import NonProfitsTab from './components/tabs/nonprofits';
import NewsletterTab from './components/tabs/newsletter';

export type SubmissionType = 'contacts' | 'chapters' | 'events' | 'partnerships' | 'nonprofits' | 'newsletter';

const DEFAULT_FILTERS: Omit<FilterState, 'type'> = {
  seen: false,
  search: '',
  dateFrom: '',
  dateTo: '',
  sortBy: 'date',
  sortOrder: 'desc',
  page: 1
};

const DEFAULT_STATS: DashboardStats = {
  totalSubmissions: 0,
  recentSubmissions: 0,
  unseenSubmissions: 0,
  submissionsByType: { 
    contacts: 0, 
    chapters: 0, 
    events: 0, 
    partnerships: 0, 
    nonprofits: 0,
    newsletter: 0 
  },
  recentByType: { 
    contacts: 0, 
    chapters: 0, 
    events: 0, 
    partnerships: 0, 
    nonprofits: 0,
    newsletter: 0 
  },
  unseenByType: { 
    contacts: 0, 
    chapters: 0, 
    events: 0, 
    partnerships: 0, 
    nonprofits: 0,
    newsletter: 0 
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialTab = (searchParams.get('tab') as SubmissionType) || 'contacts';
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeTab, setActiveTab] = useState<SubmissionType>(initialTab);
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    type: initialTab
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Authentication check and data loading
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const isAuthed = await api.checkAuth();
        if (!isAuthed) {
          api.handleLogout();
          return;
        }

        setIsAuthenticated(true);
        const response = await api.fetchDashboardStats();
        
        if (response.success && response.data) {
          setStats(response.data);
        } else {
          throw new Error('Failed to load dashboard data');
        }
      } catch (err) {
        if (err instanceof Error && err.message === 'UNAUTHORIZED') {
          api.handleLogout();
          return;
        }
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    initializeDashboard();

    // Refresh stats and check auth every 5 minutes
    const interval = setInterval(async () => {
      const isAuthed = await api.checkAuth();
      if (!isAuthed) {
        api.handleLogout();
        return;
      }
      
      try {
        const response = await api.fetchDashboardStats();
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to refresh stats:', error);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab: SubmissionType) => {
    setActiveTab(tab);
    setFilters({
      ...DEFAULT_FILTERS,
      type: tab
    });
    
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      type: activeTab
    }));
  };

  const renderTabContent = () => {
    const tabProps = {
      filters,
      onFilterChange: handleFilterChange
    };

    switch (activeTab) {
      case 'contacts':
        return <ContactsTab {...tabProps} />;
      case 'chapters':
        return <ChaptersTab {...tabProps} />;
      case 'events':
        return <EventsTab {...tabProps} />;
      case 'partnerships':
        return <PartnershipsTab {...tabProps} />;
      case 'nonprofits':
        return <NonProfitsTab {...tabProps} />;
      case 'newsletter':
        return <NewsletterTab {...tabProps} />;
      default:
        return null;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Error state
  if (error || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 flex items-center gap-2">
          <span className="text-xl">⚠️</span>
          <p>{error || 'Unauthorized access'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={api.handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Stats Overview */}
      {stats && (
        <StatsOverview stats={stats} className="mb-8" />
      )}

      {/* Desktop Tab Navigation */}
      <div className="hidden lg:block mb-6">
        <TabNavigation
          activeTab={activeTab}
          stats={stats || DEFAULT_STATS}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Mobile Tab Navigation */}
      <div className="lg:hidden mb-6">
        <MobileTabNavigation
          activeTab={activeTab}
          stats={stats || DEFAULT_STATS}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Filter Bar - Don't show for newsletter tab */}
      {activeTab !== 'newsletter' && (
        <FilterBar
          type={activeTab}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
}