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

  useEffect(() => {
    const container = containerRef.current
    if (!container || shouldLoad) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          // Desconectar después de cargar para liberar memoria
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [shouldLoad, rootMargin, threshold])

  return (
    <div ref={containerRef}>
      {shouldLoad ? children : fallback}
    </div>
  )
}
