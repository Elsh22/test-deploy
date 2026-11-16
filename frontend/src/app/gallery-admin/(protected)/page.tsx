import Dashboard from '@/components/GalleryAdmin/Dashboard';
import { galleryServerData } from '@/lib/gallery-admin/server';
import type { Album } from '@/lib/gallery-admin/types';
export default async function GalleryDashboardPage() {
  const albums = await galleryServerData<Album[]>('albums');
  return <Dashboard albums={albums} />;
}
