"use client"

import { useState, useEffect, useRef, ReactNode } from "react"

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
}

/**
 * Componente que carga contenido solo cuando está cerca del viewport
 * Reduce el consumo de memoria al no cargar componentes que no son visibles
 */
export function LazySection({ 
  children, 
  fallback = <div className="h-64" />,
  rootMargin = "200px", // Cargar cuando está a 200px del viewport
  threshold = 0.01 
}: LazySectionProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const hasLoadedRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || shouldLoad || hasLoadedRef.current) return

    // Limpiar observer anterior si existe
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoadedRef.current) {
          hasLoadedRef.current = true
          setShouldLoad(true)
          // Desconectar después de cargar para liberar memoria
          if (observerRef.current) {
            observerRef.current.disconnect()
            observerRef.current = null
          }
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    observerRef.current = observer
    observer.observe(container)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      // No resetear hasLoadedRef aquí - una vez cargado, debe mantenerse
    }
  }, [shouldLoad, rootMargin, threshold])

  return (
    <div ref={containerRef}>
      {shouldLoad ? children : fallback}
    </div>
  )
}
