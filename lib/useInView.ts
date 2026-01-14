"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useInView<T extends HTMLElement = HTMLElement>(options: UseInViewOptions = {}) {
  const { threshold = 0.5, rootMargin = "0px", triggerOnce = false } = options
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<T>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const optionsRef = useRef({ threshold, rootMargin, triggerOnce })

  // Actualizar opciones sin recrear observer si los valores no cambiaron significativamente
  useEffect(() => {
    const currentOptions = optionsRef.current
    const optionsChanged = 
      currentOptions.threshold !== threshold ||
      currentOptions.rootMargin !== rootMargin ||
      currentOptions.triggerOnce !== triggerOnce

    if (optionsChanged) {
      optionsRef.current = { threshold, rootMargin, triggerOnce }
      // Solo recrear observer si las opciones críticas cambiaron
      if (observerRef.current && ref.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Solo crear observer si no existe o fue desconectado
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            if (optionsRef.current.triggerOnce && observerRef.current) {
              observerRef.current.unobserve(element)
            }
          } else if (!optionsRef.current.triggerOnce) {
            setIsInView(false)
          }
        },
        {
          threshold: optionsRef.current.threshold,
          rootMargin: optionsRef.current.rootMargin,
        }
      )
    }

    const observer = observerRef.current
    observer.observe(element)

    return () => {
      if (observer && element) {
        observer.unobserve(element)
      }
    }
  }, []) // Sin dependencias - el observer se maneja internamente

  // Cleanup final al desmontar
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [])

  return { ref, isInView }
}
