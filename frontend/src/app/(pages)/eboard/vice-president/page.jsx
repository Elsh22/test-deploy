'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Xavier from '../../../../assets/EBOARD2025/Xavier2025.jpg';

const XavierPage = () => (
  <EboardProfileTemplate
    name="Xavier Lewis"
    role="Vice President"
    image={Xavier}
    linkedin="https://www.linkedin.com/in/xaviermlewis/"
    highlight="Xavier supports the executive board's operations and helps guide DMC's programming, partnerships, and member experience."
    details={[
      { label: 'Major', value: 'Biology with minors in Chemistry and Pre-Dentistry' },
      { label: 'Class', value: 'Senior' },
      { label: 'Organizations', value: 'President, Eta Xi Chapter of Kappa Alpha Psi Fraternity, Inc.; Pre-Dental Ambassador; Black Men in Medicine' },
      { label: 'Future Plans', value: 'Attend dental school and attain a D.D.S.' },
    ]}
  />
);

export default XavierPage;
