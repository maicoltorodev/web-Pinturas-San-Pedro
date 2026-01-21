"use client"

import { MapPin } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionBackground } from "@/components/ui/section-background"
import { LazySection } from "@/components/lazy-section"
import Image from "next/image"
import { blurDataURL } from "@/lib/image-utils"
import { contactInfo, siteConfig } from "@/lib/constants/site"

export function Location() {
  return (
    <section id="location" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      <SectionBackground variant="primary" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={{ icon: MapPin, text: "Ubicación" }}
          title="Visítanos"
          subtitle="En Nuestra Sede"
          description="Encuéntranos en nuestra ubicación principal. Estamos aquí para atenderte."
          className="text-primary-foreground [&_p]:text-primary-foreground/80 mb-12 md:mb-16"
        />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Mapa */}
            <div className="order-2 lg:order-1">
              <LazySection
                fallback={
                  <div className="rounded-2xl overflow-hidden shadow-premium-lg border-4 border-secondary bg-card/10 md:backdrop-blur-sm">
                    <div className="w-full h-[450px] bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-primary-foreground/40 mx-auto mb-4 animate-pulse" />
                        <p className="text-primary-foreground/60 font-medium">Cargando mapa...</p>
                      </div>
                    </div>
                  </div>
                }
                rootMargin="100px"
                threshold={0.1}
              >
                <div className="rounded-2xl overflow-hidden shadow-premium-lg border-4 border-secondary bg-card/10 md:backdrop-blur-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.1431777141015!2d-74.11753039999999!3d4.7451628999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f8515d79b05f3%3A0x17e8f9d484745c6b!2sPinturas%20San%20Pedro%20Oficial!5e0!3m2!1ses-419!2sco!4v1768339290494!5m2!1ses-419!2sco"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                    title={`Mapa de ubicación de ${siteConfig.name} - ${contactInfo.address}`}
                  />
                </div>
              </LazySection>
            </div>

            {/* Imagen de la fachada */}
            <div className="order-1 lg:order-2">
              <LazySection
                fallback={
                  <div className="rounded-2xl overflow-hidden shadow-premium-lg border-4 border-secondary bg-card/10 md:backdrop-blur-sm">
                    <div className="w-full h-[450px] bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-primary-foreground/40 mx-auto mb-4 animate-pulse" />
                        <p className="text-primary-foreground/60 font-medium">Cargando imagen...</p>
                      </div>
                    </div>
                  </div>
                }
                rootMargin="100px"
                threshold={0.1}
              >
                <div className="rounded-2xl overflow-hidden shadow-premium-lg border-4 border-secondary bg-card/10 md:backdrop-blur-sm relative group">
                  <div className="relative w-full h-[450px]">
                    <Image
                      src="/fachada.webp"
                      alt={`Fachada de ${siteConfig.name} - ${contactInfo.address}`}
                      fill
                      className="object-cover transition-transform duration-500 md:group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={blurDataURL.large}
                    />
                    {/* Overlay con información */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 text-primary-foreground w-full">
                        <h3 className="text-xl md:text-2xl font-black mb-2">Nuestra Tienda</h3>
                        <p className="text-sm md:text-base font-medium opacity-90">
                          Visítanos en nuestra ubicación física para recibir asesoría personalizada.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </LazySection>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
