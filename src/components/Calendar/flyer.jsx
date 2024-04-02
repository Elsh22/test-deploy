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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {flyers.map((flyer, index) => (
        <div key={index} style={{ width: '200px' }}>
          <Image src={flyer.image} alt={flyer.title} width={200} height={200} />
          <h3>{flyer.title}</h3>
          <p>{flyer.description}</p>
          <p>{flyer.date}</p>
        </div>
      ))}
    </div>
  );
};

export default FlyerPost;