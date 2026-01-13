"use client"

import { Button } from "@/components/ui/button"
import { CirclePattern } from "@/components/ui/circle-pattern"
import { ArrowRight, Sparkles } from "lucide-react"
import { useInView } from "@/lib/useInView"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Hero() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3, triggerOnce: true })

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[oklch(0.25_0.15_252)]" />
        <CirclePattern variant="default" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
        {/* Premium light effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/35 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/25 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className={cn(
            "text-center space-y-6 md:space-y-8 transition-all duration-1000",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-primary-foreground/20 mb-4">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-xs sm:text-sm font-semibold text-primary-foreground/90 uppercase tracking-wider">
                Profesionales en Color
              </span>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-64 h-32 sm:w-80 sm:h-40 md:w-96 md:h-48 lg:w-[500px] lg:h-[250px] animate-float">
                {/* Efecto de luz detrás del logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-secondary/35 rounded-full blur-3xl animate-pulse" style={{ transform: 'scale(1.2)' }} />
                </div>
                {/* Efecto de glow pulsante alrededor de la imagen */}
                <div className="absolute inset-0 animate-glow-pulse pointer-events-none" style={{ 
                  filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.3)) drop-shadow(0 0 60px rgba(255, 215, 0, 0.2))',
                  zIndex: 5
                }} />
                <Image
                  src="/logo.png"
                  alt="Pinturas San Pedro"
                  fill
                  className="object-contain relative z-10"
                  priority
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))' }}
                />
              </div>
            </div>

            {/* Tagline */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-16 bg-secondary/50" />
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-secondary uppercase tracking-wider">
                CREAMOS COLOR!
              </span>
              <div className="h-px w-16 bg-secondary/50" />
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
                className="group bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full sm:w-auto h-14 md:h-16 text-base md:text-lg px-8 md:px-10 rounded-xl shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:scale-105 animate-button-glow"
              >
                Cotización Gratuita
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group w-full sm:w-auto h-14 md:h-16 text-base md:text-lg px-8 md:px-10 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary-foreground/50"
              >
                Ver Portafolio
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
