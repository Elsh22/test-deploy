"use client";
import React from 'react';
import GalleryPhoto from "../../components/Gallery/GalleryPhoto";
import Instagram from "../../components/Gallery/Instagram";

const GalleryPage = () => {
    return (
      <div className='mt-20'>
        <h1 className="text-center font-bold text-2xl">Gallery</h1>
        <Instagram />
        <GalleryPhoto />
      </div>
    );
  };
  
  export default GalleryPage;