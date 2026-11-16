import Link from "next/link";
import type { EventAlbum } from "@/data/gallery";
import GalleryImage from "./GalleryImage";
import styles from './gallery.module.css';

export default function Gallery({ albums }: { albums: EventAlbum[] }) {
  return (
    <div className={styles.albums}>
      {albums.map((album) => (
        <Link
          key={album.slug}
          href={`/gallery/${album.slug}`}
          className={styles.album}
        >
          <div className={styles.cover}><GalleryImage photo={album.cover} priority sizes="(max-width: 760px) 100vw, 60vw" /></div>
          <div>
            <p className={styles.eyebrow}>DMC / Event album</p>
            <h2 className={styles.albumTitle}>
              {album.title}
            </h2>
            <p className={styles.speaker}><span>Keynote speaker</span>{album.keynoteSpeaker}</p>
            <span className={styles.albumLink}>
              View album <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
