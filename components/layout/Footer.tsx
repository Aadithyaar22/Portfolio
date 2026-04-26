'use client'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { personalInfo } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="relative py-12 overflow-hidden" style={{ borderTop: '1px solid rgba(30,30,48,1)' }}>
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Brand */}
        <div className="text-center md:text-left">
          <div className="font-clash text-xl font-bold text-gradient-amber mb-1">Aadithya A R</div>
          <div className="font-fira text-xs text-text-muted">
            ML Engineer · GenAI Builder · Bengaluru, India
          </div>
        </div>

        {/* Center */}
        <div className="font-fira text-xs text-text-muted text-center">
          <div>Designed & built by Aadithya A R</div>
          <div className="mt-1">© {new Date().getFullYear()} · All rights reserved</div>
        </div>

        {/* Back to top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-dm text-sm font-medium group"
          style={{ background: 'rgba(12,12,20,0.9)', border: '1px solid rgba(30,30,48,1)', color: '#A09E9A' }}
          whileHover={{ borderColor: 'rgba(245,158,11,0.4)', color: '#F59E0B', y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Back to top</span>
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowUp size={14} />
          </motion.div>
        </motion.button>
      </div>
    </footer>
  )
}
