'use client';
import React from 'react';
import Image from 'next/image';
import DMCImg from "../../assets/GBMs/DSC00634.jpg"; // replace with your image

const NonProfitCard = () => {
  return (
    <div
      className="cursor-pointer bg-black text-white rounded-4xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center gap-6 p-6"
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        <Image
          src={DMCImg}
          alt="DMC Non-profit"
          className="rounded-xl object-cover w-full h-64 md:h-80"
        />
      </div>

      {/* Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
        <h2 className="text-4xl font-extrabold text-yellow-400">DMC Non-profit</h2>
        <p className="text-lg md:text-xl leading-relaxed">
          The DMC Non-profit focuses on empowering youth, providing community resources, and supporting local initiatives. Learn more about our mission, impact, and how you can get involved.
        </p>
        <a 
          href="https://dmcnonprofit.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg w-fit hover:bg-yellow-300 transition"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default NonProfitCard;
