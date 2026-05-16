'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Sam from '../../../../assets/EBOARD2025/Sam2025.jpg';

const SamPage = () => (
  <EboardProfileTemplate
    name="Samuel Brannen"
    role="Director of Wellness"
    image={Sam}
    linkedin="https://www.linkedin.com/in/samuel-brannen-ba47b82b4/"
    highlight="Samuel supports wellness-centered programming and helps DMC keep member well-being part of the conversation."
    details={[
      { label: 'Major', value: 'Computer Science with a concentration in Cybersecurity' },
      { label: 'Class', value: 'Junior' },
      { label: 'Organizations', value: 'NSBA member' },
      { label: 'Future Plans', value: 'Pursue a career in cybersecurity.' },
    ]}
  />
);

export default SamPage;
