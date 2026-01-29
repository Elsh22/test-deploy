'use client';
import React from 'react';
import Image from 'next/image'; 
import { motion } from 'framer-motion';

import Seward from '../../../../assets/Thomas.jpg';
import Blanco from '../../../../assets/AlexBlanco.jpeg';
import Lowe from '../../../../assets/Revon.jpeg';
import Myland from '../../../../assets/Stone.jpeg';
import Tyrell from '../../../../assets/Tyrell.jpeg';
import Jahleel from '../../../../assets/Jahleel.jpeg';
import JalenWilliams from '../../../../assets/Kyle.jpeg';
import Darnell from '../../../../assets/Darnell.jpeg';
import Samdani from '../../../../assets/Samdani.jpeg';

const AboutJmu = () => {
  // Replace with actual JMU board members
  const team = [
    { name: 'Chris Seward', role: 'President', image: Seward, linkedin: 'https://www.linkedin.com/in/christopher-seward-b1a501272/' },
    { name: 'Alex Blanco', role: 'Vice President', image: Blanco, linkedin: 'https://www.linkedin.com/in/alex-blanco-alcala-1737b6222/' },
    { name: 'Revon Lowe', role: 'Director of Mentorship', image: Lowe, linkedin: 'https://www.linkedin.com/in/revon-lowe-3a9462284/' },
    { name: 'Myland Williams', role: 'Director of Mentorship', image: Myland, linkedin: 'https://www.linkedin.com/in/myland-williams-302a20240/' },
    { name: 'Tyrell Bassett', role: 'Event Coordinator', image: Tyrell, linkedin: 'https://www.linkedin.com/in/tyrell-bassett-5b526b387/' },
    { name: 'Jahleel McCallum', role: 'Secretary', image: Jahleel, linkedin: 'https://www.linkedin.com/in/tyrell-bassett-5b526b387/' },
    { name: 'Jalen Williams', role: 'Public Relations', image: JalenWilliams, linkedin: 'https://www.linkedin.com/in/jalenw28/' },
    { name: 'Darnell Hicks', role: 'Public Relations', image: Darnell, linkedin: 'https://www.linkedin.com/in/darnell-hicks-12960dh/' },
    { name: 'Ayman Samdani', role: 'Treasurer', image: Samdani, linkedin: 'https://www.linkedin.com/in/ayman-samdani/' },
    
    // Add more JMU board members here
  ];

  return (
    <div className="flex flex-col items-center py-12 bg-white">
      <motion.h1 
        className="text-3xl font-bold text-gray-900 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Meet the JMU Board
      </motion.h1>

      {/* Group Photo - Replace with actual JMU board photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-5xl mb-12"
      >
        <div className="w-full h-[400px] bg-gray-200 rounded-lg shadow-xl flex items-center justify-center">
          <p className="text-gray-500">JMU Board Photo</p>
        </div>
      </motion.div>

     {/* Individual Board Members */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
             {team.map((member, index) => (
               <motion.div
                 key={member.name}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="flex flex-col items-center"
               >
                 <a
                   href={member.linkedin}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group relative w-40 h-40 mb-4 rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-105"
                 >
                   <Image
                     src={member.image}
                     alt={member.name}
                     layout="fill"
                     objectFit="cover"
                     className="rounded-full transition-transform duration-300 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-full" />
                 </a>
                 <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                   <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                     {member.name}
                   </a>
                 </h3>
                 <p className="text-gray-600 mt-1">{member.role}</p>
               </motion.div>
             ))}
           </div>
         </div>
       );
     };

export default AboutJmu;