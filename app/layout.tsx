import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://princeraj07m.live'),
  title: 'Prince Raj - Software Developer (princeraj07m)',
  description: 'Explore the portfolio of Prince Raj (princeraj07m), a skilled software developer showcasing creative projects and technical expertise in a unique OS-themed interactive interface.',
  keywords: 'princeraj07m, Prince Raj, portfolio, software developer, full stack developer, web developer, projects, skills, contact',
  authors: [{ name: 'Prince Raj', url: 'https://princeraj07m.live' }],
  creator: 'Prince Raj',
  generator: 'Next.js',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
