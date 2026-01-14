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
    color: "purple",
  },
  {
    icon: Sparkles,
    title: "Consultoría de Color",
    description:
      "Servicios expertos de combinación de colores y consultoría. Te ayudamos a elegir la paleta perfecta para tu espacio.",
    color: "pink",
  },
  {
    icon: Home,
    title: "Pintura Residencial",
    description:
      "Pintura interior y exterior para hogares. Desde habitaciones individuales hasta casas completas, damos vida a tu visión con precisión y cuidado.",
    color: "blue",
  },
  {
    icon: Building2,
    title: "Pintura Comercial",
    description:
      "Servicios profesionales de pintura para oficinas, espacios comerciales y propiedades comerciales. Mínima interrupción en tus operaciones.",
    color: "yellow",
  },
]

const getColorClasses = (color: string) => ({
  border: color === "purple" ? "border-purple-500/30 md:hover:border-purple-500 md:hover:border-[3px]"
    : color === "pink" ? "border-pink-500/30 md:hover:border-pink-500 md:hover:border-[3px]"
    : color === "blue" ? "border-blue-500/30 md:hover:border-blue-500 md:hover:border-[3px]"
    : "border-yellow-500/30 md:hover:border-yellow-500 md:hover:border-[3px]",
  borderShadow: color === "purple" ? "md:hover:shadow-[0_0_0_3px_rgba(168,85,247,0.2)]"
    : color === "pink" ? "md:hover:shadow-[0_0_0_3px_rgba(236,72,153,0.2)]"
    : color === "blue" ? "md:hover:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]"
    : "md:hover:shadow-[0_0_0_3px_rgba(234,179,8,0.2)]",
  bgGradient: color === "purple" ? "from-purple-50/50 via-purple-50/30 to-transparent"
    : color === "pink" ? "from-pink-50/50 via-pink-50/30 to-transparent"
    : color === "blue" ? "from-blue-50/50 via-blue-50/30 to-transparent"
    : "from-yellow-50/50 via-yellow-50/30 to-transparent",
  iconBg: color === "purple" ? "from-purple-500 to-purple-600"
    : color === "pink" ? "from-pink-500 to-pink-600"
    : color === "blue" ? "from-blue-500 to-blue-600"
    : "from-yellow-500 to-yellow-600",
  title: color === "purple" ? "text-purple-700"
    : color === "pink" ? "text-pink-700"
    : color === "blue" ? "text-blue-700"
    : "text-yellow-700",
  accent: color === "purple" ? "bg-purple-500/10"
    : color === "pink" ? "bg-pink-500/10"
    : color === "blue" ? "bg-blue-500/10"
    : "bg-yellow-500/10",
})

function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon
  const colors = getColorClasses(service.color)
  
  return (
    <Card className={cn(
      "h-full border-2 bg-card/50 md:backdrop-blur-sm transition-all duration-300",
      "md:hover:shadow-premium-lg md:hover:-translate-y-1 shadow-premium",
      "group relative overflow-hidden",
      colors.border,
      colors.borderShadow
    )}>
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-50 md:group-hover:opacity-70 transition-opacity duration-300",
        colors.bgGradient
      )} />
      
      <CardContent className="p-6 md:p-8 relative z-10">
        <div className={cn(
          "absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 md:group-hover:opacity-30 transition-opacity duration-300",
          `bg-gradient-to-br ${colors.iconBg} blur-xl`
        )} />
        
        <div className={cn(
          "mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl",
          "transition-all duration-300 shadow-lg md:group-hover:scale-110 md:group-hover:shadow-xl",
          `bg-gradient-to-br ${colors.iconBg}`
        )}>
          <Icon className="h-8 w-8 text-white transition-all duration-300 md:group-hover:scale-110" />
        </div>
        
        <h3 className={cn(
          "text-xl md:text-2xl font-black mb-3 transition-colors duration-300",
          colors.title
        )}>
          {service.title}
        </h3>
        
        <div className={cn("p-4 rounded-xl transition-all duration-300", colors.accent)}>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </div>
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
