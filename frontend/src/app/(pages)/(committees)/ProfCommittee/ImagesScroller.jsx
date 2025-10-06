'use client';

import HorizontalScrollCarousel from '../HorizontalScrollCarousel';
import LinkedInWorkshopImg from '../../../../newassest/LinkedIn2.jpg';
import SuitDayImg from '../../../../newassest/Play3.jpg';
import ResumeWorkshopImg from '../../../../newassest/Newsletter.jpg';

const ProfDevProgramsCarousel = () => {
  const cards = [
    { id: 1, url: LinkedInWorkshopImg, title: 'LinkedIn Workshop' },
    { id: 2, url: SuitDayImg, title: 'Suit Day' },
    { id: 3, url: ResumeWorkshopImg, title: 'Resume Workshop' },
  ];

  return (
    <div className="my-12">
      <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-8">
        Explore Our Professional Development Programs
      </h2>
      <HorizontalScrollCarousel cards={cards} />
    </div>
  );
};

export default ProfDevProgramsCarousel;
