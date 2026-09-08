/**
 * Modal de Detalhe de Indicador de Mercado Agro (Biopar Market Intelligence)
 * Gráficos de evolução, métricas intradiárias e atribuição oficial de fontes.
 */

import { marketSources } from '../data/market.js';

export function openMarketModal(indicator) {
  let modalEl = document.getElementById('market-modal-overlay');
  if (modalEl) modalEl.remove();

  const isUp = indicator.dailyChangePercent >= 0;
  const changeColor = isUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50';
  const changeSign = isUp ? '+' : '';
  const source = marketSources.find(s => s.id === indicator.sourceId) || {
    name: indicator.sourceName,
    url: '#',
    officialAttribution: 'Provedor oficial de inteligência de mercado agropecuário.'
  };

  // Gera dados de gráfico em SVG
  const history = indicator.history7d || [indicator.currentValue];
  const minVal = Math.min(...history) * 0.995;
  const maxVal = Math.max(...history) * 1.005;
  const range = maxVal - minVal || 1;
  const svgWidth = 460;
  const svgHeight = 160;

  const points = history.map((val, idx) => {
    const x = (idx / (history.length - 1)) * (svgWidth - 40) + 20;
    const y = svgHeight - 25 - ((val - minVal) / range) * (svgHeight - 50);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${history.map((val, idx) => {
    const x = (idx / (history.length - 1)) * (svgWidth - 40) + 20;
    const y = svgHeight - 25 - ((val - minVal) / range) * (svgHeight - 50);
    return `${x},${y}`;
  }).join(' ')} ${svgWidth - 20},${svgHeight} 20,${svgHeight}`;

  const lineColor = isUp ? '#10B981' : '#EF4444';
  const fillGradient = isUp ? 'url(#gradient-green)' : 'url(#gradient-red)';

  modalEl = document.createElement('div');
  modalEl.id = 'market-modal-overlay';
  modalEl.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-200 opacity-0';

  modalEl.innerHTML = `
    <div class="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-100 transform scale-95 transition-transform duration-200" id="market-modal-card">
      <button id="close-market-modal" class="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors" aria-label="Fechar">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <!-- Header do Indicador -->
      <div class="flex items-start justify-between pr-10 mb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-neutral-400">${indicator.marketType}</span>
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-600">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live
            </span>
          </div>
          <h3 class="text-2xl font-bold text-neutral-900 mt-1">${indicator.commodity}</h3>
          <p class="text-xs text-neutral-500">${indicator.contractOrReference}</p>
        </div>

        <div class="text-right">
          <div class="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">${indicator.formattedValue}</div>
          <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${changeColor} mt-1">
            ${isUp ? '▲' : '▼'} ${changeSign}${indicator.dailyChangePercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <!-- Gráfico de Evolução -->
      <div class="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 mb-5">
        <div class="flex items-center justify-between text-xs text-neutral-500 mb-2">
          <span class="font-medium">Histórico Recente (7 dias úteis)</span>
          <span class="text-[11px]">Unidade: ${indicator.unit}</span>
        </div>

        <div class="w-full overflow-hidden flex justify-center">
          <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="w-full h-36">
            <defs>
              <linearGradient id="gradient-green" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#10B981" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
              </linearGradient>
              <linearGradient id="gradient-red" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#EF4444" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#EF4444" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            <!-- Gridlines -->
            <line x1="20" y1="30" x2="${svgWidth - 20}" y2="30" stroke="#E5E5EA" stroke-dasharray="3,3" stroke-width="1"/>
            <line x1="20" y1="80" x2="${svgWidth - 20}" y2="80" stroke="#E5E5EA" stroke-dasharray="3,3" stroke-width="1"/>
            <line x1="20" y1="130" x2="${svgWidth - 20}" y2="130" stroke="#E5E5EA" stroke-dasharray="3,3" stroke-width="1"/>
            
            <polygon points="${areaPoints}" fill="${fillGradient}" />
            <polyline points="${points}" fill="none" stroke="${lineColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            
            ${history.map((val, idx) => {
              const x = (idx / (history.length - 1)) * (svgWidth - 40) + 20;
              const y = svgHeight - 25 - ((val - minVal) / range) * (svgHeight - 50);
              return `<circle cx="${x}" cy="${y}" r="3.5" fill="#FFFFFF" stroke="${lineColor}" stroke-width="2" />`;
            }).join('')}
          </svg>
        </div>
      </div>

      <!-- Métricas do Pregão -->
      <div class="grid grid-cols-3 gap-3 mb-5">
        <div class="bg-white p-3 rounded-xl border border-neutral-200/70">
          <div class="text-[11px] text-neutral-500 font-medium">Abertura</div>
          <div class="text-sm font-semibold text-neutral-800 mt-0.5">R$ ${indicator.openValue?.toFixed(2) || '--'}</div>
        </div>
        <div class="bg-white p-3 rounded-xl border border-neutral-200/70">
          <div class="text-[11px] text-neutral-500 font-medium">Máxima Dia</div>
          <div class="text-sm font-semibold text-neutral-800 mt-0.5">R$ ${indicator.dayHigh?.toFixed(2) || '--'}</div>
        </div>
        <div class="bg-white p-3 rounded-xl border border-neutral-200/70">
          <div class="text-[11px] text-neutral-500 font-medium">Mínima Dia</div>
          <div class="text-sm font-semibold text-neutral-800 mt-0.5">R$ ${indicator.dayLow?.toFixed(2) || '--'}</div>
        </div>
      </div>

      <!-- Resumo & Benchmark Global -->
      <div class="space-y-3 mb-5 text-xs text-neutral-600 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
        <div>
          <strong class="text-neutral-800 font-semibold">Definição Técnica:</strong>
          <span>${indicator.summary}</span>
        </div>
        ${indicator.globalBenchmark ? `
          <div class="pt-2 border-t border-neutral-200/60 flex items-center justify-between">
            <strong class="text-neutral-800 font-semibold">Referência Global:</strong>
            <span class="font-mono bg-white px-2 py-0.5 rounded border border-neutral-200 text-neutral-700">${indicator.globalBenchmark}</span>
          </div>
        ` : ''}
      </div>

      <!-- Atribuição da Fonte Oficial -->
      <div class="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs text-neutral-500">
        <div>
          <span class="block font-semibold text-neutral-700">${source.name}</span>
          <span class="text-[11px] text-neutral-400">Atualizado: ${indicator.lastUpdate}</span>
        </div>
        <a href="${source.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium hover:underline">
          Portal Oficial
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>
      </div>
    </div>
  `;

  document.body.appendChild(modalEl);

  requestAnimationFrame(() => {
    modalEl.classList.remove('opacity-0');
    modalEl.classList.add('opacity-100');
    const card = document.getElementById('market-modal-card');
    card?.classList.remove('scale-95');
    card?.classList.add('scale-100');
  });

  const closeBtn = document.getElementById('close-market-modal');
  const close = () => {
    modalEl.classList.remove('opacity-100');
    modalEl.classList.add('opacity-0');
    const card = document.getElementById('market-modal-card');
    card?.classList.remove('scale-100');
    card?.classList.add('scale-95');
    setTimeout(() => modalEl.remove(), 200);
  };

  closeBtn?.addEventListener('click', close);
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) close();
  });
}
