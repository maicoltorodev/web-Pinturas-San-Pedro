"use client"

import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"

// Lazy load components below the fold - Next.js dynamic() handles intersection observer internally
// No need for LazySection wrapper (redundant overhead)
const Services = dynamic(() => import("@/components/services").then(mod => ({ default: mod.Services })), {
  ssr: false,
})

const ColorPalette = dynamic(() => import("@/components/color-palette").then(mod => ({ default: mod.ColorPalette })), {
  ssr: false,
})

const Process = dynamic(() => import("@/components/process").then(mod => ({ default: mod.Process })), {
  ssr: false,
})

const Location = dynamic(() => import("@/components/location").then(mod => ({ default: mod.Location })), {
  ssr: false,
})

const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => ({ default: mod.Testimonials })), {
  ssr: false,
})

const Contact = dynamic(() => import("@/components/contact").then(mod => ({ default: mod.Contact })), {
  ssr: false,
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="min-h-screen" role="main">
      <Header />
      <Hero />
      <Services />
      <ColorPalette />
      <Process />
      <Testimonials />
      <Location />
      <Contact />
      <Footer />
    </main>
  )
}
