import React from 'react'; 
import Image from 'next/image';
import image1 from '../../newassest/weeklyFlyers/Black Yellow Bold We are Hiring Instagram Post (1).png';
import image2 from '../../newassest/weeklyFlyers/Red Modern Meeting Invitation Instagram Post.png.png';
import image3 from '../../newassest/weeklyFlyers/Grey Black Bold Minimalist Pottery Workshop Flyer (1080 x 1350 px) (1).png';
import image4 from '../../newassest/weeklyFlyers/Green Red Volunter Need Flyer (1080 x 1350 px).png';

const FlyerPost = () => {

  const flyers = [
{
    image: image1,
    title: 'DMC Hoodie Day',
    description: 'Join us for in representing DMC through VCU campus by wearing your DMC Hoodie.',
    date: 'October 16, 2024',
      },
 
  {
image: image2,
title: 'General Body Meeting',
description: 'Join us for our monthly meeting to discuss the upcoming events and updates.',
date: 'October 16, 2024',
  },
  {
image: image3,
title: 'LinkedIn/Resume Workshop',
description: 'Join us for a workshop to learn how to create a professional LinkedIn profile and resume.',
date: 'October 10, 2024',
  },
  {
image: image4,
title: 'Community Serivce',
description: 'Join us for a community service event to give back to the Richmond community.',
date: 'October 3, 2024',
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