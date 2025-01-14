// helpers.ts
import { SubmissionType } from './types';

// Date Formatting
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Get Tab Information
export const tabInfo = {
  contacts: {
    label: 'Contacts',
    description: 'Contact form submissions',
    searchFields: ['fullname', 'email', 'subject']
  },
  chapters: {
    label: 'Chapters',
    description: 'Chapter applications',
    searchFields: ['chapterName', 'institution', 'primaryContact']
  },
  events: {
    label: 'Events',
    description: 'Event suggestions',
    searchFields: ['eventTitle', 'description', 'yourRole']
  },
  partnerships: {
    label: 'Partnerships',
    description: 'Partnership requests',
    searchFields: ['organizationName', 'contactPerson', 'email']
  },
  nonprofits: {
    label: 'Non-Profits',
    description: 'DMC Non-profit applications',
    searchFields: ['firstName', 'lastName', 'email', 'company']
  }
} as const;

// Get Search Fields for each type
export function getSearchFields(type: SubmissionType): string[] {
  return tabInfo[type].searchFields;
}

// File Handling
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function isValidFileType(filename: string): boolean {
  const validExtensions = ['pdf', 'doc', 'docx'];
  return validExtensions.includes(getFileExtension(filename));
}

// Sorting
export function getSortOptions(type: SubmissionType): Array<{ value: string; label: string }> {
  const commonOptions = [
    { value: 'date', label: 'Date' },
    { value: 'seen', label: 'Status' }
  ];

  const typeSpecificOptions = {
    contacts: [
      { value: 'fullname', label: 'Name' },
      { value: 'email', label: 'Email' }
    ],
    chapters: [
      { value: 'chapterName', label: 'Chapter Name' },
      { value: 'institution', label: 'Institution' }
    ],
    events: [
      { value: 'eventTitle', label: 'Event Title' }
    ],
    partnerships: [
      { value: 'organizationName', label: 'Organization' },
      { value: 'partnershipInterest', label: 'Interest Type' }
    ],
    nonprofits: [
      { value: 'lastName', label: 'Last Name' },
      { value: 'company', label: 'Company' }
    ]
  };

  return [...commonOptions, ...typeSpecificOptions[type]];
}

// Error Handling
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message === 'UNAUTHORIZED') {
      return 'Your session has expired. Please log in again.';
    }
    return error.message;
  }
  return 'An unexpected error occurred';
}

// Pagination
export function generatePageNumbers(currentPage: number, totalPages: number): number[] {
  const pages: number[] = [];
  const maxPages = 5;

  if (totalPages <= maxPages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= maxPages; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }
  }

  return pages;
}