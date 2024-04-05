"use client"
import React from 'react';
import Link from 'next/link';

const Donor = () => {
  return (
    <div className="flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover donor-img bg-blend-darken">
      <div>
        <h2 className="text-5xl font-bold text-black ">Join Our Mission to Make a Difference</h2>
        <p className="py-5 text-xl text-black font-bold">Empower the next generation of leaders with your support. DMC stands at the forefront of fostering a nurturing environment for men of color in the college setting. </p>
        <Link href="/Donor">
          <button className="text-black px-8 py-2 border rounded-md hover:bg-gray-200 transition duration-300 ease-in-out font-bold">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Donor;
