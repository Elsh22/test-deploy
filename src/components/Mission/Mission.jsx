'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TypingText } from '../../utils/CustomText';
import IMG1 from '../../newassest/Ourmissionpicture.jpg';
import styles from '../../styles/index';
import { fadeIn, staggerContainer } from '../../utils/motion';

const Mission = ({ id }) => {
  const goals = [
    {
      title: "Academic Excellence",
      description: "Foster academic excellence through mentorship, study groups, and educational resources",
      icon: "🎓"
    },
    {
      title: "Professional Networks", 
      description: "Build professional networks through industry connections and career development workshops",
      icon: "🤝"
    },
    {
      title: "Community Bonds",
      description: "Strengthen community bonds through service projects and social events",
      icon: "🌟"
    },
    {
      title: "Leadership Development",
      description: "Promote leadership development and personal growth opportunities",
      icon: "👥"
    }
  ];

  return (
    <section
      id={id}
      className="relative py-16 lg:py-24 px-4 bg-dmc-cream overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(139, 105, 20, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Image Section */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn('right', 'tween', 0.2, 1)}
            className="relative"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-dmc-warm rounded-dmc-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <motion.img
                src={IMG1.src}
                alt="DMC Mission - Empowering Men of Color"
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative w-full h-auto object-cover rounded-dmc-lg shadow-dmc-sophisticated border-4 border-dmc-white"
              />
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-dmc-white rounded-dmc-lg p-4 shadow-dmc-elegant border-2 border-dmc-gold">
                <div className="text-center">
                  <div className="font-dmc-primary text-2xl font-bold text-dmc-warm-brown">2018</div>
                  <div className="font-dmc-body text-sm text-dmc-slate-gray">Founded</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.2, 0.3)}
            className="space-y-8"
          >
            {/* Section Header */}
            <div className="space-y-4">
              <motion.div
                variants={fadeIn('up', 'tween', 0.1, 1)}
                className="inline-block"
              >
                <span className="font-dmc-secondary text-sm tracking-dmc-wider text-dmc-warm-brown bg-dmc-gold/20 px-4 py-2 rounded-full">
                  OUR MISSION
                </span>
              </motion.div>
              
              <motion.h2
                variants={fadeIn('up', 'tween', 0.2, 1)}
                className="heading-dmc-primary text-dmc-h1 leading-tight"
              >
                Empowering Tomorrow&aposs
                <span className="text-dmc-gradient block">Leaders</span>
              </motion.h2>
              
              <div className="section-separator-dmc w-20" />
            </div>

            {/* Mission Statement */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="space-y-6"
            >
              <p className="body-dmc-primary text-dmc-body leading-relaxed">
                <span className="font-dmc-primary font-bold text-dmc-warm-brown">DMC</span> empowers 
                men of color through community, education, and leadership development, creating a 
                supportive brotherhood that fosters academic excellence and professional growth 
                while serving our community.
              </p>
              
              <p className="body-dmc-professional text-dmc-body-sm leading-relaxed text-dmc-slate-gray">
                Since our foundation in September 2018, we have been dedicated to the holistic 
                development of men of color, providing the necessary tools and resources to succeed 
                in college and beyond.
              </p>
            </motion.div>

            {/* Goals Grid */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.4, 1)}
              className="space-y-6"
            >
              <h3 className="heading-dmc-secondary text-dmc-h4 text-dmc-charcoal">
                Our Core Goals
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goals.map((goal, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn('up', 'tween', 0.5 + index * 0.1, 1)}
                    className="group p-4 bg-dmc-white rounded-dmc border-l-4 border-dmc-gold hover:border-dmc-warm-brown shadow-dmc-silver hover:shadow-dmc-elegant transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {goal.icon}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-dmc-secondary font-semibold text-dmc-charcoal group-hover:text-dmc-warm-brown transition-colors duration-300">
                          {goal.title}
                        </h4>
                        <p className="body-dmc-professional text-sm text-dmc-slate-gray mt-1">
                          {goal.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              variants={fadeIn('up', 'tween', 0.8, 1)}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a
                href="/aboutus"
                className="btn-dmc-primary text-center"
              >
                Learn More About Us
              </a>
              <a
                href="/unimembership"
                className="btn-dmc-secondary text-center"
              >
                Join Our Community
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Impact Stats */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn('up', 'tween', 0.6, 1)}
          className="mt-20 pt-12 border-t border-dmc-platinum"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "200+", label: "Active Members" },
              { number: "3", label: "University Chapters" }, 
              { number: "50+", label: "Community Events" },
              { number: "5", label: "Years of Impact" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="font-dmc-primary text-3xl lg:text-4xl font-bold text-dmc-warm-brown group-hover:text-dmc-gold transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="font-dmc-body text-sm text-dmc-slate-gray mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;