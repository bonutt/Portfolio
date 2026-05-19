import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const particles = useRef([])
  const animId = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      if (Math.random() > 0.6) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1,
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? '#f97316' : '#fb923c',
        })
      }
    }
    window.addEventListener('mousemove', onMove)

    const loop = () => {
      animId.current = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current = particles.current.filter(p => p.life > 0)
      particles.current.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.04
        p.life -= 0.03
        p.size *= 0.97

        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(p.size, 0), 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0')
        ctx.shadowBlur = 6
        ctx.shadowColor = p.color
        ctx.fill()
      })
    }
    animId.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId.current)
    }
  }, [])

  return <canvas ref={canvasRef} id="particles-canvas" />
}
