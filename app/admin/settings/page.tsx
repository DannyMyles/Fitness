import type { Metadata } from 'next'
import SettingsView from '@/components/admin-kit/SettingsView'

export const metadata: Metadata = { title: 'Settings' }

const PAGES = [
  { key: 'about', label: 'About' },
  { key: 'services', label: 'Services' },
  { key: 'events', label: 'Events' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'blog', label: 'Blog' },
  { key: 'contact', label: 'Contact' },
]

export default function SettingsPage() {
  return <SettingsView showCorporate pages={PAGES} />
}
