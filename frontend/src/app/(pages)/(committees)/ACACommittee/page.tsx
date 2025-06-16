"use client";
import React from 'react';
import Example from './ImagesScroller';
import HomePage from './Hero'
import AcademicPrograms from './Programs'

const ACACommitteePage = () => {
  return (
    <div className="min-h-screen bg-dmc-light-gray">
      <HomePage />
      <AcademicPrograms />
      <Example />
    </div>
  );
};

export default ACACommitteePage;
  