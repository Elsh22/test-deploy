import { format } from 'date-fns';
import { Blog } from './types';

export const formatDate = (dateStr: string) => {
  try {
    return format(new Date(dateStr), 'MMMM d, yyyy');
  } catch (error) {
    return 'Date unavailable';
  }
};

export const getImageUrl = (blog: Blog) => {
  try {
    if (!blog?.ThumbnailImage?.url) {
      return '/api/placeholder/1200/600';
    }
    return `http://localhost:1337${blog.ThumbnailImage.url}`;
  } catch (error) {
    return '/api/placeholder/1200/600';
  }
};