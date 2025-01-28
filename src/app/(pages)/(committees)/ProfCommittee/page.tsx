"use client";
import React from 'react';
import Example from './ImagesScroller';
import ProfDevPrograms from './Programs';
import HomePage from './Hero'


const ProfCommitteePage = () => {
    return (
      <div>
        <HomePage />
        <ProfDevPrograms />
        <Example />
      </div>
    );
  };
  
  export default ProfCommitteePage;