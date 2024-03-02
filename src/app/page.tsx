import React from 'react';
import Home from '../components/Home/Home';
import CommitteeAbout from '../components/Committee/CommitteeAbout'
import Commitee from '../components/Committee/Commitee';
import Calendar from '../components/Calendar/Calendar';
import Mentorship from '../components/Mentorship/Mentorship';
import Sports from '../components/Sports/Sports';
import Contact from '../components/Contact/Contact';
import About from '../components/About/About';
import Mission from '../components/Mission/Mission';
//import Directory from '../components/Directory/Directory';
//  <Directory />

const HomePage = () => {
  return (
    <div className='overflow-x-hidden'>
      <Home id="home" />
      <Mission id="about"/>
      <CommitteeAbout id="committee" />
      <Commitee  />
      <Mentorship id="mentorship" />
      <Calendar id="calendar"/>
      <Sports id="sports" />
      <Contact id="contact" />
      <About />
    </div>
  );
}

export default HomePage;

