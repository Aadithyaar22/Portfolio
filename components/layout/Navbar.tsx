'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#timeline' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

const RESUME_URL = '/resume.pdf'

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
      for (const section of [...sections].reverse()) {
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

  const scrollTo = (href: string) => {
    setIsOpen(false)
    const id = href.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleResumeClick = () => {
    const link = document.createElement('a')
    link.href = RESUME_URL
    link.download = 'Aadithya_AR_Resume.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-50 origin-left pointer-events-none"
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
            background: isScrolled ? 'rgba(5,5,10,0.88)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
            border: isScrolled ? '1px solid rgba(245,158,11,0.12)' : '1px solid transparent',
            boxShadow: isScrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              style={{ cursor: 'none', background: 'none', border: 'none' }}
            >
              <div className="relative w-9 h-9">
                <div
                  className="absolute inset-0 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #F59E0B, #FF6B6B)' }}
                />
                <div
                  className="absolute inset-[1px] rounded-lg flex items-center justify-center"
                  style={{ background: '#0C0C14' }}
                >
                  <span className="font-fira text-[10px] font-semibold text-gradient-amber">AAR</span>
                </div>
              </div>
              <div className="text-left">
                <div className="font-clash text-sm font-bold text-text-primary leading-none">Aadithya A R</div>
                <div className="font-fira text-[10px] text-text-muted leading-none mt-0.5">ML Engineer</div>
              </div>
            </motion.button>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1)
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="relative px-4 py-2 text-sm font-medium rounded-lg group"
                    style={{
                      color: isActive ? '#F59E0B' : '#A09E9A',
                      cursor: 'none',
                      background: 'none',
                      border: 'none',
                    }}
                  >
                    <span className="relative z-10 group-hover:text-text-primary transition-colors">
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(245,158,11,0.1)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span
                      className="absolute bottom-1.5 left-4 right-4 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                      style={{ background: '#F59E0B' }}
                    />
                  </button>
                )
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleResumeClick}
                className="btn-primary text-sm py-2.5 px-5"
                aria-label="Download Resume"
              >
                <Download size={14} />
                <span>Resume</span>
              </button>
            </div>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border transition-colors"
              style={{
                border: '1px solid rgba(245,158,11,0.2)',
                color: '#F59E0B',
                background: 'transparent',
                cursor: 'none',
              }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>
        </div>

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
                <span className="font-fira text-sm" style={{ color: '#F59E0B' }}>menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ cursor: 'none', background: 'none', border: 'none', color: '#A09E9A' }}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 gap-5">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="font-clash text-4xl font-bold transition-colors"
                    style={{ color: '#A09E9A', cursor: 'none', background: 'none', border: 'none' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.color = '#F59E0B' }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.color = '#A09E9A' }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={handleResumeClick}
                  className="mt-8 btn-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                >
                  <Download size={16} />
                  <span>Download Resume</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}