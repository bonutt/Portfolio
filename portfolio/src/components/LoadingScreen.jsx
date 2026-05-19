import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => setGlitch(v => !v), 700)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          clearInterval(glitchInterval)
          setTimeout(() => { setVisible(false); setTimeout(onComplete, 600) }, 400)
          return 100
        }
        return prev + Math.random() * 7 + 2
      })
    }, 60)
    return () => { clearInterval(interval); clearInterval(glitchInterval) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#0a0a0a' }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6 }}
        >
          <div className="orb w-80 h-80 opacity-20" style={{ background: '#f97316', top: '5%', left: '5%' }} />
          <div className="orb w-56 h-56 opacity-10" style={{ background: '#ea580c', bottom: '5%', right: '5%' }} />
          <div className="absolute inset-0 bg-grid opacity-50" />

          <div className="relative z-10 flex flex-col items-center gap-8 text-center px-4">
            <motion.p className="font-mono text-xs tracking-[0.4em] text-orange-500"
              animate={{ opacity: glitch ? 0.3 : 1 }} transition={{ duration: 0.1 }}>
              INICIANDO PORTFÓLIO
            </motion.p>

            <div className="relative">
              <motion.h1 className="text-5xl md:text-7xl font-black tracking-tight"
                animate={glitch ? { x: [-2, 2, 0] } : { x: 0 }} transition={{ duration: 0.1 }}>
                <span className="text-white">Luigi</span>{' '}
                <span className="gradient-text">Bonuccelli</span>
              </motion.h1>
            </div>

            <div className="w-72 md:w-96">
              <div className="flex justify-between mb-2 font-mono text-xs">
                <span className="text-white/30">Carregando</span>
                <span className="text-orange-400">{Math.min(Math.round(progress), 100)}%</span>
              </div>
              <div className="h-px bg-white/10 w-full overflow-hidden">
                <motion.div className="h-full"
                  style={{ background: 'linear-gradient(90deg,#ea580c,#f97316,#fb923c)', boxShadow: '0 0 12px #f97316' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: 'easeOut' }} />
              </div>
              <div className="mt-3 font-mono text-xs text-white/20 text-left space-y-0.5">
                {progress > 20 && <p>{'> '}<span className="text-orange-500/60">Carregando componentes...</span></p>}
                {progress > 55 && <p>{'> '}<span className="text-orange-500/60">Inicializando animações...</span></p>}
                {progress > 85 && <p>{'> '}<span className="text-orange-500/60">Pronto.</span></p>}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
