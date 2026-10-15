import { LazyMotion, MotionConfig } from 'motion/react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

const loadMotionFeatures = () => import('@/lib/motionFeatures').then((mod) => mod.default)

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <RouterProvider router={router} />
      </LazyMotion>
    </MotionConfig>
  )
}
