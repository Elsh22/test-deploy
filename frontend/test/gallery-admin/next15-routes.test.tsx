import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => ({ proxy: vi.fn() }));
vi.mock('next/font/local', () => ({ default: () => ({ variable: '', className: '' }) }));
vi.mock('next/navigation', () => ({ notFound: () => { throw new Error('NOT_FOUND'); } }));
vi.mock('@/lib/gallery-admin/proxy', () => ({ galleryProxy: mocks.proxy }));
vi.mock('@/components/Gallery/AlbumGallery', () => ({ default: () => <div>Album photographs</div> }));

import AlbumPage, { generateMetadata } from '../../src/app/gallery/[slug]/page';
import GalleryPage from '../../src/app/gallery/page';
import { GET } from '../../src/app/api/gallery-admin/[...path]/route';
import { eventAlbums } from '../../src/data/gallery';

describe('Next.js 15 gallery routes', () => {
  it('renders the public gallery and its album link', () => {
    render(<GalleryPage />);
    expect(screen.getByRole('heading', { name: 'Event Gallery' })).toBeTruthy();
    expect(screen.getByRole('link', { name: /View album/ }).getAttribute('href')).toBe(`/gallery/${eventAlbums[0].slug}`);
  });

  it('awaits album params in both metadata and page rendering', async () => {
    const params = Promise.resolve({ slug: eventAlbums[0].slug });
    expect((await generateMetadata({ params })).title).toBe(`${eventAlbums[0].title} | DMC Gallery`);
    render(await AlbumPage({ params }));
    expect(screen.getByRole('heading', { name: eventAlbums[0].title })).toBeTruthy();
    expect(screen.getByText('Album photographs')).toBeTruthy();
  });

  it('keeps unknown albums unavailable', async () => {
    await expect(AlbumPage({ params: Promise.resolve({ slug: 'unknown-album' }) })).rejects.toThrow('NOT_FOUND');
  });

  it('awaits catch-all params before forwarding to the protected proxy', async () => {
    const response = new Response('{}');
    mocks.proxy.mockResolvedValueOnce(response);
    const request = new NextRequest('http://localhost:3000/api/gallery-admin/albums');
    expect(await GET(request, { params: Promise.resolve({ path: ['albums'] }) })).toBe(response);
    expect(mocks.proxy).toHaveBeenCalledWith(request, ['albums']);
  });
});
