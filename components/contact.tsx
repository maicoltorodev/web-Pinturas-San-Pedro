"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CirclePattern } from "@/components/ui/circle-pattern"
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react"
import { useInView } from "@/lib/useInView"
import { cn } from "@/lib/utils"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { ref: sectionRef, isInView: sectionInView } = useInView({ threshold: 0.2, triggerOnce: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfono",
      content: "+34 123 456 789",
      href: "tel:+34123456789",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Mail,
      title: "Correo",
      content: "info@pinturassanpedro.com",
      href: "mailto:info@pinturassanpedro.com",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Colombia",
      href: null,
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <section id="contact" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
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
        <div className={cn(
          "text-center mb-16 md:mb-20 transition-all duration-1000",
          sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-wider">
              Contáctanos
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 leading-tight">
            <span className="block">Hablemos de</span>
            <span className="block gradient-text">Tu Proyecto</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            ¿Listo para transformar tu espacio? Contáctanos para una consulta gratuita 
            y descubre cómo podemos hacer realidad tu visión
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-primary-foreground/20 bg-card/80 backdrop-blur-sm shadow-premium hover:shadow-premium-lg transition-all duration-500">
              <CardContent className="p-6 md:p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                        Nombre Completo
                      </label>
                      <Input
                        id="name"
                        placeholder="Juan Pérez"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-14 rounded-xl border-2 focus:border-secondary transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                        Correo Electrónico
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="juan@ejemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-14 rounded-xl border-2 focus:border-secondary transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground">
                      Número de Teléfono
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-14 rounded-xl border-2 focus:border-secondary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                      Detalles del Proyecto
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos sobre tu proyecto de pintura, qué espacios quieres transformar, tus preferencias de color..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="min-h-40 rounded-xl border-2 focus:border-secondary transition-colors resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-16 text-lg rounded-xl shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed animate-button-glow disabled:animate-none"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        Solicitar Cotización Gratis
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <Card
                  key={index}
                  className={cn(
                    "border-2 border-primary-foreground/20 bg-card/80 backdrop-blur-sm",
                    "hover:border-secondary hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-1",
                    "group cursor-pointer"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br",
                        info.color,
                        "flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      )}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-2 text-base group-hover:text-secondary transition-colors">
                          {info.title}
                        </h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-muted-foreground hover:text-secondary transition-colors text-sm break-all block"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-muted-foreground text-sm">{info.content}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
