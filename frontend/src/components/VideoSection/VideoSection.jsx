'use client';
import React from 'react';
import { motion } from 'framer-motion';

const VideoSection = () => {
  const videos = [
    {
      id: 1,
      title: "DMC 8th Annual Mixer Promo",
      description: "Promo for the 8th annual mixer event.",
      videoUrl: "https://drive.google.com/file/d/103Y7Qumlp_ccafODMd0E5MGszmQ_R76n/preview",
    },
    {
      id: 2,
      title: "DMC Mixer 2025 Recap",
      description: "Recap of the DMC Mixer 2025 event.",
      videoUrl: "https://drive.google.com/file/d/1gHdVsuv4e2fyipT3fbZJfi5nUcj7ACrR/preview",
    },
  ];

  return (
    <section className="relative w-full bg-black py-20 px-6 sm:px-12 overflow-hidden">
      {/* Gold gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-600"></div>

      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-yellow-400 text-center mb-16 tracking-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        DMC 8th Annual Mixer Promo & Recap
      </motion.h2>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-yellow-600/20 shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,215,0,0.6)]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          >
            {/* Video Frame */}
            <div className="aspect-video relative">
              <iframe
                src={video.videoUrl}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Text Content */}
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
                {video.title}
              </h3>
              <p className="text-gray-300 text-lg">{video.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subtle gold fade at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>
    </section>
  );
};

export default VideoSection;
