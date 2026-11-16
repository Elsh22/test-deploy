import { notFound } from 'next/navigation';
import AlbumEditor from '@/components/GalleryAdmin/AlbumEditor';
import { galleryServerData } from '@/lib/gallery-admin/server';
import { isUuid, type Album } from '@/lib/gallery-admin/types';
export default async function AdminAlbumPage({ params }: { params: Promise<{ albumId: string }> }) {
  const { albumId } = await params;
  if (!isUuid(albumId)) notFound();
  const album = await galleryServerData<Album>(`albums/${albumId}`);
  return <AlbumEditor initialAlbum={album} />;
}
