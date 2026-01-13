"use client"

import { useState } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useInView } from "@/lib/useInView"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "María González",
    rating: 5,
    date: "Hace 2 semanas",
    comment: "Excelente servicio profesional. El equipo de Pinturas San Pedro transformó completamente mi casa. Muy puntuales, limpios y con un acabado impecable. ¡Altamente recomendados!",
    project: "Pintura de casa completa"
  },
  {
    name: "Carlos Rodríguez",
    rating: 5,
    date: "Hace 1 mes",
    comment: "Quedé muy satisfecho con el trabajo realizado en mi oficina. Los colores elegidos fueron perfectos y el proceso fue muy profesional desde el inicio hasta el final.",
    project: "Pintura comercial"
  },
  {
    name: "Ana Martínez",
    rating: 5,
    date: "Hace 3 semanas",
    comment: "Increíble atención al detalle. Pintaron mi cocina y quedó espectacular. El equipo fue muy respetuoso con mi hogar y siempre mantuvieron todo limpio. Definitivamente los volveré a contratar.",
    project: "Renovación de cocina"
  },
  {
    name: "Luis Fernández",
    rating: 5,
    date: "Hace 2 meses",
    comment: "Profesionales de verdad. Hicieron un trabajo excepcional en el exterior de mi casa. La pintura se ve perfecta y resistió muy bien las lluvias. Muy contento con el resultado.",
    project: "Pintura exterior"
  },
  {
    name: "Laura Sánchez",
    rating: 5,
    date: "Hace 1 semana",
    comment: "El mejor servicio de pintura que he contratado. Muy organizados, puntuales y el resultado superó mis expectativas. Los colores quedaron exactamente como los imaginé.",
    project: "Pintura residencial"
  },
  {
    name: "Roberto Jiménez",
    rating: 5,
    date: "Hace 3 meses",
    comment: "Excelente calidad y servicio. Pintaron mi restaurante y quedó hermoso. Los clientes han notado la mejora. Muy profesionales y cumplieron con los tiempos acordados.",
    project: "Pintura de restaurante"
  },
  {
    name: "Patricia López",
    rating: 5,
    date: "Hace 1 mes",
    comment: "Muy satisfecha con el trabajo. El equipo fue muy cuidadoso con mis muebles y pertenencias. La pintura quedó perfecta y el proceso fue muy limpio. Recomendado 100%.",
    project: "Pintura interior"
  },
  {
    name: "Javier Ramírez",
    rating: 5,
    date: "Hace 2 semanas",
    comment: "Profesionales excelentes. Hicieron un trabajo impecable en mi apartamento. Muy puntuales, limpios y con un acabado de primera calidad. Sin duda los mejores.",
    project: "Pintura de apartamento"
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
            <span className="text-sm font-semibold text-secondary">
              {testimonial.project}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function Testimonials() {
  const { ref: sectionRef, isInView: sectionInView } = useInView<HTMLDivElement>({ threshold: 0.2, triggerOnce: true })
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Mostrar 3 testimonios a la vez, moviéndose de a uno
  const itemsToShow = 3
  
  const getVisibleTestimonials = () => {
    const visible: typeof testimonials = []
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }
  
  // Calcular el número de "páginas" para los indicadores (basado en movimientos de 1)
  const totalSlides = testimonials.length
  const currentPage = Math.floor(currentIndex / 1) % totalSlides

  return (
    <section id="testimonials" className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden">
      {/* Decoración sutil de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 md:mb-20 transition-all duration-1000",
          sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 border-2 border-secondary/20 mb-8 shadow-sm">
            <Star className="h-4 w-4 text-secondary fill-secondary" />
            <span className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-wider">
              Testimonios de Google
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight">
            <span className="block">Lo Que Dicen</span>
            <span className="block">
              <span className="gradient-text">Nuestros Clientes</span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Miles de clientes satisfechos confían en nosotros para transformar sus espacios. 
            Descubre por qué somos la mejor opción en servicios de pintura profesional.
          </p>
          
          {/* Rating promedio */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "h-6 w-6",
                    i < 4 ? "fill-secondary text-secondary" : "fill-transparent text-secondary/30"
                  )} 
                />
              ))}
            </div>
            <div className="text-left">
              <p className="text-2xl font-black text-foreground">4.3</p>
              <p className="text-sm text-muted-foreground">Basado en 171 reseñas</p>
            </div>
          </div>
        </div>

        {/* Carrusel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Contenedor del carrusel */}
          <div className="relative mb-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getVisibleTestimonials().map((testimonial, index) => {
                // Calcular el índice real del testimonio para la key única
                const realIndex = (currentIndex + index) % testimonials.length
                return (
                  <div
                    key={`${realIndex}-${currentIndex}`}
                    className={cn(
                      "transition-all duration-500 ease-in-out",
                      sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <TestimonialCard testimonial={testimonial} isActive={index === 1} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Controles de navegación */}
          <div className="flex items-center justify-center gap-6">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="lg"
              className="rounded-full w-14 h-14 border-2 border-border text-foreground hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            {/* Indicadores mejorados */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    currentIndex === index
                      ? "bg-secondary w-10 shadow-md"
                      : "bg-border w-2 hover:bg-secondary/50"
                  )}
                  aria-label={`Ir a testimonio ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              onClick={nextSlide}
              variant="outline"
              size="lg"
              className="rounded-full w-14 h-14 border-2 border-border text-foreground hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
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
