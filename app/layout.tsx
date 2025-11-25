import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MĒL11 | In-Home Luxury Skin & Aesthetics',
  description: 'Beauty. Brought to you. MĒL11 brings studio-level skin and beauty services into the comfort of your home. Serving Tacoma and Greater Seattle.',
  keywords: 'luxury aesthetics, mobile beauty, in-home facials, Tacoma, Seattle, skin care, beauty services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
