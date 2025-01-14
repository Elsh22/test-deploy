'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TypingText } from '../../utils/CustomText';
import IMG1 from '../../newassest/Ourmissionpicture.jpg';
import styles from '../../styles/index';
import { fadeIn, staggerContainer } from '../../utils/motion';

const Mission = ({ id }) => {
  const goals = [
    "Foster academic excellence through mentorship, study groups, and educational resources",
    "Build professional networks through industry connections and career development workshops",
    "Strengthen community bonds through service projects and social events",
    "Promote leadership development and personal growth opportunities"
  ];

  return (
    <div
      id={id}
      className="relative flex flex-col md:flex-row items-center justify-center gap-8 p-5 overflow-hidden"
    >
      {/* Background Animation */}
      <motion.div
        initial={{ backgroundPosition: '0% 0%' }}
        whileInView={{ backgroundPosition: '100% 50%' }}
        transition={{ duration: 4, ease: 'linear' }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-700 via-gray-900 to-black opacity-50 -z-10"
      ></motion.div>

      {/* Image Section */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="w-full md:w-1/2 flex justify-center"
      >
        <motion.img
          src={IMG1.src}
          alt="Our Mission"
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.05 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-[80%] md:w-[90%] h-auto object-contain rounded-lg shadow-xl"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={staggerContainer(0.2, 0.3)}
        className="w-full md:w-1/2 text-center md:text-left space-y-6"
      >
        <TypingText title="Our Mission" textStyles="text-3xl md:text-4xl font-bold mb-4" />

        {/* Mission Statement */}
        <motion.p
          variants={fadeIn('up', 'tween', 0.3, 1)}
          className="text-secondary-black text-lg md:text-xl leading-relaxed mb-6"
        >
          <span className="font-extrabold text-theme">DMC</span> empowers men of color through 
          community, education, and leadership development, creating a supportive brotherhood 
          that fosters academic excellence and professional growth while serving our community.
        </motion.p>

        {/* Goals List */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.4, 1)}
          className="space-y-4"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Our Goals</h3>
          <ul className="space-y-3">
            {goals.map((goal, index) => (
              <motion.li
                key={index}
                variants={fadeIn('up', 'tween', 0.5 + index * 0.1, 1)}
                className="flex items-start space-x-2 text-left"
              >
                <span className="text-theme mt-1">•</span>
                <span className="text-secondary-black text-lg">{goal}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Mission;



/*<img
              src={IMG1.src}
              alt="Developing Men of Color"
              className="w-[80%] md:w-[90%] h-auto object-contain" // Adjusted for responsiveness
            >*/