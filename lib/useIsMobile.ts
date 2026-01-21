"use client"

import { useState, useEffect } from 'react'

/**
 * Hook compartido para detectar si el dispositivo es móvil
 * Centraliza la lógica de detección y evita duplicación de código
 * 
 * @param breakpoint - Breakpoint en píxeles (default: 768px)
 * @returns boolean - true si es móvil, false si es desktop
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Función para verificar si es móvil
    const checkMobile = () => {
      setIsMobile(window.matchMedia(`(max-width: ${breakpoint}px)`).matches)
    }

    // Verificar al montar
    checkMobile()

    // Crear media query
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)

    // Escuchar cambios (soporte moderno y legacy)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', checkMobile)
      return () => mediaQuery.removeEventListener('change', checkMobile)
    } else {
      // Fallback para navegadores antiguos
      mediaQuery.addListener(checkMobile)
      return () => mediaQuery.removeListener(checkMobile)
    }
  }, [breakpoint])

  return isMobile
}
