'use client';
import { motion } from 'framer-motion';
import IMG from '../../../public/headset.svg';
import styles from '../../styles';
import { fadeIn } from '../../utils/motion';

const ExploreCard = ({ id, imgUrl, title, text, Chairman, Buttonlink, index, active, handleClick }) => (
  <motion.div
    variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
    className={`relative ${
      active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
    } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer group rounded-[24px] overflow-hidden`}
    onClick={() => handleClick(id)}
  >
    {/* Background Image */}
    <img
      src={imgUrl}
      alt={title}
      className="absolute w-full h-full object-cover rounded-[24px] transition-transform duration-500 group-hover:scale-105"
    />

    {/* Inactive Card Title */}
    {active !== id ? (
      <h3
        className={`font-bold sm:text-[26px] text-[18px] text-white absolute z-10 
          2xl:bottom-20 2xl:rotate-[-90deg] 2xl:origin-[0,0] rotate-0`}
      >
        {title}
      </h3>
    ) : (
      <div className="absolute bottom-0 p-8 w-full flex flex-col bg-black/20 rounded-b-[24px]">
        {/* Icon */}
        <div className={`${styles.flexCenter} w-[60px] h-[60px] rounded-[24px] bg-black/20 mb-4`}>
          <img src={IMG.src} alt="headset" className="w-1/2 h-1/2 object-contain" />
        </div>

        {/* Text Info */}
        <p className="font-medium text-[16px] leading-[20px] text-gray-100 uppercase mb-1">{text}</p>
        <p className="font-semibold text-[16px] leading-[20px] text-yellow-400 uppercase">{Chairman}</p>

        {/* Learn More Button */}
        <a
          href={Buttonlink}
          className="mt-4 inline-block bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-bold py-2 px-4 rounded-lg text-center w-max"
        >
          Learn More
        </a>

        {/* Title */}
        <h2 className="mt-6 font-extrabold sm:text-[32px] text-[24px] text-white">
          {title}
        </h2>
      </div>
    )}
  </motion.div>
);

export default ExploreCard;
