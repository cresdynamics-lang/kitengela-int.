import { useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './ScrollReveal.module.css'

type Direction = 'left' | 'right'

interface ScrollRevealProps {
  children: ReactNode
  direction?: Direction
  className?: string
  /** Optional: root margin for when to trigger (e.g. "0px 0px -50px 0px" to trigger a bit before in view) */
  rootMargin?: string
}

export default function ScrollReveal({
  children,
  direction = 'left',
  className = '',
  rootMargin = '0px 0px -40px 0px',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true)
        })
      },
      { rootMargin, threshold: 0.05 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${styles[direction]} ${visible ? styles.visible : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
