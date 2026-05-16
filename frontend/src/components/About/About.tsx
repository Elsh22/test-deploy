'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, UsersRound } from 'lucide-react';
import Eboard from '../../assets/EBOARD2025/EBoard2025.jpg';

const About = () => {
  return (
    <section className="dmc-panel-section px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/40 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
            <Crown className="h-4 w-4" />
            Leadership
          </div>
          <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Meet the board guiding DMC&apos;s next chapter.
          </h2>
          <p className="dmc-muted mt-6 max-w-3xl text-lg leading-8 md:text-xl">
            The E-Board coordinates programs, committees, events, mentorship, media,
            and member support so DMC can keep showing up with excellence.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="dmc-card border p-5">
              <UsersRound className="mb-4 h-7 w-7 text-yellow-400" />
              <p className="text-2xl font-black">14 leaders</p>
              <p className="dmc-muted mt-2 leading-6">Executive, program, communications, wellness, and advisory roles.</p>
            </div>
            <div className="dmc-card border p-5">
              <Crown className="mb-4 h-7 w-7 text-yellow-400" />
              <p className="text-2xl font-black">1 mission</p>
              <p className="dmc-muted mt-2 leading-6">Help men of color thrive at VCU and beyond.</p>
            </div>
          </div>

          <Link
            href="/eboard"
            className="mt-8 inline-flex items-center gap-3 bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-white"
          >
            View E-Board
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute -right-4 -top-4 h-full w-full border border-yellow-400" />
          <Link href="/eboard" className="group relative block overflow-hidden">
            <Image
              src={Eboard}
              alt="DMC E-Board"
              className="relative aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4 text-white">
              <p className="text-2xl font-black">2025-2026 E-Board</p>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-yellow-400 text-black">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
