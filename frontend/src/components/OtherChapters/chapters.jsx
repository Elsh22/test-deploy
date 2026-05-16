'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Network } from 'lucide-react';
import ODU from '../../assets/OtherChapters/ODU.png';
import JMU from '../../assets/OtherChapters/JMU.png';

export default function SchoolsPage() {
  const schools = [
    { name: 'James Madison University', image: JMU, link: 'https://www.instagram.com/jmu.dmc' },
    { name: 'Old Dominion University', image: ODU, link: 'https://www.instagram.com/odu.dmc' },
  ];

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
            <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/40 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
              <Network className="h-4 w-4" />
              Chapter network
            </div>
            <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              DMC is bigger than one campus.
            </h2>
          </div>
          <p className="dmc-muted max-w-md text-lg leading-8">
            Connect with other DMC chapters and watch the network grow across
            Virginia campuses.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {schools.map((school, index) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <Link
                href={school.link}
                target="_blank"
                rel="noopener noreferrer"
                className="dmc-card group flex min-h-72 flex-col items-center justify-center border p-8 text-center transition hover:border-yellow-400"
              >
                <Image
                  src={school.image}
                  alt={school.name}
                  width={180}
                  height={180}
                  className="dmc-invert-on-light object-contain transition group-hover:scale-105"
                />
                <div className="mt-8 inline-flex items-center gap-2 text-2xl font-black">
                  {school.name}
                  <ArrowUpRight className="h-5 w-5 text-yellow-400" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
