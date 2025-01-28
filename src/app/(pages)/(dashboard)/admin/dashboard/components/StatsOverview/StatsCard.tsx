'use client';
// components/StatsOverview/StatsCard.tsx
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  subtext?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({
  title,
  value,
  subtext,
  icon: Icon,
  iconColor = 'text-blue-500',
  trend
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      
      <div className="flex items-baseline">
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
        
        {trend && (
          <span className={`ml-2 text-sm ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}%
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1 text-sm text-gray-500">{subtext}</p>
      )}
    </div>
  );
}