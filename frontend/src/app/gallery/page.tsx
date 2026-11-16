import type { Metadata } from "next";
import Gallery from "@/components/Gallery/Gallery";
import { eventAlbums } from "@/data/gallery";
import { galleryFonts } from '@/components/Gallery/gallery-fonts';
import styles from '@/components/Gallery/gallery.module.css';

export const metadata: Metadata = {
  title: "Event Gallery | Developing Men of Color at VCU",
  description: "Explore photographs from DMC events, speakers, and moments of brotherhood at VCU.",
};

export default function GalleryPage() {
  return (
    <main className={`${styles.page} ${galleryFonts}`}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Developing Men of Color / VCU</p>
        <div className={styles.intro}>
        <h1 className={styles.title}>Event Gallery</h1>
        <p className={styles.description}>
          Moments of brotherhood, connection, and growth. Explore photographs from our DMC events.
        </p>
        </div>
        <div className={styles.sectionHeading}><h2>Our moments, together</h2><span>{eventAlbums.length} {eventAlbums.length === 1 ? 'album' : 'albums'}</span></div>
        <Gallery albums={eventAlbums} />
      </div>
    </main>
  );
}
