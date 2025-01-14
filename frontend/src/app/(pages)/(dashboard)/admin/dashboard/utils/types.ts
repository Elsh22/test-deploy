// types.ts

// Basic Interfaces
export interface BaseSubmission {
    _id: string;
    seen: boolean;
    date: string;
  }
  
  // Form Types
  export interface Contact extends BaseSubmission {
    fullname: string;
    email: string;
    subject: string;
    message: string;
  }
  
  export interface ChapterApplication extends BaseSubmission {
    email: any;
    chapterName: string;
    institution: string;
    primaryContact: string;
  }
  
  export interface EventSuggestion extends BaseSubmission {
    eventTitle: string;
    description: string;
    yourRole: string;
  }
  
  export interface Partnership extends BaseSubmission {
    organizationName: string;
    contactPerson: string;
    email: string;
    partnershipInterest: 'community' | 'financial';
    message: string;
  }
  
  export interface DMCNonProfit extends BaseSubmission {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    jobTitle: string;
    yearsOfExperience: number;
    linkedIn?: string;
    personalWebsite?: string;
    education: Array<{
      degree: string;
      institution: string;
      graduationYear: string;
      fieldOfStudy: string;
    }>;
    skills: string;
    interests: string;
    availabilityPerWeek: '1-3' | '4-6' | '7-10' | '10+';
    preferredCommittees: string[];
    resume: string; // File ID
    previousNonProfitExp?: string;
    reasonForJoining: string;
  }
  
  // Stats Types
  export interface DashboardStats {
    totalSubmissions: number;
    recentSubmissions: number;
    unseenSubmissions: number;
    submissionsByType: {
      contacts: number;
      chapters: number;
      events: number;
      partnerships: number;
      nonprofits: number;
    };
    recentByType: {
      contacts: number;
      chapters: number;
      events: number;
      partnerships: number;
      nonprofits: number;
    };
    unseenByType: {
      contacts: number;
      chapters: number;
      events: number;
      partnerships: number;
      nonprofits: number;
    };
  }
  
  // Filter and Sort Types
  export type SubmissionType = 'contacts' | 'chapters' | 'events' | 'partnerships' | 'nonprofits';
  
  export interface FilterState {
    type: SubmissionType;
    seen: boolean | null;
    search: string;
    dateFrom: string;
    dateTo: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    page: number;
  }
  
  export interface PaginationInfo {
    page: number;
    totalPages: number;
    total: number;
    hasMore: boolean;
  }
  
  // API Response Types
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    pagination?: PaginationInfo;
  }
  
  // Component Prop Types
  export interface TabProps {
    data: any[];
    filters: FilterState;
    onFilterChange: (newFilters: Partial<FilterState>) => void;
    onMarkSeen: (id: string) => Promise<void>;
  }
  
  export interface FilterBarProps {
    filters: FilterState;
    onFilterChange: (newFilters: Partial<FilterState>) => void;
  }
  
  export interface CardProps {
    data: any;
    onMarkSeen: (id: string) => Promise<void>;
  }