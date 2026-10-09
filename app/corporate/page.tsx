import type { Metadata } from 'next';
import CorporateClient from './CorporateClient';

export const metadata: Metadata = {
  title: 'Corporate Wellness & Team Building',
  description:
    'Corporate fitness programmes, wellness days, team-building, hikes and adventure days for companies in Nairobi. Request a tailored quote.',
  alternates: { canonical: '/corporate' },
  openGraph: {
    title: 'Corporate Wellness & Team Building | Marksila254',
    description: 'Fitness programmes, wellness days, team-building and outdoor adventures for your team.',
    url: '/corporate',
  },
};

export default function Page() {
  return <CorporateClient />;
}
