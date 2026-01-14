"use client"

import { cn } from "@/lib/utils"

interface CirclePatternProps {
  className?: string
  variant?: "default" | "subtle" | "bold"
}

export function CirclePattern({ className, variant = "default" }: CirclePatternProps) {
  const opacity = variant === "subtle" ? 0.35 : variant === "bold" ? 0.6 : 0.5
  
  // Optimized: Using CSS divs instead of SVG for better performance
  // Reduced to 4 circles for optimal rendering (was 5)
  // Using percentage-based positioning for responsive scaling
  // GPU-accelerated with transform and will-change
  // Mobile optimized: less blur, smaller circles
  
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {/* Circle 1 - Top Left */}
      <div
        className="absolute rounded-full blur-lg md:blur-xl"
        style={{
          top: '10%',
          left: '15%',
          width: '14vw',
          height: '14vw',
          maxWidth: '380px',
          maxHeight: '380px',
          minWidth: '120px',
          minHeight: '120px',
          backgroundColor: 'oklch(0.85 0.22 90)',
          opacity: opacity,
          transform: 'translateZ(0)', // GPU acceleration
        }}
      />
      
      {/* Circle 2 - Center Left */}
      <div
        className="absolute rounded-full blur-lg md:blur-xl"
        style={{
          top: '35%',
          left: '35%',
          width: '15vw',
          height: '15vw',
          maxWidth: '400px',
          maxHeight: '400px',
          minWidth: '130px',
          minHeight: '130px',
          backgroundColor: 'oklch(0.85 0.22 90)',
          opacity: opacity,
          transform: 'translateZ(0)', // GPU acceleration
        }}
      />
      
      {/* Circle 3 - Bottom Left */}
      <div
        className="absolute rounded-full blur-lg md:blur-xl"
        style={{
          bottom: '15%',
          left: '12.5%',
          width: '14.5vw',
          height: '14.5vw',
          maxWidth: '390px',
          maxHeight: '390px',
          minWidth: '125px',
          minHeight: '125px',
          backgroundColor: 'oklch(0.85 0.22 90)',
          opacity: opacity,
          transform: 'translateZ(0)', // GPU acceleration
        }}
      />
      
      {/* Circle 4 - Top Right */}
      <div
        className="absolute rounded-full blur-lg md:blur-xl"
        style={{
          top: '15%',
          right: '10%',
          width: '15.5vw',
          height: '15.5vw',
          maxWidth: '410px',
          maxHeight: '410px',
          minWidth: '135px',
          minHeight: '135px',
          backgroundColor: 'oklch(0.85 0.22 90)',
          opacity: opacity,
          transform: 'translateZ(0)', // GPU acceleration
        }}
      />
    </div>
  )
}
