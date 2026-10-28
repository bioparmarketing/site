/**
 * Biopar Article & Content Management Service
 * Gerencia persistência local de artigos do blog, CRUD completo e autenticação de criadores de conteúdo.
 */

import { articles as initialArticles, articleCategories as initialCategories } from '../data/articles.js';

const STORAGE_KEY = 'biopar_articles_store';
const SESSION_KEY = 'biopar_admin_session';

// Perfil Oficial de Conteúdo e Marketing configurado para o sistema
export const ADMIN_USERS = [
  {
    name: 'Sued Oninem',
    email: 'marketing@biopar.agr.br',
    password: '@mkt123',
    role: 'Head de Marketing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Head de Marketing da Biopar Biotecnologia Agrícola. Especialista em posicionamento comercial, inteligência de mercado do agronegócio e estratégias de bioinsumos para produtores e cooperativas.'
  }
];

class ArticleService {
  constructor() {
    this.subscribers = [];
    this._initStore();
  }

  /**
   * Retorna os dados mais recentes do perfil do autor (incluindo foto/avatar atualizado)
   */
  getAuthor() {
    let customProfile = null;
    if (typeof localStorage !== 'undefined') {
      try {
        const raw = localStorage.getItem('biopar_admin_profile');
        if (raw) customProfile = JSON.parse(raw);
        if (!customProfile) {
          const sessionRaw = localStorage.getItem(SESSION_KEY);
          if (sessionRaw) customProfile = JSON.parse(sessionRaw);
        }
      } catch (e) {}
    }

    return {
      name: customProfile?.name || ADMIN_USERS[0].name,
      role: customProfile?.role || ADMIN_USERS[0].role,
      avatar: customProfile?.avatar || ADMIN_USERS[0].avatar,
      bio: customProfile?.bio || ADMIN_USERS[0].bio
    };
  }

