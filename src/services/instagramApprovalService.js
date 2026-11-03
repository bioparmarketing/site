/**
 * Serviço de Gestão e Aprovação de Conteúdos para Instagram da Biopar
 * Gerencia posts de feed/carrossel, status de aprovação pelo CEO, observações e sincronização local.
 */

import { articleService } from './articleService.js';

const STORAGE_KEY = 'biopar_instagram_approval_posts';

// Posts padrão iniciais de altíssimo impacto para visualização imediata do CEO
export const INITIAL_INSTAGRAM_POSTS = [
  {
    id: 'post-trichoderma-mofo-branco',
    images: [
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1080&q=80'
    ],
    category: 'Biofungicidas',
    scheduledDate: '2026-11-06',
    scheduledTime: '18:30',
    title: 'Manejo Preventivo de Mofo-Branco na Soja com Trixma®',
    caption: `O escleródio não dorme na palhada. E a sua lavoura não pode esperar a florada abrir para agir. 🌾🔬

O controle biológico de mofo-branco (*Sclerotinia sclerotiorum*) com o biofungicida Trixma® atua diretamente na fonte de inóculo do solo, destruindo as estruturas de resistência antes que os apotécios liberem milhões de esporos.

✅ Alta densidade de conídios viáveis por mL
✅ Ação micoparasitária comprovada em campo
✅ Quebra de ciclo na dessecação pré-plantio e fechamento de entrelinhas
✅ Ganho médio de +4,8 sacas colhidas por hectare

Mantenha sua lavoura blindada de baixo para cima. Fale com nossa equipe técnica comercial no link da bio! 🌱⚡

#Biopar #AgriculturaBiologica #MofoBranco #SojaBrasil #ManejoBiologico #Bioinsumos #AgroBiotecnologia #Trichoderma`,
    status: 'pendente', // 'pendente' | 'aprovado' | 'alteracoes' | 'publicado'
    likesCount: 284,
    commentsCount: 37,
    createdAt: '2026-11-01T09:00:00Z',
    approvedAt: null,
    approvedBy: null,
    reviewNotes: [],
    createdBy: 'Sued Oninem'
  },
  {
    id: 'post-cigarrinha-milho-mb-control',
    images: [
      'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=1080&q=80'
    ],
    category: 'Bioinseticidas',
    scheduledDate: '2026-11-08',
    scheduledTime: '11:45',
    title: 'Cigarrinha-do-Milho: Por que o consórcio fúngico vence a resistência?',
    caption: `Cigarrinha resistente aos inseticidas convencionais? O manejo microbiológico é a virada de chave no milho safrinha. 🌽🦗

A pressão da *Dalbulus maidis* transmissora dos enfezamentos pálido e vermelho exige um choque biológico que atue na cutícula do inseto tanto na fase de ninfa quanto na fase adulta.

Com o MB Control® (associação sinérgica de *Beauveria bassiana* e *Metarhizium anisopliae*), os conídios germinam e colonizam o inseto praga de dentro para fora, sem gerar efeito rebote e sem selecionar populações resistentes.

🚀 Menos quebra de colmo na colheita
🚀 Preservação do potencial produtivo da espiga
🚀 Zero carência e compatibilidade com manejo integrado

Confira os resultados dos ensaios em nosso site oficial (link na bio). 📲

#MilhoSafrinha #CigarrinhaDoMilho #Bioinseticida #Biopar #Beauveria #Metarhizium #ManejoIntegrado`,
    status: 'aprovado',
    likesCount: 412,
    commentsCount: 52,
    createdAt: '2026-10-30T14:20:00Z',
    approvedAt: '2026-10-31T10:15:00Z',
    approvedBy: 'CEO Biopar',
    reviewNotes: [
      {
        id: 'note-1',
        author: 'CEO Biopar',
        date: '31/10/2026 às 10:15',
        text: 'Excelente abordagem técnica e foco comercial perfeito no milho safrinha. Aprovado para publicação no domingo às 11:45!'
      }
    ],
    createdBy: 'Sued Oninem'
  },
  {
    id: 'post-laboratorio-pureza-mapa',
    images: [
      'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1080&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1080&q=80'
    ],
    category: 'Institucional & Ciência',
    scheduledDate: '2026-11-10',
    scheduledTime: '17:00',
    title: 'Padrão Ouro de Pureza Biológica: Do Biorreator ao Sulco',
    caption: `Você sabe exatamente o que está colocando dentro do seu pulverizador? 🔬🧫

A diferença entre um biológico que funciona e um produto que entope pontas ou falha no campo está no rigor microbiológico industrial.

Na Biopar, cada lote de inoculante e biofungicida passa por:
🧬 Tipagem genética e purificação de cepas
🧪 Controle estrito de ausência de contaminantes patogênicos
📊 Densidade celular garantida acima dos padrões do MAPA (1x10⁹ a 1x10¹⁰ UFC/mL)

Porque o agricultor profissional investe em ciência pura, não em promessas. Saiba mais sobre nossa fábrica e tecnologia em biopar.agr.br.

#Biotecnologia #PurezaBiologica #QualidadeIndustrial #Biopar #PesquisaAgro #AgroCiencia`,
    status: 'alteracoes',
    likesCount: 198,
    commentsCount: 24,
    createdAt: '2026-11-02T11:00:00Z',
    approvedAt: null,
    approvedBy: null,
    reviewNotes: [
      {
        id: 'note-2',
        author: 'CEO Biopar',
        date: '02/11/2026 às 16:40',
        text: 'Sued, vamos incluir uma imagem real da esteira de envase e enfatizar mais a embalagem com barreira de oxigênio antes de soltar no feed.'
      }
    ],
    createdBy: 'Sued Oninem'
  },
  {
    id: 'post-fbn-soja-bpr-brad',
    images: [
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1080&q=80'
    ],
    category: 'Promotores de Crescimento',
    scheduledDate: '2026-11-12',
    scheduledTime: '08:00',
    title: 'Fixação Biológica de Nitrogênio: A fábrica invisível que economiza milhares de reais',
    caption: `Mais de 70% de todo o nitrogênio que a sua soja absorve vem da simbiose radicular com bactérias fixadoras. 🌿⚡

Com BPR Brad® (*Bradyrhizobium japonicum* e *elkanii*), garantimos nodulação vigorosa na raiz primária desde a emergência da plântula.

Menos dependência de fertilizantes nitrogenados caros, maior tolerância a períodos de seca e um sistema radicular profundo que explora melhor o perfil do solo.

👉 Dica agronômica: utilize doses corretas na dessecação e sulco de plantio para máxima colonização antes da emissão do primeiro trifólio!

#FixacaoBiologica #SojaProdutiva #Inoculante #Biopar #NutricaoDePlantas #AgroEficiente`,
    status: 'pendente',
    likesCount: 310,
    commentsCount: 41,
    createdAt: '2026-11-02T14:30:00Z',
    approvedAt: null,
    approvedBy: null,
    reviewNotes: [],
    createdBy: 'Sued Oninem'
  },
  {
    id: 'post-pulverizacao-mistura-tanque',
    images: [
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1080&q=80'
    ],
    category: 'Boas Práticas de Aplicação',
    scheduledDate: '2026-11-14',
    scheduledTime: '19:00',
    title: 'Mistura de Calda com Biológicos: 4 Regras de Ouro',
    caption: `Pulverizar biológico exige atenção aos detalhes para não matar os microrganismos na calda! Salve este post para consultar antes de ir pro campo: 🚜💧

1️⃣ Ordem de mistura: adicione o biológico por último, após os condicionadores e químicos compatíveis estarem homogeneizados;
2️⃣ Temperatura da água: evite caldas acima de 30°C ou que ficaram paradas horas no tanque sob sol quente;
3️⃣ Horário de aplicação: priorize final de tarde e noites com umidade relativa superior a 60%;
4️⃣ Pontas de pulverização: use pontas que gerem gotas médias a grossas para evitar deriva e morte por radiação UV.

Tem dúvidas sobre compatibilidade de tanques com nossos bioinsumos? Mande uma mensagem no direct! 📩

#PulverizacaoAgricola #MisturaDeTanque #TecnologiaDeAplicacao #Biopar #ManejoAgro #BoasPraticas`,
    status: 'publicado',
    likesCount: 520,
    commentsCount: 68,
    createdAt: '2026-10-25T16:00:00Z',
    approvedAt: '2026-10-26T09:30:00Z',
    approvedBy: 'CEO Biopar',
    reviewNotes: [
      {
        id: 'note-3',
        author: 'CEO Biopar',
        date: '26/10/2026 às 09:30',
        text: 'Post de utilidade pública agronômica de altíssimo engajamento. Postado com sucesso!'
      }
    ],
    createdBy: 'Sued Oninem'
  },
  {
    id: 'post-cotacao-safra-roi',
    images: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1080&q=80'
    ],
    category: 'Mercado & Gestão',
    scheduledDate: '2026-11-16',
    scheduledTime: '12:00',
    title: 'Custo por Hectare: Como o biológico protege sua margem de lucro',
    caption: `Com a margem do grão apertada na Safra 2024/2025, cada centavo investido no hectare precisa devolver sacas colhidas. 📈💰

Enquanto produtos químicos importados sofreram fortes oscilações cambiais, o manejo biológico nacional da Biopar oferece um custo por hectare altamente competitivo com retorno sobre investimento comprovado de até 4x o valor investido.

Compre direto da indústria com assistência técnica de campo especializada. Acesse a landing page exclusiva para produtores rurais no link da bio (/produtor) e faça sua simulação de ROI! 🌾🎯

#MargemDoProdutor #Safra2425 #CustoHectare #EconomiaAgro #Biopar #InvestimentoRural #Agronegocio`,
    status: 'pendente',
    likesCount: 275,
    commentsCount: 19,
    createdAt: '2026-11-03T08:15:00Z',
    approvedAt: null,
    approvedBy: null,
    reviewNotes: [],
    createdBy: 'Sued Oninem'
  }
];

