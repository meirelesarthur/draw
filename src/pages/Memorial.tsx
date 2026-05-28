import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sair } from '../auth/auth'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import LegalActions from '../components/LegalActions'
import styles from './Memorial.module.css'
import logoNery from '../assets/logo-nery.png'

type Tab = 'fluxograma' | 'documentos'
type DocFilter = 'todos' | 'certidao' | 'peticao' | 'escritura' | 'decisao'




interface Doc {
  id: number
  name: string
  type: DocFilter
  typeLabel: string
  date: string
  pages: string
  status: 'disponivel' | 'pendente'
  letter: string
  url?: string
}

const DOCS: Doc[] = [
  { id: 1, name: 'Testamento 8.12.2017 - RAQUEL', type: 'escritura', typeLabel: 'Escritura', date: '08/12/2017', pages: '—', status: 'disponivel', letter: 'E', url: 'https://drive.google.com/open?id=1cIkhpcjBzz-INZV-izhJHB6ZwO15D5IC' },
  { id: 2, name: 'Certidão Casamento e Divorcio Odette', type: 'certidao', typeLabel: 'Certidão', date: '09/06/1962', pages: '—', status: 'disponivel', letter: 'C', url: 'https://drive.google.com/open?id=1TXBRK1gd_9Ws9cyqb4GR942AgGhhEvK6' },
  { id: 3, name: 'Acórdão Sentença interdição', type: 'decisao', typeLabel: 'Decisão', date: '—', pages: '—', status: 'disponivel', letter: 'D', url: 'https://drive.google.com/open?id=1kKnTVmBfThznpTqdtIv-t85diHRoAiY8' },
  { id: 4, name: 'Escritura União Estável Raquel', type: 'escritura', typeLabel: 'Escritura', date: '—', pages: '—', status: 'disponivel', letter: 'E', url: 'https://drive.google.com/open?id=1znpmtkXTQvlw1oHkQs-5x2y0FUEtQw6Y' },
  { id: 5, name: 'Sentença curatela', type: 'decisao', typeLabel: 'Decisão', date: '—', pages: '—', status: 'disponivel', letter: 'D', url: 'https://drive.google.com/open?id=1kvreNxlTnWamp0csc8AKdsKlb92IuGH1' },
  { id: 6, name: 'Sentença interdição', type: 'decisao', typeLabel: 'Decisão', date: '—', pages: '—', status: 'disponivel', letter: 'D', url: 'https://drive.google.com/open?id=1BosEtVjLoTWQ9rtUrxNR5OGmRQa2NbmD' },
  { id: 7, name: 'Testamento e Revogação Testamento Odette', type: 'escritura', typeLabel: 'Escritura', date: '09/10/2017', pages: '—', status: 'disponivel', letter: 'E', url: 'https://drive.google.com/open?id=1QkQO126suuCd5KELvxOkr9y-5bf-Yw_8' },
  { id: 8, name: 'Partilha Odette', type: 'decisao', typeLabel: 'Decisão', date: '2020', pages: '—', status: 'disponivel', letter: 'D', url: 'https://drive.google.com/open?id=1pQDyRO2jQxGh7Frvac0xga_KVZCThXpg' },
  { id: 9, name: 'Sobrepartilha Odette', type: 'decisao', typeLabel: 'Decisão', date: '2022', pages: '—', status: 'disponivel', letter: 'D', url: 'https://drive.google.com/open?id=1jjm_pgptIqDeGLSr3sP78FoW6ea-uMdV' },
  { id: 10, name: 'Inventário 1093482-39.2024.8.26.0100', type: 'peticao', typeLabel: 'Petição', date: '27/04/2026', pages: '—', status: 'pendente', letter: 'P' },
  { id: 11, name: 'Registro Testamento Raquel - Inicial', type: 'peticao', typeLabel: 'Petição', date: '—', pages: '—', status: 'disponivel', letter: 'P', url: 'https://drive.google.com/open?id=1tol-Bq1z8vsA9i81D8jan9HkERmwPRZi' },
  { id: 12, name: 'Nulidade de Testamento - Inicial', type: 'peticao', typeLabel: 'Petição', date: '—', pages: '—', status: 'disponivel', letter: 'P', url: 'https://drive.google.com/open?id=1Qgv3U59lnf7r4Af6SS4jCm0PA5B2y5Sr' },
]


const TYPE_COLORS: Record<DocFilter | string, string> = {
  certidao:  styles.iconCertidao,
  peticao:   styles.iconPeticao,
  escritura: styles.iconEscritura,
  decisao:   styles.iconDecisao,
  todos:     '',
}

const FILTERS: { key: DocFilter; label: string }[] = [
  { key: 'todos',    label: 'Todos' },
  { key: 'certidao', label: 'Certidões' },
  { key: 'peticao',  label: 'Petições' },
  { key: 'escritura',label: 'Escrituras' },
  { key: 'decisao',  label: 'Decisões' },
]

