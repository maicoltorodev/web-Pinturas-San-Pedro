import Image from "next/image"
import { RibbonBanner } from "@/components/catalogo-libro/ribbon-banner"

const SERIF = "var(--font-playfair), Georgia, 'Times New Roman', serif"

// Productos destacados del capítulo Fachadas (los 2 héroes — A y B)
const featured = [
    {
        letter: "A",
        name: "Vinilo Coraza Hidrofugado",
        image: "/productos/vinilo-hidrofugado.webp",
        description:
            "Pintura diluible en agua con acabado satinado y tecnología hidrofugada. Protege la fachada de la humedad, mantiene los espacios limpios y conserva su apariencia uniforme con el tiempo.",
        characteristics: [
            "Protección contra la humedad",
            "Acabado satinado uniforme",
            "Excelente cubrimiento",
            "Alta resistencia a la intemperie",
        ],
        presentations: ["Cuñete", "Galón", "Medio"],
    },
    {
        letter: "B",
        name: "Vinilo acrílico tipo 1 certificado",
        image: "/productos/vinilo-tipo-1-certificado.webp",
        description:
            "Producto acrílico de nivel superior con certificación NTC 1335, diseñado para acabados profesionales de gran resistencia y lavabilidad. Ideal para fachadas que exigen máxima durabilidad.",
        characteristics: [
            "Acabado mate lavable",
            "Cubrimiento excepcional",
            "Bajo olor",
            "Certificación NTC 1335",
        ],
        presentations: ["Cuñete", "Galón", "Medio"],
    },
] as const

// Complementarios para el capítulo (productos auxiliares)
const complementarios = [
    {
        name: "Anticorrosivo",
        image: "/productos/anticorrosivo.webp",
        note: "Para rejas, portones y elementos metálicos exteriores.",
    },
    {
        name: "Esmalte Especial",
        image: "/productos/esmalte-especial.webp",
        note: "Acabado durable para puertas y marcos en madera o metal.",
    },
    {
        name: "Estuco Plástico Acrílico",
        image: "/productos/estuco-plastico-acrilico.webp",
        note: "Preparación de muros antes de pintar. Nivela y sella.",
    },
] as const

// Color destacado del capítulo (chip estilo Pintuco)
const featuredSwatch = {
    code: "PSP-115",
    name: "Lino",
    hex: "#E8DAB7",
}

// Dots de marca, ligeros — sólo 4 esquinas para no competir con el contenido
const sectionDots = [
    { top: "-6%", left: "-4%", size: 200, opacity: 0.85 },
    { top: "8%", right: "-5%", size: 220, opacity: 0.88 },
    { bottom: "-5%", left: "10%", size: 180, opacity: 0.85 },
    { bottom: "-6%", right: "-4%", size: 240, opacity: 0.9 },
] as const

const SECTION_NOISE = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
        <filter id='n'>
            <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
            <feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0'/>
        </filter>
        <rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/>
    </svg>`,
)}`

/**
 * Sección "Fachadas" del catálogo. Diseño tipo Pintuco:
 * - Cinta diagonal con título de capítulo
 * - Hero image grande con swatch chip overlay
 * - Columna derecha con pill "¿Qué necesitas?" + 2 productos featured (A/B)
 * - Strip inferior de complementarios
 */
