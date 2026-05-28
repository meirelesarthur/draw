import logoNery from '../assets/logo-nery.png'
import styles from './MobileWarning.module.css'

export default function MobileWarning() {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <img src={logoNery} alt="NERY Advogados" className={styles.logo} />
        <div className={styles.icon}>⚖️</div>
        <h1 className={styles.title}>Memorial Jurídico</h1>
        <p className={styles.message}>
          Esta aplicação foi desenvolvida exclusivamente para <strong>desktop</strong>.
          <br />
          Por favor, acesse em uma tela com resolução mínima de <strong>1024px</strong>.
        </p>
      </div>
    </div>
  )
}
