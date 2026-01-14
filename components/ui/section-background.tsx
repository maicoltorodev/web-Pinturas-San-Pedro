import { CirclePattern } from "./circle-pattern"

interface SectionBackgroundProps {
  variant?: "primary" | "gradient"
  className?: string
}

export function SectionBackground({ variant = "primary", className }: SectionBackgroundProps) {
  return (
    <div className={`absolute inset-0 z-0 ${className || ""}`}>
      {variant === "primary" ? (
        <>
          {/* Gradiente base simplificado en móvil */}
          <div className="absolute inset-0 bg-primary md:bg-gradient-to-br md:from-primary md:via-primary md:to-[oklch(0.25_0.15_252)]" />
          {/* CirclePattern solo en desktop - pesado en móvil */}
          <div className="hidden md:block">
            <CirclePattern variant="default" />
          </div>
          {/* Overlay de gradiente solo en desktop */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
          {/* Círculos solo en desktop - pesados en móvil */}
          <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/35 rounded-full blur-xl animate-pulse" />
          <div className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/25 rounded-full blur-xl animate-pulse delay-1000" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      )}
    </div>
  )
}
