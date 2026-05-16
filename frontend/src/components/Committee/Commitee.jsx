'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Grid3X3, UsersRound } from 'lucide-react';
import { exploreWorlds } from '../../constants';

const Commitee = () => {
  const committees = useMemo(
    () =>
      exploreWorlds.map((item) => ({
        ...item,
        isExternal: item.Buttonlink?.startsWith('http'),
      })),
    []
  );

  const [activeId, setActiveId] = useState(committees[0]?.id);
  const activeCommittee = committees.find((committee) => committee.id === activeId) || committees[0];

  return (
    <section className="dmc-dark-section px-6 py-24 sm:px-8 lg:px-12" id="explore">
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
              <Grid3X3 className="h-4 w-4" />
              Committee Directory
            </div>
            <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Find the lane where you want to lead.
            </h2>
          </div>
          <p className="dmc-muted max-w-md text-lg leading-8">
            Explore committees, see what each group works on, and jump directly into
            the refreshed committee pages or GroupMe.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {committees.map((committee, index) => (
              <motion.button
                key={committee.id}
                onClick={() => setActiveId(committee.id)}
                className={`dmc-card flex items-center justify-between border p-5 text-left transition hover:border-yellow-400 ${
                  activeId === committee.id ? 'border-yellow-400 bg-yellow-400/10' : ''
                }`}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
              >
                <span>
                  <span className="block text-lg font-black">{committee.title}</span>
                  {committee.Chairman && (
                    <span className="dmc-muted mt-1 block text-sm font-bold">{committee.Chairman}</span>
                  )}
                </span>
                <ArrowRight className={`h-5 w-5 text-yellow-400 transition ${activeId === committee.id ? 'translate-x-1' : ''}`} />
              </motion.button>
            ))}
          </div>

          <div className="dmc-card-solid overflow-hidden border">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCommittee.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.28 }}
              >
                <div className="relative min-h-[460px] overflow-hidden">
                  <Image
                    src={activeCommittee.imgUrl}
                    alt={activeCommittee.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="mb-4 inline-flex items-center gap-3 bg-yellow-400 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-black">
                      <UsersRound className="h-4 w-4" />
                      Active Committee
                    </div>
                    <h3 className="max-w-2xl text-4xl font-black leading-tight text-white md:text-6xl">
                      {activeCommittee.title}
                    </h3>
                    {activeCommittee.text && (
                      <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-200">
                        {activeCommittee.text}
                      </p>
                    )}

                    <Link
                      href={activeCommittee.Buttonlink}
                      target={activeCommittee.isExternal ? '_blank' : undefined}
                      rel={activeCommittee.isExternal ? 'noopener noreferrer' : undefined}
                      className="mt-7 inline-flex items-center gap-3 bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-white"
                    >
                      {activeCommittee.isExternal ? 'Open GroupMe' : 'Learn More'}
                      {activeCommittee.isExternal ? <ExternalLink className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commitee;
