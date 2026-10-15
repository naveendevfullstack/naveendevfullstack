import { createContext, useContext, useId, type ReactNode } from 'react'
import type { Project, ProjectArtKind } from '@/types'

/**
 * Original illustrative mockups, one per product category. They are generic
 * UI sketches, not screenshots of the real apps, and the UI labels them so.
 * Replace with real screenshots via `project.screenshots`.
 */

const W = 640
const H = 400
// Phone screen bounds
const SX = 236
const SY = 58
const SW = 168

/** Per-instance prefix so gradient/filter ids never collide between cards. */
const UidContext = createContext('')

const FG = '#E7ECF7'
const DIM = '#8A97B0'
const SURFACE = '#111A2E'
const SURFACE_2 = '#18233A'

function Bar({ x, y, w, h = 6, o = 0.5, fill = DIM, r }: { x: number; y: number; w: number; h?: number; o?: number; fill?: string; r?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r ?? h / 2} fill={fill} opacity={o} />
}

function Card({ x, y, w, h, children, r = 12 }: { x: number; y: number; w: number; h: number; children?: ReactNode; r?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={SURFACE} stroke="#ffffff" strokeOpacity="0.08" />
      {children}
    </g>
  )
}

/** Floating card that sits beside the phone. */
function Float({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children: ReactNode }) {
  const uid = useContext(UidContext)
  return (
    <g filter={`url(#shadow-${uid})`}>
      <rect x={x} y={y} width={w} height={h} rx={14} fill="#0E1628" stroke="#ffffff" strokeOpacity="0.1" />
      {children}
    </g>
  )
}

function StatusBar({ title, accent }: { title: string; accent: string }) {
  return (
    <g>
      <Bar x={SX + 14} y={SY + 12} w={22} h={4} o={0.4} />
      <rect x={SX + SW / 2 - 22} y={SY + 8} width={44} height={12} rx={6} fill="#05080F" />
      <Bar x={SX + SW - 34} y={SY + 12} w={20} h={4} o={0.4} />
      <text x={SX + 14} y={SY + 46} fill={FG} fontSize="15" fontWeight="600" fontFamily="Geist, system-ui, sans-serif">
        {title}
      </text>
      <circle cx={SX + SW - 22} cy={SY + 41} r={9} fill={accent} opacity={0.22} />
      <circle cx={SX + SW - 22} cy={SY + 41} r={4} fill={accent} />
    </g>
  )
}

function Food({ a }: { a: string }) {
  const chips = ['#F97316', '#EF4444', '#EAB308', '#22C55E']
  return {
    screen: (
      <>
      <StatusBar title="Discover" accent={a} />
      <rect x={SX + 14} y={SY + 60} width={SW - 28} height={26} rx={13} fill={SURFACE_2} />
      <Bar x={SX + 30} y={SY + 70} w={60} o={0.35} />
      {chips.map((c, i) => (
        <g key={c}>
          <circle cx={SX + 32 + i * 36} cy={SY + 112} r={14} fill={c} opacity={0.22} />
          <circle cx={SX + 32 + i * 36} cy={SY + 112} r={6} fill={c} />
        </g>
      ))}
      {[0, 1].map((i) => (
        <Card key={i} x={SX + 14} y={SY + 140 + i * 92} w={SW - 28} h={82}>
          <rect x={SX + 22} y={SY + 148 + i * 92} width={SW - 44} height={42} rx={8} fill={i ? '#3B1E0E' : '#2A1A0C'} />
          <circle cx={SX + SW / 2} cy={SY + 169 + i * 92} r={15} fill={a} opacity={0.85} />
          <circle cx={SX + SW / 2 - 4} cy={SY + 165 + i * 92} r={5} fill="#FDE68A" opacity={0.9} />
          <Bar x={SX + 22} y={SY + 198 + i * 92} w={70} o={0.8} fill={FG} />
          <Bar x={SX + 22} y={SY + 210 + i * 92} w={46} h={5} o={0.35} />
          <Bar x={SX + SW - 54} y={SY + 200 + i * 92} w={32} h={14} r={7} fill={a} o={0.9} />
        </Card>
      ))}
      </>
    ),
    floats: (
      <>
      <Float x={438} y={196} w={170} h={128}>
        <Bar x={454} y={214} w={80} o={0.8} fill={FG} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={462} cy={244 + i * 26} r={7} fill={i < 2 ? a : '#2A3550'} />
            {i < 2 && <path d={`M458.5 ${244 + i * 26}l2.5 2.5 4.5-5`} stroke="#0E1628" strokeWidth="2" fill="none" strokeLinecap="round" />}
            {i < 2 && <line x1={462} y1={251 + i * 26} x2={462} y2={263 + i * 26} stroke={a} strokeOpacity="0.5" strokeWidth="2" />}
            <Bar x={478} y={241 + i * 26} w={[78, 96, 64][i]} o={i < 2 ? 0.6 : 0.3} />
          </g>
        ))}
      </Float>
      <Float x={36} y={92} w={160} h={70}>
        <circle cx={66} cy={127} r={16} fill={a} opacity={0.2} />
        <path d="M60 127h12M66 121v12" stroke={a} strokeWidth="2.5" strokeLinecap="round" />
        <Bar x={92} y={116} w={78} o={0.8} fill={FG} />
        <Bar x={92} y={130} w={52} h={5} o={0.35} />
      </Float>
      </>
    ),
  }
}

