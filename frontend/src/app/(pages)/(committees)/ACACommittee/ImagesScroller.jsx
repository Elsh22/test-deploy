'use client';

import HorizontalScrollCarousel from '../HorizontalScrollCarousel';
import studySessionImg from '../../../../newassest/academ.jpeg';
import tutoringImg from '../../../../newassest/LinkedIn2.jpg';
import resourceFairImg from '../../../../newassest/LinkedIn.jpg';

const AcademicProgramsCarousel = () => {
  const cards = [
    { id: 1, url: studySessionImg, title: 'Study Session' },
    { id: 2, url: tutoringImg, title: 'Tutoring' },
    { id: 3, url: resourceFairImg, title: 'Resource Fair' },
  ];

  return (
    <div className="my-12">
      <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-8">
        Explore Our Academic Programs
      </h2>
      <HorizontalScrollCarousel cards={cards} />
    </div>
  );
};

export default AcademicProgramsCarousel;
