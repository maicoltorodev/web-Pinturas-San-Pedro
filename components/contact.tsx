"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionBackground } from "@/components/ui/section-background"
import { Mail, Phone, Clock, Facebook, Instagram, ArrowRight } from "lucide-react"

// TikTok Icon Component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

export function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      <SectionBackground variant="primary" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={{ icon: Phone, text: "Contáctanos" }}
          title="Estamos Aquí"
          subtitle="Para Ayudarte"
          description="¿Tienes preguntas o necesitas asesoría? Comunícate con nosotros por cualquiera de nuestros canales de atención."
          className="text-primary-foreground [&_p]:text-primary-foreground/80 mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Card 1: Contacto Directo */}
          <Card className="border-2 border-primary-foreground/20 bg-card/80 md:backdrop-blur-sm hover:border-secondary transition-all duration-300 group h-full">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="h-7 w-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-2">Atención al Cliente</h3>
              <p className="text-muted-foreground mb-8">
                Habla directamente con nuestros expertos para cotizaciones y asesoría técnica.
              </p>

              <div className="space-y-4 mt-auto">
                <a
                  href="https://wa.me/573223716811?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20productos%20de%20pintura."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Phone className="h-5 w-5" />
                  Escribir por WhatsApp
                </a>

                <a
                  href="mailto:pinturassanpedro@hotmail.com"
                  className="flex items-center justify-center gap-2 w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Mail className="h-5 w-5" />
                  Enviar Correo
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Horarios */}
          <Card className="border-2 border-primary-foreground/20 bg-card/80 md:backdrop-blur-sm hover:border-secondary transition-all duration-300 group h-full">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-7 w-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-2">Horario de Atención</h3>
              <p className="text-muted-foreground mb-8">
                Visítanos en nuestra sede en los siguientes horarios. ¡Te esperamos!
              </p>

              <div className="space-y-4 bg-muted/50 p-6 rounded-xl border border-border/50">
                <div className="flex justify-between items-center border-b border-border/50 pb-3">
                  <span className="font-medium">Lunes - Viernes</span>
                  <span className="font-bold text-primary">7am - 6pm</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-3">
                  <span className="font-medium">Sábados</span>
                  <span className="font-bold text-primary">7am - 5pm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Domingos</span>
                  <span className="font-bold text-primary">8am - 1pm</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Redes Sociales */}
          <Card className="border-2 border-primary-foreground/20 bg-card/80 md:backdrop-blur-sm hover:border-secondary transition-all duration-300 group h-full">
            <CardContent className="p-8 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <Instagram className="h-7 w-7 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-2">Síguenos</h3>
              <p className="text-muted-foreground mb-8">
                Descubre nuestros proyectos, tips de pintura y ofertas exclusivas en redes sociales.
              </p>

              <div className="grid grid-cols-1 gap-4 mt-auto">
                <a
                  href="https://www.instagram.com/pinturassanpedro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-border/50 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/10 transition-all group/social"
                >
                  <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover/social:scale-110 transition-transform">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-lg">Instagram</span>
                  <ArrowRight className="ml-auto h-5 w-5 opacity-0 group-hover/social:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://www.facebook.com/pinturassanpedro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-border/50 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group/social"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover/social:scale-110 transition-transform">
                    <Facebook className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-lg">Facebook</span>
                  <ArrowRight className="ml-auto h-5 w-5 opacity-0 group-hover/social:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://www.tiktok.com/@pinturassanpedro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-border/50 hover:border-black hover:bg-gray-50 dark:hover:border-white dark:hover:bg-zinc-800 transition-all group/social"
                >
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-black dark:text-white group-hover/social:scale-110 transition-transform">
                    <TikTokIcon className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-lg">TikTok</span>
                  <ArrowRight className="ml-auto h-5 w-5 opacity-0 group-hover/social:opacity-100 transition-opacity" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
