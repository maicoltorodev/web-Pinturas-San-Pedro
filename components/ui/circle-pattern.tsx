"use client"

import { cn } from "@/lib/utils"

interface CirclePatternProps {
  className?: string
  variant?: "default" | "subtle" | "bold"
}

export function CirclePattern({ className, variant = "default" }: CirclePatternProps) {
  const opacity = variant === "subtle" ? 0.35 : variant === "bold" ? 0.6 : 0.5
  
  // Optimized: Using CSS divs instead of SVG for better performance
  // Mobile: 1 circle with blur-sm for better performance
  // Desktop: 3 circles with blur-xl
  // GPU-accelerated with transform
  // Mobile optimized: reduced blur and fewer circles
  
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {/* Circle 1 - Top Left - Visible on all devices */}
      <div
        className="absolute rounded-full blur-sm md:blur-xl"
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
      
      {/* Circle 2 - Center Left - Desktop only */}
      <div
        className="hidden md:block absolute rounded-full blur-xl"
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
      
      {/* Circle 3 - Bottom Left - Desktop only */}
      <div
        className="hidden md:block absolute rounded-full blur-xl"
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
    </div>
  )
}
