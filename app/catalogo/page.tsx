"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ChevronDown, MessageSquare, Paintbrush, PaintBucket, PaintRoller } from "lucide-react"
import { products } from "@/lib/constants/products"
import { siteConfig, whatsappUrls } from "@/lib/constants/site"
import type { Product } from "@/lib/types"
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
}

const SHOWROOM_IMAGES: Record<string, string> = {
    "vinilo-acrilico": "/productos_catalogo/vinilo-acrilico.png",
}

const TAGLINES: Record<string, string> = {
    "vinilo-acrilico": "Tu hogar, en su mejor versión.",
}

// Eyebrow corto que va arriba del nombre — comunica el "tipo" en mayúsculas
// sin saturar. Distinto del taglines (italic, debajo del nombre).
const EYEBROWS: Record<string, string> = {
    "vinilo-acrilico": "Línea Hogar",
}

export default function ShowroomPage() {
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
    const selectedProduct = selectedProductId
        ? products.find((p) => p.id === selectedProductId) ?? null
        : null

    const openProduct = useCallback((productId: string) => {
        setSelectedProductId(productId)
    }, [])

    const closeProduct = useCallback(() => {
        setSelectedProductId(null)
    }, [])

    return (
        <div
            className="relative bg-black"
            style={{ height: "100dvh", width: "100vw", overflow: "hidden" }}
        >
            {/* Contenedor scroll-snap principal */}
            <main
                className="scrollbar-hide"
                style={{
                    height: "100dvh",
                    width: "100vw",
                    overflowY: "scroll",
                    scrollSnapType: "y mandatory",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                <CoverSection />
                <FachadasSection onProductClick={openProduct} />
            </main>

            <ProductOverlay product={selectedProduct} onClose={closeProduct} />
        </div>
    )
}

/**
 * Tema por defecto para productos sin theme explícito en THEMES.
 * Mantiene el lenguaje visual de marca (azul + amarillo).
 */
const DEFAULT_THEME: Theme = {
    bg: "linear-gradient(180deg, #04081c 0%, #0e1a45 55%, #15287a 100%)",
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
        { hex: "#1d4ed8", name: "Azul" },
    ],
}

/**
 * Overlay del producto. Slide-in desde la derecha al click.
 * Mantiene el contenido renderizado durante la salida para que el slide-out
 * se vea fluido.
 */
function ProductOverlay({ product, onClose }: { product: Product | null; onClose: () => void }) {
    const isOpen = !!product
    const [renderedProduct, setRenderedProduct] = useState<Product | null>(product)

    useEffect(() => {
        if (product) {
            setRenderedProduct(product)
        } else {
            const t = setTimeout(() => setRenderedProduct(null), 420)
            return () => clearTimeout(t)
        }
    }, [product])

    const theme = renderedProduct
        ? (THEMES[renderedProduct.id] ?? DEFAULT_THEME)
        : DEFAULT_THEME

    return (
        <div
            role="dialog"
            aria-modal={isOpen}
            aria-hidden={!isOpen}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                transform: isOpen ? "translateX(0)" : "translateX(100%)",
                transition: "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)",
                background: theme.bg,
                color: theme.text,
                overflow: "hidden",
                pointerEvents: isOpen ? "auto" : "none",
                willChange: "transform",
            }}
        >
            {/* Botón Volver */}
            <button
                type="button"
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: "calc(env(safe-area-inset-top, 0px) + 1.25rem)",
                    left: "calc(env(safe-area-inset-left, 0px) + 1.25rem)",
                    zIndex: 50,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.55rem 0.9rem",
                    borderRadius: "999px",
                    backgroundColor: theme.onDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)",
                    border: `1px solid ${theme.onDark ? "rgba(255,255,255,0.20)" : "rgba(0,0,0,0.12)"}`,
                    color: theme.text,
                    cursor: "pointer",
                    font: "inherit",
                    WebkitTapHighlightColor: "transparent",
                    backdropFilter: "blur(8px)",
                }}
            >
                <ArrowLeft style={{ width: "16px", height: "16px" }} />
                <span style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                }}>
                    Volver
                </span>
            </button>

            {renderedProduct && <ProductView product={renderedProduct} theme={theme} />}

            {/* CTA grande — WhatsApp para cotizar */}
            {renderedProduct && (
                <a
                    href={whatsappUrls.product(renderedProduct.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.7rem",
                        backgroundColor: "#25D366",
                        color: "#ffffff",
                        padding: "clamp(0.95rem, 2.4vh, 1.25rem) 1.25rem",
                        paddingBottom: "max(env(safe-area-inset-bottom, 0px), clamp(0.95rem, 2.4vh, 1.25rem))",
                        fontWeight: 900,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        fontSize: "clamp(13px, 3vw, 16px)",
                        textDecoration: "none",
                        boxShadow: "0 -12px 30px rgba(0,0,0,0.32)",
                        transition: "background-color 200ms ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#20bd5a" }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#25D366" }}
                >
                    <MessageSquare style={{ width: "20px", height: "20px", flexShrink: 0 }} />
                    <span>Cotizar este producto</span>
                </a>
            )}
        </div>
    )
}

