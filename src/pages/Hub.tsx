import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Presentation, PenTool } from 'lucide-react'
import { isAutenticado } from '../auth/auth'
import styles from './Hub.module.css'

export default function Hub() {
  const navigate = useNavigate()
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!isAutenticado()) navigate('/login', { replace: true })
  }, [navigate])

  function goTo(path: string) {
    setLeaving(true)
    setTimeout(() => navigate(path), 380)
  }

  return (
    <div className={`${styles.root} ${leaving ? styles.rootLeaving : ''}`}>
      <button
        className={`${styles.option} ${styles.optionPersonalizado}`}
        onClick={() => goTo('/memorial-personalizado')}
      >
        <div className={styles.optionInner}>
          <div className={styles.optionIcon}>
            <PenTool size={48} strokeWidth={1.25} />
          </div>
          <span className={styles.optionLabel}>Caso JOSÉ</span>
          <h2 className={styles.optionTitle}>Memorial Personalizado</h2>
        </div>
      </button>

      <button
        className={`${styles.option} ${styles.optionPadrao}`}
        onClick={() => goTo('/memorial-padrao')}
      >
        <div className={styles.optionInner}>
          <div className={styles.optionIcon}>
            <Presentation size={48} strokeWidth={1.25} />
          </div>
          <span className={styles.optionLabel}>Modelo Digital</span>
          <h2 className={styles.optionTitle}>Memorial Padrão</h2>
        </div>
      </button>
    </div>
  )
}
