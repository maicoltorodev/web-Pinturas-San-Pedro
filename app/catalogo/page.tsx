"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowLeft, MessageSquare, ChevronDown } from "lucide-react"
import { products } from "@/lib/constants/products"
import { whatsappUrls } from "@/lib/constants/site"
import { cn } from "@/lib/utils"

type Theme = {
  bg: string
  accent: string
  accentText: string
  textOnDark: boolean
  paintBg: string
  swatches: string[]
}

const SHOWROOM_IDS = [
  "vinilo-acrilico",
  "vinilo-semilavable",
  "vinilo-hidrofugado",
  "vinilo-tipo-2-certificado",
] as const

const THEMES: Record<string, Theme> = {
  "vinilo-acrilico": {
    bg: "linear-gradient(135deg, #fef3e2 0%, #fde4c0 50%, #f5cf95 100%)",
    accent: "#c97a2b",
    accentText: "#7a3e0f",
    textOnDark: false,
    paintBg: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.6), transparent 70%)",
    swatches: ["#ffffff", "#f3e3c8", "#c9302c"],
  },
  "vinilo-semilavable": {
    bg: "linear-gradient(135deg, #e8eef5 0%, #cfdce9 50%, #a8bcd3 100%)",
    accent: "#3b5d80",
    accentText: "#1e3552",
    textOnDark: false,
    paintBg: "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.7), transparent 70%)",
    swatches: ["#ffffff", "#f0f0f0", "#dfe7ef"],
  },
  "vinilo-hidrofugado": {
    bg: "linear-gradient(135deg, #0a2540 0%, #0f3b5f 50%, #1a5d80 100%)",
    accent: "#5dd9e6",
    accentText: "#a8eef5",
    textOnDark: true,
    paintBg: "radial-gradient(ellipse at 50% 50%, rgba(93,217,230,0.18), transparent 70%)",
    swatches: ["#ffffff", "#e8f4f8", "#5dd9e6"],
  },
  "vinilo-tipo-2-certificado": {
    bg: "linear-gradient(135deg, #fef9e7 0%, #fae8a0 45%, #f5cb47 100%)",
    accent: "#a87f15",
    accentText: "#5d4407",
    textOnDark: false,
    paintBg: "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.55), transparent 70%)",
    swatches: ["#ffffff", "#fae8a0", "#dca85f"],
  },
}

const TAGLINES: Record<string, string> = {
  "vinilo-acrilico": "Tu hogar, en su mejor versión.",
  "vinilo-semilavable": "Limpieza, color, tranquilidad.",
  "vinilo-hidrofugado": "La humedad ya no es un problema.",
  "vinilo-tipo-2-certificado": "Calidad profesional al alcance de todos.",
}

