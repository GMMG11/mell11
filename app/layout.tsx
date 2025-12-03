import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MĒL11 | In-Home Luxury Skin & Aesthetics',
  description: 'Beauty. Brought to you. MĒL11 brings studio-level skin and beauty services into the comfort of your home. Serving Tacoma and Greater Seattle.',
  keywords: 'luxury aesthetics, mobile beauty, in-home facials, Tacoma, Seattle, skin care, beauty services',
  icons: {
    icon: [
      { url: '/images/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/images/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/favicon.ico', sizes: '32x32' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream">{children}</body>
    </html>
  );
}
