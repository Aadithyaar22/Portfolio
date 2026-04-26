'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '@/lib/data'
import SectionHeader from '@/components/shared/SectionHeader'

const categoryColors: Record<string, string> = {
  'AI & ML': '#F59E0B',
  'Languages': '#FF6B6B',
  'Systems & Cloud': '#3B82F6',
  'Databases & Vector': '#7C3AED',
}

const categoryIcons: Record<string, string> = {
  'AI & ML': '🧠',
  'Languages': '💻',
  'Systems & Cloud': '☁️',
  'Databases & Vector': '🗄️',
}

function SkillBar({ name, level, icon, color, delay }: { name: string; level: number; icon: string; color: string; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm group-hover:scale-110 transition-transform">{icon}</span>
          <span className="font-dm text-sm font-medium text-text-primary">{name}</span>
        </div>
        <motion.span
          className="font-fira text-xs"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.6 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(30,30,48,1)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color} 0%, ${color}99 100%)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ delay: delay + 0.3, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </motion.div>
  )
}

function CategoryTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const color = categoryColors[label]
  return (
    <motion.button
      onClick={onClick}
      className="relative flex items-center gap-2 px-5 py-3 rounded-xl font-dm text-sm font-medium transition-colors"
      style={{
        color: active ? '#05050A' : '#A09E9A',
        background: active ? color : 'rgba(12,12,20,0.8)',
        border: active ? 'none' : '1px solid rgba(30,30,48,1)',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{categoryIcons[label]}</span>
      {label}
      {active && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ boxShadow: `0 0 20px ${color}50` }}
          layoutId="skill-tab-glow"
        />
      )}
    </motion.button>
  )
}

export default function Skills() {
  const categories = Object.keys(skills)
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const activeSkills = skills[activeCategory as keyof typeof skills]
  const color = categoryColors[activeCategory]
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" className="section-padding relative" style={{ background: 'rgba(8,8,12,0.5)' }}>
      {/* Decorative blob */}
      <div className="absolute bottom-0 left-0 w-80 h-80 opacity-5 pointer-events-none"
           style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="02 / skills"
          title="Tech Stack &"
          titleGradient="Expertise"
          description="From LLM pipelines to cloud deployments — the full engineering surface."
        />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <CategoryTab
              key={cat}
              label={cat}
              active={cat === activeCategory}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            ref={ref}
            className="grid md:grid-cols-2 gap-x-16 gap-y-5 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {activeSkills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                {...skill}
                color={color}
                delay={i * 0.05}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All skills visual chips */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <span className="font-fira text-xs tracking-[0.2em] uppercase" style={{ color: '#4A4850' }}>
              Full stack snapshot
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(skills).flatMap(([cat, catSkills]) =>
              catSkills.map(s => (
                <motion.div
                  key={`${cat}-${s.name}`}
                  className="tag-chip"
                  style={{
                    borderColor: `${categoryColors[cat]}30`,
                    color: categoryColors[cat],
                    background: `${categoryColors[cat]}08`,
                  }}
                  whileHover={{ scale: 1.08, borderColor: categoryColors[cat] }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{s.icon}</span>
                  {s.name}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
