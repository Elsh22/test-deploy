'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaPlay } from 'react-icons/fa';

const Youtube = () => {
  const videos = [
    { videoId: '0M6I3KH3x28', title: 'Video 1' },
    { videoId: '6novGvOabco', title: 'Video 2' },
    { videoId: 'H1qklEi04lc', title: 'Video 3' },
    { videoId: 'L9VGDJ4tuN0', title: 'Video 4' },
    { videoId: '1BoLVFluhak', title: 'Video 5' },
    { videoId: '3C5SlNyqfvo', title: 'Video 6' },
    { videoId: '0P37B_g8lfQ', title: 'Video 7' },
    { videoId: 'S-9xvaDMl7k', title: 'Video 8' },
    { videoId: 'M4TUCKbL4Bk', title: 'Video 9' },
    { videoId: 'fZVZHmwDTeo', title: 'Video 10' },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const handleVideoClick = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <section className="py-8">
      <div className="flex justify-center">
        <h2 className="text-2xl font-bold mb-4 text-center">YouTube Videos</h2>
      </div>
      <Slider {...settings}>
        {videos.map((video) => (
          <div key={video.videoId} className="px-2">
            <div
              className="relative cursor-pointer"
              onClick={() => handleVideoClick(video.videoId)}
            >
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
                alt={video.title}
                className="w-full h-auto rounded"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <FaPlay className="text-white text-4xl opacity-80 hover:opacity-100 transition duration-300" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Youtube;