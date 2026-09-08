/**
 * Página Inicial — Home Page da Biopar
 * Apresenta proposta de valor, portfólio de soluções, cotações ao vivo, institucional e blog.
 */

import { products } from '../data/products.js';
import { articles } from '../data/articles.js';
import { companyData } from '../data/company.js';
import { createMarketSection } from '../components/MarketTicker.js';
import { openContactModal } from '../components/ContactModal.js';

export function createHomePage({ router }) {
  const container = document.createElement('div');
  container.className = 'w-full';

  // --- 1. HERO SECTION ---
  const hero = document.createElement('section');
  hero.className = 'relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-white via-[#F5F5F7] to-white border-b border-neutral-200/60';
  hero.innerHTML = `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
        Biologia que trabalha a favor do <span class="text-emerald-700">campo.</span>
      </h1>

      <p class="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto mt-6">
        Soluções biológicas desenvolvidas para integrar tecnologia, manejo e produtividade na agricultura. Formulações de alta densidade celular com validação científica comprovada.
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

      <!-- Métricas Rápidas -->
      <div class="grid grid-cols-3 gap-6 pt-12 border-t border-neutral-200/80 max-w-lg mx-auto mt-8">
        <div>
          <div class="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">10¹⁰</div>
          <div class="text-xs text-neutral-500 font-medium">UFC/g de pureza celular</div>
        </div>
        <div>
          <div class="text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight">+5.6</div>
          <div class="text-xs text-neutral-500 font-medium">sc/ha ganho médio</div>
        </div>
        <div>
          <div class="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">100%</div>
          <div class="text-xs text-neutral-500 font-medium">Registro MAPA oficial</div>
        </div>
      </div>

    </div>
  `;


  // --- 2. LIVE MARKET DASHBOARD ---
  const marketSection = createMarketSection();

  // --- 3. CATEGORIAS DE SOLUÇÕES ---
  const solutions = document.createElement('section');
  solutions.id = 'solucoes';
  solutions.className = 'py-20 bg-white';
  solutions.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-14">
        <h2 class="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">Biológicos para diferentes desafios do campo.</h2>
        <p class="text-neutral-500 text-base mt-2">Tecnologias desenvolvidas para cada etapa do manejo com alta especificidade biológica.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Inoculantes -->
        <a href="#/produtos?categoria=inoculantes" data-link class="apple-card p-8 group flex flex-col justify-between hover:border-emerald-600/40">
          <div>
            <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 class="text-2xl font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">Inoculantes</h3>
            <p class="text-neutral-500 text-sm mt-2 leading-relaxed">Tecnologias microbiológicas voltadas à simbiose, fixação de nitrogênio e hipertrofia radicular.</p>
          </div>
          <div class="mt-8 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-emerald-700">
            <span>Explorar Inoculantes</span>
            <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </a>

        <!-- Biofungicidas -->
        <a href="#/produtos?categoria=biofungicidas" data-link class="apple-card p-8 group flex flex-col justify-between hover:border-emerald-600/40">
          <div>
            <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 class="text-2xl font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">Biofungicidas</h3>
            <p class="text-neutral-500 text-sm mt-2 leading-relaxed">Ferramentas biológicas para compor o manejo preventivo e curativo de manchas foliares, ferrugem e fungos de solo.</p>
          </div>
          <div class="mt-8 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-emerald-700">
            <span>Explorar Biofungicidas</span>
            <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </a>

        <!-- Bioinseticidas -->
        <a href="#/produtos?categoria=bioinseticidas" data-link class="apple-card p-8 group flex flex-col justify-between hover:border-emerald-600/40">
          <div>
            <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
            </div>
            <h3 class="text-2xl font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">Bioinseticidas</h3>
            <p class="text-neutral-500 text-sm mt-2 leading-relaxed">Microrganismos entomopatogênicos aplicados ao controle biológico de cigarrinhas, sugadores e lagartas.</p>
          </div>
          <div class="mt-8 pt-4 border-t border-neutral-100 flex items-center text-xs font-semibold text-emerald-700">
            <span>Explorar Bioinseticidas</span>
            <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </a>
      </div>

      <div class="text-center mt-12">
        <a href="#/produtos" data-link class="btn-pill-secondary text-sm font-semibold">
          Ver portfólio completo (${products.length} Soluções)
        </a>
      </div>
    </div>
  `;

  // --- 4. DESTAQUE EDITORIAL DE PRODUTOS (Horizontal Showcase) ---
  const featured = document.createElement('section');
  featured.className = 'py-20 bg-[#F5F5F7] border-t border-neutral-200/80';
  featured.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 class="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">Tecnologia Biopar</h2>
          <p class="text-neutral-500 text-base mt-1">Conheça as formulações de ponta que lideram ensaios de produtividade.</p>
        </div>
        <a href="#/produtos" data-link class="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
          Ver Catálogo Completo
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        ${products.slice(0, 3).map(prod => `
          <div class="apple-card p-6 flex flex-col justify-between group bg-white">
            <div>
              <div class="relative overflow-hidden rounded-2xl mb-6 bg-neutral-100 aspect-video flex items-center justify-center">
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
              <p class="text-neutral-500 text-sm mt-2 line-clamp-2">${prod.shortDescription}</p>
            </div>

            <div class="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span class="text-xs font-mono text-neutral-400">MAPA: ${prod.technicalIdentity.registro_mapa}</span>
              <a href="#/produtos/${prod.slug}" data-link class="btn-pill-primary text-xs font-bold py-2 px-4">
                Conhecer produto
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
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">${companyData.name}</span>
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
              <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h4 class="text-lg font-bold text-neutral-900">${block.title}</h4>
              <div class="text-xs text-emerald-700 font-medium mt-0.5">${block.subtitle}</div>
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
              <div class="text-3xl font-black text-emerald-400 font-mono mb-3">${item.step}</div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">${item.tag}</span>
              <h3 class="text-lg font-bold text-white mb-2">${item.title}</h3>
              <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">${item.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // --- 7. CONHECIMENTO & BLOG (Latest Articles) ---
  const contentSection = document.createElement('section');
  contentSection.className = 'py-20 bg-white';
  contentSection.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">Conhecimento</span>
          <h2 class="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight mt-3">Conteúdo para decisões melhores no campo.</h2>
          <p class="text-neutral-500 text-base mt-1">Artigos técnicos escritos por pesquisadores e especialistas da Biopar.</p>
        </div>
        <a href="#/blog" data-link class="btn-pill-secondary text-xs font-bold">
          Acessar todos os conteúdos
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${articles.slice(0, 3).map(art => `
          <a href="#/blog/${art.slug}" data-link class="apple-card overflow-hidden group flex flex-col justify-between">
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
                <h3 class="text-xl font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors line-clamp-2">${art.title}</h3>
                <p class="text-neutral-500 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">${art.excerpt}</p>
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
        `).join('')}
      </div>
    </div>
  `;

  // --- 8. CONVERSÃO & CONTATO ---
  const conversion = document.createElement('section');
  conversion.className = 'py-20 bg-gradient-to-tr from-emerald-900 via-emerald-800 to-emerald-950 text-white text-center';
  conversion.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <span class="inline-block text-xs font-bold uppercase tracking-wider text-emerald-200 bg-emerald-700/50 px-3 py-1 rounded-full border border-emerald-500/40">Fale com Nossos Especialistas</span>
      <h2 class="text-3xl sm:text-5xl font-black tracking-tight text-white">Quer conhecer melhor as soluções Biopar?</h2>
      <p class="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Converse com nossa equipe técnica para dimensionar o manejo biológico ideal para a sua safra e região.
      </p>
      <div class="pt-4">
        <button id="btn-home-conversion" class="btn-pill-primary bg-white text-emerald-900 hover:bg-neutral-100 text-base font-bold shadow-xl px-9 py-4 cursor-pointer">
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
