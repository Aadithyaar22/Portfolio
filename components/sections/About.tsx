'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { personalInfo, stats } from '@/lib/data'
import AnimatedCounter from '@/components/shared/AnimatedCounter'

const traits = [
  { icon: '⚡', label: 'Production-First', desc: 'Systems that ship and scale' },
  { icon: '🔬', label: 'Research-Minded', desc: 'Academic rigor + engineering pragmatism' },
  { icon: '🎯', label: 'FAANG-Tracked', desc: 'Deliberate path to ML roles' },
  { icon: '☁️', label: 'Cloud-Native', desc: 'GCP, AWS, Docker by default' },
]

function TraitCard({ icon, label, desc, delay }: { icon: string; label: string; desc: string; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-4 p-5 rounded-xl group cursor-default"
      style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.1)' }}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.07)' }}
    >
      <span className="text-2xl group-hover:scale-110 transition-transform inline-block">{icon}</span>
      <div>
        <div className="font-clash font-bold text-text-primary mb-0.5">{label}</div>
        <div className="font-dm text-sm text-text-secondary">{desc}</div>
      </div>
    </motion.div>
  )
}

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
           style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left — Code block identity card */}
          <motion.div
            ref={ref}
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Identity code block */}
            <div className="code-block relative overflow-hidden" style={{ padding: '28px 32px', lineHeight: 2 }}>
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-6 -mt-2">
                <div className="w-3 h-3 rounded-full bg-coral-500" style={{ background: '#FF5F57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
                <span className="ml-3 font-fira text-xs" style={{ color: '#4A4850' }}>identity.py</span>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div><span className="keyword">class </span><span className="function">Aadithya</span><span style={{ color: '#F1F0ED' }}>:</span></div>
                <div className="ml-6"><span className="variable">name</span><span style={{ color: '#A09E9A' }}> = </span><span className="string">&quot;Aadithya A R&quot;</span></div>
                <div className="ml-6"><span className="variable">role</span><span style={{ color: '#A09E9A' }}> = </span><span className="string">&quot;ML Engineer &amp; GenAI Builder&quot;</span></div>
                <div className="ml-6"><span className="variable">college</span><span style={{ color: '#A09E9A' }}> = </span><span className="string">&quot;GAT, Bengaluru&quot;</span></div>
                <div className="ml-6"><span className="variable">batch</span><span style={{ color: '#A09E9A' }}> = </span><span className="string">&quot;2022 – 2026&quot;</span></div>
                <div className="ml-6"><span className="variable">goal</span><span style={{ color: '#A09E9A' }}> = </span><span className="string">&quot;FAANG ML Engineer&quot;</span></div>
                <div className="ml-6"><span className="variable">stack</span><span style={{ color: '#A09E9A' }}> = </span><span style={{ color: '#F1F0ED' }}>[</span></div>
                {['PyTorch', 'LangChain', 'FastAPI', 'GCP', 'ChromaDB'].map((s, i) => (
                  <div key={s} className="ml-10">
                    <motion.span
                      className="string"
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + i * 0.08 }}
                    >
                      &quot;{s}&quot;
                    </motion.span>
                    {i < 4 && <span style={{ color: '#A09E9A' }}>,</span>}
                  </div>
                ))}
                <div className="ml-6"><span style={{ color: '#F1F0ED' }}>]</span></div>
                <div className="mt-2"><span className="comment"># Open to internships & MS opportunities</span></div>
                <div><span className="comment"># Fueled by caffeine &amp; curiosity ☕</span></div>
              </motion.div>

              {/* Animated cursor blink */}
              <motion.span
                className="inline-block w-2 h-5 ml-1 -mb-1"
                style={{ background: '#F59E0B' }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </div>

            {/* Stats grid below */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center py-5 rounded-xl"
                  style={{ background: 'rgba(12,12,20,0.8)', border: '1px solid rgba(30,30,48,1)' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ borderColor: 'rgba(245,158,11,0.3)', scale: 1.02 }}
                >
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    className="font-clash text-3xl font-bold text-gradient-amber"
                  />
                  <div className="font-fira text-xs text-text-muted mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Bio */}
          <div>
            <motion.div
              className="mb-4 flex items-center gap-3"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="font-fira text-xs tracking-[0.25em] uppercase" style={{ color: '#F59E0B' }}>
                01 / about
              </span>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #F59E0B, transparent)' }} />
            </motion.div>

            <motion.h2
              className="section-title font-clash mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Building AI that{' '}
              <span className="text-gradient-amber">ships.</span>
            </motion.h2>

            {personalInfo.bio.map((para, i) => (
              <motion.p
                key={i}
                className="text-text-secondary leading-relaxed mb-5"
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              >
                {para}
              </motion.p>
            ))}

            {/* Philosophy quote */}
            <motion.blockquote
              className="border-l-2 pl-5 mb-10 italic"
              style={{ borderColor: '#F59E0B', color: '#A09E9A' }}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {personalInfo.philosophy}
            </motion.blockquote>

            {/* Trait cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {traits.map((t, i) => (
                <TraitCard key={t.label} {...t} delay={0.7 + i * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
