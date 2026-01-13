"use client"

import { CheckCircle2, ArrowRight, MessageSquare, Palette, Wrench, Paintbrush, CheckCircle } from "lucide-react"
import { useInView } from "@/lib/useInView"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Consulta y Cotización",
    description:
      "Nos reunimos contigo para entender tu visión, evaluar el espacio y proporcionar una cotización detallada y transparente.",
    icon: MessageSquare,
    color: "from-blue-500 to-blue-600",
  },
  {
    number: "02",
    title: "Selección de Color",
    description:
      "Nuestros expertos te ayudan a elegir los colores y acabados perfectos que complementan tu espacio y estilo.",
    icon: Palette,
    color: "from-purple-500 to-purple-600",
  },
  {
    number: "03",
    title: "Preparación",
    description:
      "Preparación exhaustiva de la superficie incluyendo limpieza, lijado y imprimación para garantizar un acabado impecable.",
    icon: Wrench,
    color: "from-amber-500 to-amber-600",
  },
  {
    number: "04",
    title: "Aplicación Profesional",
    description:
      "Nuestro equipo experto aplica pinturas premium con precisión, asegurando cobertura uniforme y líneas limpias.",
    icon: Paintbrush,
    color: "from-green-500 to-green-600",
  },
  {
    number: "05",
    title: "Inspección Final",
    description:
      "Realizamos un recorrido exhaustivo contigo, asegurando que cada detalle cumpla con nuestros altos estándares y tus expectativas.",
    icon: CheckCircle,
    color: "from-secondary to-secondary/80",
  },
]

function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.4, triggerOnce: true })
  const Icon = step.icon

  return (
    <div 
      ref={ref}
      className={cn(
        "group relative transition-all duration-700 ease-out",
        isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Connection Line mejorada */}
      {index < steps.length - 1 && (
        <div className="absolute left-12 top-24 w-1 h-full hidden md:block">
          <div className="w-full h-full bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent rounded-full" />
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-secondary/60 to-transparent rounded-full animate-pulse" />
        </div>
      )}

      <div className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        {/* Step Number & Icon mejorado */}
        <div className="flex-shrink-0 relative z-10">
          <div
            className={cn(
              "w-24 h-24 rounded-3xl bg-gradient-to-br flex items-center justify-center",
              "border-4 border-white shadow-2xl",
              "transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
              "group-hover:shadow-3xl",
              step.color,
              isInView && "ring-4 ring-secondary/30"
            )}
          >
            <Icon className="h-12 w-12 text-white drop-shadow-lg" />
          </div>
          {/* Badge con número */}
          <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-secondary flex items-center justify-center border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300">
            <span className="text-sm font-black text-secondary-foreground">{step.number}</span>
          </div>
        </div>

        {/* Content mejorado */}
        <div className="flex-1 pb-8 md:pb-12">
          <div className="bg-white rounded-3xl p-8 md:p-10 border-2 border-border/50 shadow-lg transition-all duration-500 group-hover:border-secondary group-hover:shadow-2xl group-hover:-translate-y-1 relative overflow-hidden">
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 via-secondary/0 to-secondary/0 group-hover:from-secondary/5 group-hover:via-secondary/10 group-hover:to-secondary/5 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground group-hover:text-secondary transition-colors duration-300 leading-tight">
                  {step.title}
                </h3>
                <CheckCircle2
                  className={cn(
                    "h-8 w-8 text-secondary transition-all duration-300 flex-shrink-0",
                    "opacity-0 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12",
                    isInView && "opacity-100"
                  )}
                />
              </div>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 font-medium">
                {step.description}
              </p>
              
              {/* Indicador de progreso */}
              <div className="flex items-center justify-between pt-6 border-t-2 border-border/50 group-hover:border-secondary/50 transition-colors duration-300">
                <div className="flex items-center gap-3 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {index < steps.length - 1 ? (
                    <>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                      <span className="text-sm font-bold uppercase tracking-wider">Siguiente paso</span>
                    </>
                  ) : (
                    <span className="text-sm font-bold uppercase tracking-wider">Paso final</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {steps.map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        idx === index
                          ? "bg-secondary w-6"
                          : idx < index
                          ? "bg-secondary/50"
                          : "bg-border"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Process() {
  const { ref: sectionRef, isInView: sectionInView } = useInView<HTMLDivElement>({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="process" className="relative py-20 md:py-32 lg:py-40 bg-background overflow-hidden">

      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={cn(
          "text-center mb-16 md:mb-20 transition-all duration-1000",
          sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 border-2 border-secondary/20 mb-8 shadow-sm">
            <span className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-wider">
              Nuestro Proceso Profesional
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight">
            <span className="block">Cómo Trabajamos</span>
            <span className="block">
              <span className="gradient-text">De Forma Profesional</span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            Un enfoque sistemático y eficiente que garantiza resultados excepcionales 
            en cada proyecto, desde la consulta inicial hasta la entrega final. 
            Cada paso está diseñado para superar tus expectativas.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            {steps.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
