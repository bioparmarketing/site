/**
 * Página de Leitura de Artigo (/blog/:slug)
 * Barra de progresso de leitura, credenciais do autor, referências científicas,
 * produtos relacionados e compartilhamento social.
 */

import { articles } from '../data/articles.js';
import { products } from '../data/products.js';
import { showToast } from '../components/Toast.js';

export function createArticleDetailPage({ params, router }) {
  const { slug } = params;
  const article = articles.find(a => a.slug === slug) || articles[0];

  const container = document.createElement('div');
  container.className = 'w-full bg-[#FFFFFF] min-h-screen';

  // Produtos e Artigos Relacionados
  const relatedProducts = products.filter(p => article.relatedProductIds?.includes(p.id));
  const relatedArticles = articles.filter(a => a.id !== article.id && (article.relatedArticleIds?.includes(a.id) || a.category === article.category));

  container.innerHTML = `
    <!-- Barra de Progresso de Leitura -->
    <div id="reading-progress-bar"></div>

    <article class="pt-8 pb-20">
      
      <!-- Cabeçalho do Artigo -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <a href="#/" data-link class="hover:text-emerald-700">Início</a>
          <span>/</span>
          <a href="#/blog" data-link class="hover:text-emerald-700">Conteúdo</a>
          <span>/</span>
          <span class="text-neutral-700 font-semibold truncate max-w-xs">${article.category}</span>
        </nav>

        <div class="space-y-4">
          <span class="inline-block text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
            ${article.category}
          </span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
            ${article.title}
          </h1>
          <p class="text-lg text-neutral-600 font-normal leading-relaxed">
            ${article.excerpt}
          </p>

          <!-- Metadados do Autor & Data -->
          <div class="flex items-center justify-between pt-6 border-t border-neutral-100 flex-wrap gap-4">
            <div class="flex items-center gap-3">
              <img src="${article.author.avatar}" alt="${article.author.name}" class="w-12 h-12 rounded-full object-cover border border-neutral-200" />
              <div>
                <div class="font-bold text-sm text-neutral-900">${article.author.name}</div>
                <div class="text-xs text-neutral-500">${article.author.role}</div>
              </div>
            </div>

            <div class="flex items-center gap-4 text-xs text-neutral-400">
              <span>Publicado em ${article.date}</span>
              <span>•</span>
              <span class="font-medium text-neutral-700">${article.readingTime}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Imagem de Capa -->
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div class="relative overflow-hidden rounded-3xl aspect-video bg-neutral-100 shadow-md">
          <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Corpo do Artigo & Sidebar de Compartilhamento -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Conteúdo Principal -->
        <div class="lg:col-span-12 prose prose-neutral max-w-none text-neutral-800 leading-relaxed space-y-6 text-base sm:text-lg">
          ${article.content}
        </div>

      </div>

      <!-- Caixa do Autor -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div class="p-6 sm:p-8 bg-[#F5F5F7] rounded-3xl border border-neutral-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img src="${article.author.avatar}" alt="${article.author.name}" class="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-white shadow-sm" />
          <div class="text-center sm:text-left">
            <h4 class="text-lg font-bold text-neutral-900">${article.author.name}</h4>
            <div class="text-xs text-emerald-800 font-semibold mb-2">${article.author.role}</div>
            <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed">${article.author.bio}</p>
          </div>
        </div>
      </div>

      <!-- Referências Científicas -->
      ${article.references && article.references.length > 0 ? `
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div class="p-6 sm:p-8 bg-white rounded-3xl border border-neutral-200">
            <h4 class="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              Referências Bibliográficas Citadas
            </h4>
            <ul class="space-y-2.5 text-xs text-neutral-600 leading-relaxed">
              ${article.references.map(ref => `
                <li class="pl-4 border-l-2 border-emerald-600/60">${ref}</li>
              `).join('')}
            </ul>
          </div>
        </div>
      ` : ''}

      <!-- Ações de Compartilhamento -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60">
          <span class="text-xs font-semibold text-neutral-700">Gostou deste conteúdo? Compartilhe:</span>
          <div class="flex items-center gap-2">
            <button id="btn-share-whatsapp" class="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm">
              <span>WhatsApp</span>
            </button>
            <button id="btn-share-linkedin" class="px-3.5 py-1.5 rounded-full bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm">
              <span>LinkedIn</span>
            </button>
            <button id="btn-copy-link" class="px-3.5 py-1.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm">
              <svg class="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              <span>Copiar Link</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Soluções Mencionadas no Artigo -->
      ${relatedProducts.length > 0 ? `
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h3 class="text-2xl font-bold text-neutral-900 mb-6">Soluções Citadas neste Conteúdo</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            ${relatedProducts.map(rp => `
              <a href="#/produtos/${rp.slug}" data-link class="apple-card p-6 bg-white flex flex-col justify-between group">
                <div>
                  <span class="text-xs font-semibold text-emerald-700">${rp.category}</span>
                  <h4 class="text-xl font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors mt-1">${rp.name}</h4>
                  <div class="text-xs text-neutral-400 font-mono italic mt-0.5">${rp.microorganismShort}</div>
                  <p class="text-xs sm:text-sm text-neutral-500 mt-2 line-clamp-2">${rp.shortDescription}</p>
                </div>
                <div class="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Conhecer tecnologia</span>
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Artigos Relacionados -->
      ${relatedArticles.length > 0 ? `
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-neutral-200">
          <h3 class="text-2xl font-bold text-neutral-900 mb-6">Continue Lendo</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            ${relatedArticles.slice(0, 2).map(art => `
              <a href="#/blog/${art.slug}" data-link class="apple-card overflow-hidden bg-white group flex flex-col justify-between">
                <div class="aspect-video relative overflow-hidden bg-neutral-100">
                  <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span class="absolute top-3 left-3 bg-white/95 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-neutral-800">${art.category}</span>
                </div>
                <div class="p-5">
                  <h4 class="text-base font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors line-clamp-2">${art.title}</h4>
                  <span class="text-xs text-neutral-400 mt-2 block">${art.readingTime}</span>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}

    </article>
  `;

  // Barra de progresso de leitura
  const handleScroll = () => {
    const progressBar = container.querySelector('#reading-progress-bar');
    if (!progressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Compartilhamento
  container.querySelector('#btn-share-whatsapp')?.addEventListener('click', () => {
    const text = encodeURIComponent(`${article.title} - Leia na Biopar: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  });

  container.querySelector('#btn-share-linkedin')?.addEventListener('click', () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  });

  container.querySelector('#btn-copy-link')?.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link do artigo copiado para a área de transferência!', 'success');
  });

  return container;
}
