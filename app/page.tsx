import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"

// Lazy load components below the fold for better initial load
const Services = dynamic(() => import("@/components/services").then(mod => ({ default: mod.Services })), {
  loading: () => <div className="h-64" />,
})

const Products = dynamic(() => import("@/components/products").then(mod => ({ default: mod.Products })), {
  loading: () => <div className="h-64" />,
})

const ColorPalette = dynamic(() => import("@/components/color-palette").then(mod => ({ default: mod.ColorPalette })), {
  loading: () => <div className="h-64" />,
})

const Process = dynamic(() => import("@/components/process").then(mod => ({ default: mod.Process })), {
  loading: () => <div className="h-64" />,
})

const Location = dynamic(() => import("@/components/location").then(mod => ({ default: mod.Location })), {
  loading: () => <div className="h-64" />,
})

const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="h-64" />,
})

const Contact = dynamic(() => import("@/components/contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="h-64" />,
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-32" />,
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Products />
      <ColorPalette />
      <Process />
      <Location />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
