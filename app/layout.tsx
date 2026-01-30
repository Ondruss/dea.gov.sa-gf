import React from "react"
import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LanguageProvider } from "@/components/providers/language-provider"
import { ConfigProvider } from "@/components/providers/config-provider"

const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: 'San Andreas Drug Enforcement Administration',
  description: 'Official website of the San Andreas Drug Enforcement Administration',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <ConfigProvider>
            {children}
          </ConfigProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
