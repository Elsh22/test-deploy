'use client';

import HorizontalScrollCarousel from '../HorizontalScrollCarousel';
import DMCOlympicsImg from '../../../../assets/Miscellaneous/2.png';
import SportsEventImg from '../../../../newassest/Soccerball.JPG';
import CommitteeGamesImg from '../../../../newassest/sports3.jpg';

const SocialEventsCarousel = () => {
  const cards = [
    { id: 1, url: DMCOlympicsImg, title: 'DMC Olympics' },
    { id: 2, url: SportsEventImg, title: 'Sports Event' },
    { id: 3, url: CommitteeGamesImg, title: 'Committee vs Committee Games' },
  ];

  return (
    <div className="my-12">
      <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-8">
        Explore Our Social Committee Events
      </h2>
      <HorizontalScrollCarousel cards={cards} />
    </div>
  );
};

export default SocialEventsCarousel;