function Trading({ a }: { a: string }) {
  const uid = useContext(UidContext)
  const line = 'M0 60 L18 52 L34 56 L52 38 L70 44 L88 26 L106 32 L124 14 L140 20'
  return {
    screen: (
      <>
      <StatusBar title="Portfolio" accent={a} />
      <Bar x={SX + 14} y={SY + 66} w={52} h={5} o={0.35} />
      <Bar x={SX + 14} y={SY + 80} w={104} h={14} o={0.9} fill={FG} r={4} />
      <Bar x={SX + 14} y={SY + 102} w={44} h={10} fill={a} o={0.9} r={5} />
      <g transform={`translate(${SX + 14} ${SY + 122})`}>
        <path d={`${line} L140 72 L0 72Z`} fill={`url(#area-${uid})`} />
        <path d={line} fill="none" stroke={a} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={SX + 14} y={SY + 212 + i * 38} width={SW - 28} height={30} rx={8} fill={SURFACE} />
          <circle cx={SX + 30} cy={SY + 227 + i * 38} r={8} fill={['#3B82F6', '#A855F7', '#F97316', '#06B6D4'][i]} opacity={0.8} />
          <Bar x={SX + 44} y={SY + 220 + i * 38} w={40} h={5} o={0.75} fill={FG} />
          <Bar x={SX + 44} y={SY + 230 + i * 38} w={26} h={4} o={0.3} />
          <path
            d={`M${SX + 98} ${SY + 232 + i * 38} l8 -4 l6 3 l8 -7 l8 2`}
            stroke={i === 2 ? '#F87171' : a}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      ))}
      </>
    ),
    floats: (
      <>
      <Float x={440} y={110} w={168} h={150}>
        <Bar x={456} y={128} w={64} o={0.7} fill={FG} />
        {[30, 48, 22, 56, 40, 64, 52].map((h, i) => {
          const up = i % 3 !== 2
          const x = 462 + i * 20
          return (
            <g key={i}>
              <line x1={x} y1={242 - h - 10} x2={x} y2={246} stroke={up ? a : '#F87171'} strokeOpacity="0.6" />
              <rect x={x - 5} y={242 - h} width={10} height={h - 6} rx={2} fill={up ? a : '#F87171'} />
            </g>
          )
        })}
      </Float>
      <Float x={36} y={232} w={160} h={66}>
        <Bar x={52} y={250} w={52} h={5} o={0.35} />
        <Bar x={52} y={264} w={90} h={12} o={0.85} fill={FG} r={4} />
        <Bar x={150} y={265} w={30} h={10} fill={a} o={0.9} r={5} />
      </Float>
      </>
    ),
  }
}

