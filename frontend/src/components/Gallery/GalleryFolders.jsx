'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2, X } from 'lucide-react';
import folderCovers from './FolderCovers';
import folderImages from './FolderImages';

const folders = [
  { id: 1, title: 'DMC 8th Annual Mixer', tag: 'Mixer' },
  { id: 2, title: 'LinkedIn Workshop 2025', tag: 'Professional' },
  { id: 3, title: '2025-2026 GBMs', tag: 'Meetings' },
  { id: 4, title: 'SOVO Fair 2025', tag: 'Campus' },
  { id: 5, title: 'Internship Workshop 2025', tag: 'Career' },
  { id: 6, title: 'DMC Sports', tag: 'Sports' },
  {
    id: 7,
    title: 'More Photos',
    tag: 'Archive',
    external: 'https://drive.google.com/drive/folders/1Z-LjzjQDrACQpagawQkj8n8uVdH-3Fyt',
  },
];

const GalleryFolders = () => {
  const [activeFolder, setActiveFolder] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeImages = activeFolder ? folderImages[activeFolder.id] || [] : [];

  const handleFolderClick = (folder) => {
    if (folder.external) {
      window.open(folder.external, '_blank', 'noopener,noreferrer');
      return;
    }

    setActiveFolder(folder);
    setCurrentIndex(0);
  };

  const closeLightbox = () => setActiveFolder(null);
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % activeImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);

  const handleDragEnd = (_event, info) => {
    if (info.offset.x < -50) nextImage();
    else if (info.offset.x > 50) prevImage();
  };

  return (
    <section className="dmc-dark-section px-6 pb-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {folders.map((folder, index) => (
            <motion.button
              key={folder.id}
              onClick={() => handleFolderClick(folder)}
              className={`group relative overflow-hidden border border-[var(--dmc-border)] text-left ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <div className={`relative ${index === 0 ? 'aspect-[16/10] lg:aspect-[16/11]' : 'aspect-[4/3]'}`}>
                <Image
                  src={folderCovers[folder.id]}
                  alt={folder.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="mb-3 inline-flex items-center gap-2 bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black">
                  {folder.tag}
                </div>
                <div className="flex items-end justify-between gap-4">
                  <h2 className="text-2xl font-black text-white md:text-3xl">{folder.title}</h2>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-black transition group-hover:bg-yellow-400">
                    {folder.external ? <ExternalLink className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeFolder && activeImages.length > 0 && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-black/95 p-4 text-white sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mx-auto mb-4 flex w-full max-w-7xl items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
                  {activeFolder.tag}
                </p>
                <h2 className="text-2xl font-black md:text-4xl">{activeFolder.title}</h2>
                <p className="mt-1 text-sm font-bold text-gray-400">
                  {currentIndex + 1} / {activeImages.length}
                </p>
              </div>
              <button
                onClick={closeLightbox}
                className="flex h-11 w-11 items-center justify-center bg-yellow-400 text-black"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative mx-auto flex min-h-0 w-full max-w-7xl flex-1 items-center justify-center overflow-hidden">
              <button
                onClick={prevImage}
                className="absolute left-0 z-20 flex h-12 w-12 items-center justify-center bg-white/10 text-white backdrop-blur transition hover:bg-yellow-400 hover:text-black"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>

              <motion.div
                key={`${activeFolder.id}-${currentIndex}`}
                className="relative h-full max-h-[76vh] w-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <Image
                  src={activeImages[currentIndex]}
                  alt={`${activeFolder.title} image ${currentIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </motion.div>

              <button
                onClick={nextImage}
                className="absolute right-0 z-20 flex h-12 w-12 items-center justify-center bg-white/10 text-white backdrop-blur transition hover:bg-yellow-400 hover:text-black"
                aria-label="Next image"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryFolders;
