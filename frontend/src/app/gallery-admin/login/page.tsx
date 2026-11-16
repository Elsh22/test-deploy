import LoginForm from '@/components/GalleryAdmin/LoginForm';
export default function GalleryAdminLogin({ searchParams }: { searchParams: { expired?: string } }) {
  return <main className="ga-login"><p className="ga-eyebrow">Developing Men of Color</p><h1>Gallery administration</h1>
    <p className="ga-muted">Sign in with your gallery administrator account.</p><LoginForm expired={searchParams.expired === '1'} /></main>;
}
