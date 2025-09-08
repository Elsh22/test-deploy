"use client";
import React from 'react';
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

interface AboutProps {
  id: string;
}

const AboutTeam = () => {
    const team = [
        { name: 'Kaleb Brown', role: 'President', image: Kaleb.src, linkedin:'https://www.linkedin.com/in/kaleb--brown/'},
        { name: 'Xavier Lewis', role: 'Vice President', image: Xavier.src, linkedin:'https://www.linkedin.com/in/xaviermlewis/'},
        { name: 'Kabir Munjwani', role: 'Secretary', image: Kabir.src, linkedin:'https://www.linkedin.com/in/kabir-munjwani-2389bb319/'},       
        { name: 'Sean Goffigan', role: 'Treasurer ', image: Sean.src, linkedin:'https://www.linkedin.com/in/sean-goffigan-9734b7316/'},       
        { name: 'Thurman Smith Jr', role: 'Mentorship Director', image: Thurman.src, linkedin:'https://www.linkedin.com/in/thurmansmithjr/'},
        { name: 'Jason Gallardo Gonzalez', role: 'Public Relations Coordinator', image: Jason.src, linkedin:'https://www.linkedin.com/in/jason-gallardo-gonzalez/'},
        { name: 'Paul Adelugba', role: 'Social Media Chair', image: Paul.src, linkedin:'https://www.linkedin.com/in/paul-adeugba/'},
        { name: 'Naod Daniel', role: 'Membership Chair', image: Naod.src, linkedin:'https://www.linkedin.com/in/naod-daniel/'},
        { name: 'Samuel Brannen', role: 'Wellness Director', image: Sam.src, linkedin:'https://www.linkedin.com/in/samuel-brannen-ba47b82b4/'},
        { name: 'Clyde Clark III', role: 'Event Coordinator', image: Clyde.src, linkedin:'https://www.linkedin.com/in/clyde-clark-iii-a0185122b/'},
        { name: 'Shawn Watson', role: 'Director of IT', image: Shawn.src, linkedin:'https://www.linkedin.com/in/shawn-watson-3a16292b0/'},
        { name: 'Mohamed Turay', role: 'Director of Committes', image: Mo.src, linkein:'https://www.linkedin.com/in/mohamed-turay/'},
        { name: 'Dr. Carlton Goode', role: 'Faculty Advisor', image: Goode.src, linkedin:'https://www.linkedin.com/in/carlton-goode-ed-d-69172815/'},
        { name: 'Thomas Chatman', role: 'Second Advisor', image: Thomas.src, linkedin:'https://www.linkedin.com/in/thomas--chatman/'},
      ];
      return (
        <div className="flex flex-col items-center mt-5">
  <h1 className='text-center text-2xl font-bold w-full'>Meet the Eboard</h1>
  {/* Larger Eboard Photo */}
  <img
    src={Eboard.src} // Adjust as needed based on whether Eboard is an object or a direct path
    alt="Eboard Team" 
    style={{ width: "1000px", height: "auto" }} // Adjust width to desired size
    className="my-5 rounded-lg shadow-md"
  />
  {/* Smaller individual team member photos */}
  <div className="flex flex-wrap justify-center mt-5">
    {team.map((member, index) => (
      <div className="text-center w-72 m-5" key={index}>
        <div className="inline-block w-36 h-36 rounded-full border-2 border-black overflow-hidden">
          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="theme-text mt-5 text-decoration-line: underline">
          <a href={member.linkedin} target="_blank" rel="noreferrer" className="theme-text">
            {member.name}
          </a>
        </h3>
        <p className="theme-text">{member.role}</p>
      </div>
    ))}
  </div>
</div>
      );
    };
    

const About = () => {
  return (
    <div>
      <AboutTeam />
    </div>
  );
};

export default About;
