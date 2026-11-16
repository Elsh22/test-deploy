import { notFound } from 'next/navigation';
import AlbumEditor from '@/components/GalleryAdmin/AlbumEditor';
import { galleryServerData } from '@/lib/gallery-admin/server';
import { isUuid, type Album } from '@/lib/gallery-admin/types';
export default async function AdminAlbumPage({ params }: { params: { albumId: string } }) {
  if (!isUuid(params.albumId)) notFound();
  const album = await galleryServerData<Album>(`albums/${params.albumId}`);
  return <AlbumEditor initialAlbum={album} />;
}
