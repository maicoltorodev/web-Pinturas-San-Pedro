import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LogoFAB } from "@/components/logo-fab"
import "./globals.css"

// Optimize font loading - only load what's needed
const geist = Geist({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-geist',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pinturassanpedro.com'

export const metadata: Metadata = {
  title: "Pinturas San Pedro - Servicios Profesionales de Pintura",
  description:
    "Servicios profesionales de pintura residencial y comercial. Transformamos espacios con calidad artesanal y atención al detalle. Más de 15 años de experiencia.",
  keywords: [
    "pintura profesional",
    "pintura residencial",
    "pintura comercial",
    "pinturas San Pedro",
    "servicios de pintura",
    "pintura en Colombia",
    "colores de pintura",
    "pintura de interiores",
    "pintura de exteriores",
    "consultoría de color"
  ],
  authors: [{ name: "Pinturas San Pedro" }],
  creator: "Pinturas San Pedro",
  publisher: "Pinturas San Pedro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  applicationName: "Pinturas San Pedro",
  category: "Servicios de Pintura",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Pinturas San Pedro - Servicios Profesionales",
    description:
      "Servicios profesionales de pintura residencial y comercial. Transformamos espacios con calidad artesanal y atención al detalle. Más de 15 años de experiencia.",
    url: siteUrl,
    siteName: "Pinturas San Pedro",
    images: [
      {
        url: `${siteUrl}/imagen-metadata.jpg`,
        width: 1200,
        height: 630,
        alt: 'Pinturas San Pedro - Creamos Color',
        type: 'image/jpeg',
        secureUrl: `${siteUrl}/imagen-metadata.jpg`,
      },
    ],
    locale: 'es_CO',
    type: 'website',
    countryName: 'Colombia',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pinturas San Pedro - Servicios Profesionales",
    description:
      "Servicios profesionales de pintura residencial y comercial. Transformamos espacios con calidad artesanal.",
    images: [`${siteUrl}/imagen-metadata.jpg`],
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
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/imagen-metadata.jpg', type: 'image/jpeg', sizes: '1200x630' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#0D47A1',
    // Meta tags adicionales para WhatsApp
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/jpeg',
    'og:image:secure_url': `${siteUrl}/imagen-metadata.jpg`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={geist.variable}>
      <body className={`font-sans antialiased`}>
        {children}
        <LogoFAB />
        <Analytics />
      </body>
    </html>
  )
}
