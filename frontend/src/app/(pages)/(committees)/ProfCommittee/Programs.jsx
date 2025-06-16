import Image from 'next/image';
import LinkedInWorkshopImg from '../../../../newassest/LinkedIn2.jpg'; 
import SuitDayImg from '../../../../newassest/Play3.jpg'; 
import ResumeWorkshopImg from '../../../../newassest/Newsletter.jpg';

const ProfDevPrograms = () => {
  return (
    <div className="bg-dmc-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-dmc-h1 font-dmc-primary text-dmc-gold mb-6">
            Professional Development Programs
          </h2>
          <div className="w-24 h-1 bg-dmc-gold mx-auto mb-6"></div>
          <p className="text-dmc-body text-dmc-dark-gray max-w-3xl mx-auto">
            Preparing you for career success through workshops, networking, and professional skill development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={LinkedInWorkshopImg} alt="LinkedIn Workshop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              LinkedIn Workshops
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6">
              Enhance your professional online presence and networking skills with our comprehensive LinkedIn workshops.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>

          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={SuitDayImg} alt="Suit Day" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              Professional Suit Day
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6">
              A day dedicated to professional attire guidance, styling advice, and professional photoshoots.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>

          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={ResumeWorkshopImg} alt="Resume Workshop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              Resume Workshops
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6">
              Create and polish your resume with guidance from career professionals and industry experts.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-dmc-black to-dmc-charcoal rounded-dmc-xl p-12 text-center">
          <h3 className="text-dmc-h2 font-dmc-primary text-dmc-gold mb-4">
            Advance Your Professional Journey
          </h3>
          <p className="text-dmc-body text-dmc-silver mb-8 max-w-2xl mx-auto">
            Join our professional development community and take your career to the next level with expert guidance and peer support.
          </p>
          <a href="https://web.groupme.com/join_group/89916400/H3d6zVwp" target="_blank" rel="noopener noreferrer">
            <button className="btn-dmc-primary text-lg px-12 py-4">
              Join Our Community
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfDevPrograms;