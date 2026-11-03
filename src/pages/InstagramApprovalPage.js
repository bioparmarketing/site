/**
 * Central de Aprovação de Conteúdos para Instagram da Biopar (/aprovações)
 * Reprodução fiel da interface de perfil do Instagram com Feed, grade 3x3,
 * modal de aprovação/alterações do CEO, agendamento de posts e upload de conteúdos.
 */

import { instagramApprovalService } from '../services/instagramApprovalService.js';
import { articleService } from '../services/articleService.js';
import { showToast } from '../components/Toast.js';

export function createInstagramApprovalPage({ router }) {
  const container = document.createElement('div');
  container.className = 'w-full min-h-screen bg-[#FAFAFA] text-[#262626] font-sans antialiased';

  let currentFilter = 'todos'; // 'todos' | 'pendente' | 'aprovado' | 'alteracoes' | 'publicado'
  let selectedPost = null;
  let activeCarouselIndex = 0;
  let isRequestingChanges = false;
  let editingPost = null;

  function render() {
    const isAuth = articleService.isAuthenticated();
    if (!isAuth) {
      renderLoginView();
    } else {
      renderApprovalHub();
    }
  }

  // ========================================================
  // 1. TELA DE LOGIN / AUTENTICAÇÃO
  // ========================================================
    function renderLoginView() {
    container.innerHTML = `
      <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#F9F9F9] via-[#FFFFFF] to-[#F2F2F2]">
        <div class="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-neutral-200/80">
          
          <!-- Cabeçalho -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full p-1 bg-gradient-to-tr from-[#60B73F] via-[#007A42] to-[#25D366] flex items-center justify-center shadow-md">
              <div class="w-full h-full bg-white rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-[#007A42]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </div>
            
            <div class="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#60B73F]/15 text-[#007A42] uppercase tracking-wider mb-2">
              Instagram Studio
            </div>
            <h1 class="text-2xl font-black text-neutral-900 tracking-tight">Central de Aprovação</h1>
            <p class="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
              Ambiente exclusivo para o CEO avaliar, aprovar e solicitar ajustes nas publicações da Biopar.
            </p>
          </div>

          <!-- Formulário -->
          <form id="approval-login-form" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1" for="approval-email">
                E-mail Corporativo
              </label>
              <input 
                type="email" 
                id="approval-email" 
                required 
                value="" 
                autocomplete="username"
                placeholder="seu-email@biopar.agr.br"
                class="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1" for="approval-password">
                Senha de Acesso
              </label>
              <input 
                type="password" 
                id="approval-password" 
                required 
                value="" 
                autocomplete="current-password"
                placeholder="••••••••"
                class="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all"
              />
            </div>

            <div id="approval-login-error" class="hidden p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600"></div>

            <button 
              type="submit" 
              class="w-full py-3.5 px-6 rounded-2xl bg-neutral-900 hover:bg-black text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Acessar Painel de Aprovações</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </form>

          <!-- Links de Navegação -->
          <div class="mt-8 pt-6 border-t border-neutral-100 text-center">
            <a href="#/" data-link class="text-xs font-medium text-neutral-400 hover:text-neutral-900 transition-colors">
              ← Voltar ao site oficial
            </a>
          </div>

        </div>
      </div>
    `;

    const form = container.querySelector('#approval-login-form');
    const errBox = container.querySelector('#approval-login-error');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = container.querySelector('#approval-email').value;
      const pass = container.querySelector('#approval-password').value;

      const result = articleService.login(email, pass);
      if (result.success) {
        showToast(`Bem-vindo, ${result.user.name}!`);
        render();
      } else {
        errBox.textContent = result.message || 'Credenciais inválidas.';
        errBox.classList.remove('hidden');
      }
    });
  }

  // ========================================================
  // 2. CENTRAL PRINCIPAL — FEED DO INSTAGRAM COM APROVAÇÃO
  // ========================================================
  function renderApprovalHub() {
    const user = articleService.getCurrentUser() || { name: 'Sued Oninem', role: 'Head de Marketing' };
    const allPosts = instagramApprovalService.getAll();
    const metrics = instagramApprovalService.getMetrics();

    // Filtra os posts conforme a aba selecionada
    const filteredPosts = currentFilter === 'todos' 
      ? allPosts 
      : allPosts.filter(p => p.status === currentFilter);

    container.innerHTML = `
      <!-- Barra Superior de Navegação -->
      <nav class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          <!-- Logo & Nome do Perfil -->
          <div class="flex items-center gap-3">
            <a href="#/aprovacoes" data-link class="flex items-center gap-2 group">
              <span class="text-xl font-bold tracking-tight text-neutral-900 font-serif">Instagram</span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#60B73F]/15 text-[#007A42]">Studio Biopar</span>
            </a>
          </div>

          <!-- Ações Rápidas -->
          <div class="flex items-center gap-2 sm:gap-3">
            
            <button 
              id="hub-btn-new-post" 
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#007A42] hover:bg-[#006637] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
              <span>Novo Post</span>
            </button>

            <a 
              href="#/admin" 
              data-link 
              class="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-xs transition-colors"
            >
              <svg class="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
              <span>Blog CMS</span>
            </a>

            <!-- Usuário & Logout -->
            <div class="flex items-center gap-2 pl-2 border-l border-neutral-200">
              <span class="text-xs font-semibold text-neutral-700 hidden md:inline truncate max-w-[120px]">${user.name}</span>
              <button 
                id="hub-btn-logout" 
                title="Sair do Studio"
                class="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              </button>
            </div>

          </div>

        </div>
      </nav>

      <!-- Conteúdo Principal -->
      <main class="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        <!-- ========================================== -->
        <!-- HEADER DO PERFIL DO INSTAGRAM DA BIOPAR     -->
        <!-- ========================================== -->
        <header class="mb-8 pb-8 border-b border-neutral-200">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
            
            <!-- Foto de Perfil com Anel de Destaque Gradiente -->
            <div class="relative shrink-0">
              <div class="w-24 h-24 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-[#60B73F] via-[#007A42] to-[#25D366] shadow-md flex items-center justify-center">
                <div class="w-full h-full bg-white rounded-full p-1.5 flex items-center justify-center overflow-hidden">
                  <img 
                    src="./static/assets/logo-biopar.svg" 
                    alt="Biopar" 
                    class="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div class="absolute bottom-1 right-2 bg-white rounded-full p-1 shadow-sm border border-neutral-200 text-[#007A42]" title="Perfil Oficial Biopar">
                <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>

            <!-- Dados & Bio do Perfil -->
            <div class="flex-1 text-center sm:text-left space-y-4">
              
              <!-- Linha de Usuário & Botões -->
              <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <div class="flex items-center justify-center sm:justify-start gap-2">
                  <h2 class="text-xl font-bold text-neutral-900 tracking-tight">biopar.agr.br</h2>
                  <svg class="w-4 h-4 text-[#007A42]" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                </div>

                <div class="flex items-center justify-center gap-2">
                  <button 
                    id="hub-btn-new-post-header"
                    class="px-4 py-1.5 rounded-lg bg-neutral-900 hover:bg-black text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    + Criar Novo Post
                  </button>
                  <a 
                    href="#/produtor" 
                    data-link
                    class="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs transition-colors"
                  >
                    Ver LP Produtor
                  </a>
                </div>
              </div>

              <!-- Contadores (Posts, Seguidores, Seguindo) -->
              <div class="flex items-center justify-center sm:justify-start gap-6 text-sm">
                <div><span class="font-bold text-neutral-900">${allPosts.length}</span> publicações</div>
                <div><span class="font-bold text-neutral-900">14,8 mil</span> seguidores</div>
                <div><span class="font-bold text-neutral-900">482</span> seguindo</div>
              </div>

              <!-- Bio Institucional -->
              <div class="text-xs leading-relaxed text-neutral-800 space-y-1">
                <div class="font-bold text-neutral-900">Biopar • Soluções Biológicas & Biotecnologia</div>
                <div class="text-neutral-500 font-medium">Biotecnologia Agrícola • Ciência no Campo 🌱</div>
                <div>🔬 Padrão Ouro em Pureza & Densidade Celular</div>
                <div>🌾 Biofungicidas, Bioinseticidas e Promotores de Crescimento</div>
                <div>📍 Da fábrica microbiológica direto para a lavoura</div>
                <div class="pt-0.5">
                  <a href="#/produtor" data-link class="text-[#007A42] font-semibold hover:underline flex items-center justify-center sm:justify-start gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                    <span>biopar.agr.br/produtor</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          <!-- Destaques (Stories Highlights em Círculos) -->
          <div class="flex items-center gap-4 sm:gap-6 overflow-x-auto pt-6 pb-2 no-scrollbar">
            
            <div class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
              <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border border-neutral-300 group-hover:border-[#60B73F] transition-colors flex items-center justify-center bg-white shadow-2xs">
                <div class="w-full h-full rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=150&q=80" alt="" class="w-full h-full object-cover" />
                </div>
              </div>
              <span class="text-[11px] font-medium text-neutral-700 truncate max-w-[64px]">Mofo-Branco</span>
            </div>

            <div class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
              <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border border-neutral-300 group-hover:border-[#60B73F] transition-colors flex items-center justify-center bg-white shadow-2xs">
                <div class="w-full h-full rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=150&q=80" alt="" class="w-full h-full object-cover" />
                </div>
              </div>
              <span class="text-[11px] font-medium text-neutral-700 truncate max-w-[64px]">Cigarrinha</span>
            </div>

            <div class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
              <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border border-neutral-300 group-hover:border-[#60B73F] transition-colors flex items-center justify-center bg-white shadow-2xs">
                <div class="w-full h-full rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=150&q=80" alt="" class="w-full h-full object-cover" />
                </div>
              </div>
              <span class="text-[11px] font-medium text-neutral-700 truncate max-w-[64px]">Laboratório</span>
            </div>

            <div class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
              <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border border-neutral-300 group-hover:border-[#60B73F] transition-colors flex items-center justify-center bg-white shadow-2xs">
                <div class="w-full h-full rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=150&q=80" alt="" class="w-full h-full object-cover" />
                </div>
              </div>
              <span class="text-[11px] font-medium text-neutral-700 truncate max-w-[64px]">Resultados</span>
            </div>

            <div class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
              <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 border border-neutral-300 group-hover:border-[#60B73F] transition-colors flex items-center justify-center bg-white shadow-2xs">
                <div class="w-full h-full rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=150&q=80" alt="" class="w-full h-full object-cover" />
                </div>
              </div>
              <span class="text-[11px] font-medium text-neutral-700 truncate max-w-[64px]">Aplicação</span>
            </div>

          </div>
        </header>

        <!-- ========================================== -->
        <!-- ABAS & FILTROS DE STATUS DE APROVAÇÃO      -->
        <!-- ========================================== -->
        <div class="mb-6">
          <div class="flex items-center justify-center gap-1 sm:gap-2 border-b border-neutral-200 pb-3 flex-wrap">
            
            <button 
              class="hub-filter-pill px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${currentFilter === 'todos' ? 'bg-neutral-900 text-white shadow-xs' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}"
              data-filter="todos"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm11 0h7v7h-7v-7z"/></svg>
              <span>Todos (${metrics.total})</span>
            </button>

            <button 
              class="hub-filter-pill px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${currentFilter === 'pendente' ? 'bg-amber-500 text-white shadow-xs' : 'bg-amber-50 text-amber-800 border border-amber-200/60 hover:bg-amber-100'}"
              data-filter="pendente"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Aguardando CEO (${metrics.pendentes})</span>
            </button>

            <button 
              class="hub-filter-pill px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${currentFilter === 'aprovado' ? 'bg-[#007A42] text-white shadow-xs' : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60 hover:bg-emerald-100'}"
              data-filter="aprovado"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              <span>Aprovados (${metrics.aprovados})</span>
            </button>

            <button 
              class="hub-filter-pill px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${currentFilter === 'alteracoes' ? 'bg-red-600 text-white shadow-xs' : 'bg-red-50 text-red-800 border border-red-200/60 hover:bg-red-100'}"
              data-filter="alteracoes"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              <span>Com Ajustes (${metrics.alteracoes})</span>
            </button>

            <button 
              class="hub-filter-pill px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${currentFilter === 'publicado' ? 'bg-blue-600 text-white shadow-xs' : 'bg-blue-50 text-blue-800 border border-blue-200/60 hover:bg-blue-100'}"
              data-filter="publicado"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Publicados (${metrics.publicados})</span>
            </button>

          </div>
        </div>

        <!-- ========================================== -->
        <!-- GRADE DO FEED DE FOTOS (GRID 3 COLUNAS)    -->
        <!-- ========================================== -->
        <div id="hub-posts-grid" class="grid grid-cols-3 gap-1 sm:gap-4 lg:gap-6">
          ${filteredPosts.length === 0 ? `
            <div class="col-span-3 py-16 text-center bg-white rounded-3xl border border-neutral-200">
              <div class="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3 text-neutral-400">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <h3 class="text-base font-bold text-neutral-800">Nenhum post encontrado nesta categoria</h3>
              <p class="text-xs text-neutral-500 mt-1">Clique em "+ Novo Post" para subir uma imagem para aprovação.</p>
            </div>
          ` : filteredPosts.map(post => {
            const isCarousel = Array.isArray(post.images) && post.images.length > 1;
            const coverImg = (post.images && post.images[0]) || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1080&q=80';
            
            // Badge visual de status
            let statusBadge = '';
            if (post.status === 'pendente') {
              statusBadge = `<span class="bg-amber-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md flex items-center gap-1"><span>⏳</span><span>Pendente</span></span>`;
            } else if (post.status === 'aprovado') {
              statusBadge = `<span class="bg-[#007A42] text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md flex items-center gap-1"><span>✓</span><span>Aprovado</span></span>`;
            } else if (post.status === 'alteracoes') {
              statusBadge = `<span class="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md flex items-center gap-1"><span>⚠️</span><span>Ajustes</span></span>`;
            } else if (post.status === 'publicado') {
              statusBadge = `<span class="bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md flex items-center gap-1"><span>🚀</span><span>No Ar</span></span>`;
            }

            return `
              <div 
                class="post-grid-item relative aspect-square bg-neutral-100 overflow-hidden rounded-lg sm:rounded-2xl cursor-pointer group shadow-2xs border border-neutral-200/60"
                data-id="${post.id}"
              >
                <!-- Imagem Quadrada -->
                <img 
                  src="${coverImg}" 
                  alt="${post.title || 'Post Instagram'}" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />

                <!-- Ícone de Carrossel (Canto Superior Direito) -->
                ${isCarousel ? `
                  <div class="absolute top-2 right-2 text-white drop-shadow-md bg-black/40 backdrop-blur-xs p-1 rounded-md">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
                    </svg>
                  </div>
                ` : ''}

                <!-- Status Badge (Fixo no Canto Superior Esquerdo) -->
                <div class="absolute top-2 left-2 z-10 pointer-events-none">
                  ${statusBadge}
                </div>

                <!-- Overlay Escuro no Hover (Estilo Instagram com Likes & Comentários) -->
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-3 text-center">
                  <div class="flex items-center gap-4 text-xs font-bold">
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      ${post.likesCount}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/></svg>
                      ${post.commentsCount}
                    </span>
                  </div>
                  <span class="text-[11px] font-bold text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mt-1 border border-white/30">
                    Abrir para Avaliar
                  </span>
                </div>

              </div>
            `;
          }).join('')}
        </div>

      </main>

      <!-- Containers dos Modais -->
      <div id="hub-post-detail-modal-container"></div>
      <div id="hub-create-post-modal-container"></div>
    `;

    attachHubEvents();
  }

  // ========================================================
  // EVENTOS DA CENTRAL DE APROVAÇÃO
  // ========================================================
  function attachHubEvents() {
    // Logout
    const logoutBtn = container.querySelector('#hub-btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (confirm('Deseja encerrar a sessão na Central de Aprovação?')) {
          articleService.logout();
          showToast('Sessão encerrada.');
          render();
        }
      });
    }

    // Filtros de Status
    container.querySelectorAll('.hub-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.getAttribute('data-filter');
        renderApprovalHub();
      });
    });

    // Abrir Modal de Novo Post
    const newPostBtn = container.querySelector('#hub-btn-new-post');
    const newPostHeaderBtn = container.querySelector('#hub-btn-new-post-header');
    if (newPostBtn) newPostBtn.addEventListener('click', () => openCreatePostModal());
    if (newPostHeaderBtn) newPostHeaderBtn.addEventListener('click', () => openCreatePostModal());

    // Clicar em um Post no Grid para abrir o detalhe estilo Instagram
    container.querySelectorAll('.post-grid-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        const post = instagramApprovalService.getById(id);
        if (post) {
          openPostDetailModal(post);
        }
      });
    });
  }

  // ========================================================
  // 3. MODAL DE DETALHES DO POST (ESTILO INSTAGRAM DESKTOP)
  // ========================================================
  function openPostDetailModal(post) {
    selectedPost = post;
    activeCarouselIndex = 0;
    isRequestingChanges = false;

    const modalContainer = container.querySelector('#hub-post-detail-modal-container');
    if (!modalContainer) return;

    renderPostDetailModalContent();
  }

  function renderPostDetailModalContent() {
    const modalContainer = container.querySelector('#hub-post-detail-modal-container');
    if (!modalContainer || !selectedPost) return;

    const post = selectedPost;
    const images = Array.isArray(post.images) && post.images.length > 0 ? post.images : ['https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1080&q=80'];
    const currentImg = images[activeCarouselIndex] || images[0];
    const isCarousel = images.length > 1;

    // Badge do Status
    let statusBadge = '';
    if (post.status === 'pendente') {
      statusBadge = `<span class="bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5"><span>⏳</span><span>Pendente de Aprovação</span></span>`;
    } else if (post.status === 'aprovado') {
      statusBadge = `<span class="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5"><span>✓</span><span>Aprovado pelo CEO</span></span>`;
    } else if (post.status === 'alteracoes') {
      statusBadge = `<span class="bg-red-100 text-red-800 border border-red-300 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5"><span>⚠️</span><span>Alterações Solicitadas</span></span>`;
    } else if (post.status === 'publicado') {
      statusBadge = `<span class="bg-blue-100 text-blue-800 border border-blue-300 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5"><span>🚀</span><span>Publicado no Instagram</span></span>`;
    }

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fade-in">
        
        <!-- Botão Fechar Modal Flutuante -->
        <button id="detail-modal-close-btn" class="fixed top-4 right-4 z-50 text-white/80 hover:text-white p-2 rounded-full bg-black/40 hover:bg-black/70 transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <!-- Container do Post Estilo Instagram Web Desktop (Grid 2 Colunas) -->
        <div class="bg-white rounded-2xl sm:rounded-3xl w-full max-w-5xl shadow-2xl border border-neutral-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-[92vh]">
          
          <!-- ============================================== -->
          <!-- COLUNA ESQUERDA: VISUAL DA IMAGEM / CARROSSEL   -->
          <!-- ============================================== -->
          <div class="lg:col-span-7 bg-[#0D0D0E] flex items-center justify-center relative min-h-[360px] sm:min-h-[480px] lg:min-h-[620px] select-none overflow-hidden group p-2 sm:p-4">
            <img 
              id="detail-main-img" 
              src="${currentImg}" 
              alt="${post.title}" 
              class="max-w-full max-h-[82vh] w-auto h-auto object-contain mx-auto rounded-lg shadow-lg transition-all"
            />

            <!-- Setas de Navegação do Carrossel -->
            ${isCarousel ? `
              ${activeCarouselIndex > 0 ? `
                <button id="detail-prev-img-btn" class="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-all shadow-lg cursor-pointer">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
                </button>
              ` : ''}

              ${activeCarouselIndex < images.length - 1 ? `
                <button id="detail-next-img-btn" class="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-all shadow-lg cursor-pointer">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
                </button>
              ` : ''}

              <!-- Indicadores de Pontinhos do Carrossel -->
              <div class="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none">
                ${images.map((_, i) => `
                  <div class="w-2 h-2 rounded-full transition-all ${i === activeCarouselIndex ? 'bg-white scale-125' : 'bg-white/50'}"></div>
                `).join('')}
              </div>

              <!-- Indicador Numérico (ex: 1/3) -->
              <div class="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                ${activeCarouselIndex + 1}/${images.length}
              </div>
            ` : ''}

            <!-- Ações Flutuantes da Imagem (Tamanho Real & Download) -->
            <div class="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <a 
                href="${currentImg}" 
                target="_blank" 
                title="Abrir imagem em tamanho real 100%"
                class="p-2 rounded-full bg-black/70 hover:bg-black text-white text-xs transition-colors backdrop-blur-xs shadow-md"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>
              <a 
                href="${currentImg}" 
                target="_blank" 
                download="biopar-post-${post.id}.jpg" 
                title="Baixar imagem original"
                class="p-2 rounded-full bg-black/70 hover:bg-black text-white text-xs transition-colors backdrop-blur-xs shadow-md"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </a>
            </div>
          </div>

          <!-- ============================================== -->
          <!-- COLUNA DIREITA: LEGENDA, AÇÕES E APROVAÇÃO     -->
          <!-- ============================================== -->
          <div class="lg:col-span-5 flex flex-col justify-between h-full bg-white max-h-[85vh] lg:max-h-[92vh]">
            
            <!-- Topo: Identificação do Post -->
            <div class="px-5 py-4 border-b border-neutral-100 flex items-center justify-between gap-3 shrink-0">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#60B73F] to-[#007A42] flex items-center justify-center shrink-0">
                  <div class="w-full h-full bg-white rounded-full p-1 flex items-center justify-center">
                    <img src="./static/assets/logo-biopar.svg" alt="" class="w-full h-full object-contain" />
                  </div>
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <span class="text-xs font-bold text-neutral-900">biopar.agr.br</span>
                    <svg class="w-3.5 h-3.5 text-[#007A42]" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  </div>
                  <div class="text-[11px] text-neutral-400">
                    Programado: <strong class="text-neutral-700">${post.scheduledDate} às ${post.scheduledTime}</strong>
                  </div>
                </div>
              </div>

              <!-- Status Badge -->
              <div>
                ${statusBadge}
              </div>
            </div>

            <!-- Meio: Legenda com Scroll & Observações do CEO -->
            <div class="p-5 overflow-y-auto flex-grow space-y-4 text-xs">
              
              <!-- Alerta de Observações do CEO (Se houver alterações) -->
              ${post.reviewNotes && post.reviewNotes.length > 0 ? `
                <div class="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-xs flex items-center gap-1.5 text-amber-800">
                      <svg class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
                      Observações da Diretoria / CEO:
                    </span>
                    <span class="text-[10px] text-amber-600">${post.reviewNotes[0].date || ''}</span>
                  </div>
                  <p class="text-xs leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-amber-200/50">
                    "${post.reviewNotes[0].text}"
                  </p>
                </div>
              ` : ''}

              <!-- Área da Legenda -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Legenda do Instagram:</span>
                  <button 
                    id="detail-copy-caption-btn" 
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    <span>Copiar Legenda</span>
                  </button>
                </div>

                <div class="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-neutral-800 text-xs leading-relaxed whitespace-pre-line font-sans select-text">
                  ${post.caption}
                </div>
              </div>

              <!-- Metadados Adicionais -->
              <div class="pt-2 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Criado por: <strong>${post.createdBy || 'Sued Oninem'}</strong></span>
                <span>Categoria: <strong>${post.category || 'Manejo Biológico'}</strong></span>
              </div>

            </div>

            <!-- Rodapé: Painel de Decisão do CEO / Revisor (Aprovar ou Solicitar Alterações) -->
            <div class="p-4 sm:p-5 bg-neutral-50/90 border-t border-neutral-200 shrink-0 space-y-3">
              
              <!-- Se o formulário de alterações estiver aberto -->
              ${isRequestingChanges ? `
                <div class="space-y-3 animate-fade-in bg-white p-4 rounded-2xl border border-amber-300 shadow-sm">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-red-500"></span>
                      Descreva as alterações necessárias:
                    </span>
                    <button id="detail-cancel-changes-btn" class="text-[11px] text-neutral-400 hover:text-neutral-700 font-semibold">Cancelar</button>
                  </div>
                  <textarea 
                    id="detail-changes-textarea" 
                    rows="3" 
                    placeholder="Ex: Ajustar o texto da imagem para destacar mais a pureza de 1x10^10 e alterar o CTA da legenda..." 
                    class="w-full p-3 rounded-xl border border-neutral-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  ></textarea>
                  <button 
                    id="detail-submit-changes-btn" 
                    class="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Confirmar e Enviar Alterações para o Marketing
                  </button>
                </div>
              ` : `
                <!-- Ações Primárias de Aprovação -->
                <div class="flex items-center gap-2">
                  
                  ${post.status !== 'aprovado' && post.status !== 'publicado' ? `
                    <button 
                      id="detail-approve-btn" 
                      class="flex-1 py-3 px-4 rounded-xl bg-[#007A42] hover:bg-[#006637] text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                      <span>Aprovar Post</span>
                    </button>

                    <button 
                      id="detail-request-changes-btn" 
                      class="flex-1 py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                      <span>Solicitar Alterações</span>
                    </button>
                  ` : post.status === 'aprovado' ? `
                    <button 
                      id="detail-mark-published-btn" 
                      class="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                      <span>Marcar como Publicado no Instagram</span>
                    </button>
                    <button 
                      id="detail-request-changes-btn" 
                      class="py-3 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold"
                      title="Reabrir para solicitar ajustes"
                    >
                      Pedir Ajustes
                    </button>
                  ` : `
                    <div class="flex-1 py-2.5 px-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold text-center">
                      ✓ Post já publicado no Instagram oficial
                    </div>
                  `}

                </div>

                <!-- Ações Secundárias (Editar / Excluir) -->
                <div class="flex items-center justify-between pt-2 text-[11px] text-neutral-500 border-t border-neutral-200/60">
                  <button id="detail-edit-post-btn" class="hover:text-neutral-900 font-semibold cursor-pointer">
                    Editar dados do post
                  </button>
                  <button id="detail-delete-post-btn" class="text-neutral-400 hover:text-red-600 font-medium cursor-pointer">
                    Excluir publicação
                  </button>
                </div>
              `}

            </div>

          </div>

        </div>

      </div>
    `;

    attachDetailModalEvents();
  }

  function attachDetailModalEvents() {
    const modalContainer = container.querySelector('#hub-post-detail-modal-container');
    const closeBtn = modalContainer.querySelector('#detail-modal-close-btn');
    const copyCaptionBtn = modalContainer.querySelector('#detail-copy-caption-btn');
    const approveBtn = modalContainer.querySelector('#detail-approve-btn');
    const requestChangesBtn = modalContainer.querySelector('#detail-request-changes-btn');
    const cancelChangesBtn = modalContainer.querySelector('#detail-cancel-changes-btn');
    const submitChangesBtn = modalContainer.querySelector('#detail-submit-changes-btn');
    const markPublishedBtn = modalContainer.querySelector('#detail-mark-published-btn');
    const editPostBtn = modalContainer.querySelector('#detail-edit-post-btn');
    const deletePostBtn = modalContainer.querySelector('#detail-delete-post-btn');
    const prevImgBtn = modalContainer.querySelector('#detail-prev-img-btn');
    const nextImgBtn = modalContainer.querySelector('#detail-next-img-btn');

    function closeModal() {
      modalContainer.innerHTML = '';
      selectedPost = null;
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Carrossel anterior / próximo
    if (prevImgBtn) {
      prevImgBtn.addEventListener('click', () => {
        if (activeCarouselIndex > 0) {
          activeCarouselIndex--;
          renderPostDetailModalContent();
        }
      });
    }

    if (nextImgBtn) {
      nextImgBtn.addEventListener('click', () => {
        const images = selectedPost.images || [];
        if (activeCarouselIndex < images.length - 1) {
          activeCarouselIndex++;
          renderPostDetailModalContent();
        }
      });
    }

    // Copiar Legenda
    if (copyCaptionBtn) {
      copyCaptionBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(selectedPost.caption).then(() => {
          showToast('Legenda do Instagram copiada para a área de transferência!');
        });
      });
    }

    // Aprovar Post
    if (approveBtn) {
      approveBtn.addEventListener('click', () => {
        const user = articleService.getCurrentUser() || { name: 'CEO Biopar' };
        instagramApprovalService.approvePost(selectedPost.id, user.name);
        showToast('✓ Post APROVADO com sucesso para publicação!');
        selectedPost = instagramApprovalService.getById(selectedPost.id);
        renderPostDetailModalContent();
        renderApprovalHub();
      });
    }

    // Abrir campo de alterações
    if (requestChangesBtn) {
      requestChangesBtn.addEventListener('click', () => {
        isRequestingChanges = true;
        renderPostDetailModalContent();
      });
    }

    if (cancelChangesBtn) {
      cancelChangesBtn.addEventListener('click', () => {
        isRequestingChanges = false;
        renderPostDetailModalContent();
      });
    }

    // Enviar alterações
    if (submitChangesBtn) {
      submitChangesBtn.addEventListener('click', () => {
        const noteArea = modalContainer.querySelector('#detail-changes-textarea');
        const noteText = noteArea ? noteArea.value.trim() : '';
        if (!noteText) {
          alert('Por favor, informe quais alterações são necessárias no post.');
          return;
        }

        const user = articleService.getCurrentUser() || { name: 'CEO Biopar' };
        instagramApprovalService.requestChanges(selectedPost.id, noteText, user.name);
        showToast('Observações enviadas! Post marcado como "Alterações Solicitadas".');
        isRequestingChanges = false;
        selectedPost = instagramApprovalService.getById(selectedPost.id);
        renderPostDetailModalContent();
        renderApprovalHub();
      });
    }

    // Marcar como publicado
    if (markPublishedBtn) {
      markPublishedBtn.addEventListener('click', () => {
        instagramApprovalService.markAsPublished(selectedPost.id);
        showToast('Post marcado como publicado no Instagram!');
        selectedPost = instagramApprovalService.getById(selectedPost.id);
        renderPostDetailModalContent();
        renderApprovalHub();
      });
    }

    // Editar dados do post
    if (editPostBtn) {
      editPostBtn.addEventListener('click', () => {
        const postToEdit = { ...selectedPost };
        closeModal();
        openCreatePostModal(postToEdit);
      });
    }

    // Excluir post
    if (deletePostBtn) {
      deletePostBtn.addEventListener('click', () => {
        if (confirm(`Tem certeza que deseja remover o post "${selectedPost.title}" da fila de aprovação?`)) {
          instagramApprovalService.deletePost(selectedPost.id);
          showToast('Publicação removida com sucesso.');
          closeModal();
          renderApprovalHub();
        }
      });
    }
  }

  // ========================================================
  // 4. MODAL DE CRIAÇÃO / UPLOAD DE NOVO POST PARA APROVAÇÃO
  // ========================================================
  function openCreatePostModal(postToEdit = null) {
    editingPost = postToEdit;
    const modalContainer = container.querySelector('#hub-create-post-modal-container');
    if (!modalContainer) return;

    const isEdit = !!postToEdit;
    let uploadedImages = isEdit && Array.isArray(postToEdit.images) ? [...postToEdit.images] : [
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1080&q=80'
    ];

    const initialTitle = isEdit ? postToEdit.title : '';
    const initialCategory = isEdit ? postToEdit.category : 'Biofungicidas';
    const initialDate = isEdit ? postToEdit.scheduledDate : new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
    const initialTime = isEdit ? postToEdit.scheduledTime : '18:00';
    const initialCaption = isEdit ? postToEdit.caption : `Título impactante sobre manejo biológico no campo! 🌾🔬\n\nDescreva os diferenciais da tecnologia Biopar, modos de ação e benefícios comprovados em campo.\n\n✅ Alta pureza e densidade celular\n✅ Retorno garantido por hectare\n\nFale com nosso time técnico no link da bio! 🌱\n\n#Biopar #AgriculturaBiologica #SojaBrasil #ManejoIntegrado`;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
        <div class="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
          
          <!-- Topo do Modal -->
          <div class="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
            <div>
              <h2 class="text-base font-black text-neutral-900">
                ${isEdit ? 'Editar Publicação do Instagram' : 'Nova Publicação para Aprovação do CEO'}
              </h2>
              <p class="text-xs text-neutral-500">Suba as fotos e a copy que serão submetidas à diretoria.</p>
            </div>
            <button id="create-modal-close-btn" class="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Formulário -->
          <form id="create-post-form" class="p-6 overflow-y-auto space-y-5 flex-grow text-xs">
            
            <!-- Upload de Fotos -->
            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                Fotos do Post (1:1 Quadrado ou Carrossel) *
              </label>

              <!-- Grid de Prévias das Imagens -->
              <div id="create-images-preview-grid" class="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                ${uploadedImages.map((imgUrl, idx) => `
                  <div class="relative aspect-square rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 group">
                    <img src="${imgUrl}" alt="" class="w-full h-full object-cover" />
                    <button type="button" class="create-remove-img-btn absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white shadow-xs opacity-0 group-hover:opacity-100 transition-opacity" data-index="${idx}">
                      <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                `).join('')}
              </div>

              <!-- Botões de Adicionar Imagem -->
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button 
                  type="button" 
                  id="create-btn-upload-file" 
                  class="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span>Subir Foto do Computador</span>
                </button>
                <input type="file" id="create-file-input" accept="image/*" multiple class="hidden" />

                <button 
                  type="button" 
                  id="create-btn-add-url"
                  class="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs transition-colors"
                >
                  + Inserir URL Externa
                </button>
              </div>
            </div>

            <!-- Título Interno & Categoria -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1" for="create-input-title">
                  Título / Tema do Post *
                </label>
                <input 
                  type="text" 
                  id="create-input-title" 
                  required 
                  value="${initialTitle}" 
                  placeholder="Ex: Manejo de Mofo-Branco na Soja..." 
                  class="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1" for="create-select-category">
                  Categoria Temática
                </label>
                <select id="create-select-category" class="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#60B73F]">
                  <option value="Biofungicidas" ${initialCategory === 'Biofungicidas' ? 'selected' : ''}>Biofungicidas</option>
                  <option value="Bioinseticidas" ${initialCategory === 'Bioinseticidas' ? 'selected' : ''}>Bioinseticidas</option>
                  <option value="Promotores de Crescimento" ${initialCategory === 'Promotores de Crescimento' ? 'selected' : ''}>Promotores de Crescimento</option>
                  <option value="Boas Práticas de Aplicação" ${initialCategory === 'Boas Práticas de Aplicação' ? 'selected' : ''}>Boas Práticas de Aplicação</option>
                  <option value="Mercado & Gestão" ${initialCategory === 'Mercado & Gestão' ? 'selected' : ''}>Mercado & Gestão</option>
                  <option value="Institucional & Ciência" ${initialCategory === 'Institucional & Ciência' ? 'selected' : ''}>Institucional & Ciência</option>
                </select>
              </div>
            </div>

            <!-- Data & Horário Previstos -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1" for="create-input-date">
                  Data Prevista de Publicação
                </label>
                <input 
                  type="date" 
                  id="create-input-date" 
                  value="${initialDate}"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#60B73F]"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1" for="create-input-time">
                  Horário de Postagem
                </label>
                <input 
                  type="time" 
                  id="create-input-time" 
                  value="${initialTime}"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#60B73F]"
                />
              </div>
            </div>

            <!-- Legenda Completa -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="block text-xs font-semibold uppercase tracking-wider text-neutral-700" for="create-textarea-caption">
                  Legenda Completa (Copy do Instagram) *
                </label>
                <span id="create-caption-counter" class="text-[11px] text-neutral-400">0 caracteres</span>
              </div>
              <textarea 
                id="create-textarea-caption" 
                rows="7" 
                required 
                class="w-full p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:bg-white transition-all leading-relaxed"
              >${initialCaption}</textarea>
            </div>

          </form>

          <!-- Rodapé do Modal -->
          <div class="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
            <button type="button" id="create-modal-cancel-btn" class="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-200 transition-colors">
              Cancelar
            </button>
            <button type="button" id="create-modal-save-btn" class="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#007A42] hover:bg-[#006637] shadow-md transition-all active:scale-95">
              ${isEdit ? 'Salvar Alterações' : 'Enviar para Aprovação do CEO'}
            </button>
          </div>

        </div>
      </div>
    `;

    attachCreatePostEvents(uploadedImages, isEdit);
  }

  function attachCreatePostEvents(uploadedImages, isEdit) {
    const modalContainer = container.querySelector('#hub-create-post-modal-container');
    const closeBtn = modalContainer.querySelector('#create-modal-close-btn');
    const cancelBtn = modalContainer.querySelector('#create-modal-cancel-btn');
    const saveBtn = modalContainer.querySelector('#create-modal-save-btn');
    const uploadBtn = modalContainer.querySelector('#create-btn-upload-file');
    const fileInput = modalContainer.querySelector('#create-file-input');
    const addUrlBtn = modalContainer.querySelector('#create-btn-add-url');
    const captionArea = modalContainer.querySelector('#create-textarea-caption');
    const counter = modalContainer.querySelector('#create-caption-counter');
    const titleInput = modalContainer.querySelector('#create-input-title');
    const categorySelect = modalContainer.querySelector('#create-select-category');
    const dateInput = modalContainer.querySelector('#create-input-date');
    const timeInput = modalContainer.querySelector('#create-input-time');

    function closeModal() {
      modalContainer.innerHTML = '';
      editingPost = null;
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Contador de caracteres da legenda
    const updateCount = () => {
      if (counter && captionArea) {
        counter.textContent = `${captionArea.value.length} caracteres`;
      }
    };
    if (captionArea) {
      captionArea.addEventListener('input', updateCount);
      updateCount();
    }

    // Trigger de seleção de arquivos do computador
    if (uploadBtn) {
      uploadBtn.addEventListener('click', () => fileInput && fileInput.click());
    }

    // Processamento de imagens via FileReader + Canvas (preserva dimensões e proporções originais SEM CORTES)
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (evt) => {
            const rawData = evt.target.result;
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              // Preserva a proporção e formato original (vertical 4:5, 1:1, etc.) - ZERO CORTES
              const maxDim = 1600;
              let w = img.width;
              let h = img.height;

              if (w > maxDim || h > maxDim) {
                if (w > h) {
                  h = Math.round((h * maxDim) / w);
                  w = maxDim;
                } else {
                  w = Math.round((w * maxDim) / h);
                  h = maxDim;
                }
              }

              canvas.width = w;
              canvas.height = h;

              // Desenha 100% da imagem original sem recortar nada
              ctx.drawImage(img, 0, 0, w, h);
              const originalRatioUrl = canvas.toDataURL('image/jpeg', 0.90);

              uploadedImages.push(originalRatioUrl);
              refreshPreviewGrid();
              showToast('Imagem em tamanho original carregada com sucesso!');
            };
            img.src = rawData;
          };
          reader.readAsDataURL(file);
        });
      });
    }

    // Inserir URL Externa
    if (addUrlBtn) {
      addUrlBtn.addEventListener('click', () => {
        const url = prompt('Cole o link direto da imagem (URL https):');
        if (url && url.trim().startsWith('http')) {
          uploadedImages.push(url.trim());
          refreshPreviewGrid();
        }
      });
    }

    // Atualizar grade de prévias (exibe imagem inteira sem crop)
    function refreshPreviewGrid() {
      const grid = modalContainer.querySelector('#create-images-preview-grid');
      if (!grid) return;

      grid.innerHTML = uploadedImages.map((imgUrl, idx) => `
        <div class="relative aspect-square rounded-xl overflow-hidden border border-neutral-300 bg-neutral-900 group flex items-center justify-center p-1">
          <img src="${imgUrl}" alt="" class="max-w-full max-h-full object-contain" />
          <button type="button" class="create-remove-img-btn absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white shadow-xs opacity-0 group-hover:opacity-100 transition-opacity" data-index="${idx}">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      `).join('');

      // Re-atachar botões de exclusão de fotos
      grid.querySelectorAll('.create-remove-img-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          uploadedImages.splice(idx, 1);
          refreshPreviewGrid();
        });
      });
    }

    refreshPreviewGrid();

    // Salvar Post
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const caption = captionArea.value.trim();
        const category = categorySelect.value;
        const scheduledDate = dateInput.value;
        const scheduledTime = timeInput.value;

        if (uploadedImages.length === 0) {
          alert('Por favor, adicione pelo menos 1 foto para o post.');
          return;
        }

        if (!title) {
          alert('Por favor, informe o título/tema do post.');
          titleInput.focus();
          return;
        }

        if (!caption) {
          alert('Por favor, redija a legenda da publicação.');
          captionArea.focus();
          return;
        }

        if (isEdit && editingPost) {
          instagramApprovalService.updatePost(editingPost.id, {
            title,
            caption,
            category,
            scheduledDate,
            scheduledTime,
            images: uploadedImages
          });
          showToast('Publicação atualizada com sucesso!');
        } else {
          instagramApprovalService.createPost({
            title,
            caption,
            category,
            scheduledDate,
            scheduledTime,
            images: uploadedImages
          });
          showToast('✓ Novo post enviado para a fila de aprovação do CEO!');
        }

        closeModal();
        renderApprovalHub();
      });
    }
  }

  // Render inicial e assinatura do serviço
  render();
  const unsubscribe = instagramApprovalService.subscribe(() => {
    if (articleService.isAuthenticated()) {
      renderApprovalHub();
    }
  });

  return container;
}
