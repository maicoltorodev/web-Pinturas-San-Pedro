"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"
import { useScrollOptimized } from "@/lib/useScrollOptimized"
import { SocialLinks } from "@/components/ui/social-link"
import { navigationLinks, whatsappUrls } from "@/lib/constants/site"
import { siteConfig } from "@/lib/constants/site"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { blurDataURL } from "@/lib/image-utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  
  const handleScroll = useCallback((scrollY: number) => {
    const newIsScrolled = scrollY > 20
    setIsScrolled(prev => prev !== newIsScrolled ? newIsScrolled : prev)
  }, [])

  useScrollOptimized({
    threshold: 10,
    onScroll: handleScroll,
    enabled: true,
  })

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 md:duration-500",
        isScrolled
          ? "bg-primary/95 md:backdrop-blur-md border-b border-primary-foreground/10 shadow-premium"
          : "bg-primary border-b border-primary-foreground/5"
      )}
      role="banner"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex items-center h-16 md:h-20 relative">
          {/* Logo */}
          <a 
            href="/" 
            className="flex-shrink-0 relative h-16 w-[180px] md:w-[280px] overflow-hidden block"
          >
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-primary" />
            )}
            <Image
              src="/pintura-amarilla.webp"
              alt={siteConfig.name}
              width={280}
              height={100}
              className={cn(
                "object-contain h-full w-auto transition-opacity duration-300 hover:scale-105",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              priority
              fetchPriority="high"
              placeholder="blur"
              blurDataURL={blurDataURL.small}
              sizes="(max-width: 768px) 180px, 280px"
              onLoad={() => setIsImageLoaded(true)}
            />
          </a>

          {/* Desktop Navigation - Centrada */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 absolute left-1/2 -translate-x-1/2">
            {navigationLinks.map((link, index) => (
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
            <SocialLinks size="md" />
            <Button
              variant="secondary"
              size="default"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-button-glow"
              asChild
            >
              <a href={whatsappUrls.quote} target="_blank" rel="noopener noreferrer">
                Contactar Ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Mobile: CTA Button Centrado */}
          <div className="flex items-center justify-center md:hidden flex-1 absolute left-1/2 -translate-x-1/2">
            <Button
              variant="secondary"
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-9 px-3 text-xs rounded-lg animate-button-glow-mobile"
              asChild
            >
              <a href={whatsappUrls.quote} target="_blank" rel="noopener noreferrer">
                Contactar Ahora
              </a>
            </Button>
          </div>
          
          {/* Mobile: Menu Button - Derecha */}
          <button
            className="p-2 -mr-2 rounded-lg hover:bg-primary-foreground/10 transition-colors md:hidden ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
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
          <div
            id="mobile-navigation"
            className="fixed inset-0 top-16 md:hidden bg-primary z-40 overflow-y-auto"
            role="navigation"
            aria-label="Navegación principal"
          >
            <div className="container mx-auto px-4 sm:px-6 py-8">
              <nav className="flex flex-col gap-4" aria-label="Enlaces de navegación">
                {navigationLinks.map((link, index) => (
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
                    href={whatsappUrls.quote}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Solicitar Cotización
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </nav>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
