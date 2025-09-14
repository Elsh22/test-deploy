import Image from "next/image";
import Goode from "../../../../assets/Goode.jpg"; // adjust path if needed

const GoodePage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-white px-6 py-16 gap-10 pt-28">
      
      {/* Left Side - Full Picture */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={Goode}
          alt="Dr. Carlton Goode"
          className="rounded-lg shadow-lg w-full h-auto object-contain"
        />
      </div>

      {/* Right Side - Bio */}
      <div className="w-full md:w-1/2 text-black flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold text-center mb-4">
          Dr. Carlton Goode
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-8">
          Faculty Advisor
        </h2>
        <p className="text-lg leading-relaxed text-justify">
          Dr. Goode has served as the Faculty Advisor for Delta Upsilon Chapter 
          of Phi Beta Sigma Fraternity, Inc. since 20XX. His dedication to 
          mentorship, leadership development, and academic excellence has 
          empowered countless students to reach their full potential both on 
          campus and in their professional careers.
        </p>
      </div>
    </div>
  );
};

export default GoodePage;
