'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Shawn from '../../../../assets/EBOARD2025/Shawn2025.jpg';

const DirectorOfITPage = () => (
  <EboardProfileTemplate
    name="Shawn Watson"
    role="Director of IT"
    image={Shawn}
    email="watsonsm2@vcu.edu"
    highlight="Shawn leads the technical side of DMC, supporting digital tools, systems, and technology-focused member growth."
    details={[
      { label: 'Major', value: 'Computer Science and Mathematics with a minor in AI' },
      { label: 'Class', value: 'Junior' },
      { label: 'Organizations', value: 'President, Delta Upsilon Chapter of Phi Beta Sigma Fraternity, Inc.; Student Director, Emerging Leaders Program; NSBE member' },
      { label: 'Future Plans', value: 'Start a video game company and become a professor at an HBCU.' },
    ]}
  />
);

export default DirectorOfITPage;
