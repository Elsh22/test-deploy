import React from 'react';
import Image from 'next/image';
import Picture from '../../newassest/CGIPic.png';
import './Professional.css';

const Professional = () => {
  return (
    <div className="professional_container">
      <h1>NEW Professional Academy</h1>
      <p>
      At the  Professional Academy, we transform career readiness for men of color through peer-to-peer mentoring in personalized 30-40 minute sessions. Our approach connects students with mentors who've already found success in similar paths, creating authentic connections and advice that resonates. In a relaxed setting, we help polish resumes with both technical fixes and strategic improvements that catch recruiters' eyes. We overhaul LinkedIn profiles on the spot and take professional headshots to replace awkward selfies. Our mentors shares real-world insights about what actually works in job searches, not just theory.

          <br/><br/>

      We've addressed practical barriers by offering free tie rentals and shoe shining services because we know these details matter but aren't always accessible. Every participant leaves with clear next steps and resources to continue their professional growth. We've built a program that bridges the gap between classroom learning and workplace success, giving men of color not just better documents, but greater confidence and community support as they launch their careers.


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
