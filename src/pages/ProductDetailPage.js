/**
 * Página de Detalhe de Produto (/produtos/:slug)
 * Arquitetura de Informação técnica e completa baseada no Catálogo Biopar 2026/2027.
 * Contém placeholders estruturados para inserção futura de imagens e dados detalhados.
 */

import { products, categories } from '../data/products.js';
import { openContactModal } from '../components/ContactModal.js';

export function createProductDetailPage({ params, router }) {
  const { slug } = params;
  const product = products.find(p => p.slug === slug) || products[0];
  const category = categories.find(c => c.id === product.categorySlug) || categories[0];
  const siblingProducts = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id);

  const container = document.createElement('div');
  container.className = 'w-full bg-[#FFFFFF] min-h-screen';

  container.innerHTML = `
    <!-- 1. BREADCRUMBS & CABEÇALHO -->
    <section class="bg-gradient-to-b from-[#F5F5F7] to-white pt-8 pb-12 border-b border-neutral-200/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <a href="#/" data-link class="hover:text-neutral-800 transition-colors">Início</a>
          <span>/</span>
          <a href="#/produtos" data-link class="hover:text-neutral-800 transition-colors">Produtos</a>
          <span>/</span>
          <a href="#/produtos/categoria/${product.categorySlug}" data-link class="hover:text-neutral-800 transition-colors">${product.category}</a>
          <span>/</span>
          <span class="text-neutral-700 font-semibold">${product.name}</span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <!-- Coluna de Informações Principais -->
          <div class="lg:col-span-7 space-y-5">
            <div class="flex flex-wrap items-center gap-2">
              <a 
                href="#/produtos/categoria/${product.categorySlug}" 
                data-link
                class="text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-1 rounded-full border border-neutral-300 transition-colors"
              >
                ${product.category}
              </a>
              <span class="text-xs font-semibold text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">
                ${product.productType}
              </span>
              ${product.organicApproved ? `
                <span class="text-xs font-semibold text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">
                  Uso Aprovado na Agricultura Orgânica
                </span>
              ` : ''}
            </div>

            <h1 class="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
              ${product.name}
            </h1>

            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">Espécies & Microrganismos</span>
              <p class="text-base text-neutral-800 font-normal italic leading-snug" style="font-family: Arial, sans-serif;">${product.microorganisms}</p>
              <p class="text-xs text-neutral-500 mt-1 font-normal" style="font-family: Arial, sans-serif;">${product.speciesHighlights}</p>
            </div>

            <p class="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed">
              ${product.tagline}
            </p>

            <!-- Ações -->
            <div class="flex flex-wrap items-center gap-3 pt-2">
              <button id="btn-request-quote" class="btn-pill-primary text-sm font-semibold flex items-center gap-2 shadow-sm">
                <span>Falar com Engenheiro Agrônomo</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <a 
                href="#/produtos/categoria/${product.categorySlug}" 
                data-link
                class="px-5 py-2.5 rounded-full text-xs font-bold bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
              >
                ← Ver todos de ${product.category}
              </a>
            </div>
          </div>

          <!-- Coluna de Imagem / Hero Oficial do Produto -->
          <div class="lg:col-span-5">
            <div class="relative overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl border border-neutral-200 group">
              <img 
                src="${product.image}" 
                alt="${product.name}" 
                class="w-full h-auto max-h-[380px] object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                loading="eager"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span class="text-xs font-medium text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/50">
                  ${product.name}
                </span>
                ${product.organicApproved ? `
                  <span class="text-xs font-medium text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/50 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    Orgânico
                  </span>
                ` : ''}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 2. NAVEGAÇÃO INTERNA DA PÁGINA (TABS ÂNCORAS) -->
    <div class="sticky top-20 z-30 product-sticky-nav border-b border-neutral-200 shadow-sm" style="background-color: #ffffff !important;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2 sm:gap-4 overflow-x-auto py-3 no-scrollbar text-xs font-bold text-neutral-600">
          <button type="button" data-scroll-to="sec-beneficios" class="product-nav-tab px-3.5 py-2 rounded-xl hover:text-neutral-900 hover:bg-neutral-100 transition-all cursor-pointer whitespace-nowrap active:scale-95">Benefícios</button>
          <button type="button" data-scroll-to="sec-composicao" class="product-nav-tab px-3.5 py-2 rounded-xl hover:text-neutral-900 hover:bg-neutral-100 transition-all cursor-pointer whitespace-nowrap active:scale-95">Composição & Embalagem</button>
          <button type="button" data-scroll-to="sec-alvos" class="product-nav-tab px-3.5 py-2 rounded-xl hover:text-neutral-900 hover:bg-neutral-100 transition-all cursor-pointer whitespace-nowrap active:scale-95">Culturas & Alvos</button>
          <button type="button" data-scroll-to="sec-dosagem" class="product-nav-tab px-3.5 py-2 rounded-xl hover:text-neutral-900 hover:bg-neutral-100 transition-all cursor-pointer whitespace-nowrap active:scale-95">Dosagens & Aplicação</button>
          <button type="button" data-scroll-to="sec-modo-acao" class="product-nav-tab px-3.5 py-2 rounded-xl hover:text-neutral-900 hover:bg-neutral-100 transition-all cursor-pointer whitespace-nowrap active:scale-95">Modo de Ação</button>
          <button type="button" data-scroll-to="sec-condicoes" class="product-nav-tab px-3.5 py-2 rounded-xl hover:text-neutral-900 hover:bg-neutral-100 transition-all cursor-pointer whitespace-nowrap active:scale-95">Condições Climáticas</button>
        </div>
      </div>
    </div>

    <!-- 3. CONTEÚDO TÉCNICO ESTRUTURADO -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      <!-- Seção: Benefícios Comprovados -->
      <section id="sec-beneficios" class="scroll-mt-36">
        <div class="mb-6">
          <span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Diferenciais em Campo</span>
          <h2 class="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-1">Benefícios Comprovados</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${product.benefits.map((b, idx) => `
            <div class="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-start gap-3 hover:bg-white hover:shadow-sm transition-all">
              <div class="w-6 h-6 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 mt-0.5 border border-neutral-200">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-sm font-semibold text-neutral-800 leading-snug">${b}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Seção: Composição & Embalagem -->
      <section id="sec-composicao" class="scroll-mt-36 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Composição -->
        <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
          <div class="mb-5">
            <span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Garantia Biológica</span>
            <h2 class="text-2xl font-black text-neutral-900 tracking-tight mt-1">Composição do Produto</h2>
          </div>
          <div class="space-y-3">
            ${product.composition.map(item => `
              <div class="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span class="text-sm font-bold text-neutral-900 block" style="font-family: Arial, sans-serif;">${item.name}</span>
                  <span class="text-xs text-neutral-500 font-normal italic" style="font-family: Arial, sans-serif;">${item.strain}</span>
                </div>
                <div class="px-3 py-1 bg-neutral-100 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 shrink-0 self-start sm:self-auto" style="font-family: Arial, sans-serif;">
                  ${item.concentration}
                </div>
              </div>
            `).join('')}
          </div>
          <div class="mt-5 p-4 rounded-2xl bg-neutral-100/60 text-xs text-neutral-600">
            <strong class="text-neutral-800">Formulação:</strong> ${product.formulation} • <strong class="text-neutral-800">Estabilidade:</strong> ${product.stability}
          </div>
        </div>

        <!-- Apresentação & Embalagem -->
        <div class="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm flex flex-col justify-start">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Logística & Armazenamento</span>
            <h2 class="text-2xl font-black text-neutral-900 tracking-tight mt-1 mb-5">Apresentação</h2>
            
            <div class="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 mb-4">
              <div class="flex items-center gap-3 text-neutral-800 font-bold text-sm mb-2">
                <svg class="w-5 h-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Embalagens Disponíveis
              </div>
              <p class="text-sm text-neutral-600 leading-relaxed font-medium">
                ${product.packaging}
              </p>
            </div>
          </div>
        </div>

      </section>

      <!-- Seção: Culturas & Alvos Biológicos -->
      <section id="sec-alvos" class="scroll-mt-36">
        <div class="mb-6">
          <span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Espectro de Ação</span>
          <h2 class="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-1">Culturas e Alvos</h2>
        </div>
        
        <div class="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200">
          <div class="mb-6">
            <h3 class="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Indicação Agronômica Geral</h3>
            <p class="text-base text-neutral-800 font-semibold leading-relaxed">
              ${product.cropsAndTargets}
            </p>
          </div>

          <div class="border-t border-neutral-200/80 pt-6">
            <h3 class="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">Alvos Biológicos Registrados / Indicados</h3>
            <div class="flex flex-wrap gap-3">
              ${product.targets.map(t => `
                <div class="px-4 py-2.5 bg-white rounded-xl border border-neutral-200 shadow-sm flex items-center gap-2.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
                  <div>
                    <span class="text-xs font-normal italic text-neutral-800 block" style="font-family: Arial, sans-serif;">${t.name}</span>
                    <span class="text-[11px] text-neutral-500 font-normal" style="font-family: Arial, sans-serif;">${t.commonName}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- Seção: Dosagens & Épocas de Aplicação -->
      <section id="sec-dosagem" class="scroll-mt-36">
        <div class="mb-6">
          <span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Recomendações Práticas</span>
          <h2 class="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-1">Tabela de Dosagens & Aplicação</h2>
        </div>

        <div class="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-neutral-100/80 text-xs font-bold uppercase tracking-wider text-neutral-600 border-b border-neutral-200">
                <tr>
                  <th class="p-4 sm:p-5">Cultura / Modalidade</th>
                  <th class="p-4 sm:p-5">Dosagem</th>
                  <th class="p-4 sm:p-5">Momento & Calda</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-200/60">
                ${product.dosageTable.map(d => `
                  <tr class="hover:bg-neutral-50/50 transition-colors">
                    <td class="p-4 sm:p-5 font-bold text-neutral-900">${d.modality}</td>
                    <td class="p-4 sm:p-5 font-bold text-neutral-800" style="font-family: Arial, sans-serif;">${d.dose}</td>
                    <td class="p-4 sm:p-5 text-neutral-600">${d.timing}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Seção: Modo de Ação Multifatorial -->
      <section id="sec-modo-acao" class="scroll-mt-36">
        <div class="mb-6">
          <span class="text-xs font-bold uppercase tracking-wider text-neutral-400">Mecanismos Científicos</span>
          <h2 class="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-1">Modo de Ação</h2>
          <p class="text-neutral-600 text-sm mt-1 max-w-2xl">${product.modeOfAction.summary}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${product.modeOfAction.points.map((pt, i) => `
            <div class="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:bg-white hover:shadow-sm transition-all">
              <span class="text-xs font-bold text-neutral-400 mb-1 block">#0${i + 1}</span>
              <p class="text-sm text-neutral-800 leading-relaxed">${pt}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Seção: Condições Climáticas & Boas Práticas -->
      <section id="sec-condicoes" class="scroll-mt-36 bg-amber-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200/80">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="space-y-2">
            <h3 class="text-base font-bold text-amber-950">Condições de Aplicação & Parâmetros Climáticos</h3>
            <p class="text-sm text-amber-900 leading-relaxed font-medium">
              ${product.applicationConditions.climate}
            </p>
            <p class="text-xs text-amber-800 leading-relaxed">
              ${product.applicationConditions.tips}
            </p>
          </div>
        </div>
      </section>

      <!-- Seção: Registro MAPA & Atenção Legal -->
      <div class="p-6 rounded-2xl bg-neutral-100 text-neutral-500 text-xs leading-relaxed border border-neutral-200">
        <strong class="text-neutral-700 block mb-1">ATENÇÃO / NOTA REGULATÓRIA OBRIGATÓRIA:</strong>
        <p>${product.regulatoryNotice}</p>
      </div>

      <!-- Navegação Entre Produtos da Mesma Categoria -->
      ${siblingProducts.length > 0 ? `
        <div class="pt-8 border-t border-neutral-200">
          <h3 class="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">Outros Produtos em ${product.category}:</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            ${siblingProducts.map(sp => `
              <a 
                href="#/produtos/${sp.slug}" 
                data-link
                class="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-400 hover:bg-white hover:shadow-sm transition-all group"
              >
                <span class="text-[11px] font-semibold text-neutral-500 uppercase block mb-1">${sp.productType}</span>
                <span class="text-base font-bold text-neutral-900 group-hover:text-black transition-colors block">${sp.name}</span>
                <span class="text-xs text-neutral-500 line-clamp-1 mt-1">${sp.tagline}</span>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}

    </main>
  `;

  // Scroll suave para as seções internas da página sem alterar rota SPA
  const tabs = container.querySelectorAll('.product-nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('data-scroll-to');
      const targetEl = container.querySelector('#' + targetId) || document.getElementById(targetId);
      if (targetEl) {
        const headerOffset = 145;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Feedback visual na aba clicada
        tabs.forEach(t => {
          t.classList.remove('bg-neutral-900', 'text-white', 'font-black');
          t.classList.add('text-neutral-600', 'font-bold');
        });
        tab.classList.remove('text-neutral-600', 'font-bold');
        tab.classList.add('bg-neutral-900', 'text-white', 'font-black');
      }
    });
  });

  // Listener para botão de contato
  const btnContact = container.querySelector('#btn-request-quote');
  if (btnContact) {
    btnContact.addEventListener('click', () => {
      openContactModal(`Interesse técnico no produto ${product.name}`);
    });
  }

  return container;
}
