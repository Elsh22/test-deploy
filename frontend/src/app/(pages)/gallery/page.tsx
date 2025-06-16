"use client";
import React from 'react';
import GalleryPhoto from "../../../components/Gallery/GalleryPhoto";
import Instagram from "../../../components/Gallery/Instagram";

const GalleryPage = () => {
  return (
    <div className='min-h-screen bg-dmc-light-gray'>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-dmc-black via-dmc-charcoal to-dmc-black text-dmc-white pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-dmc-hero font-dmc-primary text-dmc-gold mb-4">
            DMC Gallery
          </h1>
          <div className="w-24 h-1 bg-dmc-gold mx-auto mb-6"></div>
          <p className="text-dmc-h4 text-dmc-silver max-w-3xl mx-auto">
            Capturing moments, celebrating achievements, and showcasing our vibrant community through photos and memories
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-dmc-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Instagram Feed Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-dmc-h1 font-dmc-primary text-dmc-gold mb-4">
                Latest from Instagram
              </h2>
              <div className="w-16 h-1 bg-dmc-gold mx-auto mb-6"></div>
              <p className="text-dmc-body text-dmc-dark-gray max-w-2xl mx-auto">
                Follow us on social media for the latest updates and behind-the-scenes moments
              </p>
            </div>
            <Instagram />
          </div>

          {/* Photo Gallery Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-dmc-h1 font-dmc-primary text-dmc-gold mb-4">
                Photo Collection
              </h2>
              <div className="w-16 h-1 bg-dmc-gold mx-auto mb-6"></div>
              <p className="text-dmc-body text-dmc-dark-gray max-w-2xl mx-auto">
                Browse through our extensive collection of photos from events, meetings, community service, and special moments
              </p>
            </div>
            <GalleryPhoto />
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-dmc-black to-dmc-charcoal rounded-dmc-xl p-12 text-center">
              <h3 className="text-dmc-h2 font-dmc-primary text-dmc-gold mb-4">
                Share Your DMC Moments
              </h3>
              <p className="text-dmc-body text-dmc-silver mb-8 max-w-2xl mx-auto">
                Have photos from DMC events? Tag us on social media or send them to us to be featured in our gallery!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://www.instagram.com/vcu.dmc/" target="_blank" rel="noopener noreferrer">
                  <button className="btn-dmc-primary px-8 py-3">
                    Follow on Instagram
                  </button>
                </a>
                <a href="mailto:vcu.dmc@gmail.com">
                  <button className="btn-dmc-secondary px-8 py-3">
                    Submit Photos
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;