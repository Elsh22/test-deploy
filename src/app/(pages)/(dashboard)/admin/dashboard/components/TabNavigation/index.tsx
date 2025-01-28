import { useMemo } from 'react';
import { Mail, Building, Calendar, UsersRound, Handshake } from 'lucide-react';
import { SubmissionType, DashboardStats } from '../../utils/types';

interface TabNavigationProps {
  activeTab: SubmissionType;
  stats: DashboardStats;
  onTabChange: (tab: SubmissionType) => void;
}

export default function TabNavigation({ 
  activeTab, 
  stats, 
  onTabChange 
}: TabNavigationProps) {
  const tabs = useMemo(() => [
    {
      id: 'contacts' as SubmissionType,
      label: 'Contacts',
      icon: Mail,
      unseenCount: stats.unseenByType.contacts,
      totalCount: stats.submissionsByType.contacts,
      color: 'blue'
    },
    {
      id: 'chapters' as SubmissionType,
      label: 'Chapters',
      icon: Building,
      unseenCount: stats.unseenByType.chapters,
      totalCount: stats.submissionsByType.chapters,
      color: 'purple'
    },
    {
      id: 'events' as SubmissionType,
      label: 'Events',
      icon: Calendar,
      unseenCount: stats.unseenByType.events,
      totalCount: stats.submissionsByType.events,
      color: 'green'
    },
    {
      id: 'partnerships' as SubmissionType,
      label: 'Partnerships',
      icon: Handshake,
      unseenCount: stats.unseenByType.partnerships,
      totalCount: stats.submissionsByType.partnerships,
      color: 'orange'
    },
    {
      id: 'nonprofits' as SubmissionType,
      label: 'Non-Profits',
      icon: UsersRound,
      unseenCount: stats.unseenByType.nonprofits,
      totalCount: stats.submissionsByType.nonprofits,
      color: 'pink'
    },
    {
      id: 'newsletter' as SubmissionType,
      label: 'Newsletter',
      icon: Mail, // Using Mail icon for newsletter
      unseenCount: stats.unseenByType.newsletter || 0,
      totalCount: stats.submissionsByType.newsletter || 0,
      color: 'indigo'
    }
  ], [stats]);

  // Get color classes based on tab
  const getColorClasses = (tabId: SubmissionType, isActive: boolean) => {
    const colorMap = {
      contacts: {
        active: 'border-blue-500 text-blue-600 bg-blue-50',
        hover: 'hover:text-blue-600 hover:bg-blue-50',
        inactive: 'text-gray-500',
        icon: 'text-blue-500'
      },
      chapters: {
        active: 'border-purple-500 text-purple-600 bg-purple-50',
        hover: 'hover:text-purple-600 hover:bg-purple-50',
        inactive: 'text-gray-500',
        icon: 'text-purple-500'
      },
      events: {
        active: 'border-green-500 text-green-600 bg-green-50',
        hover: 'hover:text-green-600 hover:bg-green-50',
        inactive: 'text-gray-500',
        icon: 'text-green-500'
      },
      partnerships: {
        active: 'border-orange-500 text-orange-600 bg-orange-50',
        hover: 'hover:text-orange-600 hover:bg-orange-50',
        inactive: 'text-gray-500',
        icon: 'text-orange-500'
      },
      nonprofits: {
        active: 'border-pink-500 text-pink-600 bg-pink-50',
        hover: 'hover:text-pink-600 hover:bg-pink-50',
        inactive: 'text-gray-500',
        icon: 'text-pink-500'
      },
      newsletter: {
        active: 'border-indigo-500 text-indigo-600 bg-indigo-50',
        hover: 'hover:text-indigo-600 hover:bg-indigo-50',
        inactive: 'text-gray-500',
        icon: 'text-indigo-500'
      }
    };

    return isActive ? colorMap[tabId].active : `${colorMap[tabId].inactive} ${colorMap[tabId].hover}`;
  };

  return (
    <div className="mb-6">
      {/* Main Tab Navigation */}
      <div className="bg-white rounded-t-xl shadow-sm">
        <nav className="flex border-b border-gray-200">
          {tabs.map(({ id, label, icon: Icon, unseenCount, totalCount }) => {
            const isActive = activeTab === id;
            
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`
                  relative flex-1 px-4 py-4
                  text-sm font-medium
                  transition-all duration-200 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${getColorClasses(id, isActive)}
                  ${isActive ? 'border-b-2' : 'border-b-2 border-transparent'}
                `}
              >
                <div className="flex items-center justify-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? getColorClasses(id, true) : ''}`} />
                  <span className="font-semibold">{label}</span>
                  
                  {/* Badge Group - Don't show for newsletter */}
                  {id !== 'newsletter' && (
                    <div className="flex items-center gap-2">
                      {unseenCount > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {unseenCount} new
                        </span>
                      )}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        {totalCount}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Description Panel */}
      <div className="bg-white rounded-b-xl shadow-sm border-t border-gray-100">
        <div className="p-4 text-sm">
          {activeTab === 'contacts' && (
            <div className="flex items-center gap-2 text-blue-600">
              <Mail className="w-4 h-4" />
              <span>View and manage contact form submissions</span>
            </div>
          )}
          {activeTab === 'chapters' && (
            <div className="flex items-center gap-2 text-purple-600">
              <Building className="w-4 h-4" />
              <span>Review chapter applications and requests</span>
            </div>
          )}
          {activeTab === 'events' && (
            <div className="flex items-center gap-2 text-green-600">
              <Calendar className="w-4 h-4" />
              <span>Manage event suggestions and proposals</span>
            </div>
          )}
          {activeTab === 'partnerships' && (
            <div className="flex items-center gap-2 text-orange-600">
              <Handshake className="w-4 h-4" />
              <span>Handle partnership inquiries and collaborations</span>
            </div>
          )}
          {activeTab === 'nonprofits' && (
            <div className="flex items-center gap-2 text-pink-600">
              <UsersRound className="w-4 h-4" />
              <span>Process non-profit membership applications</span>
            </div>
          )}
          {activeTab === 'newsletter' && (
            <div className="flex items-center gap-2 text-indigo-600">
              <Mail className="w-4 h-4" />
              <span>Manage newsletter subscribers and email lists</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Mobile Tab Navigation
export function MobileTabNavigation({ 
  activeTab, 
  stats, 
  onTabChange 
}: TabNavigationProps) {
  return (
    <div className="lg:hidden mb-6">
      <select
        value={activeTab}
        onChange={(e) => onTabChange(e.target.value as SubmissionType)}
        className="w-full p-3 border rounded-lg bg-white shadow-sm 
                 text-sm font-medium
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {[
          { value: 'contacts', label: 'Contacts' },
          { value: 'chapters', label: 'Chapters' },
          { value: 'events', label: 'Events' },
          { value: 'partnerships', label: 'Partnerships' },
          { value: 'nonprofits', label: 'Non-Profits' },
          { value: 'newsletter', label: 'Newsletter' }
        ].map(option => (
          <option key={option.value} value={option.value}>
            {option.label} {
              option.value !== 'newsletter' && stats.unseenByType[option.value as SubmissionType] > 0 
                ? `(${stats.unseenByType[option.value as SubmissionType]} new)` 
                : ''
            }
          </option>
        ))}
      </select>
    </div>
  );
}