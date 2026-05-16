'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Kabir from '../../../../assets/EBOARD2025/Kabir2025.jpg';

const KabirPage = () => (
  <EboardProfileTemplate
    name="Kabir Munjwani"
    role="Secretary"
    image={Kabir}
    linkedin="https://www.linkedin.com/in/kabir-munjwani-2389bb319/"
    highlight="Kabir supports communication, records, and organizational clarity across DMC's leadership work."
    details={[
      { label: 'Major', value: 'HPEX with a concentration in Health Science, Chemistry minor, Pre-Dental track' },
      { label: 'Class', value: 'Senior' },
      { label: 'Organizations', value: "President, Katie's Art Project Chapter at VCU" },
      { label: 'Future Plans', value: 'Attend dental school.' },
    ]}
  />
);

export default KabirPage;
