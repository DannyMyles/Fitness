import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Get in touch with Marksila254 to schedule your free consultation. Nairobi, Kenya — phone, email, and WhatsApp available.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Marksila254',
    description: 'Get in touch to schedule your free consultation and start your fitness journey.',
    url: '/contact',
  },
};

export default function Page() {
  return <ContactClient />;
}
