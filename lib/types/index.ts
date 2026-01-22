/**
 * Tipos TypeScript compartidos para toda la aplicación
 */

export interface SocialLink {
  name: string
  url: string
  icon: string
  ariaLabel: string
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  whatsapp: string
  whatsappMessage: string
}

export interface BusinessHours {
  weekdays: string
  saturday: string
  sunday: string
}

export interface NavigationLink {
  href: string
  label: string
}

export interface Testimonial {
  name: string
  rating: number
  date: string
  comment: string
  project: string
}

export interface Service {
  icon: string
  title: string
  description: string
  color: 'pink' | 'blue' | 'yellow' | 'purple'
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  icon: string
  color: string
}

export interface Color {
  name: string
  hex: string
  rgb: string
}

export interface ColorCategory {
  name: string
  colors: Color[]
}

export interface PaintColor {
  name: string
  hex: string
  light: string
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  contact: ContactInfo
  hours: BusinessHours
  socialLinks: SocialLink[]
  navigation: NavigationLink[]
}

export type ProductCategory = 
  | 'vinilos'
  | 'anticorrosivo'
  | 'esmaltes'
  | 'trafico-pesado'
  | 'estucos'
  | 'impermeabilizante'
  | 'herramientas'
  | 'rodillos'
  | 'brochas'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  image: string
  description: string
  characteristics: string[]
  presentations?: string[]
  certifications?: string[]
  uses?: string[]
  benefits?: string[]
  colors?: string[]
  application?: string
}
