import styles from './Timeline.module.css'
import EventCard from './EventCard'

const imgPulse = 'https://www.figma.com/api/mcp/asset/ec82c8bb-31a3-4dd3-a719-c80976f6409f'

// ── DOCUMENT LINKS (arquivos locais) ─────────────────────────────────────────
const pdfUrl = (filename: string) =>
  new URL(`../assets/docs/${filename}`, import.meta.url).href

const D = {
  certidaoCasamento: {
    label: 'Certidão Casamento e Divórcio Odette',
    url: pdfUrl('Certidão Casamento e Divorcio Odette.pdf'),
  },
  sentencaInterdicao: {
    label: 'Sentença Interdição',
    url: pdfUrl('Sentença interdição.pdf'),
  },
  sentencaCuratela: {
    label: 'Sentença Curatela',
    url: pdfUrl('sentença curatela (1).pdf'),
  },
  acordaoInterdicao: {
    label: 'Acórdão — Sentença Interdição',
    url: pdfUrl('Acordao Sentença interdição.pdf'),
  },
  testamentoOdette: {
    label: 'Testamento e Revogação 9.10.2017',
    url: pdfUrl('Testamento e Revogacao Testamento 9.10.2017 Odette.pdf'),
  },
  testamentoRaquel: {
    label: 'Testamento 8.12.2017 — RAQUEL',
    url: pdfUrl('Testamento 8.12.2017 - RAQUEL.pdf'),
  },
  partilhaOdette: {
    label: 'Partilha Odette',
    url: pdfUrl('Partilha Odette.pdf'),
  },
  escrituraUniao: {
    label: 'Escritura União Estável — Raquel',
    url: pdfUrl('Escritura Uniao Estavel Raquel.pdf'),
  },
  sobrepartilhaOdette: {
    label: 'Sobrepartilha Odette',
    url: pdfUrl('Sobrepartilha Odette.pdf'),
  },
  certidaoObito: {
    label: 'Certidão de Óbito — Marialdo',
    url: pdfUrl('Certidão Óbito Marialdo.pdf'),
  },
  laudoMedico: {
    label: 'Laudo Médico — Dr. Guido Arturo Palomba',
    url: pdfUrl('Laudo Médico Dr. Guido Arturo Palomba_organized.pdf'),
  },
  sentencaLevantamento: {
    label: 'Sentença Levantamento de Interdição',
    url: pdfUrl('Sentença levantamento interdição.pdf'),
  },
  diretrizesVontade: {
    label: 'Diretrizes de Vontade',
    url: pdfUrl('Diretrizes de vontade.pdf'),
  },
  escritura2019: {
    label: 'Escritura Pública 24.7.2019',
    url: pdfUrl('Escritura 24.7.2019.pdf'),
  },
}

interface RowData {
  year: string
  subLabel?: string
  dark?: boolean
  odette?: React.ReactNode
  raquel?: React.ReactNode
}