class InstagramApprovalService {
  constructor() {
    this.subscribers = [];
    this.memoryStore = [...INITIAL_INSTAGRAM_POSTS];
    this._initStore();
  }

  _initStore() {
    if (typeof localStorage === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_INSTAGRAM_POSTS));
      } else {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.memoryStore = parsed;
        }
      }
    } catch (e) {
      console.warn('Erro ao acessar localStorage para posts do Instagram:', e);
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(fn => fn !== callback);
    };
  }

  _notify() {
    this.subscribers.forEach(cb => {
      try {
        cb(this.getAll());
      } catch (err) {
        console.error('Erro ao notificar subscriber:', err);
      }
    });
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('biopar:instagram_posts_updated', { detail: this.getAll() }));
    }
  }

  _persist(data) {
    this.memoryStore = [...data];
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Falha ao salvar posts do Instagram no localStorage:', e);
    }
  }

  getAll(filterStatus = null) {
    let posts = [...this.memoryStore];
    if (typeof localStorage !== 'undefined') {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            posts = parsed;
            this.memoryStore = parsed;
          }
        }
      } catch (e) {
        console.error('Erro ao ler posts do storage:', e);
      }
    }

    if (filterStatus && filterStatus !== 'todos') {
      return posts.filter(p => p.status === filterStatus);
    }

    return posts;
  }

  getById(id) {
    const all = this.getAll();
    return all.find(p => p.id === id) || null;
  }

  getMetrics() {
    const all = this.getAll();
    return {
      total: all.length,
      pendentes: all.filter(p => p.status === 'pendente').length,
      aprovados: all.filter(p => p.status === 'aprovado').length,
      alteracoes: all.filter(p => p.status === 'alteracoes').length,
      publicados: all.filter(p => p.status === 'publicado').length
    };
  }

  /**
   * Cria um novo post para aprovação do CEO
   */
  createPost(data) {
    const all = this.getAll();
    const currentUser = articleService.getCurrentUser() || { name: 'Sued Oninem' };

    const newPost = {
      id: `post-${Date.now()}`,
      images: Array.isArray(data.images) && data.images.length > 0 ? data.images : [data.image || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1080&q=80'],
      category: data.category || 'Manejo Biológico',
      scheduledDate: data.scheduledDate || new Date().toISOString().split('T')[0],
      scheduledTime: data.scheduledTime || '18:00',
      title: data.title || 'Novo Post Instagram',
      caption: data.caption || '',
      status: 'pendente', // Novos posts começam pendentes para o CEO
      likesCount: Math.floor(Math.random() * 200) + 120,
      commentsCount: Math.floor(Math.random() * 30) + 10,
      createdAt: new Date().toISOString(),
      approvedAt: null,
      approvedBy: null,
      reviewNotes: [],
      createdBy: currentUser.name || 'Sued Oninem'
    };

    all.unshift(newPost);
    this._persist(all);
    this._notify();
    return newPost;
  }

  /**
   * Atualiza informações do post (imagem, legenda, data, etc.)
   */
  updatePost(id, data) {
    const all = this.getAll();
    const index = all.findIndex(p => p.id === id);
    if (index !== -1) {
      all[index] = {
        ...all[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      this._persist(all);
      this._notify();
      return all[index];
    }
    return null;
  }

  /**
   * O CEO aprova o post para publicação
   */
  approvePost(id, approverName = 'CEO Biopar') {
    const all = this.getAll();
    const index = all.findIndex(p => p.id === id);
    if (index !== -1) {
      all[index].status = 'aprovado';
      all[index].approvedAt = new Date().toISOString();
      all[index].approvedBy = approverName;
      this._persist(all);
      this._notify();
      return all[index];
    }
    return null;
  }

  /**
   * O CEO solicita alterações e inclui observação técnica ou de design
   */
  requestChanges(id, noteText, reviewerName = 'CEO Biopar') {
    const all = this.getAll();
    const index = all.findIndex(p => p.id === id);
    if (index !== -1) {
      const now = new Date();
      const dateFormatted = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      all[index].status = 'alteracoes';
      if (!Array.isArray(all[index].reviewNotes)) {
        all[index].reviewNotes = [];
      }

      all[index].reviewNotes.unshift({
        id: `note-${Date.now()}`,
        author: reviewerName,
        date: dateFormatted,
        text: noteText
      });

      this._persist(all);
      this._notify();
      return all[index];
    }
    return null;
  }

  /**
   * Marca o post como publicado no Instagram oficial
   */
  markAsPublished(id) {
    const all = this.getAll();
    const index = all.findIndex(p => p.id === id);
    if (index !== -1) {
      all[index].status = 'publicado';
      all[index].publishedAt = new Date().toISOString();
      this._persist(all);
      this._notify();
      return all[index];
    }
    return null;
  }

  /**
   * Remove um post
   */
  deletePost(id) {
    let all = this.getAll();
    const beforeLen = all.length;
    all = all.filter(p => p.id !== id);
    if (all.length !== beforeLen) {
      this._persist(all);
      this._notify();
      return true;
    }
    return false;
  }

  /**
   * Restaura os posts padrões
   */
  resetToDefaults() {
    this._persist(INITIAL_INSTAGRAM_POSTS);
    this._notify();
    return INITIAL_INSTAGRAM_POSTS;
  }
}

export const instagramApprovalService = new InstagramApprovalService();
