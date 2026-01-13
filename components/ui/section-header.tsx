"use client"

import { useInView } from "@/lib/useInView"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  badge?: {
    icon?: LucideIcon
    text: string
  }
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  description?: string
  className?: string
}

export function SectionHeader({ badge, title, subtitle, description, className }: SectionHeaderProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ 
    threshold: 0.1, 
    rootMargin: "-50px",
    triggerOnce: true 
  })

  return (
    <div 
      ref={ref}
      className={cn(
        "text-center mb-16 md:mb-20 transition-opacity duration-300",
        isInView ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
          {badge.icon && <badge.icon className="h-4 w-4 text-secondary" />}
          <span className="text-xs sm:text-sm font-bold text-secondary uppercase tracking-wider">
            {badge.text}
          </span>
        </div>
      )}
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
        {typeof title === 'string' ? (
          <span className="block">{title}</span>
        ) : title}
        {subtitle && (
          typeof subtitle === 'string' ? (
            <span className="block gradient-text">{subtitle}</span>
          ) : subtitle
        )}
      </h2>
      {description && (
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
