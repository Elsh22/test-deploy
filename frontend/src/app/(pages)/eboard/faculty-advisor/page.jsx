'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Goode from '../../../../assets/EBOARD2025/Goode2025.jpg';

const DrGoodePage = () => (
  <EboardProfileTemplate
    name="Dr. Carlton Goode"
    role="Faculty Advisor"
    image={Goode}
    linkedin="https://www.linkedin.com/in/carlton-goode-ed-d-69172815/"
    highlight="Dr. Goode advises DMC leadership and supports the organization's mission of mentorship, belonging, and student success."
    details={[
      { label: 'Organizations', value: 'Director of Intercultural Success & Initiatives' },
      { label: 'Major', value: 'Bachelor of Arts in Psychology, Shaw University; Master of Science in Student Development, University of Iowa' },
      { label: 'Class', value: 'Doctorate in Education Leadership, Virginia Commonwealth University' },
    ]}
  />
);

export default DrGoodePage;
