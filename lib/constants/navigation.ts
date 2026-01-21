/**
 * Enlaces de navegación
 */

import type { NavigationLink } from '@/lib/types'
import { navigationLinks } from './site'

// Re-exportar desde site.ts para mantener consistencia
export { navigationLinks }

// Enlaces rápidos para el footer
export const quickLinks: NavigationLink[] = [
  { href: '/#services', label: 'Servicios' },
  { href: '/#process', label: 'Proceso' },
  { href: '/#color-palette', label: 'Colores' },
  { href: '/#testimonials', label: 'Testimonios' },
  { href: '/#location', label: 'Ubicación' },
  { href: '/#contact', label: 'Contacto' },
] as const