/**
 * Vista interior del producto — el "showroom" original.
 */
function ProductView({ product, theme }: { product: Product; theme: Theme }) {
    return (
        <div
            className="relative flex flex-col items-center"
            style={{
                height: "100dvh",
                width: "100vw",
                overflow: "hidden",
            }}
        >
            {/* Capa de textura sutil */}
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
                className="absolute pointer-events-none rounded-full"
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

            {/* CONTENIDO PRINCIPAL */}
            <div
                className={cn(
                    "relative z-10 flex flex-col items-center w-full h-full",
                    "px-5 sm:px-8 md:px-12",
                    "pt-[calc(env(safe-area-inset-top,0px)+4.5rem)] pb-[calc(env(safe-area-inset-bottom,0px)+5.5rem)]",
                    "max-w-[640px] md:max-w-[860px] lg:max-w-[960px] mx-auto"
                )}
            >
                {/* EYEBROW */}
                <div className="flex items-center gap-3 self-start mb-3 md:mb-5">
                    <span
                        className="h-px w-10 md:w-14"
                        style={{ backgroundColor: theme.accent, opacity: 0.6 }}
                    />
                    <span
                        className="text-[10px] md:text-xs font-black uppercase tracking-[0.32em]"
                        style={{ color: theme.accent }}
                    >
                        {EYEBROWS[product.id] ?? product.category}
                    </span>
                </div>

                {/* NOMBRE MEGA */}
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
                {TAGLINES[product.id] && (
                    <p
                        className="self-start italic font-medium mt-2 md:mt-3"
                        style={{
                            color: theme.textMuted,
                            fontSize: "clamp(0.95rem, 2.6vw, 1.2rem)",
                        }}
                    >
                        {TAGLINES[product.id]}
                    </p>
                )}

                {/* CUÑETE HERO */}
                <div className="relative w-full flex items-end justify-center mt-3 md:mt-5 flex-1 min-h-0">
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
                            quality={90}
                        />
                    </div>
                </div>

                {/* COLORES + PRESENTACIONES */}
                <div className="self-stretch mt-3 md:mt-4 flex flex-col gap-3 md:gap-4">
                    <div>
                        <p
                            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.34em] mb-2"
                            style={{ color: theme.textMuted }}
                        >
                            Colores disponibles
                        </p>
                        <div className="flex items-center gap-2 md:gap-3">
                            {theme.swatches.map((c) => (
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

function CoverSection() {
    return (
        <section
            role="region"
            aria-label="Portada del catálogo"
            style={{
                position: "relative",
                background: "var(--color-primary)",
                height: "100dvh",
                width: "100vw",
                overflow: "hidden",
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
            }}
        >
            <style>{`
                @keyframes coverFade   { from { opacity: 0; }                                              to { opacity: 1; } }
                @keyframes coverUp     { from { opacity: 0; transform: translateY(18px); }                 to { opacity: 1; transform: translateY(0); } }
                @keyframes coverLogo   { from { opacity: 0; transform: translateY(-50%) scale(0.94); }     to { opacity: 1; transform: translateY(-50%) scale(1); } }
                @keyframes coverCinta  { from { opacity: 0; transform: translateY(calc(-50% - 26px)) rotate(-8deg); }
                                          to { opacity: 1; transform: translateY(-50%) rotate(-8deg); } }
                @keyframes coverNudge  { 0%,100% { transform: translateY(0); opacity: 0.55; } 50% { transform: translateY(7px); opacity: 1; } }
                @keyframes coverFloat  { 0%,100% { transform: translateY(0); }                50% { transform: translateY(-5px); } }
                @keyframes coverPulse  { 0%,100% { opacity: 0.25; } 35% { opacity: 1; } 70% { opacity: 0.25; } }
                @keyframes pagePulse   { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
                @media (prefers-reduced-motion: reduce) {
                    .cv-anim { animation: none !important; opacity: 1 !important; }
                }
            `}</style>

            {/* Link Inicio — esquina superior izquierda */}
            <a
                href="/"
                className="cv-anim"
                style={{
                    position: "absolute",
                    top: "calc(env(safe-area-inset-top, 0px) + 1.25rem)",
                    left: "calc(env(safe-area-inset-left, 0px) + 1.25rem)",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                    animation: "coverFade 0.6s ease 0.15s both",
                }}
            >
                <ArrowLeft style={{
                    width: "clamp(14px, 3.4vw, 18px)",
                    height: "clamp(14px, 3.4vw, 18px)",
                    color: "var(--color-secondary)",
                }} />
                <span style={{
                    fontSize: "clamp(10px, 2.4vw, 12px)",
                    fontWeight: 800,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.85)",
                }}>
                    Página Web
                </span>
            </a>

            {/* Marco interior tipo "página" */}
            <div
                aria-hidden
                className="cv-anim"
                style={{
                    position: "absolute",
                    top: "calc(env(safe-area-inset-top, 0px) + 7px)",
                    right: "calc(env(safe-area-inset-right, 0px) + 7px)",
                    bottom: "calc(env(safe-area-inset-bottom, 0px) + 7px)",
                    left: "calc(env(safe-area-inset-left, 0px) + 7px)",
                    border: "1px solid color-mix(in srgb, var(--color-secondary) 38%, transparent)",
                    pointerEvents: "none",
                    zIndex: 0,
                    animation: "coverFade 0.9s ease 0.4s both",
                }}
            />

            {/* Círculos amarillos sólidos — referencia a la fachada del local */}
            <div
                aria-hidden
                className="cv-anim"
                style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    animation: "coverFade 0.8s ease 0.1s both",
                }}
            >
                {/* Semicírculo grande arriba-derecha (sale del borde) */}
                <div style={{
                    position: "absolute",
                    top: "-12vw",
                    right: "-12vw",
                    width: "42vw",
                    height: "42vw",
                    maxWidth: "420px",
                    maxHeight: "420px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                }} />
                {/* Punto mediano arriba-izquierda */}
                <div style={{
                    position: "absolute",
                    top: "14vh",
                    left: "8vw",
                    width: "10vw",
                    height: "10vw",
                    maxWidth: "90px",
                    maxHeight: "90px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                }} />
                {/* Punto chico medio-derecha */}
                <div style={{
                    position: "absolute",
                    top: "44vh",
                    right: "12vw",
                    width: "5vw",
                    height: "5vw",
                    maxWidth: "44px",
                    maxHeight: "44px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                }} />
                {/* Círculo grande abajo-izquierda (sale del borde) */}
                <div style={{
                    position: "absolute",
                    bottom: "-10vw",
                    left: "-10vw",
                    width: "34vw",
                    height: "34vw",
                    maxWidth: "340px",
                    maxHeight: "340px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                }} />
                {/* Punto mediano abajo-centro */}
                <div style={{
                    position: "absolute",
                    bottom: "18vh",
                    right: "28vw",
                    width: "7vw",
                    height: "7vw",
                    maxWidth: "60px",
                    maxHeight: "60px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                }} />
            </div>

            {/* Logo + lema centrados al medio absoluto */}
            <div
                className="cv-anim"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "clamp(0.75rem, 2.2vh, 1.25rem)",
                    padding: "0 1.5rem",
                    animation: "coverLogo 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both",
                }}
            >
                <div
                    className="cv-anim"
                    style={{
                        position: "relative",
                        width: "min(78vw, 520px)",
                        aspectRatio: "2 / 1",
                        filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.45))",
                        animation: "coverFloat 5s ease-in-out 1.5s infinite",
                        willChange: "transform",
                    }}
                >
                    <Image
                        src="/logo.webp"
                        alt="Pinturas San Pedro"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 78vw, 520px"
                        priority
                        quality={90}
                    />
                </div>

                {/* Lema con líneas a los lados (estilo hero) */}
                <div
                    className="cv-anim"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.75rem",
                        animation: "coverUp 0.7s ease 0.85s both",
                    }}
                >
                    <span style={{
                        display: "block",
                        width: "clamp(36px, 10vw, 64px)",
                        height: "1px",
                        backgroundColor: "rgba(255,255,255,0.85)",
                    }} />
                    <span style={{
                        fontSize: "clamp(1rem, 4vw, 1.875rem)",
                        fontWeight: 700,
                        fontStyle: "italic",
                        color: "#ffffff",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        whiteSpace: "nowrap",
                    }}>
                        {siteConfig.tagline}
                    </span>
                    <span style={{
                        display: "block",
                        width: "clamp(36px, 10vw, 64px)",
                        height: "1px",
                        backgroundColor: "rgba(255,255,255,0.85)",
                    }} />
                </div>
            </div>

            {/* Cinta delgada diagonal con texto */}
            <div
                className="cv-anim"
                style={{
                    position: "absolute",
                    top: "25%",
                    left: "-12%",
                    width: "124%",
                    height: "clamp(64px, 11vh, 96px)",
                    background: "linear-gradient(180deg, #fde68a 0%, var(--color-secondary) 45%, #b45309 100%)",
                    transform: "translateY(-50%) rotate(-8deg)",
                    boxShadow:
                        "0 14px 32px rgba(0,0,0,0.32), " +
                        "inset 0 1px 0 rgba(255,255,255,0.55), " +
                        "inset 0 -2px 0 rgba(120,53,15,0.25)",
                    zIndex: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    overflow: "hidden",
                    animation: "coverCinta 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both",
                }}
            >
                {/* Línea de costura superior */}
                <div aria-hidden style={{
                    position: "absolute",
                    top: "6px",
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "rgba(120,53,15,0.35)",
                }} />
                {/* Línea de costura inferior */}
                <div aria-hidden style={{
                    position: "absolute",
                    bottom: "6px",
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "rgba(120,53,15,0.35)",
                }} />
                <PaintBucket
                    aria-hidden
                    strokeWidth={2.25}
                    style={{
                        width: "clamp(22px, 5.2vw, 34px)",
                        height: "clamp(22px, 5.2vw, 34px)",
                        color: "var(--color-primary)",
                        flexShrink: 0,
                        position: "relative",
                        zIndex: 1,
                        filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.25))",
                    }}
                />
                <span style={{
                    fontSize: "clamp(1.5rem, 6vw, 2.8rem)",
                    fontWeight: 900,
                    fontStyle: "italic",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--color-primary)",
                    whiteSpace: "nowrap",
                    textShadow: "0 1px 0 rgba(255,255,255,0.25)",
                    position: "relative",
                    zIndex: 1,
                    lineHeight: 1,
                }}>
                    Catálogo · 2026
                </span>
                <Paintbrush
                    aria-hidden
                    strokeWidth={2.25}
                    style={{
                        width: "clamp(22px, 5.2vw, 34px)",
                        height: "clamp(22px, 5.2vw, 34px)",
                        color: "var(--color-primary)",
                        flexShrink: 0,
                        position: "relative",
                        zIndex: 1,
                        filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.25))",
                    }}
                />
            </div>

            {/* Detalle lateral izquierdo — marca/ubicación vertical */}
            <div
                className="cv-anim"
                style={{
                    position: "absolute",
                    left: "calc(env(safe-area-inset-left, 0px) + 0.85rem)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.6rem",
                    pointerEvents: "none",
                    animation: "coverFade 0.7s ease 1.3s both",
                }}
            >
                <span style={{
                    display: "block",
                    width: "1px",
                    height: "16px",
                    backgroundColor: "var(--color-secondary)",
                    opacity: 0.85,
                }} />
                <span style={{
                    writingMode: "vertical-rl",
                    fontSize: "clamp(8.5px, 2vw, 10.5px)",
                    fontWeight: 700,
                    letterSpacing: "0.34em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    whiteSpace: "nowrap",
                }}>
                    Bogotá · Colombia
                </span>
            </div>

            {/* Indicador de página — esquina inferior derecha */}
            <div
                className="cv-anim"
                style={{
                    position: "absolute",
                    right: "calc(env(safe-area-inset-right, 0px) + 1.25rem)",
                    bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    pointerEvents: "none",
                    animation: "coverFade 0.7s ease 1.3s both",
                }}
            >
                <span style={{
                    display: "block",
                    width: "20px",
                    height: "1px",
                    backgroundColor: "var(--color-secondary)",
                    opacity: 0.85,
                }} />
                <span style={{
                    fontSize: "clamp(11px, 2.6vw, 14px)",
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.78)",
                    fontVariantNumeric: "tabular-nums",
                }}>
                    <span
                        className="cv-anim"
                        style={{ animation: "pagePulse 2.2s ease-in-out infinite" }}
                    >
                        01
                    </span>
                    <span style={{ opacity: 0.45, margin: "0 0.3em" }}>/</span>
                    <span style={{ opacity: 0.55 }}>02</span>
                </span>
            </div>

            {/* Indicador "Desliza" animado — centrado en el espacio bajo logo+lema */}
            <div
                className="cv-anim"
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "80%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    pointerEvents: "none",
                    animation: "coverFade 0.6s ease 1.15s both",
                }}
            >
                <span style={{
                    fontSize: "clamp(9px, 2.2vw, 11px)",
                    fontWeight: 800,
                    letterSpacing: "0.42em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                }}>
                    Desliza
                </span>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    {[0, 0.15, 0.3].map((delay, i) => (
                        <ChevronDown
                            key={i}
                            className="cv-anim"
                            style={{
                                width: "clamp(18px, 4vw, 22px)",
                                height: "clamp(18px, 4vw, 22px)",
                                color: "#ffffff",
                                marginTop: i === 0 ? 0 : "-10px",
                                animation: `coverPulse 1.8s ease-in-out ${delay}s infinite`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

/**
 * Página interna #1 — Fachadas.
 * Mantiene el lenguaje visual de la portada: fondo azul, círculos amarillos,
 * cinta amarilla con la misma textura, marco interior, blanco/amarillo en
 * tipografía. La estructura del Pintuco (foto + A/B + complementarios) la
 * leemos como SISTEMA, no como look-and-feel.
 */
function FachadasSection({ onProductClick }: { onProductClick: (id: string) => void }) {
    const vinilo = products.find((p) => p.id === "vinilo-acrilico")
    const anti = products.find((p) => p.id === "anticorrosivo")
    const estuco = products.find((p) => p.id === "estuco-plastico-acrilico")
    const brocha = products.find((p) => p.id === "brocha-cerda-premium")
    const rodillo = products.find((p) => p.id === "rodillo-profesional-9''-anillo")

    const [flashedLabel, setFlashedLabel] = useState<string | null>(null)
    const flashCard = useCallback((label: string) => {
        setFlashedLabel(null)
        // Delay micro para que el className se "resetée" y la animación se re-dispare en clicks consecutivos
        requestAnimationFrame(() => setFlashedLabel(label))
        const t = window.setTimeout(() => setFlashedLabel(null), 1250)
        return () => clearTimeout(t)
    }, [])

    if (!vinilo || !anti) return null

    const handleClick = (id: string) => () => onProductClick(id)

    const mainCards = [
        { label: "A", product: vinilo, blurb: "Mate de alta cobertura para muros exteriores." },
        { label: "B", product: anti, blurb: "Protege rejas, portones y estructuras metálicas." },
    ]
    const complementarios = [
        { label: "C", product: estuco, name: "Estuco Acrílico" },
        { label: "D", product: brocha, name: "Brocha Premium" },
        { label: "E", product: rodillo, name: "Rodillo Profesional" },
    ].filter((c) => c.product)

    return (
        <section
            role="region"
            aria-label="Fachadas — Página 02"
            style={{
                position: "relative",
                background: "var(--color-primary)",
                color: "#ffffff",
                height: "100dvh",
                width: "100vw",
                overflow: "hidden",
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <style>{`
                @keyframes facFade   { from { opacity: 0; }                                                 to { opacity: 1; } }
                @keyframes facUp     { from { opacity: 0; transform: translateY(18px); }                    to { opacity: 1; transform: translateY(0); } }
                @keyframes facDown   { from { opacity: 0; transform: translateY(-14px); }                   to { opacity: 1; transform: translateY(0); } }
                @keyframes facMarker { from { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }    to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
                @keyframes facPing   { 0% { transform: scale(1); opacity: 0.55; } 100% { transform: scale(2.4); opacity: 0; } }
                @keyframes pagePulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
                @keyframes facFlash  {
                    0%, 100% { transform: translateY(0);   border-color: rgba(251,191,36,0.22); box-shadow: 0 0 0 0 rgba(251,191,36,0); }
                    25%, 65% { transform: translateY(-5px); border-color: rgba(251,191,36,1);    box-shadow: 0 14px 32px rgba(251,191,36,0.45); }
                }
                .fac-card-flash { animation: facFlash 1.2s ease-in-out; }
                @media (prefers-reduced-motion: reduce) {
                    .fac-anim { animation: none !important; opacity: 1 !important; }
                    .fac-card-flash { animation: none !important; }
                }
            `}</style>

            {/* Círculos amarillos de marca (más sutiles que la portada) */}
            <div
                aria-hidden
                className="fac-anim"
                style={{
                    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
                    animation: "facFade 0.8s ease 0.1s both",
                }}
            >
                <div style={{
                    position: "absolute",
                    top: "-14vw", right: "-14vw",
                    width: "36vw", height: "36vw",
                    maxWidth: "340px", maxHeight: "340px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                    opacity: 0.85,
                }} />
                <div style={{
                    position: "absolute",
                    bottom: "-12vw", left: "-12vw",
                    width: "30vw", height: "30vw",
                    maxWidth: "280px", maxHeight: "280px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                    opacity: 0.85,
                }} />
                <div style={{
                    position: "absolute",
                    top: "38vh", right: "6vw",
                    width: "5vw", height: "5vw",
                    maxWidth: "44px", maxHeight: "44px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                }} />
            </div>

            {/* Marco interior */}
            <div
                aria-hidden
                className="fac-anim"
                style={{
                    position: "absolute",
                    inset: "7px",
                    border: "1px solid color-mix(in srgb, var(--color-secondary) 38%, transparent)",
                    pointerEvents: "none",
                    zIndex: 1,
                    animation: "facFade 0.7s ease 0.05s both",
                }}
            />

            {/* Banda amarilla con título — mismo lenguaje de la cinta de portada */}
            <div
                className="fac-anim"
                style={{
                    position: "relative",
                    zIndex: 5,
                    background: "linear-gradient(180deg, #fde68a 0%, var(--color-secondary) 45%, #b45309 100%)",
                    animation: "facDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both",
                    boxShadow:
                        "0 10px 24px rgba(0,0,0,0.28), " +
                        "inset 0 1px 0 rgba(255,255,255,0.55), " +
                        "inset 0 -2px 0 rgba(120,53,15,0.25)",
                    padding: "clamp(0.9rem, 3.2vh, 1.3rem) clamp(1.5rem, 5vw, 2.5rem)",
                    paddingTop: "calc(env(safe-area-inset-top, 0px) + clamp(0.9rem, 3.2vh, 1.3rem))",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "clamp(0.6rem, 2vw, 1rem)",
                }}
            >
                {/* Líneas de costura */}
                <div aria-hidden style={{
                    position: "absolute",
                    top: "6px",
                    left: 0, right: 0,
                    height: "1px",
                    background: "rgba(120,53,15,0.30)",
                }} />
                <div aria-hidden style={{
                    position: "absolute",
                    bottom: "6px",
                    left: 0, right: 0,
                    height: "1px",
                    background: "rgba(120,53,15,0.30)",
                }} />
                <h2
                    style={{
                        margin: 0,
                        fontStyle: "italic",
                        fontWeight: 900,
                        fontSize: "clamp(1.5rem, 6vw, 2.8rem)",
                        lineHeight: 1,
                        letterSpacing: "0.02em",
                        textTransform: "uppercase",
                        color: "var(--color-primary)",
                        textShadow: "0 1px 0 rgba(255,255,255,0.3)",
                    }}
                >
                    Fachadas
                </h2>
                <PaintRoller
                    aria-hidden
                    strokeWidth={2.25}
                    style={{
                        width: "clamp(28px, 7vw, 42px)",
                        height: "clamp(28px, 7vw, 42px)",
                        color: "var(--color-primary)",
                        flexShrink: 0,
                        filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.3))",
                    }}
                />
            </div>

            {/* Hero foto con marcadores */}
            <div
                className="fac-anim"
                style={{
                    position: "relative",
                    zIndex: 4,
                    flex: "0 0 auto",
                    height: "clamp(220px, 36vh, 360px)",
                    margin: "clamp(0.7rem, 1.8vh, 1.1rem) clamp(0.85rem, 3vw, 1.5rem) 0",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.45)",
                    border: "1px solid color-mix(in srgb, var(--color-secondary) 30%, transparent)",
                    backgroundColor: "#0a0e22",
                    animation: "facUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both",
                }}
            >
                <Image
                    src="/fachada.webp"
                    alt="Fachada exterior pintada"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 92vw, 720px"
                    quality={85}
                />

                <Marker
                    label="A"
                    className="fac-anim"
                    onClick={() => flashCard("A")}
                    pingDelay="1.4s"
                    style={{
                        top: "32%",
                        left: "20%",
                        animation: "facMarker 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.85s both",
                    }}
                />
                <Marker
                    label="B"
                    className="fac-anim"
                    onClick={() => flashCard("B")}
                    pingDelay="2.5s"
                    style={{
                        top: "62%",
                        right: "18%",
                        animation: "facMarker 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.95s both",
                    }}
                />

                {/* Chip de color flotante */}
                <div
                    className="fac-anim"
                    style={{
                        position: "absolute",
                        top: "0.75rem",
                        right: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.4rem 0.65rem 0.4rem 0.4rem",
                        borderRadius: "999px",
                        backgroundColor: "rgba(11,21,48,0.85)",
                        border: "1px solid rgba(251,191,36,0.5)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
                        animation: "facFade 0.5s ease 1.05s both",
                    }}
                >
                    <span style={{
                        display: "block",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-primary)",
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)",
                    }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                        <span style={{
                            fontSize: "8px",
                            fontWeight: 800,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.55)",
                            lineHeight: 1,
                        }}>
                            PSP-001
                        </span>
                        <span style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "var(--color-secondary)",
                            lineHeight: 1,
                        }}>
                            Azul San Pedro
                        </span>
                    </div>
                </div>
            </div>

            {/* Productos principales */}
            <div
                className="fac-anim"
                style={{
                    position: "relative",
                    zIndex: 4,
                    flex: "1 1 auto",
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                    padding: "clamp(0.7rem, 1.8vh, 1.1rem) clamp(0.85rem, 3vw, 1.5rem) 0",
                    animation: "facUp 0.7s ease 0.7s both",
                    gap: "clamp(0.5rem, 1.2vh, 0.8rem)",
                }}
            >
                <SubHeader text="¿Qué necesitas?" emphasis />

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "clamp(0.5rem, 2vw, 0.85rem)",
                    flex: "1 1 auto",
                    minHeight: 0,
                }}>
                    {mainCards.map(({ label, product, blurb }) => (
                        <ProductCard
                            key={label}
                            label={label}
                            image={product.image}
                            name={product.name}
                            blurb={blurb}
                            onClick={handleClick(product.id)}
                            flashing={flashedLabel === label}
                        />
                    ))}
                </div>
            </div>

            {/* Complementarios */}
            <div
                className="fac-anim"
                style={{
                    position: "relative",
                    zIndex: 4,
                    flex: "0 0 auto",
                    padding: "clamp(0.7rem, 1.8vh, 1.1rem) clamp(0.85rem, 3vw, 1.5rem) clamp(2.2rem, 5vh, 2.6rem)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    animation: "facUp 0.7s ease 1s both",
                }}
            >
                <SubHeader text="Complementarios" />

                <div style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${complementarios.length}, 1fr)`,
                    gap: "clamp(0.4rem, 1.5vw, 0.7rem)",
                }}>
                    {complementarios.map(({ label, product, name }) => (
                        <MiniCard
                            key={label}
                            label={label}
                            image={product!.image}
                            name={name}
                        />
                    ))}
                </div>
            </div>

            {/* Indicador de página — mismo estilo que la portada */}
            <div
                className="fac-anim"
                style={{
                    position: "absolute",
                    right: "calc(env(safe-area-inset-right, 0px) + 1.25rem)",
                    bottom: "calc(env(safe-area-inset-bottom, 0px) + 0.85rem)",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    pointerEvents: "none",
                    animation: "facFade 0.6s ease 1.25s both",
                }}
            >
                <span style={{
                    display: "block",
                    width: "20px",
                    height: "1px",
                    backgroundColor: "var(--color-secondary)",
                    opacity: 0.85,
                }} />
                <span style={{
                    fontSize: "clamp(11px, 2.6vw, 14px)",
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.78)",
                    fontVariantNumeric: "tabular-nums",
                }}>
                    <span
                        className="fac-anim"
                        style={{ animation: "pagePulse 2.2s ease-in-out infinite" }}
                    >
                        02
                    </span>
                    <span style={{ opacity: 0.45, margin: "0 0.3em" }}>/</span>
                    <span style={{ opacity: 0.55 }}>02</span>
                </span>
            </div>
        </section>
    )
}

function SubHeader({ text, emphasis = false }: { text: string; emphasis?: boolean }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ display: "block", width: "22px", height: "2px", background: "var(--color-secondary)" }} />
            <h3 style={{
                margin: 0,
                fontSize: emphasis ? "clamp(10px, 2.4vw, 12px)" : "clamp(9px, 2.2vw, 11px)",
                fontWeight: 800,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: emphasis ? "var(--color-secondary)" : "rgba(255,255,255,0.65)",
            }}>
                {text}
            </h3>
        </div>
    )
}

function Marker({
    label,
    style,
    className,
    onClick,
    pingDelay = "1.4s",
}: {
    label: string
    style: React.CSSProperties
    className?: string
    onClick?: () => void
    pingDelay?: string
}) {
    return (
        <button
            type="button"
            aria-label={`Ver producto ${label}`}
            onClick={onClick}
            className={className}
            style={{
                position: "absolute",
                width: "clamp(28px, 7vw, 36px)",
                height: "clamp(28px, 7vw, 36px)",
                borderRadius: "50%",
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "clamp(13px, 3vw, 16px)",
                border: "2px solid #ffffff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                transform: "translate(-50%, -50%)",
                cursor: onClick ? "pointer" : "default",
                font: "inherit",
                padding: 0,
                WebkitTapHighlightColor: "transparent",
                ...style,
            }}
        >
            {/* Ring expandiéndose (pulso loop) */}
            <span
                aria-hidden
                style={{
                    position: "absolute",
                    inset: "-3px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                    animation: `facPing 2.4s ease-out ${pingDelay} infinite`,
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
        </button>
    )
}

function ProductCard({ label, image, name, blurb, onClick, flashing = false }: { label: string; image: string; name: string; blurb: string; onClick?: () => void; flashing?: boolean }) {
    const clickable = !!onClick
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={!clickable}
            className={flashing ? "fac-card-flash" : undefined}
            style={{
                position: "relative",
                backgroundColor: "rgba(255,255,255,0.06)",
                borderRadius: "14px",
                padding: "clamp(0.7rem, 2vw, 1.2rem)",
                border: "1px solid rgba(251,191,36,0.22)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(0.5rem, 1.4vh, 1rem)",
                minHeight: 0,
                overflow: "hidden",
                font: "inherit",
                color: "inherit",
                cursor: clickable ? "pointer" : "default",
                textAlign: "left",
                width: "100%",
                WebkitTapHighlightColor: "transparent",
                transition: "transform 200ms ease, border-color 200ms ease, background-color 200ms ease",
            }}
            onMouseEnter={(e) => {
                if (!clickable) return
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.borderColor = "rgba(251,191,36,0.5)"
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.09)"
            }}
            onMouseLeave={(e) => {
                if (!clickable) return
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.borderColor = "rgba(251,191,36,0.22)"
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)"
            }}
        >
            {/* Letra en círculo amarillo — mismo estilo que los marcadores de la foto */}
            <span style={{
                position: "absolute",
                top: "clamp(8px, 1.5vw, 14px)",
                left: "clamp(8px, 1.5vw, 14px)",
                width: "clamp(22px, 4.5vw, 34px)",
                height: "clamp(22px, 4.5vw, 34px)",
                borderRadius: "50%",
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(11px, 2.4vw, 16px)",
                fontWeight: 900,
                border: "2px solid #ffffff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}>
                {label}
            </span>
            {/* Imagen — flex 1 para llenar el espacio disponible */}
            <div style={{
                position: "relative",
                width: "100%",
                flex: "1 1 auto",
                minHeight: "90px",
                maxHeight: "clamp(110px, 22vh, 280px)",
                filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.4))",
            }}>
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 40vw, 280px"
                    quality={85}
                />
            </div>
            {/* Nombre */}
            <h4 style={{
                margin: 0,
                fontSize: "clamp(11px, 2.6vw, 17px)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.2,
                textAlign: "center",
            }}>
                {name}
            </h4>
            {/* Blurb — oculto en mobile, visible desde sm: */}
            <p
                className="hidden sm:block"
                style={{
                    margin: 0,
                    fontSize: "clamp(9px, 2.2vw, 13px)",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.4,
                    textAlign: "center",
                    maxWidth: "30ch",
                }}
            >
                {blurb}
            </p>
        </button>
    )
}

function MiniCard({ label, image, name, onClick }: { label: string; image: string; name: string; onClick?: () => void }) {
    const clickable = !!onClick
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={!clickable}
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(0.35rem, 0.9vh, 0.6rem)",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "clamp(0.55rem, 1.5vw, 1rem) clamp(0.4rem, 1.2vw, 0.85rem)",
                border: "1px solid rgba(251,191,36,0.18)",
                minHeight: "clamp(90px, 12vh, 160px)",
                overflow: "hidden",
                font: "inherit",
                color: "inherit",
                cursor: clickable ? "pointer" : "default",
                width: "100%",
                WebkitTapHighlightColor: "transparent",
                transition: "transform 200ms ease, border-color 200ms ease, background-color 200ms ease",
            }}
            onMouseEnter={(e) => {
                if (!clickable) return
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.borderColor = "rgba(251,191,36,0.45)"
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"
            }}
            onMouseLeave={(e) => {
                if (!clickable) return
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.borderColor = "rgba(251,191,36,0.18)"
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"
            }}
        >
            <span style={{
                position: "absolute",
                top: "6px",
                left: "6px",
                width: "clamp(18px, 3.4vw, 26px)",
                height: "clamp(18px, 3.4vw, 26px)",
                borderRadius: "50%",
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(9px, 2vw, 13px)",
                fontWeight: 900,
                border: "2px solid #ffffff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                zIndex: 1,
            }}>
                {label}
            </span>
            <div style={{
                position: "relative",
                width: "clamp(40px, 9vw, 78px)",
                aspectRatio: "1 / 1",
                flexShrink: 0,
                filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.4))",
            }}>
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain"
                    sizes="80px"
                    quality={80}
                />
            </div>
            <span style={{
                fontSize: "clamp(9px, 2vw, 12.5px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.2,
                textAlign: "center",
                minWidth: 0,
            }}>
                {name}
            </span>
        </button>
    )
}
