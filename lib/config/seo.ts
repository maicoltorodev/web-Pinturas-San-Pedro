/**
 * Configuración SEO y structured data
 */

import { siteConfig } from '@/lib/constants/site'

export interface LocalBusinessSchema {
  '@context': string
  '@type': string
  name: string
  image: string
  '@id': string
  url: string
  telephone: string | string[]
  email: string
  address: {
    '@type': string
    streetAddress: string
    addressLocality: string
    addressCountry: string
  }
  geo: {
    '@type': string
    latitude: string
    longitude: string
  }
  openingHoursSpecification: Array<{
    '@type': string
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
  priceRange: string
  aggregateRating?: {
    '@type': string
    ratingValue: string
    reviewCount: string
  }
}

export interface OrganizationSchema {
  '@context': string
  '@type': string
  name: string
  url: string
  logo: string
  contactPoint: {
    '@type': string
    telephone: string | string[]
    contactType: string
    email: string
  }
  sameAs: string[]
}

/**
 * Schema JSON-LD estático para LocalBusiness
 * Pre-generado en build time para mejor rendimiento
 */
export const localBusinessSchema: LocalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  image: `${siteConfig.url}/logo.webp`,
  '@id': `${siteConfig.url}/#organization`,
  url: siteConfig.url,
  telephone: [siteConfig.contact.phone, ...(siteConfig.contact.additionalPhones || [])],
  email: siteConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.contact.address,
    addressLocality: 'Bogotá',
    addressCountry: 'CO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '4.7451629',
    longitude: '-74.1175304',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '07:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '08:00',
      closes: '13:00',
    },
  ],
  priceRange: '$$',
} as const

/**
 * Schema JSON-LD estático para Organization
 * Pre-generado en build time para mejor rendimiento
 */
export const organizationSchema: OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.webp`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: [siteConfig.contact.phone, ...(siteConfig.contact.additionalPhones || [])],
    contactType: 'customer service',
    email: siteConfig.contact.email,
  },
  sameAs: siteConfig.socialLinks.map((link) => link.url),
} as const
