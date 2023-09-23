import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'skilltrees.life',
  description: 'How to spec into life skills',
}

export default function RootLayout({
  children,
}: {

  children: React.ReactNode

}) {

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )

}
