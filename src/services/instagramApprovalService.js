/**
 * Serviço de Gestão e Aprovação de Conteúdos para Instagram da Biopar
 * Sincronização em Nuvem (Supabase) + Cache Local (localStorage).
 * Gerencia fila de aprovação de posts, feedback do CEO Juliano e mídia no Supabase Storage.
 */

import { articleService } from './articleService.js';
import { getSupabase, uploadBase64Media } from './supabaseClient.js';

const STORAGE_KEY = 'biopar_instagram_approval_posts_v2';
const LEGACY_STORAGE_KEY = 'biopar_instagram_approval_posts';

export const INITIAL_INSTAGRAM_POSTS = [];

class InstagramApprovalService {
  constructor() {
    this.subscribers = [];
    this.memoryStore = null;
    this.isSyncing = false;
    this.realtimeChannel = null;

    this._initStore();
    this.syncFromSupabase();
    this._setupRealtimeAndPolling();
  }

  _initStore() {
    if (typeof localStorage === 'undefined') {
      this.memoryStore = [];
      return;
    }
    try {
      if (localStorage.getItem(LEGACY_STORAGE_KEY)) {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) {
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

  _setupRealtimeAndPolling() {
    if (typeof window === 'undefined') return;

    // 1. Polling periódico para manter abas e navegadores sincronizados
    setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.syncFromSupabase(true);
      }
    }, 12000);

    // 2. Sincroniza ao focar na janela/aba
    window.addEventListener('focus', () => {
      this.syncFromSupabase(true);
    });

    // 3. Supabase Realtime Channel
    try {
      const sb = getSupabase();
      if (sb && typeof sb.channel === 'function') {
        this.realtimeChannel = sb
          .channel('public:instagram_posts')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'instagram_posts' },
            (payload) => {
              console.log('[Supabase Realtime] Mudança detectada em instagram_posts:', payload.eventType);
              this.syncFromSupabase(true);
            }
          )
          .subscribe();
      }
    } catch (e) {
      console.warn('[Supabase Realtime] Não foi possível assinar canal em tempo real:', e);
    }
  }

  /**
   * Converte linha do banco PostgreSQL (Supabase) para o modelo de dados do frontend
   */
  _mapFromDb(row) {
    let imagesArr = [];
    if (Array.isArray(row.images)) {
      imagesArr = row.images;
    } else if (typeof row.images === 'string') {
      try {
        const parsed = JSON.parse(row.images);
        imagesArr = Array.isArray(parsed) ? parsed : [row.images];
      } catch (e) {
        imagesArr = [row.images];
      }
    }

    let reviewNotesArr = [];
    if (Array.isArray(row.review_notes)) {
      reviewNotesArr = row.review_notes;
    } else if (typeof row.review_notes === 'string') {
      try {
        const parsed = JSON.parse(row.review_notes);
        reviewNotesArr = Array.isArray(parsed) ? parsed : [];
      } catch (e) {}
    }

    return {
      id: row.id,
      title: row.title || 'Publicação Instagram',
      caption: row.caption || '',
      images: imagesArr.length > 0 ? imagesArr : ['https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1080&q=80'],
      status: row.status || 'pendente',
      likesCount: typeof row.likes_count === 'number' ? row.likes_count : 140,
      commentsCount: typeof row.comments_count === 'number' ? row.comments_count : 18,
      createdAt: row.created_at || new Date().toISOString(),
      approvedAt: row.approved_at || null,
      approvedBy: row.approved_by || null,
      reviewNotes: reviewNotesArr,
      createdBy: row.created_by || 'Sued Oninem'
    };
  }

  /**
   * Converte o post do frontend para o schema da tabela Supabase
   */
  _mapToDb(post) {
    const images = Array.isArray(post.images) && post.images.length > 0
      ? post.images
      : (post.image ? [post.image] : ['https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1080&q=80']);

    return {
      id: post.id,
      title: post.title || 'Publicação Instagram',
      caption: post.caption || '',
      images: images,
      status: post.status || 'pendente',
      likes_count: post.likesCount || 0,
      comments_count: post.commentsCount || 0,
      created_at: post.createdAt || new Date().toISOString(),
      approved_at: post.approvedAt || null,
      approved_by: post.approvedBy || null,
      review_notes: Array.isArray(post.reviewNotes) ? post.reviewNotes : [],
      created_by: post.createdBy || 'Sued Oninem'
    };
  }

  /**
   * Sincroniza fila de aprovação com o Supabase na nuvem.
   * Se houver posts salvos no localStorage que ainda não estejam na nuvem (ex: os 13 posts criados localmente),
   * faz o upload automático para o Supabase e para o Storage.
   */
  async syncFromSupabase(isBackground = false) {
    if (this.isSyncing) return;
    this.isSyncing = true;

    try {
      const sb = getSupabase();
      if (!sb) {
        this.isSyncing = false;
        return;
      }

      const { data: dbRows, error } = await sb
        .from('instagram_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[Supabase] Erro ao sincronizar instagram_posts:', error.message);
        this.isSyncing = false;
        return;
      }

      const localPosts = Array.isArray(this.memoryStore) ? [...this.memoryStore] : [];
      const remotePosts = Array.isArray(dbRows) ? dbRows.map(r => this._mapFromDb(r)) : [];
      const remoteIds = new Set(remotePosts.map(p => p.id));

      // 1. Identifica posts do navegador local que ainda não foram para a nuvem (Migração automática)
      const missingInRemote = localPosts.filter(p => !remoteIds.has(p.id));

      if (missingInRemote.length > 0) {
        console.log(`[Supabase] Migrando ${missingInRemote.length} posts do navegador para a nuvem Supabase...`);
        for (const localPost of missingInRemote) {
          try {
            await this._pushPostToSupabase(localPost);
            remotePosts.unshift(localPost);
          } catch (uploadErr) {
            console.error('[Supabase] Erro ao migrar post local para a nuvem:', uploadErr);
          }
        }
      }

      // Ordena por data decrescente
      remotePosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      this.memoryStore = remotePosts;
      this._persistLocalOnly(remotePosts);
      this._notify();
      console.log(`[Supabase] Sincronização concluída com sucesso: ${remotePosts.length} posts no ar.`);
    } catch (e) {
      console.warn('[Supabase] Falha de conexão ao sincronizar posts:', e);
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * Envia um post individual para o Supabase (convertendo base64 em URLs do Supabase Storage)
   */
  async _pushPostToSupabase(post) {
    const sb = getSupabase();
    if (!sb) return;

    // Se houver imagens em base64, faz upload para o bucket biopar-media
    let finalImages = [];
    if (Array.isArray(post.images)) {
      for (let i = 0; i < post.images.length; i++) {
        const img = post.images[i];
        if (img && img.startsWith('data:image')) {
          try {
            const uploadedUrl = await uploadBase64Media(img, `instagram/${post.id}-img-${i}.jpg`);
            finalImages.push(uploadedUrl);
          } catch (err) {
            console.warn('[Supabase Storage] Fallback: mantendo imagem original', err);
            finalImages.push(img);
          }
        } else {
          finalImages.push(img);
        }
      }
    }

    post.images = finalImages;

    const row = this._mapToDb(post);
    const { error } = await sb.from('instagram_posts').upsert(row);
    if (error) {
      throw error;
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

  _persistLocalOnly(data) {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Falha ao salvar no cache local:', e);
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
   * Salva imediatamente no Supabase e no cache local
   */
  async createPost(data) {
    const all = this.getAll();
    const currentUser = articleService.getCurrentUser() || { name: 'Sued Oninem' };
    const captionText = (data.caption || '').trim();
    const firstLine = captionText.split('\n')[0].replace(/[#*]/g, '').trim();
    const autoTitle = data.title || firstLine.slice(0, 50) || 'Publicação Instagram';

    const newPost = {
      id: `post-${Date.now()}`,
      images: Array.isArray(data.images) && data.images.length > 0 ? [...data.images] : ['https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1080&q=80'],
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
    this.memoryStore = all;
    this._persistLocalOnly(all);
    this._notify();

    // Persiste no Supabase e no Storage
    this._pushPostToSupabase(newPost).catch(err => {
      console.warn('[Supabase] Erro ao persistir novo post na nuvem:', err);
    });

    return newPost;
  }

  /**
   * Atualiza informações do post (imagem e legenda)
   */
  async updatePost(id, data) {
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

      this.memoryStore = all;
      this._persistLocalOnly(all);
      this._notify();

      // Sincroniza com Supabase
      this._pushPostToSupabase(all[index]).catch(err => {
        console.warn('[Supabase] Erro ao atualizar post na nuvem:', err);
      });

      return all[index];
    }
    return null;
  }

  /**
   * O CEO aprova o post para publicação
   */
  async approvePost(id, approverName = 'Juliano (CEO)') {
    const all = this.getAll();
    const index = all.findIndex(p => p.id === id);
    if (index !== -1) {
      const approvedAt = new Date().toISOString();
      all[index].status = 'aprovado';
      all[index].approvedAt = approvedAt;
      all[index].approvedBy = approverName;

      this.memoryStore = all;
      this._persistLocalOnly(all);
      this._notify();

      // Persiste no Supabase
      try {
        const sb = getSupabase();
        if (sb) {
          await sb.from('instagram_posts').update({
            status: 'aprovado',
            approved_at: approvedAt,
            approved_by: approverName
          }).eq('id', id);
        }
      } catch (err) {
        console.warn('[Supabase] Erro ao aprovar post na nuvem:', err);
      }

      return all[index];
    }
    return null;
  }

  /**
   * O CEO solicita alterações e inclui observação técnica ou de design
   */
  async requestChanges(id, noteText, reviewerName = 'Juliano (CEO)') {
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

      this.memoryStore = all;
      this._persistLocalOnly(all);
      this._notify();

      // Persiste no Supabase
      try {
        const sb = getSupabase();
        if (sb) {
          await sb.from('instagram_posts').update({
            status: 'alteracoes',
            review_notes: all[index].reviewNotes
          }).eq('id', id);
        }
      } catch (err) {
        console.warn('[Supabase] Erro ao solicitar alterações na nuvem:', err);
      }

      return all[index];
    }
    return null;
  }

  /**
   * Marca o post como publicado no Instagram oficial
   */
  async markAsPublished(id) {
    const all = this.getAll();
    const index = all.findIndex(p => p.id === id);
    if (index !== -1) {
      const pubAt = new Date().toISOString();
      all[index].status = 'publicado';
      all[index].publishedAt = pubAt;

      this.memoryStore = all;
      this._persistLocalOnly(all);
      this._notify();

      try {
        const sb = getSupabase();
        if (sb) {
          await sb.from('instagram_posts').update({
            status: 'publicado'
          }).eq('id', id);
        }
      } catch (err) {
        console.warn('[Supabase] Erro ao marcar post como publicado:', err);
      }

      return all[index];
    }
    return null;
  }

  /**
   * Remove um post individual no Supabase e no cache local
   */
  async deletePost(id) {
    let all = [...this.getAll()];
    const beforeLen = all.length;
    all = all.filter(p => p.id !== id);
    if (all.length !== beforeLen) {
      this.memoryStore = all;
      this._persistLocalOnly(all);
      this._notify();

      try {
        const sb = getSupabase();
        if (sb) {
          await sb.from('instagram_posts').delete().eq('id', id);
        }
      } catch (err) {
        console.warn('[Supabase] Erro ao deletar post na nuvem:', err);
      }

      return true;
    }
    return false;
  }

  /**
   * Exclui todos os posts da fila de aprovação na nuvem e local
   */
  async deleteAllPosts() {
    this.memoryStore = [];
    this._persistLocalOnly([]);
    this._notify();

    try {
      const sb = getSupabase();
      if (sb) {
        await sb.from('instagram_posts').delete().neq('id', '___');
      }
    } catch (err) {
      console.warn('[Supabase] Erro ao excluir todos os posts:', err);
    }

    return true;
  }

  resetToDefaults() {
    this.deleteAllPosts();
    return [];
  }
}

export const instagramApprovalService = new InstagramApprovalService();
