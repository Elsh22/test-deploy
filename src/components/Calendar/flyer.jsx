import React from 'react'; 
import Image from 'next/image';
import image1 from '../../newassest/weeklyFlyers/DMC Dodgeball - Jan 23 (1).png';
import image2 from '../../newassest/gbm5.jpg';
import image3 from '../../newassest/weeklyFlyers/White and Blue Illustrative Back To School Instagram Post (Instagram Post).png';
import image4 from '../../newassest/weeklyFlyers/CGI.png';
import image5 from '../../newassest/weeklyFlyers/Red Cream Bold Typography New Year Party Instagram Post.png';

const FlyerPost = () => {

  const flyers = [
    {
      image: image5,
      title: 'Jacobs Chance',
      description: 'Join us for a kick ball game with Jacobs Chance to learn more about their mission and how you can get involved.',
      date: 'Passed',
        },
    {
    image: image1,
    title: 'DMC Dodge Ball',
    description: 'Join us for in a friendly game of dodgeball at the Cary Street Gym.',
    date: 'Passed',
      },
{
    image: image2,
title: '3rd General Body Meeting',
description: 'Join us for our 3rd general body meeting of the semester to learn more about DMC.',
date: 'Passed'
  },

    {
      image: image4,
      title: 'CGI Collaboration Event',
      description: 'Join us for a CGI Collaboration Event at the Senate Chambers!',
      date: 'Passed',
        },

    {
      image: image3,
      title: 'General Body Meeting',
      description: 'Join us for our first general body meeting of the semester to learn more about DMC.',
      date: 'Passed',
        },
{
    image: image1,
    title: 'DMC Dodge Ball',
    description: 'Join us for in a friendly game of dodgeball at the Cary Street Gym.',
    date: 'Passed',
      },
  
];

return (
  <div className="flex justify-center flex-wrap gap-5 my-10">
    {flyers.map((flyer, index) => (
      <div key={index} className="w-full sm:w-1/2 lg:w-1/5 text-center">
        <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
          <Image src={flyer.image} alt={flyer.title} layout="fill" objectFit="contain" />
        </div>
        <h3 className="mt-5 text-2xl font-semibold">{flyer.title}</h3>
        <p className="text-gray-600 text-lg">{flyer.description}</p>
        <p className="text-gray-500 text-base mt-2">{flyer.date}</p>
      </div>
    ))}
  </div>
);
};

export default FlyerPost;
