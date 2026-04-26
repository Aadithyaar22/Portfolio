'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { timeline } from '@/lib/data'
import SectionHeader from '@/components/shared/SectionHeader'

const typeIcons: Record<string, string> = {
  education: '🎓',
  project: '🚀',
  achievement: '⚡',
  milestone: '☁️',
  current: '🎯',
}

function TimelineCard({ item, index }: { item: typeof timeline[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'} mb-12`}>
      {/* Card */}
      <motion.div
        className="w-[calc(50%-40px)] max-w-sm"
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div
          className="rounded-2xl p-6 relative overflow-hidden group"
          style={{
            background: 'rgba(12,12,20,0.9)',
            border: '1px solid rgba(30,30,48,1)',
          }}
          whileHover={{
            borderColor: item.color + '50',
            boxShadow: `0 8px 40px ${item.color}15`,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Color accent line */}
          <div
            className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-1 h-full rounded-full opacity-60`}
            style={{ background: `linear-gradient(180deg, ${item.color} 0%, transparent 100%)` }}
          />

          {/* Year badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-fira text-xs mb-3"
            style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}30` }}
          >
            <span>{typeIcons[item.type]}</span>
            {item.year}
          </div>

          <h3 className="font-clash font-bold text-lg text-text-primary mb-1">{item.title}</h3>
          <div className="font-dm text-sm mb-1" style={{ color: item.color }}>{item.org}</div>
          <div className="font-fira text-xs text-text-muted mb-3">{item.location}</div>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">{item.description}</p>

          <div className="flex flex-wrap gap-2">
            {item.highlights.map(h => (
              <span
                key={h}
                className="font-fira text-[10px] px-2 py-1 rounded-md"
                style={{ background: `${item.color}08`, color: item.color, border: `1px solid ${item.color}20` }}
              >
                {h}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div
          className="w-5 h-5 rounded-full border-2 z-10 relative"
          style={{ background: item.color, borderColor: '#05050A', boxShadow: `0 0 16px ${item.color}60` }}
        />
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${item.color}` }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>
    </div>
  )
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="timeline" className="section-padding relative" style={{ background: 'rgba(5,5,10,0.8)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="04 / journey"
          title="My"
          titleGradient="Timeline"
          description="From first ML models to production cloud deployments — the journey so far."
        />

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Animated spine */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px]"
               style={{ background: 'rgba(30,30,48,1)' }}>
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background: 'linear-gradient(180deg, #F59E0B 0%, #FF6B6B 50%, #7C3AED 100%)',
              }}
            />
          </div>

          {timeline.map((item, i) => (
            <TimelineCard key={item.year + item.title} item={item} index={i} />
          ))}

          {/* End dot */}
          <div className="flex justify-center">
            <div className="w-4 h-4 rounded-full"
                 style={{ background: 'linear-gradient(135deg, #F59E0B, #FF6B6B)', boxShadow: '0 0 20px rgba(245,158,11,0.5)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
