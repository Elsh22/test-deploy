'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Kwame from '../../../../assets/EBOARD2025/Kwame2025.jpg';

const KwamePage = () => (
  <EboardProfileTemplate
    name="Kwame Mensah"
    role="Parliamentarian"
    image={Kwame}
    linkedin="https://www.linkedin.com/in/mensahko/"
    highlight="Kwame helps DMC meetings and leadership processes run with structure, order, and accountability."
    details={[
      { label: 'Major', value: 'Computer Science with a concentration in Cybersecurity and a minor in General Business' },
      { label: 'Class', value: 'Senior' },
      { label: 'Organizations', value: 'President, Phi Delta Chapter of Omega Psi Phi Fraternity, Incorporated' },
      { label: 'Future Plans', value: 'Become an ethical hacker or penetration tester, move to Charlotte or Dallas, travel, and build a business.' },
    ]}
  />
);

export default KwamePage;
