"use client";

import React from 'react';
import CommitteePageTemplate from '../CommitteePageTemplate';
import JacobImg from '../../../../newassest/Com.jpg';
import United2Heal from '../../../../newassest/community.PNG';
import CollegeDay from '../../../../newassest/Benford.jpg';

const CommCommitteePage = () => {
  return (
    <CommitteePageTemplate
      eyebrow="Community Service Committee"
      title="Community Service Committee"
      subtitle="Turning DMC's values into service by connecting members with meaningful volunteer work across campus and Richmond."
      heroImage={United2Heal}
      groupMeLink="https://groupme.com/join_group/89916463/uBQYKr0c"
      focusAreas={['Local service', 'Youth outreach', 'Community partnerships']}
      programs={[
        {
          img: JacobImg,
          title: 'Jacob Chance',
          description: 'Supporting inclusive sports opportunities and creating space for children with disabilities.',
        },
        {
          img: United2Heal,
          title: 'United2Heal',
          description: 'Packing and preparing medical equipment for communities with limited access to supplies.',
        },
        {
          img: CollegeDay,
          title: 'College Day',
          description: 'Welcoming local students to VCU so they can experience campus and imagine what comes next.',
        },
      ]}
    />
  );
};

export default CommCommitteePage;
