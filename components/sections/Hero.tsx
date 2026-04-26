'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail, Download, ArrowDown, Code2, Zap } from 'lucide-react'
import { SiLeetcode, SiX } from 'react-icons/si'
import { personalInfo, stats } from '@/lib/data'
import AnimatedCounter from '@/components/shared/AnimatedCounter'

const codeSnippets = [
  `def rag_pipeline(query):`,
  `  embeddings = encoder.encode(query)`,
  `  context = vector_db.retrieve(k=5)`,
  `  return llm.generate(context)`,
  `model = torch.nn.Transformer()`,
  `optimizer = AdamW(lr=2e-5)`,
  `loss = cross_entropy(logits, y)`,
  `{"role": "user", "content": query}`,
  `vectorstore = Chroma.from_docs(docs)`,
  `chain = RetrievalQA.from_chain()`,
  `shap_values = explainer(X_test)`,
  `wandb.log({"precision": 0.87})`,
  `@app.post("/predict")`,
  `async def predict(req: Request):`,
]

function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animFrame: number
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Plasma points
    const points = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.008

      // Animated mesh gradient blobs
      const gradient1 = ctx.createRadialGradient(
        canvas.width * (0.2 + 0.1 * Math.sin(t * 0.5)),
        canvas.height * (0.4 + 0.1 * Math.cos(t * 0.3)),
        0,
        canvas.width * 0.2,
        canvas.height * 0.4,
        canvas.width * 0.5
      )
      gradient1.addColorStop(0, 'rgba(245,158,11,0.12)')
      gradient1.addColorStop(0.5, 'rgba(245,158,11,0.04)')
      gradient1.addColorStop(1, 'transparent')

      const gradient2 = ctx.createRadialGradient(
        canvas.width * (0.8 + 0.08 * Math.cos(t * 0.4)),
        canvas.height * (0.25 + 0.08 * Math.sin(t * 0.6)),
        0,
        canvas.width * 0.8,
        canvas.height * 0.25,
        canvas.width * 0.45
      )
      gradient2.addColorStop(0, 'rgba(124,58,237,0.1)')
      gradient2.addColorStop(0.6, 'rgba(124,58,237,0.03)')
      gradient2.addColorStop(1, 'transparent')

      const gradient3 = ctx.createRadialGradient(
        canvas.width * (0.5 + 0.15 * Math.sin(t * 0.3)),
        canvas.height * (0.75 + 0.08 * Math.cos(t * 0.5)),
        0,
        canvas.width * 0.5,
        canvas.height * 0.8,
        canvas.width * 0.4
      )
      gradient3.addColorStop(0, 'rgba(255,107,107,0.08)')
      gradient3.addColorStop(1, 'transparent')

      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Floating particles + connections
      points.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Pulsing particle
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + i)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,158,11,${p.opacity * pulse * 0.6})`
        ctx.fill()

        // Connection lines
        points.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.08
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(245,158,11,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

const socialLinks = [
  { icon: <Github size={17} />, href: personalInfo.github, label: 'GitHub' },
  { icon: <Linkedin size={17} />, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: <SiLeetcode size={16} />, href: personalInfo.leetcode, label: 'LeetCode' },
  { icon: <SiX size={15} />, href: personalInfo.twitter, label: 'Twitter' },
  { icon: <Mail size={17} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const [snippetIdx, setSnippetIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSnippetIdx(i => (i + 1) % codeSnippets.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-void">
      {/* Animated mesh canvas */}
      <MeshBackground />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Floating code snippets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-code"
            style={{
              top: `${15 + i * 14}%`,
              left: i % 2 === 0 ? `${2 + i * 2}%` : undefined,
              right: i % 2 !== 0 ? `${2 + i * 2}%` : undefined,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.08, 0.14, 0.08],
            }}
            transition={{
              duration: 5 + i * 0.8,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'easeInOut',
            }}
          >
            {codeSnippets[(i * 2) % codeSnippets.length]}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border font-fira text-xs"
               style={{ border: '1px solid rgba(245,158,11,0.25)', background: 'rgba(245,158,11,0.06)', color: '#F59E0B' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Available for Internships & Research Roles
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          className="mb-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="hero-title font-clash leading-none tracking-tight">
            {['Aadithya', 'A R'].map((word, wi) => (
              <div key={wi} className="overflow-hidden block">
                {word.split('').map((char, ci) => (
                  <motion.span
                    key={ci}
                    className={wi === 0 ? 'text-gradient-amber' : 'text-text-primary'}
                    style={{ display: 'inline-block' }}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.4 + wi * 0.15 + ci * 0.04,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.div
          className="mb-6 h-10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <TypeAnimation
            sequence={personalInfo.subtitles.flatMap(s => [s, 2500])}
            repeat={Infinity}
            className="font-fira text-lg md:text-xl font-light"
            style={{ color: '#A09E9A' }}
          />
        </motion.div>

        {/* Live code ticker */}
        <motion.div
          className="mb-10 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <div className="code-block text-left max-w-md w-full">
            <div style={{ color: '#4A4850' }} className="mb-1"># Currently building</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={snippetIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="keyword font-fira"
              >
                {codeSnippets[snippetIdx]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <a href="#projects" className="btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <Zap size={16} />
            <span>View My Work</span>
          </a>
          <a href={personalInfo.resumeUrl} download className="btn-ghost">
            <Download size={16} />
            <span>Download Resume</span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {socialLinks.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title={s.label}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.9 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden max-w-3xl mx-auto"
          style={{ border: '1px solid rgba(245,158,11,0.12)', background: 'rgba(245,158,11,0.06)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-5 px-4"
              style={{ background: 'rgba(5,5,10,0.6)' }}
            >
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                className="font-clash text-3xl font-bold text-gradient-amber"
              />
              <span className="font-fira text-xs text-text-muted mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="font-fira text-[10px] tracking-[0.2em] uppercase" style={{ color: '#4A4850' }}>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} style={{ color: '#F59E0B' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
