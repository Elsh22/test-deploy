import Image from 'next/image';
import DMCOlympicsImg from '../../../../assets/2.png'; 
import SportsEventImg from '../../../../newassest/Soccerball.JPG';
import Sports from '../../../../newassest/sports3.jpg'

const SocialCommitteeEvents = () => {
  return (
    <div className="bg-dmc-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-dmc-h1 font-dmc-primary text-dmc-gold mb-6">
            Social Committee Events
          </h2>
          <div className="w-24 h-1 bg-dmc-gold mx-auto mb-6"></div>
          <p className="text-dmc-body text-dmc-dark-gray max-w-3xl mx-auto">
            Building brotherhood and community through engaging social events and activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={DMCOlympicsImg} alt="DMC Olympics" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              DMC Olympics
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6">
              Join the fun and competitive spirit in our annual DMC Olympics featuring various team challenges and competitions.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>

          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={SportsEventImg} alt="Sports Event" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              Sports Events
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6">
              Participate in various sports activities that foster team spirit, health, and friendly competition among members.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>

          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={Sports} alt="Committee Games" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              Committee vs Committee Games
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6">
              Exciting competitions where different committees compete in games and challenges, building teamwork and camaraderie.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-dmc-black to-dmc-charcoal rounded-dmc-xl p-12 text-center">
          <h3 className="text-dmc-h2 font-dmc-primary text-dmc-gold mb-4">
            Join the Fun!
          </h3>
          <p className="text-dmc-body text-dmc-silver mb-8 max-w-2xl mx-auto">
            Be part of our vibrant social community and help create memorable experiences for all DMC members.
          </p>
          <a href="https://groupme.com/join_group/89916344/ZkE6p97c" target="_blank" rel="noopener noreferrer">
            <button className="btn-dmc-primary text-lg px-12 py-4">
              Join Our GroupMe
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialCommitteeEvents;