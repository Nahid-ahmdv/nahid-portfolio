import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import { getContent } from '@/lib/content'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export function generateMetadata(): Metadata {
  const content = getContent()
  return {
    title: `${content.about?.fullName || content.site?.brandName || 'Portfolio'}`,
    description: content.hero?.bio || 'My portfolio website',
    keywords: [
      'portfolio',
      'developer',
      content.about?.fullName || '',
      ...(content.skills?.categories?.map((c: any) => c.category) || [])
    ],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const content = getContent()

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen transition-colors duration-300`}>
        <ClientLayout site={content.site}>
          {children}
        </ClientLayout>

        {/* 👇 Vercel Analytics (IMPORTANT) */}
        <Analytics />
      </body>
    </html>
  )
}
