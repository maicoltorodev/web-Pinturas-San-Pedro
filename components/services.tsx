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
      "Asesoría experta en combinación de colores. Te ayudamos a elegir la paleta perfecta para tu espacio y encontrar el producto ideal.",
    color: "pink",
  },
  {
    icon: Home,
    title: "Productos para Interiores",
    description:
      "Pinturas especializadas para uso interior. Vinilos acrílicos, esmaltes y productos de acabado para transformar tus espacios interiores.",
    color: "blue",
  },
  {
    icon: Building2,
    title: "Productos para Exteriores",
    description:
      "Pinturas y productos especializados para fachadas y exteriores. Impermeabilizantes y productos con alta resistencia a la intemperie.",
    color: "yellow",
  },
]

// Color map optimizado - estructura simplificada manteniendo compatibilidad con Tailwind
const colorMap: Record<string, {
  border: string
  hoverBorder: string
  hoverShadow: string
  bgGradient: string
  iconBg: string
  title: string
  accent: string
}> = {
  purple: {
    border: "border-purple-500/30",
    hoverBorder: "md:hover:border-purple-500",
    hoverShadow: "md:hover:shadow-[0_0_0_2px_rgba(168,85,247,0.3),0_4px_12px_rgba(168,85,247,0.15)]",
    bgGradient: "from-purple-50/50 via-purple-50/30 to-transparent",
    iconBg: "from-purple-500 to-purple-600",
    title: "text-purple-700",
    accent: "bg-purple-500/10",
  },
  pink: {
    border: "border-pink-500/30",
    hoverBorder: "md:hover:border-pink-500",
    hoverShadow: "md:hover:shadow-[0_0_0_2px_rgba(236,72,153,0.3),0_4px_12px_rgba(236,72,153,0.15)]",
    bgGradient: "from-pink-50/50 via-pink-50/30 to-transparent",
    iconBg: "from-pink-500 to-pink-600",
    title: "text-pink-700",
    accent: "bg-pink-500/10",
  },
  blue: {
    border: "border-blue-500/30",
    hoverBorder: "md:hover:border-blue-500",
    hoverShadow: "md:hover:shadow-[0_0_0_2px_rgba(59,130,246,0.3),0_4px_12px_rgba(59,130,246,0.15)]",
    bgGradient: "from-blue-50/50 via-blue-50/30 to-transparent",
    iconBg: "from-blue-500 to-blue-600",
    title: "text-blue-700",
    accent: "bg-blue-500/10",
  },
  yellow: {
    border: "border-yellow-500/30",
    hoverBorder: "md:hover:border-yellow-500",
    hoverShadow: "md:hover:shadow-[0_0_0_2px_rgba(234,179,8,0.3),0_4px_12px_rgba(234,179,8,0.15)]",
    bgGradient: "from-yellow-50/50 via-yellow-50/30 to-transparent",
    iconBg: "from-yellow-500 to-yellow-600",
    title: "text-yellow-700",
    accent: "bg-yellow-500/10",
  },
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon
  const colors = colorMap[service.color] || colorMap.purple
  
  return (
    <Card className={cn(
      "h-full border-2 bg-card/50 md:backdrop-blur-sm",
      "group relative overflow-hidden",
      colors.border,
      colors.hoverBorder,
      "transition-[border-color,box-shadow] duration-300 ease-out",
      "shadow-premium",
      colors.hoverShadow
    )}>
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br md:group-hover:will-change-opacity",
        colors.bgGradient,
        "opacity-50 md:group-hover:opacity-70 transition-opacity duration-300"
      )} />
      
      <CardContent className="p-6 md:p-8 relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full md:group-hover:will-change-opacity -z-10",
            `bg-gradient-to-br ${colors.iconBg} blur-xl`,
            "opacity-0 md:group-hover:opacity-30 transition-opacity duration-300"
          )} />
          
          <div className={cn(
            "flex items-center justify-center w-16 h-16 rounded-2xl md:group-hover:will-change-transform relative z-10",
            `bg-gradient-to-br ${colors.iconBg}`,
            "shadow-lg transition-[transform,box-shadow] duration-300",
            "md:group-hover:scale-110 md:group-hover:shadow-xl"
          )}>
            <Icon className="h-8 w-8 text-white transition-transform duration-300 md:group-hover:scale-110" />
          </div>
        </div>
        
        <h3 className={cn("text-xl md:text-2xl font-black mb-3", colors.title)}>
          {service.title}
        </h3>
        
        <div className={cn("p-4 rounded-xl w-full", colors.accent)}>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente helper para texto con colores por letra (solo usado en Services)
function ColoredText({ text }: { text: string }) {
  const colors = ["#a855f7", "#ec4899", "#3b82f6", "#eab308"];
  
  return (
    <span className="block">
      {text.split("").map((letter, index) => {
        const colorIndex = index % colors.length;
        return (
          <span
            key={index}
            style={{
              background: `linear-gradient(to right, ${colors[colorIndex]}, ${colors[colorIndex]})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        );
      })}
    </span>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      <SectionBackground variant="gradient" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={{ icon: Sparkles, text: "Lo Que Ofrecemos" }}
          title="Soluciones"
          subtitle={<ColoredText text="Premium" />}
          description="Productos de pintura de la más alta calidad adaptados a tus necesidades, con atención personalizada y asesoría experta"
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
