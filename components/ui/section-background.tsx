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
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[oklch(0.25_0.15_252)]" />
          <CirclePattern variant="default" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
          {/* Círculos optimizados para móvil y desktop */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-secondary/25 md:bg-secondary/35 rounded-full blur-2xl md:blur-3xl md:animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-96 md:h-96 bg-secondary/20 md:bg-secondary/25 rounded-full blur-2xl md:blur-3xl md:animate-pulse md:delay-1000" />
          {/* Círculo adicional pequeño para móvil */}
          <div className="md:hidden absolute top-3/4 right-1/3 w-32 h-32 bg-secondary/15 rounded-full blur-xl" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      )}
    </div>
  )
}
