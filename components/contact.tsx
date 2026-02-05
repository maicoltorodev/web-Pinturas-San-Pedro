"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionBackground } from "@/components/ui/section-background"
import { Mail, Phone, Clock, Instagram } from "lucide-react"
import { SocialLinks } from "@/components/ui/social-link"
import { contactInfo, businessHours, whatsappUrls } from "@/lib/constants/site"

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 lg:py-40 overflow-hidden"
      aria-labelledby="contact-heading"
    >
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
                  href={whatsappUrls.contact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Phone className="h-5 w-5" />
                  Escribir por WhatsApp
                </a>

                {contactInfo.additionalPhones?.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-primary/20"
                  >
                    <Phone className="h-5 w-5" />
                    Llamar: {phone.replace('+57', '')}
                  </a>
                ))}

                <a
                  href={`mailto:${contactInfo.email}`}
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
                  <span className="font-bold text-primary">{businessHours.weekdays}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-3">
                  <span className="font-medium">Sábados</span>
                  <span className="font-bold text-primary">{businessHours.saturday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Domingos</span>
                  <span className="font-bold text-primary">{businessHours.sunday}</span>
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
                <SocialLinks size="lg" className="flex-col gap-4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
