'use client';

import { motion } from 'framer-motion';
import { Code2, GraduationCap, HandHeart, Stethoscope, UsersRound, Wrench } from 'lucide-react';

const committees = [
  { icon: GraduationCap, title: 'Academic' },
  { icon: Wrench, title: 'Professional' },
  { icon: HandHeart, title: 'Community' },
  { icon: Code2, title: 'Technology' },
  { icon: UsersRound, title: 'Social' },
  { icon: Stethoscope, title: 'Health' },
];

const CommitteeAbout = ({ id }) => (
  <section id={id} className="relative overflow-hidden bg-white px-6 py-24 text-black sm:px-8 lg:px-12">
    <div className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-4xl"
      >
        <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-600">
          Committees
        </p>
        <h2 className="text-4xl font-black leading-tight md:text-6xl">
          Every member can find a lane, build skill, and lead.
        </h2>
        <p className="mt-6 text-lg leading-8 text-neutral-700 md:text-xl">
          DMC committees turn interest into action. Members organize programs,
          strengthen academic support, create community service opportunities, build
          technical projects, and make the brotherhood feel alive week to week.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {committees.map(({ icon: Icon, title }, index) => (
          <motion.div
            key={title}
            className="border border-neutral-200 bg-neutral-50 p-6 transition hover:border-yellow-400 hover:bg-yellow-50"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.06, ease: 'easeOut' }}
          >
            <Icon className="mb-5 h-8 w-8 text-yellow-600" />
            <h3 className="text-2xl font-black">{title}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CommitteeAbout;
