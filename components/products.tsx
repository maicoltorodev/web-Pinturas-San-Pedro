"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionBackground } from "@/components/ui/section-background"
import { cn } from "@/lib/utils"
import { 
  Paintbrush, 
  Palette, 
  Droplet, 
  Brush, 
  Shield, 
  Sparkles, 
  Car, 
  Layers, 
  Wrench,
  LucideIcon
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

// Types
export interface ProductPresentation {
  size: string
  price: string | string[]
}

export interface Product {
  name: string
  category: string
  description: string
  features: string[]
  icon: LucideIcon
  color: string
  image: string
  presentations?: ProductPresentation[]
  certifications?: string[]
  uses?: string[]
  benefits?: string[]
  application?: string
  colors?: string[]
}

const products: Product[] = [
  // VINILOS
  {
    name: "Vinilo Acrílico – Tipo 1 (Interior)",
    category: "Vinilos",
    description: "Vinilo acrílico de acabado mate lavable, ideal para interiores. Excelente desempeño y cubrimiento, bajo aroma y buena nivelación.",
    features: ["Acabado mate lavable", "Excelente cubrimiento", "Bajo aroma", "Buena nivelación"],
    icon: Paintbrush,
    color: "from-green-500 to-green-600",
    image: "/productos/vinilo-acrilico.png",
    presentations: [
      { size: "Cuñete", price: "$180.000 – $215.000" },
      { size: "Medio", price: "$96.000 – $110.000" },
      { size: "Galón", price: "$48.000 – $55.000" }
    ],
    certifications: ["NTC 1335 (algunas referencias)"],
    colors: ["Blanco", "Almendra", "Rojo"]
  },
  {
    name: "Vinilo – Tipo 2 (Interior)",
    category: "Vinilos",
    description: "Vinilo de acabado mate, ideal para interiores. Buen cubrimiento y rendimiento, bajo aroma.",
    features: ["Acabado mate", "Buen cubrimiento", "Bajo aroma", "Opción semilavable"],
    icon: Paintbrush,
    color: "from-teal-500 to-teal-600",
    image: "/productos/vinilo-semilavable.png",
    presentations: [
      { size: "Cuñete", price: ["$160.000", "$115.000"] },
      { size: "Medio", price: ["$88.000", "$65.000"] },
      { size: "Galón", price: ["$40.000", "$33.000"] }
    ],
    certifications: ["NTC 1335 (algunas referencias)"]
  },
  {
    name: "Vinilo Tipo 1 – Fachadas",
    category: "Vinilos",
    description: "Pintura tipo 1 diluible en agua, acabado semimate, hidrofugable y de alta resistencia. Especial para fachadas con altas exigencias de impermeabilización y lavabilidad.",
    features: ["Acabado semimate", "Hidrofugable", "Alta resistencia", "Especial para fachadas"],
    icon: Paintbrush,
    color: "from-purple-500 to-purple-600",
    image: "/productos/vinilo-hidrofugado.png",
    presentations: [
      { size: "Cuñete", price: "$300.000" },
      { size: "Medio", price: "$160.000" },
      { size: "Galón", price: "$70.000" }
    ]
  },
  {
    name: "Vinilo Tipo 3",
    category: "Vinilos",
    description: "Pintura económica de buena calidad para interiores. Ideal para proyectos con presupuesto ajustado sin comprometer la calidad.",
    features: ["Económica", "Buena calidad", "Fácil aplicación"],
    icon: Brush,
    color: "from-gray-500 to-gray-600",
    image: "/productos/vinilo-tipo-3.png"
  },
  
  // ANTICORROSIVO
  {
    name: "Anticorrosivo",
    category: "Anticorrosivo",
    description: "Producto diseñado para máxima protección contra la oxidación y el desgaste.",
    features: ["Protección contra oxidación", "Mejora adhesión del esmalte", "Secado rápido", "Alta resistencia"],
    icon: Shield,
    color: "from-orange-500 to-orange-600",
    image: "/productos/impermeabilizante.png", // Placeholder
    uses: [
      "Primera mano para superficies metálicas en interiores y exteriores",
      "Ventanas, rejas, puentes, barandas",
      "Estructuras metálicas con exposición ambiental moderada"
    ],
    benefits: [
      "Previene la formación de óxido",
      "Mejora la adhesión del esmalte",
      "Fácil aplicación y secado rápido",
      "Alta resistencia y durabilidad"
    ],
    application: "Listo para usar. Aplicable con rodillo o brocha. Se disuelve con thinner o varsol."
  },
  
  // ESMALTES
  {
    name: "Esmalte Especial",
    category: "Esmaltes",
    description: "Protección y decoración de superficies de metal y madera.",
    features: ["Protección superior", "Decoración", "Durabilidad"],
    icon: Sparkles,
    color: "from-yellow-500 to-yellow-600",
    image: "/productos/vinilo-tipo-1.png", // Placeholder
    uses: [
      "Rejas, puertas, ventanas",
      "Marcos, persianas",
      "Tuberías, zócalos"
    ],
    presentations: [
      { size: "Cuñete", price: "Consultar" },
      { size: "Galón", price: "Consultar" },
      { size: "1/4", price: "Consultar" },
      { size: "1/8", price: "Consultar" }
    ]
  },
  {
    name: "Esmalte Premium",
    category: "Esmaltes",
    description: "Protección superior para superficies de metal y madera.",
    features: ["Protección superior", "Alta calidad", "Excelente acabado"],
    icon: Sparkles,
    color: "from-amber-500 to-amber-600",
    image: "/productos/vinilo-tipo-1.png", // Placeholder
    uses: [
      "Rejas, puertas, ventanas",
      "Marcos, persianas",
      "Tuberías, zócalos"
    ],
    presentations: [
      { size: "Cuñete", price: "Consultar" },
      { size: "Galón", price: "Consultar" },
      { size: "1/4", price: "Consultar" },
      { size: "1/8", price: "Consultar" }
    ]
  },
  {
    name: "Esmalte Tipo 1",
    category: "Esmaltes",
    description: "Pintar y proteger superficies de metal y madera.",
    features: ["Protección", "Decoración", "Versatilidad"],
    icon: Sparkles,
    color: "from-yellow-400 to-yellow-500",
    image: "/productos/vinilo-tipo-1.png", // Placeholder
    uses: [
      "Rejas, puertas, ventanas",
      "Marcos, persianas",
      "Tuberías, zócalos"
    ],
    presentations: [
      { size: "Cuñete", price: "Consultar" },
      { size: "Medio", price: "Consultar" },
      { size: "1/4", price: "Consultar" }
    ]
  },
  
  // TRÁFICO PESADO
  {
    name: "Tráfico Pesado",
    category: "Tráfico Pesado",
    description: "Pintura de alto desempeño para señalización y demarcación de pavimentos.",
    features: ["Alta resistencia al desgaste", "Secado rápido", "Excelente durabilidad"],
    icon: Car,
    color: "from-red-500 to-red-600",
    image: "/productos/impermeabilizante.png", // Placeholder
    uses: [
      "Estacionamientos",
      "Carreteras",
      "Zonas industriales"
    ],
    presentations: [
      { size: "Cuñete", price: "Consultar" },
      { size: "Galón", price: "Consultar" },
      { size: "Medio Cuñete", price: "Consultar" }
    ]
  },
  
  // ESTUCOS Y REVESTIMIENTOS
  {
    name: "Estuco Plástico Acrílico",
    category: "Estucos",
    description: "Producto de acabado liso para paredes.",
    features: ["Acabado liso", "Alta adherencia", "Fácil aplicación"],
    icon: Layers,
    color: "from-indigo-500 to-indigo-600",
    image: "/productos/vinilo-tipo-1.png", // Placeholder
    uses: [
      "Paredes interiores",
      "Superficies de madera en interiores",
      "Aplicación sobre pañetes antes de vinilo o esmalte"
    ]
  },
  {
    name: "Graniplas",
    category: "Estucos",
    description: "Revestimiento para acabados texturizados decorativos.",
    features: ["Acabado texturizado", "Decorativo", "Resistente"],
    icon: Layers,
    color: "from-blue-500 to-blue-600",
    image: "/productos/vinilo-tipo-1.png", // Placeholder
    uses: [
      "Interiores y exteriores",
      "Acabados modernos y resistentes"
    ]
  },
  {
    name: "Carraplast",
    category: "Estucos",
    description: "Revestimiento decorativo de alta adherencia y flexibilidad.",
    features: ["Alta adherencia", "Flexibilidad", "Decorativo"],
    icon: Layers,
    color: "from-cyan-500 to-cyan-600",
    image: "/productos/vinilo-tipo-1.png", // Placeholder
    uses: [
      "Protección y embellecimiento de superficies"
    ]
  },
  {
    name: "Pasta Acrílica",
    category: "Estucos",
    description: "Producto para nivelar y preparar superficies antes de pintar.",
    features: ["Nivelación", "Preparación de superficies", "Acabado uniforme"],
    icon: Layers,
    color: "from-slate-500 to-slate-600",
    image: "/productos/vinilo-tipo-1.png", // Placeholder
    benefits: [
      "Garantiza un acabado uniforme y profesional",
      "Mejora la apariencia final de la pintura"
    ]
  },
  
  // IMPERMEABILIZANTE
  {
    name: "Impermeabilizante",
    category: "Impermeabilizante",
    description: "Impermeabilizante para fachadas y techos, protección contra filtraciones y humedad.",
    features: ["Protección contra filtraciones", "Alta durabilidad", "Resistente a humedad"],
    icon: Droplet,
    color: "from-blue-500 to-blue-600",
    image: "/productos/impermeabilizante.png",
    presentations: [
      { size: "Cuñete", price: "$280.000" },
      { size: "Medio", price: "$150.000" },
      { size: "Galón", price: "$65.000" }
    ],
    benefits: [
      "Alta durabilidad",
      "Protección frente al clima y la humedad"
    ]
  },
  
  // HERRAMIENTAS
  {
    name: "Rodillos",
    category: "Herramientas",
    description: "Diseño ergonómico para cubrimiento uniforme en paredes y techos.",
    features: ["Diseño ergonómico", "Cubrimiento uniforme"],
    icon: Wrench,
    color: "from-gray-600 to-gray-700",
    image: "/productos/vinilo-tipo-1.png", // Placeholder
    uses: [
      "Aplicación en paredes y techos"
    ]
  },
  {
    name: "Brochas",
    category: "Herramientas",
    description: "Precisión y control para detalles y rincones.",
    features: ["Precisión", "Control", "Ideal para detalles"],
    icon: Wrench,
    color: "from-gray-600 to-gray-700",
    image: "/productos/vinilo-tipo-1.png", // Placeholder
    uses: [
      "Detalles y rincones"
    ]
  },
  {
    name: "Disolventes",
    category: "Herramientas",
    description: "Limpieza de herramientas y preparación de superficies para un acabado óptimo.",
    features: ["Limpieza de herramientas", "Preparación de superficies"],
    icon: Wrench,
    color: "from-gray-600 to-gray-700",
    image: "/productos/vinilo-tipo-1.png", // Placeholder
    uses: [
      "Limpieza de herramientas",
      "Preparación de superficies"
    ]
  }
]

function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon

  const formatPrice = (price: string | string[]): string => {
    if (Array.isArray(price)) {
      return price.join(" / ")
    }
    return price
  }

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
            <div 
              className="relative w-40 h-40 group-hover:scale-105 transition-transform duration-300"
              style={{
                minWidth: '160px',
                minHeight: '160px',
                aspectRatio: '1 / 1'
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="160px"
                loading="lazy"
                quality={85}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
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

          {/* Certificaciones */}
          {product.certifications && product.certifications.length > 0 && (
            <div className="mb-5">
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, idx) => (
                  <div key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-xs font-bold text-blue-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Colores disponibles */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-5">
              <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-2 flex items-center gap-2">
                <div className="w-4 h-0.5 bg-secondary rounded-full" />
                <span>Colores</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-secondary/10 border border-secondary/30 text-xs font-semibold text-foreground">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Características */}
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

          {/* Presentaciones y Precios */}
          {product.presentations && product.presentations.length > 0 && (
            <div className="pt-5 border-t-2 border-border md:group-hover:border-secondary transition-colors duration-300 mb-5">
              <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-6 h-1 bg-secondary rounded-full" />
                <span>Presentaciones y Precios</span>
              </div>
              <div className="space-y-2">
                {product.presentations.map((presentation, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50 border border-gray-200">
                    <span className="text-xs font-bold text-foreground">{presentation.size}:</span>
                    <span className="text-xs font-black text-secondary">{formatPrice(presentation.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usos */}
          {product.uses && product.uses.length > 0 && (
            <div className="pt-5 border-t-2 border-border md:group-hover:border-secondary transition-colors duration-300 mb-5">
              <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-6 h-1 bg-secondary rounded-full" />
                <span>Usos</span>
              </div>
              <ul className="space-y-2">
                {product.uses.map((use, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground">
                    <div className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-secondary shadow-sm" />
                    <span className="font-semibold leading-relaxed">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Beneficios */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="pt-5 border-t-2 border-border md:group-hover:border-secondary transition-colors duration-300 mb-5">
              <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-6 h-1 bg-secondary rounded-full" />
                <span>Beneficios</span>
              </div>
              <ul className="space-y-2">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground">
                    <div className="flex-shrink-0 mt-1 w-2 h-2 rounded-full bg-secondary shadow-sm" />
                    <span className="font-semibold leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Aplicación */}
          {product.application && (
            <div className="pt-5 border-t-2 border-border md:group-hover:border-secondary transition-colors duration-300 mb-5">
              <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="w-6 h-1 bg-secondary rounded-full" />
                <span>Aplicación</span>
              </div>
              <p className="text-xs text-foreground font-semibold leading-relaxed">{product.application}</p>
            </div>
          )}

          {/* Footer */}
          <div className="pt-5 border-t border-border/50 mt-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/20 border-2 border-secondary/40 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">Premium</span>
            </div>
          </div>
        </CardContent>
      </Card>
  )
}

function FilterBar({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: { 
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void 
}) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-6 py-3 rounded-full border-2 font-bold text-sm uppercase tracking-wider transition-all duration-300",
            selectedCategory === category
              ? "bg-secondary border-secondary text-secondary-foreground shadow-lg scale-105"
              : "bg-white/80 border-primary-foreground/30 text-foreground hover:border-secondary hover:bg-secondary/10"
          )}
          aria-label={`Filtrar por ${category}`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")
  
  // Obtener todas las categorías únicas
  const categories = ["Todos", ...Array.from(new Set(products.map(p => p.category)))]
  
  // Filtrar productos según la categoría seleccionada
  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(product => product.category === selectedCategory)

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

        <FilterBar 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
