import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LogoFAB } from "@/components/logo-fab"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pinturas San Pedro - Servicios Profesionales de Pintura",
  description:
    "Servicios profesionales de pintura residencial y comercial. Transformamos espacios con calidad artesanal y atención al detalle. Más de 15 años de experiencia.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <LogoFAB />
        <Analytics />
      </body>
    </html>
  )
}
