'use client';
// src/app/(pages)/(dashboard)/admin/dashboard/components/tabs/newsletter/index.tsx
import { useState, useEffect } from 'react';
import { Copy, Download, CheckCircle, XCircle, Trash2, Search } from 'lucide-react';

interface Subscriber {
  _id: string;
  email: string;
  date: string;
}

interface NewsletterTabProps {
  filters: any;  // Not used for newsletter but kept for consistency
  onFilterChange: (filters: any) => void;
}

export default function NewsletterTab({ filters, onFilterChange }: NewsletterTabProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [search, setSearch] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  // Load subscribers
  useEffect(() => {
    const loadSubscribers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/newsletter');
        const data = await response.json();

        if (data.success) {
          setSubscribers(data.subscribers);
        } else {
          throw new Error(data.error || 'Failed to load subscribers');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load subscribers');
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscribers();
  }, []);

  // Filter subscribers based on search
  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(search.toLowerCase())
  );

  // Handle copy selected emails
  const handleCopyEmails = async () => {
    try {
      const emailsToCopy = selectedEmails.size > 0
        ? Array.from(selectedEmails).join('\n')
        : subscribers.map(sub => sub.email).join('\n');
        
      await navigator.clipboard.writeText(emailsToCopy);
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  // Handle export CSV
  const handleExportCSV = async () => {
    try {
      const response = await fetch('/api/newsletter?export=true');
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export subscribers');
    }
  };

  // Handle delete subscriber
  const handleDeleteSubscriber = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/newsletter?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete subscriber');
      }

      setSubscribers(prev => prev.filter(sub => sub._id !== id));
      setSelectedEmails(prev => {
        const newSelected = new Set(prev);
        const subscriber = subscribers.find(sub => sub._id === id);
        if (subscriber) {
          newSelected.delete(subscriber.email);
        }
        return newSelected;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete subscriber');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmails(new Set(filteredSubscribers.map(sub => sub.email)));
    } else {
      setSelectedEmails(new Set());
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-6">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-medium">Newsletter Subscribers</h2>
            <p className="mt-1 text-sm text-gray-500">
              {subscribers.length} total subscribers
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopyEmails}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                transition-colors duration-200
                ${copyStatus === 'idle' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' :
                  copyStatus === 'success' ? 'bg-green-50 text-green-600' :
                  'bg-red-50 text-red-600'}
              `}
            >
              {copyStatus === 'idle' ? (
                <>
                  <Copy className="h-4 w-4" />
                  {selectedEmails.size > 0 
                    ? `Copy Selected (${selectedEmails.size})`
                    : 'Copy All Emails'
                  }
                </>
              ) : copyStatus === 'success' ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  Failed to copy
                </>
              )}
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search emails..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Subscribers List */}
      <div className="overflow-hidden">
        {/* Table Header */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-12 px-4 py-3">
            <div className="col-span-1">
              <input
                type="checkbox"
                checked={selectedEmails.size === filteredSubscribers.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-6 font-medium text-sm text-gray-500">Email</div>
            <div className="col-span-4 font-medium text-sm text-gray-500">Date Subscribed</div>
            <div className="col-span-1"></div>
          </div>
        </div>

        {/* Subscriber Rows */}
        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {filteredSubscribers.length > 0 ? (
            filteredSubscribers.map(subscriber => (
              <div key={subscriber._id} className="grid grid-cols-12 px-4 py-3 hover:bg-gray-50">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={selectedEmails.has(subscriber.email)}
                    onChange={(e) => {
                      const newSelected = new Set(selectedEmails);
                      if (e.target.checked) {
                        newSelected.add(subscriber.email);
                      } else {
                        newSelected.delete(subscriber.email);
                      }
                      setSelectedEmails(newSelected);
                    }}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-6">
                  <p className="text-sm text-gray-900">{subscriber.email}</p>
                </div>
                <div className="col-span-4">
                  <p className="text-sm text-gray-500">
                    {new Date(subscriber.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="col-span-1">
                  <button
                    onClick={() => handleDeleteSubscriber(subscriber._id)}
                    disabled={isDeleting}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              No subscribers found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}