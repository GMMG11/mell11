import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Appointment | Mobile Aesthetics',
  description: 'Schedule your in-home aesthetics appointment with MĒL11. Microneedling, hydrafacials, chemical peels & more delivered to your home in Tacoma, Puyallup & Greater Seattle.',
  openGraph: {
    title: 'Book Your Mobile Aesthetics Appointment | MĒL11',
    description: 'Schedule in-home microneedling, facials & anti-aging treatments. Serving Tacoma & Greater Seattle.',
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
