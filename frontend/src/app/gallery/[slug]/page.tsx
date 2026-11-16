import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AlbumGallery from "@/components/Gallery/AlbumGallery";
import { eventAlbums } from "@/data/gallery";
import { galleryFonts } from '@/components/Gallery/gallery-fonts';
import styles from '@/components/Gallery/gallery.module.css';

type AlbumPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return eventAlbums.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const { slug: albumSlug } = await params;
  const album = eventAlbums.find(({ slug }) => slug === albumSlug);
  return { title: album ? `${album.title} | DMC Gallery` : "Album not found | DMC Gallery" };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { slug: albumSlug } = await params;
  const album = eventAlbums.find(({ slug }) => slug === albumSlug);
  if (!album) notFound();

  return (
    <main className={`${styles.page} ${galleryFonts}`}>
      <div className={styles.inner}>
        <Link href="/gallery" className={styles.back}>
          <span aria-hidden="true">←&nbsp;</span> Back to gallery
        </Link>
        <h1 className={styles.albumHeading}>{album.title}</h1>
        <div className={styles.albumMeta}><p>Keynote speaker: {album.keynoteSpeaker}</p><p>{new Set(album.photos.map(photo => photo.src)).size} photographs</p></div>
        <AlbumGallery photos={album.photos} />
      </div>
    </main>
  );
}
