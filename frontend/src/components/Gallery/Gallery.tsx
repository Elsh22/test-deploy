import Link from "next/link";
import type { EventAlbum } from "@/data/gallery";
import GalleryImage from "./GalleryImage";

export default function Gallery({ albums }: { albums: EventAlbum[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {albums.map((album) => (
        <Link
          key={album.slug}
          href={`/gallery/${album.slug}`}
          className="group block min-w-0 overflow-hidden border border-white/15 bg-zinc-950 transition hover:border-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
        >
          <GalleryImage photo={album.cover} />
          <div className="p-6">
            <h2 className="text-2xl font-black leading-tight group-hover:text-yellow-400">
              {album.title}
            </h2>
            <p className="mt-4 text-zinc-300">Keynote Speaker: {album.keynoteSpeaker}</p>
            <span className="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-yellow-400">
              View album <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
