import Image from 'next/image';
import LinkedInWorkshopImg from '../../../../newassest/LinkedIn2.jpg'; 
import SuitDayImg from '../../../../newassest/Play3.jpg'; 
import ResumeWorkshopImg from '../../../../newassest/Newsletter.jpg';

const ProfDevPrograms = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="shadow-md py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-6">Explore Our Professional Development Programs</h2>
          <div className="flex justify-around text-center">
          </div>
        </div>
      </div>
      <div className="text-center my-10">
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={LinkedInWorkshopImg} alt="LinkedIn Workshop" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">LinkedIn Workshop</div>
            <p className="text-base">
              Enhance your professional online presence with our LinkedIn workshop.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={SuitDayImg} alt="Suit Day" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Suit Day</div>
            <p className="text-base">
              A day dedicated to professional attire advice and photoshoots.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={ResumeWorkshopImg} alt="Resume Workshop" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Resume Workshop</div>
            <p className="text-base">
              Join our workshop to create or polish your resume.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center my-10">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-6">Get Involved in Professional Development</h2>
        <a href="https://web.groupme.com/join_group/89916400/H3d6zVwp" target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Join Our Community
          </button>
        </a>
      </div>
    </div>
  );
};

export default ProfDevPrograms;
