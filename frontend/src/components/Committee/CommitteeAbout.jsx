'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../../utils/CustomText';
import styles from '../../styles/index';
import { fadeIn, staggerContainer } from '../../utils/motion';

const CommitteeAbout = ({ id }) => (
  <section id={id} className={`${styles.paddings} relative bg-black text-white py-24`}>
    {/* Gold top accent bar */}
    <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" />

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col gap-8`}
    >
      {/* Section Title */}
      <TypingText 
        title="About Committees" 
        textStyles="text-center font-extrabold text-5xl md:text-6xl text-yellow-400 drop-shadow-lg" 
      />

      {/* Divider */}
      <div className="w-28 h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 rounded-full mx-auto" />

      {/* Description */}
      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-6 text-center text-gray-200 text-lg md:text-xl leading-relaxed max-w-4xl"
      >
        At the heart of <span className="font-semibold text-yellow-400">Developing Men of Color</span> are our diverse committees, each with a unique focus but united in empowering and supporting our members. From academic assistance to professional development, community service, and technological innovation, our committees provide resources, opportunities, and a nurturing environment.
      </motion.p>

      <motion.p
        variants={fadeIn('up', 'tween', 0.3, 1)}
        className="text-center text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl"
      >
        They play a crucial role in helping members succeed academically, professionally, and socially, while actively contributing to the betterment of our community and embracing cutting-edge technologies.
      </motion.p>
    </motion.div>

    {/* Gold bottom accent bar */}
    <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400" />
  </section>
);

export default CommitteeAbout;

//<span className="font-extrabold theme-text">Our Committees: </span>
