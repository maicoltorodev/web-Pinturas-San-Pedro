import Image from "next/image"
import { siteConfig } from "@/lib/constants/site"
import { blurDataURL } from "@/lib/image-utils"

const SERIF = "var(--font-playfair), Georgia, 'Times New Roman', serif"

type RibbonBannerProps = {
    /** Texto pequeño en serif italic arriba — ej "El color que transforma" o "Capítulo I" */
    eyebrow?: string
    /** Título grande sans bold — ej "Catálogo 2026", "Vinilos & Acrílicos" */
    title: string
    /** Mostrar logo a la izquierda. Por defecto true. */
    showLogo?: boolean
    /** Rotación de la cinta. Default -6deg para presencia editorial real. */
    tilt?: number
    /** Animation delay (cover-rise stagger). Default 140ms. */
    animationDelay?: number
}

/**
 * Cinta diagonal con pliegue real reutilizable.
 *
 * Estructura:
 * - Contenedor exterior: ancho 100vw + extends para verse infinita.
 * - Cuerpo principal con gradient dorado de marca + textura sutil.
 * - Banda de highlight horizontal (simula reflejo en cinta satinada).
 * - Pliegues triangulares dark en ambos extremos (simula la cinta plegándose hacia atrás).
 * - Sombra dual: una corta debajo (lift) + una larga proyectada (depth).
 * - Contenido contra-rotado para mantenerse horizontal.
 */
export function RibbonBanner({
    eyebrow,
    title,
    showLogo = true,
    tilt = -6,
    animationDelay = 140,
}: RibbonBannerProps) {
    return (
        <div
            className="cover-rise relative left-1/2 my-8 -translate-x-1/2 md:my-12"
            style={{ animationDelay: `${animationDelay}ms`, width: "140vw" }}
        >
            <div
                className="relative"
                style={{
                    transform: `rotate(${tilt}deg)`,
                    filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.45)) drop-shadow(0 8px 16px rgba(0,0,0,0.3))",
                }}
            >
                {/* Pliegue izquierdo (triangulo dark, simula cinta doblándose hacia atrás) */}
                <div
                    aria-hidden="true"
                    className="absolute -left-1 top-full -translate-y-[1px]"
                    style={{
                        width: 0,
                        height: 0,
                        borderTop: "18px solid oklch(0.45 0.18 75)",
                        borderRight: "22px solid transparent",
                    }}
                />
                {/* Pliegue derecho */}
                <div
                    aria-hidden="true"
                    className="absolute -right-1 top-full -translate-y-[1px]"
                    style={{
                        width: 0,
                        height: 0,
                        borderTop: "18px solid oklch(0.45 0.18 75)",
                        borderLeft: "22px solid transparent",
                    }}
                />

                {/* Cuerpo principal de la cinta */}
                <div
                    className="relative px-6 py-8 sm:py-10 md:py-12"
                    style={{
                        background:
                            "linear-gradient(180deg, oklch(0.78 0.21 84) 0%, oklch(0.88 0.22 90) 18%, oklch(0.85 0.22 88) 50%, oklch(0.74 0.22 82) 100%)",
                    }}
                >
                    {/* Banda de highlight (simula reflejo satinado) */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 right-0"
                        style={{
                            top: "30%",
                            height: "12%",
                            background:
                                "linear-gradient(180deg, transparent, rgba(255,255,255,0.32), transparent)",
                        }}
                    />

                    {/* Hairlines superior + inferior */}
                    <div className="absolute left-0 right-0 top-2 h-px bg-primary/35" />
                    <div className="absolute left-0 right-0 bottom-2 h-px bg-primary/35" />

                    {/* Stitching dots: 4 puntos pequeños arriba y abajo (detalle costura) */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 right-0 top-3.5 flex justify-center gap-1.5 opacity-50"
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={`top-${i}`}
                                className="h-[3px] w-[3px] rounded-full bg-primary/60"
                            />
                        ))}
                    </div>
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 right-0 bottom-3.5 flex justify-center gap-1.5 opacity-50"
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={`bot-${i}`}
                                className="h-[3px] w-[3px] rounded-full bg-primary/60"
                            />
                        ))}
                    </div>

                    {/* Contenido en el mismo ángulo de la cinta (no contra-rota) */}
                    <div className="container mx-auto max-w-5xl">
                        <div className="flex flex-col items-center justify-center gap-5 sm:gap-7 md:flex-row md:gap-12">
                            <div className="flex flex-col items-center text-center md:items-end md:text-right">
                                {eyebrow && (
                                    <p
                                        className="mb-1 text-base text-primary/85 sm:text-lg md:text-xl"
                                        style={{
                                            fontFamily: SERIF,
                                            fontStyle: "italic",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {eyebrow}
                                    </p>
                                )}
                                <h2 className="text-balance text-2xl font-black uppercase leading-[1.05] tracking-wider text-primary sm:text-3xl md:text-4xl lg:text-[2.75rem]">
                                    {title}
                                </h2>
                            </div>

                            {showLogo && (
                                <div
                                    className="relative aspect-[2/1] h-28 w-56 shrink-0 sm:h-32 sm:w-64 md:h-40 md:w-80 lg:h-44 lg:w-[22rem]"
                                    style={{
                                        minWidth: "224px",
                                        minHeight: "112px",
                                        maxWidth: "352px",
                                        maxHeight: "176px",
                                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.18))",
                                    }}
                                >
                                    <Image
                                        src="/logo.webp"
                                        alt={siteConfig.name}
                                        fill
                                        className="relative z-10 object-contain"
                                        priority
                                        fetchPriority="high"
                                        placeholder="blur"
                                        blurDataURL={blurDataURL.large}
                                        sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 352px"
                                        style={{
                                            objectFit: "contain",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
