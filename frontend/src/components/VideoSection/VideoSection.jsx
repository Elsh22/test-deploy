'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

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
    <section className="dmc-dark-section relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-yellow-300">
              Featured media
            </p>
            <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              The mixer energy, captured.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-8 text-gray-300">
            Watch the moments that bring the DMC community together, from the promo
            to the full event recap.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              className="group overflow-hidden border border-white/10 bg-white/[0.03]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.12, ease: 'easeOut' }}
            >
              <div className="aspect-video overflow-hidden bg-black">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="flex items-start gap-4 p-6">
                <PlayCircle className="mt-1 h-7 w-7 shrink-0 text-yellow-300 transition group-hover:scale-110" />
                <div>
                  <h3 className="text-2xl font-black text-white">{video.title}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-300">{video.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
