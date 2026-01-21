/**
 * Hook personalizado para Intersection Observer
 * Optimizado para mejor rendimiento
 */

import { useEffect, useRef, useState, type RefObject } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  enabled?: boolean
}

/**
 * Hook para observar cuando un elemento entra en el viewport
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, root = null, rootMargin = '0px', enabled = true } = options
  const elementRef = useRef<T | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element || !enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold,
        root,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, enabled])

  return [elementRef, isIntersecting]
}
