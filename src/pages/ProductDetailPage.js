/**
 * Template Reutilizável de Página de Produto (/produtos/:slug)
 * Rigor regulatório, taxonomia biológica em itálico, identidade técnica estruturada,
 * ensaios de campo citados com fontes, calculadora de dosagem e downloads técnicos.
 */

import { products } from '../data/products.js';
import { articles } from '../data/articles.js';
import { createDoseCalculator } from '../components/DoseCalculator.js';
import { openContactModal } from '../components/ContactModal.js';
import { showToast } from '../components/Toast.js';

export function createProductDetailPage({ params, router }) {
  const { slug } = params;
  const product = products.find(p => p.slug === slug) || products[0];

  const container = document.createElement('div');
  container.className = 'w-full bg-[#FFFFFF] min-h-screen';

  // Produtos e Artigos Relacionados
  const relatedProducts = products.filter(p => product.relatedProductIds?.includes(p.id));
  const relatedArticles = articles.filter(a => product.relatedArticleIds?.includes(a.id) || a.relatedProductIds?.includes(product.id));

  container.innerHTML = `
    <!-- 1. BREADCRUMBS & HERO -->
    <section class="bg-gradient-to-b from-[#F5F5F7] to-white pt-8 pb-16 border-b border-neutral-200/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-xs text-neutral-400 mb-8">
          <a href="#/" data-link class="hover:text-emerald-700">Início</a>
          <span>/</span>
          <a href="#/produtos" data-link class="hover:text-emerald-700">Produtos</a>
          <span>/</span>
          <a href="#/produtos?categoria=${product.categorySlug}" data-link class="hover:text-emerald-700">${product.category}</a>
          <span>/</span>
          <span class="text-neutral-700 font-semibold">${product.name}</span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Informações Principais -->
          <div class="lg:col-span-7 space-y-6">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full">
                ${product.category}
              </span>
              <span class="text-xs font-mono text-neutral-500 bg-neutral-200/70 px-2.5 py-1 rounded-full">
                Reg. MAPA nº ${product.technicalIdentity.registro_mapa}
              </span>
            </div>

            <div class="text-sm font-mono text-emerald-800 italic">
              ${product.technicalIdentity.microrganismo} (${product.technicalIdentity.cepa_ou_isolado})
            </div>

            <h1 class="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight">
              ${product.name}
            </h1>

            <p class="text-lg text-neutral-600 leading-relaxed font-normal">
              ${product.fullDescription}
            </p>

            <div class="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80">
              <span class="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">Posicionamento Agronômico</span>
              <p class="text-sm font-semibold text-neutral-800">${product.mainPositioning}</p>
            </div>

            <div class="flex flex-wrap items-center gap-4 pt-2">
              <button id="btn-product-contact" class="btn-pill-primary text-sm font-bold shadow-md px-8 py-3.5">
                Falar com Especialista
              </button>
              <a href="#downloads-section" class="btn-pill-secondary text-sm font-semibold px-6 py-3.5">
                Baixar Bula e Ficha Técnica
              </a>
            </div>
          </div>

          <!-- Imagem / Packshot -->
          <div class="lg:col-span-5">
            <div class="apple-card-static p-4 bg-white/80 backdrop-blur-md rounded-3xl border border-neutral-200 shadow-xl overflow-hidden">
              <img src="${product.heroImage}" alt="${product.name}" class="w-full h-80 sm:h-96 object-cover rounded-2xl" />
              <div class="mt-4 flex items-center justify-between px-2 text-xs text-neutral-500">
                <span class="font-mono">${product.technicalIdentity.concentracao}</span>
                <span class="font-medium bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full">${product.technicalIdentity.formulacao}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 2. IDENTIDADE TÉCNICA REGULATÓRIA -->
    <section class="py-16 bg-white border-b border-neutral-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="mb-8">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">Rigor Regulatório</span>
          <h2 class="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-2">Identidade Técnica Oficial</h2>
          <p class="text-xs sm:text-sm text-neutral-500 mt-1">Especificações registradas e homologadas no Ministério da Agricultura e Pecuária (MAPA).</p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-neutral-200 rounded-2xl overflow-hidden">
            <tbody class="divide-y divide-neutral-200 text-sm">
              <tr class="bg-neutral-50/50">
                <td class="px-6 py-3.5 font-bold text-neutral-600 w-1/4">Categoria Oficial</td>
                <td class="px-6 py-3.5 text-neutral-900 font-medium">${product.technicalIdentity.categoria}</td>
              </tr>
              <tr>
                <td class="px-6 py-3.5 font-bold text-neutral-600">Microrganismo Ativo</td>
                <td class="px-6 py-3.5 text-emerald-800 font-semibold italic">${product.technicalIdentity.microrganismo}</td>
              </tr>
              <tr class="bg-neutral-50/50">
                <td class="px-6 py-3.5 font-bold text-neutral-600">Cepa / Isolado de Origem</td>
                <td class="px-6 py-3.5 text-neutral-900 font-mono">${product.technicalIdentity.cepa_ou_isolado}</td>
              </tr>
              <tr>
                <td class="px-6 py-3.5 font-bold text-neutral-600">Garantia de Concentração</td>
                <td class="px-6 py-3.5 text-neutral-900 font-mono font-bold">${product.technicalIdentity.concentracao}</td>
              </tr>
              <tr class="bg-neutral-50/50">
                <td class="px-6 py-3.5 font-bold text-neutral-600">Formulação</td>
                <td class="px-6 py-3.5 text-neutral-900 font-medium">${product.technicalIdentity.formulacao}</td>
              </tr>
              <tr>
                <td class="px-6 py-3.5 font-bold text-neutral-600">Registro MAPA</td>
                <td class="px-6 py-3.5 text-neutral-900 font-mono">${product.technicalIdentity.registro_mapa}</td>
              </tr>
              <tr class="bg-neutral-50/50">
                <td class="px-6 py-3.5 font-bold text-neutral-600">Apresentação Comercial</td>
                <td class="px-6 py-3.5 text-neutral-900">${product.technicalIdentity.apresentacao}</td>
              </tr>
              <tr>
                <td class="px-6 py-3.5 font-bold text-neutral-600">Estabilidade e Validade</td>
                <td class="px-6 py-3.5 text-neutral-900">${product.technicalIdentity.prazo_validade}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 3. MODO DE AÇÃO & MECANISMOS -->
    <section class="py-16 bg-[#F5F5F7] border-b border-neutral-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mb-12">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">Biotecnologia</span>
          <h2 class="text-3xl font-black text-neutral-900 tracking-tight mt-2">Modo de Ação & Fisiologia</h2>
          <p class="text-neutral-600 text-sm sm:text-base mt-2 leading-relaxed">
            ${product.modeOfAction.summary}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${product.modeOfAction.mechanisms.map((mec, i) => `
            <div class="apple-card p-6 bg-white flex flex-col justify-between">
              <div>
                <span class="text-2xl font-mono font-black text-emerald-700">0${i + 1}</span>
                <h3 class="text-lg font-bold text-neutral-900 mt-2 mb-3">${mec.title}</h3>
                <p class="text-xs sm:text-sm text-neutral-500 leading-relaxed">${mec.description}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Benefícios Agronômicos -->
        <div class="mt-12 bg-white rounded-3xl p-8 border border-neutral-200/80">
          <h3 class="text-xl font-bold text-neutral-900 mb-6">Principais Benefícios Agronômicos</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${product.benefits.map(ben => `
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span class="text-sm font-medium text-neutral-700 leading-snug">${ben}</span>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </section>

    <!-- 4. MATRIZ DE CULTURAS, ALVOS E DOSAGENS -->
    <section class="py-16 bg-white border-b border-neutral-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="mb-10">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">Recomendação Agronômica</span>
          <h2 class="text-3xl font-black text-neutral-900 tracking-tight mt-2">Culturas & Alvos Biológicos</h2>
          <p class="text-neutral-500 text-sm mt-1">Orientações de época de aplicação e dosagens registradas.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${product.crops.map(c => `
            <div class="apple-card p-6 border border-neutral-200">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-xl font-bold text-neutral-900">${c.name}</h3>
                <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">${c.dose}</span>
              </div>
              
              <div class="text-xs text-neutral-600 mb-3 space-y-1">
                <div><strong class="text-neutral-800 font-semibold">Alvo / Finalidade:</strong> <span class="italic">${c.targets}</span></div>
                <div><strong class="text-neutral-800 font-semibold">Momento de Aplicação:</strong> <span>${c.timing}</span></div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Calculadora de Dosagem Integrada -->
        <div class="mt-12" id="dose-calculator-wrapper">
          <!-- Injetado dinamicamente -->
        </div>

      </div>
    </section>

    <!-- 5. EVIDÊNCIAS TÉCNICAS & ENSAIOS CIENTÍFICOS -->
    <section class="py-16 bg-[#F5F5F7] border-b border-neutral-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="mb-10">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">Evidências de Campo</span>
          <h2 class="text-3xl font-black text-neutral-900 tracking-tight mt-2">Resultados Experimentais Validados</h2>
          <p class="text-neutral-500 text-xs sm:text-sm mt-1">Ensaios conduzidos por universidades, fundações e institutos credenciados.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${product.evidence.map(ev => `
            <div class="apple-card p-6 sm:p-8 bg-white flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs text-neutral-500 mb-2">
                  <span class="font-bold text-emerald-800">${ev.institution}</span>
                  <span>${ev.location} • ${ev.season}</span>
                </div>
                <h3 class="text-xl font-bold text-neutral-900 mb-4">${ev.title}</h3>
                
                <!-- Comparativo Visual Testemunha vs Biopar -->
                <div class="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 my-4 space-y-3">
                  <div class="flex items-center justify-between text-xs font-semibold text-neutral-700">
                    <span>${ev.metricName}</span>
                    <span class="text-emerald-700 font-extrabold text-sm">${ev.yieldDelta} ${ev.deltaUnit}</span>
                  </div>

                  <!-- Barra de Progresso Comparativa -->
                  <div class="space-y-2 text-xs">
                    <div>
                      <div class="flex justify-between text-neutral-500 text-[11px] mb-0.5">
                        <span>Testemunha (Padrão)</span>
                        <span class="font-bold">${ev.controlValue}</span>
                      </div>
                      <div class="w-full bg-neutral-200 rounded-full h-2">
                        <div class="bg-neutral-400 h-2 rounded-full" style="width: 70%"></div>
                      </div>
                    </div>

                    <div>
                      <div class="flex justify-between text-emerald-800 text-[11px] font-bold mb-0.5">
                        <span>Com ${product.name}</span>
                        <span>${ev.treatedValue}</span>
                      </div>
                      <div class="w-full bg-neutral-200 rounded-full h-2.5">
                        <div class="bg-emerald-600 h-2.5 rounded-full" style="width: 88%"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <p class="text-xs text-neutral-500 italic mt-2 leading-relaxed">
                  Nota do ensaio: ${ev.notes}
                </p>
              </div>

              <div class="pt-4 mt-4 border-t border-neutral-100 text-[11px] text-neutral-400">
                *Resultados experimentais obtidos em condições metodológicas controladas. Resultados em campo podem variar conforme clima, solo e manejo.
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    </section>

    <!-- 6. DOCUMENTOS & DOWNLOADS -->
    <section id="downloads-section" class="py-16 bg-white border-b border-neutral-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="mb-8">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">Documentação Oficial</span>
          <h2 class="text-3xl font-black text-neutral-900 tracking-tight mt-2">Downloads & Arquivos Técnicos</h2>
          <p class="text-neutral-500 text-sm mt-1">Acesse bulas oficiais, FISPQ e fichas agronômicas completas.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          ${product.documents.map(doc => `
            <div class="apple-card p-6 border border-neutral-200 flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center mb-4">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">${doc.type.toUpperCase()}</span>
                <h3 class="text-base font-bold text-neutral-900 mt-2">${doc.title}</h3>
                <div class="text-xs text-neutral-400 font-mono mt-1">Cód: ${doc.code} • ${doc.size}</div>
              </div>

              <button type="button" class="btn-download-doc mt-6 w-full btn-pill-secondary text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5 cursor-pointer" data-filename="${doc.filename}" data-title="${doc.title}">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Baixar PDF</span>
              </button>
            </div>
          `).join('')}
        </div>

      </div>
    </section>

    <!-- 7. PRODUTOS E ARTIGOS RELACIONADOS -->
    <section class="py-16 bg-[#F5F5F7]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Produtos Complementares -->
        ${relatedProducts.length > 0 ? `
          <div>
            <h3 class="text-2xl font-bold text-neutral-900 mb-6">Soluções Complementares no Manejo</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${relatedProducts.map(rp => `
                <a href="#/produtos/${rp.slug}" data-link class="apple-card p-5 bg-white group flex flex-col justify-between">
                  <div>
                    <span class="text-xs font-semibold text-emerald-700">${rp.category}</span>
                    <h4 class="text-lg font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors mt-1">${rp.name}</h4>
                    <p class="text-xs text-neutral-500 mt-1 line-clamp-2">${rp.shortDescription}</p>
                  </div>
                  <div class="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>Ver detalhes</span>
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Artigos Técnicos Relacionados -->
        ${relatedArticles.length > 0 ? `
          <div>
            <h3 class="text-2xl font-bold text-neutral-900 mb-6">Artigos & Pesquisa Relacionada</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${relatedArticles.map(art => `
                <a href="#/blog/${art.slug}" data-link class="apple-card p-6 bg-white group flex items-start gap-4">
                  <img src="${art.image}" alt="${art.title}" class="w-24 h-24 rounded-2xl object-cover shrink-0" />
                  <div>
                    <span class="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">${art.category}</span>
                    <h4 class="text-base font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors mt-1 line-clamp-2">${art.title}</h4>
                    <span class="text-xs text-neutral-400 mt-2 block">${art.readingTime}</span>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    </section>

    <!-- 8. CTA DE CONVERSÃO -->
    <section class="py-16 bg-neutral-900 text-white text-center">
      <div class="max-w-3xl mx-auto px-4 space-y-6">
        <h3 class="text-3xl font-bold tracking-tight">Precisa de posicionamento técnico para o ${product.name}?</h3>
        <p class="text-neutral-400 text-sm sm:text-base">
          Nossa equipe de suporte agronômico está pronta para dimensionar a melhor estratégia de manejo biológico para sua propriedade.
        </p>
        <button id="btn-bottom-product-contact" class="btn-pill-primary bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 shadow-lg">
          Falar com um Consultor Biopar
        </button>
      </div>
    </section>
  `;

  // Injeta a calculadora de dosagem interativa
  const doseCalcWrapper = container.querySelector('#dose-calculator-wrapper');
  if (doseCalcWrapper) {
    doseCalcWrapper.appendChild(createDoseCalculator(product));
  }

  // Listeners de Contato
  const openContact = () => openContactModal(product.name);
  container.querySelector('#btn-product-contact')?.addEventListener('click', openContact);
  container.querySelector('#btn-bottom-product-contact')?.addEventListener('click', openContact);

  // Download simulation
  container.querySelectorAll('.btn-download-doc').forEach(btn => {
    btn.addEventListener('click', () => {
      const filename = btn.getAttribute('data-filename');
      const title = btn.getAttribute('data-title');
      showToast(`Iniciando download do documento: ${title} (${filename})`, 'info');
    });
  });

  return container;
}
