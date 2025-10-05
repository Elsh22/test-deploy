'use client';
import React from 'react';
import Link from 'next/link';
import Eboard from '../../assets/EBOARD2025/EBoard2025.jpg';
import Goode from '../../assets/EBOARD2025/Goode2025.jpg';
import Thomas from '../../assets/EBOARD2024/Thomas.jpg';
import Kaleb from '../../assets/EBOARD2025/Kaleb2025.jpg';
import Xavier from '../../assets/EBOARD2025/Xavier2025.jpg';
import Kwame from '../../assets/EBOARD2025/Kwame2025.jpg';
import Kabir from '../../assets/EBOARD2025/Kabir2025.jpg';
import Sean from '../../assets/EBOARD2025/Sean2025.jpg';
import Thurman from '../../assets/EBOARD2025/Thurman.jpg';
import Jason from '../../assets/EBOARD2025/Jason2025.jpg';
import Paul from '../../assets/EBOARD2025/Paul2025.jpg';
import Naod from '../../assets/EBOARD2025/Naod2025.jpg';
import Sam from '../../assets/EBOARD2025/Sam2025.jpg';
import Clyde from '../../assets/EBOARD2025/Clyde2025.jpg';
import Shawn from '../../assets/EBOARD2025/Shawn2025.jpg';
import Mo from '../../assets/EBOARD2025/Mo2025.jpg';


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
