"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function LogoFAB() {
  const [isVisible, setIsVisible] = useState(false)
  const phoneNumber = "3223716811" // Número de WhatsApp de Pinturas San Pedro - Formato: 322 3716811
  const message = "Hola, me interesa conocer más sobre sus servicios de pintura."
  const whatsappUrl = `https://wa.me/57${phoneNumber}?text=${encodeURIComponent(message)}`

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className={cn(
        "fixed bottom-8 right-8 z-[9999]",
        "w-28 h-28",
        "flex items-center justify-center",
        "transition-all duration-500 ease-out",
        "hover:scale-110 active:scale-95",
        "group cursor-pointer",
        "animate-float",
        isVisible 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      
      {/* Logo con glow dorado pegado al borde */}
      <div 
        className="relative w-24 h-24 flex items-center justify-center z-10 aspect-square"
        style={{
          minWidth: '96px',
          minHeight: '96px'
        }}
      >
        <div 
          className="relative w-full h-full aspect-square"
          style={{
            minWidth: '96px',
            minHeight: '96px'
          }}
        >
          <Image
            src="/logo.png"
            alt="Pinturas San Pedro"
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
            sizes="96px"
            style={{ 
              filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.8))',
              objectFit: 'contain',
              width: '100%',
              height: '100%'
            }}
          />
          {/* Outline glow pegado al borde */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)',
              mixBlendMode: 'screen',
              filter: 'blur(2px)',
            }}
          />
        </div>
      </div>
      
      {/* Tooltip mejorado */}
      <div className="absolute right-full mr-4 px-4 py-2.5 bg-foreground text-background rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap text-sm font-bold pointer-events-none">
        Escríbenos por WhatsApp
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-foreground" />
      </div>
    </a>
  )
}
