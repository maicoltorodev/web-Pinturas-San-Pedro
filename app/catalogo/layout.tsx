import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Catálogo de Vinilos | Pinturas San Pedro",
  description: "Descubre nuestra línea completa de vinilos: Acrílico, Semilavable, Hidrofugado y Tipo 2 Profesional. Calidad garantizada.",
  openGraph: {
    title: "Catálogo de Vinilos | Pinturas San Pedro",
    description: "Descubre nuestra línea completa de vinilos profesionales.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo de Vinilos | Pinturas San Pedro",
    description: "Descubre nuestra línea completa de vinilos profesionales.",
  },
}

export default function CatalogoLayout({ children }: { children: React.ReactNode }) {
  return children
}
