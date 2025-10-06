'use client';
import React from 'react';
import Image from 'next/image';
import image1 from '../../assets/FLYERS/LinkedinWorkshop.jpg';
import image2 from '../../assets/FLYERS/2ndGBM.jpg';

const FlyerPost = () => {
  const flyers = [
    {
      image: image1,
      title: 'DMC LinkedIn Workshop',
      description:
        'Join us for our LinkedIn Workshop! We’ll work on building a profile that showcases your academic progress, accomplishments, and achievements. Make sure your profile reflects the standard of excellence you set every day.',
      date: 'October 9th, 2025',
    },
    {
      image: image2,
      title: '2nd General Body Meeting',
      description:
        'Join us for our 2nd general body meeting of the semester to learn more about DMC and engage with our community.',
      date: 'October 15, 2025',
    },
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
