"use client"

import { cn } from "@/lib/utils"

interface CirclePatternProps {
  className?: string
  variant?: "default" | "subtle" | "bold"
}

export function CirclePattern({ className, variant = "default" }: CirclePatternProps) {
  const opacity = variant === "subtle" ? 0.2 : variant === "bold" ? 0.4 : 0.3
  
  // Hyper-optimized: Minimal circles, lighter blur for maximum performance
  // Mobile: 1 circle with blur-sm (minimal)
  // Desktop: 2 circles with blur-md (reduced from blur-xl)
  // Removed third circle for better performance
  
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
    >
      {/* Circle 1 - Top Left - Visible on all devices with minimal blur */}
      <div
        className="absolute rounded-full blur-sm"
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
          transform: 'translateZ(0)',
        }}
      />
      
      {/* Circle 2 - Center Left - Desktop only with reduced blur */}
      <div
        className="hidden md:block absolute rounded-full blur-md"
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
          opacity: opacity * 0.7, // Reduced opacity
          transform: 'translateZ(0)',
        }}
      />
    </div>
  )
}
