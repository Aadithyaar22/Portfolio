'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'text' | 'click' | 'link'

interface Trail {
  id: number
  x: number
  y: number
}

export default function CustomCursor() {
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)
  const [state, setState] = useState<CursorState>('default')
  const [isMobile, setIsMobile] = useState(true)
  const [trails, setTrails] = useState<Trail[]>([])
  const [hoverLabel, setHoverLabel] = useState('')
  const [burstKey, setBurstKey] = useState(0)
  const trailId = useRef(0)
  const lastTrailTime = useRef(0)

  const dotX = useSpring(cursorX, { stiffness: 900, damping: 38, mass: 0.25 })
  const dotY = useSpring(cursorY, { stiffness: 900, damping: 38, mass: 0.25 })
  const ringX = useSpring(cursorX, { stiffness: 200, damping: 24, mass: 0.6 })
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 24, mass: 0.6 })
  const auraX = useSpring(cursorX, { stiffness: 70, damping: 16, mass: 1.2 })
  const auraY = useSpring(cursorY, { stiffness: 70, damping: 16, mass: 1.2 })

  const getState = useCallback((target: Element): CursorState => {
    if (target.closest('input, textarea, [contenteditable]')) return 'text'
    if (target.closest('a[href]')) return 'link'
    if (target.closest('button, [role="button"], [data-cursor="hover"]')) return 'hover'
    return 'default'
  }, [])

  useEffect(() => {
    const touch = window.matchMedia('(pointer: coarse)').matches
    setIsMobile(touch)
    if (touch) return

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setState(getState(e.target as Element))

      const now = Date.now()
      if (now - lastTrailTime.current > 45) {
        lastTrailTime.current = now
        const id = trailId.current++
        setTrails(prev => [...prev.slice(-7), { id, x: e.clientX, y: e.clientY }])
        setTimeout(() => setTrails(prev => prev.filter(t => t.id !== id)), 650)
      }

      const el = (e.target as Element).closest('a[aria-label], button[aria-label], [title]')
      setHoverLabel(el ? (el.getAttribute('aria-label') || el.getAttribute('title') || '') : '')
    }

    const onDown = () => {
      setState('click')
      setBurstKey(k => k + 1)
    }
    const onUp = (e: MouseEvent) => setState(getState(e.target as Element))

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [cursorX, cursorY, getState])

  if (isMobile) return null

  const palette: Record<CursorState, string> = {
    default: '#F59E0B',
    hover:   '#FF6B6B',
    link:    '#A78BFA',
    text:    '#60A5FA',
    click:   '#FBBF24',
  }
  const c = palette[state]
  const isHover = state === 'hover' || state === 'link'
  const isText  = state === 'text'
  const isClick = state === 'click'

  return (
    <>
      {/* Trail dots */}
      {trails.map((trail, i) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none rounded-full"
          style={{
            zIndex: 9994,
            left: trail.x,
            top: trail.y,
            translateX: '-50%',
            translateY: '-50%',
            width: Math.max(2, 7 - i * 0.8),
            height: Math.max(2, 7 - i * 0.8),
            background: c,
          }}
          initial={{ opacity: (i + 1) / trails.length * 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}

      {/* Aura */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{
          zIndex: 9995,
          left: auraX,
          top: auraY,
          translateX: '-50%',
          translateY: '-50%',
          background: `radial-gradient(circle, ${c}20 0%, ${c}05 50%, transparent 70%)`,
        }}
        animate={{
          width: isHover ? 110 : isClick ? 50 : 80,
          height: isHover ? 110 : isClick ? 50 : 80,
        }}
        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          zIndex: 9996,
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: `1.5px solid ${c}`,
          boxShadow: isHover
            ? `0 0 20px ${c}50, 0 0 40px ${c}20, inset 0 0 10px ${c}10`
            : `0 0 8px ${c}40`,
          backgroundColor: isHover ? `${c}08` : 'transparent',
        }}
        animate={{
          width:  isClick ? 18 : isHover ? 52 : isText ? 2.5 : 38,
          height: isClick ? 18 : isHover ? 52 : isText ? 30 : 38,
          borderRadius: isText ? '2px' : '50%',
          rotate: isHover ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          zIndex: 9997,
          left: dotX,
          top: dotY,
          translateX: '-50%',
          translateY: '-50%',
          background: c,
          boxShadow: `0 0 12px ${c}90, 0 0 24px ${c}40`,
          borderRadius: isText ? '1px' : '50%',
        }}
        animate={{
          width:  isClick ? 4 : isHover ? 10 : isText ? 2 : 8,
          height: isClick ? 4 : isHover ? 10 : isText ? 20 : 8,
          opacity: isText ? [1, 0, 1] : 1,
        }}
        transition={
          isText
            ? { opacity: { duration: 1, repeat: Infinity }, default: { type: 'spring', stiffness: 900, damping: 38 } }
            : { type: 'spring', stiffness: 900, damping: 38 }
        }
      />

      {/* Second hover ring */}
      <AnimatePresence>
        {isHover && (
          <motion.div
            key="hover-ring"
            className="fixed pointer-events-none rounded-full"
            style={{
              zIndex: 9995,
              left: ringX,
              top: ringY,
              translateX: '-50%',
              translateY: '-50%',
              border: `1px solid ${c}30`,
            }}
            initial={{ width: 52, height: 52, opacity: 0 }}
            animate={{ width: 72, height: 72, opacity: 1, rotate: -45 }}
            exit={{ width: 52, height: 52, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 22 }}
          />
        )}
      </AnimatePresence>

      {/* Click burst */}
      <AnimatePresence>
        <motion.div
          key={`burst-${burstKey}`}
          className="fixed pointer-events-none rounded-full border"
          style={{
            zIndex: 9995,
            left: dotX,
            top: dotY,
            translateX: '-50%',
            translateY: '-50%',
            borderColor: `${c}70`,
          }}
          initial={{ width: 12, height: 12, opacity: 1 }}
          animate={{ width: 80, height: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        />
      </AnimatePresence>

      {/* Hover label tooltip */}
      <AnimatePresence>
        {hoverLabel && isHover && (
          <motion.div
            key="label"
            className="fixed pointer-events-none font-fira text-[10px] px-2.5 py-1 rounded-lg whitespace-nowrap"
            style={{
              zIndex: 9999,
              left: ringX,
              top: ringY,
              translateX: '-50%',
              translateY: 'calc(-50% + 36px)',
              background: `${c}12`,
              border: `1px solid ${c}35`,
              color: c,
              backdropFilter: 'blur(10px)',
              boxShadow: `0 4px 12px ${c}20`,
            }}
            initial={{ opacity: 0, y: -6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.18 }}
          >
            {hoverLabel}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}