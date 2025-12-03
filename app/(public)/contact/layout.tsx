import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact MĒL11 | Mobile Aesthetics Tacoma & Seattle',
  description: 'Get in touch with MĒL11 for mobile aesthetics services. In-home microneedling, facials & anti-aging treatments in Tacoma, Puyallup & Greater Seattle. Call (253) 778-2735.',
  openGraph: {
    title: 'Contact MĒL11 | Mobile Aesthetics Tacoma & Seattle',
    description: 'Contact us for in-home aesthetics appointments. Serving Tacoma, Puyallup & Greater Seattle.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
