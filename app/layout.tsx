import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mel11.com'),
  title: {
    default: 'MĒL11 | In-Home Luxury Aesthetics & Microneedling – Tacoma & Greater Seattle',
    template: '%s | MĒL11',
  },
  description: 'Mobile aesthetician with 23 years experience bringing clinical anti-aging treatments to your home. Microneedling, hydrafacials, chemical peels & more. Serving Tacoma, Puyallup & Greater Seattle.',
  keywords: 'mobile aesthetician, in-home microneedling, mobile hydrafacial, anti-aging treatments, Tacoma aesthetics, Seattle mobile spa, chemical peels, dermabrasion, luxury facials, mobile beauty services, Puyallup skincare',
  authors: [{ name: 'Melissa Green', url: 'https://mel11.com' }],
  creator: 'MĒL11',
  publisher: 'MĒL11',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mel11.com',
    siteName: 'MĒL11',
    title: 'MĒL11 | In-Home Luxury Aesthetics & Microneedling – Tacoma & Greater Seattle',
    description: 'Mobile aesthetician with 23 years experience bringing clinical anti-aging treatments to your home. Microneedling, hydrafacials, chemical peels & more.',
    images: [
      {
        url: 'https://mel11.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MĒL11 - In-Home Luxury Aesthetics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MĒL11 | In-Home Luxury Aesthetics & Microneedling',
    description: 'Mobile aesthetician with 23 years experience. Microneedling, hydrafacials & more. Tacoma & Greater Seattle.',
    images: ['https://mel11.com/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/images/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/favicon.ico', sizes: '32x32' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://mel11.com',
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'MĒL11',
  image: 'https://mel11.com/images/og-image.jpg',
  '@id': 'https://mel11.com',
  url: 'https://mel11.com',
  telephone: '+1-253-778-2735',
  email: 'hello@mel11.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tacoma',
    addressRegion: 'WA',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.2529,
    longitude: -122.4443,
  },
  areaServed: [
    { '@type': 'City', name: 'Tacoma', containedInPlace: { '@type': 'State', name: 'Washington' } },
    { '@type': 'City', name: 'Puyallup', containedInPlace: { '@type': 'State', name: 'Washington' } },
    { '@type': 'City', name: 'Seattle', containedInPlace: { '@type': 'State', name: 'Washington' } },
    { '@type': 'City', name: 'Federal Way', containedInPlace: { '@type': 'State', name: 'Washington' } },
    { '@type': 'City', name: 'Lakewood', containedInPlace: { '@type': 'State', name: 'Washington' } },
    { '@type': 'City', name: 'University Place', containedInPlace: { '@type': 'State', name: 'Washington' } },
  ],
  sameAs: [
    'https://www.instagram.com/mel11skin',
    'https://www.tiktok.com/@mel11skin',
    'https://www.linkedin.com/in/mel11skin',
  ],
  founder: {
    '@type': 'Person',
    name: 'Melissa Green',
    jobTitle: 'Founder & Lead Aesthetician',
    description: 'Paramedical-certified aesthetician with 23 years of clinical experience',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'MĒL11 Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'In-Home Microneedling',
          description: 'Clinical microneedling treatment delivered in the comfort of your home',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile Hydrafacial',
          description: 'Professional hydrafacial treatment at your location',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Chemical Peels',
          description: 'Medical-grade chemical peel treatments',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dermabrasion Resurfacing',
          description: 'Professional dermabrasion skin resurfacing',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Signature Transformation Program',
          description: '8-12 week comprehensive anti-aging skin rejuvenation program',
        },
      },
    ],
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '50',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-cream">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
