import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Charts from './components/Charts'
import Projects from './components/Projects'
import Stats from './components/Stats'
import GitHub from './components/GitHub'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)
  const [appVisible, setAppVisible] = useState(false)

  useEffect(() => {
    if (!appVisible) return
    // Fade-in suave nas sections
    gsap.utils.toArray('section').forEach(section => {
      gsap.fromTo(section, { opacity: 0 }, {
        opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: section, start: 'top 90%', toggleActions: 'play none none none' },
      })
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [appVisible])

  return (
    <>
      <div className="noise" />
      <div className="scanlines" />
      <CustomCursor />

      {loading && (
        <LoadingScreen onComplete={() => { setLoading(false); setAppVisible(true) }} />
      )}

      <AnimatePresence>
        {appVisible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Navbar />
            <main>
              <Hero />
              <About />
              <Projects />
              <Experience />
              <Skills />
              <Charts />
              <Stats />
              <GitHub />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
