import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Portfolio } from "@/components/portfolio"
import { Process } from "@/components/process"
import { Products } from "@/components/products"
import { ColorPalette } from "@/components/color-palette"
import { Testimonials } from "@/components/testimonials"
import { Location } from "@/components/location"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Products />
      <ColorPalette />
      <Portfolio />
      <Process />
      <Location />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
