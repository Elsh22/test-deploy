"use client";

import React from 'react';
import CommitteePageTemplate from '../CommitteePageTemplate';
import TechTalkImg from '../../../../newassest/IT3.jpg';
import HackathonImg from '../../../../newassest/IT2.jpg';
import WorkshopImg from '../../../../newassest/IT5.jpg';

const ITCommitteePage = () => {
  return (
    <CommitteePageTemplate
      eyebrow="Information Technology Committee"
      title="Information Technology Committee"
      subtitle="Building the technical backbone of DMC while helping members explore software, digital tools, and career-ready skills."
      heroImage={TechTalkImg}
      groupMeLink="https://web.groupme.com/join_group/96138862/KuAOiW33"
      groupMeLabel="Join IT GroupMe"
      focusAreas={['Technical workshops', 'Digital systems', 'Career exploration']}
      programs={[
        {
          img: TechTalkImg,
          title: 'Tech Talk Series',
          description: 'Conversations with technologists, students, and industry voices about real career paths.',
        },
        {
          img: HackathonImg,
          title: 'Build Sessions',
          description: 'Hands-on opportunities to prototype, solve problems, and learn by making.',
        },
        {
          img: WorkshopImg,
          title: 'Technical Workshops',
          description: 'Practical sessions around tools, web development, systems, and emerging technology.',
        },
      ]}
    />
  );
};

export default ITCommitteePage;
