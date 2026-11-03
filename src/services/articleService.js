/**
 * Biopar Article & Content Management Service
 * Gerencia persistência em nuvem (Supabase) com fallback local,
 * CRUD completo de matérias do blog e autenticação.
 */

import { articles as initialArticles, articleCategories as initialCategories } from '../data/articles.js';
import { getSupabase } from './supabaseClient.js';

const STORAGE_KEY = 'biopar_articles_store_v2';
const SESSION_KEY = 'biopar_admin_session';

// Perfis Oficiais de Acesso ao Painel e Central de Aprovação
export const ADMIN_USERS = [
  {
    name: 'Juliano',
    email: 'juliano@biopar.agr.br',
    password: '@Mkt123',
    role: 'CEO & Diretor Executivo',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    bio: 'CEO e Diretor Executivo da Biopar Biotecnologia Agrícola. Liderança estratégica, inovação microbiológica e visão de mercado para o agronegócio sustentável.'
  },
  {
    name: 'Sued Oninem',
    email: 'marketing@biopar.agr.br',
    password: '@mkt123',
    role: 'Head de Marketing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Head de Marketing da Biopar Biotecnologia Agrícola. Especialista em posicionamento comercial, inteligência de mercado do agronegócio e estratégias de bioinsumos para produtores e cooperativas.'
  },
  {
    name: 'Diretoria & CEO',
    email: 'ceo@biopar.agr.br',
    password: '@mkt123',
    role: 'CEO & Diretor Executivo',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    bio: 'Diretoria Executiva Biopar Biotecnologia Agrícola.'
  }
];

class ArticleService {
  constructor() {
    this.subscribers = [];
    this.inMemoryArticles = null;
    this.inMemoryProfile = null;
    this.isSyncing = false;

    this._initStore();
    this.syncFromSupabase();
  }

