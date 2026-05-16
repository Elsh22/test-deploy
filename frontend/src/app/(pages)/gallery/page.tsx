"use client";

import React from 'react';
import { Camera, Images } from 'lucide-react';
import GalleryPhoto from '../../../components/Gallery/GalleryFolders';

const GalleryPage = () => {
  return (
    <main className="dmc-dark-section">
      <section className="px-6 pb-16 pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/40 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
            <Camera className="h-4 w-4" />
            DMC Gallery
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h1 className="text-5xl font-black leading-[0.95] sm:text-6xl lg:text-8xl">
              Moments from the brotherhood.
            </h1>
            <div className="dmc-card border p-6">
              <Images className="mb-5 h-8 w-8 text-yellow-400" />
              <p className="dmc-muted text-lg leading-8">
                Browse event albums from mixers, workshops, GBMs, sports, service,
                and campus programs. Click an album to open the photo viewer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GalleryPhoto />
    </main>
  );
};

export default GalleryPage;
