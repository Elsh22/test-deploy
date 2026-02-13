'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PhilosophyImg from '../../assets/Miscellaneous/Phil.jpg';

const DMCPhilosophy = ({ id = 'philosophy' }) => {
  return (
    <section
      id={id}
      className="relative flex flex-col md:flex-row items-center justify-between bg-black text-white px-6 md:px-16 py-16 md:py-24 gap-10 md:gap-16 overflow-hidden"
    >
      {/* Top gold bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" />

      {/* Left: Text */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
      >

        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 relative">
          Philosophy
          <span className="absolute left-1/2 md:left-0 -bottom-2 transform -translate-x-1/2 md:translate-x-0 w-24 h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 rounded-full"></span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="text-lg md:text-xl leading-relaxed text-gray-200 max-w-2xl"
        >
          <span className="font-extrabold text-yellow-400">DMC</span> is committed to empowering men of color at VCU to become stronger students, leaders, and community servants. We believe in creating a brotherhood that pushes each member toward academic excellence, professional growth, and personal development.

Our philosophy centers on breaking negative stereotypes and redefining expectations placed on men of color in higher education. Through mentorship, service, and accountability, we strive to build a community that uplifts one another and leaves a lasting impact both on campus and beyond.
        </motion.p>

        
      </motion.div>

 {/* Right: Square image (no glow, no crop) */}
<motion.div
  initial={{ opacity: 0, scale: 0.98 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  className="w-full md:w-1/2 flex justify-center md:justify-end"
>
  <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px] overflow-hidden">
    <Image
      src={PhilosophyImg}
      alt="DMC Philosophy"
      fill
      sizes="(max-width: 768px) 320px, (max-width: 1024px) 420px, 520px"
      className="object-cover grayscale"
    />
  </div>
</motion.div>




      {/* Bottom gold bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400" />
    </section>
  );
};

export default DMCPhilosophy;
