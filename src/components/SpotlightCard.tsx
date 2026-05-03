import { useRef } from 'react'

interface Props {
  children:       React.ReactNode
  className?:     string
  spotlightColor?: string
  style?:         React.CSSProperties
}

/**
 * ReactBits — SpotlightCard (ported, zero external deps)
 * Adds a radial-gradient "spotlight" that tracks the mouse.
 * Apply .spotlightRoot CSS class on the parent element.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(200, 92, 14, 0.09)',
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el   = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--sx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--sy', `${e.clientY - rect.top}px`)
    el.style.setProperty('--sc', spotlightColor)
  }

  function handleMouseLeave() {
    ref.current?.style.removeProperty('--sc')
  }

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {children}
    </div>
  )
}
