// utils/imageHelpers.ts
import { EventItem } from '../types/event';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const getImageUrl = (event: EventItem) => {
  try {
    if (!event?.attributes?.Image?.[0]?.url) {
      console.log('No image found for event:', event);
      return '/api/placeholder/800/400';
    }
    const imageUrl = event.attributes.Image[0].formats?.medium?.url || event.attributes.Image[0].url;
    return `${STRAPI_URL}/${imageUrl}`;
  } catch (error) {
    console.error('Error getting image URL:', error);
    return '/api/placeholder/800/400';
  }
};

export const getHeroImages = (events: EventItem[]) => {
  const images: string[] = [];
  const availableEvents = [...events].sort((a, b) => 
    new Date(b.attributes.DateStart).getTime() - new Date(a.attributes.DateStart).getTime()
  );

  for (let i = 0; i < 6; i++) {
    if (availableEvents[i]) {
      images.push(getImageUrl(availableEvents[i]));
    } else {
      const repeatIndex = i % Math.max(availableEvents.length, 1);
      images.push(getImageUrl(availableEvents[repeatIndex]));
    }
  }

  return images;
};