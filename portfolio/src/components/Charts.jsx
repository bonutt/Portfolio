import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from 'recharts'

// Dados reais do Luigi
const LANG_DATA = [
  { lang: 'Python', pct: 60 },
  { lang: 'HTML/CSS', pct: 59 },
  { lang: 'JavaScript', pct: 58 },
  { lang: 'SQL', pct: 56 },
  { lang: 'Java', pct: 40 },
  { lang: 'C++', pct: 36 },
]

const RADAR_DATA = [
  { subject: 'IA/ML', value: 80 },
  { subject: 'Python', value: 60 },
  { subject: 'JavaScript', value: 58 },
  { subject: 'SQL', value: 56 },
  { subject: 'Automação', value: 82 },
  { subject: 'Dashboards', value: 78 },
  { subject: 'Prompts', value: 85 },
]

const COLORS = ['#f97316', '#fb923c', '#ea580c', '#fdba74', '#c2410c', '#fed7aa']

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="glass px-3 py-2 text-sm">
        <p className="text-orange-300 font-mono">{payload[0].payload.lang}</p>
        <p className="text-white font-bold">{payload[0].value}%</p>
      </div>
    )
  }
  return null
}

export default function Charts() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding relative" style={{ background: '#0f0f0f' }}>
      <div className="container-custom" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16">
          <p className="font-mono text-orange-400 text-sm tracking-[0.3em] mb-3">04 / ANALYTICS</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Em <span className="gradient-text">Números</span>
          </h2>
          <div className="h-px w-20 mt-4" style={{ background: 'linear-gradient(90deg,#f97316,transparent)' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }} className="glass p-6 rounded-2xl">
            <h3 className="text-white font-semibold mb-1">Nível por Linguagem</h3>
            <p className="text-white/40 text-xs mb-6">Autoavaliação realista (0–100)</p>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={LANG_DATA} layout="vertical" margin={{ left: 0, right: 25 }}>
                <XAxis type="number" domain={[0, 100]} tick={false} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="lang" tick={{ fill: '#ffffff70', fontSize: 12 }} axisLine={false} tickLine={false} width={75} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(249,115,22,0.05)' }} />
                <Bar dataKey="pct" radius={[0, 6, 6, 0]}>
                  {LANG_DATA.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }} className="glass p-6 rounded-2xl">
            <h3 className="text-white font-semibold mb-1">Mapa de Competências</h3>
            <p className="text-white/40 text-xs mb-2">Visão geral das áreas técnicas</p>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={RADAR_DATA} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="rgba(249,115,22,0.15)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff55', fontSize: 11 }} />
                <Radar name="Luigi" dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
