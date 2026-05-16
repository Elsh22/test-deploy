"use client";

import React from 'react';
import CommitteePageTemplate from '../CommitteePageTemplate';
import studySessionImg from '../../../../newassest/academ.jpeg';
import tutoringImg from '../../../../newassest/LinkedIn2.jpg';
import resourceFairImg from '../../../../newassest/LinkedIn.jpg';

const ACACommitteePage = () => {
  return (
    <CommitteePageTemplate
      eyebrow="Academic Committee"
      title="Academic Committee"
      subtitle="Helping DMC members stay prepared, supported, and connected to the academic resources that make college feel navigable."
      heroImage={studySessionImg}
      groupMeLink="https://groupme.com/join_group/90176811/E5gNlYKq"
      focusAreas={['Study support', 'Campus resources', 'Peer accountability']}
      programs={[
        {
          img: studySessionImg,
          title: 'Study Sessions',
          description: 'Focused spaces where members study together, share strategies, and stay accountable.',
        },
        {
          img: tutoringImg,
          title: 'Tutoring',
          description: 'Subject help and guidance from peers who understand the demands of VCU coursework.',
        },
        {
          img: resourceFairImg,
          title: 'Resource Fair',
          description: 'Connections to campus offices, academic resources, and support systems members can use.',
        },
      ]}
    />
  );
};

export default ACACommitteePage;
