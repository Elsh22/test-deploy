'use client';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, planetVariants } from "../../utils/motion";
import { StartStepsSports } from '@/constants/index';
import styles from '../../styles';
import { TypingText, TitleText } from '../../utils/CustomText';

const SportsSteps = () => {
  // Inline Step component (no TypeScript types)
  const Step = ({ number, text }) => (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black text-lg">
        {number}
      </div>
      <p className="flex-1 text-yellow-400 font-medium text-lg">{text}</p>
    </div>
  );

  return (
    <section className="w-full bg-black border-t-8 border-b-8 border-yellow-400 py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="max-w-6xl mx-auto flex lg:flex-row flex-col gap-12 px-4"
      >
        {/* Left: Video */}
        <motion.div
          variants={planetVariants('left')}
          className="flex-1 flex justify-center items-center"
        >
          <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden shadow-lg">
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

        {/* Right: Steps */}
        <motion.div
          variants={fadeIn('left', 'tween', 0.2, 1)}
          className="flex-[0.75] flex flex-col justify-center text-center lg:text-left"
        >
          <TypingText
            title="How To Join Sports"
            textStyles="text-yellow-400 text-3xl lg:text-4xl font-semibold mb-2"
          />
          <TitleText
            title={
              <p className="text-white text-3xl lg:text-4xl mb-6">
                Get started with just a few Steps
              </p>
            }
          />
          <div className="flex flex-col gap-6 max-w-md mx-auto lg:mx-0">
            {StartStepsSports.map((feature, index) => (
              <Step
                key={index}
                number={`${index < 9 ? '0' : ''}${index + 1}`}
                text={feature}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SportsSteps;
