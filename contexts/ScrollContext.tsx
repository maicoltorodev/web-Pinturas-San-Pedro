"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { useIsMobile } from "@/lib/useIsMobile"

interface ScrollContextValue {
  scrollY: number
  isScrolled: boolean
  isMobile: boolean
}

const ScrollContext = createContext<ScrollContextValue>({
  scrollY: 0,
  isScrolled: false,
  isMobile: false,
})

interface ScrollProviderProps {
  children: ReactNode
  threshold?: number
}

/**
 * Provider de scroll compartido - un solo listener para toda la app
 * Reduce overhead de múltiples scroll listeners
 */
export function ScrollProvider({ children, threshold = 10 }: ScrollProviderProps) {
  const [scrollY, setScrollY] = useState(0)
  const isMobile = useIsMobile()
  const rafIdRef = useRef<number | null>(null)
  const lastScrollYRef = useRef(0)
  const lastUpdateTimeRef = useRef(0)

  useEffect(() => {
    // Throttle más agresivo en móvil
    const throttleDelay = isMobile ? 50 : 16
    const scrollThreshold = isMobile ? threshold * 2 : threshold

    const handleScroll = () => {
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
          setScrollY(currentScrollY)
        }

        rafIdRef.current = null
      })
    }

    // Set initial scroll position
    setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
    }
  }, [threshold, isMobile])

  const isScrolled = scrollY > threshold

  return (
    <ScrollContext.Provider value={{ scrollY, isScrolled, isMobile }}>
      {children}
    </ScrollContext.Provider>
  )
}

/**
 * Hook para acceder al contexto de scroll
 */
export function useScroll() {
  return useContext(ScrollContext)
}
