"use client"

import { useIsMobile } from './useIsMobile'

/**
 * Hook que retorna un rootMargin responsivo basado en el tamaño del viewport
 * Menor en móvil para evitar carga prematura, mayor en desktop
 */
export function useResponsiveRootMargin(defaultMobile = "300px", defaultDesktop = "800px") {
  const isMobile = useIsMobile()
  return isMobile ? defaultMobile : defaultDesktop
}
