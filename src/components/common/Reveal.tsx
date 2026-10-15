import type { HTMLMotionProps } from 'motion/react'
import * as m from 'motion/react-m'

/** Fades content up once as it enters the viewport. Respects reduced motion via MotionConfig. */
export function Reveal({ delay = 0, ...props }: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  )
}
