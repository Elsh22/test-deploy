import Image from 'next/image';
import TechTalkImg from '../../../../newassest/IT3.jpg'; 
import HackathonImg from '../../../../newassest/IT2.jpg'; 
import WorkshopImg from '../../../../newassest/IT5.jpg';

const ITCommitteePrograms = () => {
  return (
    <div className="bg-dmc-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-dmc-h1 font-dmc-primary text-dmc-gold mb-6">
            IT Programs & Initiatives
          </h2>
          <div className="w-24 h-1 bg-dmc-gold mx-auto mb-6"></div>
          <p className="text-dmc-body text-dmc-dark-gray max-w-3xl mx-auto">
            Driving innovation and technical excellence through hands-on learning and collaborative projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={TechTalkImg} alt="Tech Talk" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              Tech Talk Series
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6">
              Join our series of tech talks featuring industry experts, alumni, and cutting-edge technology discussions.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>

          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={HackathonImg} alt="Hackathon" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              Annual Hackathon
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6">
              Participate in our hackathon to solve real-world problems using innovative technology solutions.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>

          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={WorkshopImg} alt="Workshop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              Technical Workshops
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6">
              Hands-on workshops to learn new technologies, programming languages, and technical skills.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-dmc-black to-dmc-charcoal rounded-dmc-xl p-12 text-center">
          <h3 className="text-dmc-h2 font-dmc-primary text-dmc-gold mb-4">
            Join Our IT Committee
          </h3>
          <p className="text-dmc-body text-dmc-silver mb-8 max-w-2xl mx-auto">
            Connect with fellow tech enthusiasts, work on innovative projects, and advance your technical skills.
          </p>
          <a href="https://web.groupme.com/join_group/96138862/KuAOiW33" target="_blank" rel="noopener noreferrer">
            <button className="btn-dmc-primary text-lg px-12 py-4">
              Join Our Community
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ITCommitteePrograms;