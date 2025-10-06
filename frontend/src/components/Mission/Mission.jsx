'use client';
import React from "react";
import { motion } from "framer-motion";
import { TypingText } from "../../utils/CustomText";
import IMG1 from "../../assets/DMCMIXER8/DMCMIXER17.jpg";
import { fadeIn, staggerContainer } from "../../utils/motion";

const Mission = ({ id }) => {
  return (
    <section
      id={id}
      className="relative flex flex-col md:flex-row items-center justify-between bg-black text-white px-6 md:px-16 py-16 md:py-24 gap-10 md:gap-16 overflow-hidden"
    >
      {/* Top gold bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" />

      {/* Left: Image (no transition) */}
      <div className="flex justify-center w-full md:w-1/2">
        <img
          src={IMG1.src}
          alt="Developing Men of Color"
          className="rounded-2xl shadow-[0_0_40px_rgba(255,215,0,0.2)] hover:shadow-[0_0_60px_rgba(255,215,0,0.6)] transition-all duration-500 w-[100%] md:w-[100%] h-auto object-cover"
        />
      </div>

      {/* Right: Text */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
      >
        <TypingText
          title="DMC Leadership"
          textStyles="font-semibold text-yellow-400 text-3xl md:text-4xl mb-3"
        />

        <motion.h2
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="text-4xl md:text-5xl font-extrabold mb-4 relative"
        >
          Our Mission
          <span className="absolute left-1/2 md:left-0 -bottom-2 transform -translate-x-1/2 md:translate-x-0 w-24 h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 rounded-full"></span>
        </motion.h2>

        <motion.p
          variants={fadeIn("up", "tween", 0.3, 1)}
          className="text-lg md:text-xl leading-relaxed text-gray-200 max-w-2xl"
        >
          <span className="font-extrabold text-yellow-400">DMC </span>
          was made to create an organization in which men of color can interact and grow as a community, our goal is to equip these individuals with the means and resources needed in order to thrive in the college setting. We plan to do so by providing academic advice from other successful members and faculty, insight into how to navigate the undergraduate years, means to professional development and most importantly, provide a brotherhood of students striving together. By providing a close community of minority men working towards the same goal, this will allow us to connect with incoming college students in order to enlarge our community and bond. A critical aspect of our organization is our commitment to community service, this is shown by our consistent mentoring at nearby underserved public schools, our volunteering in the local Richmond community, and our participation in service events held by other organizations.
        </motion.p>
      </motion.div>

      {/* Bottom gold bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400" />
    </section>
  );
};

export default Mission;


/*<img
              src={IMG1.src}
              alt="Developing Men of Color"
              className="w-[80%] md:w-[90%] h-auto object-contain" // Adjusted for responsiveness
            >*/