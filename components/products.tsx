"use client"

import { useState, useMemo } from "react"
import { Search, X, Package, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { CirclePattern } from "@/components/ui/circle-pattern"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { blurDataURL } from "@/lib/image-utils"
import { products, productCategories } from "@/lib/constants/products"
import { useDebounce } from "@/hooks/useDebounce"
import { useSharedIntersectionObserver } from "@/hooks/useSharedIntersectionObserver"
import type { Product, ProductCategory } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

/**
 * Card de producto optimizada con lazy loading de imagen
 */
function ProductCard({ product }: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [cardRef, isCardVisible] = useSharedIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '100px',
  })

  return (
    <Card
      ref={cardRef}
      className={cn(
        "group bg-card/80 border-2 border-primary-foreground/20 md:hover:border-secondary/50 transition-all duration-200 md:hover:scale-105 md:hover:shadow-lg overflow-hidden h-full flex flex-col",
        !isCardVisible && "opacity-0"
      )}
    >
      <CardContent className="p-0 flex flex-col h-full">
        {/* Imagen del producto - Lazy load */}
        <div className="relative w-full h-48 md:h-56 bg-primary/10 overflow-hidden">
          {isCardVisible && (
            <>
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 animate-pulse" />
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={cn(
                  "object-contain transition-opacity duration-300 p-4",
                  isImageLoaded ? "opacity-100" : "opacity-0"
                )}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL={blurDataURL.small}
                onLoad={() => setIsImageLoaded(true)}
              />
            </>
          )}
        </div>

        {/* Información del producto */}
        <div className="p-5 md:p-6 lg:p-7 flex-1 flex flex-col">
          <h3 className="font-bold text-lg md:text-xl text-foreground mb-3 group-hover:text-secondary transition-colors line-clamp-3">
            {product.name}
          </h3>

          <p className="text-sm md:text-base text-muted-foreground mb-6 line-clamp-5 flex-1">
            {product.description}
          </p>

          {/* Características principales */}
          {product.characteristics && product.characteristics.length > 0 && (
            <div className="mb-6">
              <ul className="space-y-2">
                {product.characteristics.slice(0, 3).map((char, idx) => (
                  <li key={idx} className="text-xs md:text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span className="line-clamp-2">{char}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Presentaciones */}
          {product.presentations && product.presentations.length > 0 && (
            <div className="mt-auto pt-3 border-t border-primary-foreground/10">
              <p className="text-xs text-muted-foreground mb-1">Presentaciones:</p>
              <p className="text-xs md:text-sm font-medium text-foreground">
                {product.presentations.join(', ')}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Debounce búsqueda para mejor rendimiento
  const debouncedSearchQuery = useDebounce(
    searchQuery,
    typeof window !== 'undefined' && window.innerWidth < 768 ? 500 : 300
  )

  // Filtrar productos - memoizado para evitar recálculos
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Filtrar por búsqueda
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.trim().toLowerCase()
      filtered = filtered.filter(product => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.characteristics.some(char => char.toLowerCase().includes(query)) ||
          (product.uses && product.uses.some(use => use.toLowerCase().includes(query)))
        )
      })
    }

    return filtered
  }, [selectedCategory, debouncedSearchQuery])

  // Contar productos por categoría
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length }
    productCategories.forEach(cat => {
      counts[cat.value] = products.filter(p => p.category === cat.value).length
    })
    return counts
  }, [])

  return (
    <section id="productos" className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary md:bg-gradient-to-br md:from-primary md:via-primary/95 md:to-primary/90" />
      <div className="hidden md:block">
        <CirclePattern className="absolute inset-0 opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={{ icon: Package, text: "Productos" }}
          title="Nuestro"
          subtitle="Catálogo de Productos"
          description="Explora nuestra amplia gama de productos de pintura, herramientas y accesorios profesionales. Calidad garantizada para todos tus proyectos."
          className="text-primary-foreground [&_p]:text-primary-foreground/80 mb-8 md:mb-12"
        />

        {/* Filtros y búsqueda */}
        <div className="mb-8 space-y-4">
          {/* Barra de búsqueda */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/40" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-white/95 border-2 border-primary-foreground/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              aria-label="Buscar productos"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Botón de filtros móvil */}
          <div className="md:hidden flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white/95 border-2 border-primary-foreground/20 text-foreground"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
            </Button>
          </div>

          {/* Filtros de categoría */}
          <div
            className={cn(
              "flex flex-wrap justify-center gap-2 md:gap-3 transition-all",
              !showFilters && "hidden md:flex"
            )}
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
                selectedCategory === 'all'
                  ? "bg-secondary text-secondary-foreground shadow-lg scale-105 border-2 border-secondary"
                  : "bg-white/95 text-foreground hover:bg-white hover:scale-105 border-2 border-white/50 shadow-md"
              )}
            >
              Todos ({categoryCounts.all})
            </button>
            {productCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
                  selectedCategory === category.value
                    ? "bg-secondary text-secondary-foreground shadow-lg scale-105 border-2 border-secondary"
                    : "bg-white/95 text-foreground hover:bg-white hover:scale-105 border-2 border-white/50 shadow-md"
                )}
              >
                {category.label} ({categoryCounts[category.value]})
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-center text-primary-foreground/80 text-sm md:text-base">
            {filteredProducts.length === 0 ? (
              <span>No se encontraron productos</span>
            ) : (
              <span>
                Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
              </span>
            )}
          </p>
        </div>

        {/* Grid de productos - Optimizado con lazy loading */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
