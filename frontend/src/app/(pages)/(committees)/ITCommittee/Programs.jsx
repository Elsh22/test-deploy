import Image from 'next/image';
import TechTalkImg from '../../../../newassest/IT3.jpg'; 
import HackathonImg from '../../../../newassest/IT2.jpg'; 
import WorkshopImg from '../../../../newassest/IT5.jpg';

const ITCommitteePrograms = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="shadow-md py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-6">Explore Our IT Programs</h2>
          <div className="flex justify-around text-center">
          </div>
        </div>
      </div>
      <div className="text-center my-10">
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={TechTalkImg} alt="Tech Talk" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Tech Talk Series</div>
            <p className="text-base">
              Join our series of tech talks featuring industry experts.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={HackathonImg} alt="Hackathon" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Annual Hackathon</div>
            <p className="text-base">
              Participate in our hackathon to solve real-world problems.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={WorkshopImg} alt="Workshop" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Technical Workshops</div>
            <p className="text-base">
              Hands-on workshops to learn new technologies and skills.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center my-10">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-6">Join Our IT Committee Community</h2>
        <a href="https://web.groupme.com/join_group/96138862/KuAOiW33" target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Join Our Community
          </button>
        </a>
      </div>
    </div>
  );
};

export default ITCommitteePrograms;
