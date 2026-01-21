"use client"

import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { LazySection } from "@/components/lazy-section"

// Lazy load components below the fold for better initial load
const Services = dynamic(() => import("@/components/services").then(mod => ({ default: mod.Services })), {
  ssr: false,
})

const Products = dynamic(() => import("@/components/products").then(mod => ({ default: mod.Products })), {
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
    <main className="min-h-screen">
      <Header />
      <Hero />
      <LazySection fallback={<div className="h-64" />}>
        <Services />
      </LazySection>
      <LazySection fallback={<div className="h-64" />}>
        <Products />
      </LazySection>
      <LazySection fallback={<div className="h-64" />}>
        <ColorPalette />
      </LazySection>
      <LazySection fallback={<div className="h-64" />}>
        <Process />
      </LazySection>
      <LazySection fallback={<div className="h-64" />}>
        <Testimonials />
      </LazySection>
      <LazySection fallback={<div className="h-64" />}>
        <Location />
      </LazySection>
      <LazySection fallback={<div className="h-64" />}>
        <Contact />
      </LazySection>
      <LazySection fallback={<div className="h-32" />}>
        <Footer />
      </LazySection>
    </main>
  )
}
