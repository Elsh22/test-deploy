import Image from 'next/image';
import JacobImg from '../../../../newassest/Com.jpg'; 
import United2Heal from '../../../../newassest/community.PNG'; 
import CollegeDay from '../../../../newassest/Benford.jpg'

const CommPrograms = () => {
  return (
    <div className="bg-dmc-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-dmc-h1 font-dmc-primary text-dmc-gold mb-6">
            Community Service Programs
          </h2>
          <div className="w-24 h-1 bg-dmc-gold mx-auto mb-6"></div>
          <p className="text-dmc-body text-dmc-dark-gray max-w-3xl mx-auto">
            Making a positive impact in our community through meaningful service and outreach programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={JacobImg} alt="Jacob's Chance" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              Jacob's Chance
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6">
              Creating inclusive spaces for disabled children to have an outlet and participate in adaptive sports programs.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>

          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={United2Heal} alt="United2Heal" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              United2Heal
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6">
              Packaging medical equipment and devices to support healthcare initiatives in developing countries.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>

          <div className="card-dmc group">
            <div className="h-48 bg-dmc-light-gray rounded-dmc mb-6 overflow-hidden">
              <Image src={CollegeDay} alt="College Day" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-dmc-h3 font-dmc-primary text-dmc-black mb-3 group-hover:text-dmc-gold transition-colors duration-300">
              College Day
            </h3>
            <p className="text-dmc-body text-dmc-dark-gray mb-6">
              Bringing local middle and elementary school students to VCU campus to explore higher education opportunities.
            </p>
            <button className="btn-dmc-secondary">Learn More</button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-dmc-black to-dmc-charcoal rounded-dmc-xl p-12 text-center">
          <h3 className="text-dmc-h2 font-dmc-primary text-dmc-gold mb-4">
            Join Our Community Service Team
          </h3>
          <p className="text-dmc-body text-dmc-silver mb-8 max-w-2xl mx-auto">
            Make a difference in the Richmond community while building meaningful connections with fellow DMC members.
          </p>
          <a href="https://groupme.com/join_group/89916463/uBQYKr0c" target="_blank" rel="noopener noreferrer">
            <button className="btn-dmc-primary text-lg px-12 py-4">
              Join Our GroupMe
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CommPrograms;