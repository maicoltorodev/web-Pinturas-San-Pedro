import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Catálogo Pinturas San Pedro · Pinta y transforma tus espacios",
    description: "Catálogo completo de Pinturas San Pedro. Vinilos, esmaltes, anticorrosivos, estucos, herramientas. Atención personalizada en Suba, Bogotá.",
}

export default function CatalogoLibroLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
}
