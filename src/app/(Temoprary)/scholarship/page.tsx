import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import  Img from '../../../../public/header-image.png';
import { LightbulbOutlined, AttachMoney, School, Wc, FactCheck, Diversity3, AttachMoneySharp, DateRange } from '@mui/icons-material';



const page = () => {
  return (
    <div className="font-sans p-8 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between p-8">
      <div className="md:w-1/2 w-full mb-4 md:mb-0">
        <Image
          src={Img.src}
          alt="Abstract art representing technology"
          width={500} 
          height={300} 
          layout="responsive"
          className="rounded-xl"
        />
      </div>
      <div className="md:w-1/2 w-full text-center md:text-left pl-0 md:pl-8">
        <h1 className="text-4xl font-bold mb-4">DMC Scholarship</h1>
        <p className="mb-6">Empower your tech journey with the DMC scholarship. Apply for a chance to win a $5,000 scholarship and mentorship from industry professionals.</p>
        <Link href="/scholarship/apply" passHref><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 transition duration-300 ease-in-out">Apply</button></Link>
      </div>
    </div>
      
    <div className="mb-10">
  <h2 className="text-xl font-semibold mb-4">Eligibility</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="flex flex-col p-8 border border-gray-200 rounded-lg shadow-md ">
      <LightbulbOutlined className="h-6 w-6"/>
      <h3 className="font-bold mt-2">Innovative <br/><span className="font-normal">Create an innovative project that leverages technology to solve a problem.</span></h3>
    </div>
    <div className="flex flex-col p-8 border border-gray-200 rounded-lg shadow-md min-h-[10rem]">
      <AttachMoney className="h-6 w-6"/>
      <h3 className="font-bold mt-2">Financial Need <br/><span className="font-normal">Demonstrate financial need through a personal statement and optional reference letter.</span></h3>
    </div>
    <div className="flex flex-col p-8 border border-gray-200 rounded-lg shadow-md min-h-[10rem]">
      <School className="h-6 w-6"/>
      <h3 className="font-bold mt-2">Undergraduates <br/><span className="font-normal">Must be enrolled in or accepted to an undergraduate program at an accredited university.</span></h3>
    </div>
    <div className="flex flex-col p-8 border border-gray-200 rounded-lg shadow-md min-h-[10rem]">
      <Wc className="h-6 w-6"/>
      <h3 className="font-bold mt-2">Women & Non-Binary <br/><span className="font-normal">Open to any gender, but priority will be given to women and non-binary individuals.</span></h3>
    </div>
  </div>
</div>

<div className="mb-10">
  <h2 className="text-xl font-semibold mb-4">Application Process</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="flex flex-col p-8 border border-gray-200 rounded-lg shadow-md min-h-[10rem]">
      <AttachMoneySharp className="h-6 w-6"/>
      <h3 className="font-bold mt-2">Financial Need <br/><span className="font-normal">Demonstrate financial need through a personal statement and optional reference letter.</span></h3>
    </div>
    <div className="flex flex-col p-8 border border-gray-200 rounded-lg shadow-md min-h-[10rem]">
      <LightbulbOutlined className="h-6 w-6"/>
      <h3 className="font-bold mt-2">Innovative Project <br/><span className="font-normal">Create an innovative project that leverages technology to solve a problem.</span></h3>
    </div>
    <div className="flex flex-col p-8 border border-gray-200 rounded-lg shadow-md min-h-[10rem]">
      <FactCheck className="h-6 w-6"/>
      <h3 className="font-bold mt-2">DMC Challenge <br/><span className="font-normal">Complete our DMC Challenge by submitting a project idea and budget.</span></h3>
    </div>
    <div className="flex flex-col p-8 border border-gray-200 rounded-lg shadow-md min-h-[10rem]">
      <Diversity3 className="h-6 w-6"/>
      <h3 className="font-bold mt-2">Diversity Priority <br/><span className="font-normal">Open to any gender, but priority will be given to women and non-binary individuals.</span></h3>
    </div>
  </div>
</div>
        
<div className="mb-10">
  <h2 className="text-xl font-semibold mb-4">Application Timeline</h2>
  <div className="relative border-l-2 border-gray-200">
    <div className="mb-4 pl-8">
      <div className="absolute -left-3 mt-1 bg-white border-2 border-gray-200 rounded-full">
        <DateRange className="h-6 w-6 text-gray-500"/>
      </div>
      <h3 className="text-lg text-gray-900 font-semibold">Applications Open</h3>
      <p className="text-gray-600">March 11, 2024</p>
    </div>
    <div className="mb-4 pl-8">
      <div className="absolute -left-3 mt-1 bg-white border-2 border-gray-200 rounded-full">
        <DateRange className="h-6 w-6 text-gray-500"/>
      </div>
      <h3 className="text-lg text-gray-900 font-semibold">Applications Close</h3>
      <p className="text-gray-600">April 1, 2024</p>
    </div>
    <div className="mb-4 pl-8">
      <div className="absolute -left-3 mt-1 bg-white border-2 border-gray-200 rounded-full">
        <DateRange className="h-6 w-6 text-gray-500"/>
      </div>
      <h3 className="text-lg text-gray-900 font-semibold">Finalists Notified</h3>
      <p className="text-gray-600">April 1, 2024</p>
    </div>
  </div>
</div>  
<div className="text-center">
  <Link href="/scholarship/apply" passHref>
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded">
      Start Application
    </button>
  </Link>
</div>
    </div>
  );
};

export default page