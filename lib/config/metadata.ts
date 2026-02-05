/**
 * Configuración de metadata para SEO
 */

import type { Metadata } from 'next'
import { siteConfig } from '@/lib/constants/site'

const baseUrl = siteConfig.url

export const defaultMetadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    'pinturas San Pedro',
    'pintura para interiores',
    'pintura para exteriores',
    'pintura en Colombia',
    'colores de pintura',
    'venta de pintura',
    'pintura profesional',
    'pinturas Bogotá',
    'pinturas de calidad',
    'impermeabilizantes',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  applicationName: siteConfig.name,
  category: 'Pintura',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: '/',
    siteName: siteConfig.name,
    images: [
      {
        url: '/imagen-metadata.jpg',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
        type: 'image/jpeg',
      },
    ],
    locale: 'es_CO',
    type: 'website',
    countryName: 'Colombia',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
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
    apple: [{ url: '/logo.webp', sizes: '180x180', type: 'image/webp' }],
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#0D47A1',
    'og:phone_number': siteConfig.contact.phone,
    'business:contact_data:phone_number': siteConfig.contact.phone,
    'business:contact_data:street_address': siteConfig.contact.address,
    'business:contact_data:locality': 'Bogotá',
    'business:contact_data:country_name': 'Colombia',
    'business:contact_data:email': siteConfig.contact.email,
  },
}
