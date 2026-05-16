'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  Camera,
  ChevronDown,
  MessageSquareText,
  Stethoscope,
  Wrench,
} from 'lucide-react';
import Picture from '../../newassest/CGIPic.png';

const Professional = ({ id }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <section
      id={id}
      className="dmc-light-section relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-600">
            Professional Academy
          </p>
          <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Career readiness with real feedback and next steps.
          </h2>
          <p className="dmc-muted mt-6 max-w-3xl text-lg leading-8 md:text-xl">
            Members get peer-to-peer career mentoring, resume and LinkedIn feedback,
            headshots, and practical guidance from students who have already moved
            through similar paths.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="dmc-card-solid border p-4">
              <MessageSquareText className="mb-3 h-6 w-6 text-yellow-600" />
              <p className="font-black">Resume and LinkedIn reviews</p>
            </div>
            <div className="dmc-card-solid border p-4">
              <Camera className="mb-3 h-6 w-6 text-yellow-600" />
              <p className="font-black">Professional headshots</p>
            </div>
          </div>

          <div className="mt-8 flex w-full max-w-xl flex-col gap-3">
            <a
              href="https://calendly.com/lewisxm-vcu/new-meeting?month=2025-09"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between bg-yellow-400 px-5 py-4 font-black text-black transition hover:bg-black hover:text-white"
            >
              <span className="inline-flex items-center gap-3">
                <Stethoscope className="h-5 w-5" />
                For Health Tracks
              </span>
              <CalendarCheck className="h-5 w-5" />
            </a>

            <div className="relative">
              <button
                onClick={() => toggleDropdown('tech')}
                className="flex w-full items-center justify-between border border-[var(--dmc-border)] px-5 py-4 text-left font-black transition hover:border-yellow-400"
              >
                <span className="inline-flex items-center gap-3">
                  <Wrench className="h-5 w-5" />
                  For Tech & Engineering
                </span>
                <ChevronDown className="h-5 w-5" />
              </button>
              {openDropdown === 'tech' && (
                <div className="dmc-card-solid absolute left-0 top-full z-10 mt-2 w-full border shadow-xl">
                  <a href="https://calendly.com/elshowayah2-vcu/career-research" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-yellow-400 hover:text-black">
                    Hussein
                  </a>
                  <a href="https://calendly.com/smithjrte-vcu/30min?month=2025-09" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-yellow-400 hover:text-black">
                    Thurman
                  </a>
                  <a href="https://calendly.com/danielnt-vcu/30min" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-yellow-400 hover:text-black">
                    Naod
                  </a>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown('business')}
                className="flex w-full items-center justify-between border border-[var(--dmc-border)] px-5 py-4 text-left font-black transition hover:border-yellow-400"
              >
                For Business Students
                <ChevronDown className="h-5 w-5" />
              </button>
              {openDropdown === 'business' && (
                <div className="dmc-card-solid absolute left-0 top-full z-10 mt-2 w-full border shadow-xl">
                  <a href="https://calendly.com/elshowayah-vcu/lindkln-review" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-yellow-400 hover:text-black">
                    Hassan
                  </a>
                  <a href="https://calendly.com/brownkj7-vcu/30min" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-yellow-400 hover:text-black">
                    Kaleb
                  </a>
                  <a href="http://calendly.com/dwivedysk2-vcu/30min" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-yellow-400 hover:text-black">
                    Sameer
                  </a>
                </div>
              )}
            </div>

            <a
              href="https://calendly.com/gallardogoj-vcu/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between border border-[var(--dmc-border)] px-5 py-4 font-black transition hover:border-yellow-400"
            >
              Book Headshot Session
              <Camera className="h-5 w-5" />
            </a>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScEX4LpYlbbXUhmAqVvxy0SBDk_9m5pcrAdH7XgJxK4rwMl2A/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between border border-[var(--dmc-border)] px-5 py-4 font-black transition hover:border-yellow-400"
            >
              Give Feedback
              <MessageSquareText className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute -right-4 -top-4 h-full w-full border border-yellow-400" />
          <Image
            src={Picture}
            alt="Professional Academy"
            width={1200}
            height={600}
            className="relative aspect-[4/3] w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Professional;
