'use client';
import React from 'react';
import Link from 'next/link';
import Eboard from '../../assets/EBOARD2025/EBoard2025.jpg';

const AboutTeam = () => {
  return (
    <div className="flex flex-col items-center bg-black text-yellow-400 py-16 px-4">
      <h1 className="text-5xl md:text-6xl font-bold mb-10 text-center w-full">
        Meet the E-Board of DMC
      </h1>

      {/* Big Eboard Photo */}
      <Link href="/eboard">
        <div className="cursor-pointer transform transition duration-500 hover:scale-105 hover:shadow-[0_0_40px_#FFD700]">
          <img
            src={Eboard.src}
            alt="Eboard Team"
            className="w-full max-w-[1000px] h-auto rounded-xl shadow-lg border-4 border-yellow-400"
          />
        </div>
      </Link>


      {/* Uncomment this section if you want to display individual member cards later */}
      {/*
      <div className="flex flex-wrap justify-center mt-12 gap-8">
        {team.map((member, index) => (
          <Link key={index} href={`/eboard/${member.name.replace(/\s+/g, '-').toLowerCase()}`}>
            <div className="text-center w-72 cursor-pointer transform transition duration-300 hover:scale-105">
              <div className="w-36 h-36 rounded-full border-4 border-yellow-400 overflow-hidden shadow-lg hover:shadow-[0_0_20px_#FFD700] transition-shadow duration-300">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="mt-4 font-bold text-lg">{member.name}</h3>
              <p className="text-gray-300">{member.role}</p>
            </div>
          </Link>
        ))}
      </div>
      */}
    </div>
  );
};

const About = () => <AboutTeam />;

export default About;
