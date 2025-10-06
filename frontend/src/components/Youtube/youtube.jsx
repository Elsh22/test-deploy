'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaPlay } from 'react-icons/fa';

const Youtube = () => {
  const videos = [
    { videoId: 'BidFVxIBaHo', title: '' },
    { videoId: 'kNX907_j3_g', title: '' },
    { videoId: 'tf0tBafdo0k', title: '' },
    { videoId: '0M6I3KH3x28', title: '' },
    { videoId: '6novGvOabco', title: '' },
    { videoId: 'H1qklEi04lc', title: '' },
    { videoId: 'L9VGDJ4tuN0', title: '' },
    { videoId: '1BoLVFluhak', title: '' },
    { videoId: '3C5SlNyqfvo', title: '' },
    { videoId: '0P37B_g8lfQ', title: '' },
    { videoId: 'S-9xvaDMl7k', title: '' },
    { videoId: 'M4TUCKbL4Bk', title: '' },
    { videoId: 'fZVZHmwDTeo', title: '' },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const handleVideoClick = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <section className="py-12 bg-black relative">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
          YouTube Videos
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Slider */}
      <Slider {...settings} className="max-w-6xl mx-auto">
        {videos.map((video) => (
          <div key={video.videoId} className="px-3">
            <div
              className="relative cursor-pointer rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] transition-all duration-500"
              onClick={() => handleVideoClick(video.videoId)}
            >
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
                alt={video.title}
                className="w-full h-56 md:h-48 lg:h-60 object-cover"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <FaPlay className="text-yellow-400 text-5xl md:text-6xl animate-pulse" />
              </div>
              {/* Video title */}
              <div className="absolute bottom-0 left-0 w-full bg-black/60 px-3 py-2 text-white text-center text-sm md:text-base font-semibold">
                {video.title}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Youtube;
