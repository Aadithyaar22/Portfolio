'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Sparkles, Star } from 'lucide-react'
import { projects } from '@/lib/data'
import SectionHeader from '@/components/shared/SectionHeader'

const filters = ['All', 'GenAI', 'Agents', 'ML', 'CV']

const categoryLabel: Record<string, string> = {
  GenAI: 'GenAI / RAG',
  Agents: 'Agentic AI',
  ML: 'Machine Learning',
  CV: 'Computer Vision',
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden project-card"
      style={{
        background: 'rgba(12,12,20,0.9)',
        border: `1px solid ${hovered ? project.color + '50' : 'rgba(30,30,48,1)'}`,
        boxShadow: hovered ? `0 8px 60px ${project.color}20, 0 0 0 1px ${project.color}20` : 'none',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
    >
      {/* Animated corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 opacity-0"
        style={{ background: `radial-gradient(circle at top right, ${project.color}25 0%, transparent 70%)` }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated border trace on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}40, transparent)`,
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['100% 50%', '-100% 50%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}

      <div className="p-7 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
            >
              {project.icon}
            </div>
            <div>
              <div
                className="font-fira text-[10px] tracking-[0.15em] uppercase mb-1"
                style={{ color: project.color }}
              >
                {categoryLabel[project.category] || project.category}
              </div>
              <h3 className="font-clash font-bold text-lg text-text-primary leading-tight">{project.title}</h3>
            </div>
          </div>
          {project.featured && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-fira flex-shrink-0"
                 style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }}>
              <Star size={10} />
              Featured
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Impact badge */}
        <div
          className="flex items-start gap-2 p-3 rounded-lg mb-5 text-xs"
          style={{ background: `${project.color}08`, borderLeft: `2px solid ${project.color}60` }}
        >
          <Sparkles size={12} style={{ color: project.color, marginTop: 1, flexShrink: 0 }} />
          <span style={{ color: project.color }}>{project.impact}</span>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 5).map(tag => (
            <span
              key={tag}
              className="font-fira text-[10px] px-2.5 py-1 rounded-md"
              style={{ background: 'rgba(245,158,11,0.06)', color: '#A09E9A', border: '1px solid rgba(30,30,48,1)' }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="font-fira text-[10px] px-2.5 py-1 rounded-md" style={{ color: '#4A4850' }}>
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: hovered ? `${project.color}15` : 'rgba(18,18,30,1)',
                color: hovered ? project.color : '#A09E9A',
                border: `1px solid ${hovered ? project.color + '40' : 'rgba(30,30,48,1)'}`,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={14} />
              Source Code
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
              style={{ background: project.color, color: '#05050A' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink size={14} />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none"
           style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="03 / projects"
          title="Production"
          titleGradient="Builds"
          description="Systems that are tracked, evaluated, and deployed — not just trained and forgotten."
        />

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map(filter => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-5 py-2.5 rounded-xl font-dm text-sm font-medium transition-all"
              style={{
                background: activeFilter === filter ? 'linear-gradient(135deg, #F59E0B, #FF6B6B)' : 'rgba(12,12,20,0.8)',
                color: activeFilter === filter ? '#05050A' : '#A09E9A',
                border: activeFilter === filter ? 'none' : '1px solid rgba(30,30,48,1)',
                boxShadow: activeFilter === filter ? '0 0 20px rgba(245,158,11,0.3)' : 'none',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {filter === 'All' ? 'All Projects' : filter === 'GenAI' ? 'GenAI / RAG' : filter === 'CV' ? 'Computer Vision' : filter}
            </motion.button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className={project.featured && i === 0 && filtered.length > 2 ? 'lg:col-span-2' : ''}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://github.com/Aadithyaar22"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex"
          >
            <Github size={16} />
            View all repos on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
