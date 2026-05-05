import type { Metadata } from "next"
import Image from "next/image"
import { CirclePattern } from "@/components/ui/circle-pattern"
import { Sparkles } from "lucide-react"
import { siteConfig, businessStats } from "@/lib/constants/site"
import { blurDataURL } from "@/lib/image-utils"

export const metadata: Metadata = {
    title: "Catálogo · Pinturas San Pedro",
    description:
        "Catálogo Pinturas San Pedro · Vinilos, esmaltes, anticorrosivos, estucos y más. Calidad certificada, más de 30 años en Bogotá.",
}

export default function CatalogoLibroPage() {
    return (
        <main className="min-h-screen bg-primary" role="main">
            {/* PORTADA */}
            <section
                className="relative flex min-h-screen items-center justify-center overflow-hidden"
                aria-label="Portada del catálogo"
            >
                {/* Fondo: gradiente azul de marca + patrón circular (igual al hero) */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-primary md:bg-gradient-to-br md:from-primary md:via-primary md:to-[oklch(0.25_0.15_252)]" />
                    <CirclePattern variant="default" />
                </div>

                {/* Contenido */}
                <div className="container relative z-10 mx-auto px-4 py-20 sm:px-6 md:py-32 lg:px-8">
                    <div className="mx-auto max-w-5xl">
                        <div className="space-y-6 text-center md:space-y-8">
                            {/* Badge */}
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 md:glass-dark">
                                <Sparkles className="h-4 w-4 text-secondary" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/90 sm:text-sm">
                                    Catálogo Oficial
                                </span>
                            </div>

                            {/* Logo */}
                            <div className="mb-6 flex justify-center">
                                <div
                                    className="relative aspect-[2/1] h-32 w-64 animate-float sm:h-40 sm:w-80 md:h-48 md:w-96 lg:h-[250px] lg:w-[500px]"
                                    style={{
                                        minWidth: "256px",
                                        minHeight: "128px",
                                        maxWidth: "500px",
                                        maxHeight: "250px",
                                    }}
                                >
                                    <div
                                        className="pointer-events-none absolute inset-0 hidden md:block"
                                        style={{
                                            filter: "drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))",
                                            zIndex: 5,
                                        }}
                                    />
                                    <Image
                                        src="/logo.webp"
                                        alt={siteConfig.name}
                                        fill
                                        className="relative z-10 object-contain md:[filter:drop-shadow(0_0_10px_rgba(255,215,0,0.3))]"
                                        priority
                                        fetchPriority="high"
                                        placeholder="blur"
                                        blurDataURL={blurDataURL.large}
                                        sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 500px"
                                        style={{
                                            objectFit: "contain",
                                            width: "100%",
                                            height: "100%",
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Tagline central */}
                            <div className="mb-6 flex items-center justify-center gap-3">
                                <div className="h-px w-16 bg-primary-foreground" />
                                <span className="text-xl font-black uppercase tracking-wider text-primary-foreground sm:text-2xl md:text-3xl">
                                    {siteConfig.tagline}
                                </span>
                                <div className="h-px w-16 bg-primary-foreground" />
                            </div>

                            {/* Subtítulo Catálogo */}
                            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-primary-foreground/80 sm:text-xl md:text-2xl">
                                Catálogo de productos
                                <span className="font-semibold text-primary-foreground"> · Línea completa</span>
                                <br className="hidden sm:block" />
                                Vinilos, esmaltes, anticorrosivos, estucos, herramientas y más.
                            </p>

                            {/* Stats */}
                            <div className="mx-auto grid max-w-2xl grid-cols-3 gap-4 pt-12 md:gap-8 md:pt-16">
                                {businessStats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="mb-1 text-2xl font-black text-secondary md:text-3xl lg:text-4xl">
                                            {stat.number}
                                        </div>
                                        <div className="text-xs font-medium text-primary-foreground/70 md:text-sm">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pie de portada */}
                            <div className="pt-10 md:pt-14">
                                <div className="mx-auto h-px w-32 bg-primary-foreground/30" />
                                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-primary-foreground/60 sm:text-sm">
                                    Edición {new Date().getFullYear()} · Bogotá, Colombia
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
