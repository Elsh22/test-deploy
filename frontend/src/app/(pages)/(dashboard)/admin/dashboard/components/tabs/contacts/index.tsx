// components/tabs/contacts/index.tsx
'use client';
import { useState, useEffect } from 'react';
import { Contact, FilterState, ApiResponse } from '../../../utils/types';
import { api } from '../../../utils/api';
import ContactList from './ContactList';
import Pagination from '../../shared/Pagination';
import ExportButton from '../../actions/ExportButton';

interface ContactsTabProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

export default function ContactsTab({ filters, onFilterChange }: ContactsTabProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  // Load contacts data
  useEffect(() => {
    const loadContacts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response: ApiResponse<Contact[]> = await api.fetchSubmissions('contacts', filters);
        
        if (response.success && response.data) {
          setContacts(response.data);
          if (response.pagination) {
            setPagination(response.pagination);
          }
        }
      } catch (err) {
        console.error('Error loading contacts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load contacts');
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, [filters]);

  // Handle marking contact as seen
  const handleMarkSeen = async (id: string) => {
    try {
      await api.markAsSeen('contacts', id);
      const updatedContacts = contacts.map(contact =>
        contact._id === id ? { ...contact, seen: true } : contact
      );
      setContacts(updatedContacts);
    } catch (err) {
      console.error('Error marking contact as seen:', err);
      setError('Failed to update contact status');
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
      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {pagination.total} total contacts
        </div>
        
        {contacts.length > 0 && (
          <ExportButton
            emails={contacts.map(contact => contact.email)}
            filename="contacts_export"
          />
        )}
      </div>

      {/* Contacts List */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : contacts.length > 0 ? (
        <ContactList contacts={contacts} onMarkSeen={handleMarkSeen} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          No contacts found
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