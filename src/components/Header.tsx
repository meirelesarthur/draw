import styles from './Header.module.css'
import setaLaranja from '../assets/seta-laranja.png'

const pdfUrl = (filename: string) =>
  new URL(`../assets/docs/${filename}`, import.meta.url).href

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>
          Sucessão dos bens<br />deixados por <span>MARIALDO</span>
        </h1>
        <div className={styles.titleDivider} />
        <p className={styles.subtitle}>MEMORIAIS DE RAQUEL E MARIANA</p>
      </div>

      <a
        href={pdfUrl('Testamento 8.12.2017 - RAQUEL.pdf')}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.testamentCard}
      >
        <p className={styles.testamentTitle}>
          <strong>Testamento Público de<br />8/12/2017</strong>{' '}
          (beneficiando sua companheira <strong>RAQUEL</strong>)
        </p>
        <div className={styles.testamentDivider} />
        <p className={styles.testamentSub}>
          com a parte disponível dos bens e a nomeando como
          inventariante e <strong>testamenteira</strong>
        </p>
      </a>

      <div className={styles.principleOuter}>
        <img src={setaLaranja} className={styles.principleArrow} alt="" />
        <div className={styles.principleBody}>
          <p className={styles.principleText}>
            Princípio norteador em todas as ações em trâmite é a preservação da
            última vontade manifestada por <strong>MARIALDO</strong>
          </p>
        </div>
      </div>
    </header>
  )
}
