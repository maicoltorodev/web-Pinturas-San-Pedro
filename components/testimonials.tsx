"use client"

import { useState, useEffect, useRef } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { CirclePattern } from "@/components/ui/circle-pattern"
import { cn } from "@/lib/utils"

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

// Paleta de colores de pintura para las cards de testimonios
const paintColors = [
  { name: "Azul Mediterráneo", hex: "#304D9A", light: "#5F8AC7" },
  { name: "Verde Primaveral", hex: "#4CAF50", light: "#81C784" },
  { name: "Rojo Vivo", hex: "#D72124", light: "#E57373" },
  { name: "Amarillo Oro", hex: "#FFD700", light: "#FFE082" },
  { name: "Naranja Fuerte", hex: "#F97316", light: "#FFB74D" },
  { name: "Morado", hex: "#6B2C91", light: "#9575CD" },
  { name: "Oceánico", hex: "#00A6B2", light: "#4DD0E1" },
  { name: "Verde Pino", hex: "#2D5016", light: "#66BB6A" },
  { name: "Rojo Carmín", hex: "#ED6C54", light: "#EF9A9A" },
]

const testimonials = [
  {
    name: "Arley Orjuela",
    rating: 5,
    date: "Hace 2 semanas",
    comment: "Venden buenos accesorios para pintar y decorar el hogar la atención es muy buena y sus precios acordes a la necesidad",
    project: "Compra de accesorios"
  },
  {
    name: "Isabella Neuque",
    rating: 5,
    date: "Hace 4 años",
    comment: "Exelente calidad y el mejor servicio. Los precios son muy económicos. Y ni he tenido problema con los cambios.",
    project: "Compra de productos"
  },
  {
    name: "Freddy Prada",
    rating: 5,
    date: "Hace 2 años",
    comment: "Buen lugar para comprar y buenos precios excelente producto",
    project: "Compra de productos"
  },
  {
    name: "Chamilo RR",
    rating: 5,
    date: "Hace un año",
    comment: "Muy buena atención y muy buen precio",
    project: "Compra de productos"
  },
  {
    name: "Gustavo Ramirez",
    rating: 5,
    date: "Hace 4 años",
    comment: "Muy atentos y los precios son cómodos. Se consigue de todo. Es más barato que Homecenter.",
    project: "Compra de productos"
  },
  {
    name: "Germán Andrés Garzón",
    rating: 5,
    date: "Hace 4 años",
    comment: "Buenos productos a buen precio, preparan el color que necesite, domicilios. Recomendado",
    project: "Preparación de colores personalizados"
  },
  {
    name: "Roberto Alvarado",
    rating: 5,
    date: "Hace 2 años",
    comment: "Muy amable la atención excelente precio y la entrega a tiempo",
    project: "Compra con domicilio"
  },
  {
    name: "Danieljun Jun",
    rating: 5,
    date: "Hace 6 años",
    comment: "Aquí puedes encontrar gran variedad de productos a precios excelentes, lo recomiendo",
    project: "Compra de productos"
  },
  {
    name: "STUWWY84",
    rating: 5,
    date: "Hace 5 años",
    comment: "Excelente atención y buenos precios, la pintura salió muy buena 👍👍👍",
    project: "Compra de pintura"
  },
]

