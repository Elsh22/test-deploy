'use client';

import HorizontalScrollCarousel from '../HorizontalScrollCarousel';
import TechTalkImg from '../../../../newassest/IT3.jpg';
import HackathonImg from '../../../../newassest/IT2.jpg';
import WorkshopImg from '../../../../newassest/IT5.jpg';

const ITProgramsCarousel = () => {
  const cards = [
    { id: 1, url: TechTalkImg, title: 'Tech Talk Series' },
    { id: 2, url: HackathonImg, title: 'Annual Hackathon' },
    { id: 3, url: WorkshopImg, title: 'Technical Workshops' },
  ];

  return (
    <div className="my-12">
      <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-8">
        Explore Our IT Programs
      </h2>
      <HorizontalScrollCarousel cards={cards} />
    </div>
  );
};

export default ITProgramsCarousel;
