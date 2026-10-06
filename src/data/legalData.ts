export const HTML_IMAGES = {
  logo: "/Logotipo APG em Verde Floresta.png",
  lawyerPortrait: "/Selfie elegante com tranças e óculos.png",
  mapFariaLima:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBb1Y6dmbHwoToFF2BSdK9VLbBp2ZwCFvURzXpL0wVGPUgL-aTTx7cu2BVxwe45mdsrdfr2xta6sdi3RgXtRC2sDZh9sAhrGzOkvPclFJfhXEdIhJLD5LdVVGRwWOh6-sWIf7Jb4VCxi4RCSoER0n1O6ZpsMhuJ62RRkD24mBoFQF0epHbDUM9CF0uqi4TP3jTF3toNTyBDPKR0ZOg9cj9m0t4tSuxwH7OSax7kH2pK-Sdz1wAtlV5ABQ",
};

export interface PracticeArea {
  id: string;
  code: string;
  formValue: string;
  icon: string;
  title: string;
  description: string;
  footerLabel: string;
  overview: string;
  preventiveScope: string[];
  contentiousScope: string[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "civil",
    code: "ÁREA 01",
    formValue: "civil",
    icon: "description",
    title: "Direito Civil & Contratos",
    description:
      "Elaboração, análise crítica e revisão minuciosa de instrumentos contratuais, bem como resolução estratégica de disputas de ordem patrimonial e obrigacional.",
    footerLabel: "Consultoria & Contencioso",
    overview:
      "A atuação em Direito Civil e Contratos visa conferir segurança jurídica às relações negociais e patrimoniais, prevenindo litígios por meio de cláusulas claras, equilibradas e aderentes à legislação vigente e à jurisprudência dos tribunais superiores.",
    preventiveScope: [
      "Estruturação, redação e revisão técnica de contratos civis e comerciais",
      "Pareceres jurídicos sobre responsabilidade civil, obrigações e garantias reais ou fidejussórias",
      "Notificações e interpelações extrajudiciais para preservação de direitos",
      "Auditoria jurídica de riscos contratuais e renegociação de passivos civis",
    ],
    contentiousScope: [
      "Ações de execução de títulos extrajudiciais, cobrança e adimplemento contratual",
      "Demandas indenizatórias por danos materiais e morais em relações civis",
      "Tutelas de urgência para proteção de ativos e suspensão de efeitos lesivos",
      "Atuação em tribunais estaduais e superiores com memoriais e sustentação oral",
    ],
    faq: [
      {
        question: "Qual a importância da revisão jurídica antes da assinatura de um contrato?",
        answer:
          "A análise prévia permite identificar cláusulas ambíguas, multas desproporcionais, riscos de inadimplemento e omissões quanto ao foro ou garantias, reduzindo substancialmente a probabilidade de litígios futuros.",
      },
      {
        question: "Um contrato assinado digitalmente possui a mesma validade jurídica do físico?",
        answer:
          "Sim. Conforme a legislação brasileira (MP nº 2.200-2/2001 e Lei nº 14.063/2020) e o entendimento consolidado do STJ, instrumentos assinados por plataformas eletrônicas idôneas ou certificado ICP-Brasil possuem plena validade jurídica e força executiva.",
      },
    ],
  },
  {
    id: "familia",
    code: "ÁREA 02",
    formValue: "familia",
    icon: "family_restroom",
    title: "Direito de Família & Sucessões",
    description:
      "Planejamento sucessório patrimonial, inventários judiciais e extrajudiciais, divórcios e questões sensíveis conduzidas com discrição, empatia e segurança jurídica.",
    footerLabel: "Planejamento & Acolhimento",
    overview:
      "As demandas familiares e sucessórias exigem sensibilidade humana aliada ao rigor técnico. O escritório prioriza soluções que preservem a dignidade dos envolvidos, a estabilidade patrimonial da família e o sigilo absoluto das informações.",
    preventiveScope: [
      "Planejamento matrimonial, pactos antenupciais e contratos de convivência (união estável)",
      "Planejamento sucessório, testamentos, doações com reserva de usufruto e holdings familiares",
      "Inventários e partilhas extrajudiciais em cartório de notas",
      "Mediação familiar preventiva para definição de guarda, convivência e alimentos",
    ],
    contentiousScope: [
      "Divórcios e dissoluções de união estável consensuais ou litigiosos sob segredo de justiça",
      "Inventários judiciais, sobrepartilhas e remoção de inventariante",
      "Ações de fixação, revisão e execução de alimentos e regulamentação de convivência",
      "Procedimentos de curatela, tutela e tomada de decisão apoiada",
    ],
    faq: [
      {
        question: "Quando é possível realizar o inventário diretamente em cartório (extrajudicial)?",
        answer:
          "O inventário extrajudicial é cabível quando todos os herdeiros são capazes e estão em pleno acordo quanto à partilha dos bens, ou mediante autorização judicial específica quando houver herdeiros menores ou incapazes, nos termos das normas atuais do CNJ.",
      },
      {
        question: "Os processos de Direito de Família são públicos?",
        answer:
          "Não. Por força do artigo 189, inciso II, do Código de Processo Civil, os processos que versam sobre casamento, separação, divórcio, união estável, filiação, alimentos e guarda de crianças e adolescentes tramitam em segredo de justiça.",
      },
    ],
  },
  {
    id: "imobiliario",
    code: "ÁREA 03",
    formValue: "imobiliario",
    icon: "apartment",
    title: "Direito Imobiliário",
    description:
      "Segurança jurídica em transações de compra e venda, contratos de locação comercial e residencial, regularização registral, posse e incorporações.",
    footerLabel: "Due Diligence & Registros",
    overview:
      "Operações imobiliárias envolvem patrimônio expressivo e exigem verificação criteriosa de certidões, cadeia dominial e passivos ocultos. A banca assessora compradores, vendedores, locadores e investidores em todas as etapas do negócio.",
    preventiveScope: [
      "Due diligence imobiliária completa para aquisição segura de imóveis urbanos e rurais",
      "Elaboração de compromissos de compra e venda, permutas e dações em pagamento",
      "Contratos de locação residencial, comercial, built-to-suit e administração patrimonial",
      "Regularização registral perante Cartórios de Registro de Imóveis e municipalidades",
    ],
    contentiousScope: [
      "Ações possessórias (reintegração, manutenção de posse e interdito proibitório)",
      "Ações locatícias: despejo, renovatória de locação comercial e revisional de aluguel",
      "Usucapião judicial e extrajudicial, adjudicação compulsória e retificação de área",
      "Rescisão de contratos imobiliários, atraso de obra e vícios construtivos",
    ],
    faq: [
      {
        question: "O que compreende a due diligence na compra de um imóvel?",
        answer:
          "Trata-se da auditoria jurídica prévia que examina a matrícula atualizada do imóvel, a cadeia de proprietários anteriores e as certidões cíveis, trabalhistas, fiscais e federais dos vendedores, prevenindo riscos de fraude à execução ou evicção.",
      },
      {
        question: "Qual a diferença entre posse e propriedade de um imóvel?",
        answer:
          "A propriedade plena somente se transfere com o registro da escritura pública ou título hábil na matrícula do Cartório de Registro de Imóveis competente (art. 1.245 do Código Civil), enquanto a posse refere-se ao exercício fático de poderes sobre o bem.",
      },
    ],
  },
  {
    id: "empresarial",
    code: "ÁREA 04",
    formValue: "empresarial",
    icon: "corporate_fare",
    title: "Direito Empresarial & Societário",
    description:
      "Assessoria contínua para micro, pequenas e médias empresas, elaboração de acordos societários, governança corporativa e adequação às normas regulatórias.",
    footerLabel: "Governança & Negócios",
    overview:
      "A consultoria empresarial e societária apoia sócios e administradores na estruturação jurídica de seus negócios, prevenindo impasses societários, protegendo ativos operacionais e garantindo conformidade contratual e regulatória.",
    preventiveScope: [
      "Constituição de sociedades, alterações de contrato social e acordos de sócios/quotistas",
      "Estruturação de governança corporativa, memorandos de entendimento (MoU) e NDAs",
      "Adequação de processos internos à Lei Geral de Proteção de Dados (LGPD)",
      "Consultoria jurídica contínua para contratos com fornecedores, parceiros e clientes",
    ],
    contentiousScope: [
      "Dissolução parcial de sociedade e apuração de haveres",
      "Defesa dos interesses da pessoa jurídica e proteção contra desconsideração indevida da personalidade jurídica",
      "Recuperação de créditos comerciais e disputas entre sócios",
      "Representação em procedimentos arbitrais e mediações empresariais",
    ],
    faq: [
      {
        question: "Por que celebrar um Acordo de Sócios além do Contrato Social?",
        answer:
          "O Acordo de Sócios regula matérias estratégicas e confidenciais — como regras de governança, direito de preferência, cláusulas de saída (tag along/drag along), não concorrência e sucessão — conferindo previsibilidade em caso de divergências.",
      },
      {
        question: "Como funciona a assessoria jurídica consultiva para empresas?",
        answer:
          "Consiste no acompanhamento próximo da rotina negocial da empresa, analisando contratos, emitindo pareceres preventivos e orientando a tomada de decisão estratégica antes que eventuais contingências se convertam em processos judiciais.",
      },
    ],
  },
  {
    id: "consumidor",
    code: "ÁREA 05",
    formValue: "consumidor",
    icon: "gavel",
    title: "Direito do Consumidor",
    description:
      "Atuação em relações de consumo complexas, responsabilidade civil por vício de produtos ou serviços, e representação em procedimentos administrativos e judiciais.",
    footerLabel: "Equilíbrio & Reparação",
    overview:
      "Com base no Código de Defesa do Consumidor (Lei nº 8.078/1990), o escritório atua tanto na defesa de consumidores lesados em operações de alta relevância quanto na consultoria preventiva para empresas que buscam adequar suas práticas comerciais.",
    preventiveScope: [
      "Adequação de termos de uso, contratos de adesão e políticas de garantia ao CDC",
      "Orientação preventiva a fornecedores para mitigação de passivos consumeristas",
      "Notificações extrajudiciais e tratativas perante órgãos de defesa do consumidor (Procon)",
      "Análise de cláusulas abusivas em contratos bancários, securitários e de saúde suplementar",
    ],
    contentiousScope: [
      "Ações relativas a negativa indevida de cobertura por planos de saúde e seguros",
      "Demandas envolvendo falhas na prestação de serviços médicos, educacionais, aéreos e financeiros",
      "Ações de responsabilidade pelo fato e pelo vício do produto ou serviço",
      "Defesa técnica de empresas em processos judiciais e processos administrativos sancionadores",
    ],
    faq: [
      {
        question: "Qual o prazo legal para reclamar de vícios aparentes em produtos ou serviços?",
        answer:
          "Segundo o artigo 26 do Código de Defesa do Consumidor, o direito de reclamar pelos vícios aparentes ou de fácil constatação caduca em 30 dias para serviços e produtos não duráveis, e em 90 dias para serviços e produtos duráveis.",
      },
      {
        question: "Como as empresas podem reduzir o volume de demandas consumeristas?",
        answer:
          "A revisão clara dos contratos, o cumprimento rigoroso do dever de informação prévia e a adoção de canais internos eficientes de resolução consensual reduzem significativamente a judicialização.",
      },
    ],
  },
  {
    id: "consenso",
    code: "ÁREA 06",
    formValue: "consenso",
    icon: "handshake",
    title: "Resolução Consensual de Conflitos",
    description:
      "Mediação qualificada, conciliação e negociações extrajudiciais estratégicas direcionadas a desfechos céleres, econômicos e sustentáveis no longo prazo.",
    footerLabel: "Mediação & Negociação",
    overview:
      "Em sintonia com o Código de Processo Civil e a Lei de Mediação (Lei nº 13.140/2015), o escritório prioriza métodos adequados de solução de controvérsias, buscando construir acordos sólidos que preservem o tempo, os recursos e a reputação das partes.",
    preventiveScope: [
      "Condução de rodadas de negociação assistida com técnica de negociação estratégica",
      "Elaboração de instrumentos de transação extrajudicial com eficácia de título executivo",
      "Representação de clientes em câmaras privadas de mediação e conciliação",
      "Avaliação de custo-benefício e risco processual para propositura de acordos",
    ],
    contentiousScope: [
      "Homologação judicial de acordos extrajudiciais para formação de título executivo judicial",
      "Atuação em audiências de conciliação e mediação no âmbito do Poder Judiciário (CEJUSC)",
      "Negociação estratégica no curso de processos judiciais ou execuções complexas",
      "Execução de termos de mediação em caso de descumprimento",
    ],
    faq: [
      {
        question: "Um acordo extrajudicial possui a mesma segurança de uma decisão judicial?",
        answer:
          "Sim. Nos termos do artigo 784, inciso IV, do Código de Processo Civil, o instrumento de transação referendado pelos advogados dos transatores ou por conciliador/mediador credenciado constitui título executivo extrajudicial, podendo ainda ser levado à homologação judicial.",
      },
      {
        question: "Tudo o que é discutido em uma sessão de mediação é confidencial?",
        answer:
          "Sim. A confidencialidade é princípio basilar da mediação (art. 30 da Lei nº 13.140/2015), impedindo que informações ou propostas apresentadas nas sessões sejam utilizadas como prova em eventual processo judicial futuro.",
      },
    ],
  },
];

