'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, HandHeart } from 'lucide-react';
import VACU from '../../assets/DonorLogos/VACU.png';
import VCUF from '../../assets/DonorLogos/vcu-foundations-logo-rev-outlines.png';
import HX from '../../assets/DonorLogos/eta-xi-sucks.png';

const Donor = () => {
  return (
    <section className="dmc-dark-section relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute inset-0 donor-img bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />

      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div>
          <div className="mb-6 inline-flex items-center gap-3 border border-yellow-300/30 bg-white/[0.05] px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-300">
            <HandHeart className="h-4 w-4" />
            Support the mission
          </div>
          <h2 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Fund the next generation of leaders, mentors, and community builders.
          </h2>
          <p className="dmc-muted mt-6 max-w-3xl text-lg leading-8 md:text-xl">
            Your support helps DMC provide resources, mentorship, service opportunities,
            professional development, and spaces where men of color can thrive.
          </p>

          <Link
            href="/Donor"
            className="mt-8 inline-flex items-center gap-3 bg-yellow-400 px-7 py-4 text-lg font-black text-black transition hover:bg-white"
          >
            Donate
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="dmc-card border p-6 backdrop-blur">
          <p className="dmc-muted mb-6 text-sm font-black uppercase tracking-[0.22em]">
            Notable donors
          </p>
          <div className="grid grid-cols-2 gap-6">
            <Image src={VACU} alt="Virginia Credit Union" className="h-24 w-full object-contain opacity-90" />
            <Image src={VCUF} alt="VCU Foundation" className="h-24 w-full object-contain opacity-90" />
            <Image src={HX} alt="Eta Xi" className="h-24 w-full object-contain opacity-90" />
            <a
              href="https://therac1945.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-24 items-center justify-center border border-white/10 px-4 text-center text-lg font-black transition hover:border-yellow-300 hover:text-yellow-300"
            >
              Tylen Hazard
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Donor;