export function FachadasSection({ year }: { year: number }) {
    return (
        <section
            id="fachadas"
            className="relative overflow-hidden py-16 md:py-24"
            aria-label="Capítulo I — Fachadas"
        >
            {/* Background sutil: grano + 4 dots en esquinas */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("${SECTION_NOISE}")`,
                        backgroundSize: "240px 240px",
                    }}
                />
                {sectionDots.map((dot, i) => {
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
                            className="absolute rounded-full"
                            style={{
                                ...positionStyle,
                                backgroundColor: "var(--secondary)",
                                opacity: dot.opacity,
                            }}
                        />
                    )
                })}
            </div>

            {/* Cinta de título del capítulo (tilt invertido para variedad vs portada) */}
            <RibbonBanner
                eyebrow="Capítulo I"
                title="Fachadas"
                tilt={3}
                animationDelay={0}
            />

            {/* Contenido del capítulo */}
            <div className="container relative z-10 mx-auto px-4 pt-12 sm:px-6 md:pt-16 lg:px-8">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* COL IZQUIERDA: Hero image + swatch overlay */}
                    <div className="relative lg:col-span-7">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
                            <Image
                                src="/fachada.webp"
                                alt="Fachada profesional pintada con productos Pinturas San Pedro"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 60vw"
                            />

                            {/* Swatch overlay tipo Pintuco — círculo con código + nombre */}
                            <div className="absolute left-4 top-4 sm:left-6 sm:top-6 md:left-8 md:top-8">
                                <div
                                    className="flex h-32 w-32 flex-col items-center justify-center rounded-full text-center shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] sm:h-36 sm:w-36 md:h-40 md:w-40"
                                    style={{ backgroundColor: featuredSwatch.hex }}
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs">
                                        {featuredSwatch.code}
                                    </p>
                                    <p
                                        className="mt-1 text-base text-primary/90 sm:text-lg"
                                        style={{
                                            fontFamily: SERIF,
                                            fontStyle: "italic",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {featuredSwatch.name}
                                    </p>
                                </div>
                            </div>

                            {/* Pie de imagen */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 pt-16 sm:p-6 md:p-8">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/70">
                                    Inspiración real
                                </p>
                                <p
                                    className="mt-1 text-lg italic text-white/95 sm:text-xl"
                                    style={{ fontFamily: SERIF }}
                                >
                                    Una fachada que dura tanto como tu inversión.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* COL DERECHA: ¿Qué necesitas? + Productos A y B */}
                    <div className="lg:col-span-5">
                        {/* Pill "¿Qué necesitas?" */}
                        <div
                            className="mb-8 inline-flex items-center gap-3 rounded-full px-5 py-3 sm:px-6 sm:py-3.5"
                            style={{
                                backgroundColor: "var(--secondary)",
                                boxShadow: "0 10px 24px -6px rgba(0,0,0,0.35)",
                            }}
                        >
                            <span className="text-base font-black uppercase tracking-wider text-primary sm:text-lg">
                                ¿Qué necesitas?
                            </span>
                        </div>

                        <p className="mb-8 text-sm leading-relaxed text-primary-foreground/75">
                            Para una fachada que resista lluvia, sol y polvo de Bogotá, te recomendamos esta combinación. Pasa por el local en Suba para asesoría sobre cantidades y tonos.
                        </p>

                        {/* Productos featured */}
                        <div className="space-y-8">
                            {featured.map((p) => (
                                <article key={p.letter} className="relative flex gap-4 sm:gap-5">
                                    {/* Letra A/B circle badge */}
                                    <div className="flex shrink-0 flex-col items-center">
                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-black"
                                            style={{
                                                backgroundColor: "var(--secondary)",
                                                color: "var(--primary)",
                                                boxShadow: "0 6px 16px -4px rgba(0,0,0,0.4)",
                                            }}
                                        >
                                            {p.letter}
                                        </div>
                                    </div>

                                    {/* Imagen del producto */}
                                    <div className="relative h-28 w-24 shrink-0 sm:h-32 sm:w-28">
                                        <Image
                                            src={p.image}
                                            alt={p.name}
                                            fill
                                            className="object-contain"
                                            sizes="120px"
                                            style={{
                                                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))",
                                            }}
                                        />
                                    </div>

                                    {/* Texto */}
                                    <div className="flex-1">
                                        <h3 className="text-base font-bold text-primary-foreground sm:text-lg">
                                            {p.name}
                                        </h3>
                                        <p className="mt-2 text-[13px] leading-relaxed text-primary-foreground/75">
                                            {p.description}
                                        </p>
                                        <ul className="mt-3 space-y-1">
                                            {p.characteristics.map((c) => (
                                                <li
                                                    key={c}
                                                    className="flex items-start gap-2 text-[12px] text-primary-foreground/80"
                                                >
                                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-secondary" />
                                                    <span>{c}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-secondary">
                                            Presentaciones · {p.presentations.join(" / ")}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>

                {/* COMPLEMENTARIOS */}
                <div className="mx-auto mt-16 max-w-6xl">
                    <div className="mb-6 flex items-end justify-between gap-4 border-b border-primary-foreground/15 pb-3">
                        <h3 className="text-2xl font-black uppercase tracking-wider text-primary-foreground sm:text-3xl">
                            Complementarios
                        </h3>
                        <span
                            className="text-[10px] font-medium uppercase tracking-[0.4em] text-primary-foreground/50"
                            style={{ fontFamily: SERIF, fontStyle: "italic" }}
                        >
                            para terminar el trabajo bien
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {complementarios.map((c) => (
                            <div
                                key={c.name}
                                className="flex items-center gap-4 rounded-sm p-4"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                <div className="relative h-20 w-16 shrink-0">
                                    <Image
                                        src={c.image}
                                        alt={c.name}
                                        fill
                                        className="object-contain"
                                        sizes="80px"
                                        style={{
                                            filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.3))",
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-primary-foreground">
                                        {c.name}
                                    </h4>
                                    <p className="mt-1 text-[12px] leading-snug text-primary-foreground/70">
                                        {c.note}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pie del capítulo */}
                <div className="mx-auto mt-14 max-w-6xl text-center">
                    <div className="mx-auto h-px w-24 bg-secondary/60" />
                    <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.45em] text-primary-foreground/55">
                        PSP · CAT {year} · Capítulo I · Fachadas
                    </p>
                </div>
            </div>
        </section>
    )
}
