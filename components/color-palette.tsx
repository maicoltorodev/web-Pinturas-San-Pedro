"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CirclePattern } from "@/components/ui/circle-pattern"
import { useInView } from "@/lib/useInView"
import { cn } from "@/lib/utils"
import { Palette, Search, Copy, Check, X } from "lucide-react"
import { Input } from "@/components/ui/input"

const colorCategories = [
  {
    name: "Blancos y Neutros",
    colors: [
      { name: "Blanco Puro", hex: "#FFFFFF", rgb: "255, 255, 255" },
      { name: "Blanco Hueso", hex: "#F0E8D7", rgb: "240, 232, 215" },
      { name: "Blanco Almendra", hex: "#F9F5EA", rgb: "249, 245, 234" },
      { name: "Blanco Luna", hex: "#FDF6F7", rgb: "253, 246, 247" },
      { name: "Blanco Arena", hex: "#FCFCFC", rgb: "252, 252, 252" },
      { name: "Blanco Durazno", hex: "#FCEFF0", rgb: "252, 239, 240" },
      { name: "Blanco Lila", hex: "#FDF8FA", rgb: "253, 248, 250" },
    ]
  },
  {
    name: "Azules",
    colors: [
      { name: "Azul Mediterráneo", hex: "#304D9A", rgb: "48, 77, 154" },
      { name: "Azul Profundo", hex: "#3F68B6", rgb: "63, 104, 182" },
      { name: "Oceánico", hex: "#00A6B2", rgb: "0, 166, 178" },
      { name: "Azul Marino", hex: "#5F8AC7", rgb: "95, 138, 199" },
      { name: "Azul Milano", hex: "#8BA4D2", rgb: "139, 164, 210" },
      { name: "Azul Porcelana", hex: "#C5E5EC", rgb: "197, 229, 236" },
      { name: "Azul Aguamarina", hex: "#A0DED8", rgb: "160, 222, 216" },
      { name: "Azul Cielo", hex: "#C1E6F3", rgb: "193, 230, 243" },
    ]
  },
  {
    name: "Verdes",
    colors: [
      { name: "Verde Pino", hex: "#2D5016", rgb: "45, 80, 22" },
      { name: "Verde Oscuro", hex: "#1B4D3E", rgb: "27, 77, 62" },
      { name: "Verde Aceituna", hex: "#556B2F", rgb: "85, 107, 47" },
      { name: "Verde Primaveral", hex: "#4CAF50", rgb: "76, 175, 80" },
      { name: "Verde Jamaicano", hex: "#6B8E23", rgb: "107, 142, 35" },
      { name: "Verde Palmera", hex: "#C8E6C9", rgb: "200, 230, 201" },
      { name: "Chartreuse", hex: "#B0E0E6", rgb: "176, 224, 230" },
    ]
  },
  {
    name: "Rojos y Rosados",
    colors: [
      { name: "Rojo Vivo", hex: "#D72124", rgb: "215, 33, 36" },
      { name: "Rojo Colonial", hex: "#9F1C24", rgb: "159, 28, 36" },
      { name: "Rojo Atrevido", hex: "#A21A24", rgb: "162, 26, 36" },
      { name: "Rojo Carmín", hex: "#ED6C54", rgb: "237, 108, 84" },
      { name: "Rosa Coral", hex: "#F9C7BC", rgb: "249, 199, 188" },
      { name: "Amaranto", hex: "#FAE1DD", rgb: "250, 225, 221" },
      { name: "Rosado", hex: "#F8E1E0", rgb: "248, 225, 224" },
      { name: "Coral", hex: "#FAEDED", rgb: "250, 237, 237" },
    ]
  },
  {
    name: "Amarillos",
    colors: [
      { name: "Ocre", hex: "#CC7722", rgb: "204, 119, 34" },
      { name: "Amarillo Oro", hex: "#FFD700", rgb: "255, 215, 0" },
      { name: "Amarillo Vivo", hex: "#FFFF00", rgb: "255, 255, 0" },
      { name: "Amarillo Otoñal", hex: "#D4A574", rgb: "212, 165, 116" },
      { name: "Thai", hex: "#F4C2A1", rgb: "244, 194, 161" },
      { name: "Chantilli", hex: "#FFF8DC", rgb: "255, 248, 220" },
      { name: "Melón", hex: "#FFE4B5", rgb: "255, 228, 181" },
      { name: "Crema", hex: "#FFFDD0", rgb: "255, 253, 208" },
    ]
  },
  {
    name: "Naranjas",
    colors: [
      { name: "Naranja Fuerte", hex: "#F97316", rgb: "249, 115, 22" },
      { name: "Naranja Tentación", hex: "#E0542A", rgb: "224, 84, 42" },
      { name: "Mandarina", hex: "#FB923C", rgb: "251, 146, 60" },
      { name: "Naranja Chick", hex: "#E78235", rgb: "231, 130, 53" },
      { name: "Naranja", hex: "#F9812A", rgb: "249, 129, 42" },
      { name: "Terracota", hex: "#ED9A68", rgb: "237, 154, 104" },
      { name: "Ladrillo", hex: "#EE816D", rgb: "238, 129, 109" },
      { name: "Palo de Rosa", hex: "#FDD9B6", rgb: "253, 217, 182" },
    ]
  },
  {
    name: "Morados y Púrpuras",
    colors: [
      { name: "Magenta", hex: "#FF00FF", rgb: "255, 0, 255" },
      { name: "Morado", hex: "#6B2C91", rgb: "107, 44, 145" },
      { name: "Violeta", hex: "#8A2BE2", rgb: "138, 43, 226" },
      { name: "Uva", hex: "#6F4E8A", rgb: "111, 78, 138" },
      { name: "Azaleia", hex: "#B19CD9", rgb: "177, 156, 217" },
      { name: "Lila", hex: "#D8BFD8", rgb: "216, 191, 216" },
      { name: "Mora", hex: "#F0E6F5", rgb: "240, 230, 245" },
      { name: "Pomarrosa", hex: "#E6D5E8", rgb: "230, 213, 232" },
    ]
  },
  {
    name: "Tierras y Marrones",
    colors: [
      { name: "Café Paris", hex: "#3D2817", rgb: "61, 40, 23" },
      { name: "Arcilla", hex: "#B87333", rgb: "184, 115, 51" },
      { name: "Sauce", hex: "#D4C5B9", rgb: "212, 197, 185" },
      { name: "Arena", hex: "#E6D5C3", rgb: "230, 213, 195" },
      { name: "Sepia", hex: "#D4A5A5", rgb: "212, 165, 165" },
      { name: "Nuez", hex: "#F5E6E6", rgb: "245, 230, 230" },
      { name: "Bruma", hex: "#F5F0E8", rgb: "245, 240, 232" },
      { name: "Nácar", hex: "#F8F5F0", rgb: "248, 245, 240" },
    ]
  },
  {
    name: "Negros y Grises",
    colors: [
      { name: "Negro", hex: "#000000", rgb: "0, 0, 0" },
      { name: "Gris Fuerte", hex: "#2C2C2C", rgb: "44, 44, 44" },
      { name: "Gris Basalto", hex: "#4A4A4A", rgb: "74, 74, 74" },
      { name: "Gris", hex: "#808080", rgb: "128, 128, 128" },
      { name: "Gris Suave", hex: "#B0B0B0", rgb: "176, 176, 176" },
      { name: "Gris Ratón", hex: "#D3D3D3", rgb: "211, 211, 211" },
      { name: "Gris Nube", hex: "#F5F5F5", rgb: "245, 245, 245" },
    ]
  },
]

