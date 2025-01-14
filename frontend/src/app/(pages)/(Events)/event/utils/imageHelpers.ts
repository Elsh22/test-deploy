// utils/imageHelpers.ts
import { Event } from '../types/event';

export const getImageUrl = (event: Event) => {
  try {
    if (!event?.Image?.[0]?.url) {
      console.log('No image found for event:', event);
      return '/api/placeholder/800/400';
    }
    const imageUrl = event.Image[0].formats?.medium?.url || event.Image[0].url;
    return `http://localhost:1337${imageUrl}`;
  } catch (error) {
    console.error('Error getting image URL:', error);
    return '/api/placeholder/800/400';
  }
};

export const getHeroImages = (events: Event[]) => {
  const images = [];
  const availableEvents = [...events].sort((a, b) => 
    new Date(b.DateStart) - new Date(a.DateStart)
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