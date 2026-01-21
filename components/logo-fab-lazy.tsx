"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"

// Lazy load LogoFAB solo cuando el usuario hace scroll
const LogoFAB = dynamic(() => import("@/components/logo-fab").then(mod => ({ default: mod.LogoFAB })), {
  ssr: false,
})

export function LogoFABLazy() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const hasLoadedRef = useRef(false)

  useEffect(() => {
    if (hasLoadedRef.current) return

    const loadLogo = () => {
      if (hasLoadedRef.current) return
      hasLoadedRef.current = true
      setShouldLoad(true)
    }

    // Verificar estado inicial
    if (window.scrollY > 200) {
      loadLogo()
      return
    }

    // Cargar después de scroll o timeout
    const handleScroll = () => {
      if (window.scrollY > 200) {
        loadLogo()
        window.removeEventListener("scroll", handleScroll)
      }
    }

    const timeoutId = setTimeout(loadLogo, 3000)

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  if (!shouldLoad) return null

  return <LogoFAB />
}
