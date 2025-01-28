'use client';
// components/actions/DownloadButton.tsx
import { useState } from 'react';
import { FileDown, CheckCircle, XCircle } from 'lucide-react';
import { downloadResume } from '../../utils/api';

interface DownloadButtonProps {
  fileId: string;
  fileName?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'minimal';
}

export default function DownloadButton({ 
  fileId, 
  fileName = 'resume',
  className = '',
  variant = 'primary'
}: DownloadButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (status === 'loading') return;

    try {
      setStatus('loading');
      setError(null);

      const blob = await downloadResume(fileId);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setStatus('success');
      // Reset to idle after 2 seconds
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to download file');
      // Reset to idle after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 3000);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          base: 'bg-blue-500 text-white hover:bg-blue-600',
          loading: 'bg-blue-500 opacity-75',
          success: 'bg-green-500 text-white',
          error: 'bg-red-500 text-white'
        };
      case 'secondary':
        return {
          base: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          loading: 'bg-gray-100 opacity-75',
          success: 'bg-green-100 text-green-700',
          error: 'bg-red-100 text-red-700'
        };
      case 'minimal':
        return {
          base: 'text-blue-500 hover:text-blue-600',
          loading: 'text-blue-500 opacity-75',
          success: 'text-green-500',
          error: 'text-red-500'
        };
    }
  };

  const styles = getVariantStyles();
  const buttonStyle = status === 'loading' ? styles.loading :
                     status === 'success' ? styles.success :
                     status === 'error' ? styles.error :
                     styles.base;

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return (
          <div className={`animate-spin h-5 w-5 border-2 rounded-full ${
            variant === 'primary' ? 'border-white border-t-transparent' : 
            'border-current border-t-transparent'
          }`} />
        );
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <XCircle className="h-5 w-5" />;
      default:
        return <FileDown className="h-5 w-5" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleDownload}
        disabled={status === 'loading'}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${buttonStyle} ${
          variant === 'minimal' ? '' : 'shadow-sm'
        } ${className}`}
      >
        {getIcon()}
        <span>
          {status === 'loading' ? 'Downloading...' :
           status === 'success' ? 'Downloaded!' :
           status === 'error' ? 'Failed' :
           'Download Resume'}
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

// Optional compound component for grouped downloads
export function DownloadGroup({ children, className = '' }: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {children}
    </div>
  );
}