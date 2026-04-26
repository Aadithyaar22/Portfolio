'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, CheckCircle2, AlertCircle, Github, Linkedin, Mail, Twitter, MapPin } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'

const socialRows = [
  {
    icon: <Github size={18} />,
    label: 'GitHub',
    href: 'https://github.com/Aadithyaar22',
    color: '#F1F0ED',
    handle: '@Aadithyaar22',
    external: true,
  },
  {
    icon: <Linkedin size={18} />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aadithya-a-r/',
    color: '#0A66C2',
    handle: '/in/aadithya-a-r',
    external: true,
  },
  {
    icon: <Mail size={18} />,
    label: 'Email',
    href: 'mailto:aadithyaar22@gmail.com',
    color: '#F59E0B',
    handle: 'aadithyaar22@gmail.com',
    external: false,
  },
  {
    icon: <Twitter size={18} />,
    label: 'Twitter / X',
    href: 'https://x.com/AadithyaAR1',
    color: '#1DA1F2',
    handle: '@AadithyaAR1',
    external: true,
  },
]

type FormState = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (form.message.trim().length < 20) e.message = 'At least 20 characters'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setFormState('sending')
    try {
      const emailjs = await import('@emailjs/browser')
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_name: 'Aadithya',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      )
      setFormState('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setFormState('error')
    }
    setTimeout(() => setFormState('idle'), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ background: 'rgba(5,5,10,0.9)' }}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <SectionHeader
          label="06 / contact"
          title="Let's"
          titleGradient="Connect"
          description="Open to internships, research collaborations, and MS opportunities. Let's talk."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-clash text-3xl font-bold text-text-primary mb-4">
              Got an opportunity?<br />
              <span className="text-gradient-amber">Let&apos;s build together.</span>
            </h3>
            <p className="text-text-secondary leading-relaxed mb-10">
              Whether it&apos;s a research internship, collaboration on a GenAI project, or an MS opportunity — I&apos;m all ears. Typically respond within 24 hours.
            </p>

            <div className="space-y-3">
              {socialRows.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <a
                    href={s.href}
                    target={s.external ? '_blank' : undefined}
                    rel={s.external ? 'noopener noreferrer' : undefined}
                    aria-label={s.label}
                    style={{
                      background: 'rgba(12,12,20,0.9)',
                      border: '1px solid rgba(30,30,48,1)',
                      borderRadius: '12px',
                      padding: '16px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      cursor: 'none',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.borderColor = s.color + '50'
                      el.style.boxShadow = `0 4px 20px ${s.color}15`
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.borderColor = 'rgba(30,30,48,1)'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.color}15`, color: s.color }}
                    >
                      {s.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-dm text-sm font-medium text-text-primary">{s.label}</div>
                      <div className="font-fira text-xs text-text-muted truncate">{s.handle}</div>
                    </div>
                    <div className="ml-auto font-fira text-sm text-text-muted flex-shrink-0">→</div>
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 flex items-center gap-3 p-4 rounded-xl"
              style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.12)' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <MapPin size={18} style={{ color: '#F59E0B', flexShrink: 0 }} />
              <div>
                <div className="font-dm text-sm font-medium text-text-primary">Bengaluru, India</div>
                <div className="font-fira text-xs text-text-muted">IST (UTC +5:30) · Open to Remote</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block font-fira text-xs text-text-muted mb-2">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    className="form-input"
                    style={errors.name ? { borderColor: '#FF6B6B' } : {}}
                  />
                  {errors.name && <p className="font-fira text-[10px] mt-1" style={{ color: '#FF6B6B' }}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-fira text-xs text-text-muted mb-2">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    autoComplete="email"
                    className="form-input"
                    style={errors.email ? { borderColor: '#FF6B6B' } : {}}
                  />
                  {errors.email && <p className="font-fira text-[10px] mt-1" style={{ color: '#FF6B6B' }}>{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block font-fira text-xs text-text-muted mb-2">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Research collaboration / Internship / ..."
                  className="form-input"
                  style={errors.subject ? { borderColor: '#FF6B6B' } : {}}
                />
                {errors.subject && <p className="font-fira text-[10px] mt-1" style={{ color: '#FF6B6B' }}>{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-fira text-xs text-text-muted mb-2">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about the opportunity..."
                  className="form-input resize-none"
                  style={errors.message ? { borderColor: '#FF6B6B' } : {}}
                />
                {errors.message && <p className="font-fira text-[10px] mt-1" style={{ color: '#FF6B6B' }}>{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={formState === 'sending'}
                className="btn-primary w-full justify-center"
                whileHover={formState === 'idle' ? { scale: 1.02 } : {}}
                whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
              >
                <AnimatePresence mode="wait">
                  {formState === 'idle' && (
                    <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Send size={16} /><span>Send Message</span>
                    </motion.span>
                  )}
                  {formState === 'sending' && (
                    <motion.span key="sending" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <motion.div className="w-4 h-4 rounded-full border-2 border-void border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                      <span>Sending...</span>
                    </motion.span>
                  )}
                  {formState === 'success' && (
                    <motion.span key="success" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <CheckCircle2 size={16} /><span>Sent successfully! 🎉</span>
                    </motion.span>
                  )}
                  {formState === 'error' && (
                    <motion.span key="error" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <AlertCircle size={16} /><span>Failed — try email directly</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p className="font-fira text-xs text-center text-text-muted">
                Or email at{' '}
                <a href="mailto:aadithyaar22@gmail.com" style={{ color: '#F59E0B', cursor: 'none' }}>
                  aadithyaar22@gmail.com
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}