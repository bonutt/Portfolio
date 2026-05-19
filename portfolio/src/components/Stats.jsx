import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 4, suffix: '+', label: 'Projetos Concluídos', icon: '🚀' },
  { value: 7, suffix: '+', label: 'Linguagens de Programação', icon: '💻' },
  { value: 2024, suffix: '', label: 'Início na FIAP', icon: '🎓' },
  { value: 3, suffix: '', label: 'Idiomas (PT, EN, ES)', icon: '🌍' },
]

function Counter({ value, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = value > 100 ? value - 4 : 0
    const duration = 1500
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(start + (value - start) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <span>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 relative" style={{ background: '#0f0f0f' }}>
      <div className="container-custom" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass p-6 rounded-2xl text-center group hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-black gradient-text mb-1">
                <Counter value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-white/50 text-xs md:text-sm leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
