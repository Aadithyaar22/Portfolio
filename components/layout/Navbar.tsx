'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { personalInfo } from '@/lib/data'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#timeline' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollY } = useScroll()
  const progressWidth = useTransform(scrollY, [0, 5000], ['0%', '100%'])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)

      const sections = navLinks.map(l => l.href.slice(1))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (href: string) => {
    setIsOpen(false)
    const id = href.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-50 origin-left"
        style={{
          width: progressWidth,
          background: 'linear-gradient(90deg, #F59E0B 0%, #FF6B6B 50%, #7C3AED 100%)',
        }}
      />

      <motion.header
        className="fixed top-0 left-0 right-0 z-40"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div
          className="mx-4 mt-3 rounded-2xl transition-all duration-500"
          style={{
            background: isScrolled
              ? 'rgba(5,5,10,0.85)'
              : 'transparent',
            backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
            border: isScrolled ? '1px solid rgba(245,158,11,0.12)' : '1px solid transparent',
            boxShadow: isScrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-coral-500 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity" 
                     style={{ background: 'linear-gradient(135deg, #F59E0B, #FF6B6B)' }} />
                <div className="absolute inset-[1px] bg-surface rounded-lg flex items-center justify-center"
                     style={{ background: '#0C0C14' }}>
                  <span className="font-fira text-xs font-semibold text-gradient-amber">
                    AAR
                  </span>
                </div>
              </div>
              <div>
                <div className="font-clash text-sm font-bold text-text-primary leading-none">
                  Aadithya A R
                </div>
                <div className="font-fira text-[10px] text-text-muted leading-none mt-0.5">
                  ML Engineer
                </div>
              </div>
            </motion.a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleClick(link.href)}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg group transition-colors"
                  style={{ color: active === link.href.slice(1) ? '#F59E0B' : '#A09E9A' }}
                >
                  <span className="relative z-10 group-hover:text-text-primary transition-colors">
                    {link.label}
                  </span>
                  {active === link.href.slice(1) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(245,158,11,0.1)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="absolute bottom-1.5 left-4 right-4 h-[1px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={personalInfo.resumeUrl}
                download
                className="btn-primary text-sm py-2.5 px-5"
              >
                <span>Resume</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border transition-colors"
              style={{ border: '1px solid rgba(245,158,11,0.2)', color: '#F59E0B' }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex flex-col"
              style={{ background: 'rgba(5,5,10,0.98)', backdropFilter: 'blur(20px)' }}
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="flex justify-between items-center p-6">
                <span className="font-fira text-amber-400">menu.nav</span>
                <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-amber-400">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-4">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    onClick={() => handleClick(link.href)}
                    className="font-clash text-4xl font-bold text-text-secondary hover:text-amber-400 transition-colors"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.a
                  href={personalInfo.resumeUrl}
                  download
                  className="mt-8 btn-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span>Download Resume</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