function Travel({ a }: { a: string }) {
  return {
    screen: (
      <>
      <StatusBar title="My trip" accent={a} />
      <rect x={SX + 14} y={SY + 62} width={SW - 28} height={150} rx={12} fill="#0D2230" />
      <g opacity="0.35" stroke="#2D5A6E" strokeWidth="6" strokeLinecap="round">
        <path d={`M${SX + 14} ${SY + 120} Q ${SX + 80} ${SY + 100} ${SX + SW - 14} ${SY + 140}`} fill="none" />
        <path d={`M${SX + 70} ${SY + 62} L ${SX + 100} ${SY + 212}`} />
      </g>
      <path
        d={`M${SX + 38} ${SY + 186} C ${SX + 60} ${SY + 130}, ${SX + 110} ${SY + 160}, ${SX + 130} ${SY + 92}`}
        stroke={a}
        strokeWidth="3"
        fill="none"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
      <circle cx={SX + 38} cy={SY + 186} r={7} fill={FG} />
      <circle cx={SX + 38} cy={SY + 186} r={3} fill={a} />
      <path
        d={`M${SX + 130} ${SY + 74} a12 12 0 0 1 12 12c0 9-12 20-12 20s-12-11-12-20a12 12 0 0 1 12-12z`}
        fill={a}
      />
      <circle cx={SX + 130} cy={SY + 86} r={4} fill="#0D2230" />
      {[0, 1].map((i) => (
        <Card key={i} x={SX + 14} y={SY + 224 + i * 50} w={SW - 28} h={42} r={10}>
          <rect x={SX + 22} y={SY + 232 + i * 50} width={26} height={26} rx={8} fill={a} opacity={0.18} />
          <Bar x={SX + 29} y={SY + 243 + i * 50} w={12} h={4} fill={a} o={1} />
          <Bar x={SX + 56} y={SY + 234 + i * 50} w={64} h={5} fill={FG} o={0.75} />
          <Bar x={SX + 56} y={SY + 246 + i * 50} w={42} h={4} o={0.35} />
        </Card>
      ))}
      </>
    ),
    floats: (
      <>
      <Float x={436} y={86} w={176} h={76}>
        <rect x={452} y={104} width={36} height={36} rx={10} fill={a} opacity={0.18} />
        <path d="M470 112v8l5 4" stroke={a} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx={470} cy={120} r={11} stroke={a} strokeWidth="2" fill="none" />
        <Bar x={500} y={110} w={84} o={0.8} fill={FG} />
        <Bar x={500} y={124} w={58} h={5} o={0.35} />
      </Float>
      <Float x={32} y={210} w={168} h={88}>
        <Bar x={48} y={228} w={60} h={5} o={0.4} />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={48 + i * 28} y={244} width={22} height={34} rx={7} fill={i === 2 ? a : SURFACE_2} opacity={i === 2 ? 0.9 : 1} />
        ))}
      </Float>
      </>
    ),
  }
}

function CarWash({ a }: { a: string }) {
  return {
    screen: (
      <>
      <StatusBar title="My vehicles" accent={a} />
      <Card x={SX + 14} y={SY + 62} w={SW - 28} h={92}>
        <g transform={`translate(${SX + 34} ${SY + 82})`}>
          <path d="M6 34 L14 16 Q18 8 28 8 L72 8 Q82 8 88 16 L100 34 Q108 36 108 44 L108 50 L-2 50 L-2 44 Q-2 36 6 34Z" fill={a} opacity={0.85} />
          <path d="M20 30 L26 16 L48 16 L48 30Z M56 30 L56 16 L78 16 L88 30Z" fill="#0A1426" opacity={0.65} />
          <circle cx={22} cy={52} r={9} fill="#0A1426" stroke={FG} strokeOpacity={0.5} strokeWidth="3" />
          <circle cx={86} cy={52} r={9} fill="#0A1426" stroke={FG} strokeOpacity={0.5} strokeWidth="3" />
        </g>
      </Card>
      <Bar x={SX + 14} y={SY + 168} w={60} h={5} o={0.4} />
      {['One-time', 'Plan'].map((label, i) => (
        <g key={label}>
          <rect
            x={SX + 14 + i * 74}
            y={SY + 182}
            width={66}
            height={56}
            rx={10}
            fill={i ? `${a}22` : SURFACE}
            stroke={i ? a : '#ffffff'}
            strokeOpacity={i ? 0.9 : 0.08}
          />
          <text x={SX + 24 + i * 74} y={SY + 204} fill={FG} fontSize="10" fontWeight="600" fontFamily="Geist, system-ui, sans-serif">
            {label}
          </text>
          <Bar x={SX + 24 + i * 74} y={SY + 216} w={34} h={4} o={0.35} />
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={SX + 14 + (i % 3) * 48}
          y={SY + 250 + Math.floor(i / 3) * 30}
          width={42}
          height={22}
          rx={6}
          fill={i === 4 ? a : SURFACE_2}
        />
      ))}
      </>
    ),
    floats: (
      <>
      <Float x={440} y={92} w={170} h={110}>
        <circle cx={468} cy={120} r={13} fill="#22C55E" opacity={0.2} />
        <path d="M462 120l4 4 8-8" stroke="#22C55E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <Bar x={490} y={113} w={80} o={0.8} fill={FG} />
        <Bar x={490} y={126} w={54} h={5} o={0.35} />
        <rect x={456} y={150} width={138} height={6} rx={3} fill={SURFACE_2} />
        <rect x={456} y={150} width={92} height={6} rx={3} fill={a} />
        <Bar x={456} y={168} w={40} h={5} o={0.35} />
        <Bar x={556} y={168} w={38} h={5} o={0.35} />
      </Float>
      <Float x={32} y={220} w={170} h={80}>
        <circle cx={60} cy={260} r={14} fill={SURFACE_2} />
        <circle cx={60} cy={255} r={5} fill={DIM} />
        <path d="M51 268a9 7 0 0 1 18 0" fill={DIM} />
        <Bar x={84} y={248} w={58} o={0.8} fill={FG} />
        <Bar x={84} y={262} w={86} h={5} o={0.35} />
        <rect x={150} y={244} width={34} height={12} rx={6} fill={a} opacity={0.25} />
      </Float>
      </>
    ),
  }
}

