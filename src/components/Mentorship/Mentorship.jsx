'use client';
import { motion } from 'framer-motion';
import IMG from '../../newassest/updatedcollegeday.jpg';
import styles from '../../styles';
import { startingFeatures } from '../../constants/index';
import StartSteps  from '../../utils/Startsteps';
import {  TitleText, TypingText } from '../../utils/CustomText';
import { staggerContainer, fadeIn, planetVariants } from '../../utils/motion';
import Image from 'next/image'


const Mentorship = ({ id }) => (
  <section id={id} className={`${styles.paddings} mt-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={planetVariants('left')}
        className={`flex-1 ${styles.flexCenter} mt-0 lg:mt-0`} 
      >
        <Image
          src={IMG.src}
          alt="get-started"
          className="w-[90%] lg:w-[90%] h-[90%] lg:h-[90%] object-contain" 
        />
      </motion.div>
      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] flex justify-center flex-col text-center lg:text-left" 
      >
        <TypingText title="How To Join Mentoring" />
        <TitleText title={<p className='theme-text'>Get started with just a few Steps</p>} />
        <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px] mx-auto lg:mx-0  "> 
          {startingFeatures.map((feature, index) => (
            <StartSteps key={feature} number={`${index < 10 ? '0' : ''} ${index + 1}`} text={feature} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default Mentorship;
