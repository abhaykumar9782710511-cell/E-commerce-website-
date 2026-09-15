import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shri Krishna Vastra | Divine Clothing Store',
  description: 'Beautiful traditional clothes and shringar vastra for Shri Krishna Ji.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="hi"><body>{children}</body></html>
}
