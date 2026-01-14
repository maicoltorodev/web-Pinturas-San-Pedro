"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Define navLinks outside component to ensure consistency between server and client
// This array is static and should never change during runtime
const navLinks = [
  { href: "#services", label: "Servicios" },
  { href: "#process", label: "Proceso" },
  { href: "#products", label: "Productos" },
  { href: "#color-palette", label: "Colores" },
  { href: "#testimonials", label: "Testimonios" },
  { href: "#location", label: "Ubicación" },
  { href: "#contact", label: "Contacto" },
] as const

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
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
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center group flex-shrink-0">
            <div className="relative h-12 w-32 md:h-16 md:w-40 lg:h-20 lg:w-48 transition-transform duration-300 group-hover:scale-105 animate-glow-pulse-subtle aspect-[2.67/1]">
              <Image
                src="/pintura-amarilla.png"
                alt="Pinturas San Pedro"
                fill
                className="object-contain md:[filter:drop-shadow(0_0_4px_rgba(255,215,0,0.2))]"
                priority
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                quality={75}
              />
            </div>
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

          {/* Botón Cotizar - Derecha */}
          <div className="hidden md:flex items-center flex-shrink-0">
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
                Cotizar
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Mobile: CTA Button and Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
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
                Cotizar
              </a>
            </Button>
            <button
              className="p-2 -mr-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
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
