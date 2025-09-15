'use client';
import React from 'react';
import Link from 'next/link';
import Goode from '../../assets/Goode.jpg';
import Thomas from '../../assets/Thomas.jpg';
import Kaleb from '../../assets/Kaleb2025.jpg';
import Xavier from '../../assets/Xavier2025.jpg';
import Kwame from '../../assets/Kwame2025.jpg';
import Kabir from '../../assets/Kabir2025.jpg';
import Sean from '../../assets/Sean2025.jpg';
import Thurman from '../../assets/Thurman.jpg';
import Jason from '../../assets/Jason2025.jpg';
import Paul from '../../assets/Paul2025.jpg';
import Naod from '../../assets/Naod2025.jpg';
import Sam from '../../assets/Sam2025.jpg';
import Clyde from '../../assets/Clyde2025.jpg';
import Shawn from '../../assets/Shawn2025.jpg';
import Mo from '../../assets/Mo2025.jpg';
import Eboard from '../../assets/EBoard2025.jpg';

const AboutTeam = () => {
  const team = [
    { name: 'Kaleb Brown', role: 'President', image: Kaleb.src },
    { name: 'Xavier Lewis', role: 'Vice President', image: Xavier.src },
    { name: 'Kwame Mensah', role: 'Parliamentarian', image: Kwame.src },
    { name: 'Kabir Munjwani', role: 'Secretary', image: Kabir.src },       
    { name: 'Sean Goffigan', role: 'Treasurer', image: Sean.src },       
    { name: 'Thurman Smith Jr', role: 'Mentorship Director', image: Thurman.src },
    { name: 'Jason Gallardo Gonzalez', role: 'Public Relations Coordinator', image: Jason.src },
    { name: 'Paul Adelugba', role: 'Social Media Chair', image: Paul.src },
    { name: 'Naod Daniel', role: 'Membership Chair', image: Naod.src },
    { name: 'Samuel Brannen', role: 'Wellness Director', image: Sam.src },
    { name: 'Clyde Clark III', role: 'Event Coordinator', image: Clyde.src },
    { name: 'Shawn Watson', role: 'Director of IT', image: Shawn.src },
    { name: 'Mohamed Turay', role: 'Director of Committees', image: Mo.src },
    { name: 'Dr. Carlton Goode', role: 'Faculty Advisor', image: Goode.src },
    { name: 'Thomas Chatman', role: 'Second Advisor', image: Thomas.src },
  ];

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className='text-center text-6xl font-bold w-full mb-5'>Meet the Eboard of DMC</h1>
      
      {/* Big Eboard Photo */}
      <Link href="/eboard">
        <div className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_#FFD700]">
          <img
            src={Eboard.src}
            alt="Eboard Team" 
            style={{ width: "1000px", height: "auto" }}
            className="my-5 rounded-lg shadow-md"
          />
        </div>
      </Link>

      {/* Individual team member photos (commented out) */}
      {/*
      <div className="flex flex-wrap justify-center mt-5">
        {team.map((member, index) => (
          <Link key={index} href={`/eboard/${member.name.replace(/\s+/g, '-').toLowerCase()}`}>
            <div className="text-center w-72 m-5 cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="inline-block w-36 h-36 rounded-full border-2 border-black overflow-hidden hover:shadow-[0_0_20px_#FFD700] hover:border-yellow-400 transition-shadow duration-300">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="theme-text mt-5 font-bold">{member.name}</h3>
              <p className="theme-text">{member.role}</p>
            </div>
          </Link>
        ))}
      </div>
      */}
    </div>
  );
};

const About = () => {
  return <AboutTeam />;
};

export default About;
