'use client';
import React from "react";
import { motion } from "framer-motion";
import flyerImage from "../../assets/SundaySpotlight/SundaySpotlight5.jpg";
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
        href="https://www.instagram.com/p/DQR0jkXETN0/"
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
        This week’s Sunday Spotlight is none other than Sean Goffigan, who recently accepted their internship offer to work as an Investment Advisor with Heritage Wealth Advisors. We celebrate this achievement with you!</p>
        <p className="text-lg text-gray-200">
         More words from Sean:
        </p>
        <p className="text-lg text-yellow-300 italic">
        “Being in DMC has pushed me to new heights by giving me the resources to grow as a professional.
I’ll be starting my Investment Advisory Internship with Heritage Wealth Advisors where I will be helping the portfolio manager research and manage client assets while receiving training on a variety of financial
topics including private equity.        </p>
        <p className="text-lg text-yellow-300 italic">
         What has impressed me the most about DMC is being surrounded by men who have succeeded before, showing you that it is also possible for yourself. By talking to DMC members and learning from them and their experiences, as well as the workshops held by DMC I have gained invaluable insight that is continuing to shape my professional career today.”        </p>
      </motion.div>

      {/* Bottom Gold Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400" />
    </motion.section>
  );
};

export default SundaySpotlight;
