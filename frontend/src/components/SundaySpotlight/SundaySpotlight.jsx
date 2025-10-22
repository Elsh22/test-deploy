'use client';
import React from "react";
import { motion } from "framer-motion";
import flyerImage from "../../assets/SundaySpotlight/SundaySpotlight4.jpg";
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
        href="https://www.instagram.com/vcu.dmc/p/DP_ysoWDYDJ/"
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
         This week’s Sunday Spotlight is a unique one, a CO-OP! Take a few moments to congratulate our nominee, Hassan Elshowaya and learn more!
        </p>
        <p className="text-lg text-gray-200">
          More words from Hassan:
        </p>
        <p className="text-lg text-yellow-300 italic">
        “Developing Men of Color really helped me build real connections and meet the right people who pushed me to grow. I learned a lot from talking with others who were already doing what I wanted to do. Those connections and conversations helped open the door for my co-op with Newport News Shipbuilding.        </p>
        <p className="text-lg text-yellow-300 italic">
         This unique experience provided a rigorous foundation in executing mission-critical objectives within a highly controlled operational environment. I cultivated a skill set defined by acute critical analysis, a deep commitment to information integrity and security protocol, and the ability to master complex, proprietary systems under pressure. The role fundamentally strengthened my capacity for professional adaptability and concise, high-impact reporting to key stakeholders, preparing me for environments demanding absolute discretion and elevated performance standards.”        </p>
      </motion.div>

      {/* Bottom Gold Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400" />
    </motion.section>
  );
};

export default SundaySpotlight;
