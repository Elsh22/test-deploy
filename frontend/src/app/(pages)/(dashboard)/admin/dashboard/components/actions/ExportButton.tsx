'use client';
// components/actions/ExportButton.tsx
import { useState } from 'react';
import { Download, CheckCircle, XCircle } from 'lucide-react';
import { exportEmailsToCSV } from '../../utils/api';

interface ExportButtonProps {
  emails: string[];
  filename?: string;
  className?: string;
}

export default function ExportButton({ 
  emails, 
  filename = 'emails_export',
  className = '' 
}: ExportButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (status === 'loading') return;

    try {
      setStatus('loading');
      setError(null);

      // Validate emails
      if (!emails.length) {
        throw new Error('No emails to export');
      }

      // Format filename with date
      const formattedFilename = `${filename}_${new Date().toISOString().split('T')[0]}`;
      
      // Export as CSV
      exportEmailsToCSV(emails);
      
      setStatus('success');
      // Reset to idle after 2 seconds
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to export emails');
      // Reset to idle after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 3000);
    }
  };

  const getButtonStyle = () => {
    switch (status) {
      case 'loading':
        return 'bg-blue-500 opacity-75';
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />;
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <XCircle className="h-5 w-5" />;
      default:
        return <Download className="h-5 w-5" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleExport}
        disabled={status === 'loading'}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-white transition-colors ${getButtonStyle()} ${className}`}
      >
        {getIcon()}
        <span>
          {status === 'loading' ? 'Exporting...' :
           status === 'success' ? 'Exported!' :
           status === 'error' ? 'Failed' :
           'Export Emails'}
        </span>
      </button>

      {error && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-600 text-xs py-1 px-2 rounded whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
}