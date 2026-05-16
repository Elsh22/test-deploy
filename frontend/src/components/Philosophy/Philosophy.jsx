'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PhilosophyImg from '../../assets/Miscellaneous/Phil.jpg';
import { Compass, Sparkles, UsersRound } from 'lucide-react';

const DMCPhilosophy = ({ id = 'philosophy' }) => {
  const principles = [
    { icon: UsersRound, title: 'Brotherhood', text: 'A trusted circle that pushes each member to keep growing.' },
    { icon: Compass, title: 'Accountability', text: 'A culture of showing up, following through, and leading well.' },
    { icon: Sparkles, title: 'Legacy', text: 'Impact that reaches campus, Richmond, and the next class of leaders.' },
  ];

  return (
    <section
      id={id}
      className="dmc-panel-section relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-300">
            DMC's Philosophy
          </p>
          <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Redefining expectations through mentorship, service, and excellence.
          </h2>
          <p className="dmc-muted mt-6 max-w-3xl text-lg leading-8 md:text-xl">
            DMC is committed to empowering men of color at VCU to become stronger students, leaders, and community servants. We believe in creating a brotherhood that pushes each member toward academic excellence, professional growth, and personal development. Our philosophy centers on breaking negative stereotypes and redefining expectations placed on men of color in higher education. Through mentorship, service, and accountability, we strive to build a community that uplifts one another and leaves a lasting impact both on campus and beyond.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }) => (
              <div key={title} className="dmc-card border p-5">
                <Icon className="mb-4 h-7 w-7 text-yellow-300" />
                <h3 className="text-lg font-black">{title}</h3>
                <p className="dmc-muted mt-2 text-sm leading-6">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative aspect-[4/5] overflow-hidden border border-white/10"
        >
          <Image
            src={PhilosophyImg}
            alt="DMC Philosophy"
            fill
            sizes="(max-width: 1024px) 100vw, 520px"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default DMCPhilosophy;
