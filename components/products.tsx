"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionBackground } from "@/components/ui/section-background"
import { cn } from "@/lib/utils"
import { Paintbrush, Palette, Droplet, Brush } from "lucide-react"
import Image from "next/image"

const products = [
  {
    name: "Impermeabilizante",
    category: "Protección",
    description: "Producto especializado para proteger superficies contra la humedad y filtraciones de agua. Ideal para techos, terrazas y áreas expuestas.",
    features: ["Protección contra agua", "Resistente a filtraciones", "Larga duración"],
    icon: Droplet,
    color: "from-blue-500 to-blue-600",
    price: "$280.000",
    image: "/productos/impermeabilizante.png"
  },
  {
    name: "Vinilo Acrílico T1 Superlavable",
    category: "Interior",
    description: "Pintura vinílica de alta calidad con acabado superlavable. Perfecta para interiores que requieren limpieza frecuente. Disponible en blanco y almendra.",
    features: ["Superlavable", "Alta resistencia", "Acabado duradero"],
    icon: Paintbrush,
    color: "from-green-500 to-green-600",
    price: "$185.000 - $210.000",
    image: "/productos/vinilo-acrilico.png"
  },
  {
    name: "Vinilo Coraza Plástica Hidrofugado Certificado",
    category: "Exterior",
    description: "Pintura de máxima resistencia para exteriores con certificación de calidad. Protección superior contra la intemperie y humedad.",
    features: ["Certificado", "Hidrofugado", "Máxima resistencia"],
    icon: Brush,
    color: "from-purple-500 to-purple-600",
    price: "$310.000",
    image: "/productos/vinilo-hidrofugado.png"
  },
  {
    name: "Vinilo T2 Profesional Lavable",
    category: "Interior",
    description: "Pintura profesional de calidad superior para interiores. Excelente cobertura y acabado lavable para áreas de alto tráfico.",
    features: ["Profesional", "Lavable", "Excelente cobertura"],
    icon: Paintbrush,
    color: "from-amber-500 to-amber-600",
    price: "$165.000",
    image: "/productos/vinilo-lavable.png"
  },
  {
    name: "Vinilo T2 Semilavable",
    category: "Interior",
    description: "Pintura económica y de buena calidad para interiores. Acabado semilavable ideal para áreas de uso moderado.",
    features: ["Semilavable", "Buena calidad", "Precio accesible"],
    icon: Palette,
    color: "from-teal-500 to-teal-600",
    price: "$120.000",
    image: "/productos/vinilo-semilavable.png"
  },
  {
    name: "Vinilo Tipo 1 Certificado 400 Ciclos",
    category: "Interior",
    description: "Pintura certificada con resistencia a 400 ciclos de lavado. Máxima calidad para interiores que requieren limpieza constante.",
    features: ["Certificado", "400 ciclos", "Máxima resistencia"],
    icon: Paintbrush,
    color: "from-indigo-500 to-indigo-600",
    price: "$220.000",
    image: "/productos/vinilo-tipo-1.png"
  },
  {
    name: "Vinilo Tipo 3",
    category: "Interior",
    description: "Pintura económica de buena calidad para interiores. Ideal para proyectos con presupuesto ajustado sin comprometer la calidad.",
    features: ["Económica", "Buena calidad", "Fácil aplicación"],
    icon: Brush,
    color: "from-gray-500 to-gray-600",
    price: "$85.000",
    image: "/productos/vinilo-tipo-3.png"
  },
]

function ProductCard({ product }: { product: typeof products[0] }) {
  const Icon = product.icon

  return (
    <Card className="h-full border-2 border-primary-foreground/30 bg-white/95 md:backdrop-blur-sm md:hover:border-secondary md:hover:shadow-premium-lg transition-all duration-300 md:hover:-translate-y-2 group relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/0 md:group-hover:from-secondary/10 md:group-hover:via-secondary/10 md:group-hover:to-secondary/10 transition-all duration-300 pointer-events-none z-10" />
        
        <CardContent className="p-6 flex-1 flex flex-col relative z-10">
          {/* Header con categoría */}
          <div className="flex items-start justify-between mb-4">
            <span className="px-4 py-1.5 rounded-full bg-secondary border-2 border-secondary text-xs font-bold text-secondary-foreground uppercase tracking-wider shadow-lg">
              {product.category}
            </span>
            {/* Icono decorativo */}
            <div className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300",
              product.color
            )}>
              <Icon className="h-6 w-6 text-white drop-shadow-lg" />
            </div>
          </div>

          {/* Imagen del producto - más pequeña y centrada */}
          <div className="relative w-full h-48 mb-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden group-hover:bg-gradient-to-br group-hover:from-gray-100 group-hover:to-gray-200 transition-all duration-300">
            <div className="relative w-40 h-40 group-hover:scale-105 transition-transform duration-300">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                quality={85}
              />
            </div>
          </div>
          {/* Nombre del producto */}
          <h3 className="text-xl font-black text-foreground mb-3 group-hover:text-secondary transition-colors duration-300 leading-tight">
            {product.name}
          </h3>

          {/* Descripción */}
          <p className="text-sm text-foreground/80 leading-relaxed mb-5 font-medium flex-1">
            {product.description}
          </p>

          <div className="pt-5 border-t-2 border-border md:group-hover:border-secondary transition-colors duration-300 mb-5">
            <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
              <div className="w-6 h-1 bg-secondary rounded-full" />
              <span>Características</span>
            </div>
            <ul className="space-y-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-xs text-foreground">
                  <div className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-secondary shadow-sm" />
                  <span className="font-semibold leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-5 border-t border-border/50 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/20 border-2 border-secondary/40 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">Premium</span>
            </div>
            {product.price && (
              <p className="text-xl font-black text-secondary">{product.price}</p>
            )}
          </div>
        </CardContent>
      </Card>
  )
}

export function Products() {
  return (
    <section id="products" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      <SectionBackground variant="primary" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={{ icon: Palette, text: "Productos" }}
          title="Nuestros"
          subtitle="Productos"
          description="Ofrecemos una amplia gama de productos de pintura de la más alta calidad. Desde pinturas para interiores hasta productos especializados para cada necesidad."
          className="text-primary-foreground [&_p]:text-primary-foreground/80"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