const rows: RowData[] = [
  {
    year: '1962 – 1964',
    odette: (
      <div className={styles.cardRow}>
        <EventCard family="odette" docs={[D.certidaoCasamento]}>
          <p><strong>9/6/62:</strong> MARIALDO casou com ODETTE <em>(comunhão universal de bens)</em></p>
        </EventCard>
        <EventCard family="odette">
          <p>Nasceram 3 filhos do casal: <strong>ARNALDO, MARIA CLÁUDIA E LUCIANA</strong></p>
        </EventCard>
        <EventCard family="odette">
          <p><strong>10/1/64:</strong> MARIA CLÁUDIA faleceu (aos 4 dias de vida)</p>
        </EventCard>
      </div>
    ),
  },
  {
    year: '1994 – 1996',
    raquel: (
      <div className={styles.cardRow}>
        <EventCard family="raquel">
          <p>MARIALDO iniciou relacionamento com RAQUEL</p>
        </EventCard>
        <EventCard family="raquel">
          <p>Nasceu 1 filha do casal: <strong>Mariana</strong> <em>(fato que era de conhecimento de todos os membros da família)</em></p>
        </EventCard>
      </div>
    ),
  },
  {
    year: '2013 – 2014',
    odette: (
      <div className={styles.cardRow}>
        <EventCard family="odette">
          <p><strong>3/8/13:</strong> Filho ARNALDO faleceu em um trágico acidente aéreo <em>(juntamente com sua esposa e dois filhos)</em></p>
        </EventCard>
        <EventCard family="odette">
          <p>Relação de MARIALDO e ODETTE ficou fragilizada</p>
        </EventCard>
        <EventCard family="odette">
          <p>MARIALDO viveu desavenças com filha LUCIANA</p>
        </EventCard>
      </div>
    ),
  },
  {
    year: '2015',
    odette: (
      <div className={styles.cardStack}>
        <div className={styles.cardRow}>
          <EventCard family="odette" highlight docs={[D.acordaoInterdicao, D.laudoMedico, D.diretrizesVontade]}>
            <p>
              MARIALDO <strong>não concordou com o pedido de curatela</strong> e se opôs
              à interdição, mas indicou que, caso deferida,{' '}
              <strong>sua filha Mariana deveria ser a curadora</strong>
            </p>
          </EventCard>
          <EventCard family="odette" docs={[D.sentencaInterdicao, D.sentencaCuratela]}>
            <p>ODETTE ajuizou Ação de Curatela para interdição de MARIALDO</p>
            <hr />
            <p>MARIALDO ajuizou Ação de Divórcio</p>
          </EventCard>
        </div>
        <div className={styles.cardRow}>
          <EventCard family="odette" highlight docs={[D.acordaoInterdicao, D.sentencaLevantamento]}>
            <p>
              Diante da melhora significativa de seu estado de saúde,{' '}
              <strong>o juízo</strong> da interdição <strong>reconheceu</strong> que a
              doença degenerativa{' '}
              <em>
                "(...) não lhe retirou, de forma total, a capacidade de
                discernimento, sobretudo em razão de tratamento a que foi submetido
                após episódio que gerou sua internação, no ano de 2015 (...)"
              </em>
            </p>
          </EventCard>
          <EventCard family="odette" docs={[D.sentencaCuratela, D.sentencaInterdicao]}>
            <p>LUCIANA foi nomeada como curadora definitiva de MARIALDO na Ação de Curatela</p>
            <hr />
            <p>
              O juízo da interdição reconheceu a capacidade de discernimento de
              MARIALDO e determinou que LUCIANA ouvisse o pai quanto aos negócios da
              empresa
            </p>
            <hr />
            <p>Divórcio litigioso foi decretado</p>
          </EventCard>
        </div>
      </div>
    ),
    raquel: (
      <EventCard family="raquel">
        <p>
          <strong>Jun/15:</strong> MARIALDO passou a residir definitivamente com
          RAQUEL e MARIANA em Joinville-SC
        </p>
      </EventCard>
    ),
  },
  {
    year: '2017',
    odette: (
      <EventCard family="odette" docs={[D.testamentoOdette]}>
        <p><strong>Out/17:</strong> MARIALDO revogou o testamento em favor de ODETTE</p>
      </EventCard>
    ),
    raquel: (
      <EventCard family="raquel" docs={[D.testamentoRaquel]}>
        <p>
          <strong>Dez/2017:</strong> MARIALDO beneficiou sua companheira RAQUEL,
          com a parte disponível dos bens e a nomeou como inventariante e
          testamenteira
        </p>
      </EventCard>
    ),
  },
  {
    year: '2019',
    odette: (
      <EventCard family="odette" docs={[D.escritura2019]}>
        <p>Lavrada escritura pública em 24/07/2019</p>
      </EventCard>
    ),
  },
  {
    year: '2020',
    odette: (
      <div className={styles.cardWithIcon}>
        <EventCard family="odette" docs={[D.partilhaOdette]}>
          <p>Realizada a partilha</p>
        </EventCard>
        <img src={imgPulse} alt="" className={styles.pulse} />
      </div>
    ),
  },
  {
    year: '2021',
    raquel: (
      <EventCard family="raquel" docs={[D.escrituraUniao]}>
        <p>
          MARIALDO oficializou sua união com RAQUEL por meio de uma escritura
          pública de união estável <em>(separação obrigatória de bens)</em>
        </p>
      </EventCard>
    ),
  },
  {
    year: '2022',
    odette: (
      <EventCard family="odette" docs={[D.sobrepartilhaOdette]}>
        <p>Realizada a sobrepartilha</p>
      </EventCard>
    ),
  },
  {
    year: '2024',
    subLabel: 'Falecimento',
    dark: true,
    raquel: (
      <EventCard family="raquel" docs={[D.certidaoObito]}>
        <p>MARIALDO faleceu em Joinville-SC ao lado de sua companheira RAQUEL</p>
      </EventCard>
    ),
  },
]

export default function Timeline() {
  return (
    <section className={styles.section}>
      <div className={styles.columnLabels}>
        <div className={styles.labelOdette}>
          Família construída com <strong>ODETTE</strong>
        </div>
        <div className={styles.labelCenter} />
        <div className={styles.labelRaquel}>
          Família construída com <strong>RAQUEL</strong>
        </div>
      </div>

      <div className={styles.timelineWrap}>
        <div className={styles.verticalLine} />

        {rows.map((row) => (
          <div key={row.year} className={styles.row}>
            {/* LEFT – ODETTE */}
            <div className={styles.leftCell}>{row.odette ?? null}</div>

            {/* connector left */}
            <div className={styles.connLeft}>
              {row.odette && <span className={styles.connLine} />}
            </div>

            {/* YEAR PILL */}
            <div className={styles.yearCell}>
              <div
                className={[
                  styles.pill,
                  row.dark ? styles.pillDark : styles.pillBrown,
                ].join(' ')}
              >
                <span>{row.year}</span>
                {row.subLabel && (
                  <span className={styles.pillSub}>{row.subLabel}</span>
                )}
              </div>
            </div>

            {/* connector right */}
            <div className={styles.connRight}>
              {row.raquel && <span className={styles.connLine} />}
            </div>

            {/* RIGHT – RAQUEL */}
            <div className={styles.rightCell}>{row.raquel ?? null}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
