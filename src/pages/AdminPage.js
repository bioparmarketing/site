/**
 * Painel Administrativo Integrado do Blog e Notícias (/admin)
 * Permite que a equipe de marketing gerencie conteúdos, matérias, SEO e produtos vinculados.
 * Perfil oficial: Sued Oninem (marketing@biopar.agr.br / @mkt123)
 */

import { articleService } from '../services/articleService.js';
import { products } from '../data/products.js';
import { showToast } from '../components/Toast.js';

// Imagens temáticas recomendadas para capa de artigos agro
const SUGGESTED_COVERS = [
  { label: 'Soja / Folha', url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Milho / Pragas', url: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Microbiologia / Lab', url: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Trator / Pulverização', url: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Lavoura / Horizonte', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Raízes / Solo', url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80' }
];

export function createAdminPage({ router }) {
  const container = document.createElement('div');
  container.className = 'w-full min-h-screen bg-[#F5F5F7] text-[#1D1D1F]';

  let currentSearch = '';
  let currentCategory = 'Todos';
  let editingArticle = null; // null = novo ou objeto existente
  let isEditorOpen = false;
  let isExportModalOpen = false;

  function render() {
    const isAuth = articleService.isAuthenticated();

    if (!isAuth) {
      renderLoginView();
    } else {
      renderDashboardView();
    }
  }

  // ========================================================
  // 1. TELA DE LOGIN
  // ========================================================
  function renderLoginView() {
    container.innerHTML = `
      <div class="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-[#F5F5F7] to-[#E9E9EB]">
        <div class="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/60">
          
          <!-- Logo & Cabeçalho -->
          <div class="text-center mb-8">
            <a href="#/" data-link class="inline-flex items-center gap-2 mb-4 group">
              <span class="text-2xl font-black tracking-tight text-neutral-900 group-hover:text-[#60B73F] transition-colors">BIOPAR</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#60B73F]/10 text-[#007A42] uppercase tracking-wider">CMS</span>
            </a>
            <h1 class="text-2xl font-black text-neutral-900 tracking-tight">Painel do Criador</h1>
            <p class="text-xs text-neutral-500 mt-1">Gestão de Conteúdos, SEO e Matérias do Blog Biopar</p>
          </div>

          <!-- Formulário de Login -->
          <form id="admin-login-form" class="space-y-5">
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5" for="login-email">
                E-mail Corporativo
              </label>
              <div class="relative">
                <input 
                  type="email" 
                  id="login-email" 
                  required 
                  placeholder="marketing@biopar.agr.br"
                  value="marketing@biopar.agr.br"
                  class="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-neutral-200 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5" for="login-password">
                Senha de Acesso
              </label>
              <div class="relative">
                <input 
                  type="password" 
                  id="login-password" 
                  required 
                  placeholder="@mkt123"
                  value="@mkt123"
                  class="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-neutral-200 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div id="login-error-msg" class="hidden p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600"></div>

            <button 
              type="submit" 
              id="login-submit-btn"
              class="w-full py-3.5 px-6 rounded-2xl bg-neutral-900 hover:bg-black active:scale-[0.99] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Acessar Painel</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </form>

          <!-- Credenciais Padrão & Atalhos -->
          <div class="mt-8 pt-6 border-t border-neutral-100 space-y-3">
            <div class="p-3.5 rounded-2xl bg-[#60B73F]/10 border border-[#60B73F]/20 text-xs text-neutral-700">
              <span class="font-bold text-[#007A42] block mb-1">Acesso do Head de Marketing:</span>
              <div class="flex flex-col gap-0.5 text-[11px] font-mono text-neutral-600">
                <span>E-mail: <strong>marketing@biopar.agr.br</strong></span>
                <span>Senha: <strong>@mkt123</strong></span>
              </div>
            </div>

            <div class="text-center pt-2">
              <a href="#/blog" data-link class="text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
                ← Voltar para o Blog no Site
              </a>
            </div>
          </div>

        </div>
      </div>
    `;

    const form = container.querySelector('#admin-login-form');
    const errorBox = container.querySelector('#login-error-msg');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = container.querySelector('#login-email').value;
      const pass = container.querySelector('#login-password').value;

      const result = articleService.login(email, pass);
      if (result.success) {
        showToast(`Bem-vindo, ${result.user.name}! Painel carregado.`);
        render();
      } else {
        errorBox.textContent = result.message;
        errorBox.classList.remove('hidden');
      }
    });
  }

  // ========================================================
  // 2. DASHBOARD ADMINISTRATIVO
  // ========================================================
  function renderDashboardView() {
    const user = articleService.getCurrentUser();
    const allArticles = articleService.getAll();
    const categories = articleService.getCategories();

    // Filtros
    let filtered = allArticles.filter(art => {
      const matchCat = currentCategory === 'Todos' || art.category === currentCategory;
      const term = currentSearch.toLowerCase();
      const matchSearch = !term ||
        art.title.toLowerCase().includes(term) ||
        art.excerpt.toLowerCase().includes(term) ||
        art.slug.toLowerCase().includes(term);
      return matchCat && matchSearch;
    });

    const featuredCount = allArticles.filter(a => a.featured).length;

    container.innerHTML = `
      <!-- Topo do Painel Administrativo -->
      <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          <!-- Logo & Identificação -->
          <div class="flex items-center gap-3">
            <a href="#/" data-link class="text-xl font-black text-neutral-900 tracking-tight flex items-center gap-2">
              BIOPAR
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#60B73F]/15 text-[#007A42]">ADMIN</span>
            </a>
            <span class="text-neutral-300 hidden sm:inline">|</span>
            <span class="text-xs font-semibold text-neutral-500 hidden sm:inline">Portal Editorial de Notícias</span>
          </div>

          <!-- Ações Globais & Perfil -->
          <div class="flex items-center gap-3">
            <a href="#/blog" data-link class="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors">
              <svg class="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              <span>Ver Blog no Site</span>
            </a>

            <button id="admin-export-btn" class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors">
              <svg class="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              <span>Exportar Código</span>
            </button>

            <button id="admin-create-btn" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#007A42] hover:bg-[#006637] shadow-sm transition-all active:scale-95">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
              <span>Nova Matéria</span>
            </button>

            <!-- Menu Perfil Usuário -->
            <div class="flex items-center gap-1.5 pl-2 border-l border-neutral-200">
              <button id="admin-profile-btn" title="Editar foto e dados de perfil" class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-neutral-100 transition-all group text-left">
                <div class="relative">
                  <img src="${user.avatar}" alt="${user.name}" class="w-8 h-8 rounded-full object-cover border border-neutral-200 group-hover:border-[#60B73F] transition-colors" />
                  <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full shadow-xs flex items-center justify-center text-[9px] text-neutral-600 border border-neutral-200 group-hover:text-[#007A42]">✏️</span>
                </div>
                <div class="hidden lg:block">
                  <div class="text-xs font-bold text-neutral-900 leading-tight group-hover:text-[#007A42] transition-colors flex items-center gap-1">
                    <span>${user.name}</span>
                    <svg class="w-3 h-3 text-neutral-400 group-hover:text-[#007A42]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                  <div class="text-[10px] text-neutral-500">${user.role}</div>
                </div>
              </button>
              <button id="admin-logout-btn" title="Sair do Painel" class="p-2 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              </button>
            </div>
          </div>

        </div>
      </header>

      <!-- Conteúdo Principal -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <!-- Métricas Rápidas -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs">
            <span class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Total de Artigos</span>
            <div class="text-3xl font-black text-neutral-900 mt-1">${allArticles.length}</div>
            <div class="text-[11px] text-neutral-500 mt-1">Matérias ativas no blog</div>
          </div>

          <div class="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs">
            <span class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Categorias</span>
            <div class="text-3xl font-black text-[#007A42] mt-1">${categories.filter(c => c !== 'Todos').length}</div>
            <div class="text-[11px] text-neutral-500 mt-1">Eixos temáticos de SEO</div>
          </div>

          <div class="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs">
            <span class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Artigo em Destaque</span>
            <div class="text-3xl font-black text-neutral-900 mt-1">${featuredCount}</div>
            <div class="text-[11px] text-neutral-500 mt-1">Exibido na capa do blog</div>
          </div>

          <!-- Card de Autor & Foto de Perfil -->
          <div class="bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Autor Oficial</span>
                <button id="admin-card-edit-profile-btn" class="text-[11px] font-bold text-[#007A42] hover:underline flex items-center gap-1 cursor-pointer">
                  <span>Alterar Foto</span>
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                </button>
              </div>
              <div class="flex items-center gap-3 mt-2">
                <img src="${user.avatar}" alt="${user.name}" class="w-10 h-10 rounded-full object-cover border border-neutral-200 shrink-0" />
                <div class="min-w-0">
                  <div class="text-sm font-bold text-neutral-900 truncate">${user.name}</div>
                  <div class="text-[11px] text-neutral-500 truncate">${user.role}</div>
                </div>
              </div>
            </div>
            <div class="text-[10px] text-neutral-400 mt-2 truncate font-mono">${user.email}</div>
          </div>
        </div>

        <!-- Barra de Ferramentas & Filtros -->
        <div class="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <!-- Busca -->
          <div class="relative w-full md:w-96">
            <svg class="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input 
              type="text" 
              id="admin-search-input" 
              placeholder="Buscar por título, resumo ou slug..." 
              value="${currentSearch}"
              class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F5F7] border border-neutral-200 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all"
            />
          </div>

          <!-- Filtro de Categorias & Ações de Manutenção -->
          <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap">
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-neutral-500">Categoria:</span>
              <select id="admin-category-filter" class="px-3 py-2 rounded-xl bg-[#F5F5F7] border border-neutral-200 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#60B73F]">
                ${categories.map(c => `<option value="${c}" ${c === currentCategory ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </div>

            <button id="admin-reset-defaults-btn" title="Restaura os 10 artigos originais se necessário" class="px-3 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors">
              Restaurar Padrão
            </button>
          </div>

        </div>

        <!-- Tabela / Lista de Artigos -->
        <div class="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-neutral-50/80 border-b border-neutral-200 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  <th class="py-3.5 px-4">Artigo & Título</th>
                  <th class="py-3.5 px-4 hidden sm:table-cell">Categoria</th>
                  <th class="py-3.5 px-4 hidden md:table-cell">Data & Leitura</th>
                  <th class="py-3.5 px-4 text-center">Status</th>
                  <th class="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-100 text-xs">
                ${filtered.length === 0 ? `
                  <tr>
                    <td colspan="5" class="py-12 text-center text-neutral-400">
                      Nenhuma matéria encontrada com os filtros selecionados.
                    </td>
                  </tr>
                ` : filtered.map(art => `
                  <tr class="hover:bg-neutral-50/50 transition-colors group">
                    <td class="py-3.5 px-4">
                      <div class="flex items-center gap-3">
                        <img src="${art.image}" alt="" class="w-14 h-11 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-200" />
                        <div class="min-w-0">
                          <div class="font-bold text-neutral-900 group-hover:text-[#007A42] transition-colors line-clamp-1">
                            ${art.title}
                          </div>
                          <div class="text-[11px] text-neutral-400 font-mono truncate max-w-md">
                            /#/blog/${art.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="py-3.5 px-4 hidden sm:table-cell">
                      <span class="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200">
                        ${art.category}
                      </span>
                    </td>
                    <td class="py-3.5 px-4 hidden md:table-cell text-neutral-500">
                      <div>${art.date}</div>
                      <div class="text-[10px] text-neutral-400">${art.readingTime}</div>
                    </td>
                    <td class="py-3.5 px-4 text-center">
                      ${art.featured ? `
                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#60B73F]/15 text-[#007A42]">
                          ★ Destaque
                        </span>
                      ` : `
                        <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-500">
                          Publicado
                        </span>
                      `}
                    </td>
                    <td class="py-3.5 px-4 text-right">
                      <div class="flex items-center justify-end gap-1">
                        <a 
                          href="#/blog/${art.slug}" 
                          target="_blank" 
                          title="Visualizar no Blog" 
                          class="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        </a>
                        <button 
                          data-action="edit" 
                          data-id="${art.id}" 
                          title="Editar Artigo" 
                          class="p-2 text-neutral-600 hover:text-[#007A42] hover:bg-[#60B73F]/10 rounded-lg transition-colors font-medium"
                        >
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button 
                          data-action="delete" 
                          data-id="${art.id}" 
                          data-title="${art.title.replace(/"/g, '&quot;')}"
                          title="Excluir Artigo" 
                          class="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      <!-- Container do Modal de Edição -->
      <div id="admin-editor-modal-container"></div>

      <!-- Container do Modal de Exportação de Código -->
      <div id="admin-export-modal-container"></div>

      <!-- Container do Modal de Edição de Perfil & Foto -->
      <div id="admin-profile-modal-container"></div>
    `;

    attachDashboardEvents();
  }

  // ========================================================
  // EVENTOS DO DASHBOARD
  // ========================================================
  function attachDashboardEvents() {
    // Abrir Modal de Edição de Perfil / Foto
    const profileBtn = container.querySelector('#admin-profile-btn');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        openProfileModal();
      });
    }

    const cardProfileBtn = container.querySelector('#admin-card-edit-profile-btn');
    if (cardProfileBtn) {
      cardProfileBtn.addEventListener('click', () => {
        openProfileModal();
      });
    }

    // Logout
    const logoutBtn = container.querySelector('#admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (confirm('Deseja realmente sair do painel administrativo?')) {
          articleService.logout();
          showToast('Sessão encerrada com sucesso.');
          render();
        }
      });
    }

    // Busca
    const searchInput = container.querySelector('#admin-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderDashboardView();
        // Manter o foco no input após re-render
        const reInput = container.querySelector('#admin-search-input');
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(currentSearch.length, currentSearch.length);
        }
      });
    }

    // Filtro de Categoria
    const catSelect = container.querySelector('#admin-category-filter');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        renderDashboardView();
      });
    }

    // Criar Nova Matéria
    const createBtn = container.querySelector('#admin-create-btn');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        openEditor(null);
      });
    }

    // Exportar Código
    const exportBtn = container.querySelector('#admin-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        openExportModal();
      });
    }

    // Restaurar Padrões
    const resetBtn = container.querySelector('#admin-reset-defaults-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Atenção: Isso restaurará os 10 artigos padrão originais e apagará modificações locais. Deseja prosseguir?')) {
          articleService.resetToDefaults();
          showToast('Artigos restaurados para o padrão original!');
          renderDashboardView();
        }
      });
    }

    // Ações de cada linha (Editar, Excluir)
    container.querySelectorAll('button[data-action="edit"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const art = articleService.getAll().find(a => a.id === id);
        if (art) {
          openEditor(art);
        }
      });
    });

    container.querySelectorAll('button[data-action="delete"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const title = btn.getAttribute('data-title');
        if (confirm(`Tem certeza que deseja excluir a matéria:\n"${title}"?`)) {
          articleService.deleteArticle(id);
          showToast('Matéria excluída com sucesso.');
          renderDashboardView();
        }
      });
    });
  }

  // ========================================================
  // 3. MODAL DE CRIAÇÃO / EDIÇÃO DE ARTIGO
  // ========================================================
  function openEditor(article) {
    editingArticle = article;
    const modalContainer = container.querySelector('#admin-editor-modal-container');
    if (!modalContainer) return;

    const isNew = !article;
    const initialTitle = article ? article.title : '';
    const initialSlug = article ? article.slug : '';
    const initialCat = article ? article.category : 'Manejo Biológico';
    const initialExcerpt = article ? article.excerpt : '';
    const initialImage = article ? article.image : SUGGESTED_COVERS[0].url;
    const initialFeatured = article ? !!article.featured : false;
    const initialContent = article ? article.content : `<h2>Contexto e Importância no Campo</h2>\n<p>Insira aqui a análise técnica ou comercial detalhada...</p>\n\n<h2>Como a Solução Atua</h2>\n<p>Descreva os microrganismos e modos de ação...</p>\n\n<h2>Recomendações Práticas</h2>\n<ul>\n  <li><strong>Dose recomendada:</strong> Consultar bula técnica;</li>\n  <li><strong>Momento de aplicação:</strong> Adequado às condições de campo;</li>\n</ul>`;
    const initialRefs = article && Array.isArray(article.references) ? article.references.join('\n') : 'EMBRAPA. Tecnologias de Produção Agrícola, 2024.\nMAPA - Anuário Oficial de Bioinsumos, Brasília.';
    const initialProductIds = article && Array.isArray(article.relatedProductIds) ? article.relatedProductIds : [];

    const categories = articleService.getCategories();

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
        <div class="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
          
          <!-- Cabeçalho do Editor -->
          <div class="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
            <div>
              <h2 class="text-lg font-black text-neutral-900">
                ${isNew ? 'Criar Nova Matéria' : 'Editar Matéria'}
              </h2>
              <p class="text-xs text-neutral-500">
                Autor: <strong>Sued Oninem</strong> (Head de Marketing) • Publicação Imediata
              </p>
            </div>
            <button id="editor-close-btn" class="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Corpo do Formulário com Scroll -->
          <form id="article-editor-form" class="p-6 overflow-y-auto space-y-6 flex-grow">
            
            <!-- Título e Geração de Slug -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div class="md:col-span-8">
                <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5" for="form-title">
                  Título da Matéria (SEO Comercial) *
                </label>
                <input 
                  type="text" 
                  id="form-title" 
                  required 
                  value="${initialTitle.replace(/"/g, '&quot;')}"
                  placeholder="Ex: Manejo Biológico de Mofo-Branco na Soja..."
                  class="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-neutral-200 text-sm font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all"
                />
              </div>

              <div class="md:col-span-4">
                <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5" for="form-category">
                  Categoria Temática
                </label>
                <select id="form-category" class="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-neutral-200 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#60B73F]">
                  ${categories.filter(c => c !== 'Todos').map(c => `
                    <option value="${c}" ${c === initialCat ? 'selected' : ''}>${c}</option>
                  `).join('')}
                  <option value="__nova__">+ Nova Categoria...</option>
                </select>
              </div>
            </div>

            <!-- Slug da URL -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700" for="form-slug">
                  Slug da URL (Link Amigável para SEO) *
                </label>
                <span class="text-[11px] text-neutral-400">Ex: /#/blog/<strong>slug-do-artigo</strong></span>
              </div>
              <div class="flex items-center">
                <span class="px-3 py-3 rounded-l-2xl bg-neutral-100 border border-r-0 border-neutral-200 text-xs font-mono text-neutral-500">
                  /#/blog/
                </span>
                <input 
                  type="text" 
                  id="form-slug" 
                  required 
                  value="${initialSlug}"
                  placeholder="manejo-biologico-mofo-branco..."
                  class="flex-1 px-4 py-3 rounded-r-2xl bg-[#F5F5F7] border border-neutral-200 text-xs font-mono font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all"
                />
              </div>
            </div>

            <!-- Resumo / Lead do Artigo -->
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5" for="form-excerpt">
                Resumo / Lead (Meta Description de Conversão) *
              </label>
              <textarea 
                id="form-excerpt" 
                rows="2" 
                required 
                placeholder="Breve resumo comercial e agronômico que atrairá cliques no Google e redes sociais..."
                class="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-neutral-200 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all"
              >${initialExcerpt}</textarea>
            </div>

            <!-- Imagem de Capa & Sugestões Rápidas -->
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5" for="form-image">
                URL da Imagem de Capa (Alta Resolução)
              </label>
              <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <input 
                  type="url" 
                  id="form-image" 
                  value="${initialImage}"
                  placeholder="https://images.unsplash.com/..."
                  class="flex-1 px-4 py-2.5 rounded-2xl bg-[#F5F5F7] border border-neutral-200 text-xs font-mono text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#60B73F]"
                />
                <img id="form-image-preview" src="${initialImage}" alt="Prévia" class="w-20 h-12 rounded-xl object-cover border border-neutral-200 shrink-0 bg-neutral-100" />
              </div>

              <!-- Sugestões Rápidas de Fotos Agro -->
              <div class="mt-2.5 flex items-center gap-2 flex-wrap">
                <span class="text-[11px] font-semibold text-neutral-400">Sugestões rápidas:</span>
                ${SUGGESTED_COVERS.map(sug => `
                  <button type="button" class="form-sug-cover text-[10px] font-medium px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors" data-url="${sug.url}">
                    ${sug.label}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Destaque no Blog -->
            <div class="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
              <div>
                <span class="font-bold text-xs text-neutral-900 block">Artigo em Destaque (Hero do Blog)</span>
                <span class="text-[11px] text-neutral-500">Se ativado, esta matéria assumirá o banner principal do blog com maior destaque visual.</span>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="form-featured" class="sr-only peer" ${initialFeatured ? 'checked' : ''}>
                <div class="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007A42]"></div>
              </label>
            </div>

            <!-- Produtos Relacionados Biopar -->
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Vincular Produtos Biopar (Gera Botão de Compra no Artigo)
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1" id="form-related-products">
                ${products.map(p => {
                  const isChecked = initialProductIds.includes(p.id);
                  return `
                    <label class="flex items-center gap-2 p-2 rounded-xl border border-neutral-200 bg-[#F5F5F7] hover:bg-white cursor-pointer transition-colors text-xs">
                      <input type="checkbox" value="${p.id}" class="form-product-check rounded text-[#007A42] focus:ring-[#60B73F]" ${isChecked ? 'checked' : ''} />
                      <span class="font-bold text-neutral-800 truncate">${p.name}</span>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Conteúdo Rico do Artigo (HTML) -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700" for="form-content">
                  Conteúdo Completo da Matéria *
                </label>
                <!-- Barra de Ferramentas do Editor -->
                <div class="flex items-center gap-1">
                  <button type="button" class="editor-insert-tag px-2 py-1 text-[11px] font-bold rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700" data-tag="h2">H2</button>
                  <button type="button" class="editor-insert-tag px-2 py-1 text-[11px] font-bold rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700" data-tag="h3">H3</button>
                  <button type="button" class="editor-insert-tag px-2 py-1 text-[11px] font-bold rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700" data-tag="p">P</button>
                  <button type="button" class="editor-insert-tag px-2 py-1 text-[11px] font-bold rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700" data-tag="quote">Citação</button>
                  <button type="button" class="editor-insert-tag px-2 py-1 text-[11px] font-bold rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700" data-tag="ul">Lista</button>
                  <button type="button" class="editor-insert-tag px-2 py-1 text-[11px] font-bold rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700" data-tag="strong">Negrito</button>
                </div>
              </div>
              <textarea 
                id="form-content" 
                rows="10" 
                required 
                class="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-neutral-200 text-xs font-mono text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all leading-relaxed"
              >${initialContent}</textarea>
            </div>

            <!-- Referências Técnicas -->
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5" for="form-references">
                Fontes & Referências Científicas (1 por linha)
              </label>
              <textarea 
                id="form-references" 
                rows="2" 
                placeholder="EMBRAPA SOJA, Londrina, 2024.&#10;MAPA - Ministério da Agricultura e Pecuária."
                class="w-full px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-neutral-200 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#60B73F]"
              >${initialRefs}</textarea>
            </div>

          </form>

          <!-- Rodapé do Modal com Botões -->
          <div class="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
            <button type="button" id="editor-cancel-btn" class="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-colors">
              Cancelar
            </button>
            <button type="button" id="editor-save-btn" class="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#007A42] hover:bg-[#006637] shadow-md transition-all active:scale-95">
              ${isNew ? 'Publicar Matéria no Blog' : 'Salvar Alterações'}
            </button>
          </div>

        </div>
      </div>
    `;

    attachEditorEvents(isNew);
  }

  // ========================================================
  // EVENTOS DO MODAL EDITOR
  // ========================================================
  function attachEditorEvents(isNew) {
    const modalContainer = container.querySelector('#admin-editor-modal-container');
    const closeBtn = modalContainer.querySelector('#editor-close-btn');
    const cancelBtn = modalContainer.querySelector('#editor-cancel-btn');
    const saveBtn = modalContainer.querySelector('#editor-save-btn');
    const titleInput = modalContainer.querySelector('#form-title');
    const slugInput = modalContainer.querySelector('#form-slug');
    const imageInput = modalContainer.querySelector('#form-image');
    const imagePreview = modalContainer.querySelector('#form-image-preview');
    const contentTextarea = modalContainer.querySelector('#form-content');
    const categorySelect = modalContainer.querySelector('#form-category');

    function closeModal() {
      modalContainer.innerHTML = '';
      editingArticle = null;
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Auto-gerar slug ao digitar título em artigo novo
    if (isNew && titleInput && slugInput) {
      titleInput.addEventListener('input', () => {
        slugInput.value = articleService.generateSlug(titleInput.value);
      });
    }

    // Atualizar preview da imagem ao digitar ou clicar em sugestão
    if (imageInput && imagePreview) {
      imageInput.addEventListener('input', () => {
        imagePreview.src = imageInput.value || SUGGESTED_COVERS[0].url;
      });
    }

    modalContainer.querySelectorAll('.form-sug-cover').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        imageInput.value = url;
        imagePreview.src = url;
      });
    });

    // Inserção rápida de tags no conteúdo
    modalContainer.querySelectorAll('.editor-insert-tag').forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.getAttribute('data-tag');
        const start = contentTextarea.selectionStart;
        const end = contentTextarea.selectionEnd;
        const selected = contentTextarea.value.substring(start, end) || 'Texto aqui';

        let snippet = '';
        if (tag === 'h2') snippet = `\n<h2>${selected}</h2>\n`;
        else if (tag === 'h3') snippet = `\n<h3>${selected}</h3>\n`;
        else if (tag === 'p') snippet = `\n<p>${selected}</p>\n`;
        else if (tag === 'quote') snippet = `\n<blockquote>\n  "${selected}"\n</blockquote>\n`;
        else if (tag === 'ul') snippet = `\n<ul>\n  <li><strong>Item 1:</strong> ${selected}</li>\n  <li><strong>Item 2:</strong> Detalhes</li>\n</ul>\n`;
        else if (tag === 'strong') snippet = `<strong>${selected}</strong>`;

        contentTextarea.setRangeText(snippet, start, end, 'end');
        contentTextarea.focus();
      });
    });

    // Tratamento de nova categoria
    if (categorySelect) {
      categorySelect.addEventListener('change', () => {
        if (categorySelect.value === '__nova__') {
          const nova = prompt('Digite o nome da nova categoria de artigos:');
          if (nova && nova.trim()) {
            const opt = document.createElement('option');
            opt.value = nova.trim();
            opt.textContent = nova.trim();
            opt.selected = true;
            categorySelect.prepend(opt);
          } else {
            categorySelect.value = 'Manejo Biológico';
          }
        }
      });
    }

    // Salvar artigo
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const slug = slugInput.value.trim();
        const excerpt = modalContainer.querySelector('#form-excerpt').value.trim();
        const category = categorySelect.value;
        const image = imageInput.value.trim() || SUGGESTED_COVERS[0].url;
        const featured = modalContainer.querySelector('#form-featured').checked;
        const content = contentTextarea.value.trim();
        const refsRaw = modalContainer.querySelector('#form-references').value.trim();
        const references = refsRaw ? refsRaw.split('\n').map(r => r.trim()).filter(Boolean) : [];

        // Checkboxes de produtos
        const checkedProducts = [];
        modalContainer.querySelectorAll('.form-product-check:checked').forEach(chk => {
          checkedProducts.push(chk.value);
        });

        if (!title) {
          alert('Por favor, informe o título da matéria.');
          titleInput.focus();
          return;
        }

        if (!slug) {
          alert('Por favor, defina o link amigável (slug) do artigo.');
          slugInput.focus();
          return;
        }

        const payload = {
          title,
          slug,
          excerpt,
          category,
          image,
          featured,
          content,
          references,
          relatedProductIds: checkedProducts
        };

        if (editingArticle && editingArticle.id) {
          payload.id = editingArticle.id;
        }

        articleService.saveArticle(payload);
        showToast(isNew ? 'Nova matéria publicada com sucesso no blog!' : 'Matéria atualizada com sucesso!');
        closeModal();
        renderDashboardView();
      });
    }
  }

  // ========================================================
  // 4. MODAL DE EXPORTAÇÃO DE CÓDIGO
  // ========================================================
  function openExportModal() {
    const modalContainer = container.querySelector('#admin-export-modal-container');
    if (!modalContainer) return;

    const code = articleService.exportAsCode();

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
        <div class="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
          
          <div class="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
            <div>
              <h2 class="text-base font-black text-neutral-900">Exportar Banco de Artigos (Git / Deploy)</h2>
              <p class="text-xs text-neutral-500">Copie o código abaixo para atualizar permanentemente o arquivo <code class="bg-neutral-100 px-1 py-0.5 rounded text-[11px]">src/data/articles.js</code> no repositório.</p>
            </div>
            <button id="export-modal-close-btn" class="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="p-6 overflow-y-auto flex-grow">
            <textarea id="export-code-area" readonly class="w-full h-80 p-4 font-mono text-[11px] leading-relaxed bg-[#1E1E1E] text-green-400 rounded-2xl focus:outline-none select-all">${code}</textarea>
          </div>

          <div class="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
            <button type="button" id="export-modal-close-btn2" class="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-200 transition-colors">
              Fechar
            </button>
            <div class="flex items-center gap-2">
              <button type="button" id="export-download-btn" class="px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-800 bg-neutral-200 hover:bg-neutral-300 transition-colors">
                Baixar articles.js
              </button>
              <button type="button" id="export-copy-btn" class="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#007A42] hover:bg-[#006637] shadow-md transition-all">
                Copiar Código
              </button>
            </div>
          </div>

        </div>
      </div>
    `;

    const closeBtn = modalContainer.querySelector('#export-modal-close-btn');
    const closeBtn2 = modalContainer.querySelector('#export-modal-close-btn2');
    const copyBtn = modalContainer.querySelector('#export-copy-btn');
    const downloadBtn = modalContainer.querySelector('#export-download-btn');

    function closeModal() {
      modalContainer.innerHTML = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeBtn2) closeBtn2.addEventListener('click', closeModal);

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(code).then(() => {
          showToast('Código copiado para a área de transferência!');
          copyBtn.textContent = 'Copiado!';
          setTimeout(() => { copyBtn.textContent = 'Copiar Código'; }, 2000);
        });
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const blob = new Blob([code], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'articles.js';
        a.click();
        URL.revokeObjectURL(url);
        showToast('Download do arquivo articles.js iniciado!');
      });
    }
  }

  // ========================================================
  // 5. MODAL DE EDIÇÃO DE PERFIL E FOTO DO AUTOR
  // ========================================================
  function openProfileModal() {
    const modalContainer = container.querySelector('#admin-profile-modal-container');
    if (!modalContainer) return;

    const user = articleService.getCurrentUser() || {
      name: 'Sued Oninem',
      email: 'marketing@biopar.agr.br',
      role: 'Head de Marketing',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Head de Marketing da Biopar Biotecnologia Agrícola. Especialista em posicionamento comercial, inteligência de mercado do agronegócio e estratégias de bioinsumos para produtores e cooperativas.'
    };

    let currentAvatarValue = user.avatar || '';

    // Sugestões de avatares executivos rápidos
    const SUGGESTED_AVATARS = [
      { label: 'Original', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { label: 'Executivo 1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { label: 'Executivo 2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { label: 'Executivo 3', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
      { label: 'Executivo 4', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80' }
    ];

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
        <div class="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
          
          <!-- Cabeçalho do Modal -->
          <div class="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
            <div>
              <h2 class="text-base font-black text-neutral-900">Editar Perfil & Foto do Autor</h2>
              <p class="text-xs text-neutral-500">Altere sua foto de exibição, cargo e biografia institucional.</p>
            </div>
            <button id="profile-modal-close-btn" class="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Conteúdo do Formulário -->
          <div class="p-6 overflow-y-auto space-y-6 flex-grow text-xs">
            
            <!-- Foto de Perfil / Avatar -->
            <div class="flex flex-col items-center text-center p-5 rounded-2xl bg-neutral-50 border border-neutral-200/70">
              <div class="relative group mb-3">
                <img 
                  id="profile-preview-img" 
                  src="${currentAvatarValue}" 
                  alt="${user.name}" 
                  class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg bg-neutral-200"
                />
                <button 
                  type="button" 
                  id="profile-upload-trigger-btn" 
                  title="Alterar foto do computador"
                  class="absolute bottom-0 right-0 p-2 rounded-full bg-[#007A42] hover:bg-[#006637] text-white shadow-md transition-all active:scale-95"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </button>
                <input type="file" id="profile-file-input" accept="image/*" class="hidden" />
              </div>

              <div class="space-y-1">
                <div class="font-bold text-sm text-neutral-900">${user.name}</div>
                <div class="text-[11px] text-neutral-500">${user.role}</div>
              </div>

              <!-- Botão para upload direto do PC -->
              <div class="mt-3">
                <button 
                  type="button" 
                  id="profile-btn-choose-file"
                  class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-700 font-semibold text-[11px] shadow-2xs hover:shadow-xs transition-all"
                >
                  <svg class="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span>Escolher Imagem do Computador</span>
                </button>
              </div>

              <!-- Ou via URL -->
              <div class="w-full mt-4 text-left">
                <label class="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1" for="profile-avatar-url-input">
                  Ou informe a URL da foto:
                </label>
                <input 
                  type="url" 
                  id="profile-avatar-url-input" 
                  value="${currentAvatarValue.startsWith('data:') ? '' : currentAvatarValue}"
                  placeholder="https://exemplo.com/sua-foto.jpg"
                  class="w-full px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-mono text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#60B73F]"
                />
              </div>

              <!-- Avatares Sugeridos -->
              <div class="w-full mt-3 text-left">
                <span class="text-[10px] font-semibold text-neutral-400 block mb-1.5">Avatares profissionais sugeridos:</span>
                <div class="flex items-center gap-2 flex-wrap">
                  ${SUGGESTED_AVATARS.map(s => `
                    <button type="button" class="profile-sug-avatar px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white hover:bg-neutral-200 text-neutral-700 border border-neutral-200 transition-colors" data-url="${s.url}">
                      ${s.label}
                    </button>
                  `).join('')}
                </div>
              </div>

            </div>

            <!-- Dados Textuais -->
            <div class="space-y-4">
              <div>
                <label class="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1" for="profile-input-name">
                  Nome Completo do Autor
                </label>
                <input 
                  type="text" 
                  id="profile-input-name" 
                  value="${user.name}"
                  required
                  class="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5F7] border border-neutral-200 text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1" for="profile-input-role">
                  Cargo / Especialidade
                </label>
                <input 
                  type="text" 
                  id="profile-input-role" 
                  value="${user.role}"
                  required
                  placeholder="Ex: Head de Marketing — Biopar"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5F7] border border-neutral-200 text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label class="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1" for="profile-input-bio">
                  Mini Biografia Institucional (Exibida nos Artigos)
                </label>
                <textarea 
                  id="profile-input-bio" 
                  rows="3"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5F7] border border-neutral-200 text-xs font-normal text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all leading-relaxed"
                >${user.bio || ''}</textarea>
              </div>

              <!-- Opção de Sincronização em Lote -->
              <div class="p-3.5 rounded-xl bg-[#60B73F]/10 border border-[#60B73F]/20 flex items-start gap-2.5">
                <input 
                  type="checkbox" 
                  id="profile-sync-articles-check" 
                  checked 
                  class="mt-0.5 rounded text-[#007A42] focus:ring-[#60B73F]"
                />
                <label for="profile-sync-articles-check" class="text-[11px] text-neutral-700 cursor-pointer">
                  <strong class="text-[#007A42] block">Sincronizar com todas as matérias já publicadas</strong>
                  Atualiza instantaneamente a foto, nome e cargo nos cards e páginas de leitura do blog.
                </label>
              </div>

            </div>

          </div>

          <!-- Rodapé do Modal -->
          <div class="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
            <button type="button" id="profile-modal-cancel-btn" class="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-200 transition-colors">
              Cancelar
            </button>
            <button type="button" id="profile-modal-save-btn" class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#007A42] hover:bg-[#006637] shadow-md transition-all active:scale-95">
              Salvar Alterações
            </button>
          </div>

        </div>
      </div>
    `;

    const closeBtn = modalContainer.querySelector('#profile-modal-close-btn');
    const cancelBtn = modalContainer.querySelector('#profile-modal-cancel-btn');
    const saveBtn = modalContainer.querySelector('#profile-modal-save-btn');
    const previewImg = modalContainer.querySelector('#profile-preview-img');
    const fileInput = modalContainer.querySelector('#profile-file-input');
    const chooseFileBtn = modalContainer.querySelector('#profile-btn-choose-file');
    const triggerUploadBtn = modalContainer.querySelector('#profile-upload-trigger-btn');
    const urlInput = modalContainer.querySelector('#profile-avatar-url-input');
    const nameInput = modalContainer.querySelector('#profile-input-name');
    const roleInput = modalContainer.querySelector('#profile-input-role');
    const bioTextarea = modalContainer.querySelector('#profile-input-bio');
    const syncCheck = modalContainer.querySelector('#profile-sync-articles-check');

    function closeModal() {
      modalContainer.innerHTML = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Disparar seleção de arquivo do PC
    const triggerFile = () => fileInput && fileInput.click();
    if (chooseFileBtn) chooseFileBtn.addEventListener('click', triggerFile);
    if (triggerUploadBtn) triggerUploadBtn.addEventListener('click', triggerFile);

    // Processar arquivo selecionado via FileReader e otimizar para avatar quadrado
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            const rawData = evt.target.result;
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = 250;
              canvas.height = 250;

              // Recorte quadrado perfeito centralizado
              const minDim = Math.min(img.width, img.height);
              const sx = (img.width - minDim) / 2;
              const sy = (img.height - minDim) / 2;

              ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, 250, 250);
              currentAvatarValue = canvas.toDataURL('image/jpeg', 0.88);
              if (previewImg) previewImg.src = currentAvatarValue;
              if (urlInput) urlInput.value = '';
              showToast('Foto do computador carregada com sucesso!');
            };
            img.src = rawData;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Processar URL digitada
    if (urlInput) {
      urlInput.addEventListener('input', () => {
        const val = urlInput.value.trim();
        if (val) {
          currentAvatarValue = val;
          if (previewImg) previewImg.src = val;
        }
      });
    }

    // Sugestões de avatares
    modalContainer.querySelectorAll('.profile-sug-avatar').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-url');
        currentAvatarValue = url;
        if (previewImg) previewImg.src = url;
        if (urlInput) urlInput.value = url;
      });
    });

    // Salvar Perfil
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const newName = nameInput.value.trim();
        const newRole = roleInput.value.trim();
        const newBio = bioTextarea.value.trim();
        const doSync = syncCheck.checked;

        if (!newName) {
          alert('Por favor, informe o nome do autor.');
          nameInput.focus();
          return;
        }

        articleService.updateProfile({
          name: newName,
          role: newRole,
          avatar: currentAvatarValue || user.avatar,
          bio: newBio
        }, doSync);

        showToast('Foto de perfil e dados atualizados com sucesso!');
        closeModal();
        renderDashboardView();
      });
    }
  }

  // Render inicial
  render();

  return container;
}