  /**
   * Inicializa o repositório local a partir do seed padrão caso ainda não exista
   */
  _initStore() {
    if (typeof localStorage === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialArticles));
      }
    } catch (e) {
      console.warn('Não foi possível acessar localStorage:', e);
    }
  }

  /**
   * Assina notificações de mudança nos artigos
   */
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
      window.dispatchEvent(new CustomEvent('biopar:articles_updated', { detail: this.getAll() }));
    }
  }

  /**
   * Retorna todos os artigos cadastrados com os dados mais recentes do autor injetados dinamicamente
   */
  getAll() {
    let rawList = [...initialArticles];
    if (typeof localStorage !== 'undefined') {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            rawList = parsed;
          }
        }
      } catch (e) {
        console.error('Erro ao ler artigos do storage:', e);
      }
    }

    // Injeta dinamicamente o perfil atualizado do autor (avatar, cargo, bio)
    const currentAuthor = this.getAuthor();
    return rawList.map(art => {
      if (!art.author || !art.author.name || art.author.name.toLowerCase().includes('sued')) {
        return {
          ...art,
          author: {
            ...art.author,
            name: currentAuthor.name,
            role: currentAuthor.role,
            avatar: currentAuthor.avatar,
            bio: currentAuthor.bio
          }
        };
      }
      return art;
    });
  }

  /**
   * Retorna um artigo pelo slug ou id garantindo autor sempre atualizado
   */
  getBySlug(slug) {
    const all = this.getAll();
    return all.find(a => a.slug === slug || a.id === slug) || null;
  }

  /**
   * Retorna todas as categorias disponíveis
   */
  getCategories() {
    const all = this.getAll();
    const categoriesSet = new Set(initialCategories);
    all.forEach(a => {
      if (a.category) categoriesSet.add(a.category);
    });
    return Array.from(categoriesSet);
  }

  /**
   * Salva (cria ou atualiza) um artigo
   */
  saveArticle(articleData) {
    const all = this.getAll();
    const currentUser = this.getCurrentUser() || ADMIN_USERS[0];

    // Calcula tempo estimado de leitura com base no conteúdo
    const textContent = (articleData.content || '').replace(/<[^>]*>?/gm, '');
    const wordCount = textContent.trim().split(/\s+/).filter(Boolean).length;
    const readingMinutes = Math.max(1, Math.ceil(wordCount / 180));
    const calculatedReadingTime = `${readingMinutes} min de leitura`;

    // Normaliza slug para SEO amigável
    let finalSlug = articleData.slug;
    if (!finalSlug || finalSlug.trim() === '') {
      finalSlug = this.generateSlug(articleData.title || 'nova-materia');
    } else {
      finalSlug = this.generateSlug(finalSlug);
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    if (articleData.id) {
      // Atualização
      const index = all.findIndex(a => a.id === articleData.id);
      if (index !== -1) {
        // Se este for marcado como destaque, desmarca os demais
        if (articleData.featured) {
          all.forEach(a => { a.featured = false; });
        }

        all[index] = {
          ...all[index],
          ...articleData,
          slug: finalSlug,
          readingTime: articleData.readingTime || calculatedReadingTime,
          updatedAt: new Date().toISOString()
        };

        this._persist(all);
        this._notify();
        return all[index];
      }
    }

    // Criação de Novo Artigo
    if (articleData.featured) {
      all.forEach(a => { a.featured = false; });
    }

    const newArticle = {
      id: `artigo-${Date.now()}`,
      slug: finalSlug,
      title: articleData.title || 'Nova Matéria Sem Título',
      excerpt: articleData.excerpt || '',
      category: articleData.category || 'Manejo Biológico',
      date: articleData.date || formattedDate,
      readingTime: articleData.readingTime || calculatedReadingTime,
      author: articleData.author || {
        name: currentUser.name,
        role: currentUser.role,
        avatar: currentUser.avatar,
        bio: currentUser.bio
      },
      featured: !!articleData.featured,
      image: articleData.image || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
      content: articleData.content || '<p>Conteúdo da publicação...</p>',
      references: Array.isArray(articleData.references) ? articleData.references : (articleData.references ? [articleData.references] : []),
      relatedProductIds: Array.isArray(articleData.relatedProductIds) ? articleData.relatedProductIds : [],
      relatedArticleIds: Array.isArray(articleData.relatedArticleIds) ? articleData.relatedArticleIds : [],
      createdAt: new Date().toISOString()
    };

    all.unshift(newArticle);
    this._persist(all);
    this._notify();
    return newArticle;
  }

  /**
   * Remove um artigo pelo ID
   */
  deleteArticle(id) {
    let all = this.getAll();
    const beforeCount = all.length;
    all = all.filter(a => a.id !== id);

    if (all.length !== beforeCount) {
      // Se removeu o destaque e sobrou algum, destaca o primeiro
      if (!all.some(a => a.featured) && all.length > 0) {
        all[0].featured = true;
      }
      this._persist(all);
      this._notify();
      return true;
    }
    return false;
  }

  /**
   * Restaura os 10 artigos padrão originais
   */
  resetToDefaults() {
    this._persist(initialArticles);
    this._notify();
    return initialArticles;
  }

  _persist(data) {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Falha ao salvar no localStorage:', e);
    }
  }

  /**
   * Utilitário para gerar Slug SEO amigável
   */
  generateSlug(text) {
    return (text || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 -]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  /**
   * Exporta a base de dados como código JavaScript pronto para commit no repositório
   */
  exportAsCode() {
    const articlesList = this.getAll();
    const categoriesList = this.getCategories();
    return `/**
 * Base de Dados de Artigos e Notícias Técnicas e Comerciais da Biopar
 * Exportado via Painel Administrativo Biopar (/admin)
 * Data de Exportação: ${new Date().toLocaleString('pt-BR')}
 */

export const articleCategories = ${JSON.stringify(categoriesList, null, 2)};

export const articles = ${JSON.stringify(articlesList, null, 2)};
`;
  }

  // ==========================================
  // AUTENTICAÇÃO DO PAINEL ADMINISTRATIVO
  // ==========================================

  /**
   * Tenta realizar o login com email e senha
   */
  login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = ADMIN_USERS.find(
      u => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (user) {
      let customProfile = null;
      if (typeof localStorage !== 'undefined') {
        try {
          const raw = localStorage.getItem('biopar_admin_profile');
          if (raw) customProfile = JSON.parse(raw);
        } catch (e) {}
      }

      const sessionData = {
        name: customProfile?.name || user.name,
        email: user.email,
        role: customProfile?.role || user.role,
        avatar: customProfile?.avatar || user.avatar,
        bio: customProfile?.bio || user.bio,
        loggedAt: new Date().toISOString()
      };
      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
        } catch (e) {
          console.warn('Erro ao salvar sessão:', e);
        }
      }
      return { success: true, user: sessionData };
    }

    return {
      success: false,
      message: 'Credenciais inválidas. Verifique o e-mail e senha de acesso.'
    };
  }

  /**
   * Encerra a sessão do usuário
   */
  logout() {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem(SESSION_KEY);
      } catch (e) {
        console.warn('Erro ao limpar sessão:', e);
      }
    }
  }

  /**
   * Retorna o usuário logado atualmente ou null
   */
  getCurrentUser() {
    if (typeof localStorage === 'undefined') return null;
    try {
      const data = localStorage.getItem(SESSION_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Erro ao verificar sessão:', e);
    }
    return null;
  }

  /**
   * Retorna true se houver um usuário autenticado
   */
  isAuthenticated() {
    return !!this.getCurrentUser();
  }

  /**
   * Atualiza as informações do perfil do usuário autenticado (incluindo foto/avatar)
   * e opcionalmente sincroniza as matérias já publicadas.
   */
  updateProfile(profileData, syncArticles = true) {
    const current = this.getCurrentUser() || ADMIN_USERS[0];
    const updated = {
      ...current,
      ...profileData,
      updatedAt: new Date().toISOString()
    };

    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
        localStorage.setItem('biopar_admin_profile', JSON.stringify(updated));
      } catch (e) {
        console.warn('Erro ao atualizar perfil no storage:', e);
      }
    }

    // Sincroniza em memória
    ADMIN_USERS[0].name = updated.name;
    ADMIN_USERS[0].role = updated.role;
    ADMIN_USERS[0].avatar = updated.avatar;
    ADMIN_USERS[0].bio = updated.bio;

    if (syncArticles) {
      const all = this.getAll();
      this._persist(all);
    }

    this._notify();
    return updated;
  }
}

export const articleService = new ArticleService();
