"use client";

import React from 'react';
import CommitteePageTemplate from '../CommitteePageTemplate';
import LinkedInWorkshopImg from '../../../../newassest/LinkedIn2.jpg';
import SuitDayImg from '../../../../newassest/Play3.jpg';
import ResumeWorkshopImg from '../../../../newassest/Newsletter.jpg';

const ProfCommitteePage = () => {
  return (
    <CommitteePageTemplate
      eyebrow="Professional Development Committee"
      title="Professional Development Committee"
      subtitle="Preparing members for interviews, internships, networking, and career moments where confidence and polish matter."
      heroImage={LinkedInWorkshopImg}
      groupMeLink="https://web.groupme.com/join_group/89916400/H3d6zVwp"
      groupMeLabel="Join Professional GroupMe"
      focusAreas={['Resume support', 'Networking', 'Career confidence']}
      programs={[
        {
          img: LinkedInWorkshopImg,
          title: 'LinkedIn Workshop',
          description: 'Helping members strengthen their online presence and tell their professional story clearly.',
        },
        {
          img: SuitDayImg,
          title: 'Suit Day',
          description: 'Professional attire, confidence-building, and preparation for interviews and career events.',
        },
        {
          img: ResumeWorkshopImg,
          title: 'Resume Workshop',
          description: 'Structured feedback to help members turn experience into strong, readable resumes.',
        },
      ]}
    />
  );
};

export default ProfCommitteePage;
