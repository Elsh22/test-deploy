'use client';
import React from 'react';

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
    <div className="relative w-full bg-black py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">
        DMC 8th Annual Mixer Promo and Recap
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(253,224,71,0.7)]"
          >
            <iframe
              src={video.videoUrl}
              allow="autoplay"
              className="w-full h-full"
            ></iframe>
            <h3 className="text-xl text-white font-semibold mt-4">{video.title}</h3>
            <p className="text-gray-300">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
