'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import img1 from '../../assets/DMCMIXER8/DMC_MIXER_PHOTO.jpg';

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
