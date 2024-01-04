'use client';
import React from 'react'
import SportsAbout from './SportsAbout'
import SportsSteps from './SportsSteps'



const Sports = ({id}) => {
  return (
    <div id={id}>
    <SportsAbout />
    <SportsSteps />
    </div>
  )
}

export default Sports