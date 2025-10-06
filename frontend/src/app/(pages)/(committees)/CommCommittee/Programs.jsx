'use client';

import Image from 'next/image';
import JacobImg from '../../../../newassest/Com.jpg';
import United2Heal from '../../../../newassest/community.PNG';
import CollegeDay from '../../../../newassest/Benford.jpg';

const CommPrograms = () => {
  const programs = [
    {
      img: JacobImg,
      title: 'Jacob Chance',
      description: 'Make a space for disabled kids to have an outlet and play sports.',
    },
    {
      img: United2Heal,
      title: 'United2Heal',
      description: 'Helps package medical equipment and devices for 3rd world countries.',
    },
    {
      img: CollegeDay,
      title: 'College Day',
      description: 'Helps bring kids from local middle and elementary schools to VCU to explore the campus.',
    },
  ];

  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-12">
          Explore Our Community Service Programs
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
            href="https://groupme.com/join_group/89916463/uBQYKr0c"
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

export default CommPrograms;
