'use client';
// components/actions/MarkSeenButton.tsx
import { useState } from 'react';
import { Eye } from 'lucide-react';
import { markAsSeen } from '../../utils/api';
import { SubmissionType } from '../../utils/types';

interface MarkSeenButtonProps {
  id: string;
  type: SubmissionType;
  seen: boolean;
  onMarkSeen: () => void;
  className?: string;
}

export default function MarkSeenButton({ 
  id, 
  type, 
  seen, 
  onMarkSeen,
  className = ''
}: MarkSeenButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (seen || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      await markAsSeen(type, id);
      onMarkSeen();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark as seen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={seen || isLoading}
        className={`p-2 rounded-full transition-colors ${
          seen 
            ? 'text-green-500 cursor-default' 
            : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
        } ${className} ${isLoading ? 'opacity-50' : ''}`}
        title={seen ? 'Already seen' : 'Mark as seen'}
      >
        {isLoading ? (
          <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
      
      {error && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-600 text-xs py-1 px-2 rounded whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
}