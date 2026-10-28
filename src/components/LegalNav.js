/**
 * Componente de Navegação e Cabeçalho do Hub Jurídico e de Conformidade da Biopar
 * Compartilhado entre Política de Privacidade, Termos de Uso e Política de Cookies.
 */

export function createLegalHeader({ activeTab = 'privacidade', title, subtitle }) {
  const header = document.createElement('div');
  header.className = 'bg-gradient-to-b from-white via-[#F5F5F7] to-white border-b border-neutral-200/80 pt-12 pb-10';

  const tabs = [
    { id: 'privacidade', label: 'Política de Privacidade', href: '#/privacidade', icon: 'shield' },
    { id: 'termos', label: 'Termos de Uso', href: '#/termos', icon: 'file-text' },
    { id: 'cookies', label: 'Gestão de Cookies', href: '#/cookies', icon: 'cookie' }
  ];

  header.innerHTML = `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-neutral-500 mb-6 font-medium">
        <a href="#/" data-link class="hover:text-black transition-colors">Início</a>
        <span>/</span>
        <span class="text-neutral-400">Jurídico & Conformidade</span>
        <span>/</span>
        <span class="text-neutral-900 font-semibold">${title}</span>
      </nav>

      <!-- Badge de Conformidade -->
      <div class="flex flex-wrap items-center gap-3 mb-4">
        <span class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300">
          <svg class="w-3.5 h-3.5 text-[#60B73F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Segurança Jurídica & Regulatória
        </span>
        <span class="text-xs text-neutral-500 font-medium">
          Última atualização: 28 de outubro de 2026 • Versão 2.4
        </span>
      </div>

      <!-- Título & Subtítulo -->
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
        ${title}
      </h1>
      <p class="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-3xl mt-3">
        ${subtitle}
      </p>

      <!-- Abas de Navegação entre Documentos Jurídicos -->
      <div class="flex items-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-200">
        ${tabs.map(tab => {
          const isActive = tab.id === activeTab;
          return `
            <a href="${tab.href}" data-link class="inline-flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-sm font-semibold transition-all border-b-2 -mb-[2px] whitespace-nowrap ${
              isActive
                ? 'border-[#60B73F] text-neutral-900 bg-white shadow-sm'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/60'
            }">
              <span>${tab.label}</span>
            </a>
          `;
        }).join('')}
      </div>

    </div>
  `;

  return header;
}
