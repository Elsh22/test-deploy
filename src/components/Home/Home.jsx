'use client';
import React from 'react';
import Image from 'next/image';
import ButtonClientComponent from './ButtonClientComponent';
import img1 from '../../assets/mixer_background.jpg';

const Home = ({
  id,
  heading = 'DMC',
  message = '501(c)(3) Non-Profit',
}) => {
  return (
    <div id={id} className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={img1}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={50}
        priority
      />
      
      {/* DMC Brand Overlay - Black with Gold Accent */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-[1] bg-gradient-to-b from-dmc-black/80 via-dmc-black/60 to-dmc-black/80" />
      
      {/* Content with DMC Branding */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-[2] text-center p-5">
        <h2 className="text-dmc-hero font-dmc-primary text-dmc-gold mb-4 animate-dmc-fade-in">
          {heading}
        </h2>
        <p className="text-dmc-body text-dmc-white mb-8 animate-dmc-slide-up">
          {message}
        </p>
        <div className="animate-dmc-slide-up">
          <ButtonClientComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;


// <Button />
// <p className='py-5 text-xl'>{message2}</p>
//<ButtonClientComponent />
//<p className="py-5 text-xl">{message}</p>