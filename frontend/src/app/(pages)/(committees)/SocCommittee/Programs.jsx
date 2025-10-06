'use client';

import Image from 'next/image';
import DMCOlympicsImg from '../../../../assets/Miscellaneous/2.png';
import SportsEventImg from '../../../../newassest/Soccerball.JPG';
import CommitteeGamesImg from '../../../../newassest/sports3.jpg';

const SocialCommitteeEvents = () => {
  const programs = [
    {
      img: DMCOlympicsImg,
      title: 'DMC Olympics',
      description: 'Join the fun and competitive spirit in our annual DMC Olympics event.',
    },
    {
      img: SportsEventImg,
      title: 'Sports Event',
      description: 'Participate in various sports activities, fostering team spirit and health.',
    },
    {
      img: CommitteeGamesImg,
      title: 'Committee vs Committee Games',
      description:
        'A fun competition where teams tackle challenges and games to win. It’s all about teamwork, strategy, and having a great time together.',
    },
  ];

  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-12">
          Explore Our Social Committee Events
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
            href="https://groupme.com/join_group/89916344/ZkE6p97c"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]">
              Join the Fun
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialCommitteeEvents;
