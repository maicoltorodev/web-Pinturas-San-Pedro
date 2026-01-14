"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"

// Lazy load LogoFAB solo cuando el usuario hace scroll
const LogoFAB = dynamic(() => import("@/components/logo-fab").then(mod => ({ default: mod.LogoFAB })), {
  ssr: false,
})

export function LogoFABLazy() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasLoadedRef = useRef(false)
  const handleScrollRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Evitar múltiples cargas
    if (hasLoadedRef.current) return

    // Solo cargar después de que el usuario haya hecho scroll
    const handleScroll = () => {
      if (window.scrollY > 200 && !hasLoadedRef.current) {
        hasLoadedRef.current = true
        setShouldLoad(true)
        // Limpiar recursos inmediatamente
        window.removeEventListener("scroll", handleScroll)
        handleScrollRef.current = null
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
      }
    }

    handleScrollRef.current = handleScroll

    // También cargar después de un pequeño delay para usuarios que no hacen scroll inmediatamente
    timeoutRef.current = setTimeout(() => {
      if (!hasLoadedRef.current) {
        hasLoadedRef.current = true
        setShouldLoad(true)
        if (handleScrollRef.current) {
          window.removeEventListener("scroll", handleScrollRef.current)
          handleScrollRef.current = null
        }
      }
    }, 3000) // 3 segundos después de cargar la página

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Verificar estado inicial
    if (window.scrollY > 200) {
      hasLoadedRef.current = true
      setShouldLoad(true)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      window.removeEventListener("scroll", handleScroll)
      handleScrollRef.current = null
    }

    return () => {
      if (handleScrollRef.current) {
        window.removeEventListener("scroll", handleScrollRef.current)
        handleScrollRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      hasLoadedRef.current = false
    }
  }, [])

  if (!shouldLoad) return null

  return <LogoFAB />
}