export default function ShowroomPage() {
  const [active, setActive] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const mainRef = useRef<HTMLElement | null>(null)
  const showroomProducts = SHOWROOM_IDS
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products

  useEffect(() => {
    const root = mainRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"))
            setActive(idx)
          }
        }
      },
      { root, threshold: 0.55 }
    )
    sectionRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth" })
  }

  const currentTheme = showroomProducts[active] ? THEMES[showroomProducts[active].id] : THEMES["vinilo-acrilico"]

  return (
    <div
      className="relative bg-black"
      style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
    >
      {/* Header flotante */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-10 py-4 mix-blend-difference">
        <a
          href="/"
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Volver al sitio</span>
          <span className="sm:hidden">Inicio</span>
        </a>
        <div className="text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
          Showroom · San Pedro
        </div>
        <div className="w-[80px]" />
      </header>

      {/* Contenedor scroll-snap */}
      <main
        ref={mainRef}
        className="scroll-smooth"
        style={{
          height: "100vh",
          width: "100vw",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
        }}
      >
        {showroomProducts.map((product, idx) => {
          const theme = THEMES[product.id]
          const isActive = active === idx
          return (
            <section
              key={product.id}
              ref={(el) => { sectionRefs.current[idx] = el }}
              data-idx={idx}
              className="relative flex items-center justify-center"
              style={{
                background: theme.bg,
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
              }}
            >
              {/* Capa decorativa de fondo */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: theme.paintBg }}
              />

              {/* Manchas/circles decorativos */}
              <div
                className={cn(
                  "absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full blur-3xl opacity-30 transition-all duration-1000",
                  isActive ? "scale-100" : "scale-50"
                )}
                style={{ backgroundColor: theme.accent }}
              />
              <div
                className={cn(
                  "absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 transition-all duration-1000 delay-100",
                  isActive ? "scale-100" : "scale-50"
                )}
                style={{ backgroundColor: theme.accent }}
              />

              {/* Numerito gigante de fondo */}
              <div
                className={cn(
                  "absolute font-black select-none pointer-events-none transition-all duration-1000 leading-none",
                  isActive ? "opacity-[0.06]" : "opacity-0",
                  theme.textOnDark ? "text-white" : "text-black"
                )}
                style={{
                  fontSize: "clamp(280px, 60vh, 700px)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>

              {/* Contenido principal */}
              <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col md:grid md:grid-cols-2 md:gap-12 items-center px-6 md:px-12 pt-20 md:pt-16 pb-20 md:pb-12">
                {/* Imagen del producto */}
                <div
                  className={cn(
                    "relative flex items-center justify-center transition-all duration-1000 ease-out",
                    isActive
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-90"
                  )}
                  style={{
                    flex: "1 1 auto",
                    minHeight: 0,
                    width: "100%",
                  }}
                >
                  <div className="relative w-full h-full max-h-[42vh] md:max-h-[70vh] aspect-square md:aspect-auto">
                    {/* Sombra debajo */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-[50%] blur-2xl"
                      style={{ backgroundColor: theme.accent, opacity: 0.4 }}
                    />
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 768px) 90vw, 50vw"
                      priority={idx === 0}
                    />
                  </div>
                </div>

                {/* Info editorial */}
                <div
                  className={cn(
                    "relative flex flex-col gap-3 md:gap-5 w-full",
                    theme.textOnDark ? "text-white" : "text-gray-900"
                  )}
                >
                  {/* Eyebrow número */}
                  <div
                    className={cn(
                      "transition-all duration-700 delay-100 flex items-center gap-3",
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                    )}
                  >
                    <span
                      className="text-xs font-bold tracking-[0.4em]"
                      style={{ color: theme.accentText }}
                    >
                      {String(idx + 1).padStart(2, "0")} / {String(showroomProducts.length).padStart(2, "0")}
                    </span>
                    <span
                      className="h-px w-12"
                      style={{ backgroundColor: theme.accentText, opacity: 0.4 }}
                    />
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.3em]"
                      style={{ color: theme.accentText }}
                    >
                      Vinilos
                    </span>
                  </div>

                  {/* Nombre del producto */}
                  <h1
                    className={cn(
                      "font-extrabold leading-[0.95] tracking-tight transition-all duration-700 delay-200",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    )}
                    style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
                  >
                    {product.name}
                  </h1>

                  {/* Tagline cursivo */}
                  <p
                    className={cn(
                      "italic font-medium transition-all duration-700 delay-300",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{
                      color: theme.accentText,
                      fontSize: "clamp(0.95rem, 1.5vw, 1.25rem)",
                    }}
                  >
                    {TAGLINES[product.id]}
                  </p>

                  {/* Descripción */}
                  <p
                    className={cn(
                      "text-sm md:text-base leading-relaxed transition-all duration-700 delay-[400ms] line-clamp-3 md:line-clamp-none",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                      theme.textOnDark ? "text-white/80" : "text-gray-700"
                    )}
                  >
                    {product.description}
                  </p>

                  {/* Características */}
                  <ul className="space-y-1.5 mt-1">
                    {product.characteristics.slice(0, 4).map((char, i) => (
                      <li
                        key={i}
                        className={cn(
                          "flex items-start gap-2.5 text-xs md:text-sm transition-all duration-500",
                          isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                        )}
                        style={{ transitionDelay: `${500 + i * 100}ms` }}
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: theme.accent }}
                        />
                        <span className={theme.textOnDark ? "text-white/85" : "text-gray-700"}>
                          {char.replace(/^✔\s*/, "")}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Swatches */}
                  <div
                    className={cn(
                      "transition-all duration-700 delay-[800ms]",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                  >
                    <p
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-[0.3em] mb-2",
                        theme.textOnDark ? "text-white/60" : "text-gray-500"
                      )}
                    >
                      Colores disponibles
                    </p>
                    <div className="flex gap-2">
                      {(product.colors || theme.swatches).map((c, i) => {
                        const isHexLike = typeof c === "string" && c.startsWith("#")
                        const colorMap: Record<string, string> = {
                          Blanco: "#ffffff",
                          Almendra: "#f3e3c8",
                          Rojo: "#c9302c",
                        }
                        const colorValue = isHexLike ? c : colorMap[c] || "#ffffff"
                        return (
                          <div
                            key={i}
                            title={typeof c === "string" && !isHexLike ? c : undefined}
                            className={cn(
                              "h-8 w-8 md:h-10 md:w-10 rounded-full ring-2 transition-all duration-500 hover:scale-110 cursor-pointer",
                              theme.textOnDark ? "ring-white/40" : "ring-black/20"
                            )}
                            style={{
                              backgroundColor: colorValue,
                              transitionDelay: `${850 + i * 80}ms`,
                              transform: isActive ? "scale(1)" : "scale(0)",
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>

                  {/* Presentaciones + CTA */}
                  <div
                    className={cn(
                      "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2 transition-all duration-700 delay-[1000ms]",
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {product.presentations?.map((p) => (
                        <span
                          key={p}
                          className={cn(
                            "px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-sm",
                            theme.textOnDark
                              ? "bg-white/10 text-white border border-white/20"
                              : "bg-black/5 text-gray-800 border border-black/10"
                          )}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                    <a
                      href={whatsappUrls.product(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-xs md:text-sm shadow-xl transition-all hover:scale-105 hover:shadow-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white whitespace-nowrap"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Cotizar
                    </a>
                  </div>
                </div>
              </div>

              {/* Indicador de scroll en primera sección */}
              {idx === 0 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
                  <span
                    className={cn(
                      "text-[9px] font-bold uppercase tracking-[0.4em]",
                      theme.textOnDark ? "text-white/60" : "text-gray-500"
                    )}
                  >
                    Desliza
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4",
                      theme.textOnDark ? "text-white/60" : "text-gray-500"
                    )}
                  />
                </div>
              )}
            </section>
          )
        })}
      </main>

      {/* Indicador lateral de progreso */}
      <nav className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {showroomProducts.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => scrollTo(idx)}
            className="group flex items-center gap-2.5"
            aria-label={p.name}
          >
            <span
              className={cn(
                "text-[10px] font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap hidden md:inline",
                currentTheme.textOnDark ? "text-white" : "text-gray-900"
              )}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "block h-8 w-0.5 transition-all duration-500 rounded-full",
                active === idx
                  ? "h-12"
                  : "opacity-50"
              )}
              style={{
                backgroundColor:
                  active === idx
                    ? currentTheme.accent
                    : currentTheme.textOnDark
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(0,0,0,0.4)",
              }}
            />
          </button>
        ))}
      </nav>
    </div>
  )
}
