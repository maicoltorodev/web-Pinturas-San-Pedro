/**
 * Configuración centralizada del sitio
 */

import type { SiteConfig, ContactInfo, BusinessHours, SocialLink, NavigationLink } from '@/lib/types'

export const contactInfo: ContactInfo = {
  phone: '+573223716811',
  additionalPhones: ['+573112297182', '+573224579483'],
  email: 'pinturassanpedro@hotmail.com',
  address: 'Calle 132D N 145A-02, Bogotá',
  whatsapp: '573223716811',
  whatsappMessage: 'Hola%2C%20me%20interesa%20solicitar%20una%20cotizaci%C3%B3n%20gratuita.',
} as const

export const businessHours: BusinessHours = {
  weekdays: '7am - 6pm',
  saturday: '7am - 5pm',
  sunday: '8am - 1pm',
} as const

export const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/pinturassanpedro',
    icon: 'Facebook',
    ariaLabel: 'Facebook de Pinturas San Pedro',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/pinturassanpedro',
    icon: 'Instagram',
    ariaLabel: 'Instagram de Pinturas San Pedro',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@pinturassanpedro',
    icon: 'TikTok',
    ariaLabel: 'TikTok de Pinturas San Pedro',
  },
] as const

export const navigationLinks: NavigationLink[] = [
  { href: '/#services', label: 'Soluciones' },
  { href: '/#productos', label: 'Productos' },
  { href: '/#color-palette', label: 'Colores' },
  { href: '/#testimonials', label: 'Testimonios' },
  { href: '/#location', label: 'Ubicación' },
  { href: '/#contact', label: 'Contacto' },
] as const

export const siteConfig: SiteConfig = {
  name: 'Pinturas San Pedro',
  tagline: 'CREAMOS COLOR!',
  description: 'Pinturas de la más alta calidad. Calidad certificada, más de 30 años de experiencia.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pinturas-san-pedro.vercel.app',
  contact: contactInfo,
  hours: businessHours,
  socialLinks,
  navigation: navigationLinks,
} as const

// URLs de WhatsApp con diferentes mensajes
export const whatsappUrls = {
  quote: `https://wa.me/${contactInfo.whatsapp}?text=${contactInfo.whatsappMessage}`,
  contact: `https://wa.me/${contactInfo.whatsapp}?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s.`,
  colors: `https://wa.me/${contactInfo.whatsapp}?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20colores%20de%20pintura.%20Tengo%20consultas%20sobre%20colores%20personalizados%20y%20mezclas%20especiales.`,
} as const

// Estadísticas del negocio
export const businessStats = [
  { number: '30+', label: 'Años de Experiencia' },
  { number: '500+', label: 'Clientes Satisfechos' },
  { number: '100%', label: 'Satisfacción' },
] as const
