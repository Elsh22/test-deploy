'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import img1 from '../../assets/DMCSPORTS/7on7(1).jpg';
import img2 from '../../assets/DMCMIXER8/DMCMIXER20.jpg';
import img3 from '../../newassest/suitday.jpg';
import img4 from '../../assets/GBMs/GBM 2 DMCxVACU 10-15-25-20.png';
import img5 from '../../assets/IntershipWorkshop/IntWork20.png';
import img6 from '../../assets/DMCSPORTS/DSC01192.jpg';

const events = [
  {
    id: 5,
    title: 'DMC Get Fitted Suit Day',
    imgSrc: img3,
    description: 'Members received professional attire to support career readiness.',
    videoUrl: 'https://drive.google.com/file/d/1UIVgO5oqk-ahEtBWf4E6rS6aF4Nd6Ljp/preview',
  },
  {
    id: 1,
    title: 'GBM with Virginia Credit Union',
    imgSrc: img4,
    description: 'A financial literacy session with practical resources from VACU.',
    videoUrl: 'https://drive.google.com/file/d/1BggVKnHJAXKKl7MCd8EEoUKJSVxFda2G/preview',
  },
  {
    id: 2,
    title: 'Internship Workshop',
    imgSrc: img5,
    description: 'Professional networking, LinkedIn support, and career preparation.',
    videoUrl: 'https://drive.google.com/file/d/1UbGG55vKIolyhGWtipMRS0Mr404RdhII/preview',
  },
  {
    id: 3,
    title: 'DMC 7 on 7 Football',
    imgSrc: img1,
    description: 'Competition, teamwork, and sportsmanship on the field.',
    videoUrl: 'https://drive.google.com/file/d/1RB4XWhtfQZKUirPwWNwkV27oBt0TDhPN/preview',
  },
  {
    id: 4,
    title: 'DMC Mixer',
    imgSrc: img2,
    description: 'Students and professionals gathered for community and networking.',
    videoUrl: 'https://drive.google.com/file/d/1gHdVsuv4e2fyipT3fbZJfi5nUcj7ACrR/preview',
  },
  {
    id: 6,
    title: 'DMC Basketball',
    imgSrc: img6,
    description: 'A high-energy day of basketball and brotherhood.',
    videoUrl: 'https://drive.google.com/file/d/11DRpJ8PIrarpE4WVcjVCXUxj6eU5OMhB/preview',
  },
];

const Highlight = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <section className="dmc-dark-section px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-300">
              Video Highlights
            </p>
            <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Moments worth replaying.
            </h2>
          </div>
          <p className="dmc-muted max-w-md text-lg leading-8">
            A living archive of service, professional development, athletics, and
            campus community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.button
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="dmc-card group overflow-hidden border text-left"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: 'easeOut' }}
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={event.imgSrc}
                  alt={event.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center bg-yellow-400 text-black">
                  <Play className="h-5 w-5 fill-black" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[var(--dmc-text)]">{event.title}</h3>
                <p className="dmc-muted mt-2 text-sm leading-6">{event.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
            onClick={() => setSelectedEvent(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-4xl border border-white/10 bg-[#0a0a0a] p-4 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
            >
              <button
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-yellow-400 text-black"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="mb-4 pr-12 text-2xl font-black text-white md:text-3xl">
                {selectedEvent.title}
              </h2>
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={selectedEvent.videoUrl}
                  title={selectedEvent.title}
                  width="100%"
                  height="100%"
                  allow="autoplay"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Highlight;
