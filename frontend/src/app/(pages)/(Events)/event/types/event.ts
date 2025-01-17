// types/event.ts
export interface EventItem {
  id: number;  // Changed from string to number since Strapi uses numeric IDs
  attributes: {  // Added attributes wrapper to match Strapi structure
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
  };
}


  export interface FilterState {
    school: string;
    search: string;
    showMore: boolean;
  }