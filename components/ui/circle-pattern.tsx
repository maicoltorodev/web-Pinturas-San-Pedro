import { cn } from "@/lib/utils"

interface CirclePatternProps {
  className?: string
  variant?: "default" | "subtle" | "bold"
}

export function CirclePattern({ className, variant = "default" }: CirclePatternProps) {
  const opacity = variant === "subtle" ? 0.35 : variant === "bold" ? 0.6 : 0.5

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Random distribution for more natural look - Más amarillos y visibles */}
        <circle cx="180" cy="120" r="95" fill="oklch(0.85 0.22 90)" fillOpacity={opacity} />
        <circle cx="420" cy="280" r="85" fill="oklch(0.85 0.22 90)" fillOpacity={opacity * 0.95} />
        <circle cx="150" cy="680" r="100" fill="oklch(0.85 0.22 90)" fillOpacity={opacity * 0.9} />
        <circle cx="1080" cy="180" r="110" fill="oklch(0.85 0.22 90)" fillOpacity={opacity} />
        <circle cx="920" cy="450" r="80" fill="oklch(0.85 0.22 90)" fillOpacity={opacity * 0.92} />
        <circle cx="1050" cy="720" r="90" fill="oklch(0.85 0.22 90)" fillOpacity={opacity * 0.95} />
        <circle cx="650" cy="350" r="105" fill="oklch(0.85 0.22 90)" fillOpacity={opacity * 0.88} />
      </svg>
    </div>
  )
}
