import type {Metadata} from 'next';

import './css/github-dark.css';
import './css/github-markdown-dark.css';
import './css/globals.css';

export const metadata: Metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
