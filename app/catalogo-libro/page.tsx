import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { products } from "@/lib/constants/products"
import { contactInfo } from "@/lib/constants/site"

/**
 * Catálogo "libro" — diseño tipo Pintuco para entregar a la dueña.
 *
 * Estructura por sección:
 *  - Foto grande de un AMBIENTE (uso real) con marcadores de color
 *  - Columna derecha: 1-2 productos featured con cuñete + nombre + descripción
 *  - Color swatches con código + nombre poético
 *  - Complementarios al pie
 *
 * Listo para imprimir con `@media print` (cada sección en página propia).
 *
 * NOTA: las imágenes de ambiente son placeholders Unsplash genéricos. Cuando
 * Pinturas SP entregue fotos reales de obras, reemplazarlas en `AMBIENT_IMAGES`.
 */

const PSP_BLUE = "#0D47A1"
const PSP_YELLOW = "#FFC107"

// Unsplash IDs verificados (todos image/jpeg 200) para ambient placeholders
const AMBIENT_IMAGES = {
    fachada: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
    interior: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1600&auto=format&fit=crop",
    cocina: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1600&auto=format&fit=crop",
    bano: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1600&auto=format&fit=crop",
    metales: "https://images.unsplash.com/photo-1581094488379-6b9d2dad7d4f?q=80&w=1600&auto=format&fit=crop",
    pisos: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
    preparacion: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1600&auto=format&fit=crop",
    herramientas: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
}

type Swatch = { code: string; name: string; hex: string }

type Ambient = {
    slug: string
    title: string
    subtitle: string
    image: string
    featured: { id: string; label: "A" | "B" }[]
    swatches: Swatch[]
    complementarios: string[] // product ids
}

const AMBIENTS: Ambient[] = [
    {
        slug: "fachadas",
        title: "Fachadas",
        subtitle: "La cara visible de tu hogar — protégela con la mejor durabilidad",
        image: AMBIENT_IMAGES.fachada,
        featured: [
            { id: "vinilo-hidrofugado", label: "A" },
            { id: "esmalte-premium", label: "B" },
        ],
        swatches: [
            { code: "SP-203-D", name: "Verde Campestre", hex: "#5d837e" },
            { code: "SP-300-D", name: "Café Marrueco", hex: "#7a4d3d" },
            { code: "SP-115-P", name: "Lino", hex: "#dccfb6" },
        ],
        complementarios: ["estuco-plastico-acrilico", "graniplast", "brocha-cerda-premium"],
    },
    {
        slug: "interiores",
        title: "Interiores",
        subtitle: "Tu hogar, en su mejor versión — colores que invitan a quedarse",
        image: AMBIENT_IMAGES.interior,
        featured: [
            { id: "vinilo-acrilico", label: "A" },
            { id: "vinilo-tipo-1-certificado", label: "B" },
        ],
        swatches: [
            { code: "SP-059-P", name: "Té de Rosas", hex: "#dab1a3" },
            { code: "SP-267-P", name: "Castillo en el Aire", hex: "#bcc7d3" },
            { code: "SP-287-A", name: "Paisaje Nocturno", hex: "#3a4150" },
        ],
        complementarios: ["estuco-plastico-acrilico", "garraplast", "rodillo-felpa-corta"],
    },
    {
        slug: "banos-cocinas",
        title: "Baños y Cocinas",
        subtitle: "Limpieza que dura, color que permanece — diseñado para zonas húmedas",
        image: AMBIENT_IMAGES.cocina,
        featured: [
            { id: "vinilo-hidrofugado", label: "A" },
            { id: "esmalte-base-agua", label: "B" },
        ],
        swatches: [
            { code: "SP-193-T", name: "Bruma de Cristal", hex: "#bdd4cf" },
            { code: "SP-067-T", name: "Tierra de Siena", hex: "#a07246" },
            { code: "SP-259-D", name: "Mar Cósmico", hex: "#7891aa" },
        ],
        complementarios: ["impermeabilizante-uretanico", "brocha-cerda-popular", "espatula-acero-carbon"],
    },
    {
        slug: "metales-maderas",
        title: "Metales y Maderas",
        subtitle: "Protección de larga duración — para que cada superficie luzca como nueva",
        image: AMBIENT_IMAGES.metales,
        featured: [
            { id: "anticorrosivo", label: "A" },
            { id: "esmalte-especial", label: "B" },
        ],
        swatches: [
            { code: "SP-N01-A", name: "Negro Forja", hex: "#1f1f1f" },
            { code: "SP-W12-T", name: "Blanco Nieve", hex: "#f6f5f1" },
            { code: "SP-R44-D", name: "Rojo Terracota", hex: "#a83e2a" },
        ],
        complementarios: ["disco-desbaste-pulido", "lija-rojo-seco", "cepillo-alambre"],
    },
    {
        slug: "pisos",
        title: "Pisos y Tráfico Pesado",
        subtitle: "Resistencia para zonas de uso intenso — estacionamientos, bodegas, parqueaderos",
        image: AMBIENT_IMAGES.pisos,
        featured: [
            { id: "trafico-pesado", label: "A" },
            { id: "graniplast", label: "B" },
        ],
        swatches: [
            { code: "SP-Y10-D", name: "Amarillo Vial", hex: "#ffc107" },
            { code: "SP-W01-A", name: "Blanco Tráfico", hex: "#ffffff" },
            { code: "SP-G55-D", name: "Gris Asfalto", hex: "#3e4248" },
        ],
        complementarios: ["disolvente", "rodillo-fibra-corta", "cinta-enmascarar"],
    },
    {
        slug: "preparacion",
        title: "Preparación",
        subtitle: "El secreto de un acabado perfecto está en la base — estucos e impermeabilizantes",
        image: AMBIENT_IMAGES.preparacion,
        featured: [
            { id: "estuco-plastico-acrilico", label: "A" },
            { id: "impermeabilizante-uretanico", label: "B" },
        ],
        swatches: [
            { code: "SP-P01", name: "Pasta Lista", hex: "#e8e3d9" },
            { code: "SP-P02", name: "Pasta Acrílica", hex: "#dad3c1" },
            { code: "SP-G02", name: "Granuplast Texturado", hex: "#cdc6b4" },
        ],
        complementarios: ["pasta-acrilica", "garraplast", "espatula-plastica"],
    },
]

