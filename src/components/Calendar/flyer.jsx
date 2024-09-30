import React from 'react'; 
import Image from 'next/image';
import image1 from '../../newassest/GBM-Flyer.jpg';
import image2 from '../../newassest/MixerFlyerV2.jpg';
import image3 from '../../newassest/InternshipWorkshopFlyer.png';
import image4 from '../../newassest/SovoFairPost.jpg';

const FlyerPost = () => {

  const flyers = [
{
    image: image3,
    title: 'Internship Workshop',
    description: 'Join us for Internship Workshop to learn more about how to secure an internship and what to expect.',
    date: 'October 1, 2024',
      },
 
  {
image: image2,
title: 'DMC Mixer',
description: 'Join us for our annual DMC Mixer to meet other members and learn more about our organization.',
date: 'September 15, 2024',
  },
  {
image: image1,
title: 'General Body Meeting',
description: 'Join us for our monthly meeting to discuss the upcoming events and updates.',
date: 'September 18, 2024',
  },
  {
image: image4,
title: 'Sovo Fair',
description: 'Come and join us at the Sovo Fair to learn more about our organization and how to get involved.',
date: 'August 23, 2024',
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