"use client"

import { useMemo, memo, useRef, useState, useEffect } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { CirclePattern } from "@/components/ui/circle-pattern"
import { cn } from "@/lib/utils"
import { testimonials as testimonialsData, paintColors, googleReviewsStats } from "@/lib/constants/testimonials"
import type { Testimonial, PaintColor } from "@/lib/types"

// Componente del icono de Google
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}


const TestimonialCard = memo(function TestimonialCard({ 
  testimonial, 
  isActive, 
  color
}: { 
  testimonial: Testimonial; 
  isActive?: boolean;
  color: PaintColor;
}) {
  return (
    <Card 
      className={cn(
        "h-full border-2 transition-all duration-700 ease-in-out",
        isActive 
          ? "shadow-premium-lg bg-gradient-to-br from-card" 
          : "border-border/50 bg-card opacity-90"
      )}
      style={{
        borderColor: isActive ? color.hex : undefined,
        background: isActive 
          ? `linear-gradient(to bottom right, var(--card), ${color.hex}08)` 
          : undefined,
      }}
    >
      <CardContent className="p-6 md:p-8">
        {/* Header con avatar y rating */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div 
                className="w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center border-4 border-white shadow-lg"
                style={{
                  background: `linear-gradient(to bottom right, ${color.hex}, ${color.light})`
                }}
              >
                <span className="text-2xl font-black text-white">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div 
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                style={{ backgroundColor: color.hex }}
              >
                <Star className="h-3 w-3 fill-white text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground mb-1">{testimonial.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{testimonial.date}</p>
              <div className="flex items-center gap-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-3.5 w-3.5 fill-current" 
                    style={{ color: color.hex }}
                  />
                ))}
              </div>
            </div>
          </div>
          <Quote className="h-8 w-8 flex-shrink-0" style={{ color: `${color.hex}20` }} />
        </div>

        {/* Comentario */}
        <div className="mb-6">
          <p className="text-base text-foreground/90 leading-relaxed font-medium">
            "{testimonial.comment}"
          </p>
        </div>

        {/* Footer con proyecto */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-sm font-semibold text-foreground">
              {testimonial.project}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

export function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Preparar testimonios con colores - memoizado para evitar recálculos
  const testimonialsWithColors = useMemo(() => {
    return testimonialsData.map((testimonial, index) => {
      const colorIndex = index % paintColors.length
      return {
        ...testimonial,
        color: paintColors[colorIndex]
      }
    })
  }, [])

  // Track scroll position for indicators
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const cardWidth = container.clientWidth / (window.innerWidth >= 768 ? 3 : 1)
      const newIndex = Math.round(scrollLeft / cardWidth)
      setActiveIndex(newIndex)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current
    if (!container) return
    const cardWidth = container.clientWidth / (window.innerWidth >= 768 ? 3 : 1)
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
  }

  const scrollPrev = () => {
    const container = scrollContainerRef.current
    if (!container) return
    const cardWidth = container.clientWidth / (window.innerWidth >= 768 ? 3 : 1)
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' })
  }

  const scrollNext = () => {
    const container = scrollContainerRef.current
    if (!container) return
    const cardWidth = container.clientWidth / (window.innerWidth >= 768 ? 3 : 1)
    container.scrollBy({ left: cardWidth, behavior: 'smooth' })
  }

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Decoración optimizada solo en desktop */}
      <div className="hidden md:block absolute inset-0 opacity-5">
        <CirclePattern variant="subtle" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={{ icon: Star, text: "Testimonios de Google" }}
          title="Lo Que Dicen"
          subtitle="Nuestros Clientes"
          description="Miles de clientes satisfechos confían en nosotros. Descubre por qué somos la mejor opción."
        />
        
        <div className="flex items-center justify-center gap-4 mt-8 mb-16">
          {/* Icono de Google */}
          <div className="flex items-center gap-2">
            <GoogleIcon className="h-8 w-8" />
            <span className="text-sm font-semibold text-muted-foreground hidden sm:inline">Google</span>
          </div>
          
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn("h-6 w-6 transition-all duration-300", i < 4 ? "fill-secondary text-secondary" : "fill-transparent text-secondary/30")} 
              />
            ))}
          </div>
          <div className="text-left">
            <p className="text-2xl font-black text-foreground">{googleReviewsStats.rating}</p>
            <p className="text-sm text-muted-foreground">Basado en {googleReviewsStats.totalReviews} reseñas</p>
          </div>
        </div>

        {/* Carrusel nativo con CSS scroll-snap - 0KB JavaScript */}
        <div className="relative max-w-7xl mx-auto">
          {/* Botones de navegación desktop */}
          <Button
            variant="outline"
            size="lg"
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 rounded-full w-12 h-12 border-2 border-border text-foreground hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg bg-white"
            aria-label="Anterior"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 rounded-full w-12 h-12 border-2 border-border text-foreground hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg bg-white"
            aria-label="Siguiente"
            onClick={scrollNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Carousel nativo con scroll-snap */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {testimonialsWithColors.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-start w-full md:w-[calc(33.333%-21.33px)]"
                style={{ minWidth: '100%' }}
              >
                <div className="md:min-w-0 md:w-full h-full px-2">
                  <TestimonialCard 
                    testimonial={testimonial} 
                    isActive={true}
                    color={testimonial.color}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Controles móviles */}
          <div className="md:hidden flex items-center justify-between mt-6 px-4">
            <Button
              variant="outline"
              size="lg"
              className="flex rounded-full w-12 h-12 border-2 border-border text-foreground hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg bg-white"
              aria-label="Anterior"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            {/* Indicador de posición */}
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    activeIndex === index 
                      ? "w-8 h-2 bg-secondary" 
                      : "w-2 h-2 bg-border"
                  )}
                  aria-label={`Ir a testimonio ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="lg"
              className="flex rounded-full w-12 h-12 border-2 border-border text-foreground hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg bg-white"
              aria-label="Siguiente"
              onClick={scrollNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

    </section>
  )
}
