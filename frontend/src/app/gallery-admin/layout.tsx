import type { Metadata } from 'next';
import styles from '@/components/GalleryAdmin/gallery-admin.module.css';
export const metadata: Metadata = { title: 'Gallery administration | DMC', robots: { index: false, follow: false } };
export default function GalleryAdminLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.shell}>{children}</div>;
}
