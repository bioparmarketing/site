/**
 * Base de Dados Completa de Produtos Biopar
 * Respeita regras regulatórias, taxonomia científica e dados técnicos estruturados.
 */

export const categories = [
  { id: 'inoculantes', name: 'Inoculantes', description: 'Tecnologias microbiológicas voltadas à simbiose e nutrição biológica.' },
  { id: 'biofungicidas', name: 'Biofungicidas', description: 'Microrganismos para controle e manejo sustentável de fitopatógenos.' },
  { id: 'bioinseticidas', name: 'Bioinseticidas', description: 'Biológicos de alta especificidade para o manejo integrado de pragas.' },
  { id: 'bionematicidas', name: 'Bionematicidas', description: 'Bioagentes específicos para supressão de nematoides de solo.' },
  { id: 'solubilizadores', name: 'Solubilizadores de Nutrientes', description: 'Bactérias promotoras de disponibilização de fósforo e minerais.' }
];

export const products = [
  {
    id: 'trichocontrol',
    slug: 'biopar-trichocontrol',
    name: 'Biopar Trichocontrol',
    category: 'Biofungicidas',
    categorySlug: 'biofungicidas',
    microorganismShort: 'Trichoderma harzianum',
    microorganismScientific: 'Trichoderma harzianum (IBL-01)',
    shortDescription: 'Biofungicida e bionematicida de amplo espectro com ação antifúngica, micoparasitismo e indução de defesas naturais da planta.',
    fullDescription: 'Biopar Trichocontrol é um bioagente de excelência formulado com a cepa exclusiva IBL-01 de Trichoderma harzianum. Atua na rizosfera e filoplano através de quatro mecanismos integrados: antibiose, micoparasitismo direto, competição por espaço e nutrientes e ativação das rotas de resistência sistêmica adquirida (SAR).',
    mainPositioning: 'Manejo biológico avançado de patógenos de solo e nematoides, protegendo as raízes desde a germinação.',
    featured: true,
    badge: 'Cepa Exclusiva IBL-01',
    heroImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
    packshotImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    colorAccent: '#0E7051',
    technicalIdentity: {
      categoria: 'Biofungicida / Bionematicida Microbiológico',
      microrganismo: 'Trichoderma harzianum',
      especie: 'harzianum',
      cepa_ou_isolado: 'Isolado IBL-01',
      concentracao: '2 x 10⁹ conídios viáveis/mL',
      formulacao: 'Suspensão Concentrada (SC)',
      registro_mapa: 'PR-002109-4.000089',
      apresentacao: 'Frascos de 1L e Galões de 5L',
      classe_toxicologica: 'Classe V - Pouco Tóxico',
      inflamabilidade: 'Não inflamável',
      prazo_validade: '12 meses sob condições adequadas de armazenamento'
    },
    modeOfAction: {
      summary: 'Ação múltipla: micoparasitismo ativo, produção de quitinases e glucanases, competição na rizosfera e elicitação de fitoalexinas.',
      mechanisms: [
        {
          title: 'Micoparasitismo Enzimático',
          description: 'Hifas de Trichoderma enrolam-se nas hifas dos fungos patogênicos, secretando enzimas hidrolíticas que rompem a parede celular do patógeno.'
        },
        {
          title: 'Supressão de Nematoides',
          description: 'Colonização de ovos e juvenis (J2) de Meloidogyne e Pratylenchus, inviabilizando sua penetração radicular.'
        },
        {
          title: 'Promoção de Crescimento Radicular',
          description: 'Produção de auxinas e ácido indolacético (AIA) que expandem o volume e absorção de água e nutrientes pela planta.'
        }
      ]
    },
    benefits: [
      'Excelente controle de Mofo-branco (Sclerotinia sclerotiorum) e Tombamento (Rhizoctonia)',
      'Supressão expressiva da taxa de reprodução de nematoides das galhas e lesões',
      'Zero intervalo de segurança e reentrada imediata na área tratada',
      'Estabilidade térmica superior em calda de pulverização'
    ],
    crops: [
      {
        name: 'Soja',
        targets: 'Sclerotinia sclerotiorum, Rhizoctonia solani, Pratylenchus brachyurus',
        dose: '0.5 a 1.0 L/ha',
        timing: 'Sulco de plantio e/ou aplicação foliar preventiva no fechamento de entrelinhas (R1)'
      },
      {
        name: 'Feijão',
        targets: 'Sclerotinia sclerotiorum, Fusarium solani',
        dose: '0.7 a 1.0 L/ha',
        timing: 'Tratamento de solo ou pulverização foliar no início do florescimento'
      },
      {
        name: 'Algodão',
        targets: 'Rhizoctonia solani, Meloidogyne incognita',
        dose: '1.0 L/ha',
        timing: 'Aplicação dirigida ao sulco de semeadura'
      },
      {
        name: 'Hortifrúti (HF)',
        targets: 'Fusarium oxysporum, Sclerotium rolfsii, Meloidogyne spp.',
        dose: '1.0 a 2.0 L/ha',
        timing: 'Drench no transplantio ou fertirrigação periódica'
      }
    ],
    targets: [
      { commonName: 'Mofo-branco', scientificName: 'Sclerotinia sclerotiorum', type: 'Fungo' },
      { commonName: 'Rizoctoniose / Tombamento', scientificName: 'Rhizoctonia solani', type: 'Fungo' },
      { commonName: 'Fusariose', scientificName: 'Fusarium oxysporum / solani', type: 'Fungo' },
      { commonName: 'Nematoide-das-galhas', scientificName: 'Meloidogyne incognita', type: 'Nematoide' },
      { commonName: 'Nematoide-das-lesões', scientificName: 'Pratylenchus brachyurus', type: 'Nematoide' }
    ],
    application: {
      sprayVolume: '100 a 150 L/ha em aplicação foliar; 40 a 80 L/ha no sulco',
      waterPh: 'pH ótimo entre 5.5 e 7.2',
      compatibilityNotice: 'Compatível com a maioria dos inseticidas, acaricidas e herbicidas. Não misturar com fungicidas químicos cúpricos ou benzimidazóis na mesma calda sem teste de compatibilidade prévio.',
      recommendedDosageHa: 0.75,
      recommendedUnit: 'L/ha'
    },
    evidence: [
      {
        title: 'Controle de Mofo-Branco em Soja Irrigada',
        institution: 'Instituto de Fitopatologia Aplicada',
        location: 'Cristalina - GO',
        season: 'Safra 2024/2025',
        yieldDelta: '-62%',
        deltaUnit: 'Severidade da Doença',
        controlValue: 42.5,
        treatedValue: 16.1,
        metricName: 'Índice de Severidade (%)',
        notes: 'Aplicação sequencial aos 45 e 60 DAE. Redução de escleródios viáveis no solo em 58% na entressafra.'
      },
      {
        title: 'Redução do Fator de Reprodução de Pratylenchus',
        institution: 'Centro de Estudos Nematológicos AgroBio',
        location: 'Luis Eduardo Magalhães - BA',
        season: 'Safra 2023/2024',
        yieldDelta: '+5.6',
        deltaUnit: 'sc/ha',
        controlValue: 61.4,
        treatedValue: 67.0,
        metricName: 'Produtividade de Soja sob Pressão Nematológica',
        notes: 'Fator de Reprodução (FR) caiu de 3.8 (testemunha) para 1.4 no tratamento Biopar Trichocontrol.'
      }
    ],
    documents: [
      { type: 'bula', title: 'Bula Oficial Biopar Trichocontrol', code: 'BUL-TRICHO-2025', size: '1.8 MB', filename: 'bula_biopar_trichocontrol.pdf' },
      { type: 'ficha', title: 'Ficha de Informações Técnicas', code: 'FIT-TRICHO-01', size: '950 KB', filename: 'ficha_tecnica_biopar_trichocontrol.pdf' },
      { type: 'fispq', title: 'Ficha de Segurança (FISPQ)', code: 'FISPQ-TRICHO-089', size: '610 KB', filename: 'fispq_biopar_trichocontrol.pdf' }
    ],
    relatedProductIds: ['bacillus-shield', 'nematox', 'azos'],
    relatedArticleIds: ['artigo-manejo-mofo-branco', 'artigo-microbioma-solo']
  },
  {
    id: 'bacillus-shield',
    slug: 'biopar-bacillus-shield',
    name: 'Biopar Bacillus Shield',
    category: 'Biofungicidas',
    categorySlug: 'biofungicidas',
    microorganismShort: 'Bacillus subtilis + B. pumilus',
    microorganismScientific: 'Bacillus subtilis (BS-15) + Bacillus pumilus (BP-08)',
    shortDescription: 'Biofungicida foliar com duplo consórcio bacteriano formador de endósporos para proteção contra manchas e ferrugem.',
    fullDescription: 'Biopar Bacillus Shield combina duas cepas sinérgicas de Bacillus (subtilis BS-15 e pumilus BP-08) que produzem biofilmes protetores e lipopeptídeos antimicrobianos (surfactinas, iturinas e fengicinas) sobre a cutícula das folhas, inibindo a germinação de esporos de fungos patogênicos.',
    mainPositioning: 'Barreira biológica foliar e potente elicitor imunológico para manejo integrado de manchas foliares e ferrugens.',
    featured: true,
    badge: 'Consórcio de Endósporos',
    heroImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
    packshotImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    colorAccent: '#107C41',
    technicalIdentity: {
      categoria: 'Biofungicida Microbiológico Foliar',
      microrganismo: 'Bacillus subtilis + Bacillus pumilus',
      especie: 'subtilis / pumilus',
      cepa_ou_isolado: 'BS-15 + BP-08',
      concentracao: '1 x 10¹⁰ UFC/g de endósporos resistentes',
      formulacao: 'Pó Molhável Premium / Dispersível (WP)',
      registro_mapa: 'PR-003290-1.000120',
      apresentacao: 'Sacos aluminizados herméticos de 1 kg e 5 kg',
      classe_toxicologica: 'Classe V - Pouco Tóxico',
      inflamabilidade: 'Não inflamável',
      prazo_validade: '24 meses em temperatura ambiente até 35°C (alta estabilidade)'
    },
    modeOfAction: {
      summary: 'Produção contínua de metabólitos secundários e lipopeptídeos que rompem a membrana de esporos fúngicos.',
      mechanisms: [
        {
          title: 'Formação de Biofilme Epifítico',
          description: 'As bactérias colonizam rapidamente os estômatos e a superfície foliar, impedindo a penetração das estruturas fúngicas.'
        },
        {
          title: 'Secreção de Lipopeptídeos (Surfactinas e Fengicinas)',
          description: 'Ação lítica direta sobre a membrana celular de Phakopsora pachyrhizi e Corynespora casiicola.'
        },
        {
          title: 'Indução de Resistência Sistêmica (ISR)',
          description: 'Ativação das vias do ácido jasmônico e etileno na planta hospedeira, acelerando sua resposta de defesa.'
        }
      ]
    },
    benefits: [
      'Excelente ferramenta anti-resistência para fungicidas químicos sítio-específicos',
      'Termorresistência extrema graças à formulação à base de endósporos puros',
      'Compatibilidade em tanque com fungicidas e fertilizantes foliares',
      'Sem carência para colheita'
    ],
    crops: [
      {
        name: 'Soja',
        targets: 'Phakopsora pachyrhizi, Corynespora casiicola, Cercospora kikuchii',
        dose: '0.2 a 0.5 kg/ha',
        timing: 'Preventivo desde V4/V6 com reaplicações a cada 14-21 dias'
      },
      {
        name: 'Milho',
        targets: 'Puccinia polysora, Exserohilum turcicum, Bipolaris maydis',
        dose: '0.3 a 0.5 kg/ha',
        timing: 'V4 a V8 e pré-pendoamento'
      },
      {
        name: 'Café',
        targets: 'Hemileia vastatrix (Ferrugem-do-cafeeiro), Cercospora coffeicola',
        dose: '0.5 a 1.0 kg/ha',
        timing: 'Preventivo nas épocas chuvosas de maior pressão'
      },
      {
        name: 'Algodão',
        targets: 'Ramularia areola (Ramulária)',
        dose: '0.3 a 0.5 kg/ha',
        timing: 'Aplicações preventivas a cada 12-15 dias'
      }
    ],
    targets: [
      { commonName: 'Ferrugem Asiática da Soja', scientificName: 'Phakopsora pachyrhizi', type: 'Fungo' },
      { commonName: 'Mancha-alvo', scientificName: 'Corynespora casiicola', type: 'Fungo' },
      { commonName: 'Mancha Parda / Cercóspora', scientificName: 'Septoria glycines / Cercospora', type: 'Fungo' },
      { commonName: 'Ferrugem Polissora do Milho', scientificName: 'Puccinia polysora', type: 'Fungo' },
      { commonName: 'Ramulária do Algodoeiro', scientificName: 'Ramularia areola', type: 'Fungo' }
    ],
    application: {
      sprayVolume: '100 a 200 L/ha com bicos que proporcionem cobertura homogênea',
      waterPh: 'pH 5.0 a 7.5',
      compatibilityNotice: 'Altamente compatível com a maioria dos defensivos agrícolas graças à resistência dos endósporos.',
      recommendedDosageHa: 0.35,
      recommendedUnit: 'kg/ha'
    },
    evidence: [
      {
        title: 'Manejo Integrado de Mancha-Alvo em Soja',
        institution: 'Fundação de Apoio à Pesquisa Agropecuária (FAPA)',
        location: 'Guarapuava - PR',
        season: 'Safra 2024/2025',
        yieldDelta: '+4.2',
        deltaUnit: 'sc/ha',
        controlValue: 68.4,
        treatedValue: 72.6,
        metricName: 'Produtividade de Soja em Manejo Integrado',
        notes: 'Associação de fungicida químico triazol/carboxamida com Biopar Bacillus Shield reduziu a dessecação prematura em 22%.'
      }
    ],
    documents: [
      { type: 'bula', title: 'Bula Oficial Biopar Bacillus Shield', code: 'BUL-SHIELD-2025', size: '1.6 MB', filename: 'bula_biopar_bacillus_shield.pdf' },
      { type: 'ficha', title: 'Ficha Técnica de Aplicação', code: 'FIT-SHIELD-01', size: '780 KB', filename: 'ficha_tecnica_biopar_bacillus_shield.pdf' }
    ],
    relatedProductIds: ['trichocontrol', 'metamix', 'beauveril'],
    relatedArticleIds: ['artigo-manejo-antirresistencia', 'artigo-microbioma-solo']
  },
  {
    id: 'azos',
    slug: 'biopar-azos',
    name: 'Biopar Azos',
    category: 'Inoculantes',
    categorySlug: 'inoculantes',
    microorganismShort: 'Azospirillum brasilense',
    microorganismScientific: 'Azospirillum brasilense (Ab-V5 + Ab-V6)',
    shortDescription: 'Inoculante promotor de crescimento vegetal e fixador associativo de nitrogênio para gramíneas e co-inoculação em leguminosas.',
    fullDescription: 'Biopar Azos é desenvolvido com as estirpes comprovadas Ab-V5 e Ab-V6 de Azospirillum brasilense. Estimula a produção endógena de fitormônios vegetais (auxinas, giberelinas e citocininas), promovendo a hipertrofia do sistema radicular e maior capacidade de absorção de água e nutrientes em condições normais e sob estresse hídrico.',
    mainPositioning: 'Expansão radicular vigorosa, tolerância ao estresse hídrico e eficiência no aproveitamento de fertilizantes.',
    featured: true,
    badge: 'Co-Inoculação Campeã',
    heroImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    packshotImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    colorAccent: '#0B7C41',
    technicalIdentity: {
      categoria: 'Inoculante Microbiológico Promotor de Crescimento',
      microrganismo: 'Azospirillum brasilense',
      especie: 'brasilense',
      cepa_ou_isolado: 'Estirpes Ab-V5 e Ab-V6',
      concentracao: '3 x 10⁹ UFC/mL',
      formulacao: 'Líquida Estabilizada (L)',
      registro_mapa: 'PR-006231-5.000078',
      apresentacao: 'Bag-in-box 5L e Galões de 20L',
      classe_toxicologica: 'Não aplicável (Insumo Biológico Registrado)',
      inflamabilidade: 'Não inflamável',
      prazo_validade: '12 meses sob refrigeração ou ambiente fresco (< 25°C)'
    },
    modeOfAction: {
      summary: 'Colonização endofítica e epifítica das raízes com secreção de fitormônios de crescimento e fixação associativa de N.',
      mechanisms: [
        {
          title: 'Síntese de Fitormônios (Auxinas e AIA)',
          description: 'Acelera a emissão de raízes secundárias e pelos absorventes, dobrando a área de contato da raiz com o solo.'
        },
        {
          title: 'Fixação Associativa de N₂',
          description: 'Fornece de 20 a 40 kg de N/ha para culturas como milho, trigo e pastagens.'
        },
        {
          title: 'Mitigação de Estresse Hídrico (Veranicos)',
          description: 'Planta explora camadas mais profundas de solo em busca de água.'
        }
      ]
    },
    benefits: [
      'Aumento de até 20% no volume de massa radicular profunda',
      'Fundamental na co-inoculação de gramíneas e leguminosas',
      'Economia de até 25% na adubação nitrogenada de cobertura em milho e trigo',
      'Acelera o estabelecimento e perfilhamento de pastagens'
    ],
    crops: [
      {
        name: 'Milho',
        targets: 'Promoção de crescimento e fixação de N',
        dose: '100 a 150 mL / 60.000 sementes ou 200 a 300 mL/ha no sulco / foliar em V4',
        timing: 'Tratamento de sementes, sulco de plantio ou pulverização foliar em V3/V4'
      },
      {
        name: 'Soja (Co-Inoculação)',
        targets: 'Promoção de enraizamento e nodulação',
        dose: '100 mL / 50 kg de semente ou 200 mL/ha no sulco',
        timing: 'Aplicação no tratamento de sementes ou sulco de plantio'
      },
      {
        name: 'Trigo e Arroz',
        targets: 'Fixação associativa e enraizamento',
        dose: '100 a 200 mL / 100 kg de sementes',
        timing: 'Tratamento de sementes'
      },
      {
        name: 'Pastagens (Brachiaria)',
        targets: 'Perfilhamento e nutrição vegetal',
        dose: '200 a 300 mL / ha',
        timing: 'Foliar logo após o primeiro pastejo'
      }
    ],
    targets: [
      { commonName: 'Promoção de Crescimento Radicular', scientificName: 'Síntese de auxinas e AIA', type: 'Fisiológico' },
      { commonName: 'Fixação Associativa de Nitrogênio', scientificName: 'Simbiose associativa', type: 'Nutrição Biológica' },
      { commonName: 'Tolerância ao Estresse Hídrico', scientificName: 'Resiliência hídrica', type: 'Fisiológico' }
    ],
    application: {
      sprayVolume: '40 a 100 L/ha no sulco ou pulverização em V3/V4',
      waterPh: 'pH 6.0 a 7.0',
      compatibilityNotice: 'Excelente compatibilidade na calda de co-inoculação.',
      recommendedDosageHa: 0.25,
      recommendedUnit: 'L/ha'
    },
    evidence: [
      {
        title: 'Resposta de Produtividade em Milho Safrinha',
        institution: 'Rede de Ensaios Agronômicos Sul / PR',
        location: 'Cascavel - PR',
        season: 'Safrinha 2024',
        yieldDelta: '+7.3',
        deltaUnit: 'sc/ha',
        controlValue: 114.2,
        treatedValue: 121.5,
        metricName: 'Produtividade Média de Milho Grão',
        notes: 'Incremento estatístico significativo mesmo com redução de 20% do adubo nitrogenado em cobertura.'
      }
    ],
    documents: [
      { type: 'bula', title: 'Bula Oficial Biopar Azos', code: 'BUL-AZOS-2025', size: '1.2 MB', filename: 'bula_biopar_azos.pdf' },
      { type: 'ficha', title: 'Manual de Inoculação e Co-Inoculação', code: 'FIT-AZOS-03', size: '920 KB', filename: 'manual_coinoculacao_biopar.pdf' }
    ],
    relatedProductIds: ['fosfotech', 'trichocontrol'],
    relatedArticleIds: ['artigo-coinoculacao-soja', 'artigo-microbioma-solo']
  },
  {
    id: 'metamix',
    slug: 'biopar-metamix',
    name: 'Biopar Metamix',
    category: 'Bioinseticidas',
    categorySlug: 'bioinseticidas',
    microorganismShort: 'Metarhizium anisopliae',
    microorganismScientific: 'Metarhizium anisopliae (IBCB 425)',
    shortDescription: 'Bioinseticida de contato à base de fungo entomopatogênico para controle de cigarrinhas, pragas de solo e percevejos.',
    fullDescription: 'Biopar Metamix contém conídios puros do fungo entomopatogênico Metarhizium anisopliae (isolado IBCB 425), reconhecido cientificamente pela alta virulência e rapidez na germinação sobre o exoesqueleto de pragas-chave do agro brasileiro, como a cigarrinha-do-milho e cigarrinha-da-raiz.',
    mainPositioning: 'Controle microbiológico de alta eficiência para quebra de ciclos de cigarrinhas e pragas de difícil controle químico.',
    featured: false,
    badge: 'Virulência Comprovada',
    heroImage: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=1200&q=80',
    packshotImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    colorAccent: '#0B7C41',
    technicalIdentity: {
      categoria: 'Bioinseticida Microbiológico Entomopatogênico',
      microrganismo: 'Metarhizium anisopliae',
      especie: 'anisopliae',
      cepa_ou_isolado: 'Isolado IBCB 425',
      concentracao: '5 x 10⁹ conídios viáveis/mL',
      formulacao: 'Óleo Dispersível (OD) / Suspensão Oleosa',
      registro_mapa: 'PR-004455-2.000199',
      apresentacao: 'Bombonas de 5L e 10L',
      classe_toxicologica: 'Classe V - Pouco Tóxico',
      inflamabilidade: 'Não inflamável',
      prazo_validade: '12 meses sob refrigeração ou 6 meses em local fresco (< 20°C)'
    },
    modeOfAction: {
      summary: 'Penetração mecânica e enzimática na cutícula do inseto seguida de colonização da hemocele e morte por micose verde.',
      mechanisms: [
        {
          title: 'Adesão e Germinação Cuticular',
          description: 'Os conídios aderem ao tegumento do inseto e emitem o tubo germinativo com apressório.'
        },
        {
          title: 'Produção de Destruxinas',
          description: 'Liberação de toxinas peptídicas que paralisam a alimentação e o sistema neuromuscular da praga em 48-72h.'
        },
        {
          title: 'Esporulação Epizoótica',
          description: 'Em condições de umidade favorável, o fungo esporula na carcaça do inseto, disseminando o inóculo na lavoura.'
        }
      ]
    },
    benefits: [
      'Eficácia superior no controle de ninfas e adultos da cigarrinha-do-milho (Dalbulus maidis)',
      'Formulações em base oleosa que protegem os conídios contra a dessecação e radiação UV',
      'Seletivo para polinizadores (abelhas) e inimigos naturais (parasitoides e predadores)',
      'Sem geração de resistência cruzada com inseticidas neonicotinoides e piretroides'
    ],
    crops: [
      {
        name: 'Milho',
        targets: 'Dalbulus maidis (Cigarrinha-do-milho), Spodoptera frugiperda',
        dose: '0.5 a 1.0 L/ha',
        timing: 'Início em V1/V2 na primeira detecção de adultos, reaplicando conforme monitoramento'
      },
      {
        name: 'Cana-de-açúcar',
        targets: 'Mahanarva fimbriolata (Cigarrinha-da-raiz)',
        dose: '1.0 a 2.0 L/ha',
        timing: 'Início do período chuvoso na detecção das primeiras ninfas com espuma'
      },
      {
        name: 'Pastagens',
        targets: 'Notozulia entreriana, Deois flavopicta (Cigarrinhas-das-pastagens)',
        dose: '1.0 L/ha',
        timing: 'Aplicação foliar no pico de ninfas'
      }
    ],
    targets: [
      { commonName: 'Cigarrinha-do-milho', scientificName: 'Dalbulus maidis', type: 'Inseto' },
      { commonName: 'Cigarrinha-da-raiz da cana', scientificName: 'Mahanarva fimbriolata', type: 'Inseto' },
      { commonName: 'Cigarrinha-das-pastagens', scientificName: 'Notozulia entreriana / Deois flavopicta', type: 'Inseto' },
      { commonName: 'Lagarta-do-cartucho', scientificName: 'Spodoptera frugiperda', type: 'Inseto' }
    ],
    application: {
      sprayVolume: '80 a 150 L/ha no milho; 150 a 250 L/ha em cana',
      waterPh: 'pH 5.5 a 7.0',
      compatibilityNotice: 'Aplicar preferencialmente no final da tarde (após as 16h) ou em dias nublados com umidade relativa > 60%.',
      recommendedDosageHa: 0.75,
      recommendedUnit: 'L/ha'
    },
    evidence: [
      {
        title: 'Manejo de Dalbulus maidis em Milho Safrinha',
        institution: 'Centro de Pesquisa Agronômica do Mato Grosso (CPAMT)',
        location: 'Sorriso - MT',
        season: 'Safrinha 2024',
        yieldDelta: '-74%',
        deltaUnit: 'Incidência de Enfezamento Pálido e Vermelho',
        controlValue: 48.2,
        treatedValue: 12.5,
        metricName: 'Índice de Plantas com Sintomas de Molicutes (%)',
        notes: '3 aplicações combinadas no ciclo vegetativo proporcionaram incremento de +11.2 sc/ha.'
      }
    ],
    documents: [
      { type: 'bula', title: 'Bula Oficial Biopar Metamix', code: 'BUL-META-2025', size: '1.5 MB', filename: 'bula_biopar_metamix.pdf' },
      { type: 'ficha', title: 'Guia Técnico de Manejo de Cigarrinhas', code: 'FIT-META-02', size: '1.1 MB', filename: 'guia_tecnico_biopar_metamix.pdf' }
    ],
    relatedProductIds: ['beauveril', 'bacillus-shield'],
    relatedArticleIds: ['artigo-cigarrinha-milho', 'artigo-manejo-antirresistencia']
  },
  {
    id: 'beauveril',
    slug: 'biopar-beauveril',
    name: 'Biopar Beauveril',
    category: 'Bioinseticidas',
    categorySlug: 'bioinseticidas',
    microorganismShort: 'Beauveria bassiana',
    microorganismScientific: 'Beauveria bassiana (IBCB 66)',
    shortDescription: 'Fungo entomopatogênico de alta pureza para manejo de mosca-branca, ácaro-rajado, tripes e broca-do-café.',
    fullDescription: 'Biopar Beauveril é formulado com a estirpe IBCB 66 de Beauveria bassiana. Desenvolvido para atuar com velocidade e seletividade no controle de pragas sugadoras e mastigadoras em diversas culturas de grãos, café, frutas e hortaliças.',
    mainPositioning: 'Controle bio-específico de mosca-branca e pragas sugadoras com máxima segurança biológica.',
    featured: false,
    badge: 'Líder em Mosca-Branca',
    heroImage: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    packshotImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    colorAccent: '#15803D',
    technicalIdentity: {
      categoria: 'Bioinseticida / Bioacaricida Microbiológico',
      microrganismo: 'Beauveria bassiana',
      especie: 'bassiana',
      cepa_ou_isolado: 'Isolado IBCB 66',
      concentracao: '1 x 10¹⁰ conídios viáveis/g',
      formulacao: 'Pó Molhável Dispersível (WP)',
      registro_mapa: 'PR-005112-8.000215',
      apresentacao: 'Embalagens herméticas de 1 kg e 5 kg',
      classe_toxicologica: 'Classe V - Pouco Tóxico',
      inflamabilidade: 'Não inflamável',
      prazo_validade: '18 meses em local seco e fresco (< 25°C)'
    },
    modeOfAction: {
      summary: 'Adsorção de conídios, digestão da epicutícula com proteases e morte por colonização sistêmica de Beauveria (micose branca).',
      mechanisms: [
        {
          title: 'Ataque a Todos os Estágios',
          description: 'Controla ninfas e adultos de mosca-branca, além de inviabilizar a eclosão de ovos.'
        },
        {
          title: 'Produção de Beauvericina e Oosporeína',
          description: 'Metabólitos antimicrobianos e inseticidas naturais que aceleram a taxa de mortalidade.'
        }
      ]
    },
    benefits: [
      'Excelente controle em populações de mosca-branca resistentes a químicos',
      'Ação supressora simultânea sobre Ácaro-rajado e Tripes',
      'Intervalo de carência zero para exportação de hortifrúti e grãos'
    ],
    crops: [
      {
        name: 'Soja e Feijão',
        targets: 'Bemisia tabaci (Mosca-branca), Frankliniella schultzei (Tripes)',
        dose: '0.5 a 1.0 kg/ha',
        timing: 'Preventivo ou no primeiro aparecimento de adultos'
      },
      {
        name: 'Algodão',
        targets: 'Bemisia tabaci, Tetranychus urticae (Ácaro-rajado)',
        dose: '0.75 a 1.0 kg/ha',
        timing: 'Aplicações rotacionais no manejo integrado'
      },
      {
        name: 'Café',
        targets: 'Hypothenemus hampei (Broca-do-café)',
        dose: '1.0 a 1.5 kg/ha',
        timing: 'Época de trânsito dos frutos'
      }
    ],
    targets: [
      { commonName: 'Mosca-branca', scientificName: 'Bemisia tabaci', type: 'Inseto' },
      { commonName: 'Ácaro-rajado', scientificName: 'Tetranychus urticae', type: 'Ácaro' },
      { commonName: 'Tripes', scientificName: 'Frankliniella schultzei / Thrips palmi', type: 'Inseto' },
      { commonName: 'Broca-do-café', scientificName: 'Hypothenemus hampei', type: 'Inseto' }
    ],
    application: {
      sprayVolume: '100 a 200 L/ha garantindo cobertura na face abaxial das folhas',
      waterPh: 'pH 5.5 a 7.0',
      compatibilityNotice: 'Aplicar preferencialmente em horários com menor incidência de radiação solar direta.',
      recommendedDosageHa: 0.75,
      recommendedUnit: 'kg/ha'
    },
    evidence: [
      {
        title: 'Manejo de Mosca-Branca em Soja de Cerrado',
        institution: 'Universidade Federal de Goiás (UFG)',
        location: 'Jataí - GO',
        season: 'Safra 2024/2025',
        yieldDelta: '-78%',
        deltaUnit: 'Ninfas Vivas / Folíolo',
        controlValue: 34.2,
        treatedValue: 7.5,
        metricName: 'População de Ninfas de Mosca-branca',
        notes: '2 aplicações intervaladas por 7 dias. Mortalidade média de adultos confirmada em 82% em laboratório.'
      }
    ],
    documents: [
      { type: 'bula', title: 'Bula Oficial Biopar Beauveril', code: 'BUL-BEAU-2025', size: '1.4 MB', filename: 'bula_biopar_beauveril.pdf' },
      { type: 'ficha', title: 'Ficha Técnica do Produto', code: 'FIT-BEAU-01', size: '820 KB', filename: 'ficha_tecnica_biopar_beauveril.pdf' }
    ],
    relatedProductIds: ['metamix', 'bacillus-shield'],
    relatedArticleIds: ['artigo-manejo-antirresistencia', 'artigo-cigarrinha-milho']
  },
  {
    id: 'fosfotech',
    slug: 'biopar-fosfotech',
    name: 'Biopar Fosfotech',
    category: 'Solubilizadores de Nutrientes',
    categorySlug: 'solubilizadores',
    microorganismShort: 'Bacillus megaterium + B. subtilis',
    microorganismScientific: 'Bacillus megaterium (BM-11) + Bacillus subtilis (BS-15)',
    shortDescription: 'Inoculante solubilizador de fósforo fixado no solo, liberando P lábil através da produção de ácidos orgânicos e fosfatases.',
    fullDescription: 'Biopar Fosfotech atua diretamente sobre o maior patrimônio oculto do agricultor: o fósforo retido nas argilas e óxidos de ferro e alumínio do solo. Seu consórcio bacteriano secreta ácidos cítrico, oxálico e glucônico, além de enzimas fitases e fosfatases, disponibilizando ortofosfato absorvível pelas plantas.',
    mainPositioning: 'Destravamento do fósforo retido no solo e maximização do aproveitamento de adubos fosfatados.',
    featured: false,
    badge: 'Desbloqueio de Fósforo',
    heroImage: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80',
    packshotImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    colorAccent: '#0E7051',
    technicalIdentity: {
      categoria: 'Inoculante Solubilizador de Fósforo',
      microrganismo: 'Bacillus megaterium + Bacillus subtilis',
      especie: 'megaterium / subtilis',
      cepa_ou_isolado: 'BM-11 + BS-15',
      concentracao: '4 x 10⁹ UFC/mL',
      formulacao: 'Líquida Concentrada (L)',
      registro_mapa: 'PR-007421-9.000311',
      apresentacao: 'Galões de 5L e 20L',
      classe_toxicologica: 'Não aplicável (Insumo Biológico Registrado)',
      inflamabilidade: 'Não inflamável',
      prazo_validade: '12 meses'
    },
    modeOfAction: {
      summary: 'Acidificação localizada na rizosfera por quelação de cátions (Fe³⁺, Al³⁺, Ca²⁺) e mineralização enzimática de P orgânico.',
      mechanisms: [
        {
          title: 'Secreção de Ácidos Orgânicos de Cadeia Curta',
          description: 'Quebram as ligações químicas fortes que fixam o fósforo nas partículas minerais do solo.'
        },
        {
          title: 'Produção de Fosfatases Ácidas e Alcalinas',
          description: 'Hidrolisam ésteres fosfóricos da matéria orgânica transformando fósforo orgânico em ortofosfato inorgânico (H₂PO₄⁻).'
        }
      ]
    },
    benefits: [
      'Aumento no teor de fósforo foliar e absorção radicular',
      'Melhoria no pegamento de vagens e enchimento de grãos',
      'Retorno expressivo sobre o investimento na adubação fosfatada',
      'Alta compatibilidade com caldas de plantio'
    ],
    crops: [
      {
        name: 'Soja, Milho e Algodão',
        targets: 'Solubilização e disponibilização de fósforo',
        dose: '200 a 300 mL/ha',
        timing: 'Sulco de plantio na semeadura'
      },
      {
        name: 'Cana-de-açúcar',
        targets: 'Solubilização de P em plantio de cana-planta e soqueira',
        dose: '500 mL/ha',
        timing: 'No sulco de plantio de cana ou no corte de soqueira'
      }
    ],
    targets: [
      { commonName: 'Solubilização de Fósforo Fixado', scientificName: 'Disponibilização de H₂PO₄⁻', type: 'Nutrição Biológica' },
      { commonName: 'Atividade Enzimática do Solo', scientificName: 'Fosfatase e Fitase', type: 'Biológico de Solo' }
    ],
    application: {
      sprayVolume: '40 a 80 L/ha no sulco de semeadura',
      waterPh: 'pH 5.5 a 7.5',
      compatibilityNotice: 'Aplicar no sulco de plantio. Compatível com inoculantes e promotores de crescimento.',
      recommendedDosageHa: 0.25,
      recommendedUnit: 'L/ha'
    },
    evidence: [
      {
        title: 'Eficiência de Absorção de Fósforo e Produtividade em Soja',
        institution: 'Universidade de Rio Verde (UniRV)',
        location: 'Rio Verde - GO',
        season: 'Safra 2024/2025',
        yieldDelta: '+3.9',
        deltaUnit: 'sc/ha',
        controlValue: 66.8,
        treatedValue: 70.7,
        metricName: 'Produtividade de Soja em Solo de Cerrado',
        notes: 'Aumento de 18% no teor de P foliar na fase R2 (floração plena).'
      }
    ],
    documents: [
      { type: 'bula', title: 'Bula Oficial Biopar Fosfotech', code: 'BUL-FOSFO-2025', size: '1.3 MB', filename: 'bula_biopar_fosfotech.pdf' },
      { type: 'ficha', title: 'Estudo Técnico de Solubilização de Fósforo', code: 'FIT-FOSFO-01', size: '890 KB', filename: 'estudo_fosforo_biopar.pdf' }
    ],
    relatedProductIds: ['azos', 'trichocontrol'],
    relatedArticleIds: ['artigo-coinoculacao-soja', 'artigo-microbioma-solo']
  },
  {
    id: 'nematox',
    slug: 'biopar-nematox',
    name: 'Biopar Nematox',
    category: 'Bionematicidas',
    categorySlug: 'bionematicidas',
    microorganismShort: 'Bacillus amyloliquefaciens',
    microorganismScientific: 'Bacillus amyloliquefaciens (BA-44)',
    shortDescription: 'Bionematicida bacteriano especialista em colonização da coifa radicular e paralisia de juvenis de nematoides.',
    fullDescription: 'Biopar Nematox utiliza o potente isolado BA-44 de Bacillus amyloliquefaciens. O microrganismo forma uma capa protetora de biofilme nos pontos de entrada das raízes e secreta enzimas proteolíticas e surfactantes que destroem a camada lipídica dos ovos e desorientam o quimiotactismo dos nematoides fitoparasitas.',
    mainPositioning: 'Proteção biológica de alta persistência contra nematoides das galhas, lesões e cisto.',
    featured: false,
    badge: 'Especialista em Nematoides',
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    packshotImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    colorAccent: '#0E7051',
    technicalIdentity: {
      categoria: 'Bionematicida Microbiológico',
      microrganismo: 'Bacillus amyloliquefaciens',
      especie: 'amyloliquefaciens',
      cepa_ou_isolado: 'Cepa BA-44',
      concentracao: '1 x 10¹⁰ UFC/g',
      formulacao: 'Grânulos Dispersíveis em Água (WDG)',
      registro_mapa: 'PR-008102-1.000405',
      apresentacao: 'Sacos de 1 kg e 5 kg',
      classe_toxicologica: 'Classe V - Pouco Tóxico',
      inflamabilidade: 'Não inflamável',
      prazo_validade: '24 meses em temperatura ambiente'
    },
    modeOfAction: {
      summary: 'Destruição de ovos de nematoides, paralisação de juvenis J2 e bloqueio físico das pontas radiculares.',
      mechanisms: [
        {
          title: 'Bloqueio do Sítio de Infecção',
          description: 'Criação de barreira biológica que impede a fixação e alimentação dos nematoides.'
        },
        {
          title: 'Ação Ovicida',
          description: 'Enzimas líticas degradam a casca de quitina e proteínas dos ovos de Meloidogyne e Heterodera.'
        }
      ]
    },
    benefits: [
      'Fórmula em grânulos WDG de alta solubilidade e sem entupimento de filtros e bicos',
      'Persistência prolongada no solo, acompanhando o crescimento das raízes',
      'Compatível com fertilizantes fluídos de arranque e inoculantes'
    ],
    crops: [
      {
        name: 'Soja, Algodão, Cana e Café',
        targets: 'Meloidogyne incognita, Meloidogyne javanica, Pratylenchus brachyurus, Heterodera glycines',
        dose: '0.2 a 0.4 kg/ha',
        timing: 'Sulco de plantio ou drench no pegamento'
      }
    ],
    targets: [
      { commonName: 'Nematoide-das-galhas', scientificName: 'Meloidogyne incognita / javanica', type: 'Nematoide' },
      { commonName: 'Nematoide-das-lesões', scientificName: 'Pratylenchus brachyurus', type: 'Nematoide' },
      { commonName: 'Nematoide-do-cisto-da-soja', scientificName: 'Heterodera glycines', type: 'Nematoide' },
      { commonName: 'Nematoide-reniforme', scientificName: 'Rotylenchulus reniformis', type: 'Nematoide' }
    ],
    application: {
      sprayVolume: '40 a 80 L/ha no sulco de plantio',
      waterPh: 'pH 5.0 a 8.0',
      compatibilityNotice: 'Altamente estável e compatível com tratamentos biológicos e químicos usuais.',
      recommendedDosageHa: 0.3,
      recommendedUnit: 'kg/ha'
    },
    evidence: [
      {
        title: 'Manejo de Pratylenchus em Área Arenosa',
        institution: 'Fundação Chapadão',
        location: 'Chapadão do Sul - MS',
        season: 'Safra 2024/2025',
        yieldDelta: '+5.1',
        deltaUnit: 'sc/ha',
        controlValue: 58.6,
        treatedValue: 63.7,
        metricName: 'Produtividade de Soja em Solo Arenoso sob Nematoides',
        notes: 'Redução de 66% na população de Pratylenchus por 10g de raiz aos 60 DAE.'
      }
    ],
    documents: [
      { type: 'bula', title: 'Bula Oficial Biopar Nematox', code: 'BUL-NEMATOX-2025', size: '1.4 MB', filename: 'bula_biopar_nematox.pdf' },
      { type: 'ficha', title: 'Guia de Diagnóstico e Manejo de Nematoides', code: 'FIT-NEMATOX-01', size: '1.2 MB', filename: 'guia_nematoides_biopar.pdf' }
    ],
    relatedProductIds: ['trichocontrol', 'bacillus-shield'],
    relatedArticleIds: ['artigo-microbioma-solo', 'artigo-manejo-mofo-branco']
  }
];
