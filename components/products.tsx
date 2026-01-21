"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionBackground } from "@/components/ui/section-background"
import { cn } from "@/lib/utils"
import { Palette, ChevronDown } from "lucide-react"
import Image from "next/image"
import { blurDataURL } from "@/lib/image-utils"
import { useState, useMemo, useCallback, memo } from "react"
import { products, type Product } from "@/lib/data/products"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/lib/useIsMobile"

const ProductCard = memo(function ProductCard({ product, priority = false, isMobile = false }: { product: Product; priority?: boolean; isMobile?: boolean }) {
  const Icon = product.icon

  const handleCardClick = useCallback(() => {
    const message = `Hola, necesito ${product.name}`
    const whatsappUrl = `https://wa.me/573223716811?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }, [product.name])

  return (
    <Card
      onClick={handleCardClick}
      className={cn(
        "h-full border-2 bg-white/98 backdrop-blur-sm",
        "group relative overflow-hidden flex flex-col",
        "transition-all duration-200 md:duration-500 ease-out",
        "hover:border-secondary/60 hover:shadow-premium-lg",
        "md:hover:-translate-y-1",
        "cursor-pointer"
      )}
    >
      {/* Gradient overlay on hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-200 md:duration-500",
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
              "shadow-xl transition-all duration-200 md:duration-500",
              "md:group-hover:scale-110 md:group-hover:rotate-3",
              product.color
            )}>
              <Icon className="h-7 w-7 text-white drop-shadow-lg" />
            </div>
          </div>

          {/* Product Image - Centered */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className={cn(
              "relative transition-transform duration-200 md:duration-500 md:group-hover:scale-110",
              // Tamaño mayor para productos específicos
              (product.name === "Impermeabilizante" ||
                product.name === "Estuco Plástico Acrílico" ||
                product.name === "Esmalte Tipo 1" ||
                product.name === "Esmalte a base agua" ||
                product.name === "Anticorrosivo")
                ? "w-40 h-40 md:w-44 md:h-44"
                : "w-32 h-32 md:w-36 md:h-36"
            )}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes={isMobile 
                  ? "(max-width: 768px) 100vw, 33vw"
                  : (product.name === "Impermeabilizante" ||
                    product.name === "Estuco Plástico Acrílico" ||
                    product.name === "Esmalte Tipo 1" ||
                    product.name === "Esmalte a base agua" ||
                    product.name === "Anticorrosivo")
                    ? "176px" : "144px"}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                placeholder={isMobile && !priority ? "empty" : "blur"}
                blurDataURL={isMobile ? undefined : blurDataURL.product}
                quality={priority ? 90 : isMobile ? 80 : 85}
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Product Name */}
          <h3 className="text-xl md:text-2xl font-black text-foreground mb-2 leading-tight transition-colors duration-200 md:duration-300 md:group-hover:text-secondary">
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

          {/* Presentaciones - Highlighted */}
          {product.presentations && product.presentations.length > 0 && (
            <div className="mt-auto pt-4 border-t border-border/50">
              <div className="mb-3">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">Presentaciones Disponibles</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {product.presentations.map((presentation, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center justify-center py-2 px-2 rounded-lg",
                      "bg-gradient-to-r from-secondary/5 to-secondary/10",
                      "border border-secondary/20",
                      "transition-all duration-200 md:duration-300",
                      "md:group-hover:border-secondary/40 md:group-hover:from-secondary/10 md:group-hover:to-secondary/15"
                    )}
                  >
                    <span className="text-xs font-bold text-foreground text-center line-clamp-1">{presentation.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </CardContent>
    </Card>
  )
})

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

// Componente simplificado para grid de productos
function ProductGrid({ products, isMobile }: { products: Product[]; isMobile: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.name} product={product} priority={index < 6} isMobile={isMobile} />
      ))}
    </div>
  )
}

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")
  const [visibleCount, setVisibleCount] = useState(6)
  const isMobile = useIsMobile()

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

  const visibleProducts = useMemo(() =>
    filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  )

  const hasMore = visibleCount < filteredProducts.length

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setVisibleCount(6) // Resetear paginación al cambiar categoría
  }

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
          onCategoryChange={handleCategoryChange}
        />

        <ProductGrid products={visibleProducts} isMobile={isMobile} />

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Button
              onClick={() => setVisibleCount(prev => prev + 6)}
              variant="outline"
              size="lg"
              className="group border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              Ver más productos
              <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
