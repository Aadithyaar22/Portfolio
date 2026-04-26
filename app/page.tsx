'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/layout/CustomCursor'
import Hero from '@/components/sections/Hero'

// Lazy load heavy sections
const About = dynamic(() => import('@/components/sections/About'), { ssr: false })
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false })
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false })
const Timeline = dynamic(() => import('@/components/sections/Timeline'), { ssr: false })
const Achievements = dynamic(() => import('@/components/sections/Achievements'), { ssr: false })
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false })

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const letters = 'AAR'.split('')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 400)
          return 100
        }
        return p + Math.random() * 12 + 4
      })
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#05050A' }}
      exit={{
        clipPath: ['inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'],
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Logo assembly */}
      <div className="flex items-center gap-2 mb-12">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="font-clash text-6xl font-bold"
            style={{ color: i === 0 ? '#F59E0B' : i === 1 ? '#FF6B6B' : '#7C3AED' }}
            initial={{
              opacity: 0,
              y: i === 0 ? -60 : i === 1 ? 60 : -60,
              x: i === 0 ? -40 : i === 1 ? 0 : 40,
            }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Neural net SVG draw */}
      <motion.svg
        width="200"
        height="60"
        viewBox="0 0 200 60"
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[
          { x: 20, y: 15 }, { x: 20, y: 45 },
          { x: 100, y: 5 }, { x: 100, y: 30 }, { x: 100, y: 55 },
          { x: 180, y: 15 }, { x: 180, y: 45 },
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r="5"
            fill="none"
            stroke={i < 2 ? '#F59E0B' : i < 5 ? '#FF6B6B' : '#7C3AED'}
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            transition={{ delay: 0.3 + i * 0.08, type: 'spring' }}
          />
        ))}
        {/* Connections */}
        {[
          [20, 15, 100, 5], [20, 15, 100, 30], [20, 15, 100, 55],
          [20, 45, 100, 5], [20, 45, 100, 30], [20, 45, 100, 55],
          [100, 5, 180, 15], [100, 30, 180, 15], [100, 30, 180, 45], [100, 55, 180, 45],
        ].map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(245,158,11,0.25)"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.04, duration: 0.4 }}
          />
        ))}
      </motion.svg>

      {/* Progress bar */}
      <div className="w-48 h-px rounded-full overflow-hidden" style={{ background: 'rgba(30,30,48,1)' }}>
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, #F59E0B, #FF6B6B)' }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <motion.div
        className="font-fira text-xs mt-3"
        style={{ color: '#4A4850' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {Math.min(Math.round(progress), 100)}%
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen key="loader" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      <CustomCursor />

      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Timeline />
            <Achievements />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  )
}
