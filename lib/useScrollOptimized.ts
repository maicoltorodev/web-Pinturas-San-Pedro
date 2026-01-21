import { useEffect, useRef } from 'react'
import { useIsMobile } from './useIsMobile'

interface UseScrollOptimizedOptions {
  threshold?: number
  onScroll?: (scrollY: number) => void
  enabled?: boolean
}

/**
 * Hook optimizado para scroll que detecta móvil y aplica throttling más agresivo
 * Reduce la frecuencia de actualizaciones en móvil para mejor rendimiento
 */
export function useScrollOptimized({
  threshold = 10,
  onScroll,
  enabled = true,
}: UseScrollOptimizedOptions = {}) {
  const rafIdRef = useRef<number | null>(null)
  const lastScrollYRef = useRef(0)
  const isMobile = useIsMobile()
  const lastUpdateTimeRef = useRef(0)

  useEffect(() => {
    if (!enabled) return

    // Throttle más agresivo en móvil: 50ms vs 16ms (60fps)
    const throttleDelay = isMobile ? 50 : 16
    // Threshold mayor en móvil para reducir updates
    const scrollThreshold = isMobile ? threshold * 2 : threshold

    const handleScroll = () => {
      // Cancelar RAF anterior si existe
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }

      rafIdRef.current = requestAnimationFrame(() => {
        const now = Date.now()
        const currentScrollY = window.scrollY

        // Throttling basado en tiempo
        if (now - lastUpdateTimeRef.current < throttleDelay) {
          rafIdRef.current = null
          return
        }

        // Solo actualizar si hay cambio significativo
        if (Math.abs(currentScrollY - lastScrollYRef.current) > scrollThreshold) {
          lastScrollYRef.current = currentScrollY
          lastUpdateTimeRef.current = now
          
          if (onScroll) {
            onScroll(currentScrollY)
          }
        }

        rafIdRef.current = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
    }
  }, [threshold, onScroll, enabled, isMobile])

  return {
    isMobile,
  }
}