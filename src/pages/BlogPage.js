/**
 * Hub de Conhecimento e Blog Técnico da Biopar (/blog)
 * Artigos científicos, boas práticas agronômicas, categorias temáticas e artigo em destaque.
 */

import { articles, articleCategories } from '../data/articles.js';

export function createBlogPage({ router }) {
  const container = document.createElement('div');
  container.className = 'w-full bg-[#F5F5F7] min-h-screen py-10';

  let activeCategory = 'Todos';
  let searchTerm = '';

  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const regularArticles = articles.filter(a => a.id !== featuredArticle.id);

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Cabeçalho do Blog -->
      <div class="mb-10 text-left">
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">Hub de Conhecimento</span>
        <h1 class="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight mt-3">Conhecimento Biopar</h1>
        <p class="text-neutral-500 text-base sm:text-lg mt-2 max-w-2xl">
          Biologia, manejo, tecnologia e mercado para uma agricultura cada vez mais inteligente e fundamentada em ciência.
        </p>
      </div>

      <!-- Barra de Filtros & Categorias -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/80 mb-10 space-y-4">
        
        <!-- Busca de Artigos -->
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <input 
            id="blog-search-input" 
            type="text" 
            placeholder="Pesquise por tema, patógeno, microrganismo ou tecnologia..." 
            class="w-full pl-11 pr-4 py-3 rounded-2xl border border-neutral-200 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-[#F5F5F7]/50"
          />
        </div>

        <!-- Pílulas de Categorias -->
        <div class="flex flex-wrap gap-2 pt-2 border-t border-neutral-100" id="blog-category-pills">
          ${articleCategories.map(cat => `
            <button type="button" class="blog-cat-pill px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${cat === 'Todos' ? 'bg-neutral-900 text-white shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}" data-cat="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Artigo em Destaque (Hero Article) -->
      <div id="blog-featured-wrapper" class="mb-12">
        <a href="#/blog/${featuredArticle.slug}" data-link class="apple-card overflow-hidden bg-white grid grid-cols-1 lg:grid-cols-12 group">
          <div class="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden bg-neutral-100">
            <img src="${featuredArticle.image}" alt="${featuredArticle.title}" class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
            <span class="absolute top-4 left-4 bg-emerald-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              Artigo em Destaque
            </span>
          </div>
          <div class="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                <span class="font-bold text-emerald-700 uppercase tracking-wider">${featuredArticle.category}</span>
                <span>•</span>
                <span>${featuredArticle.readingTime}</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-black text-neutral-900 group-hover:text-emerald-700 transition-colors leading-tight">
                ${featuredArticle.title}
              </h2>
              <p class="text-neutral-500 text-sm mt-3 leading-relaxed">
                ${featuredArticle.excerpt}
              </p>
            </div>

            <div class="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img src="${featuredArticle.author.avatar}" alt="${featuredArticle.author.name}" class="w-8 h-8 rounded-full object-cover" />
                <div class="text-xs">
                  <div class="font-bold text-neutral-900">${featuredArticle.author.name}</div>
                  <div class="text-neutral-400 text-[11px]">${featuredArticle.date}</div>
                </div>
              </div>

              <span class="btn-pill-primary text-xs font-bold py-2 px-4">
                Ler Artigo
              </span>
            </div>
          </div>
        </a>
      </div>

      <!-- Grid de Artigos Regulares -->
      <div id="blog-articles-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Renderizado dinamicamente -->
      </div>

      <!-- Estado Vazio -->
      <div id="blog-empty-state" class="hidden bg-white rounded-3xl p-12 text-center border border-neutral-200/80 max-w-xl mx-auto my-12">
        <div class="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
        </div>
        <h3 class="text-xl font-bold text-neutral-900">Nenhum artigo encontrado</h3>
        <p class="text-neutral-500 text-sm mt-1">Experimente buscar por outros termos ou selecionar a categoria "Todos".</p>
      </div>

    </div>
  `;

  // Elementos
  const searchInput = container.querySelector('#blog-search-input');
  const catPills = container.querySelectorAll('.blog-cat-pill');
  const grid = container.querySelector('#blog-articles-grid');
  const emptyState = container.querySelector('#blog-empty-state');
  const featuredWrapper = container.querySelector('#blog-featured-wrapper');

  const filterArticles = () => {
    const term = searchInput.value.toLowerCase().trim();

    const filtered = articles.filter(art => {
      if (activeCategory !== 'Todos' && art.category !== activeCategory) {
        return false;
      }
      if (term) {
        const matchTitle = art.title.toLowerCase().includes(term);
        const matchExcerpt = art.excerpt.toLowerCase().includes(term);
        const matchAuthor = art.author.name.toLowerCase().includes(term);
        if (!matchTitle && !matchExcerpt && !matchAuthor) {
          return false;
        }
      }
      return true;
    });

    if (activeCategory !== 'Todos' || term !== '') {
      featuredWrapper.classList.add('hidden');
    } else {
      featuredWrapper.classList.remove('hidden');
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    grid.innerHTML = filtered.map(art => `
      <a href="#/blog/${art.slug}" data-link class="apple-card overflow-hidden bg-white group flex flex-col justify-between">
        <div>
          <div class="relative aspect-video overflow-hidden bg-neutral-100">
            <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-neutral-800 shadow-sm">
              ${art.category}
            </span>
          </div>

          <div class="p-6">
            <div class="flex items-center gap-2 text-xs text-neutral-400 mb-2">
              <span>${art.date}</span>
              <span>•</span>
              <span>${art.readingTime}</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
              ${art.title}
            </h3>
            <p class="text-neutral-500 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
              ${art.excerpt}
            </p>
          </div>
        </div>

        <div class="px-6 pb-6 pt-2 flex items-center justify-between border-t border-neutral-100 text-xs font-semibold text-emerald-700">
          <span class="flex items-center gap-2">
            <img src="${art.author.avatar}" alt="${art.author.name}" class="w-5 h-5 rounded-full object-cover" />
            <span class="text-neutral-600 font-medium">${art.author.name.split(' ')[0]} ${art.author.name.split(' ')[1] || ''}</span>
          </span>
          <span class="flex items-center gap-1">
            Ler artigo
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </span>
        </div>
      </a>
    `).join('');
  };

  // Event Listeners
  searchInput.addEventListener('input', filterArticles);

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      activeCategory = pill.getAttribute('data-cat');
      catPills.forEach(p => {
        const isCurrent = p === pill;
        p.className = `blog-cat-pill px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
          isCurrent ? 'bg-neutral-900 text-white shadow-sm' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
        }`;
      });
      filterArticles();
    });
  });

  filterArticles();
  return container;
}
