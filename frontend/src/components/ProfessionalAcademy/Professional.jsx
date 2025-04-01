import React from 'react';
import Image from 'next/image';
import Picture from '../../newassest/dmcclass-3.jpeg';
import './Professional.css';

const Professional = () => {
  return (
    <div className="professional_container">
      <h1>NEW Professional Academy</h1>
      <p>
        Welcome to the Professional Academy – a comprehensive program designed exclusively for VCU students.
        Our mission is to help you perfect your professional profile through resume guidance, LinkedIn optimization, 
        and invaluable career tips. Whether you are pursuing a career in health, tech & engineering, or business, 
        we have the resources to propel your professional journey forward.
      </p>
      
      {/* Visuals Section */}
      <div className="picture_section">
        <Image 
          src={Picture} 
          alt="DMC Class Visual" 
          width={800}
          height={400}
          style={{ borderRadius: '8px' }}
        />
      </div>
      
      <h2>Get Started Today!</h2>
      <div className="cta_section">
        <div className="cta_item">
          <h3>For Health Tracks</h3>
          <a 
            href="https://calendly.com/lewisxm-vcu/new-meeting?month=2025-04" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Schedule an Appointment
          </a>
        </div>
        <div className="cta_item">
          <h3>For Tech & Engineering</h3>
          <a 
            href="https://calendly.com/ziadkashef/carrerprepdmc?month=2025-04" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Schedule an Appointment
          </a>
        </div>
        <div className="cta_item">
          <h3>For Business Students</h3>
          <a 
            href="https://calendly.com/hinesj4-vcu" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Schedule an Appointment
          </a>
        </div>
      </div>
    </div>
  );
};

export default Professional;
