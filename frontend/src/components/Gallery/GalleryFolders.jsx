'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import folderCovers from './FolderCovers';
import folderImages from './FolderImages';
import IMG from '../../../public/headset.svg';

const GalleryFolders = () => {
  const [activeFolder, setActiveFolder] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const folders = [
    { id: 1, title: 'DMC 8th Annual Mixer'},
    { id: 2, title: '2025-2026 GBMs'},
    { id: 3, title: 'SOVO Fair 2025'},
    { id: 4, title: 'Internship Workshop 2025'},
    { id: 5, title: 'DMC Sports'},
    { id: 6, title: 'Kickball Game'},
    { id: 7, title: 'CGI Event'},
    { id: 8, title: 'DMC Final Exam'},
    { id: 9, title: 'Miscellaneous'}
  ];

  const handleFolderClick = (folderId) => {
    setActiveFolder(folders.find(f => f.id === folderId));
    setCurrentIndex(0);
  };

  const closeLightbox = () => setActiveFolder(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % folderImages[activeFolder.id].length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + folderImages[activeFolder.id].length) % folderImages[activeFolder.id].length);
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) nextImage();
    else if (info.offset.x > 50) prevImage();
  };

  return (
    <>
     {/* Folder Row - responsive with taller cards */}
<div className="flex overflow-x-auto gap-5 p-5 snap-x snap-mandatory">
  {folders.map((folder) => (
    <div
      key={folder.id}
      className="flex-shrink-0 w-[180px] sm:w-[220px] h-[400px] sm:h-[700px] relative cursor-pointer group rounded-[24px] overflow-hidden snap-center"
      onClick={() => handleFolderClick(folder.id)}
    >
      <Image
        src={folderCovers[folder.id]}
        alt={folder.title}
        fill
        className="absolute w-full h-full object-cover rounded-[24px] transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-[24px]">
        <h3 className="text-center text-white font-bold sm:text-[26px] text-[16px] px-2 drop-shadow-lg">
          {folder.title}
        </h3>
      </div>
    </div>
  ))}
</div>


      {/* Full-screen Lightbox */}
      {activeFolder && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-3 sm:p-5"
          onClick={closeLightbox}
        >
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex justify-center items-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-[12px] bg-black/50">
              <Image src={IMG.src} alt="icon" width={30} height={30} />
            </div>
            <div>
              <p className="text-gray-300 font-medium text-[12px] sm:text-[14px] uppercase">{activeFolder.text}</p>
              <p className="text-yellow-400 font-semibold text-[12px] sm:text-[14px] uppercase">{activeFolder.Chairman}</p>
            </div>
          </div>

          <h2 className="text-white font-extrabold sm:text-[28px] text-[20px] drop-shadow-lg mb-4 sm:mb-6 text-center">
            {activeFolder.title}
          </h2>

          {/* Carousel */}
          <div
            className="relative w-full sm:max-w-[90%] h-[60vh] sm:h-[80vh] flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {folderImages[activeFolder.id].map((imgSrc, i) => {
              let position = 'behind';
              if (i === currentIndex) position = 'center';
              else if (i === (currentIndex - 1 + folderImages[activeFolder.id].length) % folderImages[activeFolder.id].length)
                position = 'left';
              else if (i === (currentIndex + 1) % folderImages[activeFolder.id].length)
                position = 'right';
              else return null;

              let style = {};
              if (position === 'center') style = { zIndex: 20, scale: 1, x: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' };
              else if (position === 'left') style = { zIndex: 10, scale: 0.7, x: '-40%', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' };
              else if (position === 'right') style = { zIndex: 10, scale: 0.7, x: '40%', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' };

              return (
                <motion.div
                  key={i}
                  animate={style}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="absolute w-full h-full rounded-[16px] overflow-hidden"
                >
                  <Image
                    src={imgSrc}
                    alt={`${activeFolder.title} image ${i + 1}`}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              );
            })}

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl font-bold z-30 touch-manipulation"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl font-bold z-30 touch-manipulation"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryFolders;
