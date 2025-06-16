import Image from 'next/image';
import { AiOutlineBook, AiOutlineExperiment, AiOutlineDollarCircle, AiOutlineHeart } from 'react-icons/ai';
import studySessionImg from '../../../../newassest/academ.jpeg'; 
import tutoringImg from '../../../../newassest/LinkedIn2.jpg'; 
import ResourceFair from '../../../../newassest/LinkedIn.jpg'

const AcademicPrograms = () => {
  return (
    <div className="bg-dmc-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-dmc-h1 font-dmc-primary text-dmc-gold mb-6">
            Explore Our Academic Programs
          </h2>
          <div className="w-24 h-1 bg-dmc-gold mx-auto mb-8"></div>
          
          {/* Academic Areas */}
          <div className="flex justify-center flex-wrap gap-6 mb-12">
            <div className="flex flex-col items-center p-6 bg-dmc-light-gray rounded-dmc-lg hover:bg-dmc-gold hover:text-dmc-black transition-all duration-300 cursor-pointer group">
              <AiOutlineBook className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium text-lg">Arts & Humanities</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-dmc-light-gray rounded-dmc-lg hover:bg-dmc-gold hover:text-dmc-black transition-all duration-300 cursor-pointer group">
              <AiOutlineExperiment className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium text-lg">Science & Technology</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-dmc-light-gray rounded-dmc-lg hover:bg-dmc-gold hover:text-dmc-black transition-all duration-300 cursor-pointer group">
              <AiOutlineDollarCircle className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium text-lg">Business & Economics</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-dmc-light-gray rounded-dmc-lg hover:bg-dmc-gold hover:text-dmc-black transition-all duration-300 cursor-pointer group">
              <AiOutlineHeart className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium text-lg">Health & Medicine</span>
            </div>
          </div>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={studySessionImg} alt="Study Session" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              Study Sessions
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6 leading-relaxed">
              Engage in focused study sessions with peers and mentors to enhance your academic performance and build lasting study habits.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>

          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={tutoringImg} alt="Tutoring" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              Tutoring Services
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6 leading-relaxed">
              Get personalized assistance in various subjects from our experienced peer tutors and academic mentors.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>

          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={ResourceFair} alt="Resource Fair" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              Resource Fair
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6 leading-relaxed">
              Discover the various academic resources available around campus to support your educational journey.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-dmc-black to-dmc-charcoal rounded-dmc-xl p-12 text-center">
          <h3 className="text-dmc-h2 font-dmc-primary text-dmc-gold mb-4">
            Ready to Join the Academic Committee?
          </h3>
          <p className="text-dmc-body text-dmc-silver mb-8 max-w-2xl mx-auto">
            Connect with like-minded students, enhance your academic journey, and help others succeed in their educational goals.
          </p>
          <a href="https://groupme.com/join_group/90176811/E5gNlYKq" target="_blank" rel="noopener noreferrer">
            <button className="btn-dmc-primary text-lg px-12 py-4">
              Join Our GroupMe
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AcademicPrograms;