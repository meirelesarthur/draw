import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sair } from '../auth/auth'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import LegalActions from '../components/LegalActions'
import styles from './Memorial.module.css'

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
}

const DOCS: Doc[] = [
  { id: 1,  name: 'Testamento Público de MARIALDO',                     type: 'escritura', typeLabel: 'Escritura',  date: '08 dez. 2017', pages: '4 págs.',  status: 'disponivel', letter: 'T' },
  { id: 2,  name: 'Certidão de Casamento — MARIALDO e ODETTE',           type: 'certidao',  typeLabel: 'Certidão',   date: '09 jun. 1962', pages: '2 págs.',  status: 'disponivel', letter: 'C' },
  { id: 3,  name: 'Certidão de Nascimento — LUCIANA',                    type: 'certidao',  typeLabel: 'Certidão',   date: '1964',         pages: '1 pág.',   status: 'disponivel', letter: 'C' },
  { id: 4,  name: 'Certidão de Nascimento — MARIANA',                    type: 'certidao',  typeLabel: 'Certidão',   date: '1994',         pages: '1 pág.',   status: 'disponivel', letter: 'C' },
  { id: 5,  name: 'Certidão de Óbito — MARIALDO',                        type: 'certidao',  typeLabel: 'Certidão',   date: '2021',         pages: '2 págs.',  status: 'disponivel', letter: 'C' },
  { id: 6,  name: 'Certidão de Óbito — ARNALDO',                         type: 'certidao',  typeLabel: 'Certidão',   date: '03 ago. 2013', pages: '2 págs.',  status: 'disponivel', letter: 'C' },
  { id: 7,  name: 'Escritura de Reconhecimento de União Estável',         type: 'escritura', typeLabel: 'Escritura',  date: '2015',         pages: '3 págs.',  status: 'disponivel', letter: 'E' },
  { id: 8,  name: 'Petição Inicial — Inventário',                         type: 'peticao',   typeLabel: 'Petição',    date: '2021',         pages: '18 págs.', status: 'disponivel', letter: 'P' },
  { id: 9,  name: 'Memorial de RAQUEL',                                   type: 'peticao',   typeLabel: 'Petição',    date: '2022',         pages: '12 págs.', status: 'disponivel', letter: 'P' },
  { id: 10, name: 'Memorial de MARIANA',                                  type: 'peticao',   typeLabel: 'Petição',    date: '2022',         pages: '10 págs.', status: 'disponivel', letter: 'P' },
  { id: 11, name: 'Decisão de Abertura do Inventário',                    type: 'decisao',   typeLabel: 'Decisão',    date: '2021',         pages: '3 págs.',  status: 'disponivel', letter: 'D' },
  { id: 12, name: 'Impugnação ao Plano de Partilha — LUCIANA',            type: 'peticao',   typeLabel: 'Petição',    date: '2023',         pages: '8 págs.',  status: 'disponivel', letter: 'P' },
  { id: 13, name: 'Formal de Partilha (minuta)',                           type: 'escritura', typeLabel: 'Escritura',  date: '—',            pages: '—',        status: 'pendente',   letter: 'E' },
  { id: 14, name: 'Decisão sobre Validade do Testamento',                  type: 'decisao',   typeLabel: 'Decisão',    date: '2023',         pages: '11 págs.', status: 'disponivel', letter: 'D' },
  { id: 15, name: 'Certidão de Matrícula do Imóvel Principal',             type: 'certidao',  typeLabel: 'Certidão',   date: '2021',         pages: '6 págs.',  status: 'disponivel', letter: 'C' },
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

const imgLogo = 'https://www.figma.com/api/mcp/asset/09ddb02b-7248-4d58-81db-bd1b11274752'

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
          <img src={imgLogo} alt="NERY Advogados" className={styles.topbarLogo} />
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
                <span className={`${styles.docActionCell} ${doc.status === 'pendente' ? styles.docActionDisabled : ''}`}>
                  {doc.status === 'pendente' ? '—' : 'Abrir →'}
                </span>
              </div>
            ))}
          </div>

          <p className={styles.docsCount}>{visibleDocs.length} de {DOCS.length} documentos</p>
        </main>
      )}

      <footer className={styles.footer}>
        <img src={imgLogo} alt="NERY Advogados" className={styles.footerLogo} />
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
