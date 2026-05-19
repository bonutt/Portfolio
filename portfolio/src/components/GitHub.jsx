import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github } from 'lucide-react'

export default function GitHub() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="github" className="section-padding relative overflow-hidden">
      <div className="orb w-72 h-72 opacity-10" style={{ background: '#f97316', bottom: '10%', right: '5%' }} />

      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-orange-400 text-sm tracking-[0.3em] mb-3">06 / GITHUB</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Perfil <span className="gradient-text">GitHub</span>
          </h2>
          <div className="h-px w-20 mt-4" style={{ background: 'linear-gradient(90deg,#f97316,transparent)' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-6 rounded-2xl flex flex-wrap items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#ea580c,#f97316)' }}>
              <Github size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">@bonutt</h3>
              <p className="text-white/50 text-sm">Luigi Bonuccelli · São Paulo, SP</p>
            </div>
          </div>
          <a
            href="https://github.com/bonutt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#ea580c,#f97316)', boxShadow: '0 0 20px rgba(249,115,22,0.3)' }}
          >
            <Github size={16} /> Ver Perfil
          </a>
        </motion.div>
      </div>
    </section>
  )
}
