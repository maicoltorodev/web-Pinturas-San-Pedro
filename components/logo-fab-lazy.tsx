"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Lazy load LogoFAB solo cuando el usuario hace scroll
const LogoFAB = dynamic(() => import("@/components/logo-fab").then(mod => ({ default: mod.LogoFAB })), {
  ssr: false,
})

export function LogoFABLazy() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Solo cargar después de que el usuario haya hecho scroll
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShouldLoad(true)
        // Una vez cargado, ya no necesitamos escuchar scroll
        window.removeEventListener("scroll", handleScroll)
      }
    }

    // También cargar después de un pequeño delay para usuarios que no hacen scroll inmediatamente
    const timeoutId = setTimeout(() => {
      setShouldLoad(true)
    }, 3000) // 3 segundos después de cargar la página

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Verificar estado inicial
    if (window.scrollY > 200) {
      setShouldLoad(true)
      clearTimeout(timeoutId)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  if (!shouldLoad) return null

  return <LogoFAB />
}
