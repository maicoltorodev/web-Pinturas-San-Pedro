"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CirclePattern } from "@/components/ui/circle-pattern"
import { useInView } from "@/lib/useInView"
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

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.3, triggerOnce: true })
  const Icon = product.icon

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="h-full border-2 border-primary-foreground/30 bg-white/95 backdrop-blur-sm hover:border-secondary hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-3 group relative overflow-hidden flex flex-col">
        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/0 group-hover:from-secondary/10 group-hover:via-secondary/15 group-hover:to-secondary/10 transition-all duration-500 pointer-events-none z-10" />
        
        <CardContent className="p-6 flex-1 flex flex-col relative z-10">
          {/* Header con categoría */}
          <div className="flex items-start justify-between mb-4">
            <span className="px-4 py-1.5 rounded-full bg-secondary border-2 border-secondary text-xs font-bold text-secondary-foreground uppercase tracking-wider shadow-lg">
              {product.category}
            </span>
            {/* Icono decorativo */}
            <div className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
              product.color
            )}>
              <Icon className="h-6 w-6 text-white drop-shadow-lg" />
            </div>
          </div>

          {/* Imagen del producto - más pequeña y centrada */}
          <div className="relative w-full h-48 mb-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden group-hover:bg-gradient-to-br group-hover:from-gray-100 group-hover:to-gray-200 transition-all duration-500">
            <div className="relative w-40 h-40 group-hover:scale-110 transition-transform duration-500">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

          {/* Características mejoradas */}
          <div className="pt-5 border-t-2 border-border group-hover:border-secondary transition-colors duration-300 mb-5">
            <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
              <div className="w-6 h-1 bg-secondary rounded-full" />
              <span>Características</span>
            </div>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-secondary shadow-sm" />
                  </div>
                  <span className="font-semibold leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Precio y Badge de calidad */}
          <div className="pt-5 border-t border-border/50 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/20 border-2 border-secondary/40 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                Premium
              </span>
            </div>
            {product.price && (
              <div className="text-right">
                <p className="text-xl font-black text-secondary">
                  {product.price}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function Products() {
  const { ref: sectionRef, isInView: sectionInView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="products" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
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
          "text-center mb-16 md:mb-20 transition-all duration-1000",
          sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <Palette className="h-4 w-4 text-secondary" />
            <span className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-wider">
              Productos
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 leading-tight">
            <span className="block">Nuestros</span>
            <span className="block gradient-text">Productos Premium</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Ofrecemos una amplia gama de productos de pintura de la más alta calidad. 
            Desde pinturas para interiores hasta productos especializados para cada necesidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
