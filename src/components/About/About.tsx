import React from 'react';
import Hassan from '../../assets/Hassan.jpg';
import Hussein from '../../assets/Hussein.jpg';
import Goode from '../../assets/Goode.jpg';
import Thomas from '../../assets/Thomas.jpg';
import Ron from '../../assets/Ron.jpg';
import Stephen from '../../assets/Stephen.jpg';
import Josh from '../../assets/Josh.JPEG';
import Omar from '../../assets/Omar.jpg';
import Zion from '../../assets/Zion.jpg';
import Xavier from '../../assets/Xavier.jpg';
import David from '../../assets/David.jpg';
import DeAngelo from '../../assets/DeAngelo.jpg';

interface AboutProps {
  id: string;
}


const AboutTeam = () => {
    const team = [
        { name: 'DaRon Stuvaints', role: 'President', image: Ron.src, linkedin:'https://www.linkedin.com/in/daron-stuvaints/'},
        { name: 'Omar Aly', role: 'Vice-President', image: Omar.src, linkedin:'https://www.linkedin.com/in/alyomarm/'},
        { name: 'Alhussein Elshowaya', role: 'Secretary', image: Hussein.src, linkedin:'https://www.linkedin.com/in/alhussein-elshowaya-5431a322a/'},
        { name: 'Alhassan Elshowaya', role: 'Treasurer', image: Hassan.src, linkedin:'https://www.linkedin.com/in/alhassan-elshowaya-214bb820a/'},
        { name: 'Josh Hines', role: 'Mentorship Director', image: Josh.src, linkedin:'https://www.linkedin.com/in/joshhines4/'},
        { name: 'DeAngelo Bailey', role: 'Public Relations Coordinator', image: DeAngelo.src, linkedin:'https://www.linkedin.com/in/deangelo-bailey-5686ba253/'},
        { name: 'Zion Segears', role: 'Wellness Director', image: Zion.src, linkedin:'https://www.linkedin.com/in/zion-segears-767bb7242/'},
        { name: 'David Foster', role: 'Membership Chair', image: David.src, linkedin:'https://www.linkedin.com/in/david-foster-b063b0226/'},
        { name: 'Xavier Lewis', role: 'Event Coordinator', image: Xavier.src, linkedin:'https://www.linkedin.com/in/xavier-lewis-9916bb253/'},
        { name: 'Stephen Kouevi', role: 'Director of IT', image: Stephen.src, linkedin:'https://www.linkedin.com/in/stephenkouevi/'},
        { name: 'Dr. Carlton Goode', role: 'Faculty Advisor', image: Goode.src, linkedin:'https://www.linkedin.com/in/carlton-goode-ed-d-69172815/'},
        { name: 'Thomas Chatman', role: 'Second Advisor', image: Thomas.src, linkedin:'https://www.linkedin.com/in/thomas--chatman/'},
      ];

      return (
        <div className="flex flex-wrap justify-center mt-5">
          <h1 className='text-center text-2xl font-bold w-full'>Meet the Eboard</h1>
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
      );
    };
    


const About = ({ id }: AboutProps) => {
  return (
    <div id={id} >
      <AboutTeam />
    </div>
  );
};

export default About;
