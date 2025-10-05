"use client";
import React from "react";
import { motion } from "framer-motion";
import flyerImage from "../../assets/SundaySpotlight/SundaySpotlight1.jpg";
import { fadeIn, staggerContainer, planetVariants } from "../../utils/motion";
import styles from "../../styles";

const SundaySpotlight = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }} // 👈 replays every scroll
      className="relative bg-black text-white py-12 px-6 flex flex-col md:flex-row items-center justify-center gap-10 overflow-hidden z-0"
    >
      {/* Gold Gradient Background from Below */}
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-yellow-500/40 to-transparent pointer-events-none"></div>

      {/* Flyer (left side, slides in from left) */}
      <motion.a
        variants={planetVariants("left")}
        href="https://www.instagram.com/p/DPJt95Ojab2/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0"
      >
        <img
          src={flyerImage.src}
          alt="DMC Sunday Spotlight Flyer"
          className="rounded-2xl shadow-lg max-w-sm md:max-w-md hover:scale-105 transition-transform duration-300"
        />
      </motion.a>

      {/* Text (right side, just fades in) */}
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)} // 👈 fade in only
        className="text-left md:text-left max-w-md"
      >
        <p className="mb-4 text-3xl md:text-4xl font-extrabold text-yellow-400">
          DMC Sunday Spotlight
        </p>
        <p className="text-lg text-gray-300">
          DMC congratulates Besufekad Desta on their Internship role at the
          Virginia State Police as a Digital Forensics Intern!
        </p>
        <p className="text-lg text-gray-300 mt-2">More words from Besufekad:</p>
        <p className="text-lg text-gray-300 mt-2 italic">
          “Being part DMC has been one of the most impactful experiences I’ve had
          at VCU. From the very beginning, DMC gave me a strong sense of
          community, a space where I could connect with other men of color who
          understood the challenges and opportunities that come with navigating
          college. The mentorship and support I’ve received through DMC have
          helped me grow both personally and professionally.
        </p>
        <p className="text-lg text-gray-300 mt-2 italic">
          What I appreciate most is how DMC balances brotherhood with
          development. Whether it’s workshops on career preparation, service
          projects that give back to the community, or even just building bonds
          through the different activities, DMC has pushed me to step out of my
          comfort zone and keep improving myself. It’s not just about having a
          network it’s about having a community that challenges you, uplifts you,
          and holds you accountable.”
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SundaySpotlight;

