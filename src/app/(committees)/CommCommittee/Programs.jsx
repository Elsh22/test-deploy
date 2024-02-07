import Image from 'next/image';
import JacobImg from '../../../newassest/Com.jpg'; 
import United2Heal from '../../../newassest/community.PNG'; 
import CollegeDay from '../../../newassest/Benford.jpg'

const CommPrograms = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="shadow-md py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
         <h2 className="text-3xl lg:text-4xl font-semibold mb-6">Explore Our Community Service Programs</h2>
          <div className="flex justify-around text-center">
          </div>
        </div>
      </div>
      <div className="text-center my-10">
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={JacobImg} alt="Study Session" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Jacob Chance</div>
            <p className="text-base">
             Make a space for disabled kids to have a outlit and play sports.
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={United2Heal} alt="United2Heal" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">United2Heal</div>
            <p className="text-base">
            Helps package medical equiment and devices for 3rd world contries
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image src={CollegeDay} alt="CollegeDay" className="w-full" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">College Day</div>
            <p className="text-base">
            Helps bring kids from local middle and elementary schools to VCU and explore the campus.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center my-10">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-6">Want to Join the Committee GroupMe?</h2>
        <a href="https://groupme.com/join_group/89916463/uBQYKr0c" target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Join GroupMe
          </button>
        </a>
      </div>
    </div>
  );
};

export default CommPrograms;
