import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { LogoFABLazy } from "@/components/logo-fab-lazy"
import { AnalyticsLazy } from "@/components/AnalyticsLazy"
import { ScrollProvider } from "@/contexts/ScrollContext"
import { defaultMetadata } from "@/lib/config/metadata"
import { localBusinessSchema, organizationSchema } from "@/lib/config/seo"
import "./globals.css"

// Optimize font loading - no preload to avoid blocking render
const geist = Geist({ 
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Changed to false to avoid blocking initial render
  variable: '--font-geist',
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={geist.variable}>
      <head>
        {/* Preconnect to Google Maps for faster loading */}
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
        {/* Preconnect to Vercel assets for faster loading */}
        <link rel="preconnect" href="https://vercel.app" />
        <link rel="dns-prefetch" href="https://vercel.app" />
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ScrollProvider>
          {children}
          <LogoFABLazy />
          <AnalyticsLazy />
        </ScrollProvider>
      </body>
    </html>
  )
}
