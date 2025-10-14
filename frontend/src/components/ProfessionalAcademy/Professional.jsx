'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Picture from '../../newassest/CGIPic.png';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { TypingText } from '../../utils/CustomText';

const Professional = ({ id }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <section
      id={id}
      className="relative flex flex-col md:flex-row items-center justify-between bg-black text-white px-6 md:px-16 py-20 md:py-32 gap-12 md:gap-20 overflow-hidden"
    >
      {/* Top gold bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" />

      {/* Left: Text */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
      >
        <TypingText
          title="Professional Academy"
          textStyles="font-semibold text-yellow-400 text-7xl md:text-8xl mb-4"
        />

        {/* First Paragraph */}
        <motion.p
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="text-lg md:text-xl leading-relaxed text-gray-200 mb-6 max-w-2xl"
        >
          At the Professional Academy, we transform career readiness for men of color
          through peer-to-peer mentoring in personalized 30-40 minute sessions. Our
          approach connects students with mentors who've already found success in
          similar paths, creating authentic connections and advice that resonates. In a
          relaxed setting, we help polish resumes with both technical fixes and strategic
          improvements that catch recruiters' eyes. We overhaul LinkedIn profiles on the
          spot and take professional headshots to replace awkward selfies. Our mentors
          share real-world insights about what actually works in job searches, not just
          theory. We've addressed practical barriers by offering free tie rentals and shoe
          shining services because we know these details matter but aren't always
          accessible. Every participant leaves with clear next steps and resources to
          continue their professional growth. We've built a program that bridges the gap
          between classroom learning and workplace success, giving men of color not just
          better documents, but greater confidence and community support as they launch
          their careers.
        </motion.p>

        {/* Dropdown Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto md:mx-0">
          {/* Health */}
          <a
            href="https://calendly.com/lewisxm-vcu/new-meeting?month=2025-09"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg text-center hover:bg-yellow-500 transition-colors"
          >
            For Health Tracks
          </a>

          {/* Tech & Engineering */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('tech')}
              className="w-full px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors text-left"
            >
              For Tech & Engineering ▾
            </button>
            {openDropdown === 'tech' && (
              <div className="absolute top-full left-0 w-full mt-2 bg-black border border-yellow-400 rounded-lg shadow-lg z-10">
                <a
                  href="https://calendly.com/elshowayah2-vcu/career-research"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-yellow-500 hover:text-black transition-colors"
                >
                  Hussein
                </a>
                <a
                  href="http://calendly.com/dwivedysk2-vcu/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-yellow-500 hover:text-black transition-colors"
                >
                  Sameer
                </a>
                <a
                  href="https://calendly.com/smithjrte-vcu/30min?month=2025-09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-yellow-500 hover:text-black transition-colors"
                >
                  Thurman
                </a>
              </div>
            )}
          </div>

          {/* Business */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('business')}
              className="w-full px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors text-left"
            >
              For Business Students ▾
            </button>
            {openDropdown === 'business' && (
              <div className="absolute top-full left-0 w-full mt-2 bg-black border border-yellow-400 rounded-lg shadow-lg z-10">
                <a
                  href="https://calendly.com/elshowayah-vcu/lindkln-review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-yellow-500 hover:text-black transition-colors"
                >
                  Hassan
                </a>
                <a
                  href="https://calendly.com/brownkj7-vcu/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-yellow-500 hover:text-black transition-colors"
                >
                  Kaleb
                </a>
              </div>
            )}
          </div>

          {/* Headshots */}
          <a
            href="https://calendly.com/gallardogoj-vcu/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg text-center hover:bg-yellow-500 transition-colors"
          >
            Book Headshot Session
          </a>

          {/* Feedback Button */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScEX4LpYlbbXUhmAqVvxy0SBDk_9m5pcrAdH7XgJxK4rwMl2A/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg text-center hover:bg-yellow-500 transition-colors"
          >
            Give Feedback
          </a>
        </div>
      </motion.div>

      {/* Right: Image */}
      <div className="flex justify-center w-full md:w-1/2">
        <div className="relative w-[100%] md:w-[100%] rounded-2xl border-4 border-yellow-400 shadow-[0_0_50px_rgba(255,215,0,0.3)]">
          <Image
            src={Picture}
            alt="Professional Academy"
            width={1200}
            height={600}
            className="rounded-2xl object-cover"
          />
        </div>
      </div>

      {/* Bottom gold bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400" />
    </section>
  );
};

export default Professional;
