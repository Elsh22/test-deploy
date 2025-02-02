// types/event.ts
export interface EventItem {
  id: number;
  attributes: {
    Title: string;
    Description: string;
    DateStart: string;
    DateEnd: string;
    Location: string;
    Schools?: string;
    Slug: string;
    RsvpLink?: string;
    TypeofEvent?: string;
    Image: {
      data: {
        id: number;
        attributes: {
          url: string;
          formats: {
            thumbnail: {
              url: string;
            };
            medium: {
              url: string;
            };
            small: {
              url: string;
            };
            large: {
              url: string;
            };
          };
        };
      }[] | null;
    };
  };
}

export interface FilterState {
  school: string;
  search: string;
  showMore: boolean;
}
export interface FilterSectionProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  title: string;
}

export interface ShowMoreButtonProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  totalCount: number;
  shownCount: number;
}

export interface EventSectionProps {
  events: EventItem[];
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  FilterSection: React.FC<FilterSectionProps>;
  ShowMoreButton: React.FC<ShowMoreButtonProps>;
}