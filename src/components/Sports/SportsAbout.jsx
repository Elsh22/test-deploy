'use client';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer} from "../../utils/motion";
import styles from '../../styles'
import { TypingText  } from '../../utils/CustomText'

function SportsAbout() {
    return (
      <section className={`${styles.paddings} mt-10 `}>
          <div className="A" />
          <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
          >
              <TypingText title=" | About DMC Sports |" textStyles="text-center"/>
  
              <motion.p
              variants={fadeIn('up', 'tween', 0.2, 1)}
              className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
              >
              Developing Men of Color (DMC) aims to support the growth and development of  young men of color  through sports. With a focus on Basketball, Soccer, and Dodgeball, DMC provides a safe and inclusive environment for young men to learn, grow, and build relationships through athletic competition. The organizations mission is to empower young men with the skills and confidence to succeed both on and off the field, and to help them become positive role models in their communities. With its commitment to excellence and dedication to the well-being of its participants, DMC is making a lasting impact on the lives of young men of color.
              </motion.p>
          </motion.div>
      </section>
    )
  }
  
  export default SportsAbout;
  