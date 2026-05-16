'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, HandHeart } from 'lucide-react';
import DMCImg from '../../assets/GBMs/DSC00634.jpg';

const NonProfitCard = () => {
  return (
    <section className="dmc-light-section px-6 py-24 sm:px-8 lg:px-12">
      <motion.div
        className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="relative">
          <div className="absolute -left-4 -top-4 h-full w-full border border-yellow-400" />
          <Image
            src={DMCImg}
            alt="DMC nonprofit community event"
            className="relative aspect-[4/3] w-full object-cover"
            priority={false}
          />
        </div>

        <div>
          <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/40 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-600">
            <Building2 className="h-4 w-4" />
            Nonprofit arm
          </div>
          <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            DMC&apos;s impact continues beyond campus.
          </h2>
          <p className="dmc-muted mt-6 max-w-3xl text-lg leading-8 md:text-xl">
            The DMC Nonprofit focuses on empowering youth, providing community
            resources, and supporting local initiatives that help young leaders grow.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://dmcnonprofit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-black hover:text-white"
            >
              Learn More
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 border border-current px-6 py-4 font-black transition hover:border-yellow-400 hover:text-yellow-500"
            >
              Partner With DMC
              <HandHeart className="h-5 w-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NonProfitCard;
