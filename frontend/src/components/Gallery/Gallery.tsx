'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // ✅ correct import for Next.js 13+

interface Folder {
  folderName: string;
}

const folders: Folder[] = [
  { folderName: 'SOVO Fair 2025' },
  { folderName: 'DMC Mixer 8' },
  { folderName: 'VACU Event' },
  { folderName: 'Resource Fair 2025' },
  { folderName: 'Sports Events' },
];

const Gallery: React.FC = () => {
  const router = useRouter();

  const handleFolderClick = (folderName: string) => {
    router.push(`/gallery/${folderName.replace(/\s+/g, '-')}`);
  };

  return (
    <div className="p-8 min-h-screen bg-black">
      <h1 className="text-4xl font-bold text-center text-white mb-12">
        Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {folders.map((folder, idx) => (
          <div
            key={idx}
            onClick={() => handleFolderClick(folder.folderName)}
            className="cursor-pointer w-48 h-48 border-2 border-gray-700 rounded-2xl 
                       flex flex-col items-center justify-center 
                       bg-gradient-to-b from-gray-900 to-gray-800 
                       hover:from-blue-600 hover:to-blue-500 
                       hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] 
                       transition-all duration-300 group"
          >
            {/* Folder Icon */}
            <div className="text-5xl mb-3 text-yellow-400 group-hover:text-white transition-colors">
              📁
            </div>

            {/* Folder Name - Centered */}
            <p className="text-lg font-semibold text-white text-center group-hover:text-white">
              {folder.folderName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
