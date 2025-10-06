'use client';

import Image from 'next/image';
import TechTalkImg from '../../../../newassest/IT3.jpg';
import HackathonImg from '../../../../newassest/IT2.jpg';
import WorkshopImg from '../../../../newassest/IT5.jpg';

const ITCommitteePrograms = () => {
  const programs = [
    {
      img: TechTalkImg,
      title: 'Tech Talk Series',
      description: 'Join our series of tech talks featuring industry experts.',
    },
    {
      img: HackathonImg,
      title: 'Annual Hackathon',
      description: 'Participate in our hackathon to solve real-world problems.',
    },
    {
      img: WorkshopImg,
      title: 'Technical Workshops',
      description: 'Hands-on workshops to learn new technologies and skills.',
    },
  ];

  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-12">
          Explore Our IT Programs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, idx) => (
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

        <div className="text-center mt-12">
          <a
            href="https://web.groupme.com/join_group/96138862/KuAOiW33"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]">
              Join Our Community
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ITCommitteePrograms;
