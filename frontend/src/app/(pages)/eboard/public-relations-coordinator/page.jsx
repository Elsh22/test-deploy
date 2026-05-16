'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Jason from '../../../../assets/EBOARD2025/Jason2025.jpg';

const JasonPage = () => (
  <EboardProfileTemplate
    name="Jason Gallardo Gonzalez"
    role="Public Relations Director"
    image={Jason}
    linkedin="https://www.linkedin.com/in/jason-gallardo-gonzalez/"
    email="flaco@visualizecollective.com"
    highlight="Jason shapes DMC's public image, storytelling, and media presence across campus and beyond."
    details={[
      { label: 'Major', value: 'Marketing with a minor in Sports/Fitness Management' },
      { label: 'Class', value: 'Senior' },
      { label: 'Organizations', value: 'Visualize Collective Media; Instagram: @flacovangogh' },
      { label: 'Future Plans', value: 'Continue growing Visualize Collective Media and pursue opportunities in sports marketing, especially in the NBA.' },
    ]}
  />
);

export default JasonPage;
