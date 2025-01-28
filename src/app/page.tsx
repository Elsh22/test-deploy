import React from 'react';
import Home from '../components/Home/Home';
import Mission from '../components/Mission/Mission';
import Structure from '../components/Structure/Structure';
import Partnerships from '../components/Partnerships/Partnerships';
import Events from '../components/Events/events';
import Blog from '../components/Blog/Blog';
import Newsletter from '../components/Newsletter/Newsletter';
import EventCalendar from '../components/Calendar/CalendarEvent';
//  <Directory />

const HomePage = () => {
  return (
    <div className='overflow-x-hidden'>
      <Home id="home" />
      <Mission id="about"/>
      <Structure />
      <Partnerships />
      <Events />  
      <Blog />
      <Newsletter />
      <EventCalendar />
    </div>
  );
}
export default HomePage;

/*
new layout 
Title and Header
Mission and Goals
Structure of DMC
University Chapters & Partnerships
Upcoming Events
Recent News and Blogs
Newsletter Signup
Calendar

old layout
<Home id="home" />
      <Mission id="about"/>
      <Highlight />
      <Donor />
      <Youtube />
      <CommitteeAbout id="committee" />
      <Commitee  />
      <Mentorship id="mentorship" />
      <FlyerPost />
      <Calendar id="calendar"/>
      <Sports id="sports" />
      <Contact id="contact" />
      <About />

*/