/**
 * Catálogo de Produtos da Biopar (/produtos)
 * Busca instantânea, filtros multifacetados dinâmicos (categoria, cultura, alvo, microrganismo)
 * e cards de produto minimalistas e informativos.
 */

import { products, categories } from '../data/products.js';

export function createCatalogPage({ queryParams, router }) {
  const container = document.createElement('div');
  container.className = 'w-full bg-[#F5F5F7] min-h-screen py-10';

  // Extrai filtros únicos do dataset
  const allCrops = Array.from(new Set(products.flatMap(p => p.crops.map(c => c.name.split(' ')[0])))).sort();
  const allTargets = Array.from(new Set(products.flatMap(p => p.targets.map(t => t.commonName)))).sort();
  const allMicroorganisms = Array.from(new Set(products.map(p => p.microorganismShort))).sort();

  // Estado inicial dos filtros
  const initialCategory = queryParams?.get('categoria') || 'all';
  let activeCategory = initialCategory;
  let activeCrop = 'all';
  let activeTarget = 'all';
  let activeMicroorganism = 'all';
  let searchTerm = '';

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Cabeçalho do Catálogo -->
      <div class="mb-10 text-left">
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">Portfólio de Bioinsumos</span>
        <h1 class="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight mt-3">Soluções Biopar</h1>
        <p class="text-neutral-500 text-base sm:text-lg mt-2 max-w-2xl">
          Explore nosso portfólio de tecnologias biológicas para agricultura de precisão, nutrição e proteção de cultivos.
        </p>
      </div>

      <!-- Barra de Busca & Filtros Facetados -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/80 mb-8 space-y-5">
        
        <!-- Campo de Busca -->
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <input 
            id="catalog-search-input" 
            type="text" 
            placeholder="Busque por produto, cultura, alvo ou microrganismo..." 
            class="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-neutral-200 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-[#F5F5F7]/50"
          />
        </div>

        <!-- Filtros Rápidos (Categorias em Pílula) -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Categoria</label>
          <div class="flex flex-wrap gap-2" id="category-pills-container">
            <button type="button" class="category-pill px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${activeCategory === 'all' ? 'bg-neutral-900 text-white shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}" data-category="all">
              Todas as Soluções (${products.length})
            </button>
            ${categories.map(cat => `
              <button type="button" class="category-pill px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${activeCategory === cat.id ? 'bg-emerald-800 text-white shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}" data-category="${cat.id}">
                ${cat.name}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Filtros Avançados (Selects de Cultura, Alvo, Microrganismo) -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-neutral-100">
          <div>
            <label class="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Cultura / Cultivo</label>
            <select id="filter-crop" class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all">
              <option value="all">Todas as Culturas</option>
              ${allCrops.map(crop => `<option value="${crop}">${crop}</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Alvo Biológico</label>
            <select id="filter-target" class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all">
              <option value="all">Todos os Alvos</option>
              ${allTargets.map(target => `<option value="${target}">${target}</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Microrganismo Ativo</label>
            <select id="filter-microorganism" class="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-medium text-neutral-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all">
              <option value="all">Todos os Microrganismos</option>
              ${allMicroorganisms.map(mic => `<option value="${mic}">${mic}</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Barra de Status e Limpeza -->
        <div class="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
          <span id="results-count-text" class="font-medium">Carregando catálogo...</span>
          <button id="btn-clear-filters" class="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline cursor-pointer hidden">
            Limpar todos os filtros
          </button>
        </div>
      </div>

      <!-- Grid de Resultados -->
      <div id="catalog-products-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Renderizado dinamicamente -->
      </div>

      <!-- Estado Vazio (Nenhum produto encontrado) -->
      <div id="catalog-empty-state" class="hidden bg-white rounded-3xl p-12 text-center border border-neutral-200/80 max-w-xl mx-auto my-12">
        <div class="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <h3 class="text-xl font-bold text-neutral-900">Nenhum produto encontrado</h3>
        <p class="text-neutral-500 text-sm mt-1">Tente ajustar seus termos de busca ou remover alguns filtros selecionados.</p>
        <button id="btn-empty-reset" class="btn-pill-primary text-xs font-semibold mt-4">
          Limpar Filtros
        </button>
      </div>

    </div>
  `;

  // Elementos do DOM
  const searchInput = container.querySelector('#catalog-search-input');
  const categoryPills = container.querySelectorAll('.category-pill');
  const cropSelect = container.querySelector('#filter-crop');
  const targetSelect = container.querySelector('#filter-target');
  const microSelect = container.querySelector('#filter-microorganism');
  const grid = container.querySelector('#catalog-products-grid');
  const emptyState = container.querySelector('#catalog-empty-state');
  const resultsCountText = container.querySelector('#results-count-text');
  const clearFiltersBtn = container.querySelector('#btn-clear-filters');
  const emptyResetBtn = container.querySelector('#btn-empty-reset');

  const filterProducts = () => {
    const term = searchInput.value.toLowerCase().trim();
    
    const filtered = products.filter(prod => {
      // Filtro de Categoria
      if (activeCategory !== 'all' && prod.categorySlug !== activeCategory) {
        return false;
      }

      // Filtro de Cultura
      if (activeCrop !== 'all') {
        const hasCrop = prod.crops.some(c => c.name.toLowerCase().includes(activeCrop.toLowerCase()));
        if (!hasCrop) return false;
      }

      // Filtro de Alvo
      if (activeTarget !== 'all') {
        const hasTarget = prod.targets.some(t => t.commonName.toLowerCase().includes(activeTarget.toLowerCase()));
        if (!hasTarget) return false;
      }

      // Filtro de Microrganismo
      if (activeMicroorganism !== 'all' && !prod.microorganismShort.includes(activeMicroorganism)) {
        return false;
      }

      // Filtro Textual
      if (term) {
        const matchName = prod.name.toLowerCase().includes(term);
        const matchDesc = prod.shortDescription.toLowerCase().includes(term);
        const matchMicro = prod.microorganismScientific.toLowerCase().includes(term);
        const matchCrops = prod.crops.some(c => c.name.toLowerCase().includes(term));
        const matchTargets = prod.targets.some(t => t.commonName.toLowerCase().includes(term) || t.scientificName.toLowerCase().includes(term));
        if (!matchName && !matchDesc && !matchMicro && !matchCrops && !matchTargets) {
          return false;
        }
      }

      return true;
    });

    renderGrid(filtered);
  };

  const renderGrid = (list) => {
    resultsCountText.textContent = `Exibindo ${list.length} de ${products.length} soluções`;
    
    const hasActiveFilters = activeCategory !== 'all' || activeCrop !== 'all' || activeTarget !== 'all' || activeMicroorganism !== 'all' || searchInput.value.trim() !== '';
    if (hasActiveFilters) {
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
      <div class="apple-card p-6 bg-white flex flex-col justify-between group">
        <div>
          <div class="relative overflow-hidden rounded-2xl mb-5 bg-neutral-100 aspect-video flex items-center justify-center">
            <img src="${prod.heroImage}" alt="${prod.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-neutral-800 shadow-sm">
              ${prod.category}
            </span>
            ${prod.badge ? `
              <span class="absolute bottom-3 right-3 bg-emerald-800 text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm">
                ${prod.badge}
              </span>
            ` : ''}
          </div>

          <div class="text-xs text-neutral-400 font-mono italic mb-1">${prod.microorganismShort}</div>
          <h3 class="text-2xl font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">${prod.name}</h3>
          <p class="text-neutral-500 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">${prod.shortDescription}</p>

          <!-- Tags de Culturas Principais -->
          <div class="flex flex-wrap gap-1.5 mt-4">
            ${prod.crops.slice(0, 3).map(c => `
              <span class="px-2 py-0.5 rounded-md bg-neutral-100 text-[11px] font-medium text-neutral-600">
                ${c.name.split(' ')[0]}
              </span>
            `).join('')}
            ${prod.crops.length > 3 ? `<span class="px-2 py-0.5 rounded-md bg-neutral-100 text-[11px] font-medium text-neutral-400">+${prod.crops.length - 3}</span>` : ''}
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
          <span class="text-[11px] font-mono text-neutral-400">Reg. MAPA: ${prod.technicalIdentity.registro_mapa}</span>
          <a href="#/produtos/${prod.slug}" data-link class="btn-pill-primary text-xs font-bold py-2.5 px-4 shadow-sm">
            Conhecer produto
          </a>
        </div>
      </div>
    `).join('');
  };

  // Listeners de Eventos
  searchInput.addEventListener('input', filterProducts);

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      activeCategory = pill.getAttribute('data-category');
      categoryPills.forEach(p => {
        const isCurrent = p === pill;
        p.className = `category-pill px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
          isCurrent 
            ? (activeCategory === 'all' ? 'bg-neutral-900 text-white shadow-sm' : 'bg-emerald-800 text-white shadow-sm') 
            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
        }`;
      });
      filterProducts();
    });
  });

  cropSelect.addEventListener('change', (e) => {
    activeCrop = e.target.value;
    filterProducts();
  });

  targetSelect.addEventListener('change', (e) => {
    activeTarget = e.target.value;
    filterProducts();
  });

  microSelect.addEventListener('change', (e) => {
    activeMicroorganism = e.target.value;
    filterProducts();
  });

  const resetAll = () => {
    searchInput.value = '';
    activeCategory = 'all';
    activeCrop = 'all';
    activeTarget = 'all';
    activeMicroorganism = 'all';
    cropSelect.value = 'all';
    targetSelect.value = 'all';
    microSelect.value = 'all';
    categoryPills.forEach(p => {
      p.className = `category-pill px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
        p.getAttribute('data-category') === 'all' ? 'bg-neutral-900 text-white shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
      }`;
    });
    filterProducts();
  };

  clearFiltersBtn.addEventListener('click', resetAll);
  emptyResetBtn.addEventListener('click', resetAll);

  // Render inicial
  filterProducts();

  return container;
}
