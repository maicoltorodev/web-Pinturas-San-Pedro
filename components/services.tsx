"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionBackground } from "@/components/ui/section-background"
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

function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon
  return (
    <Card className="h-full border-2 border-border/50 bg-card/50 md:backdrop-blur-sm transition-all duration-300 md:hover:border-secondary md:hover:shadow-premium-lg md:hover:-translate-y-1 shadow-premium group">
      <CardContent className="p-6 md:p-8 relative overflow-hidden">
        <div className={cn(
          "absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 md:group-hover:opacity-10 transition-opacity duration-300",
          `bg-gradient-to-br ${service.color} blur-xl`
        )} />
        <div className={cn(
          "mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl",
          "bg-gradient-to-br from-secondary/20 to-secondary/10",
          "md:group-hover:from-secondary/30 md:group-hover:to-secondary/20",
          "transition-all duration-300 md:group-hover:scale-105"
        )}>
          <Icon className="h-8 w-8 text-secondary transition-transform duration-300" />
        </div>
        <h3 className="text-xl md:text-2xl font-black text-card-foreground mb-3 md:group-hover:text-secondary transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </CardContent>
    </Card>
  )
}

export function Services() {
  return (
    <section id="services" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      <SectionBackground variant="gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={{ icon: Sparkles, text: "Nuestros Servicios" }}
          title="Soluciones"
          subtitle="Premium"
          description="Servicios integrales de pintura adaptados a tus necesidades, con la más alta calidad y atención al detalle"
          className="text-foreground"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
