"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowLeft, MessageSquare } from "lucide-react"
import { products } from "@/lib/constants/products"
import { whatsappUrls } from "@/lib/constants/site"
import { cn } from "@/lib/utils"

/**
 * Showroom de catálogo. Cada producto = una sección scroll-snap a 100dvh.
 *
 * Diseño mobile-first: tablet y desktop usan el mismo layout vertical, solo
 * cambian las proporciones. Pensado para que el dueño del comercio lo muestre
 * en una tablet grande durante la reunión sin pelear con responsive raros.
 *
 * Optimizado para gama baja:
 *  - 1 fade-in por sección al entrar al viewport (no stagger por elemento)
 *  - CSS transitions, cero framer-motion en este árbol
 *  - Imágenes WebP con sizes correctos
 *  - SVG noise inline ~2KB compositado una sola vez por sección
 *  - Sin blur-3xl pesados, sin scroll-jacking
 */

type Theme = {
    bg: string                 // gradient principal del fondo
    halo: string               // color del aura detrás del cuñete
    accent: string             // color de marca para acentos (línea, eyebrow)
    accentSoft: string         // versión suave del accent para superficies
    text: string               // color del texto principal
    textMuted: string          // color del texto secundario
    chipBg: string             // fondo de los chips de presentación
    chipText: string           // texto de los chips
    cardBg: string             // fondo del bloque info inferior
    onDark: boolean            // para invertir contrastes finos
    swatches: { hex: string; name: string }[]   // colores destacados a mostrar
}

const SHOWROOM_IDS = [
    "vinilo-acrilico",
    "vinilo-semilavable",
    "vinilo-hidrofugado",
    "vinilo-tipo-2-certificado",
] as const

const THEMES: Record<string, Theme> = {
    "vinilo-acrilico": {
        bg: "linear-gradient(180deg, #eef4ff 0%, #cfdcfb 60%, #a3bdf6 100%)",
        halo: "#1d4ed8",
        accent: "#1d4ed8",
        accentSoft: "rgba(29,78,216,0.10)",
        text: "#0b1530",
        textMuted: "#3b4566",
        chipBg: "rgba(11,21,48,0.06)",
        chipText: "#0b1530",
        cardBg: "rgba(255,255,255,0.78)",
        onDark: false,
        swatches: [
            { hex: "#ffffff", name: "Blanco" },
            { hex: "#f3e3c8", name: "Almendra" },
            { hex: "#c9302c", name: "Rojo" },
        ],
    },
    "vinilo-semilavable": {
        bg: "linear-gradient(180deg, #0b1740 0%, #14296b 50%, #1d4ed8 100%)",
        halo: "#fbbf24",
        accent: "#fbbf24",
        accentSoft: "rgba(251,191,36,0.16)",
        text: "#ffffff",
        textMuted: "rgba(255,255,255,0.72)",
        chipBg: "rgba(255,255,255,0.10)",
        chipText: "#ffffff",
        cardBg: "rgba(11,21,48,0.55)",
        onDark: true,
        swatches: [
            { hex: "#ffffff", name: "Blanco" },
            { hex: "#fbbf24", name: "Ámbar" },
            { hex: "#93c5fd", name: "Cielo" },
        ],
    },
    "vinilo-hidrofugado": {
        bg: "linear-gradient(180deg, #fffce8 0%, #fde98c 55%, #f0c83b 100%)",
        halo: "#b45309",
        accent: "#b45309",
        accentSoft: "rgba(180,83,9,0.12)",
        text: "#3f2a06",
        textMuted: "#6b4915",
        chipBg: "rgba(63,42,6,0.08)",
        chipText: "#3f2a06",
        cardBg: "rgba(255,255,255,0.72)",
        onDark: false,
        swatches: [
            { hex: "#fde047", name: "Amarillo" },
            { hex: "#ffffff", name: "Blanco" },
            { hex: "#b45309", name: "Tierra" },
        ],
    },
    "vinilo-tipo-2-certificado": {
        bg: "linear-gradient(180deg, #04081c 0%, #0e1a45 55%, #15287a 100%)",
        halo: "#fbbf24",
        accent: "#fbbf24",
        accentSoft: "rgba(251,191,36,0.14)",
        text: "#ffffff",
        textMuted: "rgba(255,255,255,0.70)",
        chipBg: "rgba(255,255,255,0.08)",
        chipText: "#ffffff",
        cardBg: "rgba(4,8,28,0.55)",
        onDark: true,
        swatches: [
            { hex: "#fbbf24", name: "Ámbar" },
            { hex: "#ffffff", name: "Blanco" },
            { hex: "#93c5fd", name: "Cielo" },
        ],
    },
}

