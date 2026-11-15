import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GalleryImage from "@/components/Gallery/GalleryImage";
import { eventAlbums } from "@/data/gallery";

type AlbumPageProps = { params: { slug: string } };

export function generateStaticParams() {
  return eventAlbums.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: AlbumPageProps): Metadata {
  const album = eventAlbums.find(({ slug }) => slug === params.slug);
  return { title: album ? `${album.title} | DMC Gallery` : "Album not found | DMC Gallery" };
}

export default function AlbumPage({ params }: AlbumPageProps) {
  const album = eventAlbums.find(({ slug }) => slug === params.slug);
  if (!album) notFound();

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-36 font-['PolySans'] text-white">
      <div className="mx-auto max-w-7xl">
        <Link href="/gallery" className="inline-flex min-h-11 items-center text-yellow-400 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400">
          <span aria-hidden="true">←&nbsp;</span> Back to gallery
        </Link>
        <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight md:text-6xl">{album.title}</h1>
        <p className="mt-6 text-lg text-zinc-300">Keynote Speaker: {album.keynoteSpeaker}</p>
        <div className="mt-12 grid gap-8">
          {album.photos.map((photo, index) => (
            <GalleryImage key={photo.src} photo={photo} priority={index === 0} contain />
          ))}
        </div>
      </div>
    </main>
  );
}
