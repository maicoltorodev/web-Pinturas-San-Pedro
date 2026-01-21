/**
 * Componente reutilizable para enlaces de redes sociales
 */

import { Facebook, Instagram } from 'lucide-react'
import { TikTokIcon } from './tiktok-icon'
import { socialLinks } from '@/lib/constants/site'
import type { SocialLink as SocialLinkType } from '@/lib/types'
import { cn } from '@/lib/utils'

interface SocialLinkProps {
  link: SocialLinkType
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const iconMap = {
  Facebook,
  Instagram,
  TikTok: TikTokIcon,
}

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

export function SocialLink({ link, size = 'md', className }: SocialLinkProps) {
  const Icon = iconMap[link.icon as keyof typeof iconMap] || Facebook

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'rounded-full bg-primary-foreground/10 hover:bg-secondary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group',
        size === 'sm' && 'w-8 h-8',
        size === 'md' && 'w-9 h-9',
        size === 'lg' && 'w-10 h-10',
        className
      )}
      aria-label={link.ariaLabel}
    >
      <Icon
        className={cn(
          'text-primary-foreground/90 group-hover:text-secondary transition-colors',
          sizeClasses[size]
        )}
      />
    </a>
  )
}

interface SocialLinksProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SocialLinks({ size = 'md', className }: SocialLinksProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {socialLinks.map((link) => (
        <SocialLink key={link.name} link={link} size={size} />
      ))}
    </div>
  )
}