const SHOWROOM_IMAGES: Record<string, string> = {
    "vinilo-acrilico": "/productos_catalogo/vinilo-acrilico.png",
    "vinilo-semilavable": "/productos_catalogo/vinilo-semilavable.png",
    "vinilo-hidrofugado": "/productos_catalogo/vinilo-hidrofugado.png",
    "vinilo-tipo-2-certificado": "/productos_catalogo/vinilo-tipo-2-certificado.png",
}

const TAGLINES: Record<string, string> = {
    "vinilo-acrilico": "Tu hogar, en su mejor versión.",
    "vinilo-semilavable": "Limpieza que dura. Color que permanece.",
    "vinilo-hidrofugado": "La humedad ya no es un problema.",
    "vinilo-tipo-2-certificado": "Certificado. Porque tu obra lo merece.",
}

// Eyebrow corto que va arriba del nombre — comunica el "tipo" en mayúsculas
// sin saturar. Distinto del taglines (italic, debajo del nombre).
const EYEBROWS: Record<string, string> = {
    "vinilo-acrilico": "Línea Hogar",
    "vinilo-semilavable": "Larga Duración",
    "vinilo-hidrofugado": "Tecnología Hidrofugada",
    "vinilo-tipo-2-certificado": "Uso Profesional",
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

    const currentTheme = showroomProducts[active]
        ? THEMES[showroomProducts[active].id]
        : THEMES["vinilo-acrilico"]

    return (
        <div
            className="relative bg-black"
            style={{ height: "100dvh", width: "100vw", overflow: "hidden" }}
        >
            {/* Header flotante minimal — mix-blend-difference para que se lea sobre cualquier tema. */}
            <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-10 py-3 md:py-5 mix-blend-difference">
                <a
                    href="/"
                    className="flex items-center gap-2 text-white text-xs md:text-sm font-bold tracking-wider transition-opacity hover:opacity-80"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">VOLVER</span>
                    <span className="sm:hidden">INICIO</span>
                </a>
                <div className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
                    Catálogo
                </div>
                <div className="w-[60px] md:w-[80px]" />
            </header>

            {/* Contenedor scroll-snap principal */}
            <main
                ref={mainRef}
                className="scrollbar-hide"
                style={{
                    height: "100dvh",
                    width: "100vw",
                    overflowY: "scroll",
                    scrollSnapType: "y mandatory",
                    WebkitOverflowScrolling: "touch",
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
                            className="relative flex flex-col items-center"
                            style={{
                                background: theme.bg,
                                color: theme.text,
                                height: "100dvh",
                                width: "100vw",
                                overflow: "hidden",
                                scrollSnapAlign: "start",
                                scrollSnapStop: "always",
                            }}
                        >
                            {/* Capa de textura sutil — paint grain, ~2KB, paint 1 vez. */}
                            <div
                                aria-hidden
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backgroundImage:
                                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                                    backgroundSize: "240px 240px",
                                    opacity: theme.onDark ? 0.07 : 0.05,
                                    mixBlendMode: theme.onDark ? "overlay" : "multiply",
                                }}
                            />

                            {/* Halo del color de marca detrás del cuñete */}
                            <div
                                aria-hidden
                                className={cn(
                                    "absolute pointer-events-none rounded-full transition-opacity duration-700",
                                    isActive ? "opacity-100" : "opacity-0"
                                )}
                                style={{
                                    top: "20%",
                                    left: "50%",
                                    width: "min(70vw, 540px)",
                                    height: "min(70vw, 540px)",
                                    transform: "translate(-50%, 0)",
                                    background: `radial-gradient(circle at center, ${theme.halo} 0%, transparent 65%)`,
                                    opacity: theme.onDark ? 0.35 : 0.22,
                                    filter: "blur(40px)",
                                }}
                            />

                            {/* Numerito gigante de fondo, perf-cheap (es solo texto) */}
                            <div
                                aria-hidden
                                className="absolute font-black select-none pointer-events-none leading-none"
                                style={{
                                    fontSize: "clamp(360px, 80vh, 1100px)",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    color: theme.onDark ? "#ffffff" : "#000000",
                                    opacity: 0.04,
                                }}
                            >
                                {String(idx + 1).padStart(2, "0")}
                            </div>

                            {/* CONTENIDO PRINCIPAL — mobile-first vertical, escala en tablet/desktop */}
                            <div
                                className={cn(
                                    "relative z-10 flex flex-col items-center w-full h-full",
                                    "px-5 sm:px-8 md:px-12",
                                    "pt-[calc(env(safe-area-inset-top,0px)+3rem)] pb-[calc(env(safe-area-inset-bottom,0px)+5.5rem)]",
                                    "max-w-[640px] md:max-w-[860px] lg:max-w-[960px] mx-auto",
                                    "transition-opacity duration-700",
                                    isActive ? "opacity-100" : "opacity-0"
                                )}
                            >
                                {/* EYEBROW — línea + número + categoría chica */}
                                <div className="flex items-center gap-3 self-start mb-3 md:mb-5">
                                    <span
                                        className="h-px w-10 md:w-14"
                                        style={{ backgroundColor: theme.accent, opacity: 0.6 }}
                                    />
                                    <span
                                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.32em]"
                                        style={{ color: theme.accent }}
                                    >
                                        {EYEBROWS[product.id] ?? "Vinilos"}
                                    </span>
                                    <span
                                        className="ml-auto text-[10px] md:text-xs font-bold tracking-[0.3em]"
                                        style={{ color: theme.textMuted }}
                                    >
                                        {String(idx + 1).padStart(2, "0")} / {String(showroomProducts.length).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* NOMBRE MEGA — display type */}
                                <h1
                                    className="self-start font-black leading-[0.92] tracking-tight"
                                    style={{
                                        fontSize: "clamp(2.4rem, 9vw, 6.5rem)",
                                        color: theme.text,
                                    }}
                                >
                                    {product.name}
                                </h1>

                                {/* TAGLINE italic */}
                                <p
                                    className="self-start italic font-medium mt-2 md:mt-3"
                                    style={{
                                        color: theme.textMuted,
                                        fontSize: "clamp(0.95rem, 2.6vw, 1.2rem)",
                                    }}
                                >
                                    {TAGLINES[product.id]}
                                </p>

                                {/* CUÑETE HERO — protagonista */}
                                <div
                                    className="relative w-full flex items-end justify-center mt-3 md:mt-5 flex-1 min-h-0"
                                >
                                    {/* Sombra dramática */}
                                    <div
                                        aria-hidden
                                        className="absolute bottom-0 left-1/2 w-[55%] h-3 md:h-4 rounded-[50%] blur-2xl"
                                        style={{
                                            transform: "translateX(-50%)",
                                            backgroundColor: theme.onDark ? "#000" : theme.accent,
                                            opacity: theme.onDark ? 0.7 : 0.35,
                                        }}
                                    />
                                    <div
                                        className="relative h-full w-full"
                                        style={{ maxHeight: "clamp(34vh, 50vh, 60vh)" }}
                                    >
                                        <Image
                                            src={SHOWROOM_IMAGES[product.id] ?? product.image}
                                            alt={product.name}
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 70vw, 700px"
                                            priority={idx === 0}
                                            quality={90}
                                        />
                                    </div>
                                </div>

                                {/* COLORES + PRESENTACIONES — fila densa pero limpia */}
                                <div className="self-stretch mt-3 md:mt-4 flex flex-col gap-3 md:gap-4">
                                    {/* Colores con bloques + nombre */}
                                    <div>
                                        <p
                                            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.34em] mb-2"
                                            style={{ color: theme.textMuted }}
                                        >
                                            Colores disponibles
                                        </p>
                                        <div className="flex items-center gap-2 md:gap-3">
                                            {(theme.swatches).map((c) => (
                                                <ColorBlock
                                                    key={c.name}
                                                    color={c.hex}
                                                    name={c.name}
                                                    onDark={theme.onDark}
                                                    textMuted={theme.textMuted}
                                                />
                                            ))}
                                            <span
                                                className="text-[10px] md:text-xs font-bold tracking-wider ml-1 md:ml-2"
                                                style={{ color: theme.accent }}
                                            >
                                                +60 referencias
                                            </span>
                                        </div>
                                    </div>

                                    {/* Presentaciones */}
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.34em]"
                                            style={{ color: theme.textMuted }}
                                        >
                                            Tamaños
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {product.presentations?.map((p) => (
                                                <span
                                                    key={p}
                                                    className="px-2.5 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full border"
                                                    style={{
                                                        backgroundColor: theme.chipBg,
                                                        color: theme.chipText,
                                                        borderColor: theme.onDark
                                                            ? "rgba(255,255,255,0.16)"
                                                            : "rgba(0,0,0,0.10)",
                                                    }}
                                                >
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA STICKY BOTTOM — full-width WhatsApp */}
                            <a
                                href={whatsappUrls.product(product.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "fixed left-0 right-0 z-40 flex items-center justify-center gap-3 font-black text-sm md:text-base tracking-wider transition-all",
                                    "px-6 py-4 md:py-5",
                                    "bg-[#25D366] hover:bg-[#20bd5a] text-white",
                                    "shadow-[0_-8px_24px_rgba(0,0,0,0.18)]"
                                )}
                                style={{
                                    bottom: 0,
                                    paddingBottom: "max(env(safe-area-inset-bottom,0px), 1rem)",
                                }}
                            >
                                <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
                                <span>Cotizar esta pintura</span>
                                <span className="opacity-70">·</span>
                                <span className="opacity-90 hidden sm:inline">{product.name}</span>
                            </a>
                        </section>
                    )
                })}
            </main>

            {/* Indicador lateral de progreso — minimal, no se cruza con el CTA sticky */}
            <nav
                className="fixed right-2 md:right-5 z-40 flex flex-col gap-2.5"
                style={{ top: "50%", transform: "translateY(calc(-50% - 1.5rem))" }}
            >
                {showroomProducts.map((p, idx) => (
                    <button
                        key={p.id}
                        onClick={() => scrollTo(idx)}
                        className="block"
                        aria-label={p.name}
                    >
                        <span
                            className={cn(
                                "block w-1 rounded-full transition-all duration-500",
                                active === idx ? "h-10" : "h-5 opacity-40"
                            )}
                            style={{
                                backgroundColor:
                                    active === idx
                                        ? currentTheme.accent
                                        : currentTheme.onDark
                                            ? "rgba(255,255,255,0.45)"
                                            : "rgba(0,0,0,0.40)",
                            }}
                        />
                    </button>
                ))}
            </nav>
        </div>
    )
}

/**
 * Bloque de color cuadrado con nombre debajo. Tamaño grande para que se vea
 * el color de verdad (no un puntito). Borde sutil para diferenciar blancos.
 */
function ColorBlock({
    color,
    name,
    onDark,
    textMuted,
}: {
    color: string
    name: string
    onDark: boolean
    textMuted: string
}) {
    return (
        <div className="flex flex-col items-center gap-1">
            <span
                className="block rounded-md"
                style={{
                    backgroundColor: color,
                    width: "clamp(40px, 11vw, 56px)",
                    height: "clamp(40px, 11vw, 56px)",
                    boxShadow: onDark
                        ? "inset 0 0 0 1px rgba(255,255,255,0.20), 0 6px 14px rgba(0,0,0,0.35)"
                        : "inset 0 0 0 1px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.10)",
                }}
            />
            <span
                className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: textMuted }}
            >
                {name}
            </span>
        </div>
    )
}
