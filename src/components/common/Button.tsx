import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { buttonClass, type Size, type Variant } from './buttonStyles'

interface Common {
  variant?: Variant
  size?: Size
  children: ReactNode
}

export function Button({ variant, size, className, type = 'button', ...props }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />
}

export function ButtonAnchor({ variant, size, className, ...props }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = props.href?.startsWith('http')
  return (
    <a
      className={buttonClass(variant, size, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    />
  )
}

export function ButtonLink({ variant, size, className, ...props }: Common & LinkProps) {
  return <Link className={buttonClass(variant, size, className)} {...props} />
}
