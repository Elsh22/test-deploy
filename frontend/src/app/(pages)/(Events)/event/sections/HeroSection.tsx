"use client";
import { motion } from 'framer-motion';
import { getHeroImages } from '../utils/imageHelpers';
import { EventItem } from '../types/event';

interface HeroSectionProps {
  events: EventItem[];
}

const HeroSection = ({ events }: HeroSectionProps) => {
  const heroImages = getHeroImages(events);

  return (
    <motion.section 
      className="relative h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-2">
        {heroImages.map((imageUrl, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 1 }}
          >
            <img
              src={imageUrl}
              alt={`Event ${i + 1}`}
              className="w-full h-full object-cover"
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