export interface InformativeArticle {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  summary: string;
  content: string[];
  legalReference: string;
}

export const INFORMATIVE_ARTICLES: InformativeArticle[] = [
  {
    id: "due-diligence-imobiliaria",
    category: "Direito Imobiliário",
    date: "Outubro 2026",
    readTime: "Leitura de 4 min",
    title: "A importância da Due Diligence jurídica na aquisição de imóveis urbanos",
    summary:
      "Entenda quais certidões e cautelas registrais são recomendadas pela legislação e pela jurisprudência para assegurar a boa-fé objetiva em negócios imobiliários.",
    content: [
      "A aquisição de um bem imóvel representa, para pessoas físicas e jurídicas, uma operação patrimonial relevante que demanda verificação documental prévia. No ordenamento jurídico brasileiro, a proteção do adquirente de boa-fé está diretamente vinculada à demonstração de cautela na análise da situação jurídica do imóvel e dos alienantes (Súmula 375 do STJ e Lei nº 13.097/2015).",
      "O procedimento técnico denominado Due Diligence imobiliária consiste no exame sistemático da matrícula atualizada do imóvel — verificando-se a existência de ônus reais, penhoras, hipotecas, alienações fiduciárias ou indisponibilidades — bem como na análise das certidões pessoais dos vendedores nas esferas cível, trabalhista, federal e fiscal.",
      "Além da verificação documental, a elaboração de um Instrumento Particular de Compromisso de Compra e Venda com cláusulas precisas sobre prazos, condições suspensivas, entrega da posse e responsabilidade por eventuais débitos propter rem (como IPTU e cotas condominiais) é essencial para conferir previsibilidade a ambas as partes.",
    ],
    legalReference: "Referência Legislativa: Código Civil (Lei nº 10.406/2002), Lei nº 13.097/2015 e Lei dos Registros Públicos (Lei nº 6.015/1973).",
  },
  {
    id: "planejamento-sucessorio",
    category: "Família & Sucessões",
    date: "Setembro 2026",
    readTime: "Leitura de 5 min",
    title: "Instrumentos jurídicos de planejamento sucessório no direito brasileiro",
    summary:
      "Aspectos informativos sobre testamento, doação com reserva de usufruto e organização societária familiar sob a ótica do Código Civil.",
    content: [
      "O planejamento sucessório reúne um conjunto de instrumentos lícitos voltados à organização preventiva da transmissão patrimonial, respeitando-se rigorosamente a legítima dos herdeiros necessários (correspondente a 50% do patrimônio líquido, nos termos do art. 1.846 do Código Civil).",
      "Entre as ferramentas previstas na legislação destacam-se o testamento público ou particular, o adiantamento de legítima mediante doação com cláusulas restritivas (incomunicabilidade, impenhorabilidade e reversão) e reserva de usufruto vitalício, bem como a constituição de sociedades patrimoniais quando compatível com a realidade familiar.",
      "A escolha adequada de cada instrumento exige diagnóstico individualizado do regime de bens vigente, da estrutura familiar e da natureza dos ativos, prevenindo litígios entre sucessores e reduzindo os custos e o tempo de tramitação de futuros procedimentos de inventário.",
    ],
    legalReference: "Referência Legislativa: Código Civil (Arts. 1.784 a 2.027) e Resolução nº 35/2007 do Conselho Nacional de Justiça (CNJ).",
  },
  {
    id: "governanca-acordo-socios",
    category: "Direito Empresarial",
    date: "Agosto 2026",
    readTime: "Leitura de 4 min",
    title: "O papel do Acordo de Sócios na estabilidade e perenidade das empresas",
    summary:
      "Como regras claras de administração, quóruns deliberativos e avaliação de quotas previnem impasses societários.",
    content: [
      "Em sociedades limitadas e anônimas fechadas, o Contrato Social ou Estatuto frequentemente limita-se às cláusulas obrigatórias exigidas pelas Juntas Comerciais. Contudo, o cotidiano empresarial apresenta situações que demandam regulamentação parassocial detalhada por meio do Acordo de Sócios ou Quotistas.",
      "Esse instrumento permite disciplinar com clareza as atribuições de cada sócio, a política de distribuição de lucros e reinvestimento, os critérios objetivos de avaliação da empresa (valuation) em caso de retirada ou exclusão de sócio, e os mecanismos de solução de impasses (deadlock provisions).",
      "A adoção preventiva de boas práticas de governança protege a atividade operacional da empresa contra instabilidades decorrentes de divergências pessoais ou eventos imprevistos, preservando o valor do negócio perante o mercado.",
    ],
    legalReference: "Referência Legislativa: Código Civil (Arts. 1.052 a 1.087) e Lei das Sociedades por Ações (Lei nº 6.404/1976, Art. 118).",
  },
];
