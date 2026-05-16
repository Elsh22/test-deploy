'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Naod from '../../../../assets/EBOARD2025/Naod2025.jpg';

const NaodPage = () => (
  <EboardProfileTemplate
    name="Naod Daniel"
    role="Director of Membership"
    image={Naod}
    highlight="Naod supports member engagement, onboarding, and the systems that help students find their place in DMC."
    details={[
      { label: 'Major', value: 'Computer Science' },
      { label: 'Class', value: 'Junior' },
      { label: 'Organizations', value: 'DMC and Coding Club' },
      { label: 'Future Plans', value: 'Pursue a career in software development or AI research.' },
    ]}
  />
);

export default NaodPage;
