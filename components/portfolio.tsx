"use client"

import { Card } from "@/components/ui/card"
import { CirclePattern } from "@/components/ui/circle-pattern"
import { useInView } from "@/lib/useInView"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Sala Moderna",
    category: "Interior Residencial",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&q=80",
    featured: true,
  },
  {
    title: "Renovación de Oficina",
    category: "Interior Comercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
    featured: false,
  },
  {
    title: "Exterior Casa Victoriana",
    category: "Exterior Residencial",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop&q=80",
    featured: true,
  },
  {
    title: "Espacio Comercial",
    category: "Interior Comercial",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop&q=80",
    featured: false,
  },
  {
    title: "Renovación de Cocina",
    category: "Interior Residencial",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=80",
    featured: false,
  },
  {
    title: "Interior de Restaurante",
    category: "Interior Comercial",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&q=80",
    featured: true,
  },
]

function PortfolioItem({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <div className={cn(
      "group",
      project.featured && "md:col-span-2"
    )}>
      <Card
        className={cn(
          "relative overflow-hidden border-2 border-border/50 bg-card group cursor-pointer",
          "transition-all duration-500 ease-out",
          "hover:border-secondary hover:shadow-premium-lg",
          "shadow-premium"
        )}
      >
        <div className={cn(
          "relative overflow-hidden",
          project.featured ? "aspect-[21/9]" : "aspect-[4/3]"
        )}>
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay oscuro sutil en hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
          
          {/* Borde brillante en hover */}
          <div className="absolute inset-0 border-4 border-secondary/0 group-hover:border-secondary/30 transition-all duration-500 rounded-sm" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-end p-6 md:p-8 z-10">
            <div className="w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 drop-shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {project.title}
              </h3>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export function Portfolio() {
  const { ref: sectionRef, isInView: sectionInView } = useInView<HTMLDivElement>({ 
    threshold: 0.1, 
    rootMargin: "-50px",
    triggerOnce: true 
  })

  return (
    <section id="portfolio" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
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

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={cn(
          "text-center mb-16 md:mb-20 transition-opacity duration-300",
          sectionInView ? "opacity-100" : "opacity-0"
        )}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <span className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-wider">
              Portafolio
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 leading-tight">
            <span className="block">Nuestro</span>
            <span className="block gradient-text">Trabajo</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Explora nuestra galería de proyectos completados y descubre la excelencia 
            que definimos en cada espacio transformado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <PortfolioItem key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
