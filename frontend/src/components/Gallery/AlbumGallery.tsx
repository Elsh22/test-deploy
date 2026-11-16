"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/data/gallery";
import GalleryImage from "./GalleryImage";

const controlClass = "inline-flex min-h-11 min-w-11 items-center justify-center border border-white/30 px-4 py-2 text-sm font-bold text-white hover:border-yellow-400 hover:text-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400";

export default function AlbumGallery({ photos }: { photos: GalleryPhoto[] }) {
  const uniquePhotos = photos.filter((photo, index) => photos.findIndex(({ src }) => src === photo.src) === index);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = activeIndex !== null;
  const activePhoto = activeIndex === null ? undefined : uniquePhotos[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    // Native modal dialogs contain focus and restore it to the opening thumbnail.
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function navigate(direction: number) {
    setActiveIndex((index) => index === null ? null : (index + direction + uniquePhotos.length) % uniquePhotos.length);
  }

  return (
    <>
      <p className="mt-8 text-sm text-zinc-400">Select a photograph to view it larger.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {uniquePhotos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Open photograph ${index + 1} of ${uniquePhotos.length}: ${photo.alt}`}
            aria-haspopup="dialog"
            onClick={() => setActiveIndex(index)}
            className="min-w-0 overflow-hidden border border-white/15 text-left hover:border-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
          >
            <GalleryImage photo={photo} contain />
          </button>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        aria-label="Event photograph viewer"
        aria-describedby="gallery-lightbox-help"
        onCancel={() => setActiveIndex(null)}
        onClose={() => setActiveIndex(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            navigate(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        className="fixed inset-0 m-auto h-[100dvh] max-h-none w-screen max-w-none bg-black p-4 text-white backdrop:bg-black/90 sm:p-8"
      >
        {activePhoto && (
          <div className="mx-auto flex h-full max-w-7xl flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p aria-live="polite" aria-atomic="true" className="text-sm text-zinc-300">
                Photograph {activeIndex! + 1} of {uniquePhotos.length}
              </p>
              <button type="button" autoFocus onClick={() => setActiveIndex(null)} className={controlClass}>Close</button>
            </div>
            <div className="min-h-0 flex-1">
              <GalleryImage key={activePhoto.src} photo={activePhoto} priority contain lightbox />
            </div>
            <div className="flex items-center justify-between gap-4">
              <button type="button" onClick={() => navigate(-1)} className={controlClass} aria-label="Previous photograph">Previous</button>
              <button type="button" onClick={() => navigate(1)} className={controlClass} aria-label="Next photograph">Next</button>
            </div>
            <p id="gallery-lightbox-help" className="text-center text-xs text-zinc-400">Use the arrow keys to browse. Press Escape to close.</p>
          </div>
        )}
      </dialog>
    </>
  );
}
