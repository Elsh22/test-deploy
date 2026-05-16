'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Paul from '../../../../assets/EBOARD2025/Paul2025.jpg';

const PaulPage = () => (
  <EboardProfileTemplate
    name="Paul Adelugba"
    role="Social Media Director"
    image={Paul}
    linkedin="https://www.linkedin.com/in/paul-adeugba/"
    highlight="Paul helps DMC show up online with consistency, energy, and a clear voice."
    details={[
      { label: 'Major', value: 'Mechanical Engineering with minors in Mathematics and Aerospace Engineering' },
      { label: 'Class', value: 'Senior' },
      { label: 'Organizations', value: 'ASU, NSU, and NSBE member' },
      { label: 'Future Plans', value: "Pursue further education through a master's degree." },
    ]}
  />
);

export default PaulPage;
