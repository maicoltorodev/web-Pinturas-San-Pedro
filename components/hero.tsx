"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { CirclePattern } from "@/components/ui/circle-pattern"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Activar animación solo cuando el logo está visible
  useEffect(() => {
    const element = logoRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldAnimate(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Background - Simplified for mobile */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente base simplificado en móvil */}
        <div className="absolute inset-0 bg-primary md:bg-gradient-to-br md:from-primary md:via-primary md:to-[oklch(0.25_0.15_252)]" />
        {/* CirclePattern optimizado para móvil y desktop */}
        <CirclePattern variant="default" />
        {/* Círculos adicionales solo en desktop */}
        <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Circle 4 - Top Right */}
          <div
            className="absolute rounded-full blur-xl"
            style={{
              top: '20%',
              right: '18%',
              width: '13vw',
              height: '13vw',
              maxWidth: '360px',
              maxHeight: '360px',
              minWidth: '115px',
              minHeight: '115px',
              backgroundColor: 'oklch(0.85 0.22 90)',
              opacity: 0.5,
              transform: 'translateZ(0)',
            }}
          />
          {/* Circle 5 - Bottom Right */}
          <div
            className="absolute rounded-full blur-xl"
            style={{
              bottom: '20%',
              right: '15%',
              width: '14vw',
              height: '14vw',
              maxWidth: '370px',
              maxHeight: '370px',
              minWidth: '120px',
              minHeight: '120px',
              backgroundColor: 'oklch(0.85 0.22 90)',
              opacity: 0.5,
              transform: 'translateZ(0)',
            }}
          />
        </div>
        {/* Overlay solo en desktop */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 md:space-y-8">
            {/* Badge - Sin backdrop-blur en móvil */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 md:glass-dark border border-primary-foreground/20 mb-4">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-xs sm:text-sm font-semibold text-primary-foreground/90 uppercase tracking-wider">
                Profesionales en Color
              </span>
            </div>

            {/* Logo - Optimized for mobile */}
            <div className="flex justify-center mb-6">
              <div 
                ref={logoRef}
                className={cn(
                  "relative w-64 h-32 sm:w-80 sm:h-40 md:w-96 md:h-48 lg:w-[500px] lg:h-[250px] aspect-[2/1]",
                  shouldAnimate && "animate-float"
                )}
                style={{ 
                  minWidth: '256px',
                  minHeight: '128px',
                  maxWidth: '500px',
                  maxHeight: '250px',
                  willChange: shouldAnimate ? 'transform' : 'auto',
                  // GPU acceleration para móvil
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                {/* Simplified: Single glow effect instead of multiple layers */}
                <div className="hidden md:block absolute inset-0 pointer-events-none" style={{ 
                  filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))',
                  zIndex: 5
                }} />
                <Image
                  src="/logo.png"
                  alt="Pinturas San Pedro"
                  fill
                  className="object-contain relative z-10 md:[filter:drop-shadow(0_0_10px_rgba(255,215,0,0.3))]"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 500px"
                  style={{ 
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />
              </div>
            </div>

            {/* Tagline */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-primary-foreground" />
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-primary-foreground uppercase tracking-wider">
                CREAMOS COLOR!
              </span>
              <div className="h-px w-16 bg-primary-foreground" />
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/80 leading-relaxed max-w-3xl mx-auto font-light">
              Servicios profesionales de pintura residencial y comercial. 
              <span className="font-semibold text-primary-foreground"> Calidad artesanal</span>, 
              atención al detalle y compromiso para dar vida a tu visión.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                variant="secondary"
                size="lg"
                className="group bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full sm:w-auto h-14 md:h-16 text-base md:text-lg px-8 md:px-10 rounded-xl shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:scale-105 animate-button-glow flex items-center justify-center"
                asChild
              >
                <a 
                  href="https://wa.me/573223716811?text=Hola%2C%20me%20interesa%20solicitar%20una%20cotizaci%C3%B3n%20gratuita%20para%20servicios%20de%20pintura."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Cotización Gratuita
                  <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group w-full sm:w-auto h-14 md:h-16 text-base md:text-lg px-8 md:px-10 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent md:backdrop-blur-sm transition-all duration-300 md:hover:scale-105 md:hover:border-primary-foreground/50"
                asChild
              >
                <a href="#color-palette">
                  Ver Colores
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-12 md:pt-16 max-w-2xl mx-auto">
              {[
                { number: "15+", label: "Años de Experiencia" },
                { number: "500+", label: "Proyectos Completados" },
                { number: "100%", label: "Satisfacción" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black text-secondary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-primary-foreground/70 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile for performance */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
