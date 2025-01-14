"use client";
import React, { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const AnimatedCard = ({ tier, index, isLast }) => {
  const router = useRouter();
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: "-10px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleLearnMore = () => {
    router.push(tier.learnMoreRoute);
  };

  const handleJoinNow = () => {
    router.push(tier.joinRoute);
  };

  return (
    <div ref={cardRef} className="flex flex-col items-center group w-full sm:w-auto">
      <div
        className={`
          ${tier.color} 
          w-full sm:w-72 h-auto min-h-[280px] sm:h-80
          rounded-xl 
          shadow-xl 
          transition-all 
          duration-500 
          hover:scale-105
          hover:shadow-2xl
          flex 
          items-center 
          justify-center
          cursor-pointer
          relative
          overflow-hidden
          ${index === 0 ? 'mt-0' : 
            index === 1 ? 'mt-4 sm:mt-8' : 
            index === 2 ? 'mt-4 sm:mt-16' : 
            index === 3 ? 'mt-4 sm:mt-8' : 'mt-4 sm:mt-0'}
        `}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.6s ease-out",
        }}
      >
        {/* Default State */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 group-hover:opacity-0">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-3">
            {tier.title}
          </h3>
          <div className="w-16 h-1 bg-blue-600 rounded mb-3" />
          <p className="text-sm text-gray-600 text-center">
            {tier.shortDesc}
          </p>
        </div>

        {/* Hover/Touch State */}
        <div className="absolute inset-0 p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center bg-opacity-95">
          <p className="text-sm sm:text-base text-gray-700 text-center mb-4 sm:mb-6 leading-relaxed">
            {tier.description}
          </p>
          <div className="space-y-2 sm:space-y-3 w-full">
            <button 
              onClick={handleLearnMore}
              className="w-full bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Learn More
            </button>
            <button 
              onClick={handleJoinNow}
              className="w-full bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Join Now
            </button>
          </div>
        </div>
      </div>

      {/* Connection Lines - Mobile */}
      {!isLast && (
        <div className="flex lg:hidden justify-center w-full my-2">
          <ChevronDown className="text-blue-400" size={24} />
        </div>
      )}

      {/* Connection Lines - Desktop */}
      {!isLast && (
        <div className="hidden lg:flex items-center space-x-2 absolute -right-12 top-1/2 transform -translate-y-1/2">
          <div className="h-0.5 w-16 bg-blue-300" />
          <ArrowRight className="text-blue-400" size={24} />
        </div>
      )}
    </div>
  );
};

const Structure = () => {
  const tiers = [
    {
      title: "Mentees",
      color: "bg-gradient-to-br from-blue-100 to-blue-200",
      shortDesc: "Begin your journey with expert guidance",
      description: "Start your journey as a mentee and gain valuable guidance from experienced professionals in your field.",
      learnMoreRoute: "/unimembership",
      joinRoute: "/unimembership/mentee"
    },
    {
      title: "University Members",
      color: "bg-gradient-to-br from-blue-200 to-blue-300",
      shortDesc: "Connect with your university network",
      description: "Access exclusive university resources and build meaningful connections with fellow students.",
      learnMoreRoute: "/unimembership",
      joinRoute: "/unimembership"
    },
    {
      title: "Alumni",
      color: "bg-gradient-to-br from-blue-300 to-blue-400",
      shortDesc: "Stay connected and grow professionally",
      description: "Join our thriving network of graduates and continue your professional development journey.",
      learnMoreRoute: "/non_profitmembership",
      joinRoute: "/contactus"
    },
    {
      title: "Non-Profit Members",
      color: "bg-gradient-to-br from-blue-400 to-blue-500",
      shortDesc: "Make an impact in your community",
      description: "Contribute to meaningful causes and create positive change in your community through active involvement.",
      learnMoreRoute: "/non_profitmembership",
      joinRoute: "/non_profitsignup"
    },
    {
      title: "Non-Profit Board",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      shortDesc: "Lead and shape our future",
      description: "Take a leadership role in shaping the future of our organization and driving impactful initiatives.",
      learnMoreRoute: "/non_profitmembership",
      joinRoute: "/non_profitsignup"
    },
  ];

  return (
    <div className="py-8 sm:py-16 px-4 md:px-8 lg:px-12 w-full mx-auto overflow-hidden bg-gray-50">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
          Our Structure
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
          Join our community at any level and be part of a supportive network
          dedicated to growth and success.
        </p>
      </div>
      
      <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 sm:gap-6 lg:gap-16">
        {tiers.map((tier, index) => (
          <AnimatedCard
            key={tier.title}
            tier={tier}
            index={index}
            isLast={index === tiers.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Structure;