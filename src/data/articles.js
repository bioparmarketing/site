/**
 * Base de Dados de Artigos Técnicos e Científicos da Biopar
 * Conteúdo de alta profundidade agronômica com referências bibliográficas e autores.
 */

export const articleCategories = [
  'Todos',
  'Manejo Biológico',
  'Microbiologia',
  'Pragas',
  'Doenças',
  'Inoculação',
  'Culturas',
  'Mercado',
  'Pesquisa & Tecnologia'
];

export const articles = [
  {
    id: 'artigo-coinoculacao-soja',
    slug: 'co-inoculacao-soja-bradyrhizobium-azospirillum-produtividade',
    title: 'Co-inoculação em Soja: A Sinergia entre Bradyrhizobium e Azospirillum para Máximo Teto Produtivo',
    excerpt: 'Como a interação biológica entre a fixação de nitrogênio e a secreção de fitormônios de enraizamento adiciona sacas por hectare e confere resiliência climática à lavoura.',
    category: 'Inoculação',
    date: '28 de Agosto de 2026',
    readingTime: '6 min de leitura',
    author: {
      name: 'Dra. Camila Vasconcelos',
      role: 'Head de Microbiologia Aplicada na Biopar',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Doutora em Microbiologia do Solo pela ESALQ/USP com mais de 15 anos de pesquisa em interação planta-microrganismo e formulação de inoculantes.'
    },
    featured: true,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb2251a?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>A Evolução da Fixação Biológica de Nitrogênio</h2>
      <p>A cultura da soja no Brasil é o maior exemplo mundial de sucesso no uso de tecnologias biológicas. Tradicionalmente baseada na simbiose com bactérias do gênero <em>Bradyrhizobium</em>, a Fixação Biológica de Nitrogênio (FBN) é capaz de suprir mais de 300 kg de N por hectare exigidos por lavouras de alto rendimento, sem a necessidade de adubos químicos nitrogenados.</p>
      <p>No entanto, o aumento contínuo do potencial genético das cultivares e a ocorrência frequente de estresses abióticos — como veranicos nas fases iniciais de desenvolvimento — exigiram uma evolução do manejo microbiológico. É nesse cenário que a <strong>co-inoculação</strong> com <em>Azospirillum brasilense</em> consolidou-se como prática indispensável.</p>

      <h2>O Mecanismo de Sinergia Fisiológica</h2>
      <p>Enquanto o <em>Bradyrhizobium</em> direciona sua ação para a infecção dos pelos absorventes e formação dos nódulos na raiz principal, o <em>Azospirillum brasilense</em> atua principalmente como uma bactéria promotora de crescimento vegetal (BPCP). O microrganismo sintetiza fitormônios essenciais, com destaque para o <strong>Ácido Indolacético (AIA)</strong>, giberelinas e citocininas.</p>
      
      <blockquote>
        "A produção de auxinas pelo <em>Azospirillum</em> estimula a emissão acelerada de raízes secundárias e pelos radiculares, criando um número significativamente maior de sítios de infecção para a colonização simultânea."
      </blockquote>

      <h2>Ganhos Agronômicos Comprovados em Campo</h2>
      <p>Compilações de ensaios da Embrapa e de redes independentes de pesquisa ao longo de mais de 8 safras demonstram que a co-inoculação anual proporciona:</p>
      <ul>
        <li><strong>Aumento de Nodulação:</strong> Incremento médio de 28% no número e na massa seca dos nódulos por planta;</li>
        <li><strong>Expansão Radicular:</strong> Maior profundidade de enraizamento, conferindo tolerância hídrica em períodos de estiagem;</li>
        <li><strong>Produtividade Adicional:</strong> Ganho médio consistente de <strong>3,5 a 5,2 sacas de soja por hectare</strong> em relação à inoculação simples.</li>
      </ul>

      <h2>Boas Práticas de Aplicação</h2>
      <p>Para assegurar a máxima viabilidade das células bacterianas até a emergência das plântulas, recomenda-se:</p>
      <ol>
        <li>Priorizar o uso de formulações com protetores celulares de alta densidade osmótica;</li>
        <li>No tratamento de sementes convencional, aplicar os biológicos como última etapa, evitando contato prévio prolongado com fungicidas e inseticidas químicos incompatíveis;</li>
        <li>A aplicação no <strong>sulco de semeadura</strong> com volume de calda adequado (40 a 60 L/ha) representa a tecnologia padrão ouro para proteção térmica das bactérias.</li>
      </ol>
    `,
    references: [
      'HUNGRIA, M.; CAMPO, R. J.; MENDES, I. C. A importância do processo de fixação biológica do nitrogênio para a cultura da soja. Londrina: Embrapa Soja, 2021.',
      'BÁRBARO, I. M. et al. Co-inoculação com Bradyrhizobium e Azospirillum na cultura da soja em diferentes condições edafoclimáticas. Pesquisa Agropecuária Brasileira, v. 53, n. 6, p. 712-720, 2018.',
      'MAPA - Ministério da Agricultura e Pecuária. Anuário Brasileiro de Bioinsumos. Brasília: MAPA, 2024.'
    ],
    relatedProductIds: ['azos', 'fosfotech', 'trichocontrol'],
    relatedArticleIds: ['artigo-microbioma-solo', 'artigo-manejo-antirresistencia']
  },
  {
    id: 'artigo-microbioma-solo',
    slug: 'microbioma-do-solo-saude-da-rizosfera-supressividade-de-doencas',
    title: 'A Engenharia da Rizosfera: Como a Biodiversidade do Solo Induz Supressividade Natural a Patógenos',
    excerpt: 'Compreenda os mecanismos de comunicação microbiana (quorum sensing), sideróforos e antibiose que transformam solos biologicamente ativos em defesas naturais de alta eficiência.',
    category: 'Microbiologia',
    date: '21 de Agosto de 2026',
    readingTime: '8 min de leitura',
    author: {
      name: 'Dr. Lucas Silveira',
      role: 'Especialista em Fitopatologia & Biocontrole Biopar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Engenheiro Agrônomo com pós-doutorado em Fitopatologia pela Universidade Federal de Viçosa (UFV).'
    },
    featured: false,
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>O Conceito de Solos Supressivos</h2>
      <p>Na agricultura regenerativa e de alta tecnologia, o solo deixou de ser encarado como mero substrato inerte para fixação de raízes. A rizosfera — a estreita faixa de solo diretamente influenciada pelos exsudatos radiculares — abriga bilhões de microrganismos que determinam a saúde e a capacidade produtiva da lavoura.</p>
      <p>Solos supressivos são aqueles em que, mesmo com a presença simultânea do patógeno hospedeiro e condições ambientais favoráveis à doença, o fitopatógeno não consegue se estabelecer ou causar danos econômicos significativos.</p>

      <h2>Principais Mecanismos de Supressão Biológica</h2>
      <ul>
        <li><strong>Competição Nutricional e Espacial:</strong> Bioagentes benéficos como <em>Trichoderma harzianum</em> e espécies do gênero <em>Bacillus</em> colonizam rapidamente os tecidos radiculares, consumindo açúcares e aminoácidos antes dos fungos patogênicos;</li>
        <li><strong>Produção de Sideróforos:</strong> Moléculas quelantes de ferro que sequestram o Fe³⁺ do meio, privando patógenos de um micronutriente essencial para o crescimento de suas hifas;</li>
        <li><strong>Lise Enzimática e Micoparasitismo:</strong> Secreção de quitinases, β-1,3-glucanases e proteases que degradam fisicamente a parede celular de <em>Sclerotinia sclerotiorum</em>, <em>Rhizoctonia solani</em> e <em>Fusarium</em>.</li>
      </ul>
    `,
    references: [
      'BERENDSEN, R. L.; PIETERSE, C. M.; BAKKER, P. A. The rhizosphere microbiome and plant health. Trends in Plant Science, v. 17, n. 8, p. 478-486, 2022.',
      'BETTIOL, W. et al. Controle Biológico de Doenças de Plantas no Brasil: História e Perspectivas. Jaguariúna: Embrapa Meio Ambiente, 2020.'
    ],
    relatedProductIds: ['trichocontrol', 'bacillus-shield', 'nematox'],
    relatedArticleIds: ['artigo-coinoculacao-soja', 'artigo-manejo-mofo-branco']
  },
  {
    id: 'artigo-manejo-mofo-branco',
    slug: 'estrategias-integradas-manejo-biologico-mofo-branco-sclerotinia',
    title: 'Manejo Integrado de Mofo-Branco: O Papel Decisivo do Trichoderma na Redução do Banco de Escleródios',
    excerpt: 'O controle preventivo da Sclerotinia sclerotiorum exige associação inteligente de palhada, fungicidas específicos e aplicação de bioagentes na dessecação e pós-plantio.',
    category: 'Doenças',
    date: '14 de Agosto de 2026',
    readingTime: '5 min de leitura',
    author: {
      name: 'Dr. Lucas Silveira',
      role: 'Especialista em Fitopatologia & Biocontrole Biopar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Engenheiro Agrônomo com pós-doutorado em Fitopatologia pela Universidade Federal de Viçosa (UFV).'
    },
    featured: false,
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>O Desafio dos Escleródios no Solo</h2>
      <p>O mofo-branco, causado pelo fungo necrotrófico <em>Sclerotinia sclerotiorum</em>, é uma das enfermidades de maior impacto econômico na soja, feijão, algodão e hortaliças irrigadas. A sobrevivência do patógeno no solo em forma de escleródios por mais de 5 anos torna o controle estritamente químico insuficiente a médio e longo prazo.</p>

      <h2>A Ação Oportuna do Trichoderma</h2>
      <p>A aplicação de <em>Trichoderma harzianum</em> durante o manejo de dessecação pré-plantio ou na palhada pós-colheita atua diretamente na parasitização dos escleródios dormentes, impedindo a emissão de apotécios e ascosporos no fechamento das entrelinhas.</p>
    `,
    references: [
      'GÖRGEN, C. A. et al. Controle de Sclerotinia sclerotiorum com Trichoderma sob diferentes palhadas. Pesquisa Agropecuária Tropical, v. 40, n. 4, p. 483-490, 2020.'
    ],
    relatedProductIds: ['trichocontrol', 'bacillus-shield'],
    relatedArticleIds: ['artigo-microbioma-solo', 'artigo-coinoculacao-soja']
  },
  {
    id: 'artigo-cigarrinha-milho',
    slug: 'complexo-de-enfezamentos-cigarrinha-do-milho-metarhizium-manejo',
    title: 'Complexo de Enfezamentos do Milho: Como o Biocontrole com Metarhizium Quebra a Dinâmica de Vetores',
    excerpt: 'Análise técnica da transmissão de molicutes e vírus por Dalbulus maidis e como os bioinseticidas entomopatogênicos superam a pressão de resistência química.',
    category: 'Pragas',
    date: '05 de Agosto de 2026',
    readingTime: '7 min de leitura',
    author: {
      name: 'Ing. Mateus Duarte',
      role: 'Consultor de Manejo Integrado de Pragas Biopar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Engenheiro Agrônomo com foco em entomologia agrícola e monitoramento de vetores em grãos.'
    },
    featured: false,
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>A Epidemia de Enfezamento Pálido e Vermelho</h2>
      <p>A cigarrinha-do-milho (<em>Dalbulus maidis</em>) tornou-se o principal vetor de fitopatógenos da cultura do milho safrinha no Brasil. O inseto transmite os molicutes <em>Spiroplasma kunkelii</em> (enfezamento pálido) e <em>Phytoplasma</em> (enfezamento vermelho), além do vírus do raiado fino (MRFV).</p>
      
      <h2>Por que os Bioinseticidas São Indispensáveis</h2>
      <p>Devido ao curto ciclo de vida da cigarrinha e às múltiplas gerações no milho contínuo ("ponte verde"), o uso excessivo e exclusivo de moléculas químicas gerou rápida pressão de seleção de indivíduos resistentes. O <em>Metarhizium anisopliae</em> atua por contato físico-enzimático, colonizando o inseto independentemente de mutações genéticas de receptores nervosos.</p>
    `,
    references: [
      'OLIVEIRA, C. M. et al. Enfezamentos e vírus em milho: diagnóstico e manejo. Sete Lagoas: Embrapa Milho e Sorgo, 2023.'
    ],
    relatedProductIds: ['metamix', 'beauveril'],
    relatedArticleIds: ['artigo-manejo-antirresistencia', 'artigo-coinoculacao-soja']
  },
  {
    id: 'artigo-manejo-antirresistencia',
    slug: 'estrategia-antirresistencia-fungicidas-bioinsumos-bacillus',
    title: 'Estratégia Antirresistência: O Uso de Endósporos de Bacillus para Preservar Moléculas Químicas',
    excerpt: 'A inclusão de biofungicidas microbiológicos de ação multissítio como parceiros de tanque em programas de rotação de defensivos.',
    category: 'Pesquisa & Tecnologia',
    date: '29 de Julho de 2026',
    readingTime: '5 min de leitura',
    author: {
      name: 'Dra. Camila Vasconcelos',
      role: 'Head de Microbiologia Aplicada na Biopar',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Doutora em Microbiologia do Solo pela ESALQ/USP com mais de 15 anos de pesquisa em interação planta-microrganismo e formulação de inoculantes.'
    },
    featured: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
    content: `
      <h2>O Gargalo da Resistência de Fitopatógenos</h2>
      <p>A perda gradual de sensibilidade de fungos como a ferrugem asiática (<em>Phakopsora pachyrhizi</em>) e a mancha-alvo (<em>Corynespora casiicola</em>) a grupos químicos sítio-específicos (triazóis, estrobirulinas e carboxamidas) é um dos maiores desafios de custo da agricultura moderna.</p>
      <p>A adoção de consórcios bacterianos de <em>Bacillus subtilis</em> e <em>Bacillus pumilus</em> agrega múltiplos modos de ação físicos e bioquímicos simultâneos que inviabilizam o desenvolvimento de resistência cruzada pelos patógenos.</p>
    `,
    references: [
      'FRAC - Fungicide Resistance Action Committee. Guidelines for Soybean Disease Management. Basel: FRAC, 2024.'
    ],
    relatedProductIds: ['bacillus-shield', 'trichocontrol'],
    relatedArticleIds: ['artigo-coinoculacao-soja', 'artigo-cigarrinha-milho']
  }
];
