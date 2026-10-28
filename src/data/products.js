/**
 * Portfólio de Soluções Biológicas Biopar
 * Categorias: Biofungicidas, Bioinseticidas e Promotores de Crescimento.
 */

export const categories = [
  {
    id: 'biofungicidas',
    image: './static/products/category-biofungicidas.jpg',
    name: 'Biofungicidas',
    tagline: 'Fungicidas Microbiológicos de Alta Eficácia',
    description: 'Controle microbiológico e multifatorial de doenças radiculares e foliares, como mofo-branco, fusariose e rizoctoniose.',
    icon: 'shield-check',
    badge: 'Proteção Fúngica',
    productIds: ['trixma', 'bpr-tricho', 'bpr-harzi-one-graf', 'bpr-tricho-10']
  },
  {
    id: 'bioinseticidas',
    image: './static/products/category-bioinseticidas.jpg',
    name: 'Bioinseticidas',
    tagline: 'Tecnologia Biológica que Desafia as Pragas',
    description: 'Fungos entomopatogênicos para manejo integrado de pragas de alto impacto, como cigarrinhas, percevejos e outros sugadores.',
    icon: 'bug',
    badge: 'Controle de Pragas',
    productIds: ['mb-control', 'bpr-beauveria', 'bpr-metha']
  },
  {
    id: 'promotores-de-crescimento',
    image: './static/products/category-promotores.jpg',
    name: 'Promotores de Crescimento',
    tagline: 'Inoculantes e Solubilizadores Biológicos',
    description: 'Bactérias promotoras de crescimento, fixação biológica de nitrogênio (FBN), solubilização de fósforo e mitigação de estresse hídrico.',
    icon: 'sparkles',
    badge: 'Produtividade & Nutrição',
    productIds: ['bpr-azo', 'bpr-brad', 'bpr-tetra']
  }
];

