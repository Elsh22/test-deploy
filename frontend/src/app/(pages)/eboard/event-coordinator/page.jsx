'use client';

import React from 'react';
import EboardProfileTemplate from '../EboardProfileTemplate';
import Clyde from '../../../../assets/EBOARD2025/Clyde2025.jpg';

const ClydeClarkPage = () => (
  <EboardProfileTemplate
    name="Clyde Clark III"
    role="Event Coordinator"
    image={Clyde}
    linkedin="https://www.linkedin.com/in/clyde-clark-iii-9072b6202/"
    highlight="Clyde helps bring DMC events to life, coordinating experiences that connect members and strengthen the organization."
    details={[
      { label: 'Major', value: 'Political Science / Pre-Law' },
      { label: 'Class', value: 'Senior' },
      { label: 'Organizations', value: 'DMC and Student Government Association' },
      { label: 'Future Plans', value: 'Pursue a career in law or public policy.' },
    ]}
  />
);

export default ClydeClarkPage;
