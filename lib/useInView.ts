"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  enabled?: boolean
}

/**
 * Hook optimizado unificado para detectar visibilidad y animaciones
 * Consolida useInView y useAnimationOnView en un solo hook eficiente
 * Evita múltiples instancias de IntersectionObserver
 */
export function useInView<T extends HTMLElement = HTMLElement>(options: UseInViewOptions = {}) {
  const { 
    threshold = 0.1, 
    rootMargin = "0px", 
    triggerOnce = false,
    enabled = true 
  } = options
  
  const [isInView, setIsInView] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const ref = useRef<T>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const hasTriggeredRef = useRef(false)
  
  // Memoizar opciones para evitar recreaciones innecesarias
  const optionsRef = useRef({ threshold, rootMargin, triggerOnce, enabled })
  
  useEffect(() => {
    optionsRef.current = { threshold, rootMargin, triggerOnce, enabled }
  }, [threshold, rootMargin, triggerOnce, enabled])

  useEffect(() => {
    if (!enabled) {
      setIsInView(false)
      setShouldAnimate(false)
      return
    }

    const element = ref.current
    if (!element) return

    // Si ya se activó y es triggerOnce, no crear observer
    if (triggerOnce && hasTriggeredRef.current) return

    // Limpiar observer anterior
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting
        
        if (isIntersecting) {
          setIsInView(true)
          setShouldAnimate(true)
          
          if (triggerOnce) {
            hasTriggeredRef.current = true
            if (observerRef.current) {
              observerRef.current.unobserve(element)
              observerRef.current.disconnect()
              observerRef.current = null
            }
          }
        } else if (!triggerOnce) {
          setIsInView(false)
          setShouldAnimate(false)
        }
      },
      {
        threshold: optionsRef.current.threshold,
        rootMargin: optionsRef.current.rootMargin,
      }
    )

    observerRef.current = observer
    observer.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [enabled, threshold, rootMargin, triggerOnce])

  return { ref, isInView, shouldAnimate }
}
