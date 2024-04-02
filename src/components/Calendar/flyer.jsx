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
    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '40px 0' }}>
      {flyers.map((flyer, index) => (
        <div key={index} style={{ width: '250px', textAlign: 'center' }}>
          <div style={{ height: '250px', position: 'relative', overflow: 'hidden', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <Image src={flyer.image} alt={flyer.title} layout="fill" objectFit="cover" />
          </div>
          <h3 style={{ marginTop: '20px', fontSize: '1.5rem' }}>{flyer.title}</h3>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>{flyer.description}</p>
          <p style={{ color: '#999', fontSize: '1rem', marginTop: '10px' }}>{flyer.date}</p>        </div>
      ))}
    </div>
  );
};

export default FlyerPost;