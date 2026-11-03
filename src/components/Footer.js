/**
 * Componente Footer Global da Biopar
 * Estrutura corporativa, navegação institucional, dados regulatórios e links de conformidade.
 */

import { companyData } from '../data/company.js';
import { openContactModal } from './ContactModal.js';

export function renderFooter() {
  const footer = document.createElement('footer');
  footer.id = 'main-footer';
  footer.className = 'bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800';

  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
        
        <!-- Coluna Institucional -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-2.5">
            <a href="#/" data-link class="inline-block hover:opacity-85 transition-opacity">
              <img src="./static/assets/logo-biopar-negative.svg" alt="Biopar Biotecnologia" class="h-9 w-auto object-contain" />
            </a>
          </div>

          <p class="text-neutral-400 text-sm leading-relaxed max-w-sm">
            Biologia aplicada à produtividade e ao manejo agrícola. Desenvolvemos soluções microbiológicas de alta performance que integram ciência, tecnologia e sustentabilidade no campo.
          </p>

          <div class="pt-2 text-xs text-neutral-400 space-y-1.5">
            <div><strong>Atendimento Técnico:</strong> ${companyData.contactChannels.phone}</div>
            <div><strong>E-mail:</strong> <a href="mailto:${companyData.contactChannels.emailTechnical}" class="text-[#60B73F] hover:underline">${companyData.contactChannels.emailTechnical}</a></div>
            <div class="flex items-start gap-1">
              <strong>Endereço:</strong> 
              <span>${companyData.contactChannels.address}</span>
            </div>
            <div class="pt-1">
              <a href="${companyData.contactChannels.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-[#60B73F] hover:underline font-medium transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Ver localização no Google Maps
              </a>
            </div>
          </div>
        </div>

        <!-- Coluna 1: Soluções por Categoria -->
        <div>
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Soluções</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#/produtos/categoria/biofungicidas" data-link class="hover:text-[#60B73F] transition-colors">Biofungicidas (4)</a></li>
            <li><a href="#/produtos/categoria/bioinseticidas" data-link class="hover:text-[#60B73F] transition-colors">Bioinseticidas (3)</a></li>
            <li><a href="#/produtos/categoria/promotores-de-crescimento" data-link class="hover:text-[#60B73F] transition-colors">Promotores & Inoculantes (3)</a></li>
            <li><a href="#/produtor" data-link class="text-[#60B73F] font-bold hover:underline transition-colors flex items-center gap-1"><span>Direto para o Produtor</span><span>→</span></a></li>
            <li><a href="#/produtos" data-link class="hover:text-[#60B73F] font-semibold transition-colors">Ver Portfólio Completo</a></li>
          </ul>
        </div>

        <!-- Coluna 2: Conteúdo -->
        <div>
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Conhecimento</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#/blog" data-link class="hover:text-[#60B73F] transition-colors">Hub de Conteúdo</a></li>
            <li><a href="#/blog" data-link class="hover:text-[#60B73F] transition-colors">Manejo Biológico</a></li>
            <li><a href="#/blog" data-link class="hover:text-[#60B73F] transition-colors">Pesquisa & Tecnologia</a></li>
            <li><a href="#/#mercado" data-link class="hover:text-[#60B73F] transition-colors">Mercado Agro</a></li>
          </ul>
        </div>

        <!-- Coluna 3: Biopar -->
        <div>
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">A Biopar</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#/#biopar" data-link class="hover:text-[#60B73F] transition-colors">Quem Somos</a></li>
            <li><a href="#/#science" data-link class="hover:text-[#60B73F] transition-colors">Do Microrganismo ao Campo</a></li>
            <li><button type="button" id="footer-btn-contact" class="hover:text-[#60B73F] transition-colors text-left cursor-pointer">Fale Conosco</button></li>
          </ul>
        </div>

      </div>

      <!-- Compliance & Direitos Regulatórios -->
      <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div class="text-center md:text-left">
          <p>© 2026 ${companyData.legalName}. Todos os direitos reservados.</p>
          <p class="text-[11px] text-neutral-600 mt-1 max-w-2xl">${companyData.regulatoryDisclaimer}</p>
        </div>

        <div class="flex items-center gap-6 text-xs flex-wrap justify-center md:justify-end">
          <a href="#/privacidade" data-link class="hover:text-[#60B73F] transition-colors">Política de Privacidade</a>
          <a href="#/cookies" data-link class="hover:text-[#60B73F] transition-colors">Cookies</a>
          <a href="#/termos" data-link class="hover:text-[#60B73F] transition-colors">Termos de Uso</a>
          <span class="text-neutral-700 hidden sm:inline">•</span>
          <a href="#/admin" data-link class="text-neutral-500 hover:text-white transition-colors flex items-center gap-1">
            <svg class="w-3 h-3 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <span>Painel Editorial</span>
          </a>
          <span class="text-neutral-700 hidden sm:inline">•</span>
          <a href="#/aprovacoes" data-link class="text-neutral-500 hover:text-[#60B73F] transition-colors flex items-center gap-1">
            <svg class="w-3 h-3 text-[#60B73F]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            <span>Aprovações</span>
          </a>
        </div>
      </div>
    </div>
  `;

  footer.querySelector('#footer-btn-contact')?.addEventListener('click', () => openContactModal());

  return footer;
}
