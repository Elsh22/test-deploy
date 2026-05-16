'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import img1 from '../../assets/DMCMIXER8/DMC_MIXER_PHOTO.jpg';
import img2 from '../../assets/DMCMIXER8/DMCMIXER20.jpg';
import img3 from '../../assets/EBOARD2025/EBoard2025.jpg';
import { ArrowRight, CalendarDays, GraduationCap, Handshake, Users } from 'lucide-react';

function CountUp({ end, duration = 1200, suffix = '' }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const start = performance.now();

        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3);
          const next = Math.round(end * eased);

          setValue(next);

          if (t < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

const Home = ({ id }) => {
  const stats = [
    { icon: Users, value: 900, suffix: '+', label: 'Active members' },
    { icon: GraduationCap, value: 400, suffix: '+', label: 'Alumni graduates' },
    { icon: CalendarDays, value: 8, suffix: '', label: 'Years of impact' },
  ];

  const pillars = ['Brotherhood', 'Mentorship', 'Service', 'Professional growth'];

  return (
    <section
      id={id}
      className="relative min-h-screen w-full overflow-hidden bg-[#070707] font-home text-white"
    >
      <Image
        src={img1}
        alt="DMC members gathered at the annual mixer"
        fill
        className="object-cover opacity-55"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.78)_45%,rgba(0,0,0,0.36)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-14 pt-32 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/30 bg-black/45 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
              <Handshake className="h-4 w-4" />
              VCU student brotherhood
            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Developing Men of Color
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 sm:text-xl">
              A campus community built around academic excellence, professional readiness,
              service, and the kind of brotherhood that keeps students moving forward.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <motion.button
                onClick={() =>
                  window.open('https://vcu.campusgroups.com/DMC/club_signup', '_blank')
                }
                className="inline-flex items-center justify-center gap-3 bg-yellow-400 px-7 py-4 text-lg font-extrabold text-black transition hover:bg-white"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Join RamsConnect
                <ArrowRight className="h-5 w-5" />
              </motion.button>

              <a
                href="#calendar"
                className="inline-flex items-center justify-center border border-white/25 bg-white/10 px-7 py-4 text-lg font-bold text-white backdrop-blur transition hover:border-yellow-300 hover:text-yellow-300"
              >
                View Events
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {pillars.map((pillar) => (
                <span
                  key={pillar}
                  className="border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-gray-100 backdrop-blur"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-[0.85fr_1fr] gap-5">
              <div className="relative mt-16 aspect-[4/5] overflow-hidden border border-white/15">
                <Image
                  src={img2}
                  alt="DMC mixer event highlight"
                  fill
                  sizes="340px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden border border-yellow-300/35">
                <Image
                  src={img3}
                  alt="DMC executive board"
                  fill
                  sizes="420px"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 grid gap-4 border-y border-white/15 bg-black/35 py-5 backdrop-blur md:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35 }}
        >
          {stats.map(({ icon: Icon, value, suffix, label }) => (
            <div key={label} className="flex items-center gap-4 px-2 sm:px-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-yellow-400 text-black">
                <Icon className="h-6 w-6" />
              </div>
              <div className="leading-tight">
                <div className="text-3xl font-black text-yellow-300 sm:text-4xl">
                  <CountUp end={value} suffix={suffix} />
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-300">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
