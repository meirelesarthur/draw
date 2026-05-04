import { useState } from 'react'
import type { TlEvent } from '../data/memorialPadraoData'
import TiltWrapper from './TiltWrapper'
import styles from './TimelineVertical.module.css'

interface Props {
  items: TlEvent[]
}

export default function TimelineVertical({ items }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <ol className={styles.timeline} aria-label="Linha do tempo">
      {items.map((item, i) => {
        const isLast   = i === items.length - 1
        const isOpen   = open === i
        const typeKey  = item.type === 'key'
        const typeAlert = item.type === 'alert'

        return (
          <li
            key={i}
            className={`${styles.item} ${isOpen ? styles.itemOpen : ''} ${isLast ? styles.itemLast : ''}`}
            style={{ '--i': i } as React.CSSProperties}
          >
            {/* ── DATE ── */}
            <div className={styles.dateCol}>
              <time className={styles.date}>{item.date}</time>
            </div>

            {/* ── DOT + CONNECTOR ── */}
            <div className={styles.centerCol}>
              <button
                className={`${styles.dot}
                  ${typeKey   ? styles.dotKey   : ''}
                  ${typeAlert ? styles.dotAlert : ''}
                  ${item.type === 'normal' ? styles.dotNormal : ''}`}
                onClick={() => setOpen(p => p === i ? null : i)}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? 'Fechar' : 'Abrir'} detalhes: ${item.title}`}
              >
                {typeKey   && <DotIconKey />}
                {typeAlert && <DotIconAlert />}
                {item.type === 'normal' && <DotIconNormal />}
              </button>
              {!isLast && <div className={styles.connector} />}
            </div>

            {/* ── CONTENT ── */}
            <div className={styles.contentCol}>
              <button
                className={styles.header}
                onClick={() => setOpen(p => p === i ? null : i)}
              >
                <span className={`${styles.title}
                  ${typeKey   ? styles.titleKey   : ''}
                  ${typeAlert ? styles.titleAlert : ''}`}
                >
                  {item.title}
                </span>

                <span className={styles.tags}>
                  {item.tags.map((t, ti) => (
                    <span
                      key={ti}
                      className={`${styles.tag}
                        ${t === 'key'   ? styles.tagKey   : ''}
                        ${t === 'alert' ? styles.tagAlert : ''}
                        ${t === 'doc'   ? styles.tagDoc   : ''}`}
                    >
                      {t === 'key' ? 'Marco' : t === 'alert' ? 'Crítico' : 'Doc.'}
                    </span>
                  ))}
                </span>

                <ChevronIcon open={isOpen} />
              </button>

              {isOpen && (
                <div className={styles.detail}>
                  <p className={styles.desc}>{item.desc}</p>

                  {item.docs.length > 0 && (
                    <div className={styles.docs}>
                      {item.docs.map((doc, di) => (
                        <TiltWrapper key={di} rotateAmplitude={6} scaleOnHover={1.03}>
                          <div className={styles.doc}>
                            <div className={`${styles.docIcon} ${styles[doc.icon as keyof typeof styles]}`}>
                              {doc.l}
                            </div>
                            <div className={styles.docInfo}>
                              <p className={styles.docName}>{doc.name}</p>
                              <p className={styles.docMeta}>{doc.meta}</p>
                            </div>
                            {doc.url !== '#'
                              ? <a href={doc.url} target="_blank" rel="noopener noreferrer" className={styles.docLink}>Abrir →</a>
                              : <span className={styles.docLinkDisabled}>Pendente</span>
                            }
                          </div>
                        </TiltWrapper>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/* ── INLINE ICONS ── */
function DotIconKey() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2l1.5 3 3.5.5-2.5 2.5.6 3.5L8 10l-3.1 1.5.6-3.5L3 5.5l3.5-.5z" />
    </svg>
  )
}

function DotIconAlert() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3l6 10H2L8 3z" />
      <path d="M8 7v3" />
      <circle cx="8" cy="11.5" r=".4" fill="currentColor" stroke="none" />
    </svg>
  )
}

function DotIconNormal() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="8" r="3" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  )
}
