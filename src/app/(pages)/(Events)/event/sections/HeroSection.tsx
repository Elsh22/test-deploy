"use client";
import { motion } from 'framer-motion';
import { getImageUrl } from '../utils/imageHelpers';
import { EventItem } from '../types/event';
import Image from 'next/image';

interface HeroSectionProps {
  events: EventItem[];
}

const HeroSection = ({ events }: HeroSectionProps) => {
  // Get available images from events with their titles
  const availableImages = events
    .filter(event => event.attributes?.Image?.data !== null)
    .map(event => ({
      url: getImageUrl(event),
      title: event.attributes.Title || 'Event image'
    }));

  // Create array of 6 image objects
  let heroImages: { url: string; title: string }[] = [];
  if (availableImages.length >= 6) {
    // If we have 6 or more images, use the first 6
    heroImages = availableImages.slice(0, 6);
  } else if (availableImages.length > 0) {
    // If we have fewer than 6 images but at least 1, repeat them
    for (let i = 0; i < 6; i++) {
      heroImages.push(availableImages[i % availableImages.length]);
    }
  } else {
    // If no images available, use placeholder for all slots
    heroImages = Array(6).fill({
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==',
      title: 'Placeholder image'
    });
  }

  return (
    <motion.section 
      className="relative h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-2">
        {heroImages.map((image, i) => (
          <motion.div
            key={`hero-image-${i}`}
            className="relative overflow-hidden rounded-lg bg-gray-100"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 1 }}
          >
            <Image
              src={image.url}
              alt={`${image.title} - Event showcase image ${i + 1}`}
              className="object-cover"
              fill
              quality={100}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
              priority={i < 2}
              loading={i < 2 ? 'eager' : 'lazy'}
              unoptimized={false}
            />
            <motion.div
              className="absolute inset-0 bg-blue-600/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 + 0.5 }}
            />
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10 h-full flex items-center justify-center text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-6">Our Events</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Join us in making a difference through technology and innovation
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;