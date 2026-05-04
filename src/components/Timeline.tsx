import styles from './Timeline.module.css'
import EventCard from './EventCard'
import setaLaranja from '../assets/seta-laranja.png'

const imgPulse = 'https://www.figma.com/api/mcp/asset/ec82c8bb-31a3-4dd3-a719-c80976f6409f'

// ── DOCUMENT LINKS ────────────────────────────────────────────────────────────
const D = {
  certidaoCasamento: {
    label: 'Certidão Casamento e Divorcio Odette',
    url: 'https://drive.google.com/open?id=1TXBRK1gd_9Ws9cyqb4GR942AgGhhEvK6',
  },
  acordaoInterdicao: {
    label: 'Acordao Sentença interdição',
    url: 'https://drive.google.com/open?id=1kKnTVmBfThznpTqdtIv-t85diHRoAiY8',
  },
  escrituraUniao: {
    label: 'Escritura Uniao Estavel Raquel',
    url: 'https://drive.google.com/open?id=1znpmtkXTQvlw1oHkQs-5x2y0FUEtQw6Y',
  },
  sentencaCuratela: {
    label: 'sentença curatela (1)',
    url: 'https://drive.google.com/open?id=1kvreNxlTnWamp0csc8AKdsKlb92IuGH1',
  },
  sentencaInterdicao: {
    label: 'Sentença interdição',
    url: 'https://drive.google.com/open?id=1BosEtVjLoTWQ9rtUrxNR5OGmRQa2NbmD',
  },
  testamentoOdette: {
    label: 'Testamento e Revogacao Testamento 9.10.2017 Odette',
    url: 'https://drive.google.com/open?id=1QkQO126suuCd5KELvxOkr9y-5bf-Yw_8',
  },
  partilhaOdette: {
    label: 'Partilha Odette',
    url: 'https://drive.google.com/open?id=1pQDyRO2jQxGh7Frvac0xga_KVZCThXpg',
  },
  sobrepartilhaOdette: {
    label: 'Sobrepartilha Odette',
    url: 'https://drive.google.com/open?id=1jjm_pgptIqDeGLSr3sP78FoW6ea-uMdV',
  },
}


interface RowData {
  year: string
  subLabel?: string
  dark?: boolean
  ghost?: boolean           // rows sem pill (sem conector ao centro)
  odette?: React.ReactNode
  raquel?: React.ReactNode
}

