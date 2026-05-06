import type { Metadata } from "next"
import { siteConfig } from "@/lib/constants/site"
import { RibbonBanner } from "@/components/catalogo-libro/ribbon-banner"
import { FachadasSection } from "@/components/catalogo-libro/fachadas-section"

export const metadata: Metadata = {
    title: "Catálogo · Pinturas San Pedro",
    description:
        "Catálogo Pinturas San Pedro · Vinilos, esmaltes, anticorrosivos, estucos y más. Calidad certificada, más de 30 años en Bogotá.",
}

const SERIF = "var(--font-playfair), Georgia, 'Times New Roman', serif"

/**
 * Patrón de círculos amarillos sobre azul — refleja la fachada real del local.
 * Distribución orgánica (no grid), tamaños variados, algunos cortados por los bordes
 * (igual que en la pared). Algunos drift sutil para vida; la mayoría estática.
 */
const facadeDots = [
    // Esquinas y bordes (parcialmente cortados)
    { top: "-6%", left: "-4%", size: 220, opacity: 0.95, drift: "animate-orb-1" },
    { top: "-8%", right: "8%", size: 140, opacity: 0.9, drift: null },
    { top: "12%", left: "32%", size: 90, opacity: 0.85, drift: "animate-orb-2" },
    { top: "8%", right: "-6%", size: 260, opacity: 0.92, drift: null },

    // Banda superior-media
    { top: "26%", left: "8%", size: 110, opacity: 0.88, drift: null },
    { top: "30%", right: "30%", size: 70, opacity: 0.8, drift: "animate-orb-3" },
    { top: "38%", left: "60%", size: 130, opacity: 0.9, drift: null },

    // Banda media-inferior
    { top: "55%", left: "-3%", size: 100, opacity: 0.85, drift: null },
    { top: "62%", right: "12%", size: 180, opacity: 0.92, drift: "animate-orb-1" },
    { top: "70%", left: "40%", size: 60, opacity: 0.78, drift: null },

    // Inferior
    { bottom: "-8%", left: "10%", size: 200, opacity: 0.93, drift: "animate-orb-2" },
    { bottom: "4%", left: "55%", size: 110, opacity: 0.88, drift: null },
    { bottom: "-4%", right: "-4%", size: 240, opacity: 0.95, drift: null },
    { bottom: "20%", right: "40%", size: 75, opacity: 0.82, drift: "animate-orb-3" },
] as const

const chapters = [
    { roman: "I", name: "Vinilos & Acrílicos", swatch: "#E8C547" },
    { roman: "II", name: "Esmaltes & Acabados", swatch: "#C0392B" },
    { roman: "III", name: "Anticorrosivos & Madera", swatch: "#5D4037" },
    { roman: "IV", name: "Estucos & Preparación", swatch: "#ECEFF1" },
    { roman: "V", name: "Herramientas & Accesorios", swatch: "#37474F" },
]

// Noise SVG inline (grano de papel sutil para profundidad de textura)
const NOISE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
        <filter id='n'>
            <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
            <feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0'/>
        </filter>
        <rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/>
    </svg>`,
)}`

