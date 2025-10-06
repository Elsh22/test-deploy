'use client';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from "../../utils/motion";
import styles from '../../styles';
import { TypingText } from '../../utils/CustomText';

function SportsAbout() {
  return (
    <section className="w-full bg-black border-t-8 border-b-8 border-yellow-400 py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col items-center`}
      >
        {/* Header */}
        <TypingText
          title="| About DMC Sports |"
          textStyles="text-center text-4xl md:text-5xl font-extrabold text-yellow-400 mb-6"
        />

        {/* Paragraph */}
        <motion.p
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="mt-4 font-normal sm:text-[28px] text-[20px] text-center text-gray-200 max-w-5xl"
        >
          Developing Men of Color (DMC) aims to support the growth and development of young men of color through sports. With a focus on Basketball, Soccer, and Dodgeball, DMC provides a safe and inclusive environment for young men to learn, grow, and build relationships through athletic competition. The organization's mission is to empower young men with the skills and confidence to succeed both on and off the field, and to help them become positive role models in their communities. With its commitment to excellence and dedication to the well-being of its participants, DMC is making a lasting impact on the lives of young men of color.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default SportsAbout;
