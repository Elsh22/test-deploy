'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles';
import { exploreWorlds } from '../../constants';
import { staggerContainer } from '../../utils/motion';
import { TitleText, TypingText } from '../../utils/CustomText';
import ExploreCard from './ExploreCard';

const Commitee = () => {
  const [active, setActive] = useState('world-4');

  return (
    <section
      className={`${styles.paddings} bg-black`}
      id="explore"
      style={{ overflow: 'hidden' }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="" textStyles="text-center text-white" />
        <TitleText
          title={<> <br className="md:block hidden" /> </>}
          textStyles="text-center text-white"
        />
        <div className="mt-[50px] flex xl:flex-row flex-col min-h-[70vh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Commitee;
