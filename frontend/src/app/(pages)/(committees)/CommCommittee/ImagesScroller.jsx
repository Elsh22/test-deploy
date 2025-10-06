'use client';

import HorizontalScrollCarousel from '../HorizontalScrollCarousel';
import JacobImg from '../../../../newassest/Com.jpg';
import United2Heal from '../../../../newassest/community.PNG';
import CollegeDay from '../../../../newassest/Benford.jpg';

const CommunityProgramsCarousel = () => {
  const cards = [
    { id: 1, url: JacobImg, title: 'Jacob Chance' },
    { id: 2, url: United2Heal, title: 'United2Heal' },
    { id: 3, url: CollegeDay, title: 'College Day' },
  ];

  return (
    <div className="my-12">
      <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-8">
        Explore Our Community Service Programs
      </h2>
      <HorizontalScrollCarousel cards={cards} />
    </div>
  );
};

export default CommunityProgramsCarousel;
