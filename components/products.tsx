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
import { useState, useMemo, useCallback, useEffect, useRef } from "react"

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
    image: "/productos/vinilo-tipo-3.png",
    presentations: [
      { size: "Cuñete", price: "Consultar" },
      { size: "Medio", price: "Consultar" },
      { size: "Galón", price: "Consultar" }
    ]
  },
  
  // ANTICORROSIVO
  {
    name: "Anticorrosivo",
    category: "Anticorrosivo",
    description: "Producto diseñado para máxima protección contra la oxidación y el desgaste.",
    features: ["Protección contra oxidación", "Mejora adhesión del esmalte", "Secado rápido", "Alta resistencia"],
    icon: Shield,
    color: "from-orange-500 to-orange-600",
    image: "/productos/anticorrosivo.png",
    presentations: [
      { size: "Cuñete", price: "Consultar" },
      { size: "Medio", price: "Consultar" },
      { size: "Galón", price: "Consultar" }
    ],
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
    color: "from-blue-500 to-blue-600",
    image: "/productos/esmalte-especial.png",
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
    image: "/productos/esmalte-premium.png",
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
    color: "from-blue-400 to-blue-500",
    image: "/productos/esmalte-tipo-1.png",
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
    image: "/productos/trafico-pesado.png",
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
    image: "/productos/estuco-plastico-acrilico.png",
    presentations: [
      { size: "Cuñete", price: "Consultar" },
      { size: "Medio", price: "Consultar" },
      { size: "Galón", price: "Consultar" }
    ],
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
    image: "/productos/graniplas.png",
    presentations: [
      { size: "Cuñete", price: "Consultar" },
      { size: "Medio", price: "Consultar" },
      { size: "Galón", price: "Consultar" }
    ],
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
    image: "/productos/garraplast.png",
    presentations: [
      { size: "Cuñete", price: "Consultar" },
      { size: "Medio", price: "Consultar" },
      { size: "Galón", price: "Consultar" }
    ],
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
    image: "/productos/pasta acrilica.png",
    presentations: [
      { size: "Cuñete", price: "Consultar" },
      { size: "Medio", price: "Consultar" },
      { size: "Galón", price: "Consultar" }
    ],
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
    image: "/productos/rodillo.png",
    presentations: [
      { size: "Variedad de tamaños", price: "Consultar" }
    ],
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
    image: "/productos/brocha.png",
    presentations: [
      { size: "Variedad de tamaños", price: "Consultar" }
    ],
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
    image: "/productos/disolvente.png",
    presentations: [
      { size: "Galón", price: "Consultar" },
      { size: "Medio", price: "Consultar" }
    ],
    uses: [
      "Limpieza de herramientas",
      "Preparación de superficies"
    ]
  }
]

