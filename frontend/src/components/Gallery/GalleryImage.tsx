"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryPhoto } from "@/data/gallery";

export default function GalleryImage({
  photo,
  priority = false,
  contain = false,
  lightbox = false,
}: {
  photo: GalleryPhoto;
  priority?: boolean;
  contain?: boolean;
  lightbox?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-zinc-900 ${lightbox ? "h-full w-full" : "aspect-[3/2]"}`}>
      {failed ? (
        <div role="status" className="flex h-full items-center justify-center p-6 text-center text-sm text-zinc-300">
          Photograph unavailable. Please try again later.
        </div>
      ) : (
        <>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-zinc-400" role="status">
              Loading photograph…
            </div>
          )}
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            unoptimized
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes={lightbox ? "100vw" : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"}
            className={`${contain ? "object-contain" : "object-cover"} ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </>
      )}
    </div>
  );
}
