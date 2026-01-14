"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import emailjs from '@emailjs/browser'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionBackground } from "@/components/ui/section-background"
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Datos estáticos fuera del componente para evitar recreación
const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    content: "+57 322 3716811",
    href: "tel:+573223716811",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Mail,
    title: "Correo",
    content: "pinturassanpedro@hotmail.com",
    href: "mailto:pinturassanpedro@hotmail.com",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    content: "Calle 132D N 145A-02, Bogotá",
    href: null,
    color: "from-purple-500 to-purple-600",
  },
] as const

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })
    
    // Limpiar timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    
    try {
      // Validar que las variables de entorno estén configuradas
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Configuración de EmailJS incompleta. Por favor, contacta al administrador.')
      }

      // Enviar correo usando EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: 'pinturassanpedro@hotmail.com',
        },
        publicKey
      )

      // Éxito
      setSubmitStatus({
        type: 'success',
        message: '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.'
      })
      
      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" })
      
      // Limpiar mensaje de éxito después de 5 segundos
      timeoutRef.current = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' })
        timeoutRef.current = null
      }, 5000)
    } catch (error) {
      // Error
      console.error('Error al enviar correo:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente por teléfono.'
      })
      
      // Limpiar mensaje de error después de 5 segundos
      timeoutRef.current = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' })
        timeoutRef.current = null
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }, [formData])

  // Cleanup de timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  // Handler genérico memoizado para inputs
  const handleInputChange = useCallback((field: keyof typeof formData) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }))
    }, [])

  return (
    <section id="contact" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      <SectionBackground variant="primary" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={{ icon: Sparkles, text: "Contáctanos" }}
          title="Hablemos de"
          subtitle="Tus Necesidades"
          description="¿Buscas productos de pintura de calidad? Contáctanos para una consulta gratuita y encuentra el producto perfecto para tu proyecto"
          className="text-primary-foreground [&_p]:text-primary-foreground/80"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-primary-foreground/20 bg-card/80 md:backdrop-blur-sm shadow-premium md:hover:shadow-premium-lg transition-all duration-500">
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
                        onChange={handleInputChange('name')}
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
                        onChange={handleInputChange('email')}
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
                      onChange={handleInputChange('phone')}
                      required
                      className="h-14 rounded-xl border-2 focus:border-secondary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                      Detalles de tu Consulta
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos qué productos de pintura necesitas, para qué los vas a usar, tus preferencias de color..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange('message')}
                      required
                      className="min-h-40 rounded-xl border-2 focus:border-secondary transition-colors resize-none"
                    />
                  </div>
                  {/* Mensajes de estado */}
                  {submitStatus.type && (
                    <div
                      className={cn(
                        "p-4 rounded-xl border-2 flex items-start gap-3 animate-in fade-in slide-in-from-top-2",
                        submitStatus.type === 'success'
                          ? "bg-green-50 border-green-200 text-green-800"
                          : "bg-red-50 border-red-200 text-red-800"
                      )}
                    >
                      {submitStatus.type === 'success' ? (
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-sm font-medium flex-1">{submitStatus.message}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-16 text-lg rounded-xl shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed animate-button-glow disabled:animate-none"
                  >
                    {isSubmitting ? (
                      <>
                        Enviando...
                        <Sparkles className="ml-2 h-5 w-5 animate-spin" />
                      </>
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

          <div className="space-y-6">
            {contactInfo.map((info) => {
              const Icon = info.icon
              return (
                <Card
                  key={info.title}
                  className="border-2 border-primary-foreground/20 bg-card/80 md:backdrop-blur-sm md:hover:border-secondary md:hover:shadow-premium-lg transition-all duration-500 md:hover:-translate-y-1 group cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg md:group-hover:scale-110 transition-transform duration-300",
                        info.color
                      )}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-2 text-base md:group-hover:text-secondary transition-colors">
                          {info.title}
                        </h3>
                        {info.href ? (
                          <a href={info.href} className="text-foreground/80 hover:text-secondary transition-colors text-sm break-all block">
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-foreground/80 text-sm">{info.content}</p>
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
