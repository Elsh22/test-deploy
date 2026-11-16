import type { Metadata } from "next";
import Gallery from "@/components/Gallery/Gallery";
import { eventAlbums } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Event Gallery | Developing Men of Color at VCU",
  description: "Explore photographs from DMC events, speakers, and moments of brotherhood at VCU.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-36 font-['PolySans'] text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black leading-tight md:text-7xl">Event Gallery</h1>
        <p className="mb-12 mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          Moments of brotherhood, connection, and growth. Explore photographs from our DMC events.
        </p>
        <Gallery albums={eventAlbums} />
      </div>
    </main>
  );
}
