"use client"

import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import type { SiteData } from "@/lib/site-data"

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

export function HomeClient({ data }: { data: SiteData }) {
  return (
    <main className="min-h-screen" role="main">
      <Header />
      <Hero
        tagline={data.hero.tagline}
        description={data.hero.description}
        stats={data.stats}
      />
      <Services />
      <Products />
      <ColorPalette />
      <Process />
      <Testimonials />
      <Location />
      <Contact
        overridePhone={data.businessInfo.phone}
        overrideAdditionalPhones={data.businessInfo.additionalPhones}
        overrideEmail={data.businessInfo.email}
        overrideHours={data.hours}
      />
      <Footer
        overridePhone={data.businessInfo.phone}
        overrideAdditionalPhones={data.businessInfo.additionalPhones}
        overrideEmail={data.businessInfo.email}
        overrideAddress={data.businessInfo.address}
        overrideHours={data.hours}
      />
    </main>
  )
}
