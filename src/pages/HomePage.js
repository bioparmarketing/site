/**
 * Página Inicial — Home Page da Biopar
 * Apresenta proposta de valor, portfólio de soluções, cotações ao vivo, institucional e blog.
 */

import { products, categories } from '../data/products.js';
import { articleService } from '../services/articleService.js';
import { companyData } from '../data/company.js';
import { createMarketSection } from '../components/MarketTicker.js';
import { openContactModal } from '../components/ContactModal.js';
import { initBioEcosystem } from '../components/BioEcosystemCanvas.js';

export function createHomePage({ router }) {
  const container = document.createElement('div');
  container.className = 'w-full';

  // --- 1. HERO SECTION ---
  const hero = document.createElement('section');
  hero.className = 'relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-white via-[#F5F5F7] to-white border-b border-neutral-200/60';
  hero.innerHTML = `
    <!-- Animação Minimalista de Ecossistema Biológico (Cinza & Branco) -->
    <canvas id="bio-ecosystem-canvas" class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>

    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-auto">

      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
        Biologia que trabalha a favor do <span class="text-[#60B73F]">campo.</span>
      </h1>

      <p class="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto mt-6">
        Soluções biológicas de alta pureza e densidade celular para agricultura de alta produtividade. Fungicidas, inseticidas microbiológicos e inoculantes desenvolvidos com rigor técnico e validação no campo.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4 pt-8">
        <a href="#/produtos" data-link class="btn-pill-primary text-base shadow-md font-semibold px-8 py-3.5">
          Conheça nossas soluções
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </a>
        <a href="#/#biopar" data-link class="btn-pill-secondary text-base font-semibold px-7 py-3.5">
          Conheça a Biopar
        </a>
      </div>

    </div>
  `;

  // Inicializa o ecossistema biológico minimalista
  const bioCanvas = hero.querySelector('#bio-ecosystem-canvas');
  if (bioCanvas) {
    requestAnimationFrame(() => {
      initBioEcosystem(bioCanvas);
    });
  }

  // --- 2. LIVE MARKET DASHBOARD ---
  const marketSection = createMarketSection();

  // --- 3. CATEGORIAS DE SOLUÇÕES (Arquitetura por Categorias) ---
  const solutions = document.createElement('section');
  solutions.id = 'solucoes';
  solutions.className = 'py-20 bg-white';
  solutions.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-14">
        <span class="text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">Categorias Técnicas</span>
        <h2 class="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mt-3">Biológicos para diferentes desafios do campo.</h2>
        <p class="text-neutral-500 text-base mt-2">Navegue pelas nossas sub-páginas de categoria e explore cada produto em detalhes.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Biofungicidas -->
        <a href="#/produtos/categoria/biofungicidas" data-link class="apple-card overflow-hidden group flex flex-col justify-between hover:border-neutral-300 bg-white">
          <div>
            <div class="relative h-48 overflow-hidden bg-neutral-900">
              <img src="./static/products/category-biofungicidas.jpg" alt="Biofungicidas" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <span class="absolute bottom-3 left-4 text-xs font-medium text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 shadow-sm">4 Soluções Registradas</span>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-black text-neutral-900 group-hover:text-black transition-colors tracking-tight">Biofungicidas</h3>
              <p class="text-neutral-500 text-sm mt-2 leading-relaxed">Controle biológico multifatorial do mofo-branco, fusariose e rizoctoniose com cepas avançadas de Trichoderma.</p>
            </div>
          </div>
          <div class="px-6 pb-6 pt-2 flex items-center text-xs font-bold text-neutral-800 group-hover:text-[#60B73F] transition-colors">
            <span>Explorar Biofungicidas</span>
            <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </a>

        <!-- Bioinseticidas -->
        <a href="#/produtos/categoria/bioinseticidas" data-link class="apple-card overflow-hidden group flex flex-col justify-between hover:border-neutral-300 bg-white">
          <div>
            <div class="relative h-48 overflow-hidden bg-neutral-900">
              <img src="./static/products/category-bioinseticidas.jpg" alt="Bioinseticidas" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <span class="absolute bottom-3 left-4 text-xs font-medium text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 shadow-sm">3 Soluções Registradas</span>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-black text-neutral-900 group-hover:text-black transition-colors tracking-tight">Bioinseticidas</h3>
              <p class="text-neutral-500 text-sm mt-2 leading-relaxed">Fungos entomopatogênicos de ação por contato para quebra populacional de cigarrinhas, percevejos e sugadores.</p>
            </div>
          </div>
          <div class="px-6 pb-6 pt-2 flex items-center text-xs font-bold text-neutral-800 group-hover:text-[#60B73F] transition-colors">
            <span>Explorar Bioinseticidas</span>
            <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </a>

        <!-- Promotores de Crescimento -->
        <a href="#/produtos/categoria/promotores-de-crescimento" data-link class="apple-card overflow-hidden group flex flex-col justify-between hover:border-neutral-300 bg-white">
          <div>
            <div class="relative h-48 overflow-hidden bg-neutral-900">
              <img src="./static/products/category-promotores.jpg" alt="Promotores de Crescimento" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <span class="absolute bottom-3 left-4 text-xs font-medium text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 shadow-sm">3 Soluções Registradas</span>
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-black text-neutral-900 group-hover:text-black transition-colors tracking-tight">Promotores de Crescimento</h3>
              <p class="text-neutral-500 text-sm mt-2 leading-relaxed">Inoculantes líquidos para fixação biológica de nitrogênio (FBN) e consórcio de Bacillus para solubilização e estresse hídrico.</p>
            </div>
          </div>
          <div class="px-6 pb-6 pt-2 flex items-center text-xs font-bold text-neutral-800 group-hover:text-[#60B73F] transition-colors">
            <span>Explorar Promotores</span>
            <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </a>
      </div>

      <div class="text-center mt-12">
        <a href="#/produtos" data-link class="btn-pill-secondary text-sm font-semibold">
          Ver Catálogo Geral com Busca (${products.length} Soluções)
        </a>
      </div>
    </div>
  `;

  // --- 4. DESTAQUE EDITORIAL DE PRODUTOS ---
  const featured = document.createElement('section');
  featured.className = 'py-20 bg-[#F5F5F7] border-t border-neutral-200/80';
  
  // Seleciona 1 produto de cada categoria para o showcase inicial
  const showcaseProducts = [
    products.find(p => p.id === 'trixma'),
    products.find(p => p.id === 'mb-control'),
    products.find(p => p.id === 'bpr-tetra')
  ].filter(Boolean);

  featured.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">Destaques do Portfólio</span>
          <h2 class="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mt-2">Tecnologia Biopar em Campo</h2>
          <p class="text-neutral-500 text-base mt-1">Conheça algumas das principais formulações do portfólio.</p>
        </div>
        <a href="#/produtos" data-link class="text-sm font-semibold text-neutral-800 hover:text-[#60B73F] transition-colors flex items-center gap-1">
          Ver Todas as Soluções (${products.length})
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        ${showcaseProducts.map(prod => `
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/80 hover:shadow-md hover:border-neutral-300 transition-all flex flex-col justify-between group">
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

              <div class="text-xs text-neutral-400 font-normal mb-1" style="font-family: Arial, sans-serif;">${prod.speciesHighlights}</div>
              <h3 class="text-2xl font-black text-neutral-900 group-hover:text-black transition-colors tracking-tight">${prod.name}</h3>
              <p class="text-xs text-neutral-800 font-normal italic mt-1 mb-2" style="font-family: Arial, sans-serif;">${prod.microorganisms}</p>
              <p class="text-neutral-500 text-sm line-clamp-2 leading-relaxed">${prod.tagline}</p>
            </div>

            <div class="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span class="text-[11px] font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-300">${prod.productType}</span>
              <a href="#/produtos/${prod.slug}" data-link class="btn-pill-primary text-xs font-bold py-2 px-4 shadow-sm">
                Ficha Técnica
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // --- 5. A BIOPAR (Institucional) ---
  const biopar = document.createElement('section');
  biopar.id = 'biopar';
  biopar.className = 'py-24 bg-white border-t border-neutral-200/80';
  biopar.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div class="lg:col-span-6 space-y-4">
          <span class="text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">${companyData.name}</span>
          <h2 class="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">Ciência aplicada à agricultura.</h2>
          <p class="text-neutral-600 text-base leading-relaxed">
            ${companyData.mission}
          </p>
        </div>
        <div class="lg:col-span-6">
          <div class="p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80">
            <h4 class="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Visão Biopar</h4>
            <p class="text-neutral-800 text-lg font-medium leading-relaxed italic">
              "${companyData.vision}"
            </p>
          </div>
        </div>
      </div>

      <!-- 4 Pilares Institucionais -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${companyData.aboutBlocks.map(block => `
          <div class="apple-card p-6 bg-white flex flex-col justify-between">
            <div>
              <div class="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center mb-4 border border-neutral-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h4 class="text-lg font-bold text-neutral-900">${block.title}</h4>
              <div class="text-xs text-neutral-500 font-medium mt-0.5">${block.subtitle}</div>
              <p class="text-neutral-500 text-xs sm:text-sm mt-3 leading-relaxed">${block.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // --- 6. CIÊNCIA: DO MICRORGANISMO AO CAMPO ---
  const science = document.createElement('section');
  science.id = 'science';
  science.className = 'py-20 bg-[#1D1D1F] text-white';
  science.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">Do microrganismo ao campo.</h2>
        <p class="text-neutral-400 text-base mt-2">A jornada rigorosa de P&D que transforma estirpes microbianas em incremento real de produtividade.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${companyData.sciencePipeline.map(item => `
          <div class="bg-neutral-800/60 backdrop-blur-md rounded-3xl p-6 border border-neutral-700/60 flex flex-col justify-between">
            <div>
              <div class="text-3xl font-black text-[#60B73F] mb-3">${item.step}</div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">${item.tag}</span>
              <h3 class="text-lg font-bold text-white mb-2">${item.title}</h3>
              <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">${item.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // --- 7. CONHECIMENTO & BLOG ---
  const contentSection = document.createElement('section');
  contentSection.className = 'py-20 bg-white';
  contentSection.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">Conhecimento</span>
          <h2 class="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mt-3">Conteúdo para decisões melhores no campo.</h2>
          <p class="text-neutral-500 text-base mt-1">Artigos técnicos escritos por pesquisadores e especialistas da Biopar.</p>
        </div>
        <a href="#/blog" data-link class="btn-pill-secondary text-xs font-bold">
          Acessar todos os conteúdos
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${articleService.getAll().slice(0, 3).map(art => `
          <a href="#/blog/${art.slug}" data-link class="apple-card overflow-hidden group flex flex-col justify-between">
            <div>
              <div class="relative aspect-video overflow-hidden bg-neutral-100">
                <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span class="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-neutral-800 shadow-sm border border-neutral-200">
                  ${art.category}
                </span>
              </div>
              <div class="p-6">
                <div class="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                  <span>${art.date}</span>
                  <span>•</span>
                  <span>${art.readingTime}</span>
                </div>
                <h3 class="text-xl font-bold text-neutral-900 group-hover:text-black transition-colors line-clamp-2">${art.title}</h3>
                <p class="text-neutral-500 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">${art.excerpt}</p>
              </div>
            </div>

            <div class="px-6 pb-6 pt-2 flex items-center justify-between border-t border-neutral-100 text-xs font-semibold text-neutral-800 group-hover:text-[#60B73F] transition-colors">
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
        `).join('')}
      </div>
    </div>
  `;

  // --- 8. CONVERSÃO & CONTATO ---
  const conversion = document.createElement('section');
  conversion.className = 'py-20 bg-neutral-900 text-white text-center';
  conversion.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <span class="inline-block text-xs font-semibold uppercase tracking-wider text-neutral-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">Fale com Nossos Especialistas</span>
      <h2 class="text-3xl sm:text-5xl font-black tracking-tight text-white">Quer conhecer melhor as soluções Biopar?</h2>
      <p class="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Converse com nossa equipe técnica para dimensionar o manejo biológico ideal para a sua safra e região.
      </p>
      <div class="pt-4">
        <button id="btn-home-conversion" class="btn-pill-primary text-base font-bold shadow-xl px-9 py-4 cursor-pointer">
          Falar com um especialista
        </button>
      </div>
    </div>
  `;

  conversion.querySelector('#btn-home-conversion')?.addEventListener('click', () => openContactModal());

  container.appendChild(hero);
  container.appendChild(marketSection);
  container.appendChild(solutions);
  container.appendChild(featured);
  container.appendChild(biopar);
  container.appendChild(science);
  container.appendChild(contentSection);
  container.appendChild(conversion);

  return container;
}
