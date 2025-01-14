'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Building2, GraduationCap, Pause, Play } from 'lucide-react';
import Link from 'next/link';

const Partnerships = () => {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('right');
  const scrollSpeed = 1;

  const universities = [
    {
      name: "Virginia Commonwealth University",
      shortName: "VCU",
      description: "Leading innovation in computer science and entrepreneurship",
      type: "university",
    },
    {
      name: "James Madison University",
      shortName: "JMU",
      description: "Excellence in technology and business education",
      type: "university",
    },
    {
      name: "Old Dominion University",
      shortName: "ODU",
      description: "Advancing technology education and research",
      type: "university",
    },
  ];

  const partners = [
    {
      name: "Virginia Credit Union",
      description: "Supporting financial education and growth",
      type: "partner",
    },
    {
      name: "CIS Richmond",
      description: "Empowering technology initiatives in the community",
      type: "partner",
    },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    let animationFrameId;

    const scroll = () => {
      if (!container || isPaused) return;

      if (scrollDirection === 'right') {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
          setScrollDirection('left');
        }
      } else {
        container.scrollLeft -= scrollSpeed;
        if (container.scrollLeft <= 1) {
          setScrollDirection('right');
        }
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused, scrollDirection]);

  const handleClick = (e) => {
    if (e.target !== scrollContainerRef.current) {
      setIsPaused(true);
    }
  };

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Partners & Universities</h2>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label={isPaused ? "Play animation" : "Pause animation"}
          >
            {isPaused ? <Play size={24} /> : <Pause size={24} />}
          </button>
        </div>

        {/* Scrollable Container with Custom Scrollbar */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            onClick={handleClick}
            className="flex gap-6 pb-8 overflow-x-auto cursor-grab active:cursor-grabbing 
                     scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200 
                     scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            style={{
              scrollbarWidth: 'thin',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Universities */}
            {universities.map((uni) => (
              <div
                key={uni.name}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{uni.shortName}</h3>
                  <p className="text-gray-600 mb-4">{uni.description}</p>
                  <Link 
                    href="/unimembership"
                    className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}

            {/* Partners */}
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Building2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                  <p className="text-gray-600 mb-4">{partner.description}</p>
                  <Link 
                    href="/partnership"
                    className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-full hover:bg-green-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <Link 
            href="/newchapter"
            className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors text-center"
          >
            Start a Chapter
          </Link>
          <Link 
            href="/partnership"
            className="bg-green-600 text-white py-3 px-6 rounded-full hover:bg-green-700 transition-colors text-center"
          >
            Become a Sponsor
          </Link>
          <Link 
            href="/partnership"
            className="bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition-colors text-center"
          >
            Become a Partner
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Partnerships;