'use client';
import React from 'react';
import Image from 'next/image';
import ButtonClientComponent from './ButtonClientComponent';
import img1 from '../../assets/mixer_background.jpg';

const Home = ({
  id,
  heading = 'Developing Men of Color 501(c)(3) Non-Profit',
}) => {
  return (
    <div id={id} className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={img1}
          alt="Background Image"
          fill // Replaces layout="fill"
          style={{ objectFit: 'cover' }} // Replaces objectFit="cover"
          quality={50}
          priority
        />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-black opacity-40" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-[2] text-center p-5">
        <h2 className="text-4xl font-bold">{heading}</h2>
      </div>
    </div>
  );
};

export default Home;


// <Button />
// <p className='py-5 text-xl'>{message2}</p>
//<ButtonClientComponent />
//<p className="py-5 text-xl">{message}</p>