export default function CatalogoLibroPage() {
    const now = new Date()
    const year = now.getFullYear()
    // Formato editorial colombiano: "05 · MAYO · 2026"
    const currentDate = new Intl.DateTimeFormat("es-CO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
        .format(now)
        .replace(/ de /g, " · ")
        .toUpperCase()

    // Azul cobalto vibrante igual al de la fachada del local (más brillante que --primary global).
    const FACADE_BLUE = "oklch(0.42 0.21 258)"
    const FACADE_BLUE_DEEP = "oklch(0.32 0.20 258)"

    return (
        <main
            className="min-h-screen"
            role="main"
            style={{ backgroundColor: FACADE_BLUE }}
        >
            {/* PORTADA EDITORIAL */}
            <section
                className="relative flex min-h-screen items-center justify-center overflow-hidden"
                aria-label="Portada del catálogo"
            >
                {/* Fondo: azul cobalto de la fachada (no el primary oscuro) */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(135deg, ${FACADE_BLUE} 0%, ${FACADE_BLUE} 55%, ${FACADE_BLUE_DEEP} 100%)`,
                        }}
                    />

                    {/* Grano de papel SOLO sobre el azul (debajo de los dots para no ensuciar el amarillo) */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
                        style={{
                            backgroundImage: `url("${NOISE_SVG}")`,
                            backgroundSize: "240px 240px",
                        }}
                    />

                    {/* Vignette muy sutil */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)",
                        }}
                    />

                    {/* Patrón de círculos amarillos — refleja la fachada real del local.
                        Va POR ENCIMA del grain para mantenerse vibrante (sin overlay). */}
                    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                        {facadeDots.map((dot, i) => {
                            const positionStyle: Record<string, string | number> = {
                                width: `${dot.size}px`,
                                height: `${dot.size}px`,
                            }
                            if ("top" in dot && dot.top !== undefined) positionStyle.top = dot.top
                            if ("bottom" in dot && dot.bottom !== undefined)
                                positionStyle.bottom = dot.bottom
                            if ("left" in dot && dot.left !== undefined) positionStyle.left = dot.left
                            if ("right" in dot && dot.right !== undefined) positionStyle.right = dot.right

                            return (
                                <div
                                    key={i}
                                    className={`absolute rounded-full ${dot.drift ?? ""}`}
                                    style={{
                                        ...positionStyle,
                                        backgroundColor: "var(--secondary)",
                                        opacity: dot.opacity,
                                        transform: "translate3d(0,0,0)",
                                        backfaceVisibility: "hidden",
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* Marco editorial: corner brackets */}
                <div
                    className="pointer-events-none absolute inset-4 z-10 sm:inset-6 md:inset-10"
                    aria-hidden="true"
                >
                    <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-primary-foreground/40 sm:h-8 sm:w-8" />
                    <span className="absolute right-0 top-0 h-6 w-6 border-r border-t border-primary-foreground/40 sm:h-8 sm:w-8" />
                    <span className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-primary-foreground/40 sm:h-8 sm:w-8" />
                    <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-primary-foreground/40 sm:h-8 sm:w-8" />
                </div>

                {/* Side rail derecho: edición vertical */}
                <div
                    className="cover-rise pointer-events-none absolute right-6 top-1/2 z-10 hidden translate-x-3 -translate-y-1/2 rotate-90 origin-right text-[10px] font-semibold uppercase tracking-[0.5em] text-primary-foreground/60 lg:block"
                    style={{ animationDelay: "100ms" }}
                >
                    Edición {year} · Volumen 01
                </div>

                {/* Top metadata bar */}
                <div className="absolute left-0 right-0 top-0 z-10 hidden px-12 pt-10 lg:block">
                    <div
                        className="cover-rise mx-auto flex max-w-6xl items-center justify-between text-[10px] font-semibold uppercase tracking-[0.4em] text-primary-foreground/55"
                        style={{ animationDelay: "0ms" }}
                    >
                        <span>{currentDate}</span>
                        <span className="hidden xl:inline">{siteConfig.tagline}</span>
                        <span>30 años · Color & Acabados</span>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="container relative z-10 mx-auto px-4 py-20 sm:px-6 md:py-24 lg:px-8">
                    <div className="mx-auto max-w-5xl">
                        <div className="space-y-10 text-center md:space-y-12">
                            {/* CINTA DIAGONAL — logo + título principal */}
                            <RibbonBanner
                                eyebrow="¡Creamos color!"
                                title={`Catálogo ${year}`}
                                animationDelay={120}
                            />

                            {/* Línea divisora con sello "Volumen 01" */}
                            <div
                                className="cover-rise flex items-center justify-center gap-6 px-6"
                                style={{ animationDelay: "320ms" }}
                            >
                                <span className="animate-line-expand h-px flex-1 max-w-[140px] bg-primary-foreground/40" />
                                <span
                                    className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-foreground/70"
                                    style={{ fontFamily: SERIF, fontStyle: "italic", letterSpacing: "0.25em" }}
                                >
                                    Contenido · {year}
                                </span>
                                <span className="animate-line-expand h-px flex-1 max-w-[140px] bg-primary-foreground/40" />
                            </div>

                            {/* Índice de capítulos como paint chips numerados */}
                            <ul
                                className="cover-rise mx-auto grid max-w-3xl gap-x-6 gap-y-3 text-left sm:grid-cols-2"
                                style={{ animationDelay: "480ms" }}
                            >
                                {chapters.map((c) => (
                                    <li
                                        key={c.roman}
                                        className="group flex items-center gap-4 border-b border-primary-foreground/15 pb-3"
                                    >
                                        {/* Paint chip swatch */}
                                        <span
                                            className="block h-8 w-8 shrink-0 rounded-[3px] shadow-[0_4px_10px_-2px_rgba(0,0,0,0.45)]"
                                            style={{
                                                backgroundColor: c.swatch,
                                                border: "1px solid rgba(255,255,255,0.15)",
                                            }}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className="w-7 shrink-0 text-secondary text-base"
                                            style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 600 }}
                                        >
                                            {c.roman}
                                        </span>
                                        <span className="text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground/85 sm:text-[15px]">
                                            {c.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Pie editorial */}
                            <div
                                className="cover-rise pt-6"
                                style={{ animationDelay: "640ms" }}
                            >
                                <div className="mx-auto h-px w-24 bg-secondary/60" />
                                <p
                                    className="mt-5 text-[11px] font-medium uppercase tracking-[0.45em] text-primary-foreground/55"
                                >
                                    PSP · CAT {year} · Bogotá / Suba
                                </p>
                                <p
                                    className="mt-1 text-[10px] uppercase tracking-[0.3em] text-primary-foreground/35"
                                    style={{ fontFamily: SERIF, fontStyle: "italic", letterSpacing: "0.25em" }}
                                >
                                    {siteConfig.tagline}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CAPÍTULO I — FACHADAS */}
            <FachadasSection year={year} />
        </main>
    )
}
