import styles from './EventCard.module.css'

export interface DocLink { label: string; url: string }

interface EventCardProps {
  family: 'odette' | 'raquel'
  highlight?: boolean
  rowItem?: boolean
  rowItemLast?: boolean
  docs?: DocLink[]
  children: React.ReactNode
}

export default function EventCard({ family, highlight = false, rowItem = false, rowItemLast = false, docs, children }: EventCardProps) {
  return (
    <div
      className={[
        styles.card,
        // Only apply family border class when NOT in a row container
        !rowItem && (family === 'odette' ? styles.odette : styles.raquel),
        highlight ? styles.highlight : '',
        rowItem ? styles.rowItem : '',
        rowItem && rowItemLast ? styles.rowItemLast : '',
      ].filter(Boolean).join(' ')}
    >
      {children}
      {docs && docs.length > 0 && (
        <div className={styles.docLinks}>
          {docs.map((d, i) => (
            <a
              key={i}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.docLink}
              onClick={e => e.stopPropagation()}
            >
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 1h5l3 3v7H2V1z" /><path d="M7 1v3h3" />
              </svg>
              {d.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
