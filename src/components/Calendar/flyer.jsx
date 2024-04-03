import React from 'react'; 
import Image from 'next/image';
import image1 from '../../newassest/flyers/fyer320.jpg';
import image2 from '../../newassest/flyers/fyler-323.jpg'
import image3 from '../../newassest/flyers/fyler401.jpg'
import image4 from '../../newassest/flyers/fylermarch.jpg'

const FlyerPost = () => {

  const flyers = [
  {
  image: image3,
  title: 'IT Panel',
  description: 'Join us for a learnning about the IT sector and networking with professionals.',
  date: 'April 1, 2024',
  },
  {
image: image2,
title: 'Jacab Chance',
description: 'come and join us for a chance to play kickball with us at Jacab Chance event.',
date: 'March 23, 2024',
  },
  {
image: image1,
title: 'Gernal Body Meeting',
description: 'Join us for our monthly meeting to discuss the upcoming events and updates.',
date: 'March 20, 2024',
  },
  {
image: image4,
title: 'March Event fliers',
description: 'This is the fliers for the events that will be happening in the end of March.',
date: 'week of 16-24',
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