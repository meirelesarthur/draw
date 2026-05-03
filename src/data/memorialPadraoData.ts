export interface TlDoc {
  icon: string
  l: string
  name: string
  meta: string
  url: string
}

export interface TlEvent {
  date: string
  type: 'key' | 'alert' | 'normal'
  title: string
  desc: string
  tags: ('key' | 'alert' | 'doc')[]
  docs: TlDoc[]
}

export interface FactDoc {
  icon: string
  l: string
  name: string
  meta: string
  url?: string
}

export interface Fact {
  title: string
  status: 'Controvertido' | 'Incontroverso' | 'A provar'
  statusKey: 'controvertido' | 'incontroverso' | 'pendente'
  desc: string
  tese: string
  docs: FactDoc[]
}

export const tlData: TlEvent[] = [
  {
    date: '15 mar. 2019', type: 'key', title: 'Contrato de crédito rotativo',
    desc: 'Assinatura do contrato de crédito rotativo no valor de R$ 8 milhões entre Meridian e Banco Atlântico, com prazo de 5 anos e taxa de CDI + 3,2% a.a. Marco inicial da relação contratual.',
    tags: ['key'],
    docs: [
      { icon: 'ic-c', l: 'CT', name: 'Contrato de crédito rotativo', meta: '34 páginas · Doc. 01', url: '#' },
      { icon: 'ic-f', l: 'EX', name: 'Extrato de desembolso inicial', meta: '2 páginas · Doc. 02', url: '#' },
    ],
  },
  {
    date: '22 ago. 2019', type: 'normal', title: 'Constituição de garantias adicionais',
    desc: 'A pedido do Banco, a Meridian constituiu garantias adicionais sobre imóvel comercial avaliado em R$ 12M, reforçando a operação de crédito original.',
    tags: ['doc'],
    docs: [
      { icon: 'ic-c', l: 'GR', name: 'Instrumento de garantia real', meta: '18 páginas · Doc. 05', url: '#' },
      { icon: 'ic-j', l: 'CR', name: 'Certidão de registro imóvel', meta: '4 páginas · Doc. 06', url: '#' },
    ],
  },
  {
    date: '18 jan. 2021', type: 'normal', title: 'Renegociação e aditivo contratual',
    desc: 'Diante da pandemia, as partes negociaram e assinaram aditivo prorrogando prazo em 18 meses e ajustando condições de pagamento.',
    tags: ['doc'],
    docs: [
      { icon: 'ic-c', l: 'AD', name: 'Aditivo nº 1 ao contrato', meta: '12 páginas · Doc. 09', url: '#' },
      { icon: 'ic-j', l: 'RC', name: 'Registro em cartório', meta: '2 páginas · Doc. 10', url: '#' },
    ],
  },
  {
    date: '14 jun. 2021', type: 'alert', title: 'Bloqueio unilateral da conta',
    desc: 'Sem qualquer notificação prévia, o Banco bloqueou a conta corrente operacional da Meridian, impedindo a realização de TED de R$ 3,2M já programada.',
    tags: ['alert'],
    docs: [
      { icon: 'ic-f', l: 'EX', name: 'Extrato com data do bloqueio', meta: '3 páginas · Doc. 17', url: '#' },
      { icon: 'ic-e', l: 'EM', name: 'E-mail gerente (17/06/2021)', meta: '1 página · Doc. 18', url: '#' },
      { icon: 'ic-j', l: 'BO', name: 'Boletim de ocorrência', meta: '2 páginas · Doc. 19', url: '#' },
    ],
  },
  {
    date: '05 jul. 2021', type: 'alert', title: 'Declaração de vencimento antecipado',
    desc: 'O Banco notificou formalmente o vencimento antecipado de toda a dívida (R$ 8,4M com encargos), alegando violação da cláusula 8.3.',
    tags: ['alert'],
    docs: [
      { icon: 'ic-j', l: 'NT', name: 'Notificação de vencimento', meta: '6 páginas · Doc. 21', url: '#' },
      { icon: 'ic-c', l: 'CL', name: 'Contrato — cláusula 8.3 destacada', meta: '1 página · Doc. 22', url: '#' },
    ],
  },
  {
    date: '03 set. 2021', type: 'alert', title: 'Inscrição no SERASA e SCPC',
    desc: 'O Banco inscreveu o Grupo Meridian nos órgãos de proteção ao crédito por valor de R$ 4,1M ainda contestado judicialmente.',
    tags: ['alert'],
    docs: [
      { icon: 'ic-f', l: 'SE', name: 'Consulta SERASA (histórico)', meta: '3 páginas · Doc. 24', url: '#' },
      { icon: 'ic-j', l: 'NT', name: 'Notificação extrajudicial enviada', meta: '4 páginas · Doc. 25', url: '#' },
    ],
  },
  {
    date: '14 fev. 2022', type: 'normal', title: 'Notificação pré-processual',
    desc: 'Advogados da Meridian notificaram o Banco formalmente exigindo cancelamento da inscrição, restituição dos encargos indevidos e abertura de negociação.',
    tags: ['doc'],
    docs: [
      { icon: 'ic-j', l: 'NP', name: 'Notificação pré-processual', meta: '8 páginas · Doc. 28', url: '#' },
      { icon: 'ic-e', l: 'AR', name: 'Aviso de recebimento (AR)', meta: '1 página · Doc. 29', url: '#' },
    ],
  },
  {
    date: '08 set. 2022', type: 'key', title: 'Ajuizamento da ação',
    desc: 'Distribuída a ação de responsabilidade civil c/c indenização por danos materiais e morais à 3ª Vara Cível da Comarca de São Paulo. Tutela de urgência deferida.',
    tags: ['key'],
    docs: [
      { icon: 'ic-j', l: 'PI', name: 'Petição inicial', meta: '48 páginas · Doc. 01', url: '#' },
      { icon: 'ic-j', l: 'TD', name: 'Decisão de tutela de urgência', meta: '3 páginas · Doc. 33', url: '#' },
    ],
  },
]

