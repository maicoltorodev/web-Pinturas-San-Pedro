/**
 * Datos del proceso de trabajo
 */

import type { ProcessStep } from '@/lib/types'

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Consulta y Asesoría',
    description:
      'Nos reunimos contigo para entender tus necesidades, evaluar tu proyecto y recomendarte las pinturas ideales para tu espacio.',
    icon: 'MessageSquare',
    color: 'from-blue-500 to-blue-600',
  },
  {
    number: '02',
    title: 'Selección de Color',
    description:
      'Nuestros expertos te ayudan a elegir los colores y acabados perfectos que complementan tu espacio y estilo.',
    icon: 'Palette',
    color: 'from-purple-500 to-purple-600',
  },
  {
    number: '03',
    title: 'Cotización Personalizada',
    description:
      'Te proporcionamos una cotización detallada y transparente con las pinturas seleccionadas y sus presentaciones disponibles.',
    icon: 'Wrench',
    color: 'from-amber-500 to-amber-600',
  },
  {
    number: '04',
    title: 'Compra y Entrega',
    description:
      'Procesamos tu pedido y coordinamos la entrega de pinturas premium, asegurando que recibas exactamente lo que necesitas.',
    icon: 'Paintbrush',
    color: 'from-green-500 to-green-600',
  },
  {
    number: '05',
    title: 'Seguimiento y Soporte',
    description:
      'Te acompañamos después de la compra, asegurando que tengas toda la información necesaria para obtener los mejores resultados.',
    icon: 'CheckCircle',
    color: 'from-secondary to-secondary/80',
  },
] as const