export function ColorPalette() {
  const { ref, isInView } = useInView<HTMLDivElement>({ 
    threshold: 0.1, 
    rootMargin: "-50px",
    triggerOnce: true 
  })
  const [activeTab, setActiveTab] = useState<string | null>(null) // null = "Todos"
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  // Filtrar colores según búsqueda y pestaña activa
  const filteredCategories = useMemo(() => {
    let categories = colorCategories

    // Filtrar por pestaña activa
    if (activeTab) {
      categories = categories.filter(cat => cat.name === activeTab)
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      categories = categories.map(category => ({
        ...category,
        colors: category.colors.filter(color =>
          color.name.toLowerCase().includes(query) ||
          color.hex.toLowerCase().includes(query) ||
          color.rgb.includes(query)
        )
      })).filter(category => category.colors.length > 0)
    }

    return categories
  }, [activeTab, searchQuery])

  // Función para copiar código de color
  const copyToClipboard = async (text: string, colorName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedColor(colorName)
      setTimeout(() => setCopiedColor(null), 2000)
    } catch (err) {
      console.error("Error al copiar:", err)
    }
  }

  // Contar total de colores
  const totalColors = colorCategories.reduce((sum, cat) => sum + cat.colors.length, 0)

  return (
    <section id="color-palette" className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background simplificado en móvil */}
      <div className="absolute inset-0 bg-primary md:bg-gradient-to-br md:from-primary md:via-primary/95 md:to-primary/90" />
      {/* CirclePattern solo en desktop */}
      <div className="hidden md:block">
        <CirclePattern className="absolute inset-0 opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            "text-center mb-12 md:mb-16 transition-opacity duration-300",
            isInView ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border-2 border-secondary/20 rounded-full mb-6">
            <Palette className="h-4 w-4 text-secondary" />
            <span className="text-sm font-semibold text-secondary">Carta de Colores</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            Nuestra Carta de Colores
          </h2>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-2">
            Explora nuestra amplia gama de <span className="font-semibold text-secondary">{totalColors} colores</span> disponibles. 
            Cada tono está cuidadosamente seleccionado para transformar tus espacios.
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/40" />
            <Input
              type="text"
              placeholder="Buscar por nombre, HEX o RGB..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/95 border-2 border-primary-foreground/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
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
        </div>

        {/* Pestañas de categorías */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            <button
              onClick={() => setActiveTab(null)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
                activeTab === null
                  ? "bg-secondary text-secondary-foreground shadow-lg scale-105 border-2 border-secondary"
                  : "bg-white text-foreground hover:bg-white/95 hover:scale-105 border-2 border-white/50 shadow-md md:backdrop-blur-sm"
              )}
            >
              Todos ({totalColors})
            </button>
            {colorCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveTab(category.name)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
                  activeTab === category.name
                    ? "bg-secondary text-secondary-foreground shadow-lg scale-105 border-2 border-secondary"
                    : "bg-white text-foreground hover:bg-white/95 hover:scale-105 border-2 border-white/50 shadow-md md:backdrop-blur-sm"
                )}
              >
                {category.name} ({category.colors.length})
              </button>
            ))}
          </div>
        </div>

        {/* Color Categories */}
        {filteredCategories.length > 0 ? (
          <div className="space-y-8 md:space-y-12">
            {filteredCategories.map((category, categoryIndex) => (
              <div
                key={category.name}
              >
                {activeTab === null && (
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-6 text-center">
                    {category.name}
                  </h3>
                )}
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
                  {category.colors.map((color, colorIndex) => {
                    const isCopied = copiedColor === `${category.name}-${color.name}`
                    return (
                      <Card
                        key={color.name}
                        className="group cursor-pointer bg-card/80 border-2 border-primary-foreground/20 md:hover:border-secondary/50 transition-all duration-200 md:hover:scale-105 md:hover:shadow-lg overflow-hidden"
                      >
                        <CardContent className="p-0">
                          {/* Color Swatch */}
                          <div
                            className="w-full h-24 md:h-32 relative md:group-hover:scale-105 transition-transform duration-200"
                            style={{ backgroundColor: color.hex }}
                            onClick={() => copyToClipboard(color.hex, `${category.name}-${color.name}`)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                            {isCopied && (
                              <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                                <div className="bg-white rounded-full p-2 shadow-lg">
                                  <Check className="h-6 w-6 text-secondary" />
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Color Info */}
                          <div className="p-2 md:p-3 bg-white/95">
                            <h4 className="font-semibold text-xs md:text-sm text-foreground mb-1.5 group-hover:text-secondary transition-colors line-clamp-1">
                              {color.name}
                            </h4>
                            <div className="space-y-1 text-[10px] md:text-xs">
                              <div 
                                className="flex items-center gap-1.5 cursor-pointer hover:bg-muted/50 rounded px-1 py-0.5 transition-colors group/hex"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  copyToClipboard(color.hex, `${category.name}-${color.name}-hex`)
                                }}
                              >
                                <span className="font-medium text-muted-foreground">HEX:</span>
                                <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[9px] md:text-[10px] flex-1 truncate">
                                  {color.hex}
                                </code>
                                <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover/hex:opacity-100 transition-opacity" />
                              </div>
                              <div 
                                className="flex items-center gap-1.5 cursor-pointer hover:bg-muted/50 rounded px-1 py-0.5 transition-colors group/rgb"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  copyToClipboard(`rgb(${color.rgb})`, `${category.name}-${color.name}-rgb`)
                                }}
                              >
                                <span className="font-medium text-muted-foreground">RGB:</span>
                                <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-[9px] md:text-[10px] flex-1 truncate">
                                  {color.rgb}
                                </code>
                                <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover/rgb:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-primary-foreground/70">
              No se encontraron colores que coincidan con "{searchQuery}"
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-lg text-primary-foreground/90 mb-4">
            ¿No encuentras el color que buscas?
          </p>
          <p className="text-base text-primary-foreground/70">
            <a
              href="https://wa.me/573223716811?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20colores%20de%20pintura.%20Tengo%20consultas%20sobre%20colores%20personalizados%20y%20mezclas%20especiales."
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary/80 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              Contáctanos para consultas sobre colores personalizados y mezclas especiales.
            </a>
          </p>
          <p className="text-sm text-primary-foreground/60 mt-2">
            💡 <strong>Tip:</strong> Haz clic en cualquier color o código para copiarlo al portapapeles
          </p>
        </div>
      </div>
    </section>
  )
}
