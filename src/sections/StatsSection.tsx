import * as m from 'motion/react-m'
import { stats } from '@/data/profile'
import { StatCard } from '@/components/common/StatCard'

export function StatsSection() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label="At a glance">
      {stats.map((stat, i) => (
        <m.li
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <StatCard stat={stat} />
        </m.li>
      ))}
    </ul>
  )
}
