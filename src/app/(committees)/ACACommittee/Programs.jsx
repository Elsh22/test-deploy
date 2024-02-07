import Image from 'next/image';
import { AiOutlineBook, AiOutlineExperiment, AiOutlineDollarCircle, AiOutlineHeart } from 'react-icons/ai';
import studySessionImg from '../../../newassest/academ.jpeg'; 
import tutoringImg from '../../../newassest/LinkedIn2.jpg'; 
import ResourceFair from '../../../newassest/LinkedIn.jpg'

const AcademicPrograms = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="shadow-md py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
         <h2 className="text-3xl lg:text-4xl font-semibold mb-6">Explore Our Academic Programs</h2>
          <div className="flex justify-around text-center">
            <div className="flex flex-col items-center">
              <AiOutlineBook className="text-3xl mb-2" />
              <span className="font-medium">Arts & Humanities</span>
            </div>
            <div className="flex flex-col items-center">
              <AiOutlineExperiment className="text-3xl mb-2" />
              <span className="font-medium">Science & Technology</span>
            </div>
            <div className="flex flex-col items-center">
              <AiOutlineDollarCircle className="text-3xl mb-2" />
              <span className="font-medium">Business & Economics</span>
            </div>
            <div className="flex flex-col items-center">
              <AiOutlineHeart className="text-3xl mb-2" />
              <span className="font-medium">Health & Medicine</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center my-10">
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={studySessionImg} alt="Study Session" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Study Session</div>
            <p className="text-base">
              Engage in focused study sessions with peers and mentors.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={tutoringImg} alt="Tutoring" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Tutoring</div>
            <p className="text-base">
              Get personalized assistance in various subjects.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={ResourceFair} alt="Resource-Fair" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Resource Fair</div>
            <p className="text-base">
              Learn More About the Resource Around Campus 
            </p>
          </div>
        </div>
      </div>
      <div className="text-center my-10">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-6">Want to Join the Committee GroupMe?</h2>
        <a href="https://groupme.com/join_group/90176811/E5gNlYKq" target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Join GroupMe
          </button>
        </a>
      </div>
    </div>
  );
};

export default AcademicPrograms;
