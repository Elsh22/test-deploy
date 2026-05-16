"use client";

import React from 'react';
import CommitteePageTemplate from '../CommitteePageTemplate';
import HealthHero from '../../../../newassest/academic.jpeg';
import WellnessImg from '../../../../newassest/ITPicImproved.png';
import ServiceImg from '../../../../newassest/community.PNG';
import WorkshopImg from '../../../../newassest/CGIPic.png';

const HealthCommitteePage = () => {
  return (
    <CommitteePageTemplate
      eyebrow="Health Committee"
      title="Health Committee"
      subtitle="Supporting member wellness, health-care exploration, and service-minded programming for students interested in health fields."
      heroImage={HealthHero}
      groupMeLabel="Get Involved"
      focusAreas={['Wellness', 'Health-care pathways', 'Service education']}
      programs={[
        {
          img: WellnessImg,
          title: 'Wellness Check-ins',
          description: 'Programs that make space for mental health, balance, and support during demanding semesters.',
        },
        {
          img: ServiceImg,
          title: 'Health Service Projects',
          description: 'Service opportunities connected to public health, outreach, and community care.',
        },
        {
          img: WorkshopImg,
          title: 'Health Career Prep',
          description: 'Panels and workshops for members exploring medicine, health sciences, and care-centered careers.',
        },
      ]}
    />
  );
};

export default HealthCommitteePage;