  /**
   * Sincroniza em tempo real com o banco de dados Supabase na nuvem
   */
  async syncFromSupabase() {
    if (this.isSyncing) return;
    this.isSyncing = true;

    try {
      const sb = getSupabase();
      if (!sb) {
        this.isSyncing = false;
        return;
      }

      // 1. Busca artigos do Supabase
      const { data: dbArticles, error: artError } = await sb
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!artError && Array.isArray(dbArticles)) {
        const mappedArticles = dbArticles.map(row => this._mapFromDb(row));
        this.inMemoryArticles = mappedArticles;
        this._persist(mappedArticles);
        this._notify();
      } else if (artError) {
        console.warn('[Supabase] Aviso ao buscar artigos:', artError.message);
      }

      // 2. Busca perfil do autor atualizado no Supabase
      const { data: profileData, error: profError } = await sb
        .from('profiles')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (!profError && profileData) {
        this.inMemoryProfile = {
          name: profileData.name,
          role: profileData.role,
          avatar: profileData.avatar,
          bio: profileData.bio,
          email: profileData.email
        };
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('biopar_admin_profile', JSON.stringify(this.inMemoryProfile));
        }
        this._notify();
      }
    } catch (e) {
      console.warn('[Supabase] Falha ao sincronizar em nuvem:', e);
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Carga inicial dos artigos padrões no banco Supabase
   */
  async _seedToSupabase(sb) {
    try {
      const rows = initialArticles.map(art => this._mapToDb(art));
      const { error } = await sb.from('articles').upsert(rows);
      if (!error) {
        console.log('[Supabase] Carga inicial de artigos concluída com sucesso!');
        this.inMemoryArticles = [...initialArticles];
        this._persist(this.inMemoryArticles);
        this._notify();
      }
    } catch (e) {
      console.warn('[Supabase] Erro no seed inicial:', e);
    }
  }

  _mapFromDb(row) {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt || '',
      category: row.category || 'Manejo Biológico',
      date: row.date || '',
      readingTime: row.reading_time || '5 min de leitura',
      author: row.author || {
        name: 'Equipe Biopar',
        role: 'Comunicação Técnica',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        bio: 'Biotecnologia Agrícola Aplicada.'
      },
      featured: !!row.featured,
      image: row.image || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
      content: row.content || '',
      references: Array.isArray(row.references) ? row.references : [],
      relatedProductIds: Array.isArray(row.related_product_ids) ? row.related_product_ids : [],
      relatedArticleIds: Array.isArray(row.related_article_ids) ? row.related_article_ids : [],
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  _mapToDb(art) {
    return {
      id: art.id,
      slug: art.slug,
      title: art.title,
      excerpt: art.excerpt || '',
      category: art.category || 'Manejo Biológico',
      date: art.date || '',
      reading_time: art.readingTime || '5 min de leitura',
      author: art.author || {},
      featured: !!art.featured,
      image: art.image || '',
      content: art.content || '',
      references: Array.isArray(art.references) ? art.references : [],
      related_product_ids: Array.isArray(art.relatedProductIds) ? art.relatedProductIds : [],
      related_article_ids: Array.isArray(art.relatedArticleIds) ? art.relatedArticleIds : [],
      updated_at: new Date().toISOString()
    };
  }

  /**
   * Retorna os dados mais recentes do perfil do autor (incluindo foto/avatar atualizado)
   */
  getAuthor() {
    if (this.inMemoryProfile) {
      return this.inMemoryProfile;
    }

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
      name: customProfile?.name || ADMIN_USERS[1].name,
      role: customProfile?.role || ADMIN_USERS[1].role,
      avatar: customProfile?.avatar || ADMIN_USERS[1].avatar,
      bio: customProfile?.bio || ADMIN_USERS[1].bio
    };
  }

  /**
   * Inicializa o repositório local a partir do seed padrão caso ainda não exista
   */
  _initStore() {
    if (typeof localStorage === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
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
   * Retorna todos os artigos cadastrados com autor atualizado
   */
  getAll() {
    if (this.inMemoryArticles !== null) {
      return this.inMemoryArticles;
    }

    let rawList = [];
    if (typeof localStorage !== 'undefined') {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) {
            rawList = parsed;
          }
        }
      } catch (e) {
        console.error('Erro ao ler artigos do storage:', e);
      }
    }

    this.inMemoryArticles = rawList;
    return rawList;
  }

  /**
   * Retorna um artigo pelo slug ou id
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
   * Salva (cria ou atualiza) um artigo na nuvem Supabase e localmente
   */
  async saveArticle(articleData) {
    const all = [...this.getAll()];
    const currentUser = this.getCurrentUser() || ADMIN_USERS[1];

    // Calcula tempo estimado de leitura
    const textContent = (articleData.content || '').replace(/<[^>]*>?/gm, '');
    const wordCount = textContent.trim().split(/\s+/).filter(Boolean).length;
    const readingMinutes = Math.max(1, Math.ceil(wordCount / 180));
    const calculatedReadingTime = `${readingMinutes} min de leitura`;

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

    let savedArticle = null;

    if (articleData.id) {
      // Atualização
      const index = all.findIndex(a => a.id === articleData.id);
      if (index !== -1) {
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

        savedArticle = all[index];
      }
    }

    if (!savedArticle) {
      // Criação de Novo Artigo
      if (articleData.featured) {
        all.forEach(a => { a.featured = false; });
      }

      savedArticle = {
        id: `artigo-${Date.now()}`,
        slug: finalSlug,
        title: articleData.title || 'Nova Matéria Sem Título',
        excerpt: articleData.excerpt || '',
        category: articleData.category || 'Manejo Biológico',
        date: articleData.date || formattedDate,
        readingTime: articleData.readingTime || calculatedReadingTime,
        author: articleData.author || {
          name: currentUser.name,
          email: currentUser.email || '',
          role: currentUser.role,
          avatar: currentUser.avatar,
          bio: currentUser.bio
        },
        createdBy: currentUser.email || currentUser.name,
        featured: !!articleData.featured,
        image: articleData.image || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80',
        content: articleData.content || '<p>Conteúdo da publicação...</p>',
        references: Array.isArray(articleData.references) ? articleData.references : (articleData.references ? [articleData.references] : []),
        relatedProductIds: Array.isArray(articleData.relatedProductIds) ? articleData.relatedProductIds : [],
        relatedArticleIds: Array.isArray(articleData.relatedArticleIds) ? articleData.relatedArticleIds : [],
        createdAt: new Date().toISOString()
      };

      all.unshift(savedArticle);
    }

    this.inMemoryArticles = all;
    this._persist(all);
    this._notify();

    // Sincroniza com Supabase na Nuvem
    try {
      const sb = getSupabase();
      if (sb) {
        const dbRow = this._mapToDb(savedArticle);
        const { error } = await sb.from('articles').upsert(dbRow);
        if (error) {
          console.error('[Supabase] Erro ao salvar artigo na nuvem:', error);
        } else {
          console.log('[Supabase] Artigo salvo e publicado na nuvem com sucesso!');
        }
      }
    } catch (err) {
      console.warn('[Supabase] Erro de rede ao salvar artigo:', err);
    }

    return savedArticle;
  }

  /**
   * Remove um artigo pelo ID na nuvem Supabase e localmente
   */
  /**
   * Verifica se o usuário autenticado tem permissão para gerenciar/excluir o artigo
   */
  canUserManageArticle(article, user = null) {
    const current = user || this.getCurrentUser();
    if (!current) return false;

    const currentEmail = (current.email || '').trim().toLowerCase();
    const currentName = (current.name || '').trim().toLowerCase();

    const authorEmail = (article.author?.email || article.createdBy || '').trim().toLowerCase();
    const authorName = (article.author?.name || '').trim().toLowerCase();

    // Se bater o e-mail do autor/criador
    if (authorEmail && currentEmail && authorEmail === currentEmail) return true;

    // Se bater o nome do autor/criador
    if (authorName && currentName && authorName === currentName) return true;

    // Se for artigo legado sem identificação prévia
    if (!authorEmail && !authorName) return true;

    return false;
  }

  async deleteArticle(id) {
    const target = this.getAll().find(a => a.id === id);
    if (target && !this.canUserManageArticle(target)) {
      throw new Error(`Permissão negada: apenas o autor (${target.author?.name || "criador"}) tem permissão para excluir esta matéria.`);
    }
    let all = [...this.getAll()];
    const beforeCount = all.length;
    all = all.filter(a => a.id !== id);

    if (all.length !== beforeCount) {
      if (!all.some(a => a.featured) && all.length > 0) {
        all[0].featured = true;
      }
      this.inMemoryArticles = all;
      this._persist(all);
      this._notify();

      // Exclui no Supabase
      try {
        const sb = getSupabase();
        if (sb) {
          const { error } = await sb.from('articles').delete().eq('id', id);
          if (error) {
            console.error('[Supabase] Erro ao excluir artigo na nuvem:', error);
          } else {
            console.log('[Supabase] Artigo excluído da nuvem com sucesso!');
          }
        }
      } catch (err) {
        console.warn('[Supabase] Falha ao deletar artigo na nuvem:', err);
      }

      return true;
    }
    return false;
  }

  /**
   * Restaura os artigos originais
   */
  resetToDefaults() {
    this.inMemoryArticles = [...initialArticles];
    this._persist(initialArticles);
    this._notify();

    // Sincroniza com Supabase
    const sb = getSupabase();
    if (sb) {
      this._seedToSupabase(sb);
    }
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
  // AUTENTICAÇÃO
  // ==========================================

  async login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // 1. Validação imediata para a equipe oficial (Marketing & Juliano CEO)
    const user = ADMIN_USERS.find(u => {
      const emailMatches = u.email.toLowerCase() === cleanEmail;
      const passMatches = u.password === cleanPass || u.password.toLowerCase() === cleanPass.toLowerCase();
      return emailMatches && passMatches;
    });

    if (user) {
      const customProfile = this.getAuthor();
      const sessionData = {
        name: customProfile?.name || user.name,
        email: user.email,
        role: customProfile?.role || user.role,
        avatar: customProfile?.avatar || user.avatar,
        bio: customProfile?.bio || user.bio,
        loggedAt: new Date().toISOString()
      };
      this._saveSession(sessionData);
      return { success: true, user: sessionData };
    }

    // 2. Tenta autenticar pelo Supabase Auth se houver usuário cadastrado diretamente no Supabase
    const sb = getSupabase();
    if (sb && sb.auth) {
      try {
        const { data: authData, error: authError } = await sb.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPass
        });

        if (!authError && authData?.user) {
          const sessionData = {
            id: authData.user.id,
            email: authData.user.email,
            name: authData.user.user_metadata?.name || this.getAuthor().name,
            role: authData.user.user_metadata?.role || this.getAuthor().role,
            avatar: authData.user.user_metadata?.avatar || this.getAuthor().avatar,
            bio: authData.user.user_metadata?.bio || this.getAuthor().bio,
            loggedAt: new Date().toISOString()
          };
          this._saveSession(sessionData);
          return { success: true, user: sessionData };
        }
      } catch (err) {
        console.warn('[Supabase Auth]:', err);
      }
    }

    return {
      success: false,
      message: 'Credenciais inválidas. Verifique o e-mail corporativo e senha de acesso.'
    };
  }

  _saveSession(sessionData) {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      } catch (e) {}
    }
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem(SESSION_KEY);
      } catch (e) {}
    }
    const sb = getSupabase();
    if (sb && sb.auth) {
      sb.auth.signOut().catch(() => {});
    }
  }

  getCurrentUser() {
    if (typeof localStorage === 'undefined') return null;
    try {
      const data = localStorage.getItem(SESSION_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return null;
  }

  isAuthenticated() {
    return !!this.getCurrentUser();
  }

  /**
   * Atualiza as informações do perfil do autor (incluindo foto) na nuvem Supabase
   */
  async updateProfile(profileData, syncArticles = true) {
    const current = this.getCurrentUser() || ADMIN_USERS[1];
    const updated = {
      ...current,
      ...profileData,
      updatedAt: new Date().toISOString()
    };

    this.inMemoryProfile = updated;
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
        localStorage.setItem('biopar_admin_profile', JSON.stringify(updated));
      } catch (e) {}
    }

    // Salva no Supabase (Tabela profiles)
    try {
      const sb = getSupabase();
      if (sb) {
        await sb.from('profiles').upsert({
          id: 'perfil-marketing',
          email: updated.email || 'marketing@biopar.agr.br',
          name: updated.name,
          role: updated.role,
          avatar: updated.avatar,
          bio: updated.bio,
          updated_at: new Date().toISOString()
        });
        console.log('[Supabase] Perfil sincronizado com sucesso na nuvem!');
      }
    } catch (err) {
      console.warn('[Supabase] Erro ao sincronizar perfil:', err);
    }

    if (syncArticles) {
      const all = this.getAll().map(art => {
        if (art.author && art.author.name && art.author.name.toLowerCase().includes('sued')) {
          return {
            ...art,
            author: {
              ...art.author,
              name: updated.name,
              role: updated.role,
              avatar: updated.avatar,
              bio: updated.bio
            }
          };
        }
        return art;
      });
      this.inMemoryArticles = all;
      this._persist(all);
    }

    this._notify();
    return updated;
  }
}

export const articleService = new ArticleService();
