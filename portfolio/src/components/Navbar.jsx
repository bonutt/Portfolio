import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Sobre', href: '#about' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Experiência', href: '#experience' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contato', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    setActive(href)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.90)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(249,115,22,0.15)' : 'none',
        }}
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#ea580c,#f97316)' }}>
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-black text-white text-lg tracking-tight group-hover:text-orange-400 transition-colors">
              LB<span className="text-orange-400">.</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button key={link.href} onClick={() => handleNav(link.href)}
                className={`font-medium text-sm transition-all duration-300 relative group ${
                  active === link.href ? 'text-orange-400' : 'text-white/60 hover:text-white'
                }`}>
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: 'linear-gradient(90deg,#f97316,#fb923c)' }} />
              </button>
            ))}
          </div>

          <a href="#contact" onClick={e => { e.preventDefault(); handleNav('#contact') }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#ea580c,#f97316)', boxShadow: '0 0 20px rgba(249,115,22,0.3)' }}>
            Contato
          </a>

          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden glass m-4 rounded-2xl p-6 flex flex-col gap-4">
            {NAV_LINKS.map(link => (
              <button key={link.href} onClick={() => handleNav(link.href)}
                className="text-left text-white/80 hover:text-orange-400 font-medium transition-colors py-2 border-b border-white/5 last:border-0">
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
