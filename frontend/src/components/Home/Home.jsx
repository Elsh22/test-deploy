'use client';
import React from 'react';
import Image from 'next/image';
import ButtonClientComponent from './ButtonClientComponent';
import img1 from '../../assets/DMC_MIXER_PHOTO.jpg';

const Home = ({ id }) => {
  return (
    <div
      id={id}
      className="relative w-full h-screen overflow-hidden font-home"
    >
      {/* Background Image */}
      <Image
        src={img1}
        alt="Developing Men of Color"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text + Button Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center px-4">
        <h1
          className="text-white text-8xl sm:text-6xl md:text-7xl font-bold"
          style={{
            WebkitTextStroke: '0.1px gold', // Gold outline
            color: 'white',               // Fill stays white
          }}
        >
          Developing Men of Color
        </h1>

        {/* Button under text */}
        <ButtonClientComponent />
      </div>
    </div>
  );
};

export default Home;
