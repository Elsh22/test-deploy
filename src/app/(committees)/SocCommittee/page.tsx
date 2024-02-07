"use client";
import React from 'react';
import Example from './ImagesScroller';
import HomePage from './Hero';
import SocialCommitteeEvents from './Programs'

const SocCommitteePage = () => {
    return (
      <div>
        <HomePage />
        <SocialCommitteeEvents />
        <Example />
      </div>
    );
  };
  
  export default SocCommitteePage;