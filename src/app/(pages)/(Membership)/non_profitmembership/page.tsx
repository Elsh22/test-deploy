'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Heart, 
  Globe, 
  HandHeart,
  Users,
  ArrowRight,
  Handshake,
  GraduationCap,
  Briefcase,
  BookOpen
} from 'lucide-react';

const NonProfitMembershipPage = () => {
  const router = useRouter();

  // Wave animation for background pattern
  const Wave = () => (
    <motion.div
      className="absolute inset-0 opacity-10"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <svg viewBox="0 0 1000 1000" className="w-full h-full">
        <motion.path
          d="M0,500 Q250,400 500,500 T1000,500"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </motion.div>
  );

  const revealFromCenter = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const goals = [
    {
      title: "Academic Excellence",
      description: "Fostering growth through mentorship, study groups, and educational resources",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      title: "Professional Networks",
      description: "Building connections through industry partnerships and career development workshops",
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      title: "Community Service",
      description: "Strengthening bonds through impactful service projects and social events",
      icon: <Handshake className="w-6 h-6" />
    },
    {
      title: "Leadership Development",
      description: "Promoting personal growth and leadership opportunities",
      icon: <BookOpen className="w-6 h-6" />
    }
  ];

  const initiatives = [
    {
      title: "Mentorship Program",
      description: "Connecting members with experienced professionals"
    },
    {
      title: "Career Workshops",
      description: "Regular professional development sessions"
    },
    {
      title: "Community Projects",
      description: "Regular service initiatives and outreach programs"
    }
  ];

  return (
    <div className="bg-dmc-white overflow-hidden">
      {/* Hero Section with Gradient */}
      <motion.section 
        className="min-h-screen relative flex items-center justify-center"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute inset-0 bg-dmc-professional"
          animate={{
            background: [
              'linear-gradient(135deg, #000000 0%, #333333 50%, #FFD700 100%)',
              'linear-gradient(135deg, #8B6914 0%, #DAA520 50%, #FFD700 100%)',
              'linear-gradient(135deg, #000000 0%, #333333 50%, #FFD700 100%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <Wave />
        <div className="relative z-10 text-white text-center px-4">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ delay: 0.5 }}
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-dmc-gold" />
            <h1 className="text-6xl font-bold mb-6 font-dmc-primary">DMC Non-Profit Membership</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto body-dmc-primary text-dmc-white">
              DMC empowers men of color through community, education, and leadership development, 
              creating a supportive brotherhood that fosters academic excellence and professional growth 
              while serving our community.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Goals Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={revealFromCenter}
            initial="hidden"
            whileInView="visible"
            className="text-4xl font-bold text-center mb-16 heading-dmc-secondary"
          >
            Our Goals
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.2
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="card-dmc-elegant h-full">
                  <div className="flex items-center mb-4 text-dmc-warm-brown">
                    {goal.icon}
                    <h3 className="text-xl font-bold ml-3 text-dmc-charcoal">{goal.title}</h3>
                  </div>
                  <p className="text-dmc-slate-gray body-dmc-professional">{goal.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-20 px-4 bg-dmc-pearl">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={revealFromCenter}
            initial="hidden"
            whileInView="visible"
            className="text-4xl font-bold text-center mb-16 heading-dmc-secondary"
          >
            Our Initiatives
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.2
                  }
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="card-dmc-professional p-6">
                  <div className="w-full h-48 bg-dmc-light-gray rounded-dmc mb-4 flex items-center justify-center">
                    <div className="text-dmc-warm-brown text-4xl font-bold">
                      {initiative.title.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-dmc-charcoal">{initiative.title}</h3>
                    <p className="text-dmc-slate-gray body-dmc-professional">{initiative.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section className="min-h-screen relative flex items-center justify-center py-20 px-4">
        <motion.div
          className="absolute inset-0 bg-dmc-warm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Animated particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-dmc-white rounded-full"
              animate={{
                x: ["0%", "100%"],
                y: ["0%", "100%"],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </motion.div>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <HandHeart className="w-16 h-16 text-dmc-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-dmc-white mb-6 font-dmc-primary">Ready to Make an Impact?</h2>
            <p className="text-xl text-dmc-white/90 mb-8 max-w-2xl mx-auto body-dmc-primary">
              Join our community of leaders dedicated to empowering and uplifting men of color
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={() => router.push('/non_profitsignup')}
                className="bg-dmc-white text-dmc-warm-brown hover:bg-dmc-pearl px-8 py-4 text-lg rounded-dmc transition-colors duration-200 font-dmc-secondary font-semibold shadow-dmc-sophisticated"
              >
                Start Your Application
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NonProfitMembershipPage;