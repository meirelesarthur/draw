import { useRef, useEffect } from 'react'

interface Props {
  to:        number
  from?:     number
  duration?: number   // seconds
  delay?:    number   // seconds
  className?: string
}

/**
 * ReactBits — CountUp (ported, zero external deps)
 * Animates a number from `from` to `to` using rAF + easeOutExpo
 * when the element enters the viewport (IntersectionObserver, fires once).
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1.4,
  delay = 0,
  className = '',
}: Props) {
  const spanRef   = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = spanRef.current
    if (!el) return
    el.textContent = String(from)

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return
        startedRef.current = true
        obs.disconnect()

        const ms = duration * 1000

        function easeOutExpo(t: number) {
          return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
        }

        let rafId: number
        function start() {
          const t0 = performance.now()
          function tick(now: number) {
            const progress = Math.min((now - t0) / ms, 1)
            el.textContent = String(Math.round(from + (to - from) * easeOutExpo(progress)))
            if (progress < 1) rafId = requestAnimationFrame(tick)
          }
          rafId = requestAnimationFrame(tick)
        }

        if (delay > 0) {
          setTimeout(start, delay * 1000)
        } else {
          start()
        }

        return () => cancelAnimationFrame(rafId)
      },
      { threshold: 0.2 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [from, to, duration, delay])

  return <span ref={spanRef} className={className}>{from}</span>
}
