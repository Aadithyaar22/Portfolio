'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const springX = useSpring(cursorX, { stiffness: 300, damping: 28, mass: 0.5 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28, mass: 0.5 })

  const ringX = useSpring(cursorX, { stiffness: 120, damping: 20, mass: 0.8 })
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 20, mass: 0.8 })

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches)
    if (isMobile) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [data-cursor="hover"], input, textarea, select') !== null
      setIsHovering(isInteractive)
    }

    const mouseDown = () => setIsClicking(true)
    const mouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', checkHover)
    window.addEventListener('mousedown', mouseDown)
    window.addEventListener('mouseup', mouseUp)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', checkHover)
      window.removeEventListener('mousedown', mouseDown)
      window.removeEventListener('mouseup', mouseUp)
    }
  }, [cursorX, cursorY, isMobile])

  if (isMobile) return null

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="cursor-dot"
        style={{
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: isClicking ? 6 : 8,
          height: isClicking ? 6 : 8,
          background: isHovering ? '#FF6B6B' : '#F59E0B',
          boxShadow: isHovering
            ? '0 0 12px rgba(255,107,107,0.8)'
            : '0 0 12px rgba(245,158,11,0.8)',
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Outer ring */}
      <motion.div
        className="cursor-ring"
        style={{
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 52 : isClicking ? 24 : 36,
          height: isHovering ? 52 : isClicking ? 24 : 36,
          border: `1.5px solid ${isHovering ? 'rgba(255,107,107,0.6)' : 'rgba(245,158,11,0.5)'}`,
          backgroundColor: isHovering ? 'rgba(255,107,107,0.06)' : 'transparent',
          boxShadow: isHovering ? '0 0 20px rgba(255,107,107,0.2)' : 'none',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      />

      {/* Burst on click */}
      {isClicking && (
        <motion.div
          className="cursor-ring"
          style={{
            left: ringX,
            top: ringY,
            translateX: '-50%',
            translateY: '-50%',
            border: '1px solid rgba(245,158,11,0.4)',
            backgroundColor: 'transparent',
          }}
          initial={{ width: 36, height: 36, opacity: 1 }}
          animate={{ width: 70, height: 70, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}
    </>
  )
}
