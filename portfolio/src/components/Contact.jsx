import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Phone, Send, MapPin } from 'lucide-react'

const CONTACTS = [
  { icon: Phone, label: 'Telefone', value: '(11) 98447-9450', href: 'tel:+5511984479450' },
  { icon: Github, label: 'GitHub', value: 'github.com/bonutt', href: 'https://github.com/bonutt' },
  { icon: Linkedin, label: 'LinkedIn', value: 'in/luigibonuccelli', href: 'https://www.linkedin.com/in/luigibonuccelli/' },
  { icon: MapPin, label: 'Localização', value: 'São Paulo, SP — Brasil', href: null },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = () => {
    // Placeholder: integre com EmailJS ou Formspree para envio real
    if (!form.name || !form.email || !form.message) return
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ background: '#0f0f0f' }}>
      <div className="orb w-96 h-96 opacity-10" style={{ background: '#f97316', top: '10%', left: '-10%' }} />
      <div className="orb w-72 h-72 opacity-8" style={{ background: '#ea580c', bottom: '0', right: '-5%' }} />

      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-orange-400 text-sm tracking-[0.3em] mb-3">07 / CONTATO</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Vamos <span className="gradient-text">Conversar</span>
          </h2>
          <div className="h-px w-20 mt-4" style={{ background: 'linear-gradient(90deg,#f97316,transparent)' }} />
          <p className="text-white/50 mt-4 max-w-md">
            Aberto a oportunidades, freelas e projetos colaborativos. Entre em contato!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Dados de contato */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {CONTACTS.map(({ icon: Icon, label, value, href, highlight }, i) => {
              const inner = (
                <>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: highlight ? 'rgba(249,115,22,0.2)' : 'rgba(168,85,247,0.15)' }}
                  >
                    <Icon size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-mono">{label}</p>
                    <p className="text-white font-medium text-sm group-hover:text-orange-400 transition-colors">{value}</p>
                  </div>
                </>
              )

              const cardClass = `glass p-4 rounded-2xl flex items-center gap-4 group transition-all duration-300 w-full text-left ${
                highlight
                  ? 'hover:border-orange-500/60 border border-orange-500/20'
                  : 'hover:border-orange-500/40'
              } ${href ? 'cursor-pointer' : ''}`

              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClass}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cardClass}>{inner}</div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass p-6 rounded-2xl space-y-4"
          >
            {['name', 'email'].map(field => (
              <div key={field}>
                <label className="block text-white/50 text-xs font-mono mb-1.5 capitalize">
                  {field === 'name' ? 'Seu Nome' : 'Seu E-mail'}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  value={form[field]}
                  onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                  placeholder={field === 'name' ? 'Luigi Bonuccelli' : 'luigi@email.com'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-orange-500/60 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="block text-white/50 text-xs font-mono mb-1.5">Mensagem</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                placeholder="Olá Luigi, gostaria de conversar sobre..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-orange-500/60 transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
              style={{ background: sent ? '#16a34a' : 'linear-gradient(135deg,#ea580c,#f97316)' }}
            >
              {sent ? '✓ Mensagem enviada!' : (<><Send size={16} /> Enviar Mensagem</>)}
            </button>
            <p className="text-white/25 text-xs text-center font-mono">
              * Configure EmailJS ou Formspree para envio real
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="container-custom mt-24 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-white/25 text-xs font-mono">
          © 2026 Luigi Bonuccelli
        </p>
        <p className="text-white/25 text-xs font-mono gradient-text">
          São Paulo, Brasil 🇧🇷
        </p>
      </div>
    </section>
  )
}
