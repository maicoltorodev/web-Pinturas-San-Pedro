"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionBackground } from "@/components/ui/section-background"

export function Location() {
  const [shouldLoadMap, setShouldLoadMap] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mapContainerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true)
          // Desconectar después de cargar para liberar memoria
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px", // Cargar un poco antes de que sea visible
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section id="location" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      <SectionBackground variant="primary" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={{ icon: MapPin, text: "Ubicación" }}
          title="Visítanos"
          subtitle="En Nuestra Sede"
          description="Encuéntranos en nuestra ubicación principal. Estamos aquí para atenderte y ayudarte con todos tus proyectos de pintura."
          className="text-primary-foreground [&_p]:text-primary-foreground/80 mb-12 md:mb-16"
        />
        <div className="max-w-6xl mx-auto" ref={mapContainerRef}>
          <div className="rounded-2xl overflow-hidden shadow-premium-lg border-4 border-secondary bg-card/10 md:backdrop-blur-sm">
            {shouldLoadMap ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.1431777141015!2d-74.11753039999999!3d4.7451628999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f8515d79b05f3%3A0x17e8f9d484745c6b!2sPinturas%20San%20Pedro%20Oficial!5e0!3m2!1ses-419!2sco!4v1768339290494!5m2!1ses-419!2sco"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="Mapa de ubicación de Pinturas San Pedro - Calle 132D N 145A-02, Bogotá"
              />
            ) : (
              <div className="w-full h-[450px] bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary-foreground/40 mx-auto mb-4 animate-pulse" />
                  <p className="text-primary-foreground/60 font-medium">Cargando mapa...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
