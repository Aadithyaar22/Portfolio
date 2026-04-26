'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SectionHeaderProps {
  label: string
  title: string
  titleGradient?: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ label, title, titleGradient, description, align = 'center' }: SectionHeaderProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const isCenter = align === 'center'

  return (
    <motion.div
      ref={ref}
      className={`mb-16 ${isCenter ? 'text-center' : 'text-left'}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}>
        <span className="font-fira text-xs tracking-[0.25em] uppercase" style={{ color: '#F59E0B' }}>
          {label}
        </span>
        <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, #F59E0B, transparent)' }} />
      </div>

      <h2 className="section-title font-clash mb-4">
        {titleGradient ? (
          <>
            <span className="text-text-primary">{title}</span>{' '}
            <span className="text-gradient-amber">{titleGradient}</span>
          </>
        ) : (
          <span className="text-text-primary">{title}</span>
        )}
      </h2>

      {description && (
        <p className="text-text-secondary max-w-xl leading-relaxed" style={{ marginLeft: isCenter ? 'auto' : 0, marginRight: isCenter ? 'auto' : 0 }}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
