'use client';
import React from 'react';

const VideoSection = () => {
  return (
    <div className="relative w-full bg-black py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
        DMC 8th Annual Mixer Promo and Recap
      </h2>

      <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-lg">
  <video
    src="/DMCVID.mp4"
    controls
    autoPlay={false}
    muted
    loop
    className="w-full h-full object-cover"
  />
</div>

<div className="aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-lg">
  <video
    src="/DMCMIXER2025.mp4"
    controls
    autoPlay={false}
    muted
    loop
    className="w-full h-full object-cover"
  />
</div>

      </div>
    
  );
};

export default VideoSection;
