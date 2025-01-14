'use client';
// components/shared/StatusBadge.tsx
import { Eye, EyeOff } from 'lucide-react';

interface StatusBadgeProps {
  seen: boolean;
  showIcon?: boolean;
  className?: string;
}

export default function StatusBadge({ 
  seen, 
  showIcon = true,
  className = '' 
}: StatusBadgeProps) {
  return (
    <div 
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-medium
        ${seen 
          ? 'bg-green-100 text-green-700' 
          : 'bg-yellow-100 text-yellow-700'
        }
        ${className}
      `}
    >
      {showIcon && (
        seen 
          ? <Eye className="h-3.5 w-3.5" /> 
          : <EyeOff className="h-3.5 w-3.5" />
      )}
      {seen ? 'Seen' : 'New'}
    </div>
  );
}

// Optional: Status badge that shows time since submission
export function TimedStatusBadge({ 
  date, 
  seen,
  className = '' 
}: { 
  date: string; 
  seen: boolean;
  className?: string;
}) {
  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <StatusBadge seen={seen} />
      <span className="text-sm text-gray-500">
        {getTimeAgo(date)}
      </span>
    </div>
  );
}