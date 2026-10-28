/**
 * Sub-página de Categoria de Produtos (/produtos/categoria/:categorySlug)
 * Exibe visão detalhada da categoria selecionada com capa oficial,
 * filtros entre categorias e cards com imagens extraídas do catálogo.
 */

import { categories, products } from '../data/products.js';

export function createCategoryPage({ params, router }) {
  const categorySlug = params.categorySlug || 'biofungicidas';
  const category = categories.find(c => c.id === categorySlug) || categories[0];
  const categoryProducts = products.filter(p => p.categorySlug === category.id);

  const container = document.createElement('div');
  container.className = 'w-full bg-[#F5F5F7] min-h-screen py-10';

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-xs text-neutral-400 mb-8">
        <a href="#/" data-link class="hover:text-neutral-800 transition-colors">Início</a>
        <span>/</span>
        <a href="#/produtos" data-link class="hover:text-neutral-800 transition-colors">Produtos</a>
        <span>/</span>
        <span class="text-neutral-700 font-semibold">${category.name}</span>
      </nav>

      <!-- Cabeçalho da Categoria com Imagem Oficial da Capa -->
      <div class="relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-200 shadow-xl mb-10 min-h-[260px]">
        <img 
          src="${category.image}" 
          alt="${category.name}" 
          class="absolute inset-0 w-full h-full object-cover opacity-35 object-center" 
        />
        <div class="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-transparent"></div>
        <div class="relative z-10 p-8 sm:p-10 flex flex-col justify-between">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div class="space-y-3 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/15 text-white border border-white/25">
                <span class="w-2 h-2 rounded-full bg-[#60B73F]"></span>
                ${category.badge}
              </div>
              <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight">
                ${category.name}
              </h1>
              <p class="text-neutral-200 font-medium text-base sm:text-lg">
                ${category.tagline}
              </p>
              <p class="text-neutral-300 text-sm sm:text-base leading-relaxed">
                ${category.description}
              </p>
            </div>

            <div class="flex flex-col items-start md:items-end justify-center shrink-0 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-white">
              <span class="text-3xl font-black">${categoryProducts.length}</span>
              <span class="text-xs font-medium text-neutral-300 uppercase tracking-wider">Soluções Cadastradas</span>
            </div>
          </div>

          <!-- Abas Rápidas de Navegação Entre Categorias -->
          <div class="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2 items-center">
            <span class="text-xs font-bold uppercase tracking-wider text-neutral-400 mr-2">Categorias:</span>
            ${categories.map(cat => `
              <a 
                href="#/produtos/categoria/${cat.id}" 
                data-link
                class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${cat.id === category.id 
                  ? 'bg-[#60B73F] text-white shadow-md' 
                  : 'bg-white/10 text-neutral-200 hover:bg-white/20'}"
              >
                ${cat.name}
              </a>
            `).join('')}
            <a 
              href="#/produtos" 
              data-link
              class="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 text-neutral-200 hover:bg-white/20 transition-all ml-auto"
            >
              Ver Todas as Soluções →
            </a>
          </div>
        </div>
      </div>

      <!-- Grid de Produtos da Categoria com Imagens Oficiais -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        ${categoryProducts.map(prod => `
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/80 hover:shadow-md hover:border-neutral-300 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <!-- Imagem Oficial do Produto Extraída do PDF -->
              <div class="w-full h-52 overflow-hidden rounded-2xl mb-6 bg-neutral-900 relative group">
                <img 
                  src="${prod.image}" 
                  alt="${prod.name}" 
                  class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                ${prod.organicApproved ? `
                  <span class="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full border border-white/40 flex items-center gap-1">
                    <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    Orgânico
                  </span>
                ` : ''}
              </div>

              <!-- Tags / Tipo -->
              <div class="flex flex-wrap items-center gap-2 mb-3">
                <span class="text-[11px] font-semibold text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-300">
                  ${prod.productType}
                </span>
                <span class="text-[11px] font-normal text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-200" style="font-family: Arial, sans-serif;">
                  ${prod.speciesHighlights}
                </span>
              </div>

              <!-- Nome do Produto -->
              <h2 class="text-2xl font-black text-neutral-900 tracking-tight group-hover:text-black transition-colors mb-2">
                ${prod.name}
              </h2>

              <!-- Microrganismos -->
              <p class="text-xs text-neutral-800 font-normal italic mb-3" style="font-family: Arial, sans-serif;">
                ${prod.microorganisms}
              </p>

              <!-- Tagline / Posicionamento -->
              <p class="text-sm text-neutral-600 line-clamp-2 mb-4 leading-relaxed">
                ${prod.tagline}
              </p>

              <!-- Alvos Principais -->
              <div class="bg-neutral-50 rounded-xl p-3 border border-neutral-100 mb-6 text-xs text-neutral-600">
                <span class="font-bold text-neutral-800 block mb-1">Alvos & Ocorrência:</span>
                <p class="line-clamp-2">${prod.cropsAndTargets}</p>
              </div>
            </div>

            <!-- Botão de Ação -->
            <a 
              href="#/produtos/${prod.slug}" 
              data-link
              class="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-neutral-900 text-white font-bold text-xs hover:bg-[#60B73F] active:scale-[0.98] transition-all shadow-sm"
            >
              <span>Ver Ficha Técnica Completa</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        `).join('')}
      </div>

    </div>
  `;

  return container;
}
