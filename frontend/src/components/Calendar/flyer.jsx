'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Megaphone } from 'lucide-react';
import firstGbmFlyer from '../../assets/FLYERS/1stGBM(Spring).jpg';

const flyers = [
  {
    image: firstGbmFlyer,
    title: '1st Spring General Body Meeting',
    description:
      'A general body meeting for members to reconnect, learn what DMC is building, and find ways to get involved.',
    date: 'February 18, 2026',
    type: 'GBM',
  },
];

const FlyerPost = () => {
  const featured = flyers[0];

  return (
    <section className="dmc-light-section px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -left-4 -top-4 h-full w-full border border-yellow-400" />
          <div className="relative overflow-hidden border border-[var(--dmc-border)] bg-black">
            <Image
              src={featured.image}
              alt={featured.title}
              className="h-auto w-full object-contain"
              priority={false}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/40 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-600">
            <Megaphone className="h-4 w-4" />
            Featured Flyer
          </div>

          <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Stay close to the moments that bring DMC together.
          </h2>

          <div className="dmc-card-solid mt-8 border p-6">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-black">
                {featured.type}
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-yellow-600">
                <CalendarDays className="h-4 w-4" />
                {featured.date}
              </span>
            </div>

            <h3 className="text-3xl font-black">{featured.title}</h3>
            <p className="dmc-muted mt-4 text-lg leading-8">{featured.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#calendar"
                className="inline-flex items-center justify-center gap-3 bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-black hover:text-white"
              >
                View Calendar
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-3 border border-[var(--dmc-border)] px-6 py-4 font-black transition hover:border-yellow-400 hover:text-yellow-500"
              >
                See Event Photos
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlyerPost;
