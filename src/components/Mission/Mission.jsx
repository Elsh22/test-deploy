"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TypingText } from '../../utils/CustomText';
import IMG1 from '../../newassest/Ourmissionpicture.jpg'; // Ensure this import is correct
import styles from '../../styles/index';
import { fadeIn, staggerContainer, planetVariants } from '../../utils/motion';

const Mission = ({ id }) => {
    return (
      // Adjusted for responsiveness: stacks vertically on small screens, horizontally on larger screens
      <div className="flex flex-col md:flex-row items-center m-5 gap-4 md:gap-8" id={id}>
        <section className="w-full md:flex-1">
         <TypingText title="DMC Leadership"  textStyles="text-center font-normal text-[30px]"   /> 
          <motion.div
            variants={planetVariants('left')} // Ensure you have defined or adjusted the planetVariants function
            className={`${styles.flexCenter} mb-4 md:mb-0`} // Added marginBottom for non-md screens
          >
            <img
              src={IMG1.src}
              alt="Developing Men of Color"
              className="w-[80%] md:w-[90%] h-auto object-contain" // Adjusted for responsiveness
            ></img>
            
          </motion.div>
        </section>
        <section className="w-full md:flex-1">
          <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
          >
           <TypingText title="Our Mission" textStyles="text-center"/>
            <motion.p
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="mt-4 md:mt-[8px] font-normal sm:text-[32px] md:text-[20px] text-center text-secondary-black overflow-x-hidden" // Adjusted for responsiveness
            >
            <span className="font-extrabold theme-text">DMC </span>
            was made to create an organization in which men of color can interact and grow as a community, our goal is to equip these individuals with the means and resources needed in order to thrive in the college setting. We plan to do so by providing academic advice from other successful members and faculty, insight into how to navigate the undergraduate years, means to professional development and most importantly, provide a brotherhood of students striving together. By providing a close community of minority men working towards the same goal, this will allow us to connect with incoming college students in order to enlarge our community and bond. A critical aspect of our organization is our commitment to community service, this is shown by our consistent mentoring at nearby underserved public schools, our volunteering in the local Richmond community, and our participation in service events held by other organizations.
            </motion.p>
          </motion.div>
        </section>
      </div>
    );
};

export default Mission;
/*<img
              src={IMG1.src}
              alt="Developing Men of Color"
              className="w-[80%] md:w-[90%] h-auto object-contain" // Adjusted for responsiveness
            >*/