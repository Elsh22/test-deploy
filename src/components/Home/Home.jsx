'use client';
import React from 'react';
import Image from 'next/image';
import ButtonClientComponent from './ButtonClientComponent';
import img1 from '../../assets/mixer_background.jpg';

const Home = ({
  id,
  heading = 'Developing Men of Color',
  message = ' 501(c)(3) Non-Profit',
 // message2 = 'DMC is Offering Scholarships Click here to learn more'
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
      
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-[1] bg-black opacity-40" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-[2] text-center p-5">
        <h2 className="text-4xl font-bold">{heading}</h2>
        <p className="py-5 text-xl">{message}</p>
        <ButtonClientComponent />
      </div>
    </div>
  );
};

export default Home;

// <Button />
// <p className='py-5 text-xl'>{message2}</p>
