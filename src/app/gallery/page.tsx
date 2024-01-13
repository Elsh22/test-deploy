"use client";
import React from 'react';
import GalleryPhoto from "../../components/Gallery/GalleryPhoto";
import Instagram from "../../components/Gallery/Instagram";

const GalleryPage = () => {
    return (
      <div>
        <h1 className="text-center font-bold text-2xl mt-20">Gallery</h1>
        <Instagram />
        <GalleryPhoto />
      </div>
    );
  };
  
  export default GalleryPage;