"use client"

import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionBackground } from "@/components/ui/section-background"
import { cn } from "@/lib/utils"
import Image from "next/image"

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

function PortfolioItem({ project, isFirst }: { project: typeof projects[0]; isFirst?: boolean }) {
  return (
    <div className={cn("group", project.featured && "md:col-span-2")}>
      <Card className="relative overflow-hidden border-2 border-border/50 bg-card group cursor-pointer transition-all duration-300 md:hover:border-secondary md:hover:shadow-premium-lg shadow-premium">
        <div className={cn("relative overflow-hidden", project.featured ? "aspect-[21/9]" : "aspect-[4/3]")}>
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 md:group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={isFirst ? "eager" : "lazy"}
            priority={isFirst}
            quality={75}
          />
          <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/20 transition-all duration-300" />
          <div className="absolute inset-0 border-4 border-secondary/0 md:group-hover:border-secondary/30 transition-all duration-300 rounded-sm" />
          <div className="absolute inset-0 flex items-end p-6 md:p-8 z-10">
            <div className="w-full transform translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 drop-shadow-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
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
  return (
    <section id="portfolio" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      <SectionBackground variant="primary" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={{ text: "Portafolio" }}
          title="Nuestro"
          subtitle="Trabajo"
          description="Explora nuestra galería de proyectos completados y descubre la excelencia que definimos en cada espacio transformado"
          className="text-primary-foreground [&_p]:text-primary-foreground/80"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <PortfolioItem key={project.title} project={project} isFirst={index === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