export default function Memorial() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('fluxograma')
  const [docFilter, setDocFilter] = useState<DocFilter>('todos')
  const [search, setSearch] = useState('')

  function handleSair() { sair(); navigate('/login', { replace: true }) }

  const visibleDocs = DOCS.filter(d => {
    const matchFilter = docFilter === 'todos' || d.type === docFilter
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className={styles.page}>
      {/* ── TOPBAR ── */}
      <div className={styles.topbar}>
        <div className={styles.topbarBrand}>
          <img src={logoNery} alt="NERY Advogados" className={styles.topbarLogo} />
        </div>

        <div className={styles.topbarDivider} />

        <div className={styles.topbarLeft}>
          <button
            className={`${styles.topbarTab} ${tab === 'fluxograma' ? styles.topbarTabActive : ''}`}
            onClick={() => setTab('fluxograma')}
          >
            <IconFluxograma />
            Fluxograma
          </button>
          <button
            className={`${styles.topbarTab} ${tab === 'documentos' ? styles.topbarTabActive : ''}`}
            onClick={() => setTab('documentos')}
          >
            <IconDocs />
            Documentos
            <span className={styles.topbarBadge}>{DOCS.length}</span>
          </button>
        </div>

        <div className={styles.topbarRight}>
          <button className={styles.topbarAction} onClick={() => navigate('/')}>← Hub</button>
          <button className={styles.topbarAction} onClick={handleSair}>Sair</button>
        </div>
      </div>

      <Header />

      {/* ── CONTEÚDO ── */}
      {tab === 'fluxograma' && (
        <main className={styles.main}>
          <div className={styles.timelineSection}>
            <Timeline />
          </div>
          <div className={styles.legalSection}>
            <LegalActions />
          </div>
        </main>
      )}

      {tab === 'documentos' && (
        <main className={styles.docsMain}>
          {/* toolbar */}
          <div className={styles.docsToolbar}>
            <div className={styles.docsSearchWrap}>
              <span className={styles.docsSearchIcon}><IconSearch /></span>
              <input
                className={styles.docsSearch}
                placeholder="Buscar documento…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className={styles.docsFilters}>
              {FILTERS.map(f => (
                <button
                  key={f.key}
                  className={`${styles.docsFilt} ${docFilter === f.key ? styles.docsFiltActive : ''}`}
                  onClick={() => setDocFilter(f.key)}
                >
                  {f.label}
                  <span className={styles.docsFiltCount}>
                    {f.key === 'todos' ? DOCS.length : DOCS.filter(d => d.type === f.key).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* table header */}
          <div className={styles.docsTableHead}>
            <span className={styles.thName}>Nome</span>
            <span className={styles.thType}>Tipo</span>
            <span className={styles.thDate}>Data</span>
            <span className={styles.thPages}>Páginas</span>
            <span className={styles.thStatus}>Status</span>
            <span className={styles.thAction} />
          </div>

          {/* rows */}
          <div className={styles.docsTableBody}>
            {visibleDocs.length === 0 && (
              <div className={styles.docsEmpty}>Nenhum documento encontrado.</div>
            )}
            {visibleDocs.map(doc => (
              <div key={doc.id} className={styles.docsRow}>
                <div className={styles.docNameCell}>
                  <div className={`${styles.docLetterIcon} ${TYPE_COLORS[doc.type]}`}>
                    {doc.letter}
                  </div>
                  <span className={styles.docNameText}>{doc.name}</span>
                </div>
                <span className={styles.docTypeCell}>{doc.typeLabel}</span>
                <span className={styles.docDateCell}>{doc.date}</span>
                <span className={styles.docPagesCell}>{doc.pages}</span>
                <span className={`${styles.docStatusCell} ${doc.status === 'pendente' ? styles.docStatusPend : styles.docStatusOk}`}>
                  {doc.status === 'pendente' ? 'Pendente' : 'Disponível'}
                </span>
                {doc.url ? (
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className={`${styles.docActionCell} ${styles.docActionLink}`}>
                    Abrir →
                  </a>
                ) : (
                  <span className={`${styles.docActionCell} ${doc.status === 'pendente' ? styles.docActionDisabled : ''}`}>
                    {doc.status === 'pendente' ? '—' : 'Abrir →'}
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className={styles.docsCount}>{visibleDocs.length} de {DOCS.length} documentos</p>
        </main>
      )}

      <footer className={styles.footer}>
        <img src={logoNery} alt="NERY Advogados" className={styles.footerLogo} />
      </footer>
    </div>
  )
}

function IconFluxograma() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="5" width="5" height="4" rx="1"/>
      <rect x="7" y="1" width="5" height="4" rx="1"/>
      <rect x="7" y="9" width="5" height="4" rx="1"/>
      <rect x="13" y="5" width="4" height="4" rx="1"/>
      <path d="M6 7h1M12 3v2M12 9v2M12 7h1"/>
    </svg>
  )
}

function IconDocs() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2h7l3 3v11a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"/>
      <path d="M11 2v3h3M6 9h6M6 12h4"/>
    </svg>
  )
}

function IconSearch() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7.5" cy="7.5" r="4.5"/>
      <path d="M16 16l-3.5-3.5"/>
    </svg>
  )
}
