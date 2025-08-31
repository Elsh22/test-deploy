'use client';
import React from 'react';
import Image from 'next/image';
import ButtonClientComponent from './ButtonClientComponent';
import Countdown from './Countdown';
import img1 from '../../assets/8TH_DMC_MIXER.png';

const Home = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-black via-black to-yellow-500 overflow-hidden font-home">

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-[1] bg-black opacity-40" />

      {/* Left Image */}
      <div className="absolute top-32 left-20 z-[2]">
        <Image
          src={img1}
          alt="Left Image"
          width={450}
          height={450}
          className="rounded-lg"
          style={{ objectFit: 'contain', objectPosition: 'left top' }}
        />
      </div>
      {/* Save the Date*/}
      <div className="absolute top-[440px] -right-[300px] z-[2] w-[800px] -translate-x-1/2 -translate-y-1/2 text-white text-center text-[2.5rem] font-bold">
        Join us for the 8th Annual Developing Men of Color Mixer! This is an event designed to help you build community, make meaningful connections, and explore new opportunities.
      </div>
      {/* Countdown and Button */}
      <div className="absolute top-32 left-[695px] z-[2] text-white flex flex-col items-start gap-6">
        <Countdown targetDate="2025-09-07T16:00:00" className="text-9xl font-bold" />
         <div className="absolute top-[470px] right-[160px]">
        <ButtonClientComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