export const factData: Fact[] = [
  {
    title: 'Bloqueio unilateral da conta corrente sem notificação prévia',
    status: 'Controvertido', statusKey: 'controvertido',
    desc: 'Em 14/06/2021, o Banco bloqueou a conta operacional principal da Meridian sem qualquer comunicação prévia, impedindo operações de R$ 3,2M programadas para aquela data.',
    tese: 'Viola o art. 422 do CC (boa-fé objetiva) e a cláusula 6.1 do contrato, que exige notificação prévia de 10 dias úteis antes de qualquer bloqueio.',
    docs: [
      { icon: 'ic-f', l: 'EX', name: 'Extrato bancário — 14/06/2021', meta: 'Evidencia data e hora exata do bloqueio · Doc. 17' },
      { icon: 'ic-e', l: 'EM', name: 'E-mail do gerente — 17/06/2021', meta: 'Confirma ciência do bloqueio 3 dias depois · Doc. 18' },
      { icon: 'ic-j', l: 'BO', name: 'Boletim de ocorrência', meta: 'Registrado no mesmo dia · Doc. 19' },
    ],
  },
  {
    title: 'Declaração de vencimento antecipado sem justa causa',
    status: 'Controvertido', statusKey: 'controvertido',
    desc: 'O Banco declarou o vencimento antecipado da dívida em 05/07/2021 alegando inadimplemento da cláusula 8.3. A Meridian provou pagamentos em dia até maio de 2021.',
    tese: 'O inadimplemento foi provocado pelo próprio credor (exceptio non adimpleti contractus), tornando ilícita a declaração de vencimento antecipado — CC art. 476.',
    docs: [
      { icon: 'ic-c', l: 'CL', name: 'Contrato — cláusula 8.3', meta: 'Exige dois trimestres consecutivos de atraso · Doc. 01' },
      { icon: 'ic-f', l: 'CP', name: 'Comprovantes de pagamento', meta: 'Mai/2021 — último pagamento efetuado · Doc. 20' },
    ],
  },
  {
    title: 'Existência do contrato de crédito rotativo de R$ 8M',
    status: 'Incontroverso', statusKey: 'incontroverso',
    desc: 'Em 15/03/2019, as partes assinaram contrato de crédito rotativo no valor de R$ 8 milhões. Ambas as partes reconhecem o documento e suas cláusulas.',
    tese: 'Fato base não controvertido. Relevante para fixar o marco temporal e as obrigações recíprocas.',
    docs: [
      { icon: 'ic-c', l: 'CT', name: 'Contrato de crédito rotativo', meta: 'Assinado em 15/03/2019 · Doc. 01' },
    ],
  },
  {
    title: 'Inscrição indevida no SERASA e SCPC',
    status: 'Controvertido', statusKey: 'controvertido',
    desc: 'Em 03/09/2021, o Banco inscreveu a Meridian nos órgãos de proteção ao crédito por valor de R$ 4,1M durante prazo de recurso administrativo ainda aberto.',
    tese: 'Súmula 385 do STJ e Súmula 323 do STJ. Inscrição durante litígio sobre o débito gera responsabilidade objetiva do credor.',
    docs: [
      { icon: 'ic-f', l: 'SE', name: 'Consulta SERASA histórica', meta: 'Comprova data e valor inscrito · Doc. 24' },
      { icon: 'ic-e', l: 'EM', name: 'E-mails de fornecedores', meta: 'Recusas de crédito em razão da inscrição · Doc. 26' },
    ],
  },
  {
    title: 'Renegociação da dívida em janeiro de 2021',
    status: 'Incontroverso', statusKey: 'incontroverso',
    desc: 'Em 18/01/2021, as partes celebraram aditivo contratual renegociando prazo e condições. O instrumento foi assinado por ambas e registrado em cartório sob nº 32.441.',
    tese: 'Fato incontroverso. Demonstra que o Banco, à época, reconhecia a viabilidade da operação e a boa-fé da Meridian.',
    docs: [
      { icon: 'ic-c', l: 'AD', name: 'Aditivo nº 1 ao contrato', meta: 'Assinado em 18/01/2021 · Doc. 09' },
    ],
  },
  {
    title: 'Danos à operação por contratos comerciais cancelados',
    status: 'Controvertido', statusKey: 'controvertido',
    desc: 'A Meridian alega que o bloqueio bancário provocou o cancelamento de 3 contratos comerciais ativos, gerando perda de receita projetada de R$ 6,8M.',
    tese: 'Nexo causal: sem os recursos da conta, a Meridian não pôde honrar os contratos — CC art. 403.',
    docs: [
      { icon: 'ic-c', l: 'CR', name: 'Contratos rescindidos (3)', meta: 'Rescisão por inadimplemento · Doc. 35' },
      { icon: 'ic-e', l: 'EM', name: 'E-mails dos clientes', meta: 'Mencionam "problemas financeiros" como causa · Doc. 36' },
      { icon: 'ic-f', l: 'LD', name: 'Laudo econômico-financeiro', meta: 'Quantifica os danos em R$ 6,8M · Doc. 37' },
    ],
  },
  {
    title: 'Ciência prévia do Banco sobre situação financeira da Meridian',
    status: 'A provar', statusKey: 'pendente',
    desc: 'A autora sustenta que gerentes do Banco tinham acesso a relatórios internos que demonstravam a boa saúde financeira da Meridian quando decidiram pelo bloqueio.',
    tese: 'Se provado, configura dolo ou culpa grave, elevando a indenização e potencialmente configurando abuso de direito — CC art. 187.',
    docs: [
      { icon: 'ic-e', l: 'EM', name: 'Mensagens internas (a exibir)', meta: 'Pedido de exibição formulado — Doc. 38' },
      { icon: 'ic-j', l: 'TM', name: 'Depoimento ex-gerente', meta: 'Audiência marcada para 18/06/2025 · Doc. 39' },
    ],
  },
  {
    title: 'Cobrança de encargos não previstos no contrato',
    status: 'Controvertido', statusKey: 'controvertido',
    desc: 'O Banco cobrou R$ 780 mil em multas e encargos que a Meridian sustenta não terem base contratual. A revisão contábil identificou 3 lançamentos distintos sem amparo.',
    tese: 'Cobrança sem base contratual configura enriquecimento sem causa — CC art. 884.',
    docs: [
      { icon: 'ic-f', l: 'EX', name: 'Extratos com lançamentos contestados', meta: '3 páginas · Doc. 41' },
      { icon: 'ic-f', l: 'LC', name: 'Laudo contábil pericial', meta: 'Identifica os 3 lançamentos indevidos · Doc. 42' },
    ],
  },
  {
    title: 'Pagamentos regulares até maio de 2021',
    status: 'Incontroverso', statusKey: 'incontroverso',
    desc: 'A Meridian manteve pagamentos em dia de todas as parcelas do contrato de março de 2019 até maio de 2021 — 26 meses consecutivos de adimplemento.',
    tese: 'Demonstra boa-fé contratual da autora e que o inadimplemento de junho de 2021 foi fato excepcional diretamente ligado ao bloqueio.',
    docs: [
      { icon: 'ic-f', l: 'EX', name: 'Extratos bancários 2019–2021', meta: '26 meses de comprovantes · Doc. 43' },
    ],
  },
  {
    title: 'Dano moral à pessoa jurídica por abalo de reputação',
    status: 'Controvertido', statusKey: 'controvertido',
    desc: 'A Meridian alega que a inscrição indevida causou abalo de crédito e dano reputacional perante parceiros, fornecedores e investidores.',
    tese: 'Súmula 227 do STJ: pessoa jurídica pode sofrer dano moral. O abalo ao crédito é dano in re ipsa.',
    docs: [
      { icon: 'ic-j', l: 'TM', name: 'Depoimento do sócio-administrador', meta: 'Descreve impactos reputacionais · Doc. 44' },
      { icon: 'ic-e', l: 'EM', name: 'E-mails de parceiros comerciais', meta: 'Mencionam a inscrição como causa de recusa · Doc. 45' },
    ],
  },
  {
    title: 'Valor total dos danos materiais sofridos',
    status: 'A provar', statusKey: 'pendente',
    desc: 'O valor exato dos danos materiais depende da conclusão do laudo pericial contábil em andamento. Estimativa inicial: R$ 8,5M a R$ 12,4M conforme cenário.',
    tese: 'Quantum debeatur a ser definido pela perícia.',
    docs: [
      { icon: 'ic-f', l: 'LP', name: 'Laudo pericial contábil (pendente)', meta: 'Prazo: 15/06/2025 · Doc. 46' },
    ],
  },
]
