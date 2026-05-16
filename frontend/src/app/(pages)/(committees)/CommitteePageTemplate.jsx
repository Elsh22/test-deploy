'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, UsersRound } from 'lucide-react';

const CommitteePageTemplate = ({
  eyebrow,
  title,
  subtitle,
  heroImage,
  heroAlt,
  groupMeLink,
  groupMeLabel = 'Join GroupMe',
  focusAreas = [],
  programs = [],
}) => {
  const gallery = programs.filter((program) => program.img);

  return (
    <main className="dmc-dark-section">
      <section className="relative min-h-screen overflow-hidden px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <Image
          src={heroImage}
          alt={heroAlt || title}
          fill
          priority
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.78)_48%,rgba(0,0,0,0.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[var(--dmc-bg)] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-center">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/35 bg-black/35 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-yellow-300">
              <UsersRound className="h-4 w-4" />
              {eyebrow}
            </div>
            <h1 className="text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-8xl">
              {title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-200 md:text-xl">
              {subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              {groupMeLink && (
                <a
                  href={groupMeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-yellow-400 px-7 py-4 text-lg font-black text-black transition hover:bg-white"
                >
                  {groupMeLabel}
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              )}
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-3 border border-white/25 bg-white/10 px-7 py-4 text-lg font-black text-white backdrop-blur transition hover:border-yellow-300 hover:text-yellow-300"
              >
                Explore Programs
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="dmc-light-section px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="grid gap-4 md:grid-cols-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {focusAreas.map((area) => (
              <div key={area} className="dmc-card-solid border p-6">
                <CheckCircle2 className="mb-5 h-8 w-8 text-yellow-500" />
                <h2 className="text-2xl font-black">{area}</h2>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="programs" className="dmc-panel-section px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-400">
                Programs
              </p>
              <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                What this committee builds.
              </h2>
            </div>
            <p className="dmc-muted max-w-md text-lg leading-8">
              Each program gives members a practical way to serve, lead, learn, and
              bring DMC&apos;s mission into motion.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {programs.map((program, index) => (
              <motion.article
                key={program.title}
                className="dmc-card group overflow-hidden border"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <Image
                    src={program.img}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black">{program.title}</h3>
                  <p className="dmc-muted mt-3 leading-7">{program.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="dmc-light-section px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-600">
                Gallery
              </p>
              <h2 className="text-4xl font-black leading-tight md:text-5xl">
                Committee moments.
              </h2>
            </div>
            <Link href="/gallery" className="inline-flex items-center gap-3 font-black text-yellow-600">
              View full gallery
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {gallery.map((program, index) => (
              <motion.div
                key={`${program.title}-gallery`}
                className={`relative overflow-hidden border border-[var(--dmc-border)] ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <div className={`${index === 0 ? 'aspect-[16/10] md:aspect-[4/3]' : 'aspect-[4/3]'} relative`}>
                  <Image
                    src={program.img}
                    alt={`${program.title} gallery image`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CommitteePageTemplate;
