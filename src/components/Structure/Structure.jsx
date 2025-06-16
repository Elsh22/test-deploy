"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Users, GraduationCap, Briefcase, Heart, Crown } from "lucide-react";
import { useRouter } from "next/navigation";

const AnimatedCard = ({ tier, index, isLast }) => {
  const router = useRouter();
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observerTarget = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "-20px",
      }
    );

    if (observerTarget) {
      observer.observe(observerTarget);
    }

    return () => {
      if (observerTarget) {
        observer.unobserve(observerTarget);
      }
    };
  }, []);

  const handleLearnMore = () => {
    router.push(tier.learnMoreRoute);
  };

  const handleJoinNow = () => {
    router.push(tier.joinRoute);
  };

  // Dynamic positioning for desktop
  const getDesktopMarginTop = () => {
    switch(index) {
      case 0: return 'lg:mt-0';
      case 1: return 'lg:mt-12';
      case 2: return 'lg:mt-24';
      case 3: return 'lg:mt-12';
      case 4: return 'lg:mt-0';
      default: return 'lg:mt-0';
    }
  };

  const tierIcons = {
    "Mentees": <Users className="w-8 h-8" />,
    "University Members": <GraduationCap className="w-8 h-8" />,
    "Alumni": <Briefcase className="w-8 h-8" />,
    "Non-Profit Members": <Heart className="w-8 h-8" />,
    "Non-Profit Board": <Crown className="w-8 h-8" />
  };

  return (
    <div ref={cardRef} className="flex flex-col items-center group w-full max-w-sm mx-auto lg:mx-0">
      <div
        className={`
          relative w-full h-80 sm:h-96 lg:w-72 lg:h-80
          ${tier.gradient}
          rounded-dmc-xl 
          shadow-dmc-sophisticated
          transition-all 
          duration-500 
          cursor-pointer
          overflow-hidden
          border-2 border-dmc-white
          hover:border-dmc-gold
          hover:shadow-dmc-elegant
          hover:scale-105
          ${getDesktopMarginTop()}
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
        style={{
          transitionDelay: `${index * 150}ms`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
              `
            }}
          />
        </div>

        {/* Default State */}
        <div className={`
          absolute inset-0 flex flex-col items-center justify-center p-6 text-center
          transition-all duration-300
          ${isHovered ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        `}>
          <div className="mb-4 text-dmc-white">
            {tierIcons[tier.title]}
          </div>
          <h3 className="font-dmc-primary text-xl lg:text-2xl font-bold text-dmc-white mb-4 leading-tight">
            {tier.title}
          </h3>
          <div className="w-16 h-1 bg-dmc-gold rounded mb-4" />
          <p className="font-dmc-body text-sm text-dmc-white/90 leading-relaxed">
            {tier.shortDesc}
          </p>
        </div>

        {/* Hover/Touch State */}
        <div className={`
          absolute inset-0 p-4 lg:p-6 flex flex-col items-center justify-center text-center
          transition-all duration-300 bg-dmc-white/95 backdrop-blur-sm
          ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
        `}>
          <div className="mb-4 text-dmc-warm-brown">
            {tierIcons[tier.title]}
          </div>
          <h3 className="font-dmc-primary text-lg lg:text-xl font-bold text-dmc-charcoal mb-3">
            {tier.title}
          </h3>
          <p className="font-dmc-body text-sm text-dmc-slate-gray mb-6 leading-relaxed line-clamp-3">
            {tier.description}
          </p>
          <div className="space-y-3 w-full">
            <button 
              onClick={handleLearnMore}
              className="w-full bg-dmc-gold text-dmc-black px-4 py-2.5 rounded-dmc hover:bg-dmc-warm-gold transition-all duration-300 transform hover:scale-105 font-dmc-secondary font-medium text-sm"
            >
              Learn More
            </button>
            <button 
              onClick={handleJoinNow}
              className="w-full bg-transparent text-dmc-warm-brown px-4 py-2.5 rounded-dmc border-2 border-dmc-warm-brown hover:bg-dmc-warm-brown hover:text-dmc-white transition-all duration-300 transform hover:scale-105 font-dmc-secondary font-medium text-sm"
            >
              Join Now
            </button>
          </div>
        </div>

        {/* Mobile Touch Overlay */}
        <div className="lg:hidden absolute inset-0 bg-transparent" />
      </div>

      {/* Mobile Connection Arrow */}
      {!isLast && (
        <div className="flex lg:hidden justify-center w-full my-4">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-8 bg-dmc-gold/60" />
            <ChevronDown className="text-dmc-gold w-6 h-6" />
          </div>
        </div>
      )}

      {/* Desktop Connection Arrow */}
      {!isLast && (
        <div className="hidden lg:flex items-center absolute -right-16 xl:-right-20 top-1/2 transform -translate-y-1/2 z-10">
          <div className="flex items-center space-x-2">
            <div className="h-0.5 w-12 xl:w-16 bg-dmc-gold/60" />
            <div className="w-8 h-8 rounded-full bg-dmc-gold flex items-center justify-center">
              <ArrowRight className="text-dmc-black w-4 h-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Structure = () => {
  const tiers = [
    {
      title: "Mentees",
      gradient: "bg-dmc-sophisticated",
      shortDesc: "Begin your journey with expert guidance and support",
      description: "Start your transformative journey as a mentee and gain invaluable guidance from experienced professionals and peers in your field of interest.",
      learnMoreRoute: "/unimembership",
      joinRoute: "/unimembership/mentee"
    },
    {
      title: "University Members",
      gradient: "bg-gradient-to-br from-dmc-charcoal to-dmc-slate-gray",
      shortDesc: "Connect with your university network and resources",
      description: "Access exclusive university resources, participate in campus activities, and build meaningful connections with fellow students and faculty members.",
      learnMoreRoute: "/unimembership",
      joinRoute: "/unimembership"
    },
    {
      title: "Alumni",
      gradient: "bg-gradient-to-br from-dmc-warm-brown to-dmc-bronze",
      shortDesc: "Stay connected and continue your professional growth",
      description: "Join our thriving network of accomplished graduates and continue your professional development journey while giving back to current students.",
      learnMoreRoute: "/non_profitmembership",
      joinRoute: "/contactus"
    },
    {
      title: "Non-Profit Members",
      gradient: "bg-gradient-to-br from-dmc-bronze to-dmc-warm-gold",
      shortDesc: "Make a lasting impact in your community",
      description: "Contribute to meaningful causes and create positive change in your community through active involvement in our various outreach and service programs.",
      learnMoreRoute: "/non_profitmembership",
      joinRoute: "/non_profitsignup"
    },
    {
      title: "Non-Profit Board",
      gradient: "bg-dmc-warm",
      shortDesc: "Lead and shape our organizational future",
      description: "Take a leadership role in shaping the future of our organization, driving impactful initiatives, and mentoring the next generation of leaders.",
      learnMoreRoute: "/non_profitmembership",
      joinRoute: "/non_profitsignup"
    },
  ];

  return (
    <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-12 w-full bg-dmc-pearl overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%),
              radial-gradient(circle at 25% 75%, rgba(139, 105, 20, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block mb-4">
            <span className="font-dmc-secondary text-sm tracking-dmc-wider text-dmc-warm-brown bg-dmc-gold/20 px-4 py-2 rounded-full">
              OUR STRUCTURE
            </span>
          </div>
          
          <h2 className="font-dmc-primary text-dmc-h1 lg:text-dmc-hero font-bold text-dmc-charcoal mb-6 leading-tight">
            Your <span className="text-dmc-gradient">Journey</span> With DMC
          </h2>
          
          <div className="section-separator-dmc w-24 mx-auto mb-6" />
          
          <p className="font-dmc-body text-dmc-body text-dmc-slate-gray max-w-3xl mx-auto leading-relaxed">
            Join our community at any level and be part of a supportive network dedicated to growth, 
            success, and making a positive impact in the world. Your journey starts here.
          </p>
        </div>
        
        {/* Structure Flow */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-start justify-center gap-8 xl:gap-16 relative">
            {tiers.map((tier, index) => (
              <AnimatedCard
                key={tier.title}
                tier={tier}
                index={index}
                isLast={index === tiers.length - 1}
              />
            ))}
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-0">
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

        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <div className="bg-dmc-white/80 backdrop-blur-sm rounded-dmc-xl p-8 lg:p-12 shadow-dmc-elegant border border-dmc-platinum">
            <h3 className="font-dmc-primary text-dmc-h3 font-bold text-dmc-charcoal mb-4">
              Ready to Begin Your Journey?
            </h3>
            <p className="font-dmc-body text-dmc-body text-dmc-slate-gray mb-8 max-w-2xl mx-auto">
              Take the first step towards personal and professional growth. 
              Join a community that believes in your potential and is committed to your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a
                href="/unimembership"
                className="btn-dmc-primary px-8 py-3 text-center"
              >
                Explore Membership
              </a>
              <a
                href="/contactus"
                className="btn-dmc-secondary px-8 py-3 text-center"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
      </div>
    </section>
  );
};

export default Structure;