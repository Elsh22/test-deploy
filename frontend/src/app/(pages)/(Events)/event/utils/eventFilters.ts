// utils/eventFilters.ts
import { Event, FilterState } from '../types/event';

export const filterEvents = (events: Event[], filters: FilterState) => {
  return events.filter(event => {
    const matchesSchool = filters.school === 'all' || event.Schools?.trim() === filters.school;
    const matchesSearch = !filters.search || 
      event.Title.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.Description.toLowerCase().includes(filters.search.toLowerCase());
    return matchesSchool && matchesSearch;
  });
};

export const truncateDescription = (description: string, maxLength = 150) => {
  if (!description) return '';
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength).trim() + '...';
};