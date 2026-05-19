import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Heart } from 'lucide-react'

const EXPERIENCES = [
  {
    type: 'work',
    icon: Briefcase,
    role: 'Atendimento, Vendas & Gestão de Redes Sociais',
    company: 'Buffet — Experiência Administrativa',
    period: '2022 – 2024',
    color: '#f97316',
    bullets: [
      'Conduziu atendimento consultivo ao cliente e negociação de contratos, contribuindo diretamente para o fechamento de vendas.',
      'Gerenciou o Instagram do negócio, produzindo conteúdo estratégico e aumentando engajamento orgânico da marca.',
      'Estruturou estratégias de marketing digital que expandiram a presença online e fortaleceram o posicionamento da marca.',
      'Atuou em rotinas administrativas com autonomia, garantindo organização dos processos e qualidade no relacionamento com clientes.',
    ],
  },
  {
    type: 'volunteer',
    icon: Heart,
    role: 'Voluntário — Ação Social',
    company: 'Apoio a Moradores em Situação de Vulnerabilidade',
    period: '2023',
    color: '#fb923c',
    bullets: [
      'Coordenou coleta, organização e distribuição de doações para população em situação de rua, mobilizando equipe de voluntários.',
      'Liderou atividades comunitárias, fortalecendo habilidades de liderança, empatia e responsabilidade social na prática.',
      'Experiência que consolidou valores de comprometimento com o próximo e visão de impacto social positivo.',
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-padding relative" style={{ background: '#0f0f0f' }}>
      <div className="orb w-80 h-80 opacity-10" style={{ background: '#ea580c', bottom: '0', left: '-5%' }} />

      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-orange-400 text-sm tracking-[0.3em] mb-3">02 / EXPERIÊNCIA</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Minha <span className="gradient-text">Trajetória</span>
          </h2>
          <div className="h-px w-20 mt-4" style={{ background: 'linear-gradient(90deg,#f97316,transparent)' }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg,#f97316,#ea580c33)' }} />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => {
              const Icon = exp.icon
              return (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="pl-16 md:pl-24 relative"
                >
                  {/* Ícone na timeline */}
                  <div
                    className="absolute left-0 md:left-4 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2"
                    style={{
                      background: '#0f0f0f',
                      borderColor: exp.color,
                      boxShadow: `0 0 20px ${exp.color}55`,
                    }}
                  >
                    <Icon size={14} style={{ color: exp.color }} />
                  </div>

                  {/* Card */}
                  <div className="glass p-6 rounded-2xl hover:border-orange-500/40 transition-all duration-300 group">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight">{exp.role}</h3>
                        <p className="text-orange-400 text-sm mt-1 font-medium">{exp.company}</p>
                      </div>
                      <span className="font-mono text-xs px-3 py-1 rounded-full shrink-0"
                        style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', color: '#fb923c' }}>
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                          <span className="text-orange-500 mt-1.5 shrink-0">▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}

            {/* FIAP */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pl-16 md:pl-24 relative"
            >
              <div className="absolute left-0 md:left-4 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2"
                style={{ background: '#0f0f0f', borderColor: '#fb923c', boxShadow: '0 0 20px #fb923c55' }}>
                <span className="text-xs font-bold text-orange-300">🎓</span>
              </div>
              <div className="glass p-6 rounded-2xl hover:border-orange-500/40 transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-white font-bold text-lg">Bacharelado em Engenharia de Software</h3>
                    <p className="text-orange-400 text-sm mt-1 font-medium">FIAP, São Paulo</p>
                    <p className="text-white/40 text-xs mt-1">Período Noturno</p>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded-full shrink-0"
                    style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', color: '#fb923c' }}>
                    2024 – 2028
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
