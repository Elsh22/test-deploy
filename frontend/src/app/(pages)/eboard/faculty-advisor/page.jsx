import Image from "next/image";
import Goode from "../../../../assets/Goode2025.jpg"; // adjust path if needed

const GoodePage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
      
      {/* Left Side - Full Picture with LinkedIn */}
      <div className="w-full md:w-1/2 flex justify-center">
        <a
          href="https://www.linkedin.com/in/carlton-goode-ed-d-69172815/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:shadow-[0_0_30px_#FFD700] rounded-lg"
        >
          <Image
            src={Goode}
            alt="Dr. Carlton Goode"
            className="rounded-lg shadow-lg w-full h-auto object-contain cursor-pointer"
          />
        </a>
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
        <h1 className="text-8xl font-extrabold text-center mb-4">
          Dr. Carlton Goode
        </h1>
        <h2 className="text-6xl font-semibold text-center mb-8">
          Faculty Advisor
        </h2>
        <ul className="list-disc list-inside text-3xl leading-relaxed space-y-3">
          <li>Director of Intercultural Success & Initiatives</li>
          <li>Bachelor of Arts in Psychology — Shaw University</li>
          <li>Master of Science in Student Development — University of Iowa</li>
          <li>Doctorate in Education Leadership — Virginia Commonwealth University</li>
          <li>
            I advise DMC because I see myself in the young me who walks into the room. 
            Advising DMC gives me the chance to create that space for others — a space 
            where men of color can show up as they are and be celebrated for who they are, 
            while being challenged and supported at the same time.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GoodePage;
