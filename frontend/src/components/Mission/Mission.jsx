'use client';
import React from "react";
import { motion } from "framer-motion";
import IMG1 from "../../assets/DMCMIXER8/DMCMIXER17.jpg";
import { BookOpen, BriefcaseBusiness, HeartHandshake } from "lucide-react";

const Mission = ({ id }) => {
  const focusAreas = [
    { icon: BookOpen, label: "Academic guidance" },
    { icon: BriefcaseBusiness, label: "Career readiness" },
    { icon: HeartHandshake, label: "Community service" },
  ];

  return (
    <section
      id={id}
      className="dmc-light-section relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -left-4 -top-4 h-full w-full border border-yellow-400" />
          <img
            src={IMG1.src}
            alt="DMC members at a leadership event"
            className="relative aspect-[4/3] w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-600">
            DMC's Mission
          </p>
          <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Built to help men of color thrive at VCU and beyond.
          </h2>
          <p className="dmc-muted mt-6 text-lg leading-8 md:text-xl">
            DMC was made to create an organization in which men of color can interact and grow as a community, our goal is to equip these individuals with the means and resources needed in order to thrive in the college setting. We plan to do so by providing academic advice from other successful members and faculty, insight into how to navigate the undergraduate years, means to professional development and most importantly, provide a brotherhood of students striving together. By providing a close community of minority men working towards the same goal, this will allow us to connect with incoming college students in order to enlarge our community and bond. A critical aspect of our organization is our commitment to community service, this is shown by our consistent mentoring at nearby underserved public schools, our volunteering in the local Richmond community, and our participation in service events held by other organizations.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {focusAreas.map(({ icon: Icon, label }) => (
              <div key={label} className="dmc-card-solid border p-5">
                <Icon className="mb-4 h-7 w-7 text-yellow-600" />
                <p className="text-base font-black">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;


/*<img
              src={IMG1.src}
              alt="Developing Men of Color"
              className="w-[80%] md:w-[90%] h-auto object-contain" // Adjusted for responsiveness
            >*/
