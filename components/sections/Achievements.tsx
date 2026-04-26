'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { achievements, certifications } from '@/lib/data'
import SectionHeader from '@/components/shared/SectionHeader'

function AchievementCard({ item, index }: { item: typeof achievements[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl p-6 group overflow-hidden"
      style={{
        background: 'rgba(12,12,20,0.9)',
        border: '1px solid rgba(30,30,48,1)',
      }}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{
        y: -5,
        borderColor: item.color + '40',
        boxShadow: `0 12px 50px ${item.color}12`,
      }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${item.color}15 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <motion.div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 relative"
        style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}
        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
        transition={{ duration: 0.4 }}
      >
        {item.icon}
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{ border: `1px solid ${item.color}` }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
        />
      </motion.div>

      <div className="font-fira text-[10px] tracking-[0.15em] uppercase mb-2" style={{ color: item.color }}>
        {item.year}
      </div>
      <h3 className="font-clash font-bold text-base text-text-primary mb-1">{item.title}</h3>
      <div className="font-dm text-sm mb-3" style={{ color: item.color + 'CC' }}>{item.org}</div>
      <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="05 / achievements"
          title="Impact &"
          titleGradient="Recognition"
          description="Shipped, deployed, measured — milestones that mark the journey."
        />

        {/* Achievement cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {achievements.map((item, i) => (
            <AchievementCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Certifications marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <span className="font-fira text-xs tracking-[0.2em] uppercase" style={{ color: '#4A4850' }}>
              Certifications & Learning
            </span>
          </div>

          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10"
                 style={{ background: 'linear-gradient(90deg, #05050A, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10"
                 style={{ background: 'linear-gradient(-90deg, #05050A, transparent)' }} />

            <div className="flex overflow-hidden">
              <div className="marquee-track">
                {[...certifications, ...certifications].map((cert, i) => (
                  <motion.div
                    key={`${cert.name}-${i}`}
                    className="flex items-center gap-3 px-5 py-3 rounded-xl flex-shrink-0"
                    style={{
                      background: 'rgba(12,12,20,0.9)',
                      border: '1px solid rgba(30,30,48,1)',
                      minWidth: 'max-content',
                    }}
                    whileHover={{ borderColor: 'rgba(245,158,11,0.3)', scale: 1.03 }}
                  >
                    <span className="text-lg">{cert.icon}</span>
                    <div>
                      <div className="font-dm text-sm font-medium text-text-primary whitespace-nowrap">{cert.name}</div>
                      <div className="font-fira text-[10px] text-text-muted">{cert.issuer}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
