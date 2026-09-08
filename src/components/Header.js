/**
 * Componente Header Global da Biopar
 * Sticky com efeito blur suave ao rolar, dropdown de soluções, links e botão de contato.
 */

import { openContactModal } from './ContactModal.js';

export function renderHeader() {
  const header = document.createElement('header');
  header.id = 'main-header';
  header.className = 'sticky top-0 z-40 w-full glass-header transition-all duration-300';

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo Biopar -->
        <a href="#/" data-link class="flex items-center gap-2 group py-1">
          <img src="./public/assets/logo-biopar.avif" alt="Biopar Biotecnologia" class="h-10 sm:h-12 w-auto object-contain group-hover:opacity-95 transition-opacity" />
        </a>

        <!-- Navegação Desktop -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="#/" data-link class="nav-item text-sm font-medium text-neutral-700 hover:text-emerald-700 transition-colors">Início</a>
          <a href="#/produtos" data-link class="nav-item text-sm font-medium text-neutral-700 hover:text-emerald-700 transition-colors">Produtos</a>
          
          <!-- Dropdown Soluções -->
          <div class="relative group">
            <button type="button" class="nav-item flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-emerald-700 transition-colors py-2 cursor-pointer">
              <span>Soluções</span>
              <svg class="w-4 h-4 text-neutral-400 group-hover:text-emerald-700 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="absolute left-0 mt-1 w-64 bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-neutral-200/80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <a href="#/produtos?categoria=inoculantes" data-link class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50 transition-colors">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <div>
                  <div class="text-xs font-bold text-neutral-900">Inoculantes</div>
                  <div class="text-[11px] text-neutral-500">Fixação associativa e bioenraizamento</div>
                </div>
              </a>
              <a href="#/produtos?categoria=biofungicidas" data-link class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50 transition-colors">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <div>
                  <div class="text-xs font-bold text-neutral-900">Biofungicidas</div>
                  <div class="text-[11px] text-neutral-500">Controle biológico de manchas e mofo</div>
                </div>
              </a>
              <a href="#/produtos?categoria=bioinseticidas" data-link class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50 transition-colors">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                </div>
                <div>
                  <div class="text-xs font-bold text-neutral-900">Bioinseticidas</div>
                  <div class="text-[11px] text-neutral-500">Manejo de cigarrinhas e sugadores</div>
                </div>
              </a>
              <a href="#/produtos" data-link class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-50 transition-colors">
                <div class="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
                </div>
                <div>
                  <div class="text-xs font-bold text-neutral-900">Manejo Biológico Completo</div>
                  <div class="text-[11px] text-neutral-500">Ver todas as categorias e culturas</div>
                </div>
              </a>
            </div>
          </div>

          <a href="#/blog" data-link class="nav-item text-sm font-medium text-neutral-700 hover:text-emerald-700 transition-colors">Conteúdo</a>
          <a href="#/#biopar" data-link class="nav-item text-sm font-medium text-neutral-700 hover:text-emerald-700 transition-colors">A Biopar</a>
        </nav>

        <!-- Ação Principal Desktop -->
        <div class="hidden md:flex items-center gap-4">
          <button id="btn-header-contact" class="btn-pill-primary text-sm shadow-sm font-semibold">
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

    <!-- Gaveta Mobile Navigation -->
    <div id="mobile-drawer" class="hidden md:hidden bg-white/95 backdrop-blur-xl border-b border-neutral-200 px-6 py-6 transition-all duration-300">
      <div class="flex flex-col gap-4">
        <a href="#/" data-link class="mobile-nav-link text-base font-semibold text-neutral-800 hover:text-emerald-700">Início</a>
        <a href="#/produtos" data-link class="mobile-nav-link text-base font-semibold text-neutral-800 hover:text-emerald-700">Produtos</a>
        <div class="pl-3 border-l-2 border-emerald-500/40 flex flex-col gap-2 py-1">
          <a href="#/produtos?categoria=inoculantes" data-link class="mobile-nav-link text-sm text-neutral-600 hover:text-emerald-700">Inoculantes</a>
          <a href="#/produtos?categoria=biofungicidas" data-link class="mobile-nav-link text-sm text-neutral-600 hover:text-emerald-700">Biofungicidas</a>
          <a href="#/produtos?categoria=bioinseticidas" data-link class="mobile-nav-link text-sm text-neutral-600 hover:text-emerald-700">Bioinseticidas</a>
        </div>
        <a href="#/blog" data-link class="mobile-nav-link text-base font-semibold text-neutral-800 hover:text-emerald-700">Conteúdo & Blog</a>
        <a href="#/#biopar" data-link class="mobile-nav-link text-base font-semibold text-neutral-800 hover:text-emerald-700">A Biopar</a>
        
        <div class="pt-4 border-t border-neutral-100">
          <button id="mobile-btn-contact" class="w-full btn-pill-primary py-3 text-sm font-semibold">
            Fale com a Biopar
          </button>
        </div>
      </div>
    </div>
  `;

  // Listeners
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
