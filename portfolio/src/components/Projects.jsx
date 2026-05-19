import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

// Para adicionar imagens: coloque os arquivos em portfolio/public/projects/<pasta>/
// e liste os caminhos no array `images` do projeto correspondente.
const PROJECTS = [
  {
    title: 'Automação de Planilhas com IA',
    description:
      'Ferramenta para automatizar análise e processamento de dados em Excel, com macros inteligentes e scripts Python. Integra modelos de machine learning para classificação, previsão e geração automática de insights.',
    tags: ['Python', 'openpyxl', 'pandas', 'scikit-learn', 'VBA'],
    icon: '📊',
    accent: '#f97316',
    github: 'https://github.com/bonutt',
    demo: null,
    highlight: true,
    images: [], // ex: ['/projects/automacao/1.png', '/projects/automacao/2.png']
  },
  {
    title: 'Dashboard Interativo de Dados',
    description:
      'Dashboard web para monitoramento de métricas em tempo real, com interface moderna e responsiva. Pipeline completo de ingestão, processamento e visualização com gráficos interativos.',
    tags: ['Python', 'Dash/Plotly', 'JavaScript', 'HTML/CSS'],
    icon: '📈',
    accent: '#9333ea',
    github: 'https://github.com/bonutt',
    demo: null,
    highlight: false,
    images: [], // ex: ['/projects/dashboard/1.png']
  },
  {
    title: 'CRM — Hospital de Estética',
    description:
      'Sistema CRM completo para gestão de pacientes, agendamentos e histórico de procedimentos. Desenvolvido em equipe aplicando metodologia ágil (Scrum) para entregas iterativas.',
    tags: ['SQL', 'JavaScript', 'Scrum', 'Metodologia Ágil'],
    icon: '🏥',
    accent: '#ea580c',
    github: 'https://github.com/bonutt/sao-rafael-crm',
    demo: 'https://sao-rafael-crm.vercel.app/',
    highlight: false,
    images: [
      '/projects/crm/crm-1.png',
      '/projects/crm/crm-2.png',
      '/projects/crm/crm-3.png',
      '/projects/crm/crm-4.png',
      '/projects/crm/crm-5.png',
      '/projects/crm/crm-6.png',
      '/projects/crm/crm-7.png',
      '/projects/crm/crm-8.png',
      '/projects/crm/crm-9.png',
    ],
  },
  {
    title: 'Sabará Baby Kitchen',
    description:
      'Aplicativo de triagem e gestão de pedidos para o Hospital Infantil Sabará, priorizando usabilidade e agilidade no atendimento hospitalar. Projeto acadêmico com impacto real na operação do hospital.',
    tags: ['Mobile', 'UX/UI', 'Triagem', 'Hospital'],
    icon: '👶',
    accent: '#fb923c',
    github: 'https://github.com/bonutt',
    demo: null,
    highlight: false,
    images: [], // ex: ['/projects/sabara/1.png']
  },
]

function Carousel({ images, accent }) {
  const [current, setCurrent] = useState(0)

  const prev = (e) => {
    e.stopPropagation()
    setCurrent(i => (i - 1 + images.length) % images.length)
  }
  const next = (e) => {
    e.stopPropagation()
    setCurrent(i => (i + 1) % images.length)
  }

  return (
    <div className="mt-5 rounded-xl overflow-hidden border border-white/10 select-none">
      {/* Slider: faixa de imagens lado a lado que desliza via translateX */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Screenshot ${i + 1}`}
              className="w-full shrink-0 block"
              style={{ minWidth: '100%' }}
            />
          ))}
        </div>

        {/* Overlay nas bordas */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />

        {/* Setas */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10"
              style={{ background: 'rgba(0,0,0,0.55)', border: `1px solid ${accent}40` }}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10"
              style={{ background: 'rgba(0,0,0,0.55)', border: `1px solid ${accent}40` }}
            >
              <ChevronRight size={16} />
            </button>

            {/* Contador */}
            <div
              className="absolute top-2 right-2 text-xs text-white/80 px-2 py-0.5 rounded-full font-mono z-10"
              style={{ background: 'rgba(0,0,0,0.55)' }}
            >
              {current + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Dots fora da área de clipping para não sumirem */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 py-2" style={{ background: 'rgba(0,0,0,0.3)' }}>
          {images.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === current ? 16 : 6,
                height: 6,
                background: i === current ? accent : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="orb w-80 h-80 opacity-10" style={{ background: '#f97316', top: '10%', left: '-5%' }} />
      <div className="orb w-60 h-60 opacity-8" style={{ background: '#ea580c', bottom: '10%', right: '-3%' }} />

      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-orange-400 text-sm tracking-[0.3em] mb-3">05 / PROJETOS</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            O que <span className="gradient-text">Construí</span>
          </h2>
          <div className="h-px w-20 mt-4" style={{ background: 'linear-gradient(90deg,#f97316,transparent)' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`glass p-6 rounded-2xl group relative overflow-hidden transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-1 ${
                project.highlight ? 'md:col-span-2' : ''
              }`}
            >
              {/* Glow de fundo ao hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${project.accent}15, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                {/* Header do card */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: `${project.accent}15`, border: `1px solid ${project.accent}30` }}
                    >
                      {project.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold text-base leading-tight">{project.title}</h3>
                      {project.highlight && (
                        <Sparkles size={14} className="text-orange-400 shrink-0" />
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                      >
                        <Github size={15} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-orange-400 transition-colors"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-white/55 text-sm leading-relaxed mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="skill-tag text-xs">{tag}</span>
                  ))}
                </div>

                {/* Carrossel */}
                {project.images.length > 0 && (
                  <Carousel images={project.images} accent={project.accent} />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link para mais projetos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/bonutt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/50 hover:text-orange-400 transition-colors text-sm font-medium group"
          >
            <Github size={16} />
            Ver mais projetos no GitHub
            <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
