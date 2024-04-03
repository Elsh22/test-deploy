import React from 'react'; 
import Image from 'next/image';

const FlyerPost = () => {

  const flyers = [
  {
  image: '/youth-art-workshop.jpg',
  title: 'Youth Art Workshop',
  description: 'Join us for a fun and creative art workshop for kids aged 6-12!',
  date: 'April 15, 2024',
  },
  {
image: '/tech-meetup.jpg',
title: 'Tech Meetup',
description: 'Connect with local tech professionals and enthusiasts at our monthly meetup.',
date: 'April 18, 2024',
  },
  {
image: '/community-cleanup.jpg',
title: 'Community Clean-Up',
description: 'Help keep our community clean and green! Volunteer for our annual clean-up event.',
date: 'April 22, 2024',
  },
  {
image: '/local-concert.jpg',
title: 'Local Concert',
description: 'Enjoy a night of live music from talented local artists.',
date: 'April 29, 2024',
  },
];

return (
  <div className="flex justify-center flex-wrap gap-5 my-10">
  {flyers.map((flyer, index) => (
    <div key={index} className="w-full sm:w-1/2 lg:w-1/5 text-center">
      <div className="relative h-64 overflow-hidden rounded-lg shadow-md">
        <Image src={flyer.image} alt={flyer.title} layout="fill" objectFit="cover" />
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