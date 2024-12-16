"use client";
import React from 'react';
import Example from './ImagesScroller';
import Hero from './Hero';
import ITCommitteePrograms from './Programs'

const ITCommitteePage = () => {
    return (
      <div>
        <Hero />
        <ITCommitteePrograms />
        <Example />
      </div>
    );
  };
  
  export default ITCommitteePage;