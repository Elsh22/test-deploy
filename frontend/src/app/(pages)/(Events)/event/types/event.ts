// types/event.ts
export interface Event {
    id: string;
    Title: string;
    Description: string;
    DateStart: string;
    DateEnd: string;
    Location: string;
    Schools?: string;
    Slug: string;
    RsvpLink?: string;
    TypeofEvent?: string;
    Image?: Array<{
      url: string;
      formats?: {
        medium?: {
          url: string;
        };
      };
    }>;
  }
  
  export interface FilterState {
    school: string;
    search: string;
    showMore: boolean;
  }