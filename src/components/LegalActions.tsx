import styles from './LegalActions.module.css'

const imgScroll = 'https://www.figma.com/api/mcp/asset/2be2ac46-d7f4-4209-b5f4-36820740c081'
const imgBookOpenText = 'https://www.figma.com/api/mcp/asset/57306c0f-6c02-431b-8e1e-9205684c389f'
const imgReceiptX = 'https://www.figma.com/api/mcp/asset/184a2815-b1f8-46d0-b76e-1c10f82f77c8'

const URL_INVENTARIO = 'https://www.dropbox.com/scl/fo/xd74363efm8njaaqkdw13/AAWdKAkIYAWnT6Vx5SDoqg/Invent%C3%A1rio%201093482-39.2024.8.26.0100%20copia%20integral%20-%2027.4.2026.pdf?rlkey=9zurinrhm1asw3x0hovf7916d&st=np5w2iaa&dl=0'
const URL_REGISTRO_TEST = 'https://www.dropbox.com/scl/fo/xd74363efm8njaaqkdw13/ANsdZYmuLIkRqOoeSZKMO5Q/Registro%20Testamento%20Raquel%20-%20Inicial.pdf?rlkey=9zurinrhm1asw3x0hovf7916d&st=7pynakh7&dl=0'
const URL_NULIDADE_TEST = 'https://www.dropbox.com/scl/fo/xd74363efm8njaaqkdw13/ALqQflcDEEyCSxxnfhkA18g/Nulidade%20de%20Testamento%20-%20Inicial.pdf?rlkey=9zurinrhm1asw3x0hovf7916d&st=1c13vwpn&dl=0'

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
            <img src={imgScroll} alt="" className={styles.icon} />
            <h3 className={styles.actionTitle}>(i) Inventário</h3>
          </div>

          <div className={styles.block}>
            <p className={styles.blockText}>
              <strong>Contexto:</strong> LUCIANA requereu a{' '}
              <strong>abertura do inventário e sua nomeação como inventariante</strong>, desconsiderando a Escritura Pública de Testamento lavrada por MARIALDO em 8/12/2017.
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
                Em 3/10/2024, RAQUEL e MARIANA opuseram <strong>Embargos de Declaração</strong>, ainda pendentes de julgamento.
              </li>
            </ul>
          </div>

          <div className={styles.divider} />

          <div className={styles.requerimentos}>
            <p className={styles.requerimentosTitle}>Requerimentos de RAQUEL E MARIANA:</p>
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
            <img src={imgBookOpenText} alt="" className={styles.icon} />
            <h3 className={styles.actionTitle}>
              (ii) Ação de Abertura, Registro e Cumprimento de Testamento
            </h3>
          </div>

          <div className={styles.block}>
            <p className={styles.blockText}>
              <strong>Contexto:</strong> RAQUEL e MARIANA ingressaram com ação para{' '}
              <strong>registrar o testamento público realizado por MARIALDO</strong>.
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
            <p className={styles.requerimentosTitle}>Pedidos de RAQUEL E MARIANA:</p>
            <ol className={styles.list}>
              <li>
                <strong>Registro</strong>, arquivamento e <strong>cumprimento do testamento público</strong> lavrado por MARIALDO;
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
            <img src={imgReceiptX} alt="" className={styles.icon} />
            <h3 className={styles.actionTitle}>
              (iii) Ação Declaratória de Nulidade de Testamento
            </h3>
          </div>

          <div className={styles.block}>
            <p className={styles.blockText}>
              <strong>Contexto:</strong> ODETTE e LUCIANA ajuizaram ação para{' '}
              <strong>contestar a última manifestação de vontade de MARIALDO</strong>, que deixou seus bens para sua companheira RAQUEL.
            </p>
          </div>

          <div className={styles.divider} />

          <div className={styles.block}>
            <p className={styles.blockText}>
              <strong>Situação Processual:</strong>
            </p>
            <ul className={styles.list}>
              <li>
                Em 10/2/2025, RAQUEL e MARIANA <strong>contestaram</strong> a ação.
              </li>
            </ul>
          </div>

          <div className={styles.divider} />

          <div className={styles.requerimentos}>
            <p className={styles.requerimentosTitle}>Requerimentos de RAQUEL E MARIANA:</p>
            <p className={styles.subLabel}>Em Preliminar:</p>
            <ol className={styles.list}>
              <li>
                <strong>Suspensão da demanda</strong> até o <strong>encerramento e trânsito em julgado da Ação de Abertura, Registro e Cumprimento de Testamento</strong>;
              </li>
              <li>
                Reconhecimento da <strong>decadência do direito de ODETTE e LUCIANA</strong> de postular a anulação (CPC, art. 487, II);
              </li>
              <li>
                Reconhecimento da <strong>ilegitimidade de ODETTE</strong> para postular a anulação da Escritura de Testamento lavrada em 8/12/2017 (CPC, art. 485, VI).
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
