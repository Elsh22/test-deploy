"use client"
import React from 'react';
import ButtonClientComponent from './ButtonClientComponent'; 
import Button from './Button';

//bg-black/50
const Home  = ({ 
  id, 
  heading = 'Developing Men of Color', 
  message = 'At Virginia Commonwealth University',
  message2 = 'DMC is Offering a Scholarships Click here to learn more'
}) => {
  return (
    <div id={id} className='flex items-center justify-center h-screen  bg-fixed bg-center bg-cover custom-img'>
      <div className='absolute top-0 left-0 right-0 bottom-0 z-[2]' />
      <div className='p-5 text-white z-[2] mt-20'>
        <h2 className='text-4xl font-bold' dangerouslySetInnerHTML={{ __html: heading }}></h2>
        <p className='py-5 text-xl '>{message}</p>
        <ButtonClientComponent />
      </div>
    </div>
  );
};

export default Home;
// <Button />
// <p className='py-5 text-xl'>{message2}</p>
