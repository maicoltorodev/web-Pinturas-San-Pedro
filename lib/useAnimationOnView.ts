"use client"

import { useEffect, useRef, useState } from "react"

interface UseAnimationOnViewOptions {
  threshold?: number
  rootMargin?: string
  enabled?: boolean
}

/**
 * Hook que activa animaciones solo cuando el elemento está visible en el viewport
 * Ayuda a reducir consumo de memoria al evitar animaciones innecesarias
 */
export function useAnimationOnView<T extends HTMLElement = HTMLElement>(
  options: UseAnimationOnViewOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px", enabled = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!enabled) {
      setShouldAnimate(false)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsVisible(visible)
        // Activar animación solo cuando está visible
        setShouldAnimate(visible)
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      setShouldAnimate(false)
    }
  }, [threshold, rootMargin, enabled])

  return { ref, isVisible, shouldAnimate }
}
