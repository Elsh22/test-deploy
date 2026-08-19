import './globals.css';
import type { Metadata } from 'next';
import SiteChrome from '../components/Layout/SiteChrome';

export const metadata: Metadata = {
  title: 'Developing Men of Color at VCU',
  description:
    'Developing Men of Color at Virginia Commonwealth University builds brotherhood, mentorship, leadership, service, and professional excellence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
