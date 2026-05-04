import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { sair } from '../auth/auth'
import { tlData, factData } from '../data/memorialPadraoData'
import TimelineVertical from '../components/TimelineVertical'
import CountUp from '../components/CountUp'
import { ParticleCard, GlobalSpotlight } from '../components/MagicBento'
import styles from './MemorialPadrao.module.css'

type Filter = 'todos' | 'controvertido' | 'incontroverso' | 'pendente'
type Section = 'resumo' | 'timeline' | 'fatos' | 'provas' | 'criticos' | 'anexos'

const NAV = [
  { id: 'resumo'   as Section, label: 'Resumo Executivo',   icon: IconResumo   },
  { id: 'timeline' as Section, label: 'Linha do Tempo',      icon: IconTimeline },
  { id: 'fatos'    as Section, label: 'Fatos do Caso',       icon: IconFatos    },
  { id: 'provas'   as Section, label: 'Provas e Documentos', icon: IconProvas   },
  { id: 'criticos' as Section, label: 'Pontos Críticos',     icon: IconCriticos },
  { id: 'anexos'   as Section, label: 'Anexos',              icon: IconAnexos   },
]

export default function MemorialPadrao() {
  const navigate = useNavigate()
  const mainRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState<Section>('resumo')
  const [filter, setFilter] = useState<Filter>('todos')
  const [openFact, setOpenFact] = useState<number | null>(null)

  function handleSair() { sair(); navigate('/login', { replace: true }) }

  function goTo(id: Section) {
    setActiveSection(id)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const visibleFacts  = factData.filter(f => filter === 'todos' || f.statusKey === filter)
  const controversos  = factData.filter(f => f.statusKey === 'controvertido' || f.statusKey === 'pendente')
  const nControvertido = factData.filter(f => f.statusKey === 'controvertido').length
  const nIncontro      = factData.filter(f => f.statusKey === 'incontroverso').length
  const nPend          = factData.filter(f => f.statusKey === 'pendente').length

  const allDocs = [
    ...tlData.flatMap(e => e.docs.map(d => ({ ...d, source: e.title }))),
    ...factData.flatMap(f => f.docs.map(d => ({ ...d, source: f.title }))),
  ].filter((d, i, arr) => arr.findIndex(x => x.name === d.name) === i)

  return (
    <div className={styles.layout}>

      {/* ── SIDEBAR ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.sidebarBrand}>
            <div className={styles.brandLogo}>
              <span className={styles.brandNery}>DTL</span>
              <span className={styles.brandAdv}>DRAW THE LAW</span>
            </div>
          </div>

          <div className={styles.binder}>
            <span className={styles.binderLabel}>BINDER DO CASO</span>
            <p className={styles.binderTitle}>Grupo Meridian vs. Banco Atlântico S.A.</p>
            <p className={styles.binderProcess}>Proc. nº 0082341-14.2022.8.26.0100</p>
          </div>

          <div className={styles.sidebarDivider} />

          <nav className={styles.nav}>
            {NAV.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`${styles.navItem} ${activeSection === id ? styles.navItemActive : ''}`}
                onClick={() => goTo(id)}
              >
                <span className={styles.navIcon}><Icon /></span>
                <span className={styles.navLabel}>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarMeta}>
            <span className={styles.metaLine}>3ª Vara Cível · São Paulo</span>
            <span className={styles.metaLine}>Instrução probatória</span>
          </div>
          <div className={styles.sidebarActions}>
            <button className={styles.btnHub} onClick={() => navigate('/')}>← Hub</button>
            <button className={styles.btnSair} onClick={handleSair}>Sair</button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main ref={mainRef} className={`${styles.main} mb-bento-section`}>
        <GlobalSpotlight gridRef={mainRef} />

        {/* PAGE HEADER */}
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderInner}>
            <div>
              <p className={styles.pageEyebrow}>MEMORIAL DIGITAL</p>
              <h1 className={styles.pageTitle}>
                Grupo Meridian <span className={styles.versus}>×</span> Banco Atlântico
              </h1>
              <p className={styles.pageSub}>
                Ação de Responsabilidade Civil c/c Indenização &nbsp;·&nbsp; 3ª Vara Cível de São Paulo
              </p>
            </div>
            <div className={styles.headerBadges}>
              <span className={styles.badgePhase}>Instrução probatória</span>
              <span className={styles.badgeStatus}>Contencioso</span>
            </div>
          </div>
        </div>

        {/* META STRIP */}
        <div className={styles.metaStrip}>
          {[
            { label: 'Processo',          value: '0082341-14.2022.8.26.0100' },
            { label: 'Ajuizado em',       value: '08 set. 2022' },
            { label: 'Valor da causa',    value: 'R$ 12,4 milhões' },
            { label: 'Fase',              value: 'Instrução probatória' },
            { label: 'Próx. audiência',   value: '18 jun. 2025', highlight: true },
            { label: 'Fatos controvertidos', value: '6 de 11' },
          ].map(m => (
            <div key={m.label} className={styles.metaItem}>
              <span className={styles.metaLabel}>{m.label}</span>
              <span className={`${styles.metaValue} ${m.highlight ? styles.metaHighlight : ''}`}>{m.value}</span>
            </div>
          ))}
        </div>

        {/* ── PAGES ── */}
        <div className={styles.content}>
          <div key={activeSection} className={styles.page}>

            {/* ─── RESUMO EXECUTIVO ─── */}
            {activeSection === 'resumo' && (
              <>
                <SectionHeader label="Resumo Executivo" count="Visão geral completa" />

                {/* Exec cards */}
                <div className={styles.resumoGrid}>
                  <div className={`${styles.resumoCard} ${styles.resumoCardTese}`}>
                    <span className={styles.resumoCardEyebrow}>TESE CENTRAL</span>
                    <p className={styles.resumoCardText}>
                      O Banco Atlântico violou a cláusula de boa-fé contratual ao bloquear
                      unilateralmente a conta operacional da Meridian, declarar vencimento
                      antecipado indevido e inscrever a empresa no SERASA durante litígio ativo,
                      causando prejuízos materiais e morais estimados em R$ 12,4 milhões.
                    </p>
                  </div>
                  {[
                    { label: 'Partes',               value: 'Grupo Meridian Participações S.A. vs. Banco Atlântico S.A.' },
                    { label: 'Relação contratual',   value: 'Contrato de crédito rotativo R$ 8M · CDI +3,2% a.a. · Celebrado em março de 2019' },
                    { label: 'Evento desencadeador', value: 'Bloqueio unilateral da conta em 14/06/2021 sem notificação prévia de 10 dias exigida pela cl. 6.1' },
                    { label: 'Dano central',         value: 'Cancelamento de 3 contratos comerciais + inscrição indevida no SERASA por 7 meses' },
                    { label: 'Fundamento legal',     value: 'CC art. 422 (boa-fé), art. 476 (exceptio), art. 403 (nexo causal), Súmulas STJ 227 e 385' },
                  ].map(r => (
                    <ParticleCard key={r.label} className={`${styles.resumoCard} magic-bento-card`}>
                      <span className={styles.resumoCardLabel}>{r.label}</span>
                      <p className={styles.resumoCardValue}>{r.value}</p>
                    </ParticleCard>
                  ))}
                </div>

                {/* Two-column: mini timeline + fatos overview */}
                <div className={styles.resumoTwoCol}>

                  {/* Mini Timeline */}
                  <div className={styles.resumoCol}>
                    <SubHeader label="Linha do Tempo" action="Ver tudo" onAction={() => goTo('timeline')} />
                    <div className={styles.miniTl}>
                      {tlData.map((ev, i) => (
                        <div key={i} className={styles.miniTlItem}>
                          <span className={styles.miniTlDate}>{ev.date}</span>
                          <span className={`${styles.miniTlDot}
                            ${ev.type === 'key'   ? styles.miniTlDotKey   : ''}
                            ${ev.type === 'alert' ? styles.miniTlDotAlert : ''}`}
                          />
                          <span className={styles.miniTlTitle}>{ev.title}</span>
                          {ev.type !== 'normal' && (
                            <span className={`${styles.miniTlTag}
                              ${ev.type === 'key'   ? styles.tagKey   : ''}
                              ${ev.type === 'alert' ? styles.tagAlert : ''}`}
                            >
                              {ev.type === 'key' ? 'Marco' : 'Crítico'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fatos overview */}
                  <div className={styles.resumoCol}>
                    <SubHeader label="Fatos do Caso" action="Ver tudo" onAction={() => goTo('fatos')} />

                    {/* Stats */}
                    <div className={styles.fatosStats}>
                      <div className={styles.fatosStat}>
                        <CountUp to={nControvertido} duration={1.2} delay={0.1} className={`${styles.fatosStatNum} ${styles.numContro}`} />
                        <span className={styles.fatosStatLabel}>Controvertidos</span>
                      </div>
                      <div className={styles.fatosStat}>
                        <CountUp to={nIncontro} duration={1.2} delay={0.25} className={`${styles.fatosStatNum} ${styles.numIncontro}`} />
                        <span className={styles.fatosStatLabel}>Incontroversos</span>
                      </div>
                      <div className={styles.fatosStat}>
                        <CountUp to={nPend} duration={1.2} delay={0.4} className={`${styles.fatosStatNum} ${styles.numPend}`} />
                        <span className={styles.fatosStatLabel}>A provar</span>
                      </div>
                    </div>

                    {/* Compact fatos list */}
                    <div className={styles.fatosCompact}>
                      {factData.map((fact, i) => (
                        <button
                          key={i}
                          className={styles.fatosCompactItem}
                          onClick={() => { setOpenFact(i) }}
                        >
                          <span className={`${styles.fatosCompactStatus}
                            ${fact.statusKey === 'controvertido' ? styles.stContro : ''}
                            ${fact.statusKey === 'incontroverso' ? styles.stIncontro : ''}
                            ${fact.statusKey === 'pendente'      ? styles.stPend : ''}`}
                          >
                            {fact.status}
                          </span>
                          <span className={styles.fatosCompactTitle}>{fact.title}</span>
                          <span className={styles.fatosCompactArrow}>›</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pontos críticos */}
                <div className={styles.resumoSection}>
                  <SubHeader label="Pontos Críticos" action="Ver tudo" onAction={() => goTo('criticos')} />
                  <div className={styles.criticosGrid}>
                    {controversos.map((fact, i) => (
                      <ParticleCard key={i} className={`${styles.criticoCard} ${fact.statusKey === 'pendente' ? styles.criticoPend : ''} magic-bento-card`}>
                        <span className={styles.criticoNum}>{String(factData.indexOf(fact) + 1).padStart(2, '0')}</span>
                        <div className={styles.criticoHeader}>
                          <span className={`${styles.criticoStatus} ${fact.statusKey === 'pendente' ? styles.criticoStatusPend : ''}`}>
                            {fact.status}
                          </span>
                        </div>
                        <p className={styles.criticoTitle}>{fact.title}</p>
                        <p className={styles.criticoTese}>{fact.tese}</p>
                        <div className={styles.criticoDocs}>
                          {fact.docs.map((d, di) => (
                            <span key={di} className={styles.criticoDoc}>
                              <span className={`${styles.criticoDocIcon} ${styles[d.icon as keyof typeof styles]}`}>{d.l}</span>
                              {d.name}
                            </span>
                          ))}
                        </div>
                      </ParticleCard>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ─── LINHA DO TEMPO ─── */}
            {activeSection === 'timeline' && (
              <>
                <SectionHeader label="Linha do Tempo" count={`${tlData.length} eventos`} />
                <TimelineVertical items={tlData} />
              </>
            )}

            {/* ─── FATOS DO CASO ─── */}
            {activeSection === 'fatos' && (
              <>
                <SectionHeader label="Fatos do Caso" count={`${factData.length} fatos mapeados`} />
                <div className={styles.filterBar}>
                  {([
                    { key: 'todos',        label: 'Todos' },
                    { key: 'controvertido',label: 'Controvertidos' },
                    { key: 'incontroverso',label: 'Incontroversos' },
                    { key: 'pendente',     label: 'A provar' },
                  ] as { key: Filter; label: string }[]).map(f => (
                    <button
                      key={f.key}
                      className={`${styles.filt} ${filter === f.key ? styles.filtActive : ''}`}
                      onClick={() => setFilter(f.key)}
                    >
                      {f.label}
                      <span className={styles.filtCount}>
                        {f.key === 'todos' ? factData.length
                          : factData.filter(x => x.statusKey === f.key).length}
                      </span>
                    </button>
                  ))}
                </div>
                <div className={styles.factsGrid}>
                  {visibleFacts.map((fact) => {
                    const num   = factData.indexOf(fact) + 1
                    const stKey = fact.statusKey
                    return (
                      <ParticleCard
                        key={fact.title}
                        className={`${styles.factCard}
                            ${stKey === 'controvertido' ? styles.fcContro  : ''}
                            ${stKey === 'incontroverso' ? styles.fcIncontro: ''}
                            ${stKey === 'pendente'      ? styles.fcPend    : ''} magic-bento-card`}
                        onClick={() => setOpenFact(factData.indexOf(fact))}
                      >
                        <span className={styles.factNum}>{String(num).padStart(2, '0')}</span>
                        <div className={`${styles.factStatus}
                            ${stKey === 'controvertido' ? styles.stContro  : ''}
                            ${stKey === 'incontroverso' ? styles.stIncontro: ''}
                            ${stKey === 'pendente'      ? styles.stPend    : ''}`}>
                          {fact.status}
                        </div>
                        <p className={styles.factTitle}>{fact.title}</p>
                        <p className={styles.factDesc}>{fact.desc}</p>
                        <div className={styles.factTags}>
                          {fact.docs.slice(0, 3).map((d, di) => (
                            <span key={di} className={styles.factTag}>{d.l} · {d.name.split(' ').slice(0, 3).join(' ')}</span>
                          ))}
                        </div>
                      </ParticleCard>
                    )
                  })}
                </div>
              </>
            )}

            {/* ─── PROVAS E DOCUMENTOS ─── */}
            {activeSection === 'provas' && (
              <>
                <SectionHeader label="Provas e Documentos" count={`${allDocs.length} documentos`} />
                <div className={styles.docsGrid}>
                  {allDocs.map((doc, i) => (
                    <ParticleCard key={i} className={`${styles.docCard} magic-bento-card`}>
                      <div className={`${styles.docIcon} ${styles[doc.icon as keyof typeof styles]}`}>{doc.l}</div>
                      <div className={styles.docInfo}>
                        <p className={styles.docName}>{doc.name}</p>
                        <p className={styles.docMeta}>{doc.meta}</p>
                        <p className={styles.docSource}>{doc.source}</p>
                      </div>
                      <span
                        className={styles.docAction}
                        style={(doc as any).url === '#' ? { color: '#c0b0a8', cursor: 'default' } : {}}
                      >
                        {(doc as any).url === '#' ? 'Pendente' : 'Abrir →'}
                      </span>
                    </ParticleCard>
                  ))}
                </div>
              </>
            )}

            {/* ─── PONTOS CRÍTICOS ─── */}
            {activeSection === 'criticos' && (
              <>
                <SectionHeader label="Pontos Críticos" count={`${controversos.length} itens`} />
                <div className={styles.criticosGrid}>
                  {controversos.map((fact, i) => (
                    <ParticleCard key={i} className={`${styles.criticoCard} ${fact.statusKey === 'pendente' ? styles.criticoPend : ''} magic-bento-card`}>
                      <span className={styles.criticoNum}>{String(factData.indexOf(fact) + 1).padStart(2, '0')}</span>
                      <div className={styles.criticoHeader}>
                        <span className={`${styles.criticoStatus} ${fact.statusKey === 'pendente' ? styles.criticoStatusPend : ''}`}>
                          {fact.status}
                        </span>
                      </div>
                      <p className={styles.criticoTitle}>{fact.title}</p>
                      <p className={styles.criticoTese}>{fact.tese}</p>
                      <div className={styles.criticoDocs}>
                        {fact.docs.map((d, di) => (
                          <span key={di} className={styles.criticoDoc}>
                            <span className={`${styles.criticoDocIcon} ${styles[d.icon as keyof typeof styles]}`}>{d.l}</span>
                            {d.name}
                          </span>
                        ))}
                      </div>
                    </ParticleCard>
                  ))}
                </div>
              </>
            )}

            {/* ─── ANEXOS ─── */}
            {activeSection === 'anexos' && (
              <>
                <SectionHeader label="Anexos" count="0 arquivos" />
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}><IconAnexos /></div>
                  <p className={styles.emptyTitle}>Nenhum anexo vinculado</p>
                  <p className={styles.emptyDesc}>Documentos adicionais poderão ser anexados conforme o processo avança.</p>
                </div>
              </>
            )}

          </div>
        </div>
      </main>

      {/* ── FACT MODAL ── */}
      {openFact !== null && (
        <div
          className={styles.modalOverlay}
          onClick={e => e.target === e.currentTarget && setOpenFact(null)}
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <p className={styles.modalNum}>Fato {String(openFact + 1).padStart(2, '0')}</p>
              <h3 className={styles.modalTitle}>{factData[openFact].title}</h3>
              <button className={styles.modalClose} onClick={() => setOpenFact(null)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <p className={styles.modalSectionLabel}>Descrição</p>
                <p className={styles.modalText}>{factData[openFact].desc}</p>
              </div>
              <div className={styles.modalSection}>
                <p className={styles.modalSectionLabel}>Tese Jurídica</p>
                <p className={`${styles.modalText} ${styles.modalTese}`}>{factData[openFact].tese}</p>
              </div>
              <div className={styles.modalSection}>
                <p className={styles.modalSectionLabel}>Provas Vinculadas</p>
                {factData[openFact].docs.map((doc, i) => (
                  <div key={i} className={styles.modalDoc}>
                    <div className={`${styles.modalDocIcon} ${styles[doc.icon as keyof typeof styles]}`}>{doc.l}</div>
                    <div>
                      <p className={styles.modalDocName}>{doc.name}</p>
                      <p className={styles.modalDocMeta}>{doc.meta}</p>
                    </div>
                    <span className={styles.modalDocBtn}>{doc.url ? 'Abrir →' : 'Pendente'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── SHARED COMPONENTS ── */

function SectionHeader({ label, count }: { label: string; count: string }) {
  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{label}</h2>
      <span className={styles.sectionCount}>{count}</span>
    </div>
  )
}

function SubHeader({ label, action, onAction }: { label: string; action: string; onAction: () => void }) {
  return (
    <div className={styles.subHeader}>
      <span className={styles.subHeaderLabel}>{label}</span>
      <button className={styles.subHeaderAction} onClick={onAction}>{action} →</button>
    </div>
  )
}

/* ── ICONS ── */
function IconResumo() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M3 5h14M3 10h10M3 15h7"/>
  </svg>
}
function IconTimeline() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="10" cy="10" r="2.5"/>
    <path d="M3 10h4.5M13.5 10H17"/>
    <circle cx="3" cy="10" r="1" fill="currentColor" stroke="none"/>
    <circle cx="17" cy="10" r="1" fill="currentColor" stroke="none"/>
  </svg>
}
function IconFatos() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <rect x="3" y="4" width="14" height="13" rx="2"/>
    <path d="M7 8.5h6M7 11.5h4"/>
  </svg>
}
function IconProvas() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h8l4 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"/>
    <path d="M12 4v4h4M7 10h6M7 13h4"/>
  </svg>
}
function IconCriticos() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 3L2 17h16L10 3z"/>
    <path d="M10 9v4"/><circle cx="10" cy="14.5" r=".5" fill="currentColor" stroke="none"/>
  </svg>
}
function IconAnexos() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.5 12l-5.5 5.5a4 4 0 01-5.657-5.657L11 5.5a2.5 2.5 0 013.536 3.536L8 15.5a1 1 0 01-1.414-1.414L12.5 8"/>
  </svg>
}
