"use client"

import { MapPin } from "lucide-react"
import { CirclePattern } from "@/components/ui/circle-pattern"
import { useInView } from "@/lib/useInView"
import { cn } from "@/lib/utils"

export function Location() {
  const { ref: sectionRef, isInView: sectionInView } = useInView<HTMLDivElement>({ 
    threshold: 0.1, 
    rootMargin: "-50px",
    triggerOnce: true 
  })

  return (
    <section id="location" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Premium Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[oklch(0.25_0.15_252)]" />
        <CirclePattern variant="default" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
        {/* Premium light effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/35 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/25 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Badge al inicio de la sección */}
        <div className={cn(
          "text-center mb-8 transition-opacity duration-300",
          sectionInView ? "opacity-100" : "opacity-0"
        )}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
            <MapPin className="h-4 w-4 text-secondary" />
            <span className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-wider">
              Ubicación
            </span>
          </div>
        </div>

        <div className={cn(
          "text-center mb-12 md:mb-16 transition-all duration-1000",
          sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )} style={{ transitionDelay: "100ms" }}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 leading-tight">
            <span className="block">Visítanos</span>
            <span className="block gradient-text">En Nuestra Sede</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Encuéntranos en nuestra ubicación principal. Estamos aquí para atenderte y ayudarte con todos tus proyectos de pintura.
          </p>
        </div>

        <div className={cn(
          "max-w-6xl mx-auto transition-all duration-1000",
          sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )} style={{ transitionDelay: "200ms" }}>
          <div className="rounded-2xl overflow-hidden shadow-premium-lg border-4 border-secondary bg-card/10 backdrop-blur-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.1431777141015!2d-74.11753039999999!3d4.7451628999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f8515d79b05f3%3A0x17e8f9d484745c6b!2sPinturas%20San%20Pedro%20Oficial!5e0!3m2!1ses-419!2sco!4v1768339290494!5m2!1ses-419!2sco"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
