import { ScrollText, BookOpenText, ReceiptX } from 'lucide-react'
import styles from './LegalActions.module.css'

const URL_INVENTARIO    = 'https://drive.google.com/open?id=1tol-Bq1z8vsA9i81D8jan9HkERmwPRZi'
const URL_REGISTRO_TEST = 'https://drive.google.com/open?id=1tol-Bq1z8vsA9i81D8jan9HkERmwPRZi'
const URL_NULIDADE_TEST = 'https://drive.google.com/open?id=1Qgv3U59lnf7r4Af6SS4jCm0PA5B2y5Sr'

function DocPill({ label, url }: { label: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.docPill}>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 1h5l3 3v7H2V1z"/><path d="M7 1v3h3"/>
      </svg>
      {label}
    </a>
  )
}

export default function LegalActions() {
  return (
    <section className={styles.section}>
      <div className={styles.sideLabel}>
        <span>Ações Judiciais - 2024</span>
      </div>

      <div className={styles.actionsGrid}>
        {/* (i) Inventário */}
        <div className={[styles.actionColumn, styles.gray].join(' ')}>
          <div className={styles.actionHeader}>
            <ScrollText size={40} style={{ flexShrink: 0 }} />
            <h3 className={styles.actionTitle}>(i) Inventário</h3>
          </div>

          <div className={styles.block}>
            <p className={styles.blockText}>
              <strong>Contexto:</strong> LUCIANA requereu a{' '}
              <strong>abertura do inventário e sua nomeação como inventariante</strong>, desconsiderando a Escritura Pública de Testamento lavrada por JOSÉ em 8/12/2017.
            </p>
          </div>

          <div className={styles.divider} />

          <div className={styles.block}>
            <p className={styles.blockText}>
              <strong>Situação Processual:</strong>
            </p>
            <ul className={styles.list}>
              <li>Em 4/7/2024, LUCIANA foi formalmente nomeada inventariante do Espólio.</li>
              <li>
                Em 3/10/2024, RAQUEL e MARIA opuseram <strong>Embargos de Declaração</strong>, ainda pendentes de julgamento.
              </li>
            </ul>
          </div>

          <div className={styles.divider} />

          <div className={styles.requerimentos}>
            <p className={styles.requerimentosTitle}>Requerimentos de RAQUEL E MARIA:</p>
            <ol className={styles.list}>
              <li>
                <strong>Substituição imediata da inventariança</strong>, com a <strong>nomeação de RAQUEL como inventariante;</strong>
              </li>
              <li>Apresentação de <strong>prestação de contas mensal;</strong></li>
              <li><strong>Fixação de verba alimentar</strong> em favor da viúva RAQUEL.</li>
            </ol>
          </div>
          <div className={styles.docRow}>
            <DocPill label="Inventário — Cópia Integral 27.4.2026" url={URL_INVENTARIO} />
          </div>
        </div>

        {/* (ii) Ação de Abertura */}
        <div className={[styles.actionColumn, styles.peach].join(' ')}>
          <div className={styles.actionHeader}>
            <BookOpenText size={40} style={{ flexShrink: 0 }} />
            <h3 className={styles.actionTitle}>
              (ii) Ação de Abertura, Registro e Cumprimento de Testamento
            </h3>
          </div>

          <div className={styles.block}>
            <p className={styles.blockText}>
              <strong>Contexto:</strong> RAQUEL e MARIA ingressaram com ação para{' '}
              <strong>registrar o testamento público realizado por JOSÉ</strong>.
            </p>
          </div>

          <div className={styles.divider} />

          <div className={styles.block}>
            <p className={styles.blockText}>
              <strong>Situação Processual:</strong>
            </p>
            <ul className={styles.list}>
              <li>
                Em 17/12/2024, LUCIANA apresentou <strong>Impugnação ao Cumprimento do Testamento</strong>.
              </li>
            </ul>
          </div>

          <div className={styles.divider} />

          <div className={styles.requerimentos}>
            <p className={styles.requerimentosTitle}>Pedidos de RAQUEL E MARIA:</p>
            <ol className={styles.list}>
              <li>
                <strong>Registro</strong>, arquivamento e <strong>cumprimento do testamento público</strong> lavrado por JOSÉ;
              </li>
              <li>Nomeação de <strong>RAQUEL como testamenteira</strong>.</li>
            </ol>
          </div>
          <div className={styles.docRow}>
            <DocPill label="Registro Testamento Raquel — Inicial" url={URL_REGISTRO_TEST} />
          </div>
        </div>

        {/* (iii) Ação Declaratória */}
        <div className={[styles.actionColumn, styles.gray].join(' ')}>
          <div className={styles.actionHeader}>
            <ReceiptX size={40} style={{ flexShrink: 0 }} />
            <h3 className={styles.actionTitle}>
              (iii) Ação Declaratória de Nulidade de Testamento
            </h3>
          </div>

          <div className={styles.block}>
            <p className={styles.blockText}>
              <strong>Contexto:</strong> MARIA e LUCIANA ajuizaram ação para{' '}
              <strong>contestar a última manifestação de vontade de JOSÉ</strong>, que deixou seus bens para sua companheira RAQUEL.
            </p>
          </div>

          <div className={styles.divider} />

          <div className={styles.block}>
            <p className={styles.blockText}>
              <strong>Situação Processual:</strong>
            </p>
            <ul className={styles.list}>
              <li>
                Em 10/2/2025, RAQUEL e MARIA <strong>contestaram</strong> a ação.
              </li>
            </ul>
          </div>

          <div className={styles.divider} />

          <div className={styles.requerimentos}>
            <p className={styles.requerimentosTitle}>Requerimentos de RAQUEL E MARIA:</p>
            <p className={styles.subLabel}>Em Preliminar:</p>
            <ol className={styles.list}>
              <li>
                <strong>Suspensão da demanda</strong> até o <strong>encerramento e trânsito em julgado da Ação de Abertura, Registro e Cumprimento de Testamento</strong>;
              </li>
              <li>
                Reconhecimento da <strong>decadência do direito de MARIA e LUCIANA</strong> de postular a anulação (CPC, art. 487, II);
              </li>
              <li>
                Reconhecimento da <strong>ilegitimidade de MARIA</strong> para postular a anulação da Escritura de Testamento lavrada em 8/12/2017 (CPC, art. 485, VI).
              </li>
            </ol>
            <p className={styles.subLabel}>No Mérito:</p>
            <ol className={styles.list}>
              <li>
                Julgamento de <strong>total improcedência da ação</strong> com o indeferimento do pedido de declaração de nulidade da: (a) Escritura de Revogação de Testamento, lavrada em 9/10/2017; (b) Testamento Público, lavrado em 8/12/2017.
              </li>
            </ol>
          </div>
          <div className={styles.docRow}>
            <DocPill label="Nulidade de Testamento — Inicial" url={URL_NULIDADE_TEST} />
          </div>
        </div>
      </div>
    </section>
  )
}
