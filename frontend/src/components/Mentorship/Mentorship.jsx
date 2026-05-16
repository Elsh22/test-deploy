'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import IMG from '../../newassest/updatedcollegeday.jpg';
import { startingFeatures } from '../../constants/index';

const Mentorship = ({ id }) => (
  <section id={id} className="bg-[#0a0a0a] px-6 py-24 text-white sm:px-8 lg:px-12">
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative"
      >
        <div className="absolute -left-4 -top-4 h-full w-full border border-yellow-300" />
        <img
          src={IMG.src}
          alt="DMC college mentoring event"
          className="relative aspect-[4/3] w-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-300">
          Mentorship
        </p>
        <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
          Get connected with mentors who help you move with confidence.
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
          Mentorship gives members a clear path into the organization, campus
          resources, leadership, and practical support from people who care.
        </p>

        <div className="mt-8 grid gap-4">
          {startingFeatures.map((feature, index) => (
            <motion.div
              key={feature}
              className="flex items-start gap-4 border border-white/10 bg-white/[0.04] p-5"
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-yellow-300" />
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-gray-500">
                  Step {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-1 text-lg font-black text-white">{feature}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <a
          href="#contact"
          className="mt-8 inline-flex items-center gap-3 bg-yellow-400 px-6 py-4 font-black text-black transition hover:bg-white"
        >
          Ask About Mentorship
          <ArrowRight className="h-5 w-5" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default Mentorship;