function Astrology({ a }: { a: string }) {
  const cx = SX + SW / 2
  const cy = SY + 140
  return {
    screen: (
      <>
      <StatusBar title="Today" accent={a} />
      <circle cx={cx} cy={cy} r={62} fill="none" stroke={a} strokeOpacity="0.5" />
      <circle cx={cx} cy={cy} r={44} fill="none" stroke={a} strokeOpacity="0.25" />
      {Array.from({ length: 12 }).map((_, i) => {
        const ang = (i / 12) * Math.PI * 2
        return (
          <g key={i}>
            <line
              x1={cx + Math.cos(ang) * 44}
              y1={cy + Math.sin(ang) * 44}
              x2={cx + Math.cos(ang) * 62}
              y2={cy + Math.sin(ang) * 62}
              stroke={a}
              strokeOpacity="0.35"
            />
            <circle cx={cx + Math.cos(ang + 0.26) * 53} cy={cy + Math.sin(ang + 0.26) * 53} r={1.8} fill={FG} opacity={0.6} />
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r={20} fill={a} opacity={0.25} />
      <path d={`M${cx} ${cy - 10} l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z`} fill={a} />
      <rect x={SX + 14} y={SY + 220} width={110} height={28} rx={12} fill={SURFACE_2} />
      <Bar x={SX + 24} y={SY + 231} w={80} h={5} o={0.5} />
      <rect x={SX + SW - 114} y={SY + 256} width={100} height={28} rx={12} fill={a} opacity={0.85} />
      <Bar x={SX + SW - 104} y={SY + 267} w={70} h={5} fill="#ffffff" o={0.8} />
      <rect x={SX + 14} y={SY + 292} width={90} height={28} rx={12} fill={SURFACE_2} />
      <Bar x={SX + 24} y={SY + 303} w={60} h={5} o={0.5} />
      </>
    ),
    floats: (
      <>
      <Float x={438} y={110} w={172} h={92}>
        <circle cx={466} cy={140} r={13} fill={a} />
        <path d="M462 134v12l10-6z" fill="#fff" />
        {[10, 22, 14, 30, 18, 26, 12, 24, 16, 28, 10, 20].map((h, i) => (
          <rect key={i} x={488 + i * 9} y={140 - h / 2} width={5} height={h} rx={2.5} fill={a} opacity={i < 6 ? 1 : 0.35} />
        ))}
        <Bar x={456} y={170} w={52} h={5} o={0.35} />
        <Bar x={560} y={170} w={32} h={5} o={0.35} />
      </Float>
      <Float x={34} y={226} w={166} h={74}>
        <rect x={50} y={244} width={38} height={38} rx={12} fill={a} opacity={0.18} />
        <path d="M69 252l2.5 6 6.5.5-5 4 1.6 6.3L69 265l-5.6 3.8 1.6-6.3-5-4 6.5-.5z" fill={a} />
        <Bar x={98} y={252} w={76} o={0.8} fill={FG} />
        <Bar x={98} y={266} w={52} h={5} o={0.35} />
      </Float>
      </>
    ),
  }
}

function Ride({ a }: { a: string }) {
  return {
    screen: (
      <>
      <rect x={SX} y={SY} width={SW} height={H - SY} fill="#0C1424" />
      <g stroke="#1C2840" strokeWidth="10" strokeLinecap="round">
        <path d={`M${SX} ${SY + 90} L${SX + SW} ${SY + 70}`} />
        <path d={`M${SX} ${SY + 180} L${SX + SW} ${SY + 200}`} />
        <path d={`M${SX + 50} ${SY} L${SX + 70} ${SY + 260}`} />
        <path d={`M${SX + 130} ${SY} L${SX + 120} ${SY + 260}`} />
      </g>
      <path
        d={`M${SX + 64} ${SY + 196} L${SX + 60} ${SY + 140} L${SX + 122} ${SY + 128} L${SX + 126} ${SY + 74}`}
        stroke={a}
        strokeWidth="4"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={SX + 64} cy={SY + 196} r={8} fill={FG} />
      <circle cx={SX + 64} cy={SY + 196} r={3.5} fill="#0C1424" />
      <rect x={SX + 116} y={SY + 58} width={20} height={20} rx={5} fill={a} />
      <StatusBar title="" accent={a} />
      <rect x={SX} y={SY + 226} width={SW} height={H - SY - 226} rx={16} fill={SURFACE} />
      <Bar x={SX + SW / 2 - 16} y={SY + 234} w={32} h={4} o={0.4} />
      {[0, 1].map((i) => (
        <g key={i}>
          <rect
            x={SX + 12}
            y={SY + 248 + i * 40}
            width={SW - 24}
            height={34}
            rx={9}
            fill={i ? SURFACE_2 : `${a}1f`}
            stroke={i ? 'none' : a}
            strokeOpacity="0.8"
          />
          <rect x={SX + 20} y={SY + 257 + i * 40} width={22} height={16} rx={4} fill={i ? DIM : a} opacity={i ? 0.5 : 1} />
          <Bar x={SX + 50} y={SY + 258 + i * 40} w={54} h={5} o={0.8} fill={FG} />
          <Bar x={SX + 50} y={SY + 268 + i * 40} w={36} h={4} o={0.35} />
          <Bar x={SX + SW - 50} y={SY + 262 + i * 40} w={28} h={6} o={0.7} fill={FG} />
        </g>
      ))}
      </>
    ),
    floats: (
      <>
      <Float x={440} y={104} w={170} h={86}>
        <circle cx={470} cy={134} r={15} fill={SURFACE_2} />
        <circle cx={470} cy={129} r={5.5} fill={DIM} />
        <path d="M460 143a10 8 0 0 1 20 0" fill={DIM} />
        <Bar x={494} y={126} w={70} o={0.8} fill={FG} />
        <Bar x={494} y={140} w={46} h={5} o={0.35} />
        <rect x={456} y={160} width={64} height={18} rx={9} fill={a} opacity={0.9} />
        <rect x={528} y={160} width={64} height={18} rx={9} fill={SURFACE_2} />
      </Float>
      <Float x={34} y={150} w={166} h={66}>
        <circle cx={58} cy={176} r={5} fill={FG} />
        <rect x={53} y={192} width={10} height={10} rx={2} fill={a} />
        <line x1={58} y1={181} x2={58} y2={191} stroke={DIM} strokeDasharray="2 2" />
        <Bar x={74} y={172} w={92} h={5} o={0.6} />
        <Bar x={74} y={194} w={74} h={5} o={0.6} />
      </Float>
      </>
    ),
  }
}

type Layers = { screen: ReactNode; floats: ReactNode }

const screens: Record<ProjectArtKind, (props: { a: string }) => Layers> = {
  food: Food,
  trading: Trading,
  travel: Travel,
  carwash: CarWash,
  astrology: Astrology,
  ride: Ride,
}

/** Rendered as a component so the screen functions can read UidContext. */
function ArtLayers({ kind, a, uid }: { kind: ProjectArtKind; a: string; uid: string }) {
  const { screen, floats } = screens[kind]({ a })
  return (
    <>
      <g clipPath={`url(#screen-${uid})`}>
        <rect x={SX} y={SY} width={SW} height={H} fill="#0A1120" />
        {screen}
      </g>
      {floats}
    </>
  )
}

export function ProjectArt({ project, className }: { project: Pick<Project, 'art' | 'accent' | 'name'>; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const a = project.accent
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={`Illustrative mockup representing the ${project.name} app`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="35%" r="65%">
          <stop offset="0" stopColor={a} stopOpacity="0.35" />
          <stop offset="1" stopColor={a} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`area-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} stopOpacity="0.35" />
          <stop offset="1" stopColor={a} stopOpacity="0" />
        </linearGradient>
        <pattern id={`dots-${uid}`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.2" fill="#ffffff" opacity="0.07" />
        </pattern>
        <clipPath id={`screen-${uid}`}>
          <rect x={SX} y={SY} width={SW} height={H} rx={24} />
        </clipPath>
        <filter id={`shadow-${uid}`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      <rect width={W} height={H} fill="#080D19" />
      <rect width={W} height={H} fill={`url(#dots-${uid})`} />
      <rect width={W} height={H} fill={`url(#glow-${uid})`} />
      {/* Phone body */}
      <rect x={SX - 10} y={SY - 10} width={SW + 20} height={H} rx={34} fill="#05080F" stroke="#ffffff" strokeOpacity="0.14" />
      <UidContext.Provider value={uid}>
        <ArtLayers kind={project.art} a={a} uid={uid} />
      </UidContext.Provider>
    </svg>
  )
}
