import { format } from 'date-fns';
import { Blog } from './types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

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
    return `${STRAPI_URL}/${blog.ThumbnailImage.url}`;
  } catch (error) {
    return '/api/placeholder/1200/600';
  }
};