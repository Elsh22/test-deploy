'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../../utils/CustomText';

import styles from '../../styles/index';
import { fadeIn, staggerContainer } from '../../utils/motion';

const CommitteeAbout = ({ id }) => (
  <section id={id} className={`${styles.paddings} relative`}> 
    <div className="" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="About Committees" textStyles="text-center" />
      <motion.p
      variants={fadeIn('up', 'tween', 0.2, 1)}
      className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-black overflow-x-hidden"
      >
      <span className="font-extrabold text-black">Our Committees: </span>
      At the heart of Developing Men of Color are our diverse committees, each with a unique focus but united in empowering and supporting our members. From academic assistance to professional development, community service, and technological innovation, our committees are dedicated to providing resources, opportunities, and a supportive environment. They play a crucial role in helping members succeed academically, professionally, and socially, while actively contributing to the betterment of our community and embracing cutting-edge technologies.
      </motion.p>
    </motion.div>
  </section>
);

export default CommitteeAbout;