function TestimonialCard({ 
  testimonial, 
  isActive, 
  color,
  index
}: { 
  testimonial: typeof testimonials[0]; 
  isActive?: boolean;
  color: typeof paintColors[0];
  index?: number;
}) {
  return (
    <Card 
      className={cn(
        "h-full border-2 transition-all duration-700 ease-in-out",
        isActive 
          ? "shadow-premium-lg bg-gradient-to-br from-card animate-fade-in" 
          : "border-border/50 bg-card opacity-90"
      )}
      style={{
        borderColor: isActive ? color.hex : undefined,
        background: isActive 
          ? `linear-gradient(to bottom right, var(--card), ${color.hex}08)` 
          : undefined,
        animationDelay: index !== undefined ? `${index * 100}ms` : undefined,
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
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Auto-play carousel every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    
    return () => clearInterval(interval)
  }, [])
  
  const getVisibleTestimonials = (isMobile: boolean) => {
    const visible: Array<typeof testimonials[0] & { color: typeof paintColors[0] }> = []
    const count = isMobile ? 1 : 3
    
    for (let i = 0; i < count; i++) {
      const testimonialIndex = (currentIndex + i) % testimonials.length
      const testimonial = testimonials[testimonialIndex]
      const colorIndex = testimonialIndex % paintColors.length
      const color = paintColors[colorIndex]
      visible.push({ ...testimonial, color })
    }
    return visible
  }
  
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  
  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const minSwipeDistance = 50
    
    if (distance > minSwipeDistance) {
      // Swipe left - next slide
      nextSlide()
    }
    if (distance < -minSwipeDistance) {
      // Swipe right - previous slide
      prevSlide()
    }
  }

  return (
    <section id="testimonials" className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden">
      {/* Decoración optimizada solo en desktop */}
      <div className="hidden md:block absolute inset-0 opacity-5">
        <CirclePattern variant="subtle" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={{ icon: Star, text: "Testimonios de Google" }}
          title="Lo Que Dicen"
          subtitle="Nuestros Clientes"
          description="Miles de clientes satisfechos confían en nosotros para transformar sus espacios. Descubre por qué somos la mejor opción en servicios de pintura profesional."
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
            <p className="text-2xl font-black text-foreground">4.3</p>
            <p className="text-sm text-muted-foreground">Basado en 171 reseñas</p>
          </div>
        </div>

        {/* Carrusel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Versión Desktop: 3 cards con flechas a los lados */}
          <div className="hidden md:block relative">
            <div className="relative overflow-visible">
              <div className="grid grid-cols-3 gap-8 relative">
                {getVisibleTestimonials(false).map((testimonial, index) => (
                  <div 
                    key={`desktop-${currentIndex}-${index}`} 
                    className="relative animate-slide-in"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    {/* Flecha izquierda */}
                    {index === 0 && (
                      <Button
                        onClick={prevSlide}
                        variant="outline"
                        size="lg"
                        className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 rounded-full w-12 h-12 border-2 border-border text-foreground hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg bg-white"
                        aria-label="Anterior"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                    )}
                    
                    <TestimonialCard 
                      testimonial={testimonial} 
                      isActive={index === 1}
                      color={testimonial.color}
                      index={index}
                    />
                    
                    {/* Flecha derecha */}
                    {index === 2 && (
                      <Button
                        onClick={nextSlide}
                        variant="outline"
                        size="lg"
                        className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 rounded-full w-12 h-12 border-2 border-border text-foreground hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg bg-white"
                        aria-label="Siguiente"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Versión Móvil: 1 card con flechas arriba/abajo o a los lados */}
          <div className="md:hidden relative">
            <div 
              ref={carouselRef}
              className="relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Contenedor de la card móvil */}
              <div className="relative">
                {getVisibleTestimonials(true).map((testimonial, index) => (
                  <div 
                    key={`mobile-${currentIndex}-${index}`} 
                    className="px-2 animate-fade-slide"
                  >
                    <TestimonialCard 
                      testimonial={testimonial} 
                      isActive={true}
                      color={testimonial.color}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Controles móviles: Flechas arriba y abajo */}
            <div className="flex items-center justify-between mt-6 px-4">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="lg"
                className="flex rounded-full w-12 h-12 border-2 border-border text-foreground hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg bg-white"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              {/* Indicador de posición móvil */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      currentIndex === index 
                        ? "w-8 h-2 bg-secondary" 
                        : "w-2 h-2 bg-border"
                    )}
                    aria-label={`Ir a testimonio ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                onClick={nextSlide}
                variant="outline"
                size="lg"
                className="flex rounded-full w-12 h-12 border-2 border-border text-foreground hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg bg-white"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
