import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string): string => {
  try {
    if (!dateString) return 'Date TBD';
    const date = parseISO(dateString);
    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date TBD';
  }
};

export const formatTime = (dateString: string): string => {
  try {
    if (!dateString) return 'Time TBD';
    const date = parseISO(dateString);
    return format(date, 'h:mm a');
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Time TBD';
  }
};