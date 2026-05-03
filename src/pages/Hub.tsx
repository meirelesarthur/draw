import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAutenticado, sair } from '../auth/auth'
import SpotlightCard from '../components/SpotlightCard'
import styles from './Hub.module.css'

function getSaudacao(): string {
  const h = new Date().getHours()
  if (h < 12) return 'bom dia'
  if (h < 18) return 'boa tarde'
  return 'boa noite'
}

export default function Hub() {
  const navigate = useNavigate()
  const [saudacao] = useState(getSaudacao)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!isAutenticado()) navigate('/login', { replace: true })
  }, [navigate])

  function handleSair() {
    sair()
    navigate('/login', { replace: true })
  }

  function goTo(path: string) {
    setLeaving(true)
    setTimeout(() => navigate(path), 380)
  }

  return (
    <div className={`${styles.root} ${leaving ? styles.rootLeaving : ''}`}>
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <span className={styles.navMark}>DTL</span>
          <span className={styles.navName}>Draw the Law</span>
        </div>
        <button className={styles.navSair} onClick={handleSair}>
          Sair
        </button>
      </nav>

      <main className={styles.main}>
        <div className={styles.greeting}>
          <p className={styles.greetingLabel}>Olá, {saudacao}.</p>
          <h1 className={styles.greetingTitle}>
            Qual memorial<br />deseja acessar?
          </h1>
        </div>

        <div className={styles.cards}>
          <SpotlightCard
            className={`${styles.card} ${styles.cardPersonalizado}`}
            spotlightColor="rgba(200, 92, 14, 0.10)"
            style={{ cursor: 'pointer' }}
          >
          <button
            className={styles.cardInner}
            onClick={() => goTo('/memorial-personalizado')}
          >
            <div className={styles.cardIcon}>
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect x="6" y="4" width="18" height="22" rx="2" fill="rgba(200,92,14,0.15)" stroke="#c85c0e" strokeWidth="1.5"/>
                <rect x="12" y="4" width="18" height="22" rx="2" fill="rgba(200,92,14,0.1)" stroke="#c85c0e" strokeWidth="1.5"/>
                <line x1="16" y1="12" x2="26" y2="12" stroke="#c85c0e" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="16" y1="16" x2="26" y2="16" stroke="#c85c0e" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="16" y1="20" x2="22" y2="20" stroke="#c85c0e" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="28" cy="28" r="7" fill="#c85c0e"/>
                <path d="M25 28l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.cardContent}>
              <span className={`${styles.cardEyebrow} shiny-text`}>Caso MARIALDO</span>
              <h2 className={styles.cardTitle}>Memorial Personalizado</h2>
              <p className={styles.cardDesc}>
                Narrativa jurídica completa com linha do tempo cronológica, ações em curso e documentos vinculados.
              </p>
            </div>
            <div className={styles.cardArrow}>→</div>
          </button>
          </SpotlightCard>

          <SpotlightCard
            className={`${styles.card} ${styles.cardPadrao}`}
            spotlightColor="rgba(114, 74, 255, 0.09)"
            style={{ cursor: 'pointer' }}
          >
          <button
            className={styles.cardInner}
            onClick={() => goTo('/memorial-padrao')}
          >
            <div className={styles.cardIcon}>
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect x="5" y="8" width="28" height="4" rx="2" fill="rgba(114,74,255,0.15)" stroke="#724AFF" strokeWidth="1.5"/>
                <rect x="5" y="17" width="28" height="13" rx="2" fill="rgba(114,74,255,0.08)" stroke="#724AFF" strokeWidth="1.5"/>
                <circle cx="10" cy="23.5" r="2" fill="#724AFF"/>
                <circle cx="19" cy="23.5" r="2" fill="#BD48D0"/>
                <circle cx="28" cy="23.5" r="2" fill="#28ADEF"/>
                <line x1="12" y1="23.5" x2="17" y2="23.5" stroke="#724AFF" strokeWidth="1" strokeDasharray="1.5 1.5"/>
                <line x1="21" y1="23.5" x2="26" y2="23.5" stroke="#BD48D0" strokeWidth="1" strokeDasharray="1.5 1.5"/>
              </svg>
            </div>
            <div className={styles.cardContent}>
              <span className={`${styles.cardEyebrow} ${styles.cardEyebrowPadrao} shiny-text`} style={{ color: '#724AFF' }}>Modelo Digital</span>
              <h2 className={styles.cardTitle}>Memorial Padrão</h2>
              <p className={styles.cardDesc}>
                Memorial estruturado com timeline interativa, fatos do caso, filtros e provas vinculadas por documento.
              </p>
            </div>
            <div className={`${styles.cardArrow} ${styles.cardArrowPadrao}`}>→</div>
          </button>
          </SpotlightCard>
        </div>

        <p className={styles.footer}>NERY Advogados · Plataforma restrita · Uso interno</p>
      </main>
    </div>
  )
}
