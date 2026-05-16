'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Thurman from '../../../../assets/EBOARD2025/Thurman.jpg';

const ThurmanPage = () => (
  <EboardProfileTemplate
    name="Thurman Smith Jr."
    role="Director of Mentorship"
    image={Thurman}
    linkedin="https://www.linkedin.com/in/thurmansmithjr/"
    highlight="Thurman helps shape DMC's mentorship structure so members can find guidance, accountability, and community."
    details={[
      { label: 'Major', value: 'Electrical Engineering' },
      { label: 'Class', value: 'Junior' },
      { label: 'Organizations', value: 'Vice President, National Society of Black Engineers at VCU; Vice President, Black Student Union at VCU' },
      { label: 'Future Plans', value: 'Work with his father as an electrical contractor or pursue a career as an electrical design engineer.' },
    ]}
  />
);

export default ThurmanPage;
