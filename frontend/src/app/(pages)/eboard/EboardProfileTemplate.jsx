'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, GraduationCap, Linkedin, Mail, Sparkles, UsersRound } from 'lucide-react';

const detailIcons = {
  Major: GraduationCap,
  Class: UsersRound,
  Organizations: BriefcaseBusiness,
  'Future Plans': Sparkles,
  Email: Mail,
};

const EboardProfileTemplate = ({
  name,
  role,
  image,
  linkedin,
  email,
  details = [],
  highlight,
}) => {
  return (
    <main className="dmc-dark-section min-h-screen px-6 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/eboard"
          className="mb-8 inline-flex items-center gap-3 font-black text-yellow-400 transition hover:text-yellow-300"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to E-Board
        </Link>

        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -left-4 -top-4 h-full w-full border border-yellow-400" />
            <div className="relative aspect-[4/5] overflow-hidden bg-black">
              <Image
                src={image}
                alt={name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/35 bg-black/35 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-yellow-300">
              <UsersRound className="h-4 w-4" />
              DMC Leadership
            </div>

            <h1 className="text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">
              {name}
            </h1>
            <p className="mt-4 text-2xl font-black text-yellow-400 md:text-3xl">{role}</p>

            {highlight && (
              <p className="dmc-muted mt-6 max-w-3xl text-lg leading-8 md:text-xl">
                {highlight}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-white"
                >
                  LinkedIn
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center gap-3 border border-[var(--dmc-border)] px-6 py-4 font-black transition hover:border-yellow-400 hover:text-yellow-400"
                >
                  Email
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              )}
            </div>

            <div className="mt-10 grid gap-4">
              {details.map((detail) => {
                const Icon = detailIcons[detail.label] || Sparkles;
                return (
                  <div key={detail.label} className="dmc-card border p-5">
                    <div className="flex items-start gap-4">
                      <Icon className="mt-1 h-6 w-6 shrink-0 text-yellow-400" />
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-500">
                          {detail.label}
                        </p>
                        <p className="dmc-muted mt-1 text-lg leading-7">{detail.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default EboardProfileTemplate;
