import React from 'react';
import Home from '../components/Home/Home';
import CommitteeAbout from '../components/Committee/CommitteeAbout'
import Commitee from '../components/Committee/Commitee';
import Calendar from '../components/Calendar/Calendar';
import Mentorship from '../components/Mentorship/Mentorship';
import Sports from '../components/Sports/Sports';
import Contact from '../components/Contact/Contact';
import About from '../components/About/About';
import Directory from '../components/Directory/Directory';


const HomePage = () => {
  return (
    <div className='overflow-x-hidden'>
      <Home id="home" />
      <CommitteeAbout id="committee" />
      <Commitee  />
      <Mentorship id="mentorship" />
      <Calendar />
      <Sports id="sports" />
      <Contact id="contact" />
      <About id="about" />
    </div>
  );
}

export default HomePage;

