/**
 * Serviço de Gestão e Aprovação de Conteúdos para Instagram da Biopar
 * Gerencia posts de feed/carrossel, status de aprovação pelo CEO Juliano, observações e sincronização local.
 * Simplificado: focado exclusivamente nas fotos e legenda/copy para avaliação da diretoria.
 */

import { articleService } from './articleService.js';

const STORAGE_KEY = 'biopar_instagram_approval_posts_v2';
const LEGACY_STORAGE_KEY = 'biopar_instagram_approval_posts';

// Posts de exemplo desativados por padrão para nunca restaurar conteúdos indesejados
export const INITIAL_INSTAGRAM_POSTS = [];

class InstagramApprovalService {
  constructor() {
    this.subscribers = [];
    this.memoryStore = null;
    this._initStore();
  }

  _initStore() {
    if (typeof localStorage === 'undefined') {
      this.memoryStore = [];
      return;
    }
    try {
      // Remove a chave legado v1 se existir, evitando que posts de exemplo do cache antigo retornem
      if (localStorage.getItem(LEGACY_STORAGE_KEY)) {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) {
        // Inicializa como lista vazia por padrão
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        this.memoryStore = [];
      } else {
        const parsed = JSON.parse(stored);
        this.memoryStore = Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.warn('Erro ao acessar localStorage para posts do Instagram:', e);
      this.memoryStore = [];
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
    this.memoryStore = Array.isArray(data) ? [...data] : [];
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.memoryStore));
    } catch (e) {
      console.error('Falha ao salvar posts do Instagram no localStorage:', e);
    }
  }

  getAll(filterStatus = null) {
    if (this.memoryStore === null) {
      this._initStore();
    }

    const posts = Array.isArray(this.memoryStore) ? this.memoryStore : [];

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
   * Cria um novo post para aprovação do CEO (fotos + legenda)
   */
  createPost(data) {
    const all = this.getAll();
    const currentUser = articleService.getCurrentUser() || { name: 'Sued Oninem' };
    const captionText = (data.caption || '').trim();
    const firstLine = captionText.split('\n')[0].replace(/[#*]/g, '').trim();
    const autoTitle = data.title || firstLine.slice(0, 50) || 'Publicação Instagram';

    const newPost = {
      id: `post-${Date.now()}`,
      images: Array.isArray(data.images) && data.images.length > 0 ? data.images : [data.image || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1080&q=80'],
      title: autoTitle,
      caption: captionText,
      status: 'pendente', // Novos posts começam pendentes para o CEO Juliano
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
   * Atualiza informações do post (imagem e legenda)
   */
  updatePost(id, data) {
    const all = this.getAll();
    const index = all.findIndex(p => p.id === id);
    if (index !== -1) {
      const captionText = (data.caption !== undefined ? data.caption : all[index].caption || '').trim();
      const firstLine = captionText.split('\n')[0].replace(/[#*]/g, '').trim();
      const autoTitle = data.title || firstLine.slice(0, 50) || all[index].title || 'Publicação Instagram';

      all[index] = {
        ...all[index],
        ...data,
        caption: captionText,
        title: autoTitle,
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
   * Remove um post individual
   */
  deletePost(id) {
    let all = [...this.getAll()];
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
   * Exclui todos os posts da fila de aprovação
   */
  deleteAllPosts() {
    this._persist([]);
    this._notify();
    return true;
  }

  /**
   * Reseta a fila para vazia (posts de exemplo não voltam automaticamente)
   */
  resetToDefaults() {
    this._persist([]);
    this._notify();
    return [];
  }
}

export const instagramApprovalService = new InstagramApprovalService();
