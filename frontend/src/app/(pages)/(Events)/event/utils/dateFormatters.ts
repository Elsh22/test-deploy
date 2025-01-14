// utils/dateFormatters.ts
import { format, parseISO } from 'date-fns';

export const formatDate = (dateStr: string) => {
  try {
    return format(parseISO(dateStr), 'MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date not available';
  }
};

export const formatTime = (dateStr: string) => {
  try {
    return format(parseISO(dateStr), 'h:mm a');
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Time not available';
  }
};