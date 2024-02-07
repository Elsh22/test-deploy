import Image from 'next/image';
import DMCOlympicsImg from '../../../assets/2.png'; 
import SportsEventImg from '../../../newassest/Soccerball.JPG';
import Sports from '../../../newassest/sports3.jpg'

const SocialCommitteeEvents = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="shadow-md py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-6">Explore Our Social Committee Events</h2>
          <div className="flex justify-around text-center">
            {/* Additional content can be added here if needed */}
          </div>
        </div>
      </div>
      <div className="text-center my-10">
        {/* Space for any announcements or general information */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={DMCOlympicsImg} alt="DMC Olympics" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">DMC Olympics</div>
            <p className="text-base">
              Join the fun and competitive spirit in our annual DMC Olympics event.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={SportsEventImg} alt="Sports Event" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Sports Event</div>
            <p className="text-base">
              Participate in various sports activities, fostering team spirit and health.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={Sports} alt="Committee" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Committee vs Committee Games</div>
            <p className="text-base">
              A fun competition where teams tackle challenges and games to win. Its all about teamwork, strategy, and having a great time together.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center my-10">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-6">Join Our Social Activities</h2>
        <a href="https://groupme.com/join_group/89916344/ZkE6p97c" target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Join the Fun
          </button>
        </a>
      </div>
    </div>
  );
};

export default SocialCommitteeEvents;
