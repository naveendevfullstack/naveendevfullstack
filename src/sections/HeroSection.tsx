import * as m from 'motion/react-m'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import { profile } from '@/data/profile'
import { useSectionNav } from '@/hooks/useSectionNav'
import { Button } from '@/components/common/Button'
import { GithubIcon } from '@/components/common/BrandIcons'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function HeroSection() {
  const goTo = useSectionNav()

  return (
    <div className="relative isolate overflow-hidden rounded-[20px] border border-line bg-card/60">
      {/* Cinematic backdrop: layered light, grid and a horizon line. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-24 size-[520px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -right-32 -bottom-48 size-[520px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(80%_70%_at_30%_30%,black,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--primary),var(--accent),transparent)] opacity-60" />
      </div>

      <div className="grid grid-cols-1 gap-10 px-5 py-10 sm:px-10 sm:py-14 md:pb-20 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-center xl:gap-12 xl:px-12 xl:py-16">
        <div>
          <m.p {...fadeUp(0)} className="font-mono text-xs font-medium tracking-[0.24em] text-primary">
            HELLO, I&apos;M
          </m.p>
          <m.h1
            {...fadeUp(0.05)}
            className="mt-3 text-[clamp(2.75rem,1.6rem+5.2vw,5.25rem)] leading-[0.95] font-bold tracking-[-0.035em]"
          >
            <span className="text-gradient text-gradient-animated">{profile.name}</span>
          </m.h1>
          <m.p {...fadeUp(0.1)} className="mt-5 text-[clamp(1.05rem,0.95rem+0.5vw,1.3rem)] font-medium text-fg">
            {profile.headline}
          </m.p>
          <m.p {...fadeUp(0.15)} className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
            {profile.intro}
          </m.p>

          <m.p
            {...fadeUp(0.2)}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line bg-elevated/70 px-3 py-1.5 text-[13px] font-medium text-fg"
          >
            <Sparkles size={15} className="text-accent" aria-hidden="true" />
            {profile.yearsOfExperience} Years of Development Experience
          </m.p>

          <m.div {...fadeUp(0.25)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button size="lg" onClick={() => goTo('projects')}>
              Explore My Projects
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => goTo('contact')}>
              Get In Touch
            </Button>
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-muted transition-colors hover:text-fg sm:ml-1"
              >
                <GithubIcon size={16} />
                View GitHub Profile
              </a>
            )}
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, y: 20, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden xl:block"
          aria-hidden="true"
        >
          <CodeWindow />
        </m.div>
      </div>

      <button
        type="button"
        onClick={() => goTo('about')}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-3 py-1.5 text-[12px] text-subtle transition-colors hover:text-fg md:inline-flex"
      >
        <m.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: 3, ease: 'easeInOut' }}
          className="inline-flex"
        >
          <ArrowDown size={14} aria-hidden="true" />
        </m.span>
        Scroll to explore
      </button>
    </div>
  )
}

/** Decorative editor card. Purely visual, hidden from assistive tech. */
function CodeWindow() {
  const k = 'text-[#C792EA]'
  const t = 'text-[#82AAFF]'
  const s = 'text-[#C3E88D]'
  const c = 'text-[#5C6B87]'
  const p = 'text-[#E7ECF7]'
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0F1C]/95 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]">
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#FF5F57]/80" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]/80" />
        <span className="size-2.5 rounded-full bg-[#28C840]/80" />
        <span className="ml-3 font-mono text-[11px] text-white/40">lib/main.dart</span>
      </div>
      <pre className="overflow-hidden px-5 py-4 font-mono text-[12.5px] leading-[1.75]">
        <code>
          <span className={c}>{'// Ideas in, reliable products out.'}</span>
          {'\n'}
          <span className={k}>class</span> <span className={t}>Developer</span> <span className={k}>extends</span>{' '}
          <span className={t}>StatelessWidget</span> <span className={p}>{'{'}</span>
          {'\n  '}
          <span className={k}>final</span> <span className={p}>name =</span> <span className={s}>'Naveen M.'</span>
          <span className={p}>;</span>
          {'\n  '}
          <span className={k}>final</span> <span className={p}>stack = [</span>
          <span className={s}>'Flutter'</span>
          <span className={p}>, </span>
          <span className={s}>'Dart'</span>
          <span className={p}>];</span>
          {'\n\n  '}
          <span className={c}>@override</span>
          {'\n  '}
          <span className={t}>Widget</span> <span className={p}>build(</span>
          <span className={t}>BuildContext</span> <span className={p}>context) =&gt;</span>
          {'\n      '}
          <span className={t}>Product</span>
          <span className={p}>(</span>
          {'\n        '}
          <span className={p}>architecture: </span>
          <span className={t}>Clean</span>
          <span className={p}>(),</span>
          {'\n        '}
          <span className={p}>ui: </span>
          <span className={t}>Responsive</span>
          <span className={p}>(),</span>
          {'\n        '}
          <span className={p}>code: </span>
          <span className={t}>Maintainable</span>
          <span className={p}>(),</span>
          {'\n      '}
          <span className={p}>);</span>
          {'\n'}
          <span className={p}>{'}'}</span>
          <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-[3px] animate-pulse bg-primary/80 motion-reduce:animate-none" />
        </code>
      </pre>
    </div>
  )
}
