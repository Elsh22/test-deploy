import './globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
