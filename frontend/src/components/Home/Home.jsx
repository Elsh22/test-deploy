'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import img1 from '../../assets/DMCMIXER8/DMC_MIXER_PHOTO.jpg';
import { Users, GraduationCap, Calendar } from 'lucide-react';

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
  return (
    <section
      id={id}
      className="relative w-full h-screen overflow-hidden font-home text-white"
    >
      {/* Background Image */}
      <Image
        src={img1}
        alt="Developing Men of Color"
        fill
        className="object-cover brightness-90"
        priority
      />

      {/* Dark + Gold Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-transparent to-yellow-600/10" />

      {/* Top Stats Bar */}
      <motion.div
        className="absolute top-24 md:top-32 left-0 w-full px-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10">
            {/* Stat 1 */}
            <div className="flex items-center gap-3">
              <Users className="h-7 w-7 text-yellow-400" />
              <div className="leading-tight">
                <div className="text-yellow-400 font-extrabold text-3xl sm:text-4xl">
                  <CountUp end={900} suffix="+" />
                </div>
                <div className="text-gray-200 text-sm sm:text-base tracking-wide">
                  Active Members
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3">
              <GraduationCap className="h-7 w-7 text-yellow-400" />
              <div className="leading-tight">
                <div className="text-yellow-400 font-extrabold text-3xl sm:text-4xl">
                  <CountUp end={400} suffix="+" />
                </div>
                <div className="text-gray-200 text-sm sm:text-base tracking-wide">
                  Alumni Graduates
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3">
              <Calendar className="h-7 w-7 text-yellow-400" />
              <div className="leading-tight">
                <div className="text-yellow-400 font-extrabold text-3xl sm:text-4xl">
                  <CountUp end={8} />
                </div>
                <div className="text-gray-200 text-sm sm:text-base tracking-wide">
                  Years Since Founded
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Text + Button Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-8">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight"
          style={{
            color: '#FFD700',
            textShadow: '0 0 25px rgba(255, 215, 0, 0.8)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Developing Men of Color
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-gray-200 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          Excellence is our Standard.
        </motion.p>

        <motion.button
          onClick={() =>
            window.open('https://vcu.campusgroups.com/DMC/club_signup', '_blank')
          }
          className="mt-6 px-10 py-4 text-2xl font-bold rounded-full border-2 border-yellow-500 
                     bg-black/80 text-yellow-400 hover:bg-yellow-500 hover:text-black
                     transition-all duration-300 shadow-lg hover:shadow-yellow-500/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
        >
          Join RamsConnect
        </motion.button>
      </div>
    </section>
  );
};

export default Home;
