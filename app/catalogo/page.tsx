"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { MessageSquare, ChevronRight, ArrowLeft } from "lucide-react"
import { products, productCategories } from "@/lib/constants/products"
import { whatsappUrls } from "@/lib/constants/site"
import { blurDataURL } from "@/lib/image-utils"
import { cn } from "@/lib/utils"
import type { ProductCategory } from "@/lib/types"

const categoryIcons: Record<string, string> = {
  vinilos: "🎨",
  anticorrosivo: "🛡️",
  esmaltes: "✨",
  "trafico-pesado": "🚧",
  estucos: "🏠",
  impermeabilizante: "💧",
  herramientas: "🔧",
  rodillos: "🖌️",
  brochas: "🖍️",
}

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id as ProductCategory)
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    )
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollToCategory = (value: string) => {
    const el = sectionRefs.current[value]
    if (el) {
      const offset = 100
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: "smooth" })
    }
    // scroll nav tab into view
    const navEl = navRef.current?.querySelector(`[data-cat="${value}"]`) as HTMLElement
    navEl?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header fijo */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[oklch(0.32_0.18_252)] border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </a>
          <span className="text-white font-bold tracking-wide text-sm">CATÁLOGO DE PRODUCTOS</span>
          <a
            href={whatsappUrls.quote}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>

        {/* Nav de categorías */}
        <div
          ref={navRef}
          className="flex overflow-x-auto scrollbar-hide border-t border-white/10 bg-[oklch(0.28_0.18_252)]"
          style={{ scrollbarWidth: "none" }}
        >
          {productCategories.map((cat) => (
            <button
              key={cat.value}
              data-cat={cat.value}
              onClick={() => scrollToCategory(cat.value)}
              className={cn(
                "flex-shrink-0 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap",
                activeCategory === cat.value
                  ? "text-[oklch(0.82_0.18_90)] border-b-2 border-[oklch(0.82_0.18_90)]"
                  : "text-white/60 hover:text-white/90 border-b-2 border-transparent"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Hero */}
      <div className="pt-[88px] bg-[oklch(0.32_0.18_252)] pb-12 md:pb-16">
        <div className="container mx-auto px-4 pt-10 md:pt-14 text-center">
          <p className="text-[oklch(0.82_0.18_90)] text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Pinturas San Pedro
          </p>
          <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Catálogo de<br />
            <span className="text-[oklch(0.82_0.18_90)]">Productos</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-md mx-auto">
            Pinturas, esmaltes, herramientas y accesorios profesionales. Calidad certificada para tus proyectos.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {productCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => scrollToCategory(cat.value)}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-[oklch(0.82_0.18_90)] hover:text-[oklch(0.25_0.08_252)] text-white/80 text-xs font-medium transition-all"
              >
                {categoryIcons[cat.value]} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Catálogo por categorías */}
      <div className="pb-20">
        {productCategories.map((cat, catIdx) => {
          const catProducts = products.filter((p) => p.category === cat.value)
          return (
            <section
              key={cat.value}
              id={cat.value}
              ref={(el) => { sectionRefs.current[cat.value] = el }}
            >
              {/* Separador de categoría */}
              <div className={cn(
                "py-8 md:py-10 px-4",
                catIdx % 2 === 0 ? "bg-[oklch(0.32_0.18_252)]" : "bg-[oklch(0.28_0.18_252)]"
              )}>
                <div className="container mx-auto flex items-center gap-4">
                  <span className="text-3xl md:text-4xl">{categoryIcons[cat.value]}</span>
                  <div>
                    <p className="text-[oklch(0.82_0.18_90)] text-[10px] font-bold uppercase tracking-[0.3em]">
                      Categoría
                    </p>
                    <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">
                      {cat.label}
                    </h2>
                  </div>
                  <div className="ml-auto text-white/40 text-sm font-medium">
                    {catProducts.length} producto{catProducts.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {/* Grid de productos */}
              <div className="container mx-auto px-4 py-8 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  {catProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* Footer CTA */}
      <div className="bg-[oklch(0.32_0.18_252)] py-14 px-4 text-center">
        <p className="text-[oklch(0.82_0.18_90)] text-xs font-bold uppercase tracking-[0.3em] mb-3">¿Listo para cotizar?</p>
        <h3 className="text-white text-2xl md:text-3xl font-extrabold mb-2">
          Contáctanos por WhatsApp
        </h3>
        <p className="text-white/60 text-sm mb-6">
          Respuesta inmediata · Asesoría personalizada
        </p>
        <a
          href={whatsappUrls.quote}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-7 py-3.5 rounded-2xl text-base transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
        >
          <MessageSquare className="h-5 w-5" />
          Escribir ahora
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="group flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Imagen */}
      <div className="relative w-full sm:w-44 md:w-48 flex-shrink-0 bg-[oklch(0.97_0.005_252)] aspect-square sm:aspect-auto overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.32_0.18_252)]/10 to-[oklch(0.82_0.18_90)]/10 animate-pulse" />
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={cn(
            "object-contain p-4 transition-all duration-300 group-hover:scale-105",
            loaded ? "opacity-100" : "opacity-0"
          )}
          sizes="(max-width: 640px) 100vw, 192px"
          placeholder="blur"
          blurDataURL={blurDataURL.small}
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        <div className="flex-1">
          <h3 className="font-bold text-base md:text-lg text-[oklch(0.25_0.08_252)] mb-1.5 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Características */}
          {product.characteristics.length > 0 && (
            <ul className="space-y-1 mb-3">
              {product.characteristics.slice(0, 3).map((char, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                  <span className="text-[oklch(0.82_0.18_90)] font-bold mt-0.5">✓</span>
                  <span>{char.replace("✔ ", "").replace("✔", "")}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Presentaciones */}
          {product.presentations && product.presentations.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.presentations.map((p) => (
                <span
                  key={p}
                  className="px-2 py-0.5 bg-[oklch(0.32_0.18_252)]/8 text-[oklch(0.32_0.18_252)] text-[10px] font-semibold rounded-full"
                >
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <a
          href={whatsappUrls.product(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold py-2.5 rounded-xl transition-all mt-auto"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Consultar precio
        </a>
      </div>
    </div>
  )
}
