'use client';
// components/StatsOverview/index.tsx
import { Mail, Calendar, Eye, UsersRound } from 'lucide-react';
import StatsCard from './StatsCard';
import { DashboardStats } from '../../utils/types';

interface StatsOverviewProps {
  stats: DashboardStats;
  className?: string;
}

export default function StatsOverview({ stats, className = '' }: StatsOverviewProps) {
  // Calculate the percentage of unseen submissions
  const unseenPercentage = ((stats.unseenSubmissions / stats.totalSubmissions) * 100).toFixed(1);
  
  // Calculate weekly trend (comparing to previous week)
  const calculateTrend = () => {
    const weeklyAverage = stats.totalSubmissions / 52;
    const trend = ((stats.recentSubmissions - weeklyAverage) / weeklyAverage) * 100;
    return {
      // Convert the string back to a number using parseFloat
      value: parseFloat(Math.abs(trend).toFixed(1)),
      isPositive: trend > 0
    };
  };

  const trend = calculateTrend();

  // Stats data configuration
  const statsData = [
    {
      title: 'Total Submissions',
      value: stats.totalSubmissions,
      subtext: 'All time submissions',
      icon: Mail,
      iconColor: 'text-blue-500',
      trend
    },
    {
      title: 'Recent Submissions',
      value: stats.recentSubmissions,
      subtext: 'Last 7 days',
      icon: Calendar,
      iconColor: 'text-green-500'
    },
    {
      title: 'Unseen Submissions',
      value: stats.unseenSubmissions,
      subtext: `${unseenPercentage}% of total`,
      icon: Eye,
      iconColor: 'text-yellow-500'
    }
  ];

  // Detailed breakdown by type
  const typeBreakdown = [
    {
      title: 'Contacts',
      total: stats.submissionsByType.contacts,
      unseen: stats.unseenByType.contacts,
      recent: stats.recentByType.contacts,
    },
    {
      title: 'Chapters',
      total: stats.submissionsByType.chapters,
      unseen: stats.unseenByType.chapters,
      recent: stats.recentByType.chapters,
    },
    {
      title: 'Events',
      total: stats.submissionsByType.events,
      unseen: stats.unseenByType.events,
      recent: stats.recentByType.events,
    },
    {
      title: 'Partnerships',
      total: stats.submissionsByType.partnerships,
      unseen: stats.unseenByType.partnerships,
      recent: stats.recentByType.partnerships,
    },
    {
      title: 'Non-Profits',
      total: stats.submissionsByType.nonprofits,
      unseen: stats.unseenByType.nonprofits,
      recent: stats.recentByType.nonprofits,
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtext={stat.subtext}
            icon={stat.icon}
            iconColor={stat.iconColor}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Type Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium mb-4">Submission Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {typeBreakdown.map((type, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{type.title}</h4>
                <UsersRound className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  Total: <span className="font-medium">{type.total}</span>
                </p>
                <p className="text-sm text-yellow-600">
                  Unseen: <span className="font-medium">{type.unseen}</span>
                </p>
                <p className="text-sm text-green-600">
                  Recent: <span className="font-medium">{type.recent}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}