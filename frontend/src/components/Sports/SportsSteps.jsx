'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { StartStepsSports } from '@/constants/index';

const SportsSteps = () => {
  return (
    <section className="dmc-dark-section px-6 pb-24 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="overflow-hidden border border-[var(--dmc-border)] bg-black"
        >
          <div className="relative aspect-video">
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src="https://www.youtube.com/embed/Awud3NiZkV4?si=Kkn2twKuj8N5r0m1"
              title="DMC Sports video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-400">
            How to join
          </p>
          <h2 className="text-4xl font-black leading-tight md:text-5xl">
            Get on the roster in three steps.
          </h2>

          <div className="mt-8 grid gap-4">
            {StartStepsSports.map((feature, index) => (
              <div key={feature} className="dmc-card flex items-start gap-4 border p-5">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-yellow-400" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-500">
                    Step {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="dmc-muted mt-1 text-lg font-bold">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SportsSteps;
