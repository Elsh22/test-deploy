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
        <p className="text-lg leading-relaxed text-justify">
          {/* Bio content here */}
        </p>
      </div>
    </div>
  );
};

export default GoodePage;
