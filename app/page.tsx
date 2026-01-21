"use client"

import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { LazySection } from "@/components/lazy-section"
import { Skeleton } from "@/components/ui/skeleton"

// Lazy load components below the fold for better initial load
// Using loading option for better UX
const Services = dynamic(() => import("@/components/services").then(mod => ({ default: mod.Services })), {
  ssr: true, // Enable SSR for better SEO
  loading: () => <Skeleton className="h-96 w-full" />,
})

const ColorPalette = dynamic(() => import("@/components/color-palette").then(mod => ({ default: mod.ColorPalette })), {
  ssr: true,
  loading: () => <Skeleton className="h-96 w-full" />,
})

const Process = dynamic(() => import("@/components/process").then(mod => ({ default: mod.Process })), {
  ssr: true,
  loading: () => <Skeleton className="h-96 w-full" />,
})

const Location = dynamic(() => import("@/components/location").then(mod => ({ default: mod.Location })), {
  ssr: true,
  loading: () => <Skeleton className="h-96 w-full" />,
})

const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => ({ default: mod.Testimonials })), {
  ssr: true,
  loading: () => <Skeleton className="h-96 w-full" />,
})

const Contact = dynamic(() => import("@/components/contact").then(mod => ({ default: mod.Contact })), {
  ssr: true,
  loading: () => <Skeleton className="h-96 w-full" />,
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  ssr: true,
  loading: () => <Skeleton className="h-32 w-full" />,
})

export default function Home() {
  return (
    <main className="min-h-screen" role="main">
      <Header />
      <Hero />
      <LazySection fallback={<Skeleton className="h-96 w-full" />}>
        <Services />
      </LazySection>
      <LazySection fallback={<Skeleton className="h-96 w-full" />}>
        <ColorPalette />
      </LazySection>
      <LazySection fallback={<Skeleton className="h-96 w-full" />}>
        <Process />
      </LazySection>
      <LazySection fallback={<Skeleton className="h-96 w-full" />}>
        <Testimonials />
      </LazySection>
      <LazySection fallback={<Skeleton className="h-96 w-full" />}>
        <Location />
      </LazySection>
      <LazySection fallback={<Skeleton className="h-96 w-full" />}>
        <Contact />
      </LazySection>
      <LazySection fallback={<Skeleton className="h-32 w-full" />}>
        <Footer />
      </LazySection>
    </main>
  )
}
