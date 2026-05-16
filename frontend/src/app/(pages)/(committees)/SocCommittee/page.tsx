"use client";

import React from 'react';
import CommitteePageTemplate from '../CommitteePageTemplate';
import DMCOlympicsImg from '../../../../assets/Miscellaneous/2.png';
import SportsEventImg from '../../../../newassest/Soccerball.JPG';
import CommitteeGamesImg from '../../../../newassest/sports3.jpg';

const SocCommitteePage = () => {
  return (
    <CommitteePageTemplate
      eyebrow="Social Committee"
      title="Social Committee"
      subtitle="Creating the moments that make DMC feel connected, energized, and easy to belong to."
      heroImage={DMCOlympicsImg}
      groupMeLink="https://groupme.com/join_group/89916344/ZkE6p97c"
      groupMeLabel="Join Social GroupMe"
      focusAreas={['Member connection', 'Campus events', 'Brotherhood building']}
      programs={[
        {
          img: DMCOlympicsImg,
          title: 'DMC Olympics',
          description: 'A signature event built around friendly competition, team spirit, and fun.',
        },
        {
          img: SportsEventImg,
          title: 'Sports Events',
          description: 'Casual and competitive activities that bring members together outside meetings.',
        },
        {
          img: CommitteeGamesImg,
          title: 'Committee Games',
          description: 'Committee-versus-committee challenges where teamwork and strategy take center stage.',
        },
      ]}
    />
  );
};

export default SocCommitteePage;
