/**
 * Hook compartido para IntersectionObserver
 * Un solo observer maneja múltiples elementos para mejor rendimiento
 */

import { useEffect, useRef, useState, type RefObject } from 'react'

interface ObserverEntry {
  element: Element
  callback: (isIntersecting: boolean) => void
}

// Observer global compartido
let globalObserver: IntersectionObserver | null = null
const observedElements = new Map<Element, ObserverEntry>()

const defaultOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '50px',
}

/**
 * Hook para usar IntersectionObserver compartido
 * Reduce overhead de múltiples observers
 */
export function useSharedIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: Partial<IntersectionObserverInit> = {}
): [RefObject<T | null>, boolean] {
  const elementRef = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const callbackRef = useRef<(isIntersecting: boolean) => void>((value) => {
    setIsIntersecting(value)
  })

  // Actualizar callback ref cuando cambia
  useEffect(() => {
    callbackRef.current = (value) => setIsIntersecting(value)
  }, [])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Crear observer global si no existe
    if (!globalObserver) {
      const observerOptions = { ...defaultOptions, ...options }
      globalObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const observerEntry = observedElements.get(entry.target)
            if (observerEntry) {
              observerEntry.callback(entry.isIntersecting)
            }
          })
        },
        observerOptions
      )
    }

    // Registrar elemento
    const entry: ObserverEntry = {
      element,
      callback: (value) => callbackRef.current(value),
    }
    observedElements.set(element, entry)
    globalObserver.observe(element)

    // Verificar estado inicial
    if (globalObserver) {
      const initialEntry = globalObserver.takeRecords().find((e) => e.target === element)
      if (initialEntry) {
        setIsIntersecting(initialEntry.isIntersecting)
      }
    }

    return () => {
      if (globalObserver && element) {
        globalObserver.unobserve(element)
        observedElements.delete(element)
        
        // Limpiar observer si no hay más elementos
        if (observedElements.size === 0) {
          globalObserver.disconnect()
          globalObserver = null
        }
      }
    }
  }, [options.threshold, options.rootMargin, options.root])

  return [elementRef, isIntersecting]
}
