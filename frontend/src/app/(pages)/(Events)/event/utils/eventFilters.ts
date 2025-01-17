// utils/eventFilters.ts
import { EventItem, FilterState } from '../types/event';

export const filterEvents = (events: EventItem[], filters: FilterState) => {
  return events.filter(event => {
    const matchesSchool = filters.school === 'all' || event.attributes.Schools?.trim() === filters.school;
    const matchesSearch = !filters.search || 
      event.attributes.Title.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.attributes.Description.toLowerCase().includes(filters.search.toLowerCase());
    return matchesSchool && matchesSearch;
  });
};

export const truncateDescription = (description: string, maxLength = 150) => {
  if (!description) return '';
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength).trim() + '...';
};