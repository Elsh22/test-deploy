'use client';

import { motion } from 'framer-motion';
import { Dumbbell, ShieldCheck, Trophy } from 'lucide-react';

function SportsAbout() {
  const points = [
    { icon: Trophy, title: 'Compete' },
    { icon: ShieldCheck, title: 'Build discipline' },
    { icon: Dumbbell, title: 'Grow together' },
  ];

  return (
    <section className="dmc-light-section px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-600">
            DMC Sports
          </p>
          <h2 className="text-4xl font-black leading-tight md:text-6xl">
            Athletic competition with brotherhood at the center.
          </h2>
          <p className="dmc-muted mt-6 text-lg leading-8 md:text-xl">
            DMC Sports gives members a competitive, inclusive environment to build
            relationships through basketball, soccer, dodgeball, flag football, and
            more. The work is bigger than the scoreboard: confidence, discipline,
            and community carry off the field too.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {points.map(({ icon: Icon, title }, index) => (
            <motion.div
              key={title}
              className="dmc-card-solid border p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <Icon className="mb-5 h-8 w-8 text-yellow-500" />
              <h3 className="text-2xl font-black">{title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SportsAbout;
