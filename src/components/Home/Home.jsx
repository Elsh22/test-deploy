'use client';
import React from 'react';
import Image from 'next/image';
import ButtonClientComponent from './ButtonClientComponent';
import Countdown from './Countdown';
import img1 from '../../assets/8TH_DMC_MIXER.png';

const Home = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-black to-yellow-500 font-home flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-20 overflow-hidden">

      {/* Flyer Image */}
      <div className="mb-6 md:mb-0">
        <Image
          src={img1}
          alt="Flyer Image"
          className="rounded-lg 
                     w-80 h-80 
                     sm:w-96 sm:h-96 
                     md:w-[500px] md:h-[500px] 
                     lg:w-[600px] lg:h-[600px] 
                     object-contain"
        />
      </div>

      {/* Text, Countdown and Button */}
      <div className="flex flex-col items-center md:items-start gap-4 max-w-md md:max-w-lg">
        <div className="text-white text-center md:text-left 
                        text-sm sm:text-base md:text-2xl lg:text-3xl font-bold">
          Join us for the 8th Annual Developing Men of Color Mixer! This is an event designed to help you build community, make meaningful connections, and explore new opportunities.
        </div>
        <Countdown targetDate="2025-09-07T16:00:00" className="text-4xl sm:text-6xl md:text-7xl font-bold text-white" />
        <ButtonClientComponent />
      </div>
    </div>
  );
};

export default Home;

