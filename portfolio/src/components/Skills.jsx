import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_GROUPS = [
  { title: 'Linguagens & Desenvolvimento', emoji: '⚡', skills: ['Python', 'JavaScript', 'Java', 'HTML', 'CSS', 'C++', 'SQL'] },
  { title: 'IA & Engenharia de Prompts', emoji: '🤖', skills: ['IA Generativa', 'Engenharia de Prompts', 'APIs de LLMs', 'Automação com IA', 'scikit-learn'] },
  { title: 'Ferramentas & Tecnologias', emoji: '🛠️', skills: ['Git', 'pandas', 'openpyxl', 'Dash/Plotly', 'VBA', 'Pacote Office'] },
  { title: 'Marketing & Negócios', emoji: '📊', skills: ['Redes Sociais', 'Criação de Conteúdo', 'Atendimento', 'Vendas', 'Marketing Digital'] },
]

// Dados reais do Luigi
const LANG_SKILLS = [
  { label: 'Python', level: 60 },
  { label: 'HTML/CSS', level: 59 },
  { label: 'JavaScript', level: 58 },
  { label: 'SQL', level: 56 },
  { label: 'Java', level: 40 },
  { label: 'C++', level: 36 },
]

const SOFT_SKILLS = [
  { label: 'Proatividade', level: 92 },
  { label: 'Trabalho em Equipe', level: 90 },
  { label: 'Comunicação', level: 88 },
  { label: 'Pensamento Crítico', level: 87 },
  { label: 'Liderança', level: 85 },
  { label: 'Resiliência', level: 88 },
]

function SkillBar({ label, level, delay, color = '#f97316' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="space-y-1.5 group">
      <div className="flex justify-between text-sm">
        <span className="text-white/70 font-medium group-hover:text-white transition-colors">{label}</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg,#ea580c,${color},#fb923c)` }}>
          {/* Brilho na ponta */}
          <div className="absolute right-0 top-0 h-full w-4 rounded-full"
            style={{ background: 'rgba(255,255,255,0.4)', filter: 'blur(2px)' }} />
        </motion.div>
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="orb w-96 h-96 opacity-10" style={{ background: '#f97316', top: '20%', right: '-10%' }} />

      <div className="container-custom" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16">
          <p className="font-mono text-orange-400 text-sm tracking-[0.3em] mb-3">03 / HABILIDADES</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Stack <span className="gradient-text">Técnica</span>
          </h2>
          <div className="h-px w-20 mt-4" style={{ background: 'linear-gradient(90deg,#f97316,transparent)' }} />
        </motion.div>

        {/* Grupos de skills */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div key={group.title}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass p-6 rounded-2xl hover:border-orange-500/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{group.emoji}</span>
                <h3 className="text-white font-semibold text-sm">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Barras de linguagens */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }} className="glass p-8 rounded-2xl mb-6">
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span>💻</span> Nível por Linguagem
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {LANG_SKILLS.map((s, i) => <SkillBar key={s.label} {...s} delay={0.4 + i * 0.1} />)}
          </div>
        </motion.div>

        {/* Soft skills */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }} className="glass p-8 rounded-2xl">
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span>🧠</span> Habilidades Comportamentais
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {SOFT_SKILLS.map((s, i) => <SkillBar key={s.label} {...s} delay={0.6 + i * 0.1} color="#fb923c" />)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