const rows: RowData[] = [
  // ── 1962 – 1964 ──────────────────────────────────────────────────────────
  {
    year: '1962 – 1964',
    odette: (
      <div className={styles.cardRow}>
        <EventCard family="odette" rowItem docs={[D.certidaoCasamento]}>
          <p><strong>9/6/62:</strong> MARIALDO casou com ODETTE <em>(comunhão universal de bens)</em></p>
        </EventCard>
        <EventCard family="odette" rowItem>
          <p>Nasceram 3 filhos do casal: <strong>ARNALDO, MARIA CLÁUDIA E LUCIANA</strong></p>
        </EventCard>
        <EventCard family="odette" rowItem rowItemLast>
          <p><strong>10/1/64:</strong> MARIA CLÁUDIA faleceu (aos 4 dias de vida)</p>
        </EventCard>
      </div>
    ),
  },

  // ── 1994 – 1996 ──────────────────────────────────────────────────────────
  {
    year: '1994 – 1996',
    raquel: (
      <div className={styles.cardRow}>
        <EventCard family="raquel" rowItem>
          <p>MARIALDO iniciou relacionamento com RAQUEL</p>
        </EventCard>
        <EventCard family="raquel" rowItem rowItemLast>
          <p>Nasceu 1 filha do casal: <strong>Mariana</strong> <em>(fato que era de conhecimento de todos os membros da família)</em></p>
        </EventCard>
      </div>
    ),
  },

  // ── 2013 – 2014 ──────────────────────────────────────────────────────────
  {
    year: '2013 – 2014',
    odette: (
      <div className={styles.cardRow}>
        <EventCard family="odette" rowItem>
          <p><strong>3/8/13:</strong> Filho ARNALDO faleceu em um trágico acidente aéreo <em>(juntamente com sua esposa e dois filhos)</em></p>
        </EventCard>
        <EventCard family="odette" rowItem>
          <p>Relação de MARIALDO e ODETTE ficou fragilizada</p>
        </EventCard>
        <EventCard family="odette" rowItem rowItemLast>
          <p>MARIALDO viveu desavenças com filha LUCIANA</p>
        </EventCard>
      </div>
    ),
  },

  // ── 2015 (pill row) ───────────────────────────────────────────────────────
  // Odette: [highlight card] ← seta-laranja ← [2 cards stacked]
  // Raquel: card "Jun/15"
  {
    year: '2015',
    odette: (
      <div className={styles.highlightRow}>
        <EventCard family="odette" highlight docs={[D.acordaoInterdicao]}>
          <p>
            MARIALDO <strong>não concordou com o pedido de curatela</strong> e se opôs
            à interdição, mas indicou que, caso deferida,{' '}
            <strong>sua filha Mariana deveria ser a curadora</strong>
          </p>
        </EventCard>
        <img src={setaLaranja} className={styles.highlightArrow} alt="" />
        <div className={styles.miniStack}>
          <EventCard family="odette">
            <p>ODETTE ajuizou Ação de Curatela para interdição de MARIALDO</p>
          </EventCard>
          <EventCard family="odette">
            <p>MARIALDO ajuizou Ação de Divórcio</p>
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

  // ── 2017 ─────────────────────────────────────────────────────────────────
  // Odette: 3 cards unificados (LUCIANA / O juízo / Divórcio) — conectados ao pill 2017
  // Raquel: Dez/2017
  {
    year: '2017',
    odette: (
      <div className={styles.cardRow}>
        <EventCard family="odette" rowItem docs={[D.sentencaCuratela]}>
          <p>LUCIANA foi nomeada como curadora definitiva de MARIALDO na Ação de Curatela</p>
        </EventCard>
        <EventCard family="odette" rowItem docs={[D.sentencaInterdicao]}>
          <p>
            O juízo da interdição reconheceu a capacidade de discernimento de
            MARIALDO e determinou que LUCIANA ouvisse o pai quanto aos negócios da empresa
          </p>
        </EventCard>
        <EventCard family="odette" rowItem>
          <p>Divórcio litigioso foi decretado</p>
        </EventCard>
        <EventCard family="odette" rowItem rowItemLast docs={[D.testamentoOdette]}>
          <p><strong>Out/17:</strong> MARIALDO revogou o testamento em favor de ODETTE</p>
        </EventCard>
      </div>
    ),
    raquel: (
      <EventCard family="raquel" docs={[D.escrituraUniao]}>
        <p>
          <strong>Dez/2017:</strong> MARIALDO beneficiou sua companheira RAQUEL,
          com a parte disponível dos bens e a nomeou como inventariante e
          testamenteira
        </p>
      </EventCard>
    ),
  },

  // ── Ghost row: pulse + card highlight grande ────────────────────────────
  {
    year: '',
    ghost: true,
    odette: (
      <div className={styles.ghostBlock}>
        <img src={imgPulse} alt="" className={styles.pulse} />
        <EventCard family="odette" highlight docs={[D.acordaoInterdicao]}>
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
      </div>
    ),
  },


  // ── 2020 ─────────────────────────────────────────────────────────────────
  {
    year: '2020',
    odette: (
      <EventCard family="odette" docs={[D.partilhaOdette]}>
        <p>Realizada a partilha</p>
      </EventCard>
    ),
  },

  // ── 2021 ─────────────────────────────────────────────────────────────────
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

  // ── 2022 ─────────────────────────────────────────────────────────────────
  {
    year: '2022',
    odette: (
      <EventCard family="odette" docs={[D.sobrepartilhaOdette]}>
        <p>Realizada a sobrepartilha</p>
      </EventCard>
    ),
  },

  // ── 2024 Falecimento ──────────────────────────────────────────────────────
  {
    year: '2024',
    subLabel: 'Falecimento',
    dark: true,
    raquel: (
      <EventCard family="raquel" docs={[D.certidaoCasamento]}>
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

        {rows.map((row, idx) => (
          <div key={idx} className={[styles.row, row.ghost ? styles.rowGhost : ''].join(' ')}>
            {/* LEFT – ODETTE */}
            <div className={styles.leftCell}>{row.odette ?? null}</div>

            {/* connector left — linha reta marrom (só quando há conteúdo e não é ghost) */}
            <div className={styles.connLeft}>
              {row.odette && !row.ghost && <span className={styles.connLine} />}
            </div>

            {/* YEAR PILL — vazio em ghost rows */}
            <div className={styles.yearCell}>
              {!row.ghost && (
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
              )}
            </div>

            {/* connector right — mesma linha marrom do lado esquerdo */}
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
