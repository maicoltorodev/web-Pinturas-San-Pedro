/**
 * Datos de servicios ofrecidos
 */

import type { Service } from '@/lib/types'

export const services: Service[] = [
  {
    icon: 'Sparkles',
    title: 'Consultoría de Color',
    description:
      'Asesoría experta en combinación de colores. Te ayudamos a elegir la paleta perfecta para tu espacio.',
    color: 'pink',
  },
  {
    icon: 'Home',
    title: 'Pinturas para Interiores',
    description:
      'Pinturas especializadas para uso interior. Acabados para transformar tus espacios interiores.',
    color: 'blue',
  },
  {
    icon: 'Building2',
    title: 'Pinturas para Exteriores',
    description:
      'Pinturas especializadas para fachadas y exteriores. Impermeabilizantes con alta resistencia a la intemperie.',
    color: 'yellow',
  },
] as const
