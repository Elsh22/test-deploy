'use client';

import Image from 'next/image';
import { AiOutlineBook, AiOutlineExperiment, AiOutlineDollarCircle, AiOutlineHeart } from 'react-icons/ai';
import studySessionImg from '../../../../newassest/academ.jpeg'; 
import tutoringImg from '../../../../newassest/LinkedIn2.jpg'; 
import ResourceFair from '../../../../newassest/LinkedIn.jpg';

const AcademicPrograms = () => {
  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-12">
          Explore Our Academic Programs
        </h2>

        {/* Icon Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-12">
          <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-xl shadow-lg hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] transition-shadow duration-300">
            <AiOutlineBook className="text-4xl text-yellow-400 mb-2" />
            <span className="font-semibold text-white">Arts & Humanities</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-xl shadow-lg hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] transition-shadow duration-300">
            <AiOutlineExperiment className="text-4xl text-yellow-400 mb-2" />
            <span className="font-semibold text-white">Science & Technology</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-xl shadow-lg hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] transition-shadow duration-300">
            <AiOutlineDollarCircle className="text-4xl text-yellow-400 mb-2" />
            <span className="font-semibold text-white">Business & Economics</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-xl shadow-lg hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] transition-shadow duration-300">
            <AiOutlineHeart className="text-4xl text-yellow-400 mb-2" />
            <span className="font-semibold text-white">Health & Medicine</span>
          </div>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              img: studySessionImg,
              title: 'Study Session',
              description: 'Engage in focused study sessions with peers and mentors.',
            },
            {
              img: tutoringImg,
              title: 'Tutoring',
              description: 'Get personalized assistance in various subjects.',
            },
            {
              img: ResourceFair,
              title: 'Resource Fair',
              description: 'Learn More About the Resources Around Campus.',
            },
          ].map((program, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-shadow duration-500 transform hover:scale-105"
            >
              <div className="relative w-full h-64">
                <Image
                  src={program.img}
                  alt={program.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-2xl"
                />
              </div>
              <div className="px-6 py-4">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">{program.title}</h3>
                <p className="text-gray-300">{program.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* GroupMe Button */}
        <div className="text-center mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">
            Want to Join the Committee GroupMe?
          </h2>
          <a
            href="https://groupme.com/join_group/90176811/E5gNlYKq"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]">
              Join GroupMe
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AcademicPrograms;
