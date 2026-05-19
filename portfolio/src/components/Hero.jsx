import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowDown, Github, Linkedin, Phone, FileText } from 'lucide-react'

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/bonutt', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/luigibonuccelli/', label: 'LinkedIn' },
  { icon: Phone, href: 'tel:+5511984479450', label: 'Telefone' },
]

// Efeito de digitação
const ROLES = ['Engenheiro de Software', 'Dev de IA & Automações', 'Dashboard Developer', 'Prompt Engineer']

function useTyping(words) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        setText(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setWordIdx(i => (i + 1) % words.length)
          setCharIdx(0)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, deleting ? 60 : 90)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words])

  return text
}

export default function Hero() {
  const orb1 = useRef(null)
  const orb2 = useRef(null)
  const typedText = useTyping(ROLES)

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 35
      const y = (e.clientY / window.innerHeight - 0.5) * 35
      gsap.to(orb1.current, { x, y, duration: 1.8, ease: 'power2.out' })
      gsap.to(orb2.current, { x: -x * 0.5, y: -y * 0.5, duration: 2.4, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #0f0f0f 0%, #0a0a0a 70%)' }}>
      <div className="absolute inset-0 bg-grid" />

      <div ref={orb1} className="orb w-[480px] h-[480px] opacity-15"
        style={{ background: '#f97316', top: '10%', left: '15%' }} />
      <div ref={orb2} className="orb w-[320px] h-[320px] opacity-10"
        style={{ background: '#ea580c', bottom: '15%', right: '10%' }} />
      <div className="orb w-[180px] h-[180px] opacity-20"
        style={{ background: '#fb923c', top: '45%', right: '28%', animation: 'float 7s ease-in-out infinite' }} />

      <div className="container-custom relative z-10 text-center">
        {/* Status badge */}
        {/* Nome com glitch */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none mb-6 glitch"
            data-text="Luigi Bonuccelli">
            <span className="text-white">Luigi</span>
            <br />
            <span className="gradient-text">Bonuccelli</span>
          </h1>
        </motion.div>

        {/* Texto digitando */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="h-8 mb-4 flex items-center justify-center">
          <span className="text-white/60 text-lg md:text-xl font-medium typing-cursor">{typedText}</span>
        </motion.div>

        {/* Subtexto */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/35 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Estudante de Engenharia de Software na FIAP (período noturno) com foco em
          IA generativa, automações inteligentes e desenvolvimento full-stack.
        </motion.p>

        {/* Botões */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]"
            style={{ background: 'linear-gradient(135deg,#ea580c,#f97316)' }}>
            Ver Projetos
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 rounded-full font-semibold text-white/80 hover:text-white transition-all duration-300 hover:scale-105 glass">
            Entrar em Contato
          </button>
          <a
            href="/curriculo.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full font-semibold text-white/80 hover:text-white transition-all duration-300 hover:scale-105 glass flex items-center gap-2">
            <FileText size={16} />
            Ver Currículo
          </a>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              className="w-10 h-10 rounded-full flex items-center justify-center glass hover:border-orange-500/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              <Icon size={18} className="text-white/60 hover:text-orange-400" />
            </a>
          ))}
        </motion.div>

        {/* Scroll down */}
        <motion.button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 hover:text-orange-400 transition-colors">
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}> 
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
 