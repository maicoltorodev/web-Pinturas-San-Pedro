"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight, Facebook, Instagram } from "lucide-react"

// TikTok Icon Component (not available in lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}
import Image from "next/image"
import { cn } from "@/lib/utils"

// Define navLinks outside component to ensure consistency between server and client
// This array is static and should never change during runtime
const navLinks = [
  { href: "/#services", label: "Servicios" },
  { href: "/#process", label: "Proceso" },
  { href: "/#products", label: "Productos" },
  { href: "/#color-palette", label: "Colores" },
  { href: "/#testimonials", label: "Testimonios" },
  { href: "/#location", label: "Ubicación" },
  { href: "/#contact", label: "Contacto" },
] as const

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let rafId: number | null = null
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      // Cancelar RAF anterior si existe
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        // Solo actualizar estado si hay cambio significativo (más de 5px)
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
          setIsScrolled(currentScrollY > 20)
          lastScrollY = currentScrollY
        }
        rafId = null
      })
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-primary/95 md:backdrop-blur-md border-b border-primary-foreground/10 shadow-premium"
          : "bg-primary border-b border-primary-foreground/5"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 md:h-20 relative">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 h-16 w-[180px] md:w-[280px] overflow-hidden">
            <Image
              src="/pintura-amarilla.png"
              alt="Pinturas San Pedro"
              width={280}
              height={100}
              className="object-contain transition-transform duration-300 hover:scale-105"
              priority
              sizes="(max-width: 768px) 180px, 280px"
              style={{ 
                objectFit: 'contain', 
                width: '100%', 
                height: '100%',
                display: 'block'
              }}
            />
          </a>

          {/* Desktop Navigation - Centrada */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, index) => (
              <a
                key={`${link.href}-${index}`}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-primary-foreground/90 hover:text-secondary rounded-lg hover:bg-primary-foreground/5 transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Botón Cotizar y Redes Sociales - Derecha */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0 ml-auto">
            {/* Redes Sociales */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/pinturassanpedro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-secondary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-primary-foreground/90 group-hover:text-secondary transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/pinturassanpedro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-secondary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-primary-foreground/90 group-hover:text-secondary transition-colors" />
              </a>
              <a
                href="https://www.tiktok.com/@pinturassanpedro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-secondary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-4 w-4 text-primary-foreground/90 group-hover:text-secondary transition-colors" />
              </a>
            </div>
            <Button
              variant="secondary"
              size="default"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-button-glow"
              asChild
            >
              <a 
                href="https://wa.me/573223716811?text=Hola%2C%20me%20interesa%20solicitar%20una%20cotizaci%C3%B3n%20gratuita%20para%20servicios%20de%20pintura."
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactar
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Mobile: CTA Button Centrado */}
          <div className="flex items-center justify-center md:hidden flex-1 absolute left-1/2 -translate-x-1/2">
            <Button
              variant="secondary"
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-9 px-3 text-xs rounded-lg animate-button-glow"
              asChild
            >
              <a 
                href="https://wa.me/573223716811?text=Hola%2C%20me%20interesa%20solicitar%20una%20cotizaci%C3%B3n%20gratuita%20para%20servicios%20de%20pintura."
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactar
              </a>
            </Button>
          </div>
          
          {/* Mobile: Menu Button - Derecha */}
          <button
            className="p-2 -mr-2 rounded-lg hover:bg-primary-foreground/10 transition-colors md:hidden ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-primary-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-primary-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 md:hidden bg-primary z-40 overflow-y-auto">
            <div className="container mx-auto px-4 sm:px-6 py-8">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <a
                    key={`${link.href}-mobile-${index}`}
                    href={link.href}
                    className="text-lg font-medium text-primary-foreground hover:text-secondary transition-colors py-3 px-4 rounded-lg hover:bg-primary-foreground/5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full mt-4 h-14 text-base rounded-xl animate-button-glow"
                  asChild
                >
                  <a 
                    href="https://wa.me/573223716811?text=Hola%2C%20me%20interesa%20solicitar%20una%20cotizaci%C3%B3n%20gratuita%20para%20servicios%20de%20pintura."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Solicitar Cotización
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
