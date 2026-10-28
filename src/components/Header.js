/**
 * Componente Header Global da Biopar
 * Menu suspenso (dropdown) completo para "Produtos" com fixação inteligente de mouse,
 * navegação por categorias e acesso direto a cada produto individual.
 */

import { openContactModal } from './ContactModal.js';
import { categories, products } from '../data/products.js';

export function renderHeader() {
  const header = document.createElement('header');
  header.id = 'main-header';
  header.className = 'sticky top-0 z-40 w-full glass-header transition-all duration-300';

  // Agrupa produtos por categoria
  const biofungicidas = products.filter(p => p.categorySlug === 'biofungicidas');
  const bioinseticidas = products.filter(p => p.categorySlug === 'bioinseticidas');
  const promotores = products.filter(p => p.categorySlug === 'promotores-de-crescimento');

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo Biopar Oficial Vetorial -->
        <a href="#/" data-link class="flex items-center gap-2 group py-1">
          <img src="./static/assets/logo-biopar.svg" alt="Biopar Biotecnologia" class="h-10 sm:h-11 w-auto object-contain group-hover:opacity-95 transition-opacity" />
        </a>

        <!-- Navegação Desktop -->
        <nav class="hidden md:flex items-center gap-7">
          <a href="#/" data-link class="nav-item text-sm font-semibold text-neutral-700 hover:text-black transition-colors">Início</a>
          
          <!-- Menu Suspenso: Produtos & Categorias -->
          <div id="products-menu-container" class="relative py-2">
            
            <!-- Botão Gatilho -->
            <button 
              id="btn-products-dropdown"
              type="button" 
              class="nav-item flex items-center gap-1.5 text-sm font-semibold text-neutral-700 hover:text-black transition-colors py-1 px-2 rounded-lg cursor-pointer focus:outline-none"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span>Produtos</span>
              <svg id="products-caret" class="w-4 h-4 text-neutral-400 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Painel Dropdown com Ponte de Hover (pt-2) -->
            <div 
              id="products-dropdown-panel" 
              class="hidden absolute left-1/2 -translate-x-1/2 top-full pt-1.5 w-[850px] z-50 transition-all duration-150"
            >
              <div class="dropdown-card bg-white rounded-3xl p-6 shadow-2xl border border-neutral-200 ring-1 ring-black/10" style="background-color: #ffffff !important; opacity: 1 !important;">
                
                <div class="grid grid-cols-3 gap-6">
                  
                  <!-- Coluna 1: Biofungicidas -->
                  <div class="flex flex-col">
                    <div class="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                      <a href="#/produtos/categoria/biofungicidas" data-link class="text-xs font-black uppercase tracking-wider text-neutral-900 hover:text-[#60B73F] flex items-center gap-2 group/cat transition-colors">
                        <span class="w-2 h-2 rounded-full bg-[#60B73F]"></span>
                        <span>Biofungicidas</span>
                      </a>
                      <span class="text-[10px] text-neutral-600 font-semibold bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200/80">4 soluções</span>
                    </div>
                    <div class="flex flex-col gap-1.5">
                      ${biofungicidas.map(p => `
                        <a 
                          href="#/produtos/${p.slug}" 
                          data-link 
                          class="p-2.5 rounded-xl hover:bg-neutral-50 active:bg-neutral-100 transition-all duration-150 group/item block border border-transparent hover:border-neutral-200/70"
                        >
                          <div class="text-xs font-black text-neutral-900 group-hover/item:text-[#60B73F] transition-colors flex items-center justify-between">
                            <span>${p.name}</span>
                            <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-400 group-hover/item:text-[#60B73F] transition-colors">
                              <span>Abrir</span>
                              <svg class="w-3 h-3 transform group-hover/item:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                              </svg>
                            </span>
                          </div>
                          <div class="text-[11px] text-neutral-500 line-clamp-1 mt-0.5 font-normal leading-snug group-hover/item:text-neutral-700">${p.tagline}</div>
                        </a>
                      `).join('')}
                    </div>
                    <a href="#/produtos/categoria/biofungicidas" data-link class="mt-auto pt-3 border-t border-neutral-100 text-[11px] font-bold text-neutral-700 hover:text-[#60B73F] transition-colors flex items-center justify-between group/catlink">
                      <span>Ver categoria Biofungicidas</span>
                      <svg class="w-3.5 h-3.5 transform group-hover/catlink:translate-x-1 transition-transform text-neutral-400 group-hover/catlink:text-[#60B73F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </a>
                  </div>

                  <!-- Coluna 2: Bioinseticidas -->
                  <div class="flex flex-col">
                    <div class="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                      <a href="#/produtos/categoria/bioinseticidas" data-link class="text-xs font-black uppercase tracking-wider text-neutral-900 hover:text-[#60B73F] flex items-center gap-2 group/cat transition-colors">
                        <span class="w-2 h-2 rounded-full bg-[#60B73F]"></span>
                        <span>Bioinseticidas</span>
                      </a>
                      <span class="text-[10px] text-neutral-600 font-semibold bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200/80">3 soluções</span>
                    </div>
                    <div class="flex flex-col gap-1.5">
                      ${bioinseticidas.map(p => `
                        <a 
                          href="#/produtos/${p.slug}" 
                          data-link 
                          class="p-2.5 rounded-xl hover:bg-neutral-50 active:bg-neutral-100 transition-all duration-150 group/item block border border-transparent hover:border-neutral-200/70"
                        >
                          <div class="text-xs font-black text-neutral-900 group-hover/item:text-[#60B73F] transition-colors flex items-center justify-between">
                            <span>${p.name}</span>
                            <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-400 group-hover/item:text-[#60B73F] transition-colors">
                              <span>Abrir</span>
                              <svg class="w-3 h-3 transform group-hover/item:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                              </svg>
                            </span>
                          </div>
                          <div class="text-[11px] text-neutral-500 line-clamp-1 mt-0.5 font-normal leading-snug group-hover/item:text-neutral-700">${p.tagline}</div>
                        </a>
                      `).join('')}
                    </div>
                    <a href="#/produtos/categoria/bioinseticidas" data-link class="mt-auto pt-3 border-t border-neutral-100 text-[11px] font-bold text-neutral-700 hover:text-[#60B73F] transition-colors flex items-center justify-between group/catlink">
                      <span>Ver categoria Bioinseticidas</span>
                      <svg class="w-3.5 h-3.5 transform group-hover/catlink:translate-x-1 transition-transform text-neutral-400 group-hover/catlink:text-[#60B73F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </a>
                  </div>

                  <!-- Coluna 3: Promotores de Crescimento -->
                  <div class="flex flex-col">
                    <div class="flex items-center justify-between pb-3 mb-3 border-b border-neutral-100">
                      <a href="#/produtos/categoria/promotores-de-crescimento" data-link class="text-xs font-black uppercase tracking-wider text-neutral-900 hover:text-[#60B73F] flex items-center gap-2 group/cat transition-colors">
                        <span class="w-2 h-2 rounded-full bg-[#60B73F]"></span>
                        <span>Promotores</span>
                      </a>
                      <span class="text-[10px] text-neutral-600 font-semibold bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200/80">3 soluções</span>
                    </div>
                    <div class="flex flex-col gap-1.5">
                      ${promotores.map(p => `
                        <a 
                          href="#/produtos/${p.slug}" 
                          data-link 
                          class="p-2.5 rounded-xl hover:bg-neutral-50 active:bg-neutral-100 transition-all duration-150 group/item block border border-transparent hover:border-neutral-200/70"
                        >
                          <div class="text-xs font-black text-neutral-900 group-hover/item:text-[#60B73F] transition-colors flex items-center justify-between">
                            <span>${p.name}</span>
                            <span class="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-400 group-hover/item:text-[#60B73F] transition-colors">
                              <span>Abrir</span>
                              <svg class="w-3 h-3 transform group-hover/item:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                              </svg>
                            </span>
                          </div>
                          <div class="text-[11px] text-neutral-500 line-clamp-1 mt-0.5 font-normal leading-snug group-hover/item:text-neutral-700">${p.tagline}</div>
                        </a>
                      `).join('')}
                    </div>
                    <a href="#/produtos/categoria/promotores-de-crescimento" data-link class="mt-auto pt-3 border-t border-neutral-100 text-[11px] font-bold text-neutral-700 hover:text-[#60B73F] transition-colors flex items-center justify-between group/catlink">
                      <span>Ver Promotores & Inoculantes</span>
                      <svg class="w-3.5 h-3.5 transform group-hover/catlink:translate-x-1 transition-transform text-neutral-400 group-hover/catlink:text-[#60B73F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </a>
                  </div>

                </div>

                <!-- Rodapé do Menu Suspenso (Informação removida e UX refinada) -->
                <div class="dropdown-footer mt-5 pt-3.5 border-t border-neutral-100 flex items-center justify-between bg-neutral-50/90 -mx-6 -mb-6 px-6 py-3.5 rounded-b-3xl">
                  <a 
                    href="#/produtos" 
                    data-link 
                    class="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
                  >
                    <svg class="w-3.5 h-3.5 text-[#60B73F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    <span>Explorar catálogo técnico com busca</span>
                  </a>
                  <a 
                    href="#/produtos" 
                    data-link 
                    class="inline-flex items-center gap-2 text-xs font-bold text-neutral-900 hover:text-white bg-white hover:bg-neutral-900 px-4 py-2 rounded-xl transition-all shadow-sm border border-neutral-200/90 group"
                  >
                    <span>Ver Todas as Soluções</span>
                    <svg class="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform text-neutral-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </a>
                </div>

              </div>
            </div>
          </div>

          <a href="#/produtor" data-link class="nav-item text-sm font-semibold text-neutral-700 hover:text-[#60B73F] transition-colors flex items-center gap-1.5">
            <span>Para o Produtor</span>
            <span class="text-[9px] font-bold uppercase tracking-wider text-[#007A42] bg-[#EBF7E7] px-1.5 py-0.5 rounded-full border border-[#60B73F]/30">Direto de Fábrica</span>
          </a>
          <a href="#/blog" data-link class="nav-item text-sm font-semibold text-neutral-700 hover:text-black transition-colors">Conteúdo</a>
          <a href="#/#biopar" data-link class="nav-item text-sm font-semibold text-neutral-700 hover:text-black transition-colors">A Biopar</a>
        </nav>

        <!-- Ação Principal Desktop -->
        <div class="hidden md:flex items-center gap-4">
          <button id="btn-header-contact" class="btn-pill-primary text-sm shadow-sm font-semibold cursor-pointer">
            Fale com a Biopar
          </button>
        </div>

        <!-- Botão Menu Mobile -->
        <div class="flex md:hidden items-center gap-2">
          <button id="mobile-menu-btn" class="p-2 text-neutral-700 hover:text-neutral-900 rounded-xl hover:bg-neutral-100 transition-colors" aria-label="Abrir Menu">
            <svg id="hamburger-icon" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            <svg id="close-icon" class="w-6 h-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Gaveta Mobile Navigation (Hierarquia por Categorias e Produtos) -->
    <div id="mobile-drawer" class="hidden md:hidden bg-white/98 backdrop-blur-xl border-b border-neutral-200 px-6 py-6 transition-all duration-300 max-h-[85vh] overflow-y-auto">
      <div class="flex flex-col gap-4">
        <a href="#/" data-link class="mobile-nav-link text-base font-bold text-neutral-800 hover:text-black">Início</a>
        <a href="#/produtor" data-link class="mobile-nav-link text-base font-bold text-[#007A42] hover:text-[#60B73F] flex items-center justify-between">
          <span>Para o Produtor Rural</span>
          <span class="text-[10px] font-bold bg-[#EBF7E7] px-2 py-0.5 rounded-full border border-[#60B73F]/30">Direto de Fábrica</span>
        </a>
        
        <!-- Bloco de Produtos Mobile com Acordeão -->
        <div class="border-y border-neutral-100 py-3">
          <div class="flex items-center justify-between mb-2">
            <a href="#/produtos" data-link class="mobile-nav-link text-base font-bold text-neutral-900 hover:text-black">
              Produtos & Categorias
            </a>
          </div>

          <!-- Sub-abas Categorias Mobile -->
          <div class="space-y-3 pl-2">
            
            <!-- Biofungicidas Mobile -->
            <div class="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/60">
              <a href="#/produtos/categoria/biofungicidas" data-link class="mobile-nav-link text-xs font-black uppercase tracking-wider text-neutral-900 block mb-2">
                Biofungicidas (4) →
              </a>
              <div class="grid grid-cols-2 gap-1.5 pl-1">
                ${biofungicidas.map(p => `
                  <a href="#/produtos/${p.slug}" data-link class="mobile-nav-link text-xs text-neutral-700 hover:text-black py-1 font-medium">
                    • ${p.name}
                  </a>
                `).join('')}
              </div>
            </div>

            <!-- Bioinseticidas Mobile -->
            <div class="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/60">
              <a href="#/produtos/categoria/bioinseticidas" data-link class="mobile-nav-link text-xs font-black uppercase tracking-wider text-neutral-900 block mb-2">
                Bioinseticidas (3) →
              </a>
              <div class="grid grid-cols-2 gap-1.5 pl-1">
                ${bioinseticidas.map(p => `
                  <a href="#/produtos/${p.slug}" data-link class="mobile-nav-link text-xs text-neutral-700 hover:text-black py-1 font-medium">
                    • ${p.name}
                  </a>
                `).join('')}
              </div>
            </div>

            <!-- Promotores Mobile -->
            <div class="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/60">
              <a href="#/produtos/categoria/promotores-de-crescimento" data-link class="mobile-nav-link text-xs font-black uppercase tracking-wider text-neutral-900 block mb-2">
                Promotores de Crescimento (3) →
              </a>
              <div class="grid grid-cols-2 gap-1.5 pl-1">
                ${promotores.map(p => `
                  <a href="#/produtos/${p.slug}" data-link class="mobile-nav-link text-xs text-neutral-700 hover:text-black py-1 font-medium">
                    • ${p.name}
                  </a>
                `).join('')}
              </div>
            </div>

          </div>
        </div>

        <a href="#/blog" data-link class="mobile-nav-link text-base font-bold text-neutral-800 hover:text-black">Conteúdo & Blog</a>
        <a href="#/#biopar" data-link class="mobile-nav-link text-base font-bold text-neutral-800 hover:text-black">A Biopar</a>
        
        <div class="pt-2">
          <button id="mobile-btn-contact" class="w-full btn-pill-primary py-3 text-sm font-semibold">
            Fale com a Biopar
          </button>
        </div>
      </div>
    </div>
  `;

  // Elementos do Menu Suspenso Desktop
  const menuContainer = header.querySelector('#products-menu-container');
  const dropdownPanel = header.querySelector('#products-dropdown-panel');
  const btnDropdown = header.querySelector('#btn-products-dropdown');
  const caret = header.querySelector('#products-caret');

  let isLocked = false;
  let closeTimeout = null;

  const openDropdown = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
    dropdownPanel?.classList.remove('hidden');
    caret?.classList.add('rotate-180', 'text-neutral-900');
    btnDropdown?.setAttribute('aria-expanded', 'true');
  };

  const closeDropdown = (force = false) => {
    if (isLocked && !force) return;
    if (closeTimeout) clearTimeout(closeTimeout);
    closeTimeout = setTimeout(() => {
      dropdownPanel?.classList.add('hidden');
      caret?.classList.remove('rotate-180', 'text-neutral-900');
      btnDropdown?.setAttribute('aria-expanded', 'false');
      isLocked = false;
    }, 200);
  };

  // Eventos de Mouse no Container
  menuContainer?.addEventListener('mouseenter', () => openDropdown());
  menuContainer?.addEventListener('mouseleave', () => closeDropdown(false));

  // Clique no botão alterna estado fixado (lock)
  btnDropdown?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (dropdownPanel?.classList.contains('hidden')) {
      isLocked = true;
      openDropdown();
    } else if (isLocked) {
      isLocked = false;
      closeDropdown(true);
    } else {
      isLocked = true;
    }
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (menuContainer && !menuContainer.contains(e.target)) {
      isLocked = false;
      closeDropdown(true);
    }
  });

  // Fechar imediatamente ao clicar em qualquer link interno
  dropdownPanel?.querySelectorAll('a[data-link]').forEach(link => {
    link.addEventListener('click', () => {
      isLocked = false;
      dropdownPanel?.classList.add('hidden');
      caret?.classList.remove('rotate-180', 'text-neutral-900');
      btnDropdown?.setAttribute('aria-expanded', 'false');
    });
  });

  // Listeners de Contato e Mobile
  const headerContactBtn = header.querySelector('#btn-header-contact');
  const mobileContactBtn = header.querySelector('#mobile-btn-contact');
  const mobileMenuBtn = header.querySelector('#mobile-menu-btn');
  const mobileDrawer = header.querySelector('#mobile-drawer');
  const hamburgerIcon = header.querySelector('#hamburger-icon');
  const closeIcon = header.querySelector('#close-icon');

  const openContact = () => openContactModal();
  headerContactBtn?.addEventListener('click', openContact);
  mobileContactBtn?.addEventListener('click', () => {
    mobileDrawer?.classList.add('hidden');
    hamburgerIcon?.classList.remove('hidden');
    closeIcon?.classList.add('hidden');
    openContact();
  });

  mobileMenuBtn?.addEventListener('click', () => {
    const isHidden = mobileDrawer?.classList.contains('hidden');
    if (isHidden) {
      mobileDrawer?.classList.remove('hidden');
      hamburgerIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
    } else {
      mobileDrawer?.classList.add('hidden');
      hamburgerIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    }
  });

  header.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer?.classList.add('hidden');
      hamburgerIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
    });
  });

  // Scroll effect on header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-sm');
    } else {
      header.classList.remove('shadow-sm');
    }
  });

  return header;
}
