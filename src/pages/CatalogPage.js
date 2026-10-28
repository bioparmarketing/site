/**
 * Catálogo Completo de Produtos da Biopar (/produtos)
 * Busca instantânea, filtros por categoria e cards com arquitetura de informação clara.
 */

import { products, categories } from '../data/products.js';

export function createCatalogPage({ queryParams, router }) {
  const container = document.createElement('div');
  container.className = 'w-full bg-[#F5F5F7] min-h-screen py-10';

  // Estado inicial dos filtros
  const initialCategory = queryParams?.get('categoria') || 'all';
  let activeCategory = initialCategory;
  let searchTerm = '';

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Cabeçalho do Catálogo -->
      <div class="mb-10 text-left">
        <span class="text-xs font-semibold text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">
          Portfólio de Soluções
        </span>
        <h1 class="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight mt-3">
          Portfólio de Soluções Biológicas
        </h1>
        <p class="text-neutral-500 text-base sm:text-lg mt-2 max-w-2xl">
          Tecnologias microbiológicas de alta pureza e densidade celular para manejo de doenças, pragas e promoção de produtividade.
        </p>
      </div>

      <!-- Barra de Busca & Filtros por Categoria -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/80 mb-8 space-y-5">
        
        <!-- Campo de Busca -->
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input 
            id="catalog-search-input" 
            type="text" 
            placeholder="Buscar por produto, microrganismo, alvo biológico ou benefício..." 
            class="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-neutral-200 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#60B73F] focus:border-transparent transition-all bg-[#F5F5F7]/50"
          />
        </div>

        <!-- Filtros Rápidos (Categorias em Pílula) -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Filtrar por Categoria</label>
          <div class="flex flex-wrap gap-2" id="category-pills-container">
            <button 
              type="button" 
              class="category-pill px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${activeCategory === 'all' ? 'bg-neutral-900 text-white shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}" 
              data-category="all"
            >
              Todas as Soluções (${products.length})
            </button>
            ${categories.map(cat => {
              const count = products.filter(p => p.categorySlug === cat.id).length;
              return `
                <button 
                  type="button" 
                  class="category-pill px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${activeCategory === cat.id ? 'bg-[#60B73F] text-white shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}" 
                  data-category="${cat.id}"
                >
                  ${cat.name} (${count})
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Barra de Status -->
        <div class="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
          <span id="results-count-text" class="font-medium">Carregando soluções...</span>
          <button id="btn-clear-filters" class="text-neutral-700 hover:text-black font-semibold hover:underline cursor-pointer hidden">Limpar filtros</button>
        </div>
            Limpar busca
          </button>
        </div>
      </div>

      <!-- Grid de Resultados -->
      <div id="catalog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>

      <!-- Estado Vazio -->
      <div id="catalog-empty-state" class="hidden py-16 text-center bg-white rounded-3xl border border-neutral-200 p-8">
        <div class="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-neutral-900 mb-1">Nenhum produto encontrado</h3>
        <p class="text-sm text-neutral-500 max-w-md mx-auto mb-6">
          Não localizamos nenhuma tecnologia biológica correspondente à sua busca. Tente buscar por outros termos ou selecione outra categoria.
        </p>
        <button id="btn-reset-empty" class="btn-pill-primary text-xs font-semibold">
          Ver todas as soluções
        </button>
      </div>

    </div>
  `;

  const searchInput = container.querySelector('#catalog-search-input');
  const categoryPills = container.querySelectorAll('.category-pill');
  const grid = container.querySelector('#catalog-grid');
  const resultsCountText = container.querySelector('#results-count-text');
  const clearFiltersBtn = container.querySelector('#btn-clear-filters');
  const emptyState = container.querySelector('#catalog-empty-state');
  const resetEmptyBtn = container.querySelector('#btn-reset-empty');

  const filterProducts = () => {
    const term = searchInput?.value ? searchInput.value.trim().toLowerCase() : '';

    const filtered = products.filter(prod => {
      // Filtro de Categoria
      if (activeCategory !== 'all' && prod.categorySlug !== activeCategory) {
        return false;
      }

      // Filtro de Texto
      if (term) {
        const matchName = prod.name.toLowerCase().includes(term);
        const matchMicro = prod.microorganisms.toLowerCase().includes(term);
        const matchTagline = prod.tagline.toLowerCase().includes(term);
        const matchCrops = prod.cropsAndTargets.toLowerCase().includes(term);
        const matchTargets = prod.targets.some(t => t.name.toLowerCase().includes(term) || t.commonName.toLowerCase().includes(term));
        const matchBenefits = prod.benefits.some(b => b.toLowerCase().includes(term));

        if (!matchName && !matchMicro && !matchTagline && !matchCrops && !matchTargets && !matchBenefits) {
          return false;
        }
      }

      return true;
    });

    renderGrid(filtered);
  };

  const renderGrid = (list) => {
    resultsCountText.textContent = `Exibindo ${list.length} de ${products.length} tecnologias`;

    if (activeCategory !== 'all' || searchInput.value.trim() !== '') {
      clearFiltersBtn.classList.remove('hidden');
    } else {
      clearFiltersBtn.classList.add('hidden');
    }

    if (list.length === 0) {
      grid.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    grid.innerHTML = list.map(prod => `
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/80 hover:shadow-md hover:border-neutral-300 transition-all duration-200 flex flex-col justify-between group">
        <div>
          <!-- Imagem Oficial do Produto Extraída do PDF -->
          <div class="w-full h-48 overflow-hidden rounded-2xl mb-5 bg-neutral-900 relative group">
            <img 
              src="${prod.image}" 
              alt="${prod.name}" 
              class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
            <span class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-neutral-800 shadow-sm border border-neutral-200">
              ${prod.category}
            </span>

            ${prod.organicApproved ? `
              <span class="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full border border-white/40 flex items-center gap-1">
                <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Orgânico
              </span>
            ` : ''}
          </div>

          <div class="flex items-center gap-2 mb-2">
            <span class="text-[11px] font-semibold text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-300">
              ${prod.productType}
            </span>
          </div>

          <h3 class="text-2xl font-black text-neutral-900 group-hover:text-black transition-colors mb-1 tracking-tight">
            ${prod.name}
          </h3>

          <p class="text-xs text-neutral-800 font-normal italic mb-3" style="font-family: Arial, sans-serif;">
            ${prod.microorganisms}
          </p>

          <p class="text-xs text-neutral-600 line-clamp-2 mb-4 leading-relaxed">
            ${prod.tagline}
          </p>

          <!-- Destaque de Alvos -->
          <div class="bg-neutral-50 rounded-xl p-3 border border-neutral-100 text-xs text-neutral-600 mb-4">
            <strong class="text-neutral-800 block text-[11px] uppercase tracking-wider mb-1">Alvos & Culturas:</strong>
            <p class="line-clamp-2">${prod.cropsAndTargets}</p>
          </div>
        </div>

        <!-- Ação -->
        <div class="pt-4 border-t border-neutral-100 flex items-center justify-between">
          <span class="text-[10px] text-neutral-500 font-normal" style="font-family: Arial, sans-serif;">${prod.speciesHighlights}</span>
          <a 
            href="#/produtos/${prod.slug}" 
            data-link 
            class="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-[#60B73F] transition-all shadow-sm"
          >
            <span>Ficha Técnica</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    `).join('');
  };

  // Listeners
  searchInput?.addEventListener('input', filterProducts);

  categoryPills?.forEach(pill => {
    pill.addEventListener('click', () => {
      activeCategory = pill.getAttribute('data-category');
      categoryPills.forEach(p => {
        const isCurrent = p === pill;
        p.className = `category-pill px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
          isCurrent 
            ? (activeCategory === 'all' ? 'bg-neutral-900 text-white shadow-sm' : 'bg-[#60B73F] text-white shadow-sm') 
            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
        }`;
      });
      filterProducts();
    });
  });

  clearFiltersBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    activeCategory = 'all';
    categoryPills?.forEach((p, idx) => {
      p.className = `category-pill px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
        idx === 0 ? 'bg-neutral-900 text-white shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
      }`;
    });
    filterProducts();
  });

  resetEmptyBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    activeCategory = 'all';
    filterProducts();
  });

  // Render inicial
  filterProducts();

  return container;
}
