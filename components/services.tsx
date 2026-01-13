"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "@/lib/useInView"
import { Home, Building2, Brush, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Brush,
    title: "Productos",
    description:
      "Amplia gama de productos de pintura de la más alta calidad. Desde pinturas para interiores hasta productos especializados para cada necesidad.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Sparkles,
    title: "Consultoría de Color",
    description:
      "Servicios expertos de combinación de colores y consultoría. Te ayudamos a elegir la paleta perfecta para tu espacio.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Home,
    title: "Pintura Residencial",
    description:
      "Pintura interior y exterior para hogares. Desde habitaciones individuales hasta casas completas, damos vida a tu visión con precisión y cuidado.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Building2,
    title: "Pintura Comercial",
    description:
      "Servicios profesionales de pintura para oficinas, espacios comerciales y propiedades comerciales. Mínima interrupción en tus operaciones.",
    color: "from-yellow-500 to-yellow-600",
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <div className="group">
      <Card
        className={cn(
          "h-full border-2 border-border/50 bg-card/50 backdrop-blur-sm",
          "transition-all duration-500 ease-out",
          "hover:border-secondary hover:shadow-premium-lg hover:-translate-y-2",
          "hover:bg-gradient-to-br hover:from-card hover:to-card/80",
          "shadow-premium"
        )}
      >
        <CardContent className="p-6 md:p-8 relative overflow-hidden">
          {/* Decorative gradient background */}
          <div className={cn(
            "absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500",
            `bg-gradient-to-br ${service.color} blur-3xl`
          )} />
          
          {/* Icon */}
          <div className={cn(
            "mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl",
            "bg-gradient-to-br from-secondary/20 to-secondary/10",
            "group-hover:from-secondary/30 group-hover:to-secondary/20",
            "transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
          )}>
            <service.icon className="h-8 w-8 text-secondary transition-transform duration-500 group-hover:scale-110" />
          </div>

          {/* Content */}
          <h3 className="text-xl md:text-2xl font-black text-card-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export function Services() {
  const { ref: sectionRef, isInView: sectionInView } = useInView<HTMLDivElement>({ 
    threshold: 0.1, 
    rootMargin: "-50px",
    triggerOnce: true 
  })

  return (
    <section id="services" className="relative py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background via-background to-muted/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={cn(
          "text-center mb-16 md:mb-20 transition-opacity duration-300",
          sectionInView ? "opacity-100" : "opacity-0"
        )}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-wider">
              Nuestros Servicios
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight">
            <span className="block">Soluciones</span>
            <span className="block gradient-text">Premium</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Servicios integrales de pintura adaptados a tus necesidades, 
            con la más alta calidad y atención al detalle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
