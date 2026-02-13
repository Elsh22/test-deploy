'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import VACU from '../../assets/DonorLogos/VACU.png';
import VCUF from '../../assets/DonorLogos/vcu-foundations-logo-rev-outlines.png';
import HX from '../../assets/DonorLogos/eta-xi-sucks.png';
import Rich from '../../assets/DonorLogos/richmond-logo.png';
const Donor = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-fixed bg-center bg-cover donor-img overflow-hidden">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-20">
        <h2 className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-6 drop-shadow-lg">
          Join Our Mission to Make a Difference
        </h2>

        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Empower the next generation of leaders with your support. 
          <span className="font-semibold text-yellow-400"> DMC</span> stands at the forefront of fostering a nurturing environment for men of color in the college setting.
        </p>

        <Link href="/Donor">
          <button className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:shadow-2xl hover:bg-yellow-500 transition-all duration-300 ease-in-out">
            Donate
          </button>
        </Link>

        {/* ===== DONOR LOGOS SECTION ===== */}
        <div className="mt-12">
          <p className="text-gray-300 mb-4 text-sm uppercase tracking-widest">
            Notable Donors
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
  
  <Image
    src={VACU}
    alt="VACU"
    className="h-24 md:h-32 object-contain opacity-80 hover:opacity-100 transition"
  />

  <Image
    src={VCUF}
    alt="Donor 2"
    className="h-24 md:h-32 object-contain opacity-80 hover:opacity-100 transition"
  />

  <Image
    src={HX}
    alt="Donor 3"
    className="h-24 md:h-32 object-contain opacity-80 hover:opacity-100 transition"
  />

  <a
  href="https://therac1945.com/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-white text-xl md:text-xl font-semibold hover:text-yellow-400 transition"
>
  Tylen Hazard
</a>


</div>

        </div>
      </div>

      {/* Bottom gold bar */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600"></div>
    </div>
  );
};

export default Donor;
