import Link from 'next/link';
import { requireGalleryAdmin } from '@/lib/gallery-admin/server';
import SessionControls from '@/components/GalleryAdmin/SessionControls';
export const dynamic = 'force-dynamic';
export default async function ProtectedGalleryLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireGalleryAdmin();
  return <><a className="ga-skip" href="#gallery-admin-main">Skip to content</a><header className="ga-header">
    <Link className="ga-brand" href="/gallery-admin">DMC <span>Gallery studio</span></Link>
    <div className="ga-header-actions"><Link href="/gallery">Public gallery</Link><SessionControls email={admin.email} /></div>
  </header>{children}</>;
}