export const products = [
  // ==========================================
  // BIOFUNGICIDAS
  // ==========================================
  {
    id: 'trixma',
    slug: 'trixma',
    image: './static/products/hero-trixma.jpg',
    name: 'TRIXMA®',
    category: 'Biofungicidas',
    categorySlug: 'biofungicidas',
    productType: 'Fungicida Microbiológico',
    tagline: 'Proteção biológica multifatorial para semente, raiz, palhada e rizosfera.',
    speciesHighlights: '2 Espécies • 4 Cepas',
    microorganisms: 'Trichoderma harzianum + Trichoderma viride',
    formulation: 'Suspensão Concentrada / Líquida',
    packaging: 'Caixa contendo 12 frascos de 1 L. Caixa contendo 4 galões de 5 L.',
    stability: 'Formulação estável com esporos resilientes.',
    organicApproved: true,
    regulatoryNotice: 'Registrado no Ministério da Agricultura e Pecuária – MAPA sob nº 55425. Produto improvável de causar dano agudo à saúde humana, animal e pouco perigoso ao meio ambiente. Uso exclusivamente agrícola.',
    composition: [
      { name: 'Trichoderma harzianum', strain: 'cepa IBLF 1278', concentration: '0,5 × 10⁸ UFC/mL' },
      { name: 'Trichoderma harzianum', strain: 'cepa IBLF 1282', concentration: '0,5 × 10⁸ UFC/mL' },
      { name: 'Trichoderma viride', strain: 'cepa IBLF 1275', concentration: '0,5 × 10⁸ UFC/mL' },
      { name: 'Trichoderma viride', strain: 'cepa IBLF 1276', concentration: '0,5 × 10⁸ UFC/mL' }
    ],
    cropsAndTargets: 'Em todas as culturas com ocorrência dos alvos biológicos: Fusarium oxysporum e Rhizoctonia solani.',
    targets: [
      { name: 'Fusarium oxysporum', commonName: 'Fusariose / Podridão radicular' },
      { name: 'Rhizoctonia solani', commonName: 'Rizoctoniose / Tombamento' }
    ],
    dosageTable: [
      { modality: 'Uso preventivo', dose: '0,210 L p.c./ha', timing: 'Aplicação preventiva em área total' },
      { modality: 'Tratamento de sementes', dose: '0,105 L p.c./100 kg sementes', timing: 'Direto no tratamento pré-plantio' },
      { modality: 'Tubérculo no sulco de plantio', dose: '0,030 L p.c./ha', timing: 'Dirigido ao sulco de plantio' },
      { modality: 'Camalhão', dose: '0,090 L p.c./ha', timing: 'Aplicação orientada ao camalhão' },
      { modality: 'Pulverizado', dose: '1,4 L p.c./ha', timing: 'Pulverização foliar / área total' }
    ],
    modeOfAction: {
      summary: 'Atua de forma combinada sobre patógenos e ambiente radicular através de múltiplos mecanismos biológicos, enzimáticos e fisiológicos.',
      points: [
        'Redução da incidência e da severidade das doenças que afetam raízes e tecidos vasculares das plantas.',
        'Diminuição do potencial de inóculo dos patógenos no solo, através da colonização da palhada e da rizosfera, contribuindo para um ambiente mais equilibrado ao redor das raízes.',
        'Competição ativa por espaço e nutrientes, dificultando o desenvolvimento e o estabelecimento dos fungos causadores de doenças.',
        'Ação antagônica direta sobre os patógenos, por meio da secreção de metabólitos e enzimas com atividade biológica.',
        'Micoparasitismo dos fungos fitopatogênicos, auxiliando diretamente na supressão dos agentes causadores das doenças.',
        'Modo de ação multifatorial, combinando mecanismos biológicos, enzimáticos e fisiológicos no controle integrado de patógenos.',
        'Maior equilíbrio microbiológico da rizosfera, favorecendo o estabelecimento de microrganismos benéficos.',
        'Proteção robusta do sistema radicular, auxiliando na manutenção de raízes mais saudáveis, vigorosas e funcionais.',
        'Maior segurança para o desenvolvimento inicial da cultura, especialmente em áreas com histórico de doenças de solo.',
        'Contribuição fundamental para a manutenção do potencial produtivo, ao reduzir os danos provocados por patógenos radiculares.'
      ]
    },
    benefits: [
      'Rápida colonização da palhada e da rizosfera.',
      'Eficácia comprovada contra Fusarium e Rhizoctonia.',
      '2 espécies sinérgicas de Trichoderma na mesma formulação.',
      '4 cepas selecionadas de Trichoderma que ampliam a proteção.',
      'Proteção integral da semente e das raízes contra patógenos.',
      'Esporos altamente resilientes em uma formulação estável.',
      'Produto biológico registrado no MAPA e aprovado para agricultura orgânica.'
    ],
    applicationConditions: {
      climate: 'Evitar ventos fortes (>10 km/h), horas mais quentes do dia, temperatura acima de 27 °C e umidade relativa abaixo de 50%.',
      tips: 'Priorizar aplicação nas horas mais frescas do dia ou em dias nublados para preservar a viabilidade dos propágulos biológicos.'
    },
    imagePlaceholders: {
      packshot: { label: 'Imagem do Frasco / Galão TRIXMA®', hint: 'Reservado para foto do produto comercial com fundo transparente/clean' },
      infographic: { label: 'Diagrama de Ação Multifatorial', hint: 'Reservado para infográfico de colonização de raízes e palhada' }
    }
  },

  {
    id: 'bpr-tricho',
    slug: 'bpr-tricho',
    image: './static/products/hero-bpr-tricho.jpg',
    name: 'BPR TRICHO',
    category: 'Biofungicidas',
    categorySlug: 'biofungicidas',
    productType: 'Fungicida Microbiológico',
    tagline: 'Controle biológico do mofo-branco com Trichoderma harzianum IB 19/17.',
    speciesHighlights: '1 Espécie • 1 Cepa • 5 × 10⁹ conídios/mL',
    microorganisms: 'Trichoderma harzianum • IB 19/17',
    formulation: 'Suspensão Concentrada (SC)',
    packaging: 'Caixa contendo 12 frascos de 1 L. Caixa contendo 4 galões de 5 L.',
    stability: 'Formulação estável e com esporos resilientes para amplo uso na agricultura.',
    organicApproved: true,
    regulatoryNotice: 'Registro MAPA nº 15826. Produto improvável de causar dano agudo à saúde humana, animal e pouco perigoso ao meio ambiente. Uso exclusivamente agrícola.',
    composition: [
      { name: 'Trichoderma harzianum', strain: 'cepa IB 19/17', concentration: '5 × 10⁹ conídios viáveis/mL' }
    ],
    cropsAndTargets: 'Em todas as culturas com ocorrência do alvo biológico: Sclerotinia sclerotiorum (mofo-branco, podridão-de-sclerotinia ou podridão branca).',
    targets: [
      { name: 'Sclerotinia sclerotiorum', commonName: 'Mofo-branco / Podridão-de-sclerotinia' }
    ],
    dosageTable: [
      { modality: 'Dose recomendada geral', dose: '0,400 L p.c./ha', timing: 'Aplicação preventiva ou início da ocorrência do alvo biológico' }
    ],
    modeOfAction: {
      summary: 'Ação biológica multifatorial sobre o patógeno e o ambiente radicular com degradação direta da parede celular dos fungos.',
      points: [
        'Controle biológico altamente eficiente do mofo-branco (Sclerotinia sclerotiorum).',
        'Pode ser utilizado em todas as culturas com ocorrência do patógeno alvo.',
        'Coloniza ativamente a rizosfera e o tecido radicular, estabelecendo-se próximo às raízes das plantas.',
        'Compete intensamente por espaço e nutrientes, inibindo e reduzindo a proliferação dos fungos patogênicos no solo.',
        'Atua por micoparasitismo, aderindo às hifas dos patógenos.',
        'Degrada ativamente a parede celular dos fungos causadores de doenças.',
        'Modo de ação biológico e multifatorial, contribuindo para um manejo fitossanitário mais sustentável.',
        'Excelente ferramenta para o Manejo Integrado de Doenças (MID) e diversificação dos mecanismos de controle.',
        'Colabora com estratégias de manejo da resistência: não causa fitotoxicidade às plantas e não é tóxico ao meio ambiente.',
        'Produto aprovado para uso na agricultura orgânica.'
      ]
    },
    benefits: [
      'Controle biológico eficiente para Sclerotinia sclerotiorum (mofo-branco).',
      'Indicado para todas as culturas agrícolas com ocorrência do alvo.',
      'Coloniza vigorosamente a rizosfera e o tecido radicular das plantas.',
      'Degrada a parede celular dos fungos causadores de doenças.',
      'Excelente ferramenta para compor o Manejo Integrado de Doenças (MID).',
      'Formulação estável e com esporos resilientes para alta eficiência no campo.',
      'Produto biológico registrado e certificado para agricultura orgânica.'
    ],
    applicationConditions: {
      climate: 'Evitar ventos fortes (>10 km/h), horas mais quentes do dia, temperatura acima de 27 °C e umidade relativa abaixo de 50%.',
      tips: 'Pulverizar com boa cobertura de calda sobre solo, restos culturais e dossel vegetal.'
    },
    imagePlaceholders: {
      packshot: { label: 'Imagem do Frasco BPR TRICHO', hint: 'Reservado para foto de embalagem de 1L ou galão de 5L' },
      infographic: { label: 'Foto de Campo / Inibição de Escleródios', hint: 'Reservado para imagem de campo demonstrando ação sobre mofo-branco' }
    }
  },

  {
    id: 'bpr-harzi-one-graf',
    slug: 'bpr-harzi-one-graf',
    image: './static/products/hero-bpr-harzi-one-graf.jpg',
    name: 'BPR HARZI ONE GRAF',
    category: 'Biofungicidas',
    categorySlug: 'biofungicidas',
    productType: 'Fungicida Microbiológico',
    tagline: 'Controle microbiológico do mofo-branco com Trichoderma harzianum IB19/17.',
    speciesHighlights: '1 Espécie • 1 Isolado • Pó Molhável (WP)',
    microorganisms: 'Trichoderma harzianum • IB19/17',
    formulation: 'Pó Molhável (WP)',
    packaging: 'Conteúdo: vide rótulo / sacos de 1 kg.',
    stability: 'Estabilidade de até 12 meses sob temperaturas entre 5 °C e 24 °C.',
    organicApproved: true,
    regulatoryNotice: 'Categoria 5 – Produto improvável de causar dano agudo. Classe IV – Pouco perigoso ao meio ambiente. Produto fitossanitário dispensado de receituário agronômico com uso aprovado pela agricultura orgânica.',
    composition: [
      { name: 'Trichoderma harzianum', strain: 'isolado IB19/17', concentration: 'Mínimo de 1,33 × 10⁹ conídios viáveis/g (100 g/kg - 10% m/m)' },
      { name: 'Outros ingredientes', strain: 'Veículo inerte', concentration: '900 g/kg (90% m/m)' }
    ],
    cropsAndTargets: 'Em todas as culturas com ocorrência do alvo biológico: Sclerotinia sclerotiorum (mofo-branco).',
    targets: [
      { name: 'Sclerotinia sclerotiorum', commonName: 'Mofo-branco' }
    ],
    dosageTable: [
      { modality: 'Dose recomendada geral', dose: '1,5 kg p.c./ha', timing: 'Equivale a 2 × 10¹² conídios viáveis/ha • Realizar 2 aplicações • Calda de 200 L/ha quando pertinente' },
      { modality: 'Cultura da Soja', dose: '1,5 kg p.c./ha', timing: '1ª aplicação em V3 e 2ª aplicação em R1' },
      { modality: 'Cultura do Feijão', dose: '1,5 kg p.c./ha', timing: '1ª aplicação em V3 e 2ª aplicação em R5' },
      { modality: 'Aplicação Aérea', dose: '1,5 kg p.c./ha', timing: 'Volume de calda entre 30 e 50 L/ha' }
    ],
    modeOfAction: {
      summary: 'Tripla ação: colonização + competição + micoparasitismo agressivo no controle do mofo-branco.',
      points: [
        'Eficácia comprovada para o controle do mofo-branco (Sclerotinia sclerotiorum).',
        'Pode ser usado em todas as culturas com ocorrência do alvo biológico.',
        'Coloniza a rizosfera e o tecido radicular, estabelecendo-se próximo às raízes.',
        'Compete com fungos patogênicos por espaço e nutrientes vitais.',
        'Realiza micoparasitismo, aderindo com afinidade às hifas dos fungos fitopatogênicos.',
        'Degrada ativamente a parede celular dos fungos causadores de doenças.',
        'Realizar duas aplicações estratégicas, preferencialmente nas horas mais frescas do dia.'
      ]
    },
    benefits: [
      'Eficácia comprovada no controle de Sclerotinia sclerotiorum (mofo-branco).',
      'Indicado para todas as culturas agrícolas com ocorrência de mofo-branco.',
      'Coloniza a rizosfera e o tecido radicular das plantas.',
      'Compete intensamente com fungos patogênicos por espaço e nutrientes.',
      'Atua por micoparasitismo e degrada a parede celular dos patógenos.',
      'Formulação pó molhável estável por até 12 meses entre 5 °C e 24 °C.',
      'Produto fitossanitário aprovado para agricultura orgânica.'
    ],
    applicationConditions: {
      climate: 'Preferir fim da tarde ou dias nublados. Pulverização: UR > 55%, temperatura < 30 °C e vento entre 3 e 10 km/h.',
      tips: 'Na aplicação aérea, manter volume de calda entre 30 e 50 L/ha com bicos regulados para gotas adequadas.'
    },
    imagePlaceholders: {
      packshot: { label: 'Imagem da Embalagem BPR HARZI ONE GRAF (WP)', hint: 'Reservado para foto do pacote pó molhável' },
      infographic: { label: 'Cronograma Fenológico Soja / Feijão (V3, R1, R5)', hint: 'Reservado para infográfico das épocas de aplicação' }
    }
  },

  {
    id: 'bpr-tricho-10',
    slug: 'bpr-tricho-10',
    image: './static/products/hero-bpr-tricho-10.jpg',
    name: 'BPR TRICHO 10',
    category: 'Biofungicidas',
    categorySlug: 'biofungicidas',
    productType: 'Fungicida Microbiológico',
    tagline: 'Alta concentração de Trichoderma harzianum IB19/17 para o controle do mofo-branco.',
    speciesHighlights: '1 Espécie • 1 Isolado • 2,0 × 10¹⁰ conídios/mL',
    microorganisms: 'Trichoderma harzianum • IB19/17',
    formulation: 'Suspensão Concentrada (SC)',
    packaging: 'Conteúdo: vide rótulo / frascos de 1 L.',
    stability: 'Estabilidade de até 12 meses entre 5 °C e 24 °C.',
    organicApproved: true,
    regulatoryNotice: 'Categoria 5 – Produto improvável de causar dano agudo. Classe IV – Pouco perigoso ao meio ambiente. Produto fitossanitário dispensado de receituário agronômico com uso aprovado pela agricultura orgânica.',
    composition: [
      { name: 'Trichoderma harzianum', strain: 'isolado IB19/17', concentration: 'Mínimo de 2,0 × 10¹⁰ conídios viáveis/mL (40 g/L - 3,63% m/v)' },
      { name: 'Outros ingredientes', strain: 'Veículo formulado', concentration: '1060,4 g/L (96,36% m/v)' }
    ],
    cropsAndTargets: 'Em todas as culturas agrícolas com ocorrência do alvo biológico: Sclerotinia sclerotiorum (mofo-branco).',
    targets: [
      { name: 'Sclerotinia sclerotiorum', commonName: 'Mofo-branco' }
    ],
    dosageTable: [
      { modality: 'Dose recomendada', dose: '0,100 L p.c./ha', timing: 'Volume de calda: 200 L/ha quando pertinente • Realizar duas aplicações' },
      { modality: 'Cultura da Soja', dose: '0,100 L p.c./ha', timing: '1ª aplicação em V3 e 2ª aplicação em R1' },
      { modality: 'Cultura do Feijão', dose: '0,100 L p.c./ha', timing: '1ª aplicação em V3 e 2ª aplicação em R5' },
      { modality: 'Aplicação Aérea', dose: '0,100 L p.c./ha', timing: 'Volume de calda: 30 a 50 L/ha' }
    ],
    modeOfAction: {
      summary: 'Máxima concentração de inóculo ativo com colonização rápida, competição vigorosa e micoparasitismo letal.',
      points: [
        'Eficácia superior comprovada para o controle do mofo-branco (Sclerotinia sclerotiorum).',
        'Pode ser utilizado em todas as culturas com ocorrência do alvo biológico.',
        'Coloniza rapidamente a rizosfera e o tecido radicular, blindando raízes e colo.',
        'Compete ferrenhamente com fungos patogênicos por espaço físico e nutrientes.',
        'Realiza micoparasitismo, aderindo firmemente às hifas patogênicas.',
        'Degrada enzimaticamente a parede celular dos fungos causadores de podridões.',
        'Aplicar preferencialmente nas horas mais frescas do dia ou em dias nublados.'
      ]
    },
    benefits: [
      'Eficácia comprovada para o controle de Sclerotinia sclerotiorum (mofo-branco).',
      'Pode ser utilizado em todas as culturas com ocorrência do alvo.',
      'Concentração ultra elevada: mínimo de 2,0 × 10¹⁰ conídios viáveis/mL.',
      'Menor volume de produto transportado e manuseado na fazenda (alta densidade).',
      'Coloniza a rizosfera e o tecido radicular das plantas.',
      'Compete intensamente com fungos patogênicos e atua por micoparasitismo.',
      'Produto formulado estável por até 12 meses entre 5 °C e 24 °C.',
      'Produto fitossanitário com uso aprovado pela agricultura orgânica.'
    ],
    applicationConditions: {
      climate: 'Pulverização: UR > 55%, temperatura < 30 °C e vento entre 3 e 10 km/h. Evitar ventos fortes e as horas mais quentes.',
      tips: 'Em aplicação aérea utilizar volume entre 30 e 50 L/ha de calda.'
    },
    imagePlaceholders: {
      packshot: { label: 'Imagem do Frasco BPR TRICHO 10', hint: 'Reservado para foto do produto de alta concentração' },
      infographic: { label: 'Comparativo de Densidade Conidial', hint: 'Reservado para gráfico de 2,0 × 10¹⁰ conídios/mL' }
    }
  },

  // ==========================================
  // BIOINSETICIDAS
  // ==========================================
  {
    id: 'mb-control',
    slug: 'mb-control',
    image: './static/products/hero-mb-control.jpg',
    name: 'MB CONTROL®',
    category: 'Bioinseticidas',
    categorySlug: 'bioinseticidas',
    productType: 'Inseticida Microbiológico',
    tagline: 'Beauveria bassiana IBCB 66 + Metarhizium anisopliae IBCB 425 para o controle biológico de pragas.',
    speciesHighlights: '2 Espécies • 2 Isolados Entomopatogênicos',
    microorganisms: 'Beauveria bassiana IBCB 66 • Metarhizium anisopliae IBCB 425',
    formulation: 'Suspensão / Calda Pronta',
    packaging: 'Caixa contendo 12 frascos de 1 L. Caixa contendo 4 galões de 5 L.',
    stability: 'Formulação estabilizada e altamente compatível para mistura e pulverização.',
    organicApproved: true,
    regulatoryNotice: 'Registrado no MAPA sob nº 20525. Produto biológico aprovado para agricultura orgânica. Uso exclusivamente agrícola.',
    composition: [
      { name: 'Beauveria bassiana', strain: 'isolado IBCB 66', concentration: '1,5 × 10⁵ UFC/mL' },
      { name: 'Metarhizium anisopliae', strain: 'isolado IBCB 425', concentration: '1,5 × 10⁵ UFC/mL' }
    ],
    cropsAndTargets: 'Uso em todas as culturas com ocorrência dos alvos biológicos: Deois flavopicta e Percevejo-marrom (Euschistus heros).',
    targets: [
      { name: 'Deois flavopicta', commonName: 'Cigarrinha-das-pastagens' },
      { name: 'Euschistus heros', commonName: 'Percevejo-marrom da soja' }
    ],
    dosageTable: [
      { modality: 'Dose recomendada por hectare', dose: '0,133 a 0,200 L/ha', timing: 'Aplicar conforme recomendação técnica respeitando alvos e condições climáticas' }
    ],
    modeOfAction: {
      summary: 'Infecção direta por contato, germinação na cutícula, colonização interna e ação microbiológica complementar de duas espécies.',
      points: [
        'Os fungos infectam a praga diretamente pela superfície do corpo, sem depender de ingestão.',
        'Os conídios germinam e penetram naturalmente pela cutícula do inseto.',
        'A combinação de Beauveria bassiana e Metarhizium anisopliae amplia a estratégia biológica.',
        'Após a penetração, os fungos colonizam internamente a cavidade celômica da praga.',
        'A colonização provoca alterações fisiológicas severas que levam o inseto à morte.',
        'Pode atuar sobre ninfas e adultos expostos, conforme a suscetibilidade e o ambiente.',
        'A mortalidade dos insetos contribui de forma decisiva para quebrar o ciclo populacional da praga.',
        'O modo de ação biológico auxilia programas de manejo de resistência a defensivos químicos.',
        'Pode integrar perfeitamente estratégias culturais, biológicas e químicas no Manejo Integrado de Pragas (MIP).',
        'Em condições ambientais favoráveis, ocorre esporulação externa sobre o cadáver do inseto, disseminando novos conídios na lavoura (epizootia).'
      ]
    },
    benefits: [
      'Ação de choque e residual por contato durante ou após a aplicação na área tratada.',
      'Dupla ação microbiológica complementar de Beauveria bassiana e Metarhizium anisopliae.',
      'Duas espécies consagradas de fungos entomopatogênicos na mesma formulação equilibrada.',
      'Potencial de multiplicação dos fungos sobre o próprio inseto praga, ampliando o controle na área.',
      'Esporos resilientes desenvolvidos para aplicação prática em pulverizadores agrícolas.',
      'Formulação estabilizada e compatível para mistura de calda e pulverização uniforme.',
      'Produto biológico registrado e certificado para agricultura orgânica.'
    ],
    applicationConditions: {
      climate: 'Evitar ventos > 10 km/h, horas mais quentes do dia, temperatura > 27 °C e umidade relativa < 50%.',
      tips: 'Priorizar aplicações no final da tarde ou em noites úmidas, facilitando a germinação dos conídios.'
    },
    imagePlaceholders: {
      packshot: { label: 'Imagem do Frasco MB CONTROL®', hint: 'Reservado para foto do produto comercial' },
      infographic: { label: 'Ciclo de Infecção Entomopatogênica', hint: 'Reservado para diagrama do contato, penetração cuticular e esporulação' }
    }
  },

  {
    id: 'bpr-beauveria',
    slug: 'bpr-beauveria',
    image: './static/products/hero-bpr-beauveria.jpg',
    name: 'BPR BEAUVERIA®',
    category: 'Bioinseticidas',
    categorySlug: 'bioinseticidas',
    productType: 'Inseticida e Acaricida Microbiológico',
    tagline: 'Desempenho de Beauveria bassiana IBCB 66 no controle de Dalbulus maidis em milho safrinha.',
    speciesHighlights: 'Até 70% de Eficiência aos 5 DAA • Cassilândia, MS',
    microorganisms: 'Beauveria bassiana • Isolado IBCB 66',
    formulation: 'Líquida / Suspensão Concentrada',
    packaging: 'Conteúdo: 1 Litro.',
    stability: 'Conídios de alta pureza e viabilidade.',
    organicApproved: true,
    regulatoryNotice: 'Registro informado no card técnico: MAPA nº 15826. Produto improvável de causar dano agudo. Uso exclusivamente agrícola.',
    composition: [
      { name: 'Beauveria bassiana', strain: 'isolado IBCB 66', concentration: 'Formulação pura com isolado padrão agronômico IBCB 66' }
    ],
    cropsAndTargets: 'Milho safrinha e demais culturas com ocorrência de Dalbulus maidis (cigarrinha-do-milho).',
    targets: [
      { name: 'Dalbulus maidis', commonName: 'Cigarrinha-do-milho (vetora de enfezamentos)' }
    ],
    dosageTable: [
      { modality: 'Ensaio técnico - 0,5 L/ha', dose: '0,5 L/ha', timing: 'Redução média para 22 cigarrinhas aos 5 DAA (vs 45,5 da testemunha)' },
      { modality: 'Ensaio técnico - 2,0 L/ha', dose: '2,0 L/ha', timing: 'Redução média para 16,7 cigarrinhas aos 5 DAA' },
      { modality: 'Destaque de eficácia no estudo', dose: '4 × 10¹² conídios viáveis/ha', timing: 'Alcançou até 70% de eficiência aos 5 dias após a primeira aplicação' }
    ],
    modeOfAction: {
      summary: 'Eficiência comprovada, quebra rápida da pressão populacional e persistência de controle no milho safrinha.',
      points: [
        'O ensaio de campo avaliou rigorosamente o controle de Dalbulus maidis no milho safrinha (Cassilândia, MS).',
        'A eficiência aos 5 DAA variou entre 42% e 70% entre os tratamentos apresentados.',
        'O ensaio destaca 70% de eficiência aos 5 DAA na dose de 4 × 10¹² conídios viáveis/ha.',
        'O controle médio observado de D. maidis no estudo situou-se entre 56% e 70%.',
        'A testemunha não tratada apresentou média de 45,5 cigarrinhas aos 5 DAA.',
        'Com dose de 0,5 L/ha, a média reduziu-se para 22 cigarrinhas.',
        'Com dose de 2 L/ha, a média caiu para apenas 16,7 cigarrinhas.',
        'A eficiência permaneceu consistente em 42% aos 10 DAA no ensaio de persistência.',
        'Fonte bibliográfica do ensaio: Silva et al. (2009), Bol. San. Veg. Pragas 35: 657–664.'
      ]
    },
    benefits: [
      'Eficiência de até 70% aos 5 dias após a primeira aplicação.',
      'Controle expressivo de Dalbulus maidis mantido entre 56% e 70% no estudo.',
      'Persistência prolongada de eficiência superior a 42% até 10 dias após a aplicação.',
      'Queda acentuada da pressão populacional da cigarrinha em relação à testemunha (de 45,5 para 16,7).',
      'Agente biológico de referência à base do consagrado isolado IBCB 66 de Beauveria bassiana.',
      'Desempenho comprovado em condições reais de campo no milho safrinha.',
      'Ferramenta microbiológica de alto valor estratégico para compor o MIP Milho.'
    ],
    applicationConditions: {
      climate: 'Aplicar conforme recomendação técnica de bula com foco em gotas que atinjam o cartucho e folhas do milho.',
      tips: 'As doses descritas referem-se aos tratamentos do ensaio técnico do estudo fornecido.'
    },
    imagePlaceholders: {
      packshot: { label: 'Imagem do Frasco BPR BEAUVERIA®', hint: 'Reservado para foto do produto em frasco de 1L' },
      infographic: { label: 'Gráfico do Ensaio Científico (Silva et al.)', hint: 'Reservado para gráfico de barras 45,5 → 16,7 cigarrinhas e curva de persistência aos 10 DAA' }
    }
  },

  {
    id: 'bpr-metha',
    slug: 'bpr-metha',
    image: './static/products/hero-bpr-metha.jpg',
    name: 'BPR METHA',
    category: 'Bioinseticidas',
    categorySlug: 'bioinseticidas',
    productType: 'Inseticida Microbiológico',
    tagline: 'Metarhizium anisopliae IBCB 425 para o controle biológico de cigarrinhas.',
    speciesHighlights: '1 Espécie • 1 Isolado • Mínimo 1 × 10⁹ conídios/mL',
    microorganisms: 'Metarhizium anisopliae • IBCB 425',
    formulation: 'Suspensão Concentrada (SC)',
    packaging: 'Conteúdo: vide rótulo / frascos de 1 L.',
    stability: 'Armazenamento: entre 5 °C e 27 °C por até 150 dias.',
    organicApproved: true,
    regulatoryNotice: 'Categoria 5 – Produto improvável de causar dano agudo. Classe IV – Pouco perigoso ao meio ambiente. Produto fitossanitário dispensado de receituário agronômico com uso aprovado pela agricultura orgânica.',
    composition: [
      { name: 'Metarhizium anisopliae', strain: 'isolado IBCB 425', concentration: 'Mínimo de 1 × 10⁹ conídios viáveis/mL (100 g/L - 9,20% m/v)' },
      { name: 'Outros ingredientes', strain: 'Veículo formulado', concentration: '986 g/L (90,80% m/v)' }
    ],
    cropsAndTargets: 'Cana-de-açúcar: cigarrinha-da-raiz (Mahanarva fimbriolata). Pastagens: cigarrinha-das-pastagens (Zulia entreriana e Deois flavopicta).',
    targets: [
      { name: 'Mahanarva fimbriolata', commonName: 'Cigarrinha-da-raiz (cana-de-açúcar)' },
      { name: 'Zulia entreriana', commonName: 'Cigarrinha-das-pastagens' },
      { name: 'Deois flavopicta', commonName: 'Cigarrinha-dos-capinzais' }
    ],
    dosageTable: [
      { modality: 'Cana-de-açúcar (Mahanarva fimbriolata)', dose: '1 L/ha', timing: 'Calda de 200–300 L/ha. Monitorar ninfas após as primeiras chuvas; realizar duas aplicações por ciclo' },
      { modality: 'Pastagens (Zulia entreriana)', dose: '1 L/ha', timing: 'Calda de 200–300 L/ha. Monitorar ninfas após primeiras chuvas; realizar duas aplicações por ano' },
      { modality: 'Pastagens com Brachiaria decumbens (Deois flavopicta)', dose: '16 L/ha', timing: 'Calda de 300 L/ha (equivalente a 1 × 10¹² e 16 × 10¹² conídios/ha). Realizar conforme necessidade' }
    ],
    modeOfAction: {
      summary: 'Pulverização líquida de alta viabilidade com infecção por contato sobre ninfas e adultos nas horas mais frescas.',
      points: [
        'Cana-de-açúcar: monitorar o surgimento de ninfas espumosas após o início das primeiras chuvas e aplicar ao detectar a praga.',
        'Para Mahanarva fimbriolata, realizar duas aplicações por ciclo da cultura da cana.',
        'Pastagens com Zulia entreriana: monitorar ninfas após as primeiras chuvas e realizar duas aplicações anuais.',
        'Para Deois flavopicta em Brachiaria decumbens, realizar aplicação conforme a necessidade de controle da infestação.',
        'Aplicar com pulverizador hidropneumático tratorizado ou tracionado com bicos calibrados.',
        'Buscar excelente cobertura da parte aérea sem provocar escorrimento da calda.',
        'Aplicar preferencialmente no final da tarde ou à noite, em dias nublados ou com garoa fina.',
        'Limpar muito bem tanque e bicos para eliminar quaisquer resíduos de defensivos químicos.',
        'Diluir no volume de calda recomendado, manter a agitação constante e aplicar logo após o preparo.'
      ]
    },
    benefits: [
      'Controle microbiológico eficaz de cigarrinha-da-raiz, cigarrinha-das-pastagens e cigarrinha-dos-capinzais.',
      'Amplo espectro de aplicação em culturas com ocorrência dos alvos previstos em bula.',
      'Alta concentração mínima garantida de 1 × 10⁹ conídios viáveis/mL.',
      'Aplicação líquida homogênea com excelente cobertura da base e parte aérea das plantas.',
      'Recomendado para pulverização nas horas mais frescas, preservando ao máximo a viabilidade conidial.',
      'Não causa nenhum efeito fitotóxico quando utilizado rigorosamente conforme as recomendações de bula.',
      'Produto fitossanitário com uso aprovado pela agricultura orgânica.'
    ],
    applicationConditions: {
      climate: 'Evitar vento > 10 km/h, temperatura > 27 °C e umidade relativa < 70%.',
      tips: 'Reentrada na área permitida somente após a secagem completa da calda (no mínimo 24 horas).'
    },
    imagePlaceholders: {
      packshot: { label: 'Imagem do Frasco BPR METHA', hint: 'Reservado para foto do produto em frasco de 1L' },
      infographic: { label: 'Esquema de Aplicação em Cana e Pastagem', hint: 'Reservado para infográfico de bicos e calda dirigida na base da cana' }
    }
  },

  // ==========================================
  // PROMOTORES DE CRESCIMENTO
  // ==========================================
  {
    id: 'bpr-azo',
    slug: 'bpr-azo',
    image: './static/products/hero-bpr-azo.jpg',
    name: 'BPR AZO',
    category: 'Promotores de Crescimento',
    categorySlug: 'promotores-de-crescimento',
    productType: 'Inoculante Líquido (Inoculante Agrícola)',
    tagline: 'Inoculante líquido à base de Azospirillum brasilense para milho e co-inoculação da soja.',
    speciesHighlights: '2 × 10⁸ UFC/mL • Estirpes Ab-V5 e Ab-V6',
    microorganisms: 'Azospirillum brasilense (Estirpes Ab-V5 e Ab-V6)',
    formulation: 'Inoculante Líquido',
    packaging: 'Caixa contendo 4 unidades (bags) de 3 L (60 doses por unidade = 240 doses por caixa).',
    stability: 'Formulação líquida estabilizada para aplicação em sulco ou sementes.',
    organicApproved: true,
    regulatoryNotice: 'Uso exclusivamente agrícola. Produto registrado no Ministério da Agricultura e Pecuária – MAPA PR sob nº 002438-4.000021.',
    composition: [
      { name: 'Azospirillum brasilense', strain: 'Estirpes Ab-V5 e Ab-V6', concentration: '2 × 10⁸ UFC/mL' }
    ],
    cropsAndTargets: 'Produto indicado para a cultura do milho e para co-inoculação da soja.',
    targets: [
      { name: 'Fixação Biológica de Nitrogênio (FBN)', commonName: 'Nutrição nitrogenada e produção de fitormônios' },
      { name: 'Expansão Radicular', commonName: 'Aumento da área e massa radicular' }
    ],
    dosageTable: [
      { modality: 'Cultura do Milho', dose: '100 mL por saca de 60.000 sementes', timing: 'Aplicação diretamente na semente ou em máquinas de aplicação direta no sulco de semeadura' },
      { modality: 'Co-inoculação da Soja', dose: 'Conforme recomendação técnica', timing: 'Co-inoculação associada ao Bradyrhizobium no plantio' }
    ],
    modeOfAction: {
      summary: 'Azospirillum brasilense estirpes Ab-V5 + Ab-V6 fornecendo fixação biológica de nitrogênio e potente síntese de fitormônios de enraizamento.',
      points: [
        'Formulação líquida à base de Azospirillum brasilense reunindo as estirpes consagradas da pesquisa nacional Ab-V5 e Ab-V6.',
        'Concentração bacteriana informada de 2 × 10⁸ UFC/mL.',
        'Pode ser utilizado tanto em máquinas de aplicação direta no sulco de semeadura quanto diretamente nas sementes.',
        'Apresenta aumento cientificamente comprovado na fixação biológica do nitrogênio (FBN) no milho.',
        'Favorece um expressivo incremento na área superficial e na massa total de raízes das plantas.',
        'Amplia significativamente a eficiência de absorção hídrica e de macro e micronutrientes do solo.',
        'Perfeito para co-inoculação na cultura da soja em sinergia com Bradyrhizobium.',
        'Pode ser associado com máxima segurança a outros produtos biológicos do portfólio Biopar.'
      ]
    },
    benefits: [
      'Inoculante líquido puro à base de Azospirillum brasilense.',
      'Combinação balanceada das estirpes Ab-V5 e Ab-V6 com garantia de 2 × 10⁸ UFC/mL.',
      'Flexibilidade operacional: aplicação direta no sulco de semeadura ou no tratamento de sementes.',
      'Comprovado aumento na fixação biológica do nitrogênio (FBN) na cultura do milho.',
      'Proporciona nítido aumento da área e da massa radicular das plantas.',
      'Melhor tolerância da lavoura a veranicos devido ao enraizamento mais profundo.',
      'Pode ser associado livremente a outros produtos biológicos do portfólio.',
      'Produto biológico registrado no MAPA e aprovado como inoculante agrícola.'
    ],
    applicationConditions: {
      climate: 'Manter a calda abrigada do calor direto; aplicar no sulco ou em sementes antes do plantio.',
      tips: 'Para recomendações de uso específicas de co-inoculação, consulte o rótulo e a equipe agronômica.'
    },
    imagePlaceholders: {
      packshot: { label: 'Imagem do Bag BPR AZO (3L)', hint: 'Reservado para foto da embalagem pouch/bag com bocal dosador' },
      infographic: { label: 'Foto Comparativa de Raízes no Milho', hint: 'Reservado para foto de raízes testemunha vs inoculada com BPR AZO' }
    }
  },

  {
    id: 'bpr-brad',
    slug: 'bpr-brad',
    image: './static/products/hero-bpr-brad.jpg',
    name: 'BPR BRAD',
    category: 'Promotores de Crescimento',
    categorySlug: 'promotores-de-crescimento',
    productType: 'Inoculante Agrícola',
    tagline: 'Inoculante líquido à base de Bradyrhizobium japonicum para nodulação e fixação biológica de nitrogênio.',
    speciesHighlights: '7 × 10⁹ UFC/mL • Estirpes 5079 / 5080',
    microorganisms: 'Bradyrhizobium japonicum (Estirpes 5079/5080)',
    formulation: 'Inoculante Líquido',
    packaging: 'Caixa contendo 4 unidades (bags) de 3 L (60 doses por unidade = 240 doses por caixa).',
    stability: 'Elevada viabilidade celular para estocagem e aplicação no campo.',
    organicApproved: true,
    regulatoryNotice: 'Uso exclusivamente agrícola. Produto registrado no Ministério da Agricultura e Pecuária – MAPA PR sob nº 002438-4.000029.',
    composition: [
      { name: 'Bradyrhizobium japonicum', strain: 'Estirpes 5079/5080', concentration: '7 × 10⁹ UFC/mL' }
    ],
    cropsAndTargets: 'Produto indicado para leguminosas, com destaque principal e dosagem específica para a cultura da soja.',
    targets: [
      { name: 'Fixação Biológica de Nitrogênio (FBN)', commonName: 'Suprimento integral de N para a soja' },
      { name: 'Nodulação Radicular', commonName: 'Infecção e formação de nódulos de alta atividade da nitrogenase' }
    ],
    dosageTable: [
      { modality: 'Cultura da Soja (Sementes)', dose: '50 mL para cada 50 kg de sementes', timing: 'Tratamento de sementes pré-plantio ou aplicação no sulco de semeadura' }
    ],
    modeOfAction: {
      summary: 'Infecção específica dos pelos radiculares da soja, diferenciação em bacteroides e formação de nódulos para FBN intensiva.',
      points: [
        'Formulação líquida com altíssima concentração celular de Bradyrhizobium japonicum (7 × 10⁹ UFC/mL).',
        'Reúne as consagradas estirpes 5079 e 5080 recomendadas pela Embrapa para máxima nodulação.',
        'Pode ser aplicado tanto diretamente no sulco de semeadura quanto no tratamento de sementes.',
        'Promove elevada taxa de infecção radicular e rápida formação de nódulos eficientes na raiz principal e secundárias.',
        'Garante aumento comprovado da fixação biológica de nitrogênio (FBN) e da produtividade final de grãos.',
        'Contribui decisivamente para maior produção de biomassa vegetativa das plantas.',
        'Pode ser combinado com BPR AZO em programas avançados de co-inoculação.'
      ]
    },
    benefits: [
      'Inoculante líquido à base de Bradyrhizobium japonicum (5079/5080).',
      'Concentração garantida de 7 × 10⁹ UFC/mL para máxima colonização da semente e sulco.',
      'Uso eficiente em máquinas de aplicação direta no sulco de semeadura e no tratamento de sementes.',
      'Elevada eficácia na infecção e formação rápida de nódulos ativos nas raízes de soja.',
      'Comprovado aumento na fixação biológica de nitrogênio (FBN) e nos tetos de produtividade.',
      'Contribui de forma direta para o aumento do vigor e da biomassa aérea das plantas.',
      'Totalmente compatível para associação a outros bioinsumos do portfólio Biopar.',
      'Produto biológico registrado no MAPA e aprovado como inoculante agrícola.'
    ],
    applicationConditions: {
      climate: 'Evitar exposição das sementes tratadas e bags ao sol direto e calor excessivo.',
      tips: 'Aplicar conforme recomendação técnica e dosagem de 50 mL por 50 kg de sementes.'
    },
    imagePlaceholders: {
      packshot: { label: 'Imagem do Bag BPR BRAD (3L)', hint: 'Reservado para foto da embalagem de inoculante para soja' },
      infographic: { label: 'Foto de Nodulação Radicular na Soja', hint: 'Reservado para foto de raízes com nódulos coroa ativos e avermelhados' }
    }
  },

  {
    id: 'bpr-tetra',
    slug: 'bpr-tetra',
    image: './static/products/hero-bpr-tetra.jpg',
    name: 'BPR TETRA',
    category: 'Promotores de Crescimento',
    categorySlug: 'promotores-de-crescimento',
    productType: 'Solubilizador de Nutrientes',
    tagline: 'Consórcio de Bacillus para solubilização, ciclagem de nutrientes e mitigação de estresse hídrico.',
    speciesHighlights: '4 Bacillus • 1 × 10⁹ UFC/mL • Biofertilidade Total',
    microorganisms: 'B. subtilis • B. megaterium • B. licheniformes • B. aryabhattai',
    formulation: 'Suspensão / Formulação Líquida de Bacillus',
    packaging: '12 unidades de 1 L • 4 unidades de 5 L • 1 unidade de 20 L.',
    stability: 'Esporos bacterianos com estabilidade biológica superior.',
    organicApproved: true,
    regulatoryNotice: 'Uso exclusivamente agrícola. Informações mantidas conforme documentação técnica fornecida. Para recomendação agronômica completa, consulte a equipe Biopar.',
    composition: [
      { name: 'Bacillus subtilis', strain: 'Cepa consórcio', concentration: 'Componente do consórcio' },
      { name: 'Bacillus megaterium', strain: 'Cepa consórcio', concentration: 'Componente do consórcio' },
      { name: 'Bacillus licheniformes', strain: 'Cepa consórcio', concentration: 'Componente do consórcio' },
      { name: 'Bacillus aryabhattai', strain: 'Cepa consórcio', concentration: 'Componente do consórcio' },
      { name: 'Concentração total', strain: 'Consórcio 4 Bacillus', concentration: '1 × 10⁹ UFC/mL' }
    ],
    cropsAndTargets: 'Em aplicações recomendadas para este tipo de produto em tratamento de sementes e sulco de plantio.',
    targets: [
      { name: 'Solubilização de Fósforo e Minerais', commonName: 'Disponibilização de nutrientes retidos na fração mineral' },
      { name: 'Ciclagem de Matéria Orgânica', commonName: 'Degradação acelerada de resíduos culturais e palhada' },
      { name: 'Mitigação de Estresse Hídrico', commonName: 'Produção de biofilmes e exopolissacarídeos (EPS)' }
    ],
    dosageTable: [
      { modality: 'Tratamento de Sementes', dose: '0,100 L a 0,242 L', timing: 'Aplicação homogênea nas sementes via máquinas específicas' },
      { modality: 'Aplicação no Sulco de Semeadura', dose: '0,150 L a 0,363 L', timing: 'Dirigido ao sulco no momento do plantio' }
    ],
    modeOfAction: {
      summary: 'Quatro Bacillus complementares voltados à dinâmica da rizosfera, ciclagem acelerada de nutrientes e proteção fisiológica contra a seca.',
      points: [
        'B. subtilis integra o consórcio microbiológico do BPR TETRA, produzindo fitormônios e substâncias promotoras de crescimento.',
        'B. megaterium atua agressivamente na solubilização do fósforo adsorvido aos coloides do solo através da secreção de ácidos orgânicos.',
        'B. licheniformes atua intensamente nos processos de ciclagem da matéria orgânica e liberação de nutrientes.',
        'B. aryabhattai completa o quarteto sintetizando biofilmes e exopolissacarídeos que mantêm a umidade radicular e mitigam o estresse hídrico.',
        'Concentração total informada: 1 × 10⁹ UFC/mL.',
        'Posicionamento comercial especializado: Solubilizador de nutrientes.',
        'Posicionado tecnicamente também como potente mitigador de estresse hídrico em veranicos.',
        'Favorece a disponibilidade de nutrientes retidos em resíduos de culturas anteriores (palhada).',
        'Promove aumento expressivo da vida microbiana e diversidade biológica nos ambientes onde é aplicado.'
      ]
    },
    benefits: [
      'Solubilizador de alta potência e mitigador de estresse hídrico.',
      'Consórcio exclusivo com quatro espécies comprovadas de Bacillus.',
      'Contribui ativamente para a aceleração da ciclagem de nutrientes no solo.',
      'Atua fortemente na transformação biológica da matéria orgânica.',
      'Favorece a disponibilidade e aproveitamento de nutrientes retidos em resíduos de culturas.',
      'Promove aumento expressivo e duradouro da vida microbiana no ambiente aplicado.',
      'Aplicação versátil indicada via tratamento de sementes e aplicação no sulco.'
    ],
    applicationConditions: {
      climate: 'Utilizar máquinas específicas para aplicação e seguir a recomendação técnica adequada ao sistema de uso.',
      tips: 'Pode ser aplicado no sulco ou em sementes em conjunto com maquinários de dosagem precisa.'
    },
    imagePlaceholders: {
      packshot: { label: 'Imagem do Frasco / Galão BPR TETRA', hint: 'Reservado para foto de embalagem (1L, 5L ou 20L)' },
      infographic: { label: 'Diagrama dos 4 Bacillus na Rizosfera', hint: 'Reservado para representação de B. subtilis, megaterium, licheniformes e aryabhattai' }
    }
  }
];