function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon
  const [isExpanded, setIsExpanded] = useState(false)

  const formatPrice = useCallback((price: string | string[]): string => {
    if (Array.isArray(price)) {
      return price.join(" / ")
    }
    return price
  }, [])

  const hasAdditionalInfo = useMemo(() => 
    !!(product.uses || product.benefits || product.application),
    [product.uses, product.benefits, product.application]
  )

  return (
    <Card className={cn(
      "h-full border-2 bg-white/98 backdrop-blur-sm",
      "group relative overflow-hidden flex flex-col",
      "transition-all duration-500 ease-out",
      "hover:border-secondary/60 hover:shadow-premium-lg",
      "md:hover:-translate-y-1"
    )}>
      {/* Gradient overlay on hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
        "md:group-hover:opacity-5 pointer-events-none z-0",
        product.color
      )} />
      
      <CardContent className="p-0 flex-1 flex flex-col relative z-10">
        {/* Header Section - Image + Category Badge */}
        <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-50 via-gray-50/50 to-white">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20 md:opacity-30">
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-15 md:opacity-20 transition-opacity duration-500",
              "md:group-hover:opacity-25",
              product.color
            )} />
          </div>
          
          {/* Category Badge - Top Left */}
          <div className="absolute top-4 left-4 z-20">
            <span className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg",
              "bg-white/95 backdrop-blur-sm border-2 border-secondary/20",
              "text-secondary-foreground"
            )}>
              {product.category}
            </span>
          </div>

          {/* Icon - Top Right */}
          <div className="absolute top-4 right-4 z-20">
            <div className={cn(
              "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center",
              "shadow-xl transition-all duration-500",
              "md:group-hover:scale-110 md:group-hover:rotate-3",
              product.color
            )}>
              <Icon className="h-7 w-7 text-white drop-shadow-lg" />
            </div>
          </div>

          {/* Product Image - Centered */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative w-32 h-32 md:w-36 md:h-36 transition-transform duration-500 md:group-hover:scale-110">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="144px"
                loading="lazy"
                quality={90}
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Product Name */}
          <h3 className="text-xl md:text-2xl font-black text-foreground mb-2 leading-tight transition-colors duration-300 md:group-hover:text-secondary">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-foreground/70 leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Certifications & Colors - Compact */}
          {(product.certifications || product.colors) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.certifications?.map((cert, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50/80 border border-blue-200/60 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">{cert}</span>
                </div>
              ))}
              {product.colors?.map((color, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[10px] font-semibold text-foreground">
                  {color}
                </span>
              ))}
            </div>
          )}

          {/* Key Features - Compact Grid */}
          {product.features.length > 0 && (
            <div className="mb-4">
              <ul className="grid grid-cols-2 gap-2">
                {product.features.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <div className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="text-xs font-medium text-foreground/80 leading-tight line-clamp-2">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Presentaciones y Precios - Highlighted */}
          {product.presentations && product.presentations.length > 0 && (
            <div className="mt-auto pt-4 border-t border-border/50">
              <div className="mb-3">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">Precios</span>
              </div>
              <div className="space-y-2">
                {product.presentations.map((presentation, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "flex items-center justify-between py-2.5 px-4 rounded-lg",
                      "bg-gradient-to-r from-secondary/5 to-secondary/10",
                      "border border-secondary/20",
                      "transition-all duration-300",
                      "md:group-hover:border-secondary/40 md:group-hover:from-secondary/10 md:group-hover:to-secondary/15"
                    )}
                  >
                    <span className="text-sm font-bold text-foreground">{presentation.size}</span>
                    <span className="text-sm font-black text-secondary">{formatPrice(presentation.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info - Expandable */}
          {hasAdditionalInfo && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between text-xs font-bold text-secondary uppercase tracking-wider hover:text-secondary/80 transition-colors"
              >
                <span>Información adicional</span>
                <span className={cn(
                  "transition-transform duration-300",
                  isExpanded && "rotate-180"
                )}>
                  ▼
                </span>
              </button>
              
              {isExpanded && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  {/* Usos */}
                  {product.uses && product.uses.length > 0 && (
                    <div>
                      <div className="text-xs font-bold text-foreground/60 uppercase tracking-wider mb-2">Usos</div>
                      <ul className="space-y-1.5">
                        {product.uses.map((use, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-foreground/70">
                            <span className="text-secondary mt-1">•</span>
                            <span>{use}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Beneficios */}
                  {product.benefits && product.benefits.length > 0 && (
                    <div>
                      <div className="text-xs font-bold text-foreground/60 uppercase tracking-wider mb-2">Beneficios</div>
                      <ul className="space-y-1.5">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-foreground/70">
                            <span className="text-secondary mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Aplicación */}
                  {product.application && (
                    <div>
                      <div className="text-xs font-bold text-foreground/60 uppercase tracking-wider mb-2">Aplicación</div>
                      <p className="text-xs text-foreground/70 leading-relaxed">{product.application}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Premium Badge - Bottom */}
          <div className="mt-4 pt-4 border-t border-border/30">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/10 border border-secondary/20">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">Calidad Premium</span>
            </div>
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
    <div className="flex flex-wrap gap-2.5 md:gap-3 justify-center mb-12 px-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-5 py-2.5 md:px-6 md:py-3 rounded-full border-2 font-bold text-xs md:text-sm uppercase tracking-wider",
            "transition-all duration-300 ease-out",
            "backdrop-blur-sm",
            selectedCategory === category
              ? "bg-secondary border-secondary text-secondary-foreground shadow-lg scale-105 md:scale-110"
              : "bg-white/90 border-primary-foreground/20 text-foreground/80 hover:border-secondary/60 hover:bg-secondary/5 hover:text-foreground hover:scale-105"
          )}
          aria-label={`Filtrar por ${category}`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

// Componente optimizado para grid de productos con animaciones controladas
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCardWrapper key={product.name} product={product} />
      ))}
    </div>
  )
}

// Wrapper que activa animación solo cuando el producto está visible
function ProductCardWrapper({ product }: { product: Product }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card || hasAnimatedRef.current) return

    // Limpiar observer anterior si existe
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true
          setIsVisible(true)
          // Desconectar después de activar para liberar memoria
          if (observerRef.current) {
            observerRef.current.disconnect()
            observerRef.current = null
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px", // Activar un poco antes de que sea completamente visible
      }
    )

    observerRef.current = observer
    observer.observe(card)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      hasAnimatedRef.current = false
    }
  }, [])

  return (
    <div 
      ref={cardRef}
      className={cn(
        "transition-opacity duration-500",
        isVisible ? "opacity-100 animate-fade-in" : "opacity-0"
      )}
    >
      <ProductCard product={product} />
    </div>
  )
}

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")
  
  // Obtener todas las categorías únicas - memoizado
  const categories = useMemo(() => 
    ["Todos", ...Array.from(new Set(products.map(p => p.category)))],
    []
  )
  
  // Filtrar productos según la categoría seleccionada - memoizado
  const filteredProducts = useMemo(() => 
    selectedCategory === "Todos" 
      ? products 
      : products.filter(product => product.category === selectedCategory),
    [selectedCategory]
  )

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

        <ProductGrid products={filteredProducts} />
      </div>
    </section>
  )
}
