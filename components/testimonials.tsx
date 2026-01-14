"use client"

import { useState } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
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
  
  const getVisibleTestimonials = () => {
    const visible: typeof testimonials = []
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length])
    }
    return visible
  }
  
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonials" className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden">
      {/* Decoración solo en desktop - pesada en móvil */}
      <div className="hidden md:block absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-xl" />
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
          {/* Contenedor del carrusel */}
          <div className="relative mb-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {getVisibleTestimonials().map((testimonial, index) => (
                <TestimonialCard key={`${currentIndex}-${index}`} testimonial={testimonial} isActive={index === 1} />
              ))}
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
