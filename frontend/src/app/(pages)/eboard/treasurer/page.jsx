'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Sean from '../../../../assets/EBOARD2025/Sean2025.jpg';

const SeanPage = () => (
  <EboardProfileTemplate
    name="Sean Goffigan"
    role="Director of Finances"
    image={Sean}
    linkedin="https://www.linkedin.com/in/sean-goffigan-9734b7316/"
    highlight="Sean supports DMC's financial planning, stewardship, and funding decisions."
    details={[
      { label: 'Major', value: 'Finance' },
      { label: 'Class', value: 'Sophomore' },
      { label: 'Organizations', value: 'Member, Student Managed Investment Portfolio' },
      { label: 'Future Plans', value: 'Pursue equity research or wealth and asset management.' },
    ]}
  />
);

export default SeanPage;
