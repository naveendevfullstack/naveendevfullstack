import { cn } from '@/lib/utils'

export type Variant = 'primary' | 'secondary' | 'ghost'
export type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 select-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-fg shadow-[0_8px_24px_-10px_var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_88%,white)] disabled:hover:bg-primary',
  secondary: 'border border-line-strong bg-elevated/60 text-fg hover:border-primary/50 hover:bg-elevated',
  ghost: 'text-muted hover:bg-elevated hover:text-fg',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-[15px]',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}
