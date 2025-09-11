'use client';
import React from 'react';

const VideoSection = () => {
  return (
    <div className="relative w-full bg-black py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
        DMC 8th Annual Mixer Promo and Recap
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Video 1 */}
        <div className="aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-yellow-500 transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(255,215,0,0.7)]">
          <video
            src="DMCVID.mp4"
            controls
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>

        {/* Video 2 */}
        <div className="aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-yellow-500 transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(255,215,0,0.7)]">
          <video
            src="DMC MIXER 2025.mp4"
            controls
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
