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
import Donor from '../components/Donor/Donor';
import FlyerPost from '../components/Calendar/flyer';
import Youtube from '../components/Youtube/youtube';
import Highlight from '../components/Highlights/Highlight';
import Structure from '../components/Structure/Structure';
import Partnerships from '../components/Partnerships/Partnerships';
import Events from '../components/Events/Events';
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