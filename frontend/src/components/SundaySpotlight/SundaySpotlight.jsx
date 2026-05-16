'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import flyerImage from '../../assets/SundaySpotlight/SundaySpotlight10.jpg';

const SundaySpotlight = () => {
  return (
    <section className="dmc-panel-section relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.a
          href="https://www.instagram.com/p/DUgykNvEvJc/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="absolute -left-4 -top-4 h-full w-full border border-yellow-300" />
          <img
            src={flyerImage.src}
            alt="DMC Sunday Spotlight Flyer"
            className="relative w-full object-cover transition duration-500 group-hover:scale-[1.015]"
          />
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mb-6 inline-flex items-center gap-3 border border-yellow-300/30 bg-white/[0.04] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-300">
            <Award className="h-4 w-4" />
            Sunday Spotlight
          </div>

          <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Celebrating member wins as loudly as the work that made them happen.
          </h2>
          <p className="dmc-muted mt-6 max-w-3xl text-lg leading-8 md:text-xl">
            This week&apos;s spotlight is Deven Martino, who will be starting a role
            as a Discover Analyst with the Federal Reserve Bank in Richmond, VA.
          </p>

          <blockquote className="mt-8 border-l-4 border-yellow-300 pl-6 text-lg leading-8 text-yellow-100">
            Joining DMC was one of the best decisions I made at VCU. The mentorship,
            lessons, and connections I&apos;ve gained have shaped who I am today.
          </blockquote>

          <a
            href="https://www.instagram.com/p/DUgykNvEvJc/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-white"
          >
            View Spotlight
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SundaySpotlight;
