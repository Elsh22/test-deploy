// helpers.ts
import { SubmissionType } from './types';

// Date Formatting
export function formatDate(date: string | number | Date): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) :
                 typeof date === 'number' ? new Date(date) :
                 date;
  
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    throw new Error('Invalid date');
  }
                 
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Get Tab Information
const tabInfo = {
  contacts: {
    label: "Contacts",
    description: "Contact form submissions",
    searchFields: ["fullname", "email", "subject"] as const
  },
  chapters: {
    label: "Chapters",
    description: "Chapter applications",
    searchFields: ["chapterName", "institution", "primaryContact", "email"] as const
  },
  events: {
    label: "Events",
    description: "Event suggestions",
    searchFields: ["eventTitle", "location", "description"] as const
  },
  partnerships: {
    label: "Partnerships",
    description: "Partnership inquiries",
    searchFields: ["organizationName", "partnershipInterest", "contactName"] as const
  },
  nonprofits: {
    label: "Non-Profits",
    description: "Non-profit applications",
    searchFields: ["company", "lastName", "email"] as const
  },
  newsletter: {
    label: "Newsletter",
    description: "Newsletter subscribers",
    searchFields: ["email", "subscriptionDate"] as const
  }
} as const;

export function getSearchFields(type: SubmissionType): string[] {
  return [...tabInfo[type].searchFields];
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
    ],
    newsletter: [  // Add newsletter type
      { value: 'email', label: 'Email' },
      { value: 'subscriptionDate', label: 'Subscription Date' }
    ]
  };

  return [...commonOptions, ...(typeSpecificOptions[type] || [])];
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