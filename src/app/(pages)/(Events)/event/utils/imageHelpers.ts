// utils/imageHelpers.ts
// utils/imageHelpers.ts
import { EventItem } from '../types/event';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const getImageUrl = (event: EventItem): string => {
  try {
    const imageData = event.attributes.Image.data;
    if (!imageData || imageData.length === 0) {
      return '/placeholder-image.jpg'; // Use a local placeholder image
    }

    const image = imageData[0];
    const imageUrl = image.attributes.formats?.medium?.url || image.attributes.url;
    return `${STRAPI_URL}${imageUrl}`;
  } catch (error) {
    console.error('Error getting image URL for event:', event.id, error);
    return '/placeholder-image.jpg'; // Use a local placeholder image
  }
};

export const getHeroImages = (events: EventItem[]): string[] => {
  return events
    .filter(event => event.attributes?.Image?.data)
    .slice(0, 6)
    .map(event => getImageUrl(event));
};