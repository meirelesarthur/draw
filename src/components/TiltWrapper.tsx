import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const spring = { damping: 30, stiffness: 100, mass: 2 }

interface Props {
  children: React.ReactNode
  rotateAmplitude?: number
  scaleOnHover?: number
  className?: string
  style?: React.CSSProperties
}

export default function TiltWrapper({
  children,
  rotateAmplitude = 8,
  scaleOnHover = 1.04,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(useMotionValue(0), spring)
  const rotateY = useSpring(useMotionValue(0), spring)
  const scale   = useSpring(1, spring)

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect    = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left  - rect.width  / 2
    const offsetY = e.clientY - rect.top   - rect.height / 2
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude)
    rotateY.set((offsetX / (rect.width  / 2)) *  rotateAmplitude)
  }

  function handleMouseEnter() { scale.set(scaleOnHover) }

  function handleMouseLeave() {
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div
      ref={ref}
      style={{ perspective: '800px', ...style }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
