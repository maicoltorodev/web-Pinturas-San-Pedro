import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"

export const metadata: Metadata = {
    title: "Catálogo Pinturas San Pedro · Pinta y transforma tus espacios",
    description: "Catálogo completo de Pinturas San Pedro. Vinilos, esmaltes, anticorrosivos, estucos, herramientas. Atención personalizada en Suba, Bogotá.",
}

// Serif editorial sólo para esta sección — no impacta el bundle de la homepage
const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    style: ["normal", "italic"],
    display: "swap",
    variable: "--font-playfair",
})

export default function CatalogoLibroLayout({ children }: { children: React.ReactNode }) {
    return <div className={playfair.variable}>{children}</div>
}
