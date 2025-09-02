'use client';
import React from 'react';
import Image from 'next/image';
import ButtonClientComponent from './ButtonClientComponent';
import Countdown from './Countdown';
import img1 from '../../assets/8TH_DMC_MIXER.PNG';

const Home = ({id}) => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-black to-yellow-500 overflow-hidden font-home">

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-black opacity-40" />

      {/* Main Content Container */}
      <div className="relative z-[2] flex flex-col-reverse lg:flex-row items-center lg:items-start justify-center lg:justify-between max-w-7xl mx-auto px-4 py-20 gap-10 lg:gap-20">

        {/* Text + Countdown + Button */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:max-w-lg">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            Join us for the 8th Annual Developing Men of Color Mixer!
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl">
            This is an event designed to help you build community, make meaningful connections, and explore new opportunities.
          </p>
          <Countdown 
            targetDate="2025-09-07T16:00:00" 
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-white text-center lg:text-left" 
          />
          <ButtonClientComponent />
        </div>

        {/* Image */}
        <div className="w-[80%] max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mx-0">
          <Image
            src={img1}
            alt="DMC Mixer"
            width={500}
            height={500}
            className="rounded-lg"
            style={{ objectFit: 'contain' }}
          />
        </div>

      </div>

    </div>
  );
};

export default Home;
