"use client"

import Image from "next/image"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { blurDataURL } from "@/lib/image-utils"
import { siteConfig, contactInfo, businessHours, whatsappUrls } from "@/lib/constants/site"
import { quickLinks } from "@/lib/constants/navigation"
import { SocialLinks } from "@/components/ui/social-link"

export function Footer() {
  // Calcular año directamente sin estado innecesario
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative bg-primary text-primary-foreground overflow-hidden"
      role="contentinfo"
      aria-label="Pie de página"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_100%,_oklch(0.82_0.18_90)_0%,_transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="relative h-10 w-10 flex-shrink-0 aspect-square"
                style={{
                  minWidth: '40px',
                  minHeight: '40px'
                }}
              >
                <Image
                  src="/logo.webp"
                  alt={siteConfig.name}
                  fill
                  className="object-contain"
                  sizes="40px"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={blurDataURL.small}
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary-foreground/90 leading-tight">
                  Pinturas
                </span>
                <span className="text-lg font-black text-secondary leading-tight">
                  san pedro
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed text-sm mb-4 max-w-sm">
              <span className="font-bold text-secondary">Profesionales en Color</span> - 
              {siteConfig.description}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
              <span className="text-sm font-black text-primary-foreground uppercase tracking-wider">
                {siteConfig.tagline}
              </span>
            </div>
            
            {/* Redes Sociales */}
            <SocialLinks size="md" />
            <a
              href={whatsappUrls.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group mt-2"
              aria-label="WhatsApp"
            >
              <Phone className="h-5 w-5 text-primary-foreground/80 group-hover:text-secondary transition-colors" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-foreground">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm break-all"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">{contactInfo.address}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-foreground">Horario</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li className="flex justify-between">
                <span>Lunes - Viernes</span>
                <span className="text-secondary font-semibold">{businessHours.weekdays}</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado</span>
                <span className="text-secondary font-semibold">{businessHours.saturday}</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo</span>
                <span className="text-secondary font-semibold">{businessHours.sunday}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-xs sm:text-sm">
              &copy; 2015-{currentYear} {siteConfig.name}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              {/* Redes Sociales en el footer inferior */}
              <SocialLinks size="sm" />
              <a
                href={whatsappUrls.contact}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-secondary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="WhatsApp"
              >
                <Phone className="h-4 w-4 text-primary-foreground/60 group-hover:text-secondary transition-colors" />
              </a>
              <div className="flex items-center gap-6 text-xs sm:text-sm text-primary-foreground/60">
                <a href="/privacidad" className="hover:text-secondary transition-colors">Política de Privacidad</a>
                <a href="/terminos" className="hover:text-secondary transition-colors">Términos y Condiciones</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
