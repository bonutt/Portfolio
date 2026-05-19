import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Moon } from 'lucide-react'

const INFO_CARDS = [
  { icon: GraduationCap, label: 'Curso', value: 'Engenharia de Software', sub: 'FIAP, São Paulo' },
  { icon: Calendar, label: 'Período', value: '2024 – 2028', sub: 'Período Noturno' },
  { icon: Moon, label: 'Foco', value: 'IA & Automações', sub: 'Full-stack Dev' },
  { icon: MapPin, label: 'Localização', value: 'São Paulo, SP', sub: 'Brasil' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Orb decorativo */}
      <div className="orb w-96 h-96 opacity-10" style={{ background: '#f97316', top: '-10%', right: '-5%' }} />

      <div className="container-custom" ref={ref}>
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-orange-400 text-sm tracking-[0.3em] mb-3">01 / SOBRE</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <div className="h-px w-20 mt-4" style={{ background: 'linear-gradient(90deg,#f97316,transparent)' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-white/70 text-base leading-relaxed">
              Sou estudante de Engenharia de Software na <span className="text-orange-400 font-semibold">FIAP</span> com
              sólida atuação em projetos de <span className="text-orange-400 font-semibold">IA generativa</span>,
              engenharia de prompts e automação inteligente.
            </p>
            <p className="text-white/70 text-base leading-relaxed">
              Combino base técnica em Python, JavaScript e integração de LLMs com visão de negócios adquirida em
              experiências práticas em vendas, marketing digital e atendimento ao cliente.
            </p>
            <p className="text-white/70 text-base leading-relaxed">
              Tenho perfil <span className="text-white font-medium">proativo</span>,{' '}
              <span className="text-white font-medium">colaborativo</span> e orientado a entregas de impacto real,
              com facilidade para trabalhar em equipe, assumir responsabilidades e contribuir para o crescimento
              de projetos e empresas.
            </p>

            {/* Tags de idiomas */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Inglês intermediário', 'Espanhol intermediário'].map(lang => (
                <span key={lang} className="skill-tag">{lang}</span>
              ))}
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {INFO_CARDS.map(({ icon: Icon, label, value, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="glass p-5 rounded-2xl group hover:border-orange-500/40 transition-all duration-300 cursor-default"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(168,85,247,0.15)' }}>
                  <Icon size={18} className="text-orange-400" />
                </div>
                <p className="text-white/40 text-xs font-mono mb-1">{label}</p>
                <p className="text-white font-semibold text-sm leading-tight">{value}</p>
                <p className="text-orange-400 text-xs mt-0.5">{sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
