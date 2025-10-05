'use client';
import React from 'react';
import Link from 'next/link';
import Goode from '../../../assets/EBOARD2025/Goode2025.jpg';
import Thomas from '../../../assets/EBOARD2024/Thomas.jpg';
import Kaleb from '../../../assets/EBOARD2025/Kaleb2025.jpg';
import Xavier from '../../../assets/EBOARD2025/Xavier2025.jpg';
import Kwame from '../../../assets/EBOARD2025/Kwame2025.jpg';
import Kabir from '../../../assets/EBOARD2025/Kabir2025.jpg';
import Sean from '../../../assets/EBOARD2025/Sean2025.jpg';
import Thurman from '../../../assets/EBOARD2025/Thurman.jpg';
import Jason from '../../../assets/EBOARD2025/Jason2025.jpg';
import Paul from '../../../assets/EBOARD2025/Paul2025.jpg';
import Naod from '../../../assets/EBOARD2025/Naod2025.jpg';
import Sam from '../../../assets/EBOARD2025/Sam2025.jpg';
import Clyde from '../../../assets/EBOARD2025/Clyde2025.jpg';
import Shawn from '../../../assets/EBOARD2025/Shawn2025.jpg';
import Mo from '../../../assets/EBOARD2025/Mo2025.jpg';
const EboardPage = () => {
  const team = [
    { name: 'Kaleb Brown', role: 'President', image: Kaleb.src, link: '/eboard/president' },
    { name: 'Xavier Lewis', role: 'Vice President', image: Xavier.src, link: '/eboard/vice-president' },
    { name: 'Kabir Munjwani', role: 'Secretary', image: Kabir.src, link: '/eboard/secretary' }, 
    { name: 'Sean Goffigan', role: 'Treasurer', image: Sean.src, link: '/eboard/treasurer' },
    { name: 'Kwame Mensah', role: 'Parliamentarian', image: Kwame.src, link: '/eboard/parliamentarian' }, 
    { name: 'Naod Daniel', role: 'Membership Chair', image: Naod.src, link: '/eboard/membership-chair' },  
    { name: 'Jason Gallardo Gonzalez', role: 'Public Relations Coordinator', image: Jason.src, link: '/eboard/public-relations-coordinator' }, 
    { name: 'Paul Adelugba', role: 'Social Media Chair', image: Paul.src, link: '/eboard/social-media-chair' },
    { name: 'Samuel Brannen', role: 'Wellness Director', image: Sam.src, link: '/eboard/wellness-director' }, 
    { name: 'Shawn Watson', role: 'Director of IT', image: Shawn.src, link: '/eboard/director-of-it' },            
    { name: 'Thurman Smith Jr', role: 'Mentorship Director', image: Thurman.src, link: '/eboard/mentorship-director' },
    { name: 'Clyde Clark III', role: 'Event Coordinator', image: Clyde.src, link: '/eboard/event-coordinator' },
    { name: 'Mohamed Turay', role: 'Director of Committees', image: Mo.src, link: '/eboard/director-of-committees' },
    { name: 'Dr. Carlton Goode', role: 'Faculty Advisor', image: Goode.src, link: '/eboard/faculty-advisor' },
    { name: 'Thomas Chatman', role: 'Second Advisor', image: Thomas.src, link: '/eboard/second-advisor' },
  ];

return (
  <div className="flex flex-col items-center pt-20 pb-10 bg-white">
    <h1 className="text-6xl font-bold mb-10 text-black">E-Board Members</h1>
    <div className="flex flex-wrap justify-center gap-10">
      {team.map((member, index) => (
        <Link key={index} href={member.link}>
          <div className="cursor-pointer transition-all duration-300 hover:scale-110">
            <div className="w-48 h-48 rounded-full border-4 border-black overflow-hidden hover:shadow-[0_0_20px_#FFD700] hover:border-yellow-400 transition-shadow duration-300">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-center mt-4 font-semibold text-black">{member.name}</h3>
            <p className="text-center text-black">{member.role}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

};

export default EboardPage;
