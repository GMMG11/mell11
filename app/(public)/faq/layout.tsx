import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Mobile Aesthetics Questions Answered',
  description: 'Frequently asked questions about MĒL11 mobile aesthetics. Learn about in-home microneedling, pricing, service areas, and what to expect from mobile beauty treatments in Tacoma & Seattle.',
  openGraph: {
    title: 'FAQ | MĒL11 Mobile Aesthetics',
    description: 'Common questions about in-home aesthetics services answered. Mobile microneedling, pricing & more.',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
