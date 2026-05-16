'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Mo from '../../../../assets/EBOARD2025/Mo2025.jpg';

const DirectorOfCommitteesPage = () => (
  <EboardProfileTemplate
    name="Mohamed Turay"
    role="Director of Committees"
    image={Mo}
    linkedin="https://www.linkedin.com/in/mohamed-turay/"
    highlight="Mohamed helps coordinate DMC's committees so members can lead, collaborate, and move ideas into action."
    details={[
      { label: 'Major', value: 'Management Information Systems / AI' },
      { label: 'Class', value: 'Junior' },
      { label: 'Organizations', value: 'DMC and VCU Professional Selling Team' },
      { label: 'Future Plans', value: 'Pursue a career in data analytics or tech risk.' },
    ]}
  />
);

export default DirectorOfCommitteesPage;
