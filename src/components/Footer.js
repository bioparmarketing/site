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
            <a href="#/" data-link class="inline-block bg-white/95 px-3 py-1.5 rounded-xl shadow-sm hover:opacity-95 transition-opacity">
              <img src="./public/assets/logo-biopar.avif" alt="Biopar Biotecnologia" class="h-9 w-auto object-contain" />
            </a>
          </div>

          <p class="text-neutral-400 text-sm leading-relaxed max-w-sm">
            Biologia aplicada à produtividade e ao manejo agrícola. Desenvolvemos soluções microbiológicas de alta performance que integram ciência, tecnologia e sustentabilidade no campo.
          </p>

          <div class="pt-2 text-xs text-neutral-400 space-y-1.5">
            <div><strong>Atendimento Técnico:</strong> ${companyData.contactChannels.phone}</div>
            <div><strong>E-mail:</strong> ${companyData.contactChannels.emailTechnical}</div>
            <div class="flex items-start gap-1">
              <strong>Endereço:</strong> 
              <span>${companyData.contactChannels.address}</span>
            </div>
            <div class="pt-1">
              <a href="${companyData.contactChannels.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium underline transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Ver localização no Google Maps
              </a>
            </div>
          </div>
        </div>

        <!-- Coluna 1: Soluções -->
        <div>
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Soluções</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#/produtos?categoria=inoculantes" data-link class="hover:text-emerald-400 transition-colors">Inoculantes</a></li>
            <li><a href="#/produtos?categoria=biofungicidas" data-link class="hover:text-emerald-400 transition-colors">Biofungicidas</a></li>
            <li><a href="#/produtos?categoria=bioinseticidas" data-link class="hover:text-emerald-400 transition-colors">Bioinseticidas</a></li>
            <li><a href="#/produtos?categoria=bionematicidas" data-link class="hover:text-emerald-400 transition-colors">Bionematicidas</a></li>
            <li><a href="#/produtos" data-link class="hover:text-emerald-400 font-semibold transition-colors">Catálogo Completo</a></li>
          </ul>
        </div>

        <!-- Coluna 2: Conteúdo -->
        <div>
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Conhecimento</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#/blog" data-link class="hover:text-emerald-400 transition-colors">Hub de Conteúdo</a></li>
            <li><a href="#/blog" data-link class="hover:text-emerald-400 transition-colors">Manejo Biológico</a></li>
            <li><a href="#/blog" data-link class="hover:text-emerald-400 transition-colors">Pesquisa & Tecnologia</a></li>
            <li><a href="#/#mercado" data-link class="hover:text-emerald-400 transition-colors">Mercado Agora</a></li>
          </ul>
        </div>

        <!-- Coluna 3: Biopar -->
        <div>
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">A Biopar</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#/#biopar" data-link class="hover:text-emerald-400 transition-colors">Quem Somos</a></li>
            <li><a href="#/#science" data-link class="hover:text-emerald-400 transition-colors">Do Microrganismo ao Campo</a></li>
            <li><button type="button" id="footer-btn-contact" class="hover:text-emerald-400 transition-colors text-left cursor-pointer">Fale Conosco</button></li>
          </ul>
        </div>

      </div>

      <!-- Compliance & Direitos Regulatórios -->
      <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div class="text-center md:text-left">
          <p>© 2026 ${companyData.legalName}. Todos os direitos reservados.</p>
          <p class="text-[11px] text-neutral-600 mt-1 max-w-2xl">${companyData.regulatoryDisclaimer}</p>
        </div>

        <div class="flex items-center gap-6 text-xs">
          <a href="#" onclick="event.preventDefault();" class="hover:text-neutral-400 transition-colors">Política de Privacidade</a>
          <a href="#" onclick="event.preventDefault();" class="hover:text-neutral-400 transition-colors">Cookies</a>
          <a href="#" onclick="event.preventDefault();" class="hover:text-neutral-400 transition-colors">Termos de Uso</a>
        </div>
      </div>
    </div>
  `;

  footer.querySelector('#footer-btn-contact')?.addEventListener('click', () => openContactModal());

  return footer;
}
