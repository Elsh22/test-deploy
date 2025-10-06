'use client';
import React from "react";
import { motion } from "framer-motion";
import flyerImage from "../../assets/SundaySpotlight/SundaySpotlight2.jpg";
import { fadeIn, staggerContainer, planetVariants } from "../../utils/motion";

const SundaySpotlight = () => {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="relative bg-black text-white py-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-center gap-12 overflow-hidden"
    >
      {/* Top Gold Accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" />

      {/* Flyer */}
      <motion.a
        variants={planetVariants("left")}
        href="https://www.instagram.com/p/DPJt95Ojab2/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 relative group"
      >
        <img
          src={flyerImage.src}
          alt="DMC Sunday Spotlight Flyer"
          className="rounded-2xl shadow-[0_0_40px_rgba(255,215,0,0.3)] border-4 border-yellow-400 max-w-md md:max-w-lg transition-transform duration-300 group-hover:scale-105"
        />
        {/* Optional glowing shadow */}
        <div className="absolute inset-0 rounded-2xl shadow-[0_0_50px_rgba(255,215,0,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </motion.a>

      {/* Text */}
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="text-left md:text-left max-w-md flex flex-col gap-4"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
          DMC Sunday Spotlight
        </h2>
        <p className="text-lg text-gray-200">
          DMC congratulates Clyde Clark III on their role as Chairmen’s Intern for the DPVA (Democratic Party of Virginia)!
        </p>
        <p className="text-lg text-gray-200">
          More words from Clyde:
        </p>
        <p className="text-lg text-yellow-300 italic">
          “I am grateful for the skills and experiences I have gained through DMC and my college journey, as they have both played a major role in helping me earn this internship opportunity. DMC has pushed me to grow as a leader and hold myself to higher standards, while my college experience has strengthened my academic foundation and prepared me for professional growth.
        </p>
        <p className="text-lg text-yellow-300 italic">
          I look forward to taking full advantage of this internship, not only by contributing my best work but also by networking with others and learning as much as possible. Just as importantly, I hope to bring back what I learn and share my knowledge and experiences with my DMC peers, so that we can all continue to grow as a student org.”
        </p>
      </motion.div>

      {/* Bottom Gold Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400" />
    </motion.section>
  );
};

export default SundaySpotlight;
