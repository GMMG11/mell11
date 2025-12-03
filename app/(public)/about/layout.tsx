import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About MĒL11 | 23 Years Experience in Clinical Aesthetics',
  description: 'Meet Melissa Green, paramedical-certified aesthetician with 23 years of clinical experience. Learn why MĒL11 brings luxury anti-aging treatments directly to your home in Tacoma & Greater Seattle.',
  openGraph: {
    title: 'About MĒL11 | 23 Years Experience in Clinical Aesthetics',
    description: 'Paramedical-certified aesthetician with 23 years experience. Mobile luxury aesthetics in Tacoma & Seattle.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
