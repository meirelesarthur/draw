import styles from './MobileWarning.module.css'

const imgLogo = 'https://www.figma.com/api/mcp/asset/09ddb02b-7248-4d58-81db-bd1b11274752'

export default function MobileWarning() {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <img src={imgLogo} alt="NERY Advogados" className={styles.logo} />
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
