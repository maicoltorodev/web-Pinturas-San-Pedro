"use client"

import { useState, useEffect, useRef } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { CirclePattern } from "@/components/ui/circle-pattern"
import { cn } from "@/lib/utils"

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

function TestimonialCard({ testimonial, isActive }: { testimonial: typeof testimonials[0]; isActive?: boolean }) {
  return (
    <Card className={cn(
      "h-full border-2 transition-all duration-500",
      isActive 
        ? "border-secondary shadow-premium-lg bg-gradient-to-br from-card to-secondary/5" 
        : "border-border/50 bg-card hover:border-secondary/50 hover:shadow-lg"
    )}>
      <CardContent className="p-8">
        {/* Header con avatar y rating */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-2xl font-black text-white">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary border-2 border-white flex items-center justify-center">
                <Star className="h-3 w-3 fill-white text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground mb-1">{testimonial.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{testimonial.date}</p>
              <div className="flex items-center gap-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                ))}
              </div>
            </div>
          </div>
          <Quote className="h-8 w-8 text-secondary/20 flex-shrink-0" />
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
            <div className="w-2 h-2 rounded-full bg-secondary" />
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
  
  const getVisibleTestimonials = () => {
    const visible: typeof testimonials = []
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length])
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
        
        <div className="flex items-center justify-center gap-3 mt-8 mb-16">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn("h-6 w-6", i < 4 ? "fill-secondary text-secondary" : "fill-transparent text-secondary/30")} 
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
          {/* Contenedor del carrusel con soporte para swipe */}
          <div 
            ref={carouselRef}
            className="relative mb-12 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getVisibleTestimonials().map((testimonial, index) => (
                <TestimonialCard key={`${currentIndex}-${index}`} testimonial={testimonial} isActive={index === 1} />
              ))}
            </div>
          </div>

          {/* Controles de navegación - Flechas ocultas en móvil */}
          <div className="flex items-center justify-center gap-6">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="lg"
              className="hidden md:flex rounded-full w-14 h-14 border-2 border-border text-foreground hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <div className="flex items-center gap-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center p-2",
                    currentIndex === index ? "bg-secondary shadow-md" : "bg-transparent hover:bg-secondary/10"
                  )}
                  aria-label={`Ir a testimonio ${index + 1}`}
                >
                  <span className={cn(
                    "rounded-full transition-all duration-300",
                    currentIndex === index ? "bg-white h-2 w-10" : "bg-border h-2 w-2"
                  )} />
                </button>
              ))}
            </div>
            
            <Button
              onClick={nextSlide}
              variant="outline"
              size="lg"
              className="hidden md:flex rounded-full w-14 h-14 border-2 border-border text-foreground hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
