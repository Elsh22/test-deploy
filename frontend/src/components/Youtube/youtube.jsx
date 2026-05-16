'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Youtube as YoutubeIcon } from 'lucide-react';

const Youtube = () => {
  const videos = [
    'BidFVxIBaHo',
    'kNX907_j3_g',
    'tf0tBafdo0k',
    '0M6I3KH3x28',
    '6novGvOabco',
    'H1qklEi04lc',
    'L9VGDJ4tuN0',
    '1BoLVFluhak',
  ];

  return (
    <section className="dmc-panel-section px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/40 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
              <YoutubeIcon className="h-4 w-4" />
              YouTube
            </div>
            <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              More DMC stories, one play away.
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@vcudevelopingmenofcolor3402"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-white"
          >
            Visit Channel
            <YoutubeIcon className="h-5 w-5" />
          </a>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((videoId, index) => (
            <motion.a
              key={videoId}
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden border border-[var(--dmc-border)] bg-black"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="DMC YouTube video thumbnail"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                  <span className="flex h-14 w-14 items-center justify-center bg-yellow-400 text-black">
                    <Play className="h-6 w-6 fill-black" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Youtube;
