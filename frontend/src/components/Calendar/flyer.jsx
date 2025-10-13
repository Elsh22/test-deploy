'use client';
import React from 'react';
import Image from 'next/image';
import image1 from '../../assets/FLYERS/BasketballTournament.jpg';
import image2 from '../../assets/FLYERS/2ndGBM.jpg';
import image3 from '../../assets/FLYERS/ShadowDay.PNG';
import { Description } from '@mui/icons-material';

const FlyerPost = () => {
  const flyers = [
    {
      image: image2,
      title: '2nd General Body Meeting',
      description:
        'Join us for our 2nd general body meeting of the semester to learn more about DMC and engage with our community.',
      date: 'October 15, 2025',
    },
    {
    image: image1,
    title: 'DMC Basketball Tournament',
    description: 
    'We’re happy to announce the DMC 5v5 Basketball Tournament! Pair up with your best players and fight through the tournament to claim victory! We’ll be providing a generous cash prize to the victorious team, so be sure to give it your all!',
    date: 'November 8, 2025',
    },
    {
      image: image3,
      title: 'DMC Shadow Day',
      description:
      'Join us in our DMC Shadow Day! Get an opprotunity to pair with a student and show what is like a day in the life of a college student!',
      date: 'Coming Soon',
    }
  ];

  return (
    <section className="bg-black border-t-4 border-b-4 border-yellow-400 py-16">
      <div className="flex flex-wrap justify-center gap-10 px-4">
        {flyers.map((flyer, index) => (
          <div
            key={index}
            className="w-full sm:w-80 lg:w-96 bg-black rounded-2xl shadow-[0_0_20px_#FFD700] hover:shadow-[0_0_40px_#FFD700] transition-shadow duration-300 overflow-hidden flex flex-col items-center text-center"
          >
            {/* Image */}
            <div className="relative w-full h-auto border-4 border-yellow-400 rounded-t-2xl overflow-hidden">
              <Image
                src={flyer.image}
                alt={flyer.title}
                width={400}
                height={600}
                objectFit="contain"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">{flyer.title}</h3>
              <p className="text-gray-300 text-lg">{flyer.description}</p>
              <p className="text-gray-400 text-base mt-3">{flyer.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlyerPost;
