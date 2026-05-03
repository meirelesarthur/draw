import { useEffect, useRef } from 'react'

interface Props {
  sparkColor?:  string
  sparkSize?:   number
  sparkRadius?: number
  sparkCount?:  number
  duration?:    number
}

interface Spark {
  x: number
  y: number
  angle: number
  startTime: number
}

/**
 * ReactBits — ClickSpark (ported, zero external deps)
 * Renders null; attaches a position:fixed canvas to document.body.
 * rAF only runs while sparks are alive → idle cost = 0.
 */
export default function ClickSpark({
  sparkColor  = '#c85c0e',
  sparkSize   = 7,
  sparkRadius = 22,
  sparkCount  = 7,
  duration    = 480,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sparksRef = useRef<Spark[]>([])
  const rafRef    = useRef<number>(0)
  const activeRef = useRef(false)

  /* ── mount: create fixed canvas ── */
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.style.cssText =
      'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99999'
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    document.body.appendChild(canvas)
    canvasRef.current = canvas

    const onResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      canvas.remove()
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  /* ── draw loop + click handler ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    function draw(ts: number) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)

      sparksRef.current = sparksRef.current.filter(s => {
        const elapsed = ts - s.startTime
        if (elapsed >= duration) return false

        const t      = elapsed / duration
        const eased  = t * (2 - t)          // ease-out quad
        const dist   = eased * sparkRadius
        const len    = sparkSize * (1 - eased)

        const x1 = s.x + dist * Math.cos(s.angle)
        const y1 = s.y + dist * Math.sin(s.angle)
        const x2 = s.x + (dist + len) * Math.cos(s.angle)
        const y2 = s.y + (dist + len) * Math.sin(s.angle)

        ctx.globalAlpha = 1 - eased
        ctx.strokeStyle = sparkColor
        ctx.lineWidth   = 1.8
        ctx.lineCap     = 'round'
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        return true
      })

      ctx.globalAlpha = 1

      if (sparksRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        activeRef.current = false
      }
    }

    function onClick(e: MouseEvent) {
      const now = performance.now()
      const angle = (2 * Math.PI) / sparkCount
      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: angle * i,
          startTime: now,
        })
      }
      if (!activeRef.current) {
        activeRef.current = true
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(rafRef.current)
    }
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration])

  return null
}