// Resuelve un product por id o devuelve null si no existe
function getProduct(id: string) {
    return products.find((p) => p.id === id) ?? null
}

export default function CatalogoLibroPage() {
    return (
        <div className="bg-white text-[#0b1530]">
            {/* Header de pantalla — oculto al imprimir */}
            <header className="sticky top-0 z-50 flex items-center justify-between bg-white/95 backdrop-blur border-b border-black/5 px-5 md:px-10 py-3 print:hidden">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-[#0D47A1] text-xs md:text-sm font-bold tracking-wider hover:opacity-70"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>VOLVER</span>
                </Link>
                <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#0D47A1]">
                    Catálogo · Pinturas San Pedro
                </div>
                <div className="w-[60px] md:w-[80px]" />
            </header>

            <CoverPage />

            {AMBIENTS.map((ambient) => (
                <AmbientSection key={ambient.slug} ambient={ambient} />
            ))}

            <ContactPage />

            <style>{`
                @media print {
                    body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    .page-break { page-break-after: always; break-after: page; }
                    .page-break:last-child { page-break-after: auto; }
                }
                @page {
                    size: letter;
                    margin: 0;
                }
            `}</style>
        </div>
    )
}

/**
 * Cover — primera página del catálogo. Máximo impacto visual.
 */
function CoverPage() {
    return (
        <section className="page-break relative flex min-h-screen flex-col bg-[#FFF8E1] overflow-hidden">
            {/* Banda amarilla superior */}
            <div className="absolute top-0 inset-x-0 h-2 bg-[#FFC107]" />

            {/* Decoración: pincelada azul abstracta */}
            <div
                className="absolute -top-20 -right-32 w-[600px] h-[600px] rounded-full opacity-10"
                style={{ background: `radial-gradient(circle, ${PSP_BLUE} 0%, transparent 70%)` }}
            />
            <div
                className="absolute -bottom-32 -left-32 w-[700px] h-[700px] rounded-full opacity-10"
                style={{ background: `radial-gradient(circle, ${PSP_YELLOW} 0%, transparent 70%)` }}
            />

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center">
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border-2 border-[#0D47A1]/20 bg-white/60 px-5 py-2 backdrop-blur">
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#0D47A1]">
                        Catálogo 2026
                    </span>
                </div>

                <h1
                    className="mb-6 text-5xl md:text-7xl lg:text-8xl font-black leading-[0.92] tracking-tight"
                    style={{ color: PSP_BLUE }}
                >
                    PINTA Y<br />
                    TRANSFORMA<br />
                    <span style={{ color: PSP_YELLOW, WebkitTextStroke: `2px ${PSP_BLUE}` }} className="italic">
                        tus espacios
                    </span>
                </h1>

                <p className="mb-10 max-w-2xl text-base md:text-lg leading-relaxed text-[#0b1530]/70">
                    Una guía visual con las pinturas, herramientas y soluciones que
                    Pinturas San Pedro tiene para tu hogar, tu obra y tu negocio.
                </p>

                <div className="mb-12 grid grid-cols-3 gap-4 md:gap-8">
                    <Stat value="9" label="Categorías" />
                    <Stat value="59+" label="Productos" />
                    <Stat value="20+" label="Años" />
                </div>

                <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-2">
                    <div className="relative h-12 w-32">
                        <Image
                            src="/logo.webp"
                            alt="Pinturas San Pedro"
                            fill
                            className="object-contain"
                            sizes="128px"
                            priority
                        />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-[#0D47A1]/70">
                        Calle 132D N 145A-02 · Bogotá
                    </span>
                </div>
            </div>
        </section>
    )
}

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-black leading-none" style={{ color: PSP_BLUE }}>
                {value}
            </span>
            <span className="mt-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[#0b1530]/60">
                {label}
            </span>
        </div>
    )
}

/**
 * Sección de ambiente — clon estructural del estilo Pintuco.
 *
 * Layout:
 *  - Banda amarilla superior con título "Fachadas", "Cocinas" en cursivas grandes
 *  - Foto grande del ambiente con círculos numerados (color swatches)
 *  - Columna derecha: productos featured (A, B) con cuñete + descripción
 *  - Banda inferior azul "Complementarios" con 3-4 productos secundarios
 */
function AmbientSection({ ambient }: { ambient: Ambient }) {
    const featuredProducts = ambient.featured
        .map((f) => ({ ...f, product: getProduct(f.id) }))
        .filter((f) => f.product)

    const complementarios = ambient.complementarios
        .map((id) => getProduct(id))
        .filter(Boolean)
        .slice(0, 4)

    return (
        <section className="page-break relative bg-white min-h-screen flex flex-col">
            {/* Banda superior amarilla con el título */}
            <div className="relative bg-[#FFC107] py-6 md:py-8 px-6 md:px-12 overflow-hidden">
                <h2
                    className="text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tight"
                    style={{ color: PSP_BLUE, fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                    {ambient.title}
                </h2>
                <p className="mt-2 max-w-2xl text-xs md:text-sm font-medium text-[#0b1530]/85">
                    {ambient.subtitle}
                </p>

                {/* Etiqueta "¿Qué necesitas?" arriba a la derecha como Pintuco */}
                <div className="absolute top-4 md:top-6 right-6 md:right-12 inline-flex items-center gap-2 rounded-full bg-[#0D47A1] px-4 py-1.5 md:px-5 md:py-2 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white">
                    ¿Qué necesitas?
                </div>
            </div>

            {/* Cuerpo principal: foto + productos */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-0">
                {/* Lado izquierdo: foto grande del ambiente con marcadores de color */}
                <div className="relative min-h-[320px] md:min-h-[480px] lg:min-h-[560px]">
                    <Image
                        src={ambient.image}
                        alt={`Ambiente ${ambient.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    {/* Overlay sutil para mejorar lectura */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />

                    {/* Marcadores circulares de color (estilo Pintuco) */}
                    <SwatchMarkers swatches={ambient.swatches} />
                </div>

                {/* Lado derecho: productos featured */}
                <div className="bg-[#F4F6FB] px-5 md:px-8 py-6 md:py-8 flex flex-col gap-6">
                    {featuredProducts.map(({ label, product }) => (
                        <FeaturedProduct
                            key={product!.id}
                            label={label}
                            product={product!}
                        />
                    ))}
                </div>
            </div>

            {/* Color swatches (banda intermedia) */}
            <div className="bg-white border-t border-black/5 px-6 md:px-12 py-4 md:py-5 flex flex-wrap items-center gap-3 md:gap-5">
                <span
                    className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]"
                    style={{ color: PSP_BLUE }}
                >
                    Colores destacados
                </span>
                {ambient.swatches.map((s) => (
                    <SwatchChip key={s.code} swatch={s} />
                ))}
            </div>

            {/* Banda inferior: Complementarios */}
            {complementarios.length > 0 && (
                <div className="bg-[#0D47A1] text-white px-6 md:px-12 py-5 md:py-6">
                    <div className="flex items-center gap-3 mb-3 md:mb-4">
                        <span
                            className="text-base md:text-lg font-bold italic"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            Complementarios
                        </span>
                        <span className="h-px flex-1 bg-white/20" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                        {complementarios.map((p) => (
                            <ComplementarioCard key={p!.id} product={p!} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

/**
 * Producto featured — cuñete grande + label A/B + nombre + desc + presentaciones.
 */
function FeaturedProduct({ label, product }: { label: "A" | "B"; product: any }) {
    const description = (product.description ?? "").length > 200
        ? product.description.slice(0, 200) + "..."
        : product.description ?? ""

    return (
        <div className="relative bg-white rounded-2xl border border-black/8 p-4 md:p-5 shadow-sm">
            {/* Label A/B circular en esquina superior */}
            <div
                className="absolute -top-3 left-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-black text-white shadow-md"
                style={{ backgroundColor: PSP_BLUE }}
            >
                {label}
            </div>

            <div className="flex items-start gap-4">
                {/* Cuñete imagen */}
                <div className="relative h-24 w-24 md:h-28 md:w-28 shrink-0">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 96px, 112px"
                    />
                </div>

                {/* Texto */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-black tracking-tight" style={{ color: PSP_BLUE }}>
                        {product.name}
                    </h3>
                    <p className="mt-1.5 text-[11px] md:text-xs leading-relaxed text-[#0b1530]/70 line-clamp-4">
                        {description}
                    </p>

                    {/* Presentaciones */}
                    {product.presentations && product.presentations.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1">
                            {product.presentations.map((p: string) => (
                                <span
                                    key={p}
                                    className="px-2 py-0.5 text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#FFC107]/15 text-[#0b1530]/80 border border-[#FFC107]/30"
                                >
                                    {p}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

/**
 * Card pequeño de complementario en banda inferior azul.
 */
function ComplementarioCard({ product }: { product: any }) {
    return (
        <div className="bg-white/8 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="relative h-16 w-full mb-2">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="120px"
                />
            </div>
            <p className="text-[10px] md:text-[11px] font-bold leading-tight text-center text-white">
                {product.name}
            </p>
        </div>
    )
}

/**
 * Marcadores circulares sobre la foto del ambiente — estilo Pintuco.
 * Muestran el código del color sobre el lugar exacto donde se aplicó.
 */
function SwatchMarkers({ swatches }: { swatches: Swatch[] }) {
    // Posiciones predefinidas en porcentaje sobre la foto
    const positions = [
        { top: "30%", left: "25%" },
        { top: "55%", left: "55%" },
        { top: "40%", left: "80%" },
    ]

    return (
        <>
            {swatches.slice(0, 3).map((s, i) => {
                const pos = positions[i] ?? positions[0]
                return (
                    <div
                        key={s.code}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={pos}
                    >
                        <div
                            className="h-9 w-9 md:h-10 md:w-10 rounded-full ring-4 ring-white shadow-lg"
                            style={{ backgroundColor: s.hex }}
                        />
                    </div>
                )
            })}
        </>
    )
}

/**
 * Chip horizontal con código + nombre del color (banda intermedia, estilo Pintuco).
 */
function SwatchChip({ swatch }: { swatch: Swatch }) {
    return (
        <div className="inline-flex items-center gap-2.5 rounded-full bg-[#F4F6FB] px-3 py-1.5 border border-black/5">
            <span
                className="h-6 w-6 md:h-7 md:w-7 rounded-full ring-2 ring-white shadow-inner"
                style={{ backgroundColor: swatch.hex }}
            />
            <div className="flex flex-col leading-tight">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider" style={{ color: PSP_BLUE }}>
                    {swatch.code}
                </span>
                <span className="text-[9px] md:text-[10px] font-medium text-[#0b1530]/70">
                    {swatch.name}
                </span>
            </div>
        </div>
    )
}

/**
 * Página de contacto — última del catálogo.
 */
function ContactPage() {
    return (
        <section className="relative bg-[#0D47A1] text-white min-h-screen flex flex-col px-8 py-16">
            <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto text-center">
                <span className="mb-6 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#FFC107]">
                    Visítanos · llámanos · escríbenos
                </span>

                <h2 className="mb-8 text-5xl md:text-7xl font-black leading-[0.92] tracking-tight">
                    Pinturas<br />
                    <span style={{ color: PSP_YELLOW, fontFamily: "Georgia, serif" }} className="italic">
                        San Pedro
                    </span>
                </h2>

                <p className="mb-12 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
                    Más de 20 años pintando los hogares y obras de Bogotá.
                    Asesoría experta y precios al por mayor y al detal.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
                    <ContactBlock
                        title="Ubicación"
                        lines={[contactInfo.address, "Bogotá, Colombia"]}
                    />
                    <ContactBlock
                        title="Contacto"
                        lines={[
                            contactInfo.phone,
                            ...(contactInfo.additionalPhones ?? []).slice(0, 2),
                            contactInfo.email,
                        ]}
                    />
                </div>

                <div className="mt-16 pt-8 border-t border-white/15 w-full">
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/60">
                        Lunes a Viernes 7am — 6pm · Sábado 7am — 5pm · Domingo 8am — 1pm
                    </p>
                </div>
            </div>
        </section>
    )
}

function ContactBlock({ title, lines }: { title: string; lines: string[] }) {
    return (
        <div className="text-left md:text-center">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#FFC107] mb-3 block">
                {title}
            </span>
            <div className="space-y-1">
                {lines.map((line, i) => (
                    <p key={i} className="text-sm md:text-base font-medium text-white/90">
                        {line}
                    </p>
                ))}
            </div>
        </div>
    )
}
