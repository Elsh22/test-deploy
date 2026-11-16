import LoginForm from '@/components/GalleryAdmin/LoginForm';
import Image from 'next/image';
import Link from 'next/link';
export default async function GalleryAdminLogin({ searchParams }: { searchParams: Promise<{ expired?: string }> }) {
  const { expired } = await searchParams;
  return <>
    <header className="ga-login-header">
      <Link className="ga-wordmark" href="/">Developing Men of Color</Link>
      <Link className="ga-return" href="/gallery"><span aria-hidden="true">← </span>Back to gallery</Link>
    </header>
    <main className="ga-login">
      <section className="ga-login-story" aria-labelledby="gallery-story-title">
        <Image src="/images/home/mission-campus.jpg" alt="DMC members gathered together on campus" fill priority sizes="(max-width: 800px) 100vw, 55vw" className="ga-login-photo" />
        <div className="ga-story-content">
          <p className="ga-eyebrow">Brotherhood. Leadership. Legacy.</p>
          <h1 id="gallery-story-title">Our story.<br /><em>Through your lens.</em></h1>
          <p className="ga-story-description">Preserve the moments that bring our brotherhood together.</p>
          <p className="ga-story-caption">Developing Men of Color / Virginia Commonwealth University</p>
        </div>
      </section>
      <section className="ga-login-access" aria-labelledby="gallery-login-title">
        <div className="ga-login-content">
          <p className="ga-eyebrow">Gallery administration</p>
          <h2 id="gallery-login-title">Welcome back.</h2>
          <p className="ga-muted">Sign in to manage DMC event albums and photographs.</p>
          <LoginForm expired={expired === '1'} />
          <p className="ga-access-note">For authorized DMC gallery administrators.</p>
        </div>
      </section>
    </main>
  </>;
}
