'use client';

import React from 'react';
import { motion } from 'framer-motion';
import IMG from '../../newassest/updatedcollegeday.jpg';
import styles from '../../styles';
import { startingFeatures } from '../../constants/index';
import { staggerContainer, fadeIn, planetVariants } from '../../utils/motion';
import { TitleText, TypingText } from '../../utils/CustomText';

// StartSteps component
const StartSteps = ({ number, text }) => (
  <div className="flex items-start gap-4">
    <div className="text-yellow-400 font-bold text-lg sm:text-xl">{number}</div>
    <p className="text-yellow-400 text-base sm:text-lg">{text}</p>
  </div>
);

const Mentorship = ({ id }) => (
  <section
    id={id}
    className={`${styles.paddings} bg-black border-t-4 border-b-4 border-yellow-400`}
  >
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      {/* Image Section */}
      <motion.div
        variants={planetVariants('left')}
        className={`flex-1 ${styles.flexCenter}`}
      >
        <div className="w-full lg:w-[90%] h-full lg:h-[90%] rounded-2xl border-4 border-yellow-400 overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.3)]">
          <img
            src={IMG.src}
            alt="Get Started"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>

      {/* Text & Steps Section */}
      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] flex justify-center flex-col text-center lg:text-left"
      >
        <TypingText
          title="How To Join Mentoring"
          textStyles="text-yellow-400 text-3xl lg:text-4xl font-semibold mb-2"
        />
        <TitleText
          title={
            <p className="text-white text-3xl lg:text-4xl mb-4">
              Get started with just a few Steps
            </p>
          }
        />

        <div className="mt-6 flex flex-col max-w-[370px] gap-6 mx-auto lg:mx-0">
          {startingFeatures.map((feature, index) => (
            <StartSteps
              key={feature}
              number={`${index < 10 ? '0' : ''}${index + 1}`}
              text={feature}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default Mentorship;
