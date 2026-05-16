'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Kaleb from '../../../../assets/EBOARD2025/Kaleb2025.jpg';

const KalebPage = () => (
  <EboardProfileTemplate
    name="Kaleb Brown"
    role="President"
    image={Kaleb}
    linkedin="https://www.linkedin.com/in/kaleb--brown/"
    highlight="Kaleb leads DMC's executive direction and helps keep the organization focused on service, brotherhood, and professional growth."
    details={[
      { label: 'Major', value: 'Information Systems with a Sports Management minor' },
      { label: 'Class', value: 'Junior' },
      { label: 'Organizations', value: 'Students Providing Aid (SPAid), Vice President; NSBE member' },
      { label: 'Future Plans', value: 'Pursue a career in IT or business and create a scholarship fund to help students from his hometown break financial barriers.' },
    ]}
  />
);

export default KalebPage;
