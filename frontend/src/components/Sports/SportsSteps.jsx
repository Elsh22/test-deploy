'use client';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, planetVariants} from "../../utils/motion";
import { StartStepsSports } from '@/constants/index';
import styles from '../../styles';
import { TypingText, TitleText } from '../../utils/CustomText';
import StartSteps  from '../../utils/Startsteps';

const SportsSteps = () => (
    <section className={`${styles.paddings} mt-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
      >
        <motion.div
          variants={planetVariants('left')}
          className={`flex-1 ${styles.flexCenter}`}
        > 
          <div className="relative w-full pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/Awud3NiZkV4?si=Kkn2twKuj8N5r0m1" 
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
        <motion.div   
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className="flex-[0.75] flex justify-center flex-col text-center lg:text-left"
        >
          <TypingText title="How To Join Sports" />
          <TitleText title={<p className='theme-text'>Get started with just a few Steps</p>} />
          <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px] mx-auto lg:mx-0">
            {StartStepsSports.map((feature, index) => (
              <StartSteps key={feature} number={`${index < 10 ? '0' : ''} ${index + 1}`} text={feature}/>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
  
export default SportsSteps;



  /*<img
  <motion.div   
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className="flex-[0.75] flex justify-center flex-col text-center lg:text-left"
        >
          <TypingText title="How To Join Sports" />
          <TitleText title={<p className='theme-text'>Get started with just a few Steps</p>} />
          <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px] mx-auto lg:mx-0">
            {StartStepsSports.map((feature, index) => (
              <StartSteps key={feature} number={`${index < 10 ? '0' : ''} ${index + 1}`} text={feature}/>
            ))}
          </div>
        </motion.div>
  className="w-[90%] h-[90%] object-contain"
/>*/
