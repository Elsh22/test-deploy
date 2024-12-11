"use client";
import React from 'react';
import Goode from '../../assets/Goode.jpg';
import Thomas from '../../assets/Thomas.jpg';
import Stephen from '../../assets/StephHeadshotUpdated.jpg';
import Josh from '../../assets/Josh.png';
import Zion from '../../assets/Zion.jpg';
import Xavier from '../../assets/XaiverHeadshotUpdated.jpg';
import David from '../../assets/DavidHeadshotUpdated.jpg';
import DeAngelo from '../../assets/DeangleoHeadshotUpdated.jpg';
import Mohamed from '../../assets/MohamedHeadshotUpdated.jpg';
import Neho from '../../assets/NehoHeadshotUpdated.jpg';
import Kaleb from '../../assets/KalebHeadshotUpdated.jpg';
import Kabir from '../../assets/KabirHeadshotUpdated.jpg';
import Jason from '../../assets/JasonHeadshotUpdated.jpg';
import Eboard from '../../assets/eboardpic.jpg';

interface AboutProps {
  id: string;
}

const AboutTeam = () => {
    const team = [
        { name: 'Xavier Lewis', role: 'President', image: Xavier.src, linkedin:'https://www.linkedin.com/in/xavier-lewis-9916bb253/'},
        { name: 'Zion Segears', role: 'Vice President', image: Zion.src, linkedin:'https://www.linkedin.com/in/zion-segears-767bb7242/'},
        { name: 'Kabir Munjwani', role: 'Secretary', image: Kabir.src, linkedin:'https://www.linkedin.com/in/kabir-munjwani-2389bb319/'},       
        { name: 'David Foster', role: 'Treasurer ', image: David.src, linkedin:'https://www.linkedin.com/in/david-foster-b063b0226/'},       
        { name: 'Josh Hines', role: 'Mentorship Director', image: Josh.src, linkedin:'https://www.linkedin.com/in/joshhines4/'},
        { name: 'DeAngelo Bailey', role: 'Public Relations Coordinator', image: DeAngelo.src, linkedin:'https://www.linkedin.com/in/deangelo-bailey-5686ba253/'},
        { name: 'Jason Gallardo Gonzalez', role: 'Soical Media Chair', image: Jason.src, linkedin:'https://www.linkedin.com/in/jason-gallardo-gonzalez/'},
        { name: 'Stephen Kouevi', role: 'Membership Chair', image: Stephen.src, linkedin:'https://www.linkedin.com/in/stephenkouevi/'},
        { name: 'Kaleb Brown', role: 'Wellness Director', image: Kaleb.src, linkedin:'https://www.linkedin.com/in/kaleb--brown/'},
        { name: 'Nehemiah Kibler', role: 'Event Coordinator', image: Neho.src, linkedin:'https://www.linkedin.com/in/nehemiah-kibler-ba8764253/'},
        { name: 'Mohamed Elnafe', role: 'Director of IT', image: Mohamed.src, linkedin:'https://www.linkedin.com/in/mohamed-elnafe-364892215/'},
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
