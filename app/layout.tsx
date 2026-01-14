import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LogoFABLazy } from "@/components/logo-fab-lazy"
import "./globals.css"

// Optimize font loading - only load what's needed
const geist = Geist({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: "Pinturas San Pedro - Productos Premium de Pintura | Vinilo Acrílico, Impermeabilizante y Más",
  description:
    "Venta de productos de pintura premium: Vinilo Acrílico T1 Superlavable, Impermeabilizante, Vinilo Coraza Hidrofugado Certificado, y más. También servicios profesionales de pintura residencial y comercial. Calidad certificada, más de 30 años de experiencia.",
  keywords: [
    "productos de pintura",
    "pinturas San Pedro",
    "vinilo acrílico superlavable",
    "impermeabilizante",
    "vinilo coraza hidrofugado",
    "pintura certificada",
    "pintura para interiores",
    "pintura para exteriores",
    "pintura en Colombia",
    "vinilo tipo 1",
    "vinilo tipo 3",
    "colores de pintura",
    "venta de pintura",
    "pintura profesional",
    "servicios de pintura",
    "pintura residencial",
    "pintura comercial"
  ],
  authors: [{ name: "Pinturas San Pedro" }],
  creator: "Pinturas San Pedro",
  publisher: "Pinturas San Pedro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://demo-pinturas-san-pedro.vercel.app'),
  applicationName: "Pinturas San Pedro",
  category: "Productos de Pintura",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Pinturas San Pedro - Productos Premium de Pintura | Vinilo Acrílico, Impermeabilizante",
    description:
      "Venta de productos de pintura premium: Vinilo Acrílico T1 Superlavable, Impermeabilizante, Vinilo Coraza Hidrofugado Certificado. También servicios profesionales de pintura residencial y comercial. Calidad certificada, más de 30 años de experiencia.",
    url: '/',
    siteName: "Pinturas San Pedro",
    images: [
      {
        url: '/imagen-metadata.jpg',
        width: 1200,
        height: 630,
        alt: 'Pinturas San Pedro - Productos Premium de Pintura',
        type: 'image/jpeg',
      },
    ],
    locale: 'es_CO',
    type: 'website',
    countryName: 'Colombia',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pinturas San Pedro - Productos Premium de Pintura",
    description:
      "Venta de productos de pintura premium: Vinilo Acrílico Superlavable, Impermeabilizante, Vinilo Coraza Certificado. También servicios profesionales de pintura. Calidad certificada.",
    images: ['/imagen-metadata.jpg'],
    creator: '@pinturassanpedro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#0D47A1',
  },
}

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
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <LogoFABLazy />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
