/**
 * Datos de testimonios de clientes
 */

import type { Testimonial, PaintColor } from '@/lib/types'

export const paintColors: PaintColor[] = [
  { name: 'Azul Mediterráneo', hex: '#304D9A', light: '#5F8AC7' },
  { name: 'Verde Primaveral', hex: '#4CAF50', light: '#81C784' },
  { name: 'Rojo Vivo', hex: '#D72124', light: '#E57373' },
  { name: 'Amarillo Oro', hex: '#FFD700', light: '#FFE082' },
  { name: 'Naranja Fuerte', hex: '#F97316', light: '#FFB74D' },
  { name: 'Morado', hex: '#6B2C91', light: '#9575CD' },
  { name: 'Oceánico', hex: '#00A6B2', light: '#4DD0E1' },
  { name: 'Verde Pino', hex: '#2D5016', light: '#66BB6A' },
  { name: 'Rojo Carmín', hex: '#ED6C54', light: '#EF9A9A' },
] as const

export const testimonials: Testimonial[] = [
  {
    name: 'Arley Orjuela',
    rating: 5,
    date: 'Hace 2 semanas',
    comment: 'Venden buenos accesorios para pintar y decorar el hogar la atención es muy buena y sus precios acordes a la necesidad',
    project: 'Compra de accesorios',
  },
  {
    name: 'Isabella Neuque',
    rating: 5,
    date: 'Hace 4 años',
    comment: 'Exelente calidad y el mejor servicio. Los precios son muy económicos. Y ni he tenido problema con los cambios.',
    project: 'Compra de pintura',
  },
  {
    name: 'Freddy Prada',
    rating: 5,
    date: 'Hace 2 años',
    comment: 'Buen lugar para comprar y buenos precios excelente calidad',
    project: 'Compra de pintura',
  },
  {
    name: 'Chamilo RR',
    rating: 5,
    date: 'Hace un año',
    comment: 'Muy buena atención y muy buen precio',
    project: 'Compra de pintura',
  },
  {
    name: 'Gustavo Ramirez',
    rating: 5,
    date: 'Hace 4 años',
    comment: 'Muy atentos y los precios son cómodos. Se consigue de todo. Es más barato que Homecenter.',
    project: 'Compra de pintura',
  },
  {
    name: 'Germán Andrés Garzón',
    rating: 5,
    date: 'Hace 4 años',
    comment: 'Buenos precios, preparan el color que necesite, domicilios. Recomendado',
    project: 'Preparación de colores personalizados',
  },
  {
    name: 'Roberto Alvarado',
    rating: 5,
    date: 'Hace 2 años',
    comment: 'Muy amable la atención excelente precio y la entrega a tiempo',
    project: 'Compra con domicilio',
  },
  {
    name: 'Danieljun Jun',
    rating: 5,
    date: 'Hace 6 años',
    comment: 'Aquí puedes encontrar gran variedad a precios excelentes, lo recomiendo',
    project: 'Compra de pintura',
  },
  {
    name: 'STUWWY84',
    rating: 5,
    date: 'Hace 5 años',
    comment: 'Excelente atención y buenos precios, la pintura salió muy buena 👍👍👍',
    project: 'Compra de pintura',
  },
] as const

// Estadísticas de Google Reviews
export const googleReviewsStats = {
  rating: 4.3,
  totalReviews: 171,
} as